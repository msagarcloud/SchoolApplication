import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { employeeLeaveService } from '../../services/employeeLeaveService';

const EmployeeLeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    employeeName: '',
    leaveType: '',
    status: '',
    fromDate: '',
    toDate: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchLeaves();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [leaves, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLeaves = filteredLeaves.slice(startIndex, endIndex);

  const applyFilters = () => {
    let filtered = leaves;

    if (filters.employeeName) {
      filtered = filtered.filter(leave =>
        leave.employeeName?.toLowerCase().includes(filters.employeeName.toLowerCase())
      );
    }

    if (filters.leaveType) {
      filtered = filtered.filter(leave =>
        leave.leaveType?.toLowerCase().includes(filters.leaveType.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(leave =>
        leave.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.fromDate) {
      filtered = filtered.filter(leave =>
        leave.fromDate >= filters.fromDate
      );
    }

    if (filters.toDate) {
      filtered = filtered.filter(leave =>
        leave.toDate <= filters.toDate
      );
    }

    setFilteredLeaves(filtered);
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
      leaveType: '',
      status: '',
      fromDate: '',
      toDate: ''
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

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const data = await employeeLeaveService.getAll();
      setLeaves(data);
      setFilteredLeaves(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch employee leaves');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, employeeName) => {
    if (window.confirm(`Are you sure you want to delete leave request for "${employeeName}"?`)) {
      try {
        await employeeLeaveService.delete(id);
        // Refresh the leaves list after successful deletion
        await fetchLeaves();
      } catch (err) {
        setError(err.message || 'Failed to delete leave request');
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Approved': { bg: 'success', icon: 'check-circle' },
      'Rejected': { bg: 'danger', icon: 'x-circle' },
      'Pending': { bg: 'warning', icon: 'clock' },
      'Cancelled': { bg: 'secondary', icon: 'dash-circle' }
    };
    
    const config = statusConfig[status] || { bg: 'secondary', icon: 'question-circle' };
    
    return (
      <span className={`badge bg-${config.bg}`}>
        <i className={`bi bi-${config.icon} me-1`}></i>
        {status}
      </span>
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
        <h2>Employee Leaves</h2>
        <Link to="/employee-leaves/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Leave Request
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
              <label className="form-label small">Leave Type</label>
              <select
                className="form-select form-select-sm"
                value={filters.leaveType}
                onChange={(e) => handleFilterChange('leaveType', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Personal Leave">Personal Leave</option>
                <option value="Maternity Leave">Maternity Leave</option>
                <option value="Paternity Leave">Paternity Leave</option>
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
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="col">
              <label className="form-label small">From Date</label>
              <input
                type="date"
                className="form-control form-control-sm"
                value={filters.fromDate}
                onChange={(e) => handleFilterChange('fromDate', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">To Date</label>
              <input
                type="date"
                className="form-control form-control-sm"
                value={filters.toDate}
                onChange={(e) => handleFilterChange('toDate', e.target.value)}
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
          <h5 className="mb-0">All Leave Requests</h5>
          <span className="badge bg-secondary">
            Showing {paginatedLeaves.length} of {filteredLeaves.length} requests
          </span>
        </div>
        <div className="card-body">
          {filteredLeaves.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-calendar-x display-4 text-muted"></i>
              <p className="text-muted mt-3">No leave requests found</p>
              <Link to="/employee-leaves/create" className="btn btn-outline-primary">
                Create First Leave Request
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Leave Type</th>
                      <th>From Date</th>
                      <th>To Date</th>
                      <th>Days</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Applied Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedLeaves.map((leave) => (
                      <tr key={leave.id}>
                        <td>
                          <Link to={`/employees/${leave.employeeId}`} className="text-decoration-none">
                            {leave.employeeName}
                            <div className="small text-muted">{leave.employeeCode}</div>
                          </Link>
                        </td>
                        <td>{leave.leaveType}</td>
                        <td>{leave.fromDate}</td>
                        <td>{leave.toDate}</td>
                        <td>{leave.days}</td>
                        <td>
                          <span className="text-truncate d-inline-block" style={{ maxWidth: '150px' }} title={leave.reason}>
                            {leave.reason}
                          </span>
                        </td>
                        <td>{getStatusBadge(leave.status)}</td>
                        <td>{leave.appliedDate}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/employee-leaves/${leave.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/employee-leaves/${leave.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(leave.id, leave.employeeName)}
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

export default EmployeeLeaveList;
