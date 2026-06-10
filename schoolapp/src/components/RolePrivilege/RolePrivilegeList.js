import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { rolePrivilegeService } from '../../services/rolePrivilegeService';
import { roleService } from '../../services/roleService';
import { authService } from '../../services/authService';

const RolePrivilegeList = () => {
  const [rolePrivileges, setRolePrivileges] = useState([]);
  const [filteredRolePrivileges, setFilteredRolePrivileges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [availableRoles, setAvailableRoles] = useState([]);

  // Filter states
  const [filters, setFilters] = useState({
    roleName: '',
    privilegeName: '',
    isActive: '',
    status: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Sorting states
  const [sortField, setSortField] = useState('roleName');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchRolePrivileges();
    fetchAvailableRoles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [rolePrivileges, filters, sortField, sortDirection]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortField, sortDirection]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredRolePrivileges.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRolePrivileges = filteredRolePrivileges.slice(startIndex, endIndex);

  const applyFilters = () => {
    let filtered = rolePrivileges;

    // Apply filters
    if (filters.roleName) {
      filtered = filtered.filter(rp =>
        rp.roleName?.toLowerCase().includes(filters.roleName.toLowerCase())
      );
    }

    if (filters.privilegeName) {
      filtered = filtered.filter(rp =>
        rp.privilegeName?.toLowerCase().includes(filters.privilegeName.toLowerCase())
      );
    }

    if (filters.isActive !== '') {
      filtered = filtered.filter(rp => rp.isActive === (filters.isActive === 'true'));
    }

    if (filters.status) {
      filtered = filtered.filter(rp =>
        rp.status?.toLowerCase().includes(filters.status.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle null/undefined values
      if (aValue === null || aValue === undefined) aValue = '';
      if (bValue === null || bValue === undefined) bValue = '';
      
      // Convert to lowercase for string comparison
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredRolePrivileges(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSort = (field) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
  };

  const clearFilters = () => {
    setFilters({
      roleName: '',
      privilegeName: '',
      isActive: '',
      status: ''
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

  const fetchRolePrivileges = async () => {
    try {
      setLoading(true);
      const data = await rolePrivilegeService.getAll();
      setRolePrivileges(data);
      setFilteredRolePrivileges(data);
      
      // Extract unique roles from the fetched data
      const uniqueRoles = [...new Set(data.map(rp => rp.roleName).filter(Boolean))];
      setAvailableRoles(uniqueRoles);
    } catch (err) {
      setError(err.message || 'Failed to fetch role privileges');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableRoles = async () => {
    try {
      const currentUser = authService.getCurrentUser();
      if (currentUser && currentUser.companyId && currentUser.schoolId) {
        const roles = await roleService.getRolesByCompanyAndSchool(currentUser.companyId, currentUser.schoolId);
        const roleNames = roles.map(role => role.name).filter(Boolean);
        setAvailableRoles(roleNames);
      } else {
        // Fallback to getAll if user context is not available
        const roles = await roleService.getAll();
        const roleNames = roles.map(role => role.name).filter(Boolean);
        setAvailableRoles(roleNames);
      }
    } catch (err) {
      console.error('Failed to fetch available roles:', err);
      // Fallback to getAll if filtered fetch fails
      try {
        const roles = await roleService.getAll();
        const roleNames = roles.map(role => role.name).filter(Boolean);
        setAvailableRoles(roleNames);
      } catch (fallbackErr) {
        console.error('Failed to fetch all roles as fallback:', fallbackErr);
      }
    }
  };

  const handleDelete = async (id, roleName, privilegeName) => {
    if (window.confirm(`Are you sure you want to delete the role privilege for "${roleName}" - "${privilegeName}"?`)) {
      try {
        await rolePrivilegeService.delete(id);
        setRolePrivileges(rolePrivileges.filter(rp => rp.id !== id));
        setFilteredRolePrivileges(filteredRolePrivileges.filter(rp => rp.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete role privilege');
      }
    }
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
        <h2>Role Privilege Management</h2>
        <Link to="/roleprivileges/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Assign New Role Privilege
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
              <label className="form-label small">Role Name</label>
              <select
                className="form-select form-select-sm"
                value={filters.roleName}
                onChange={(e) => handleFilterChange('roleName', e.target.value)}
              >
                <option value="">All Roles</option>
                {availableRoles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <label className="form-label small">Privilege Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search privilege..."
                value={filters.privilegeName}
                onChange={(e) => handleFilterChange('privilegeName', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Status</label>
              <select
                className="form-select form-select-sm"
                value={filters.isActive}
                onChange={(e) => handleFilterChange('isActive', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            <div className="col">
              <label className="form-label small">Status Message</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search status..."
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              />
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
          <h5 className="mb-0">All Role Privileges</h5>
          <span className="badge bg-secondary">
            Showing {paginatedRolePrivileges.length} of {filteredRolePrivileges.length} role privileges
          </span>
        </div>
        <div className="card-body">
          {filteredRolePrivileges.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-link-45deg display-4 text-muted"></i>
              <p className="text-muted mt-3">No role privileges found</p>
              <Link to="/roleprivileges/create" className="btn btn-outline-primary">
                Assign First Role Privilege
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th 
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleSort('roleName')}
                      >
                        Role Name 
                        {sortField === 'roleName' && (
                          <span className="ms-2">
                            {sortDirection === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </th>
                      <th 
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleSort('privilegeName')}
                      >
                        Privilege Name 
                        {sortField === 'privilegeName' && (
                          <span className="ms-2">
                            {sortDirection === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </th>
                      <th 
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleSort('status')}
                      >
                        Status 
                        {sortField === 'status' && (
                          <span className="ms-2">
                            {sortDirection === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </th>
                      <th>Status Message</th>
                      <th>Created Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedRolePrivileges.map((rolePrivilege) => (
                      <tr key={rolePrivilege.id}>
                        <td>
                          <Link to={`/roleprivileges/${rolePrivilege.id}`} className="text-decoration-none">
                            {rolePrivilege.roleName || 'N/A'}
                          </Link>
                        </td>
                        <td>{rolePrivilege.privilegeName || 'N/A'}</td>
                        <td>
                          <span className={`badge ${rolePrivilege.isActive ? 'bg-success' : 'bg-danger'}`}>
                            {rolePrivilege.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>{rolePrivilege.status || 'N/A'}</td>
                        <td>
                          {new Date(rolePrivilege.createdDate).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/roleprivileges/${rolePrivilege.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/roleprivileges/${rolePrivilege.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(rolePrivilege.id, rolePrivilege.roleName, rolePrivilege.privilegeName)}
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

export default RolePrivilegeList;
