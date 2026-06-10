import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import vehicleService from '../../services/vehicleService';
import driverService from '../../services/driverService';
import routeService from '../../services/routeService';

const VehicleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [vehicle, setVehicle] = useState({
    vehicleNumber: '',
    vehicleType: '',
    capacity: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    registrationNumber: '',
    insuranceExpiryDate: '',
    pollutionExpiryDate: '',
    status: 'Active',
    driverId: '',
    routeId: '',
    fuelType: 'Diesel',
    lastMaintenanceDate: '',
    nextMaintenanceDate: '',
    notes: ''
  });

  const [drivers, setDrivers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDrivers();
    fetchRoutes();
    if (isEdit) {
      fetchVehicle();
    }
  }, [id, isEdit]);

  const fetchDrivers = async () => {
    try {
      const data = await driverService.getAll();
      const driverList = Array.isArray(data) ? data : [];
      setDrivers(driverList.filter((d) => d.isActive !== false && d.isDeleted !== true));
    } catch (err) {
      console.error('Failed to fetch drivers:', err);
    }
  };

  const fetchRoutes = async () => {
    try {
      const data = await routeService.getAll();
      const routeList = Array.isArray(data) ? data : [];
      setRoutes(routeList.filter((r) => r.isActive !== false && r.isDeleted !== true));
    } catch (err) {
      console.error('Failed to fetch routes:', err);
    }
  };

  const fetchVehicle = async () => {
    try {
      setLoading(true);
      const data = await vehicleService.getVehicleById(id);
      setVehicle(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch vehicle details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setVehicle(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : parseInt(value)) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      // Validate required fields
      if (!vehicle.vehicleNumber || !vehicle.vehicleType || !vehicle.capacity || !vehicle.make || !vehicle.model) {
        setError('Please fill in all required fields');
        return;
      }
      
      // Validate year
      const currentYear = new Date().getFullYear();
      const vehicleYear = parseInt(vehicle.year);
      if (vehicleYear < 1900 || vehicleYear > currentYear + 1) {
        setError(`Year must be between 1900 and ${currentYear + 1}`);
        return;
      }
      
      // Validate capacity
      const capacity = parseInt(vehicle.capacity);
      if (capacity < 1 || capacity > 100) {
        setError('Capacity must be between 1 and 100');
        return;
      }
      
      // Call appropriate API method
      if (isEdit) {
        await vehicleService.updateVehicle(id, vehicle);
      } else {
        await vehicleService.createVehicle(vehicle);
      }
      
      navigate('/vehicles');
    } catch (err) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} vehicle`);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentYear = () => new Date().getFullYear();
  const getYears = () => {
    const years = [];
    for (let i = getCurrentYear(); i >= getCurrentYear() - 20; i--) {
      years.push(i);
    }
    return years;
  };

  if (loading && isEdit) {
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
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{isEdit ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/vehicles">Vehicle Management</Link>
              </li>
              <li className="breadcrumb-item active">
                {isEdit ? 'Edit' : 'Create'}
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/vehicles" className="btn btn-outline-secondary me-2">
            <i className="bi bi-x-lg me-2"></i>
            Cancel
          </Link>
          <button 
            type="submit" 
            form="vehicle-form"
            className="btn btn-primary"
            disabled={loading}
          >
            <i className="bi bi-check-lg me-2"></i>
            {loading ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Form Section */}
      <div className="card">
        <form id="vehicle-form" onSubmit={handleSubmit}>
          <div className="card-body">
            {/* Basic Information */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Basic Information</h5>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="vehicleNumber" className="form-label">
                    Vehicle Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="vehicleNumber"
                    name="vehicleNumber"
                    value={vehicle.vehicleNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., MH-12-AB-1234"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="registrationNumber" className="form-label">
                    Registration Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="registrationNumber"
                    name="registrationNumber"
                    value={vehicle.registrationNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., MH12AB1234"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="vehicleType" className="form-label">
                    Vehicle Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="vehicleType"
                    name="vehicleType"
                    value={vehicle.vehicleType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Vehicle Type</option>
                    <option value="Bus">Bus</option>
                    <option value="Van">Van</option>
                    <option value="Car">Car</option>
                    <option value="Auto Rickshaw">Auto Rickshaw</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="capacity" className="form-label">
                    Capacity (Seats) <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="capacity"
                    name="capacity"
                    value={vehicle.capacity}
                    onChange={handleInputChange}
                    min="1"
                    max="100"
                    placeholder="e.g., 50"
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="fuelType" className="form-label">
                    Fuel Type
                  </label>
                  <select
                    className="form-select"
                    id="fuelType"
                    name="fuelType"
                    value={vehicle.fuelType}
                    onChange={handleInputChange}
                  >
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="CNG">CNG</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="make" className="form-label">
                    Make <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="make"
                    name="make"
                    value={vehicle.make}
                    onChange={handleInputChange}
                    placeholder="e.g., Tata"
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="model" className="form-label">
                    Model <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="model"
                    name="model"
                    value={vehicle.model}
                    onChange={handleInputChange}
                    placeholder="e.g., Starbus"
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="year" className="form-label">
                    Year <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="year"
                    name="year"
                    value={vehicle.year}
                    onChange={handleInputChange}
                    required
                  >
                    {getYears().map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Assignment Information */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Assignment Information</h5>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="driverId" className="form-label">
                    Assigned Driver
                  </label>
                  <select
                    className="form-select"
                    id="driverId"
                    name="driverId"
                    value={vehicle.driverId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Driver</option>
                    {drivers.map((driver) => {
                      const driverName = `${driver.firstName || ''} ${driver.lastName || ''}`.trim() || 'Unknown Driver';
                      return (
                        <option key={driver.id} value={driver.id}>
                          {driverName}{driver.licenceNumber ? ` (${driver.licenceNumber})` : ''}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="routeId" className="form-label">
                    Assigned Route
                  </label>
                  <select
                    className="form-select"
                    id="routeId"
                    name="routeId"
                    value={vehicle.routeId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Route</option>
                    {routes.map((route) => (
                      <option key={route.id} value={route.id}>
                        {route.routeName}{route.distance != null ? ` (${route.distance} km)` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Compliance Information */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Compliance Information</h5>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="insuranceExpiryDate" className="form-label">
                    Insurance Expiry Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="insuranceExpiryDate"
                    name="insuranceExpiryDate"
                    value={vehicle.insuranceExpiryDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="pollutionExpiryDate" className="form-label">
                    Pollution Certificate Expiry Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="pollutionExpiryDate"
                    name="pollutionExpiryDate"
                    value={vehicle.pollutionExpiryDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="lastMaintenanceDate" className="form-label">
                    Last Maintenance Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="lastMaintenanceDate"
                    name="lastMaintenanceDate"
                    value={vehicle.lastMaintenanceDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="nextMaintenanceDate" className="form-label">
                    Next Maintenance Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="nextMaintenanceDate"
                    name="nextMaintenanceDate"
                    value={vehicle.nextMaintenanceDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Status and Notes */}
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={vehicle.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Retired">Retired</option>
                  </select>
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="notes" className="form-label">
                    Notes
                  </label>
                  <textarea
                    className="form-control"
                    id="notes"
                    name="notes"
                    rows="3"
                    value={vehicle.notes}
                    onChange={handleInputChange}
                    placeholder="Enter any additional notes about the vehicle..."
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleForm;
