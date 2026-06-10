import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import visitorService from '../../services/visitorService';

const VisitorList = () => {
  const [visitors, setVisitors] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    visitorName: '',
    purpose: '',
    status: '',
    date: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchVisitors();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [visitors, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredVisitors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVisitors = filteredVisitors.slice(startIndex, endIndex);

  const applyFilters = () => {
    let filtered = visitors;

    if (filters.visitorName) {
      filtered = filtered.filter(visitor =>
        visitor.visitorName?.toLowerCase().includes(filters.visitorName.toLowerCase())
      );
    }

    if (filters.purpose) {
      filtered = filtered.filter(visitor =>
        visitor.purpose?.toLowerCase().includes(filters.purpose.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(visitor =>
        visitor.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.date) {
      filtered = filtered.filter(visitor =>
        visitor.visitDate === filters.date
      );
    }

    setFilteredVisitors(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      visitorName: '',
      purpose: '',
      status: '',
      date: ''
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

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const data = await visitorService.getVisitors();
      setVisitors(data);
      setFilteredVisitors(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch visitors');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, visitorName) => {
    if (window.confirm(`Are you sure you want to delete visitor record for "${visitorName}"?`)) {
      try {
        await visitorService.deleteVisitor(id);
        setVisitors(visitors.filter(visitor => visitor.id !== id));
        setFilteredVisitors(filteredVisitors.filter(visitor => visitor.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete visitor');
      }
    }
  };

  const handleCheckOut = async (id, visitorName) => {
    if (window.confirm(`Check out visitor "${visitorName}"?`)) {
      try {
        await visitorService.checkOutVisitor(id);
        const updatedVisitors = visitors.map(visitor => 
          visitor.id === id 
            ? { ...visitor, status: 'Completed', checkOutTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
            : visitor
        );
        setVisitors(updatedVisitors);
        setFilteredVisitors(updatedVisitors);
      } catch (err) {
        setError(err.message || 'Failed to check out visitor');
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { bg: 'primary', icon: 'clock' },
      'Completed': { bg: 'success', icon: 'check-circle' },
      'Cancelled': { bg: 'danger', icon: 'x-circle' },
      'Scheduled': { bg: 'warning', icon: 'calendar' }
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
        <h2>Visitor Management</h2>
        <Link to="/visitors/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Visitor
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
              <label className="form-label small">Visitor Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search visitor..."
                value={filters.visitorName}
                onChange={(e) => handleFilterChange('visitorName', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Purpose</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search purpose..."
                value={filters.purpose}
                onChange={(e) => handleFilterChange('purpose', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Date</label>
              <input
                type="date"
                className="form-control form-control-sm"
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
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
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Scheduled">Scheduled</option>
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
          <h5 className="mb-0">All Visitors</h5>
          <span className="badge bg-secondary">
            Showing {paginatedVisitors.length} of {filteredVisitors.length} visitors
          </span>
        </div>
        <div className="card-body">
          {filteredVisitors.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-person-badge display-4 text-muted"></i>
              <p className="text-muted mt-3">No visitors found</p>
              <Link to="/visitors/create" className="btn btn-outline-primary">
                Register First Visitor
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Visitor Name</th>
                      <th>Purpose</th>
                      <th>Person to Meet</th>
                      <th>Visit Date</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedVisitors.map((visitor) => (
                      <tr key={visitor.id}>
                        <td>
                          <Link to={`/visitors/${visitor.id}`} className="text-decoration-none">
                            <strong>{visitor.visitorName}</strong>
                            <div className="small text-muted">
                              {visitor.phone} | {visitor.email}
                            </div>
                          </Link>
                        </td>
                        <td>
                          <span className="badge bg-info">{visitor.purpose}</span>
                        </td>
                        <td>{visitor.personToMeet}</td>
                        <td>{visitor.visitDate}</td>
                        <td>{visitor.checkInTime}</td>
                        <td>
                          {visitor.checkOutTime ? (
                            <span className="text-success">{visitor.checkOutTime}</span>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td>{getStatusBadge(visitor.status)}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/visitors/${visitor.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/visitors/${visitor.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            {visitor.status === 'Active' && (
                              <button
                                className="btn btn-sm btn-outline-success"
                                onClick={() => handleCheckOut(visitor.id, visitor.visitorName)}
                                title="Check Out"
                              >
                                <i className="bi bi-box-arrow-right"></i>
                              </button>
                            )}
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(visitor.id, visitor.visitorName)}
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

export default VisitorList;
