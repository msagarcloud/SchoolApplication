import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { employeeProfessionalQualificationService } from '../../services/employeeProfessionalQualificationService';

const EmployeeProfessionalQualificationList = () => {
  const [qualifications, setQualifications] = useState([]);
  const [filteredQualifications, setFilteredQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    employeeName: '',
    qualification: '',
    specialization: '',
    institute: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchQualifications();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [qualifications, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredQualifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedQualifications = filteredQualifications.slice(startIndex, endIndex);

  const applyFilters = () => {
    let filtered = qualifications;

    if (filters.employeeName) {
      filtered = filtered.filter(qual =>
        qual.employeeName?.toLowerCase().includes(filters.employeeName.toLowerCase())
      );
    }

    if (filters.qualification) {
      filtered = filtered.filter(qual =>
        qual.qualification?.toLowerCase().includes(filters.qualification.toLowerCase())
      );
    }

    if (filters.specialization) {
      filtered = filtered.filter(qual =>
        qual.specialization?.toLowerCase().includes(filters.specialization.toLowerCase())
      );
    }

    if (filters.institute) {
      filtered = filtered.filter(qual =>
        qual.institute?.toLowerCase().includes(filters.institute.toLowerCase())
      );
    }

    setFilteredQualifications(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      employeeName: '',
      qualification: '',
      specialization: '',
      institute: ''
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

  const fetchQualifications = async () => {
    try {
      setLoading(true);
      const data = await employeeProfessionalQualificationService.getAll();
      setQualifications(data);
      setFilteredQualifications(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch professional qualifications');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, employeeName) => {
    if (window.confirm(`Are you sure you want to delete qualification for "${employeeName}"?`)) {
      try {
        await employeeProfessionalQualificationService.delete(id);
        // Refresh the qualifications list after successful deletion
        await fetchQualifications();
      } catch (err) {
        setError(err.message || 'Failed to delete qualification');
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
        <h2>Professional Qualifications</h2>
        <Link to="/employee-professional-qualifications/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Qualification
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
              <label className="form-label small">Employee Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search employee..."
                value={filters.employeeName}
                onChange={(e) => handleFilterChange('employeeName', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Qualification</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search qualification..."
                value={filters.qualification}
                onChange={(e) => handleFilterChange('qualification', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Specialization</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search specialization..."
                value={filters.specialization}
                onChange={(e) => handleFilterChange('specialization', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Institute</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search institute..."
                value={filters.institute}
                onChange={(e) => handleFilterChange('institute', e.target.value)}
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
          <h5 className="mb-0">All Professional Qualifications</h5>
          <span className="badge bg-secondary">
            Showing {paginatedQualifications.length} of {filteredQualifications.length} qualifications
          </span>
        </div>
        <div className="card-body">
          {filteredQualifications.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-mortarboard display-4 text-muted"></i>
              <p className="text-muted mt-3">No qualifications found</p>
              <Link to="/employee-professional-qualifications/create" className="btn btn-outline-primary">
                Add First Qualification
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Qualification</th>
                      <th>Specialization</th>
                      <th>Institute</th>
                      <th>University</th>
                      <th>Year of Passing</th>
                      <th>Percentage/Grade</th>
                      <th>Verification</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedQualifications.map((qual) => (
                      <tr key={qual.id}>
                        <td>
                          <Link to={`/employees/${qual.employeeId}`} className="text-decoration-none">
                            {qual.employeeName}
                            <div className="small text-muted">{qual.employeeCode}</div>
                          </Link>
                        </td>
                        <td>{qual.qualification}</td>
                        <td>{qual.specialization}</td>
                        <td>{qual.institute}</td>
                        <td>{qual.university}</td>
                        <td>{qual.yearOfPassing}</td>
                        <td>
                          <div>{qual.percentage}</div>
                          <small className="text-muted">{qual.grade}</small>
                        </td>
                        <td>
                          {qual.isVerified ? (
                            <span className="badge bg-success">
                              <i className="bi bi-check-circle me-1"></i>
                              Verified
                            </span>
                          ) : (
                            <span className="badge bg-warning">
                              <i className="bi bi-clock me-1"></i>
                              Pending
                            </span>
                          )}
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/employee-professional-qualifications/${qual.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/employee-professional-qualifications/${qual.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(qual.id, qual.employeeName)}
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

export default EmployeeProfessionalQualificationList;
