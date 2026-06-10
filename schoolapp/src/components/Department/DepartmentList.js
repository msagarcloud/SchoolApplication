import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { departmentService } from '../../services/departmentService';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    departmentName: '',
    hodName: '',
    status: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [departments, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDepartments = filteredDepartments.slice(startIndex, endIndex);

  const applyFilters = () => {
    let filtered = departments;

    if (filters.departmentName) {
      filtered = filtered.filter(dept =>
        dept.departmentName?.toLowerCase().includes(filters.departmentName.toLowerCase())
      );
    }

    if (filters.hodName) {
      filtered = filtered.filter(dept =>
        dept.hodName?.toLowerCase().includes(filters.hodName.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(dept =>
        dept.isActive?.toString() === (filters.status === 'Active' ? 'true' : 'false')
      );
    }

    setFilteredDepartments(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      departmentName: '',
      hodName: '',
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

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const data = await departmentService.getAll();
      setDepartments(data);
      setFilteredDepartments(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch departments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, departmentName) => {
    if (window.confirm(`Are you sure you want to delete "${departmentName}"?`)) {
      try {
        await departmentService.delete(id);
        // Refresh the departments list after successful deletion
        await fetchDepartments();
      } catch (err) {
        setError(err.message || 'Failed to delete department');
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
        <h2>Departments</h2>
        <Link to="/departments/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Department
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
              <label className="form-label small">Department Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search department..."
                value={filters.departmentName}
                onChange={(e) => handleFilterChange('departmentName', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">HOD Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search HOD..."
                value={filters.hodName}
                onChange={(e) => handleFilterChange('hodName', e.target.value)}
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
          <h5 className="mb-0">All Departments</h5>
          <span className="badge bg-secondary">
            Showing {paginatedDepartments.length} of {filteredDepartments.length} departments
          </span>
        </div>
        <div className="card-body">
          {filteredDepartments.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-building display-4 text-muted"></i>
              <p className="text-muted mt-3">No departments found</p>
              <Link to="/departments/create" className="btn btn-outline-primary">
                Create First Department
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Department Name</th>
                      <th>Department Code</th>
                      <th>HOD</th>
                      <th>Employees</th>
                      <th>Students</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDepartments.map((dept) => (
                      <tr key={dept.id}>
                        <td>
                          <Link to={`/departments/${dept.id}`} className="text-decoration-none">
                            <strong>{dept.departmentName}</strong>
                            <div className="small text-muted">{dept.description}</div>
                          </Link>
                        </td>
                        <td>
                          <span className="badge bg-info">{dept.departmentCode}</span>
                        </td>
                        <td>
                          {dept.hodName ? (
                            <Link to={`/employees/${dept.hodEmployeeId}`} className="text-decoration-none">
                              {dept.hodName}
                            </Link>
                          ) : (
                            <span className="text-muted">Not Assigned</span>
                          )}
                        </td>
                        <td>
                          <span className="badge bg-primary">{dept.totalEmployees}</span>
                        </td>
                        <td>
                          <span className="badge bg-success">{dept.totalStudents}</span>
                        </td>
                        <td>
                          <div>{dept.floorNumber}</div>
                          <small className="text-muted">{dept.block}</small>
                        </td>
                        <td>
                          <span className={`badge bg-${dept.isActive ? 'success' : 'danger'}`}>
                            {dept.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/departments/${dept.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/departments/${dept.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(dept.id, dept.departmentName)}
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

export default DepartmentList;
