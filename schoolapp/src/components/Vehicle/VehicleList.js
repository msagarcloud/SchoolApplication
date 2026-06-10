import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import vehicleService from '../../services/vehicleService';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    vehicleNumber: '',
    vehicleType: '',
    status: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [vehicles, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVehicles = filteredVehicles.slice(startIndex, endIndex);

  const applyFilters = () => {
    let filtered = vehicles;

    if (filters.vehicleNumber) {
      filtered = filtered.filter(vehicle =>
        vehicle.vehicleNumber?.toLowerCase().includes(filters.vehicleNumber.toLowerCase())
      );
    }

    if (filters.vehicleType) {
      filtered = filtered.filter(vehicle =>
        vehicle.vehicleType?.toLowerCase().includes(filters.vehicleType.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(vehicle =>
        vehicle.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    setFilteredVehicles(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      vehicleNumber: '',
      vehicleType: '',
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

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const data = await vehicleService.getVehicles();
      setVehicles(data);
      setFilteredVehicles(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch vehicles');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, vehicleNumber) => {
    if (window.confirm(`Are you sure you want to delete vehicle "${vehicleNumber}"?`)) {
      try {
        await vehicleService.deleteVehicle(id);
        setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
        setFilteredVehicles(filteredVehicles.filter(vehicle => vehicle.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete vehicle');
      }
    }
  };

  const handleCheckOut = async (id, vehicleNumber) => {
    if (window.confirm(`Check out vehicle "${vehicleNumber}"?`)) {
      try {
        await vehicleService.checkOutVehicle(id);
        const updatedVehicles = vehicles.map(vehicle => 
          vehicle.id === id 
            ? { ...vehicle, status: 'Completed', checkOutTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
            : vehicle
        );
        setVehicles(updatedVehicles);
        setFilteredVehicles(updatedVehicles);
      } catch (err) {
        setError(err.message || 'Failed to check out vehicle');
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { bg: 'success', icon: 'check-circle' },
      'Inactive': { bg: 'danger', icon: 'x-circle' },
      'Maintenance': { bg: 'warning', icon: 'gear' },
      'Retired': { bg: 'secondary', icon: 'dash-circle' }
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
        <h2>Vehicle Management</h2>
        <Link to="/vehicles/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Vehicle
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
              <label className="form-label small">Vehicle Number</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search vehicle number..."
                value={filters.vehicleNumber}
                onChange={(e) => handleFilterChange('vehicleNumber', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Vehicle Type</label>
              <select
                className="form-select form-select-sm"
                value={filters.vehicleType}
                onChange={(e) => handleFilterChange('vehicleType', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Bus">Bus</option>
                <option value="Van">Van</option>
                <option value="Car">Car</option>
                <option value="Auto Rickshaw">Auto Rickshaw</option>
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
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Retired">Retired</option>
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
          <h5 className="mb-0">All Vehicles</h5>
          <span className="badge bg-secondary">
            Showing {paginatedVehicles.length} of {filteredVehicles.length} vehicles
          </span>
        </div>
        <div className="card-body">
          {filteredVehicles.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-truck display-4 text-muted"></i>
              <p className="text-muted mt-3">No vehicles found</p>
              <Link to="/vehicles/create" className="btn btn-outline-primary">
                Add First Vehicle
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Vehicle Number</th>
                      <th>Type</th>
                      <th>Make/Model</th>
                      <th>Capacity</th>
                      <th>Driver</th>
                      <th>Route</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedVehicles.map((vehicle) => (
                      <tr key={vehicle.id}>
                        <td>
                          <Link to={`/vehicles/${vehicle.id}`} className="text-decoration-none">
                            <strong>{vehicle.vehicleNumber}</strong>
                            <div className="small text-muted">{vehicle.registrationNumber}</div>
                          </Link>
                        </td>
                        <td>
                          <span className="badge bg-info">{vehicle.vehicleType}</span>
                        </td>
                        <td>
                          <div>{vehicle.make}</div>
                          <small className="text-muted">{vehicle.model} ({vehicle.year})</small>
                        </td>
                        <td>
                          <span className="badge bg-primary">{vehicle.capacity} Seats</span>
                        </td>
                        <td>
                          {vehicle.driverName ? (
                            <Link to={`/drivers/${vehicle.driverId}`} className="text-decoration-none">
                              {vehicle.driverName}
                            </Link>
                          ) : (
                            <span className="text-muted">Not Assigned</span>
                          )}
                        </td>
                        <td>
                          {vehicle.routeName ? (
                            <Link to={`/routes/${vehicle.routeId}`} className="text-decoration-none">
                              {vehicle.routeName}
                            </Link>
                          ) : (
                            <span className="text-muted">Not Assigned</span>
                          )}
                        </td>
                        <td>{getStatusBadge(vehicle.status)}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/vehicles/${vehicle.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/vehicles/${vehicle.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(vehicle.id, vehicle.vehicleNumber)}
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

export default VehicleList;
