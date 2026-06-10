import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { employeeService } from '../../services/employeeService';

const NonTeachingStaffList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
    employeeCode: '',
    role: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [employees, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);
  const roleOptions = [...new Set(
    employees
      .map((employee) => employee.roleName || employee.role || employee.designationName || '')
      .filter(Boolean)
  )].sort((a, b) => a.localeCompare(b));

  const applyFilters = () => {
    let filtered = employees;

    if (filters.firstName) {
      filtered = filtered.filter(employee =>
        employee.firstName?.toLowerCase().includes(filters.firstName.toLowerCase())
      );
    }

    if (filters.lastName) {
      filtered = filtered.filter(employee =>
        employee.lastName?.toLowerCase().includes(filters.lastName.toLowerCase())
      );
    }

    if (filters.email) {
      filtered = filtered.filter(employee =>
        employee.emailId?.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    if (filters.employeeCode) {
      filtered = filtered.filter(employee =>
        employee.employeeCode?.toLowerCase().includes(filters.employeeCode.toLowerCase())
      );
    }

    if (filters.role) {
      filtered = filtered.filter(employee => {
        const employeeRole = employee.roleName || employee.role || employee.designationName || '';
        return employeeRole.toLowerCase() === filters.role.toLowerCase();
      });
    }

    setFilteredEmployees(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      firstName: '',
      lastName: '',
      email: '',
      employeeCode: '',
      role: ''
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

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      console.log('Fetching non-teaching staff...');
      const data = await employeeService.getNonTeachingStaff();
      console.log('Non-teaching staff data received:', data);
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (err) {
      console.error('Error fetching non-teaching staff:', err);
      setError(err.message || 'Failed to fetch non-teaching staff');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, employeeName) => {
    if (window.confirm(`Are you sure you want to delete "${employeeName}"?`)) {
      try {
        await employeeService.delete(id);
        setEmployees(employees.filter(employee => employee.id !== id));
        setFilteredEmployees(filteredEmployees.filter(employee => employee.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete employee');
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
        <h2>Non-Teaching Staff Management</h2>
        <Link to="/employees/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Non-Teaching Staff
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
              <label className="form-label small">First Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search first name..."
                value={filters.firstName}
                onChange={(e) => handleFilterChange('firstName', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Last Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search last name..."
                value={filters.lastName}
                onChange={(e) => handleFilterChange('lastName', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Email</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search email..."
                value={filters.email}
                onChange={(e) => handleFilterChange('email', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Employee Code</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search employee code..."
                value={filters.employeeCode}
                onChange={(e) => handleFilterChange('employeeCode', e.target.value)}
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
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
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
          <h5 className="mb-0">Non-Teaching Staff</h5>
          <span className="badge bg-secondary">
            Showing {paginatedEmployees.length} of {filteredEmployees.length} non-teaching staff
          </span>
        </div>
        <div className="card-body">
          {filteredEmployees.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-briefcase display-4 text-muted"></i>
              <p className="text-muted mt-3">No non-teaching staff found</p>
              <Link to="/employees/create" className="btn btn-outline-primary">
                Create First Non-Teaching Staff
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Father's Name</th>
                      <th>Designation</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Mobile</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedEmployees.map((employee) => (
                      <tr key={employee.id}>
                        <td>
                          <Link to={`/employees/${employee.id}`} className="text-decoration-none">
                            {`${employee.firstName || ''} ${employee.lastName || ''}`.trim() || 'N/A'}
                          </Link>
                        </td>
                        <td>{employee.fathersName || 'N/A'}</td>
                        <td>{employee.designationName || 'N/A'}</td>
                        <td>{employee.emailId || 'N/A'}</td>
                        <td>{employee.phoneNumber || 'N/A'}</td>
                        <td>{employee.mobileNumber || 'N/A'}</td>
                        <td>{employee.categoryName || 'N/A'}</td>
                        <td>
                          <span className={`badge bg-${employee.isActive ? 'success' : 'danger'}`}>
                            {employee.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/employees/${employee.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/employees/${employee.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(employee.id, `${employee.firstName} ${employee.lastName}`)}
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

export default NonTeachingStaffList;
