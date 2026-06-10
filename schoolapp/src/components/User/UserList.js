import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    userName: '',
    role: '',
    status: '',
    department: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [users, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const applyFilters = () => {
    let filtered = users;

    if (filters.userName) {
      filtered = filtered.filter(user =>
        user.userName?.toLowerCase().includes(filters.userName.toLowerCase())
      );
    }

    if (filters.role) {
      filtered = filtered.filter(user =>
        user.role?.toLowerCase().includes(filters.role.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(user =>
        user.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.department) {
      filtered = filtered.filter(user =>
        user.department?.toLowerCase().includes(filters.department.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      userName: '',
      role: '',
      status: '',
      department: ''
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const getPaginationNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
      try {
        await userService.deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
        setFilteredUsers(filteredUsers.filter(user => user.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete user');
      }
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    if (window.confirm(`Are you sure you want to ${newStatus === 'Active' ? 'activate' : 'deactivate'} this user?`)) {
      try {
        await userService.toggleUserStatus(id);
        const updatedUsers = users.map(user => 
          user.id === id 
            ? { ...user, status: newStatus }
            : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      } catch (err) {
        setError(err.message || 'Failed to toggle user status');
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { bg: 'success', icon: 'check-circle' },
      'Inactive': { bg: 'danger', icon: 'x-circle' },
      'Suspended': { bg: 'warning', icon: 'pause-circle' },
      'Locked': { bg: 'secondary', icon: 'lock' }
    };
    
    const config = statusConfig[status] || { bg: 'secondary', icon: 'question-circle' };
    
    return (
      <span className={`badge bg-${config.bg}`}>
        <i className={`bi bi-${config.icon} me-1`}></i>
        {status}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleColors = {
      'Super Administrator': 'danger',
      'Administrator': 'warning',
      'Teacher': 'primary',
      'Transport Manager': 'info',
      'Reception': 'secondary',
      'Student': 'success',
      'Parent': 'dark'
    };
    
    const label = role || 'Unknown';
    const color = roleColors[role] || 'secondary';
    
    return (
      <span className={`badge bg-${color}`}>{label}</span>
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Management</h2>
        <Link to="/users/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New User
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Filters Section */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Filters</h5>
        </div>
        <div className="card-body">
          <div className="row g-2 align-items-end">
            <div className="col">
              <label className="form-label small">User Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search user..."
                value={filters.userName}
                onChange={(e) => handleFilterChange('userName', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Role</label>
              <select
                className="form-select form-select-sm"
                value={filters.role}
                onChange={(e) => handleFilterChange('role', e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="Super Administrator">Super Administrator</option>
                <option value="Administrator">Administrator</option>
                <option value="Teacher">Teacher</option>
                <option value="Transport Manager">Transport Manager</option>
                <option value="Reception">Reception</option>
                <option value="Student">Student</option>
                <option value="Parent">Parent</option>
              </select>
            </div>
            <div className="col">
              <label className="form-label small">Department</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search department..."
                value={filters.department}
                onChange={(e) => handleFilterChange('department', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Status</label>
              <select
                className="form-select form-select-sm"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
                <option value="Locked">Locked</option>
              </select>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-secondary btn-sm"
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">All Users</h5>
          <span className="badge bg-secondary">
            Showing {paginatedUsers.length} of {filteredUsers.length} users
          </span>
        </div>
        <div className="card-body">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-people display-4 text-muted"></i>
              <p className="text-muted mt-3">No users found</p>
              <Link to="/users/create" className="btn btn-outline-primary">
                Add First User
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Department</th>
                      <th>Last Login</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <Link to={`/users/${user.id}`} className="text-decoration-none">
                            <div className="d-flex align-items-center">
                              <div className="avatar-sm bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2">
                                {(
                                  (user.fullName?.charAt(0) ?? user.userName?.charAt(0) ?? '?')
                                ).toString().toUpperCase()}
                              </div>
                              <div>
                                <strong>{user.fullName || user.userName || '—'}</strong>
                                <div className="small text-muted">
                                  {user.userName || '—'}{user.email ? ` | ${user.email}` : ''}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td>{getRoleBadge(user.role)}</td>
                        <td>{user.department || 'N/A'}</td>
                        <td>
                          <div className="small">
                            <div>{user.lastLogin || '—'}</div>
                            <div className="text-muted">Created: {user.createdDate || '—'}</div>
                          </div>
                        </td>
                        <td>{getStatusBadge(user.status)}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/users/${user.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/users/${user.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-info"
                              onClick={() => handleStatusToggle(user.id, user.status)}
                              title={user.status === 'Active' ? 'Deactivate' : 'Activate'}
                            >
                              <i className={`bi bi-${user.status === 'Active' ? 'pause' : 'play'}`}></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(user.id, user.userName)}
                              title="Delete"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="d-flex align-items-center">
                    <label className="form-label mb-0 me-2">Items per page:</label>
                    <select
                      className="form-select form-select-sm"
                      style={{ width: 'auto' }}
                      value={itemsPerPage}
                      onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                  </div>

                  <nav>
                    <ul className="pagination mb-0">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      {getPaginationNumbers().map((page, index) => (
                        <li
                          key={index}
                          className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
                        >
                          {page === '...' ? (
                            <span className="page-link">...</span>
                          ) : (
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </button>
                          )}
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
