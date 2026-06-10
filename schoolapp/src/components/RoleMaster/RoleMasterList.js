import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { roleService } from '../../services/roleService';
import { authService } from '../../services/authService';

const RoleMasterList = () => {
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    roleName: '',
    description: '',
    isActive: ''
  });

  // Sorting states
  const [sortConfig, setSortConfig] = useState({
    key: 'roleName',
    direction: 'asc'
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [roles, filters, sortConfig]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRoles = filteredRoles.slice(startIndex, endIndex);

  const applyFiltersAndSorting = () => {
    let filtered = roles;

    // Apply filters
    if (filters.roleName) {
      filtered = filtered.filter(role => {
        const nameField = role.roleName || role.name || role.RoleName || role.role_name || '';
        return nameField?.toLowerCase().includes(filters.roleName.toLowerCase());
      });
    }

    if (filters.description) {
      filtered = filtered.filter(role =>
        role.description?.toLowerCase().includes(filters.description.toLowerCase())
      );
    }

    if (filters.isActive !== '') {
      const isActive = filters.isActive === 'true';
      filtered = filtered.filter(role => role.isActive === isActive);
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue, bValue;
        
        // Handle role name sorting with multiple field names
        if (sortConfig.key === 'roleName') {
          aValue = a.roleName || a.name || a.RoleName || a.role_name || '';
          bValue = b.roleName || b.name || b.RoleName || b.role_name || '';
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }

        // Handle null/undefined values
        if (aValue === null || aValue === undefined) aValue = '';
        if (bValue === null || bValue === undefined) bValue = '';

        // Handle date sorting
        if (sortConfig.key === 'createdDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        // Handle boolean sorting
        if (typeof aValue === 'boolean') {
          aValue = aValue ? 1 : 0;
          bValue = bValue ? 1 : 0;
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredRoles(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const clearFilters = () => {
    setFilters({
      roleName: '',
      description: '',
      isActive: ''
    });
    setSortConfig({
      key: 'roleName',
      direction: 'asc'
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

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const currentUser = authService.getCurrentUser();
      let data;
      
      if (currentUser && currentUser.companyId && currentUser.schoolId) {
        data = await roleService.getRolesByCompanyAndSchool(currentUser.companyId, currentUser.schoolId);
      } else {
        // Fallback to getAll if user context is not available
        data = await roleService.getAll();
      }
      
      console.log('Fetched roles data:', data);
      console.log('Sample role structure:', data[0]);
      console.log('Available fields in role data:', data[0] ? Object.keys(data[0]) : 'No data');
      setRoles(data);
      setFilteredRoles(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch roles');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, roleName) => {
    if (window.confirm(`Are you sure you want to delete "${roleName}"?`)) {
      try {
        await roleService.delete(id);
        setRoles(roles.filter(role => role.id !== id));
        setFilteredRoles(filteredRoles.filter(role => role.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete role');
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
      <style jsx>{`
        .sortable-column {
          position: relative;
        }
        .sortable-column:hover {
          background-color: #f8f9fa;
        }
        .sort-indicator {
          font-size: 0.8em;
          margin-left: 8px;
        }
        .sortable-column .sort-indicator i {
          transition: transform 0.2s ease-in-out;
        }
      `}</style>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Role Management</h2>
        <Link to="/roles/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Role
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
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search role..."
                value={filters.roleName}
                onChange={(e) => handleFilterChange('roleName', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Description</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search description..."
                value={filters.description}
                onChange={(e) => handleFilterChange('description', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Status</label>
              <select
                className="form-select form-select-sm"
                value={filters.isActive}
                onChange={(e) => handleFilterChange('isActive', e.target.value)}
              >
                <option value="">All</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
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
          <h5 className="mb-0">All Roles</h5>
          <div className="d-flex align-items-center gap-3">
            <span className="badge bg-secondary">
              Showing {paginatedRoles.length} of {filteredRoles.length} roles
            </span>
            {totalPages > 1 && (
              <span className="text-muted small">
                Page {currentPage} of {totalPages}
              </span>
            )}
          </div>
        </div>
        <div className="card-body">
          {filteredRoles.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-shield-check display-4 text-muted"></i>
              <p className="text-muted mt-3">No roles found</p>
              <Link to="/roles/create" className="btn btn-outline-primary">
                Create First Role
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th 
                        className="sortable-column"
                        onClick={() => handleSort('roleName')}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          Role Name
                          <span className="sort-indicator">
                            {sortConfig.key === 'roleName' ? (
                              sortConfig.direction === 'asc' ? 
                                <i className="bi bi-arrow-up"></i> : 
                                <i className="bi bi-arrow-down"></i>
                            ) : (
                              <i className="bi bi-arrow-down-up text-muted"></i>
                            )}
                          </span>
                        </div>
                      </th>
                      <th 
                        className="sortable-column"
                        onClick={() => handleSort('description')}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          Description
                          <span className="sort-indicator">
                            {sortConfig.key === 'description' ? (
                              sortConfig.direction === 'asc' ? 
                                <i className="bi bi-arrow-up"></i> : 
                                <i className="bi bi-arrow-down"></i>
                            ) : (
                              <i className="bi bi-arrow-down-up text-muted"></i>
                            )}
                          </span>
                        </div>
                      </th>
                      <th 
                        className="sortable-column"
                        onClick={() => handleSort('isActive')}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          Status
                          <span className="sort-indicator">
                            {sortConfig.key === 'isActive' ? (
                              sortConfig.direction === 'asc' ? 
                                <i className="bi bi-arrow-up"></i> : 
                                <i className="bi bi-arrow-down"></i>
                            ) : (
                              <i className="bi bi-arrow-down-up text-muted"></i>
                            )}
                          </span>
                        </div>
                      </th>
                      <th 
                        className="sortable-column"
                        onClick={() => handleSort('createdDate')}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          Created Date
                          <span className="sort-indicator">
                            {sortConfig.key === 'createdDate' ? (
                              sortConfig.direction === 'asc' ? 
                                <i className="bi bi-arrow-up"></i> : 
                                <i className="bi bi-arrow-down"></i>
                            ) : (
                              <i className="bi bi-arrow-down-up text-muted"></i>
                            )}
                          </span>
                        </div>
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedRoles.map((role) => {
                      console.log('Rendering role:', role);
                      console.log('Role fields:', Object.keys(role));
                      console.log('Role name field values:', {
                        roleName: role.roleName,
                        name: role.name,
                        RoleName: role.RoleName,
                        role_name: role.role_name
                      });
                      return (
                      <tr key={role.id}>
                        <td>
                          <Link to={`/roles/${role.id}`} className="text-decoration-none">
                            {role.roleName || role.name || role.RoleName || role.role_name || 'N/A'}
                          </Link>
                        </td>
                        <td>{role.description || 'N/A'}</td>
                        <td>
                          <span className={`badge ${role.isActive ? 'bg-success' : 'bg-danger'}`}>
                            {role.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          {role.createdDate ? new Date(role.createdDate).toLocaleDateString() : 'N/A'}
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/roles/${role.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/roles/${role.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(role.id, role.roleName || role.name || 'Role')}
                              title="Delete"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="d-flex align-items-center gap-3">
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
                    <div className="text-muted small">
                      {startIndex + 1}-{Math.min(endIndex, filteredRoles.length)} of {filteredRoles.length}
                    </div>
                  </div>

                  <nav>
                    <ul className="pagination mb-0">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          title="Previous Page"
                        >
                          <i className="bi bi-chevron-left"></i>
                        </button>
                      </li>
                      
                      {/* Show first page */}
                      {currentPage > 3 && (
                        <li className="page-item">
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(1)}
                          >
                            1
                          </button>
                        </li>
                      )}
                      
                      {/* Show ellipsis if needed */}
                      {currentPage > 4 && (
                        <li className="page-item disabled">
                          <span className="page-link">...</span>
                        </li>
                      )}
                      
                      {/* Show page numbers around current page */}
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
                      
                      {/* Show ellipsis if needed */}
                      {currentPage < totalPages - 3 && (
                        <li className="page-item disabled">
                          <span className="page-link">...</span>
                        </li>
                      )}
                      
                      {/* Show last page */}
                      {currentPage < totalPages - 2 && (
                        <li className="page-item">
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(totalPages)}
                          >
                            {totalPages}
                          </button>
                        </li>
                      )}
                      
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          title="Next Page"
                        >
                          <i className="bi bi-chevron-right"></i>
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

export default RoleMasterList;
