import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import driverService from '../../services/driverService';

const formatAddress = (driver) => {
  const parts = [driver.address1, driver.address2].filter(Boolean);
  return parts.length ? parts.join(', ') : 'N/A';
};

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    licenceNumber: '',
    status: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchDrivers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [drivers, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDrivers = filteredDrivers.slice(startIndex, endIndex);

  const applyFilters = () => {
    let filtered = drivers;

    if (filters.firstName) {
      filtered = filtered.filter(driver =>
        driver.firstName?.toLowerCase().includes(filters.firstName.toLowerCase())
      );
    }

    if (filters.lastName) {
      filtered = filtered.filter(driver =>
        driver.lastName?.toLowerCase().includes(filters.lastName.toLowerCase())
      );
    }

    if (filters.mobileNumber) {
      filtered = filtered.filter(driver =>
        driver.mobileNumber?.toLowerCase().includes(filters.mobileNumber.toLowerCase())
      );
    }

    if (filters.licenceNumber) {
      filtered = filtered.filter(driver =>
        driver.licenceNumber?.toLowerCase().includes(filters.licenceNumber.toLowerCase())
      );
    }

    if (filters.status) {
      const isActive = filters.status === 'active';
      filtered = filtered.filter(driver => driver.isActive === isActive);
    }

    setFilteredDrivers(filtered);
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
      mobileNumber: '',
      licenceNumber: '',
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

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      console.log('Fetching drivers...');
      const data = await driverService.getAll();
      console.log('Drivers data received:', data);
      setDrivers(data);
      setFilteredDrivers(data);
    } catch (err) {
      console.error('Error fetching drivers:', err);
      const message = err?.message || '';
      if (message.includes('timed out') || message.includes('timeout')) {
        setError(
          'Could not load drivers — the API did not respond in time. Ensure the School Demo API is running at http://localhost:5260 and the database is reachable.'
        );
      } else if (message.includes('Failed to fetch') || message.includes('Network')) {
        setError(
          'Could not connect to the API. Start the School Demo API (http://localhost:5260) and refresh this page.'
        );
      } else {
        setError(message || 'Failed to fetch drivers');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, driverName) => {
    if (window.confirm(`Are you sure you want to delete "${driverName}"?`)) {
      try {
        await driverService.delete(id);
        setDrivers(drivers.filter(driver => driver.id !== id));
        setFilteredDrivers(filteredDrivers.filter(driver => driver.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete driver');
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
        <h2>Driver Management</h2>
        <Link to="/drivers/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Driver
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
              <label className="form-label small">Mobile Number</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search mobile..."
                value={filters.mobileNumber}
                onChange={(e) => handleFilterChange('mobileNumber', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">License Number</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search license..."
                value={filters.licenceNumber}
                onChange={(e) => handleFilterChange('licenceNumber', e.target.value)}
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
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
          <h5 className="mb-0">All Drivers</h5>
          <span className="badge bg-secondary">
            Showing {paginatedDrivers.length} of {filteredDrivers.length} drivers
          </span>
        </div>
        <div className="card-body">
          {filteredDrivers.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-truck display-4 text-muted"></i>
              <p className="text-muted mt-3">No drivers found</p>
              <Link to="/drivers/create" className="btn btn-outline-primary">
                Create First Driver
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>License Number</th>
                      <th>Mobile Number</th>
                      <th>Phone Number</th>
                      <th>Address</th>
                      <th>License Valid Until</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDrivers.map((driver) => (
                      <tr key={driver.id}>
                        <td>
                          <Link to={`/drivers/${driver.id}`} className="text-decoration-none">
                            {`${driver.firstName || ''} ${driver.lastName || ''}`.trim() || 'N/A'}
                          </Link>
                        </td>
                        <td>{driver.licenceNumber || 'N/A'}</td>
                        <td>{driver.mobileNumber || 'N/A'}</td>
                        <td>{driver.phoneNumber || 'N/A'}</td>
                        <td>{formatAddress(driver)}</td>
                        <td>
                          {driver.licenceValidUptoDate 
                            ? new Date(driver.licenceValidUptoDate).toLocaleDateString()
                            : 'N/A'
                          }
                        </td>
                        <td>
                          <span className={`badge bg-${driver.isActive ? 'success' : 'danger'}`}>
                            {driver.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/drivers/${driver.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/drivers/${driver.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(driver.id, `${driver.firstName} ${driver.lastName}`)}
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

export default DriverList;
