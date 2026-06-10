import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { employeeSalaryDetailService } from '../../services/employeeSalaryDetailService';

const EmployeeSalaryDetailList = () => {
  const [salaryDetails, setSalaryDetails] = useState([]);
  const [filteredSalaryDetails, setFilteredSalaryDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    employeeName: '',
    month: '',
    year: '',
    status: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchSalaryDetails();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [salaryDetails, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredSalaryDetails.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSalaryDetails = filteredSalaryDetails.slice(startIndex, endIndex);

  const applyFilters = () => {
    let filtered = salaryDetails;

    if (filters.employeeName) {
      filtered = filtered.filter(salary =>
        salary.employeeName?.toLowerCase().includes(filters.employeeName.toLowerCase())
      );
    }

    if (filters.month) {
      filtered = filtered.filter(salary =>
        salary.month?.toLowerCase() === filters.month.toLowerCase()
      );
    }

    if (filters.year) {
      filtered = filtered.filter(salary =>
        salary.year?.toString() === filters.year
      );
    }

    if (filters.status) {
      filtered = filtered.filter(salary =>
        salary.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    setFilteredSalaryDetails(filtered);
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
      month: '',
      year: '',
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

  const fetchSalaryDetails = async () => {
    try {
      setLoading(true);
      const data = await employeeSalaryDetailService.getAll();
      setSalaryDetails(data);
      setFilteredSalaryDetails(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch salary details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, employeeName) => {
    if (window.confirm(`Are you sure you want to delete salary record for "${employeeName}"?`)) {
      try {
        await employeeSalaryDetailService.delete(id);
        // Refresh the salary details list after successful deletion
        await fetchSalaryDetails();
      } catch (err) {
        setError(err.message || 'Failed to delete salary record');
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Paid': { bg: 'success', icon: 'check-circle' },
      'Pending': { bg: 'warning', icon: 'clock' },
      'Processing': { bg: 'info', icon: 'gear' },
      'Failed': { bg: 'danger', icon: 'x-circle' }
    };
    
    const config = statusConfig[status] || { bg: 'secondary', icon: 'question-circle' };
    
    return (
      <span className={`badge bg-${config.bg}`}>
        <i className={`bi bi-${config.icon} me-1`}></i>
        {status}
      </span>
    );
  };

  const getCurrentYear = () => new Date().getFullYear();
  const getYears = () => {
    const years = [];
    for (let i = getCurrentYear(); i >= getCurrentYear() - 5; i--) {
      years.push(i);
    }
    return years;
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
        <h2>Employee Salary Details</h2>
        <Link to="/employee-salary-details/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Salary Record
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
              <label className="form-label small">Month</label>
              <select
                className="form-select form-select-sm"
                value={filters.month}
                onChange={(e) => handleFilterChange('month', e.target.value)}
              >
                <option value="">All Months</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <div className="col">
              <label className="form-label small">Year</label>
              <select
                className="form-select form-select-sm"
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
              >
                <option value="">All Years</option>
                {getYears().map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="col">
              <label className="form-label small">Status</label>
              <select
                className="form-select form-select-sm"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Failed">Failed</option>
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
          <h5 className="mb-0">All Salary Records</h5>
          <span className="badge bg-secondary">
            Showing {paginatedSalaryDetails.length} of {filteredSalaryDetails.length} records
          </span>
        </div>
        <div className="card-body">
          {filteredSalaryDetails.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-currency-dollar display-4 text-muted"></i>
              <p className="text-muted mt-3">No salary records found</p>
              <Link to="/employee-salary-details/create" className="btn btn-outline-primary">
                Create First Salary Record
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Month/Year</th>
                      <th>Basic Salary</th>
                      <th>Gross Salary</th>
                      <th>Total Deductions</th>
                      <th>Net Salary</th>
                      <th>Payment Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedSalaryDetails.map((salary) => (
                      <tr key={salary.id}>
                        <td>
                          <Link to={`/employees/${salary.employeeId}`} className="text-decoration-none">
                            {salary.employeeName}
                            <div className="small text-muted">{salary.employeeCode}</div>
                          </Link>
                        </td>
                        <td>
                          {salary.month} {salary.year}
                        </td>
                        <td>₹{salary.basicSalary.toLocaleString()}</td>
                        <td>₹{salary.grossSalary.toLocaleString()}</td>
                        <td>₹{salary.totalDeductions.toLocaleString()}</td>
                        <td>
                          <strong>₹{salary.netSalary.toLocaleString()}</strong>
                        </td>
                        <td>{salary.paymentDate}</td>
                        <td>{getStatusBadge(salary.status)}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/employee-salary-details/${salary.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/employee-salary-details/${salary.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(salary.id, salary.employeeName)}
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

export default EmployeeSalaryDetailList;
