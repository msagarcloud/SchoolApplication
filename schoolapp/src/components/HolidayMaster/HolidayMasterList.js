import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { holidayService } from '../../services/holidayService';
import { authService } from '../../services/authService';

const getHolidayValue = (holiday, key) => {
  if (holiday?.[key] !== undefined && holiday[key] !== null) return holiday[key];
  
  const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
  if (holiday?.[pascalKey] !== undefined && holiday[pascalKey] !== null) return holiday[pascalKey];
  
  const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
  if (holiday?.[snakeKey] !== undefined && holiday[snakeKey] !== null) return holiday[snakeKey];
  
  const upperSnakeKey = snakeKey.toUpperCase();
  if (holiday?.[upperSnakeKey] !== undefined && holiday[upperSnakeKey] !== null) return holiday[upperSnakeKey];
  
  const lowerKey = key.toLowerCase();
  if (holiday?.[lowerKey] !== undefined && holiday[lowerKey] !== null) return holiday[lowerKey];
  
  return undefined;
};

const HolidayMasterList = () => {
  const [holidays, setHolidays] = useState([]);
  const [filteredHolidays, setFilteredHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    name: '',
    status: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const applyFilters = useCallback(() => {
    let filtered = holidays;

    if (filters.name) {
      filtered = filtered.filter(holiday => {
        const holidayName = getHolidayValue(holiday, 'name');
        return holidayName?.toLowerCase().includes(filters.name.toLowerCase());
      });
    }

    if (filters.status) {
      filtered = filtered.filter(holiday => {
        const isActive = getHolidayValue(holiday, 'isActive');
        return isActive?.toString() === (filters.status === 'Active' ? 'true' : 'false');
      });
    }

    setFilteredHolidays(filtered);
  }, [holidays, filters]);

  useEffect(() => {
    fetchHolidays();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const safeFilteredHolidays = Array.isArray(filteredHolidays) ? filteredHolidays : [];
  const totalPages = Math.ceil(safeFilteredHolidays.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHolidays = safeFilteredHolidays.slice(startIndex, endIndex);


  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: '',
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

  const fetchHolidays = async () => {
    try {
      setLoading(true);
      let data = await holidayService.getAll();
      
      if (data?.data && Array.isArray(data.data)) {
        data = data.data;
      } else if (data?.result && Array.isArray(data.result)) {
        data = data.result;
      }

      // Ensure we always store arrays to prevent UI runtime crashes.
      if (!Array.isArray(data)) {
        data = [];
      }

      setHolidays(data);
      setFilteredHolidays(data);

    } catch (err) {
      setError(err.message || 'Failed to fetch holidays');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await holidayService.delete(id);
        await fetchHolidays();
      } catch (err) {
        setError(err.message || 'Failed to delete holiday');
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
      <div className="row mb-3">
        <div className="col-12">
          <div className="card bg-light">
            <div className="card-body py-2">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h6 className="mb-0 text-primary">
                    <i className="bi bi-building me-2"></i>
                    <strong>{authService.getSchoolName() || 'School Name'}</strong>
                  </h6>
                </div>
                <div className="col-md-6 text-md-end">
                  <h6 className="mb-0 text-secondary">
                    <i className="bi bi-briefcase me-2"></i>
                    {authService.getCompanyName() || 'Company Name'}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Holidays</h2>
        <Link to="/holidaymaster/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Holiday
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Filters</h5>
        </div>
        <div className="card-body">
          <div className="row g-2 align-items-end">
            <div className="col">
              <label className="form-label small">Holiday Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search holiday..."
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
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
          <h5 className="mb-0">All Holidays</h5>
          <span className="badge bg-secondary">
            Showing {paginatedHolidays.length} of {filteredHolidays.length} holidays
          </span>
        </div>
        <div className="card-body">
          {filteredHolidays.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-calendar-event display-4 text-muted"></i>
              <p className="text-muted mt-3">No holidays found</p>
              <Link to="/holidaymaster/create" className="btn btn-outline-primary">
                Create First Holiday
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Holiday Name</th>
                      <th>From Date</th>
                      <th>To Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedHolidays.map((holiday) => {
                      const holidayId = getHolidayValue(holiday, 'id');
                      const holidayName = getHolidayValue(holiday, 'name') || 'N/A';
                      const fromDate = getHolidayValue(holiday, 'fromDate');
                      const toDate = getHolidayValue(holiday, 'toDate');
                      const isActive = getHolidayValue(holiday, 'isActive');

                      const formatDate = (date) => {
                        if (!date) return 'N/A';
                        return new Date(date).toLocaleDateString();
                      };

                      return (
                        <tr key={holidayId}>
                          <td>
                            <Link to={`/holidaymaster/${holidayId}`} className="text-decoration-none">
                              <strong>{holidayName}</strong>
                            </Link>
                          </td>
                          <td>{formatDate(fromDate)}</td>
                          <td>{formatDate(toDate)}</td>
                          <td>
                            <span className={`badge bg-${isActive ? 'success' : 'danger'}`}>
                              {isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            <div className="btn-group" role="group">
                              <Link 
                                to={`/holidaymaster/${holidayId}`} 
                                className="btn btn-sm btn-outline-primary"
                                title="View"
                              >
                                <i className="bi bi-eye"></i>
                              </Link>
                              <Link 
                                to={`/holidaymaster/${holidayId}/edit`} 
                                className="btn btn-sm btn-outline-warning"
                                title="Edit"
                              >
                                <i className="bi bi-pencil"></i>
                              </Link>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(holidayId, holidayName)}
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

export default HolidayMasterList;
