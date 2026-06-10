import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import timeTablePeriodService from '../../services/timeTablePeriodService';

const TimeTablePeriodList = () => {
  const [timeTablePeriods, setTimeTablePeriods] = useState([]);
  const [filteredPeriods, setFilteredPeriods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    description: '',
    periodNumber: '',
    isActive: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchTimeTablePeriods();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [timeTablePeriods, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const fetchTimeTablePeriods = async () => {
    try {
      setLoading(true);
      const data = await timeTablePeriodService.getAll();
      setTimeTablePeriods(data);
      setFilteredPeriods(data);
    } catch (err) {
      // Check if it's a 404 error (API not implemented)
      if (err.message.includes('404') || err.message.includes('Failed to fetch')) {
        setError('TimeTablePeriod API is not yet implemented. Please contact the backend team to set up the TimeTablePeriod Management API endpoints.');
      } else {
        setError(err.message || 'Failed to fetch time table periods');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, periodDescription) => {
    if (window.confirm(`Are you sure you want to delete "${periodDescription}"?`)) {
      try {
        await timeTablePeriodService.delete(id);
        setTimeTablePeriods(timeTablePeriods.filter(period => period.id !== id));
        setFilteredPeriods(filteredPeriods.filter(period => period.id !== id));
      } catch (err) {
        // Check if it's a 404 error (API not implemented)
        if (err.message.includes('404') || err.message.includes('Failed to fetch')) {
          setError('TimeTablePeriod API is not yet implemented. Delete operations are not available until the backend is set up.');
        } else {
          setError(err.message || 'Failed to delete time table period');
        }
      }
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const applyFilters = () => {
    let filtered = [...timeTablePeriods];

    if (filters.description) {
      filtered = filtered.filter(period =>
        period.description.toLowerCase().includes(filters.description.toLowerCase())
      );
    }

    if (filters.periodNumber) {
      filtered = filtered.filter(period =>
        period.periodNumber.toLowerCase().includes(filters.periodNumber.toLowerCase())
      );
    }

    if (filters.isActive !== '') {
      filtered = filtered.filter(period => period.isActive === (filters.isActive === 'true'));
    }

    // Sort by period number
    filtered.sort((a, b) => {
      const periodA = parseInt(a.periodNumber) || 0;
      const periodB = parseInt(b.periodNumber) || 0;
      return periodA - periodB;
    });

    setFilteredPeriods(filtered);
  };

  const clearFilters = () => {
    setFilters({
      description: '',
      periodNumber: '',
      isActive: ''
    });
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredPeriods.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPeriods = filteredPeriods.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const formatTime = (time) => {
    if (!time) return 'N/A';
    // Handle TimeOnly format
    return time.toString().substring(0, 5);
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
        <h2>Time Table Period Management</h2>
        <Link to="/timetableperiods/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Period
        </Link>
      </div>

      {error && (
        <div className={`alert ${error.includes('not yet implemented') ? 'alert-warning' : 'alert-danger'}`} role="alert">
          <div className="d-flex align-items-center">
            <i className={`bi ${error.includes('not yet implemented') ? 'bi-exclamation-triangle' : 'bi-exclamation-circle'} me-2`}></i>
            <div>
              <strong>{error.includes('not yet implemented') ? 'API Not Available' : 'Error'}</strong>
              <div className="small">{error}</div>
            </div>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Filters</h5>
        </div>
        <div className="card-body">
          <div className="row g-2 align-items-end">
            <div className="col-md-3">
              <label className="form-label small">Description</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={filters.description}
                onChange={(e) => handleFilterChange('description', e.target.value)}
                placeholder="Search description..."
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small">Period Number</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={filters.periodNumber}
                onChange={(e) => handleFilterChange('periodNumber', e.target.value)}
                placeholder="Search period number..."
              />
            </div>
            <div className="col-md-2">
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
            <div className="col-md-2">
              <button className="btn btn-secondary btn-sm w-100" onClick={clearFilters}>
                <i className="bi bi-x-circle me-2"></i>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="alert alert-info">
        Showing {paginatedPeriods.length} of {filteredPeriods.length} periods
        {filteredPeriods.length !== timeTablePeriods.length && (
          <span> (filtered from {timeTablePeriods.length} total)</span>
        )}
      </div>

      {/* Periods Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Time Table Periods</h5>
        </div>
        <div className="card-body">
          {paginatedPeriods.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-clock fs-1 mb-3"></i>
              <h5>No Time Table Periods Found</h5>
              <p className="text-muted">
                {filteredPeriods.length === 0 && timeTablePeriods.length > 0
                  ? 'Try adjusting your filters.'
                  : 'No time table periods have been added yet.'}
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Period Number</th>
                    <th>Description</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPeriods.map((period) => (
                    <tr key={period.id}>
                      <td>
                        <span className="badge bg-primary">{period.periodNumber}</span>
                      </td>
                      <td>{period.description}</td>
                      <td>{formatTime(period.startTime)}</td>
                      <td>{formatTime(period.endTime)}</td>
                      <td>
                        <span className={`badge ${period.isActive ? 'bg-success' : 'bg-danger'}`}>
                          {period.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link
                            to={`/timetableperiods/${period.id}`}
                            className="btn btn-sm btn-outline-primary"
                            title="View Details"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link
                            to={`/timetableperiods/${period.id}/edit`}
                            className="btn btn-sm btn-outline-warning"
                            title="Edit"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(period.id, period.description)}
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
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="Periods pagination">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <li
                    key={page}
                    className={`page-item ${currentPage === page ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeTablePeriodList;
