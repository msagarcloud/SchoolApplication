import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import vehicleService from '../../services/vehicleService';

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVehicle();
  }, [id]);

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

  const handlePrint = () => {
    window.print();
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
      <span className={`badge bg-${config.bg} fs-6`}>
        <i className={`bi bi-${config.icon} me-1`}></i>
        {status}
      </span>
    );
  };

  const getExpiryStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { bg: 'danger', text: 'Expired' };
    } else if (diffDays <= 30) {
      return { bg: 'warning', text: 'Expiring Soon' };
    } else {
      return { bg: 'success', text: 'Valid' };
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

  if (error) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/vehicles" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Vehicles
        </Link>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Vehicle not found
        </div>
        <Link to="/vehicles" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Vehicles
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Vehicle Details</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/vehicles">Vehicle Management</Link>
              </li>
              <li className="breadcrumb-item active">Vehicle Details</li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/vehicles" className="btn btn-outline-secondary me-2">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <button className="btn btn-outline-info me-2" onClick={handlePrint}>
            <i className="bi bi-printer me-2"></i>
            Print
          </button>
          <Link to={`/vehicles/${id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
        </div>
      </div>

      {/* Vehicle Header */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center mb-2">
                <h3 className="mb-0 me-3">{vehicle.vehicleNumber}</h3>
                <span className="badge bg-info me-2">{vehicle.vehicleType}</span>
                {getStatusBadge(vehicle.status)}
              </div>
              <p className="text-muted mb-2">
                {vehicle.make} {vehicle.model} ({vehicle.year}) | {vehicle.registrationNumber}
              </p>
              <div className="d-flex gap-3">
                <small><i className="bi bi-speedometer2 me-1"></i> {vehicle.capacity} Seats</small>
                <small><i className="bi bi-fuel-pump me-1"></i> {vehicle.fuelType}</small>
                <small><i className="bi bi-geo-alt me-1"></i> {vehicle.routeName}</small>
              </div>
            </div>
            <div className="col-md-4 text-end">
              <div className="row g-2">
                <div className="col-6">
                  <div className="card bg-light">
                    <div className="card-body text-center py-2">
                      <h5 className="mb-0 text-primary">{vehicle.capacity}</h5>
                      <small className="text-muted">Capacity</small>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card bg-light">
                    <div className="card-body text-center py-2">
                      <h5 className="mb-0 text-info">{vehicle.routeDistance}</h5>
                      <small className="text-muted">Route</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          {/* Basic Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Basic Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Vehicle Number</label>
                    <p className="form-control-plaintext">{vehicle.vehicleNumber}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Registration Number</label>
                    <p className="form-control-plaintext">{vehicle.registrationNumber}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Vehicle Type</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-info">{vehicle.vehicleType}</span>
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Make</label>
                    <p className="form-control-plaintext">{vehicle.make}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Model</label>
                    <p className="form-control-plaintext">{vehicle.model}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Year</label>
                    <p className="form-control-plaintext">{vehicle.year}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Capacity</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-primary">{vehicle.capacity} Seats</span>
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Fuel Type</label>
                    <p className="form-control-plaintext">{vehicle.fuelType}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Status</label>
                    <p className="form-control-plaintext">
                      {getStatusBadge(vehicle.status)}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Notes</label>
                    <p className="form-control-plaintext">{vehicle.notes || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Assignment Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Assigned Driver</label>
                    <p className="form-control-plaintext">
                      {vehicle.driverName ? (
                        <Link to={`/drivers/${vehicle.driverId}`} className="text-decoration-none">
                          {vehicle.driverName}
                          <div className="small text-muted">
                            {vehicle.driverLicenseNumber} | {vehicle.driverContact}
                          </div>
                        </Link>
                      ) : (
                        <span className="text-muted">Not Assigned</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Assigned Route</label>
                    <p className="form-control-plaintext">
                      {vehicle.routeName ? (
                        <Link to={`/routes/${vehicle.routeId}`} className="text-decoration-none">
                          {vehicle.routeName}
                          <div className="small text-muted">Distance: {vehicle.routeDistance}</div>
                        </Link>
                      ) : (
                        <span className="text-muted">Not Assigned</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Compliance Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Insurance Expiry Date</label>
                    <p className="form-control-plaintext">
                      <div className="d-flex align-items-center">
                        <span>{vehicle.insuranceExpiryDate || 'Not Set'}</span>
                        {vehicle.insuranceExpiryDate && (
                          <span className={`badge bg-${getExpiryStatus(vehicle.insuranceExpiryDate).bg} ms-2`}>
                            {getExpiryStatus(vehicle.insuranceExpiryDate).text}
                          </span>
                        )}
                      </div>
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Pollution Certificate Expiry</label>
                    <p className="form-control-plaintext">
                      <div className="d-flex align-items-center">
                        <span>{vehicle.pollutionExpiryDate || 'Not Set'}</span>
                        {vehicle.pollutionExpiryDate && (
                          <span className={`badge bg-${getExpiryStatus(vehicle.pollutionExpiryDate).bg} ms-2`}>
                            {getExpiryStatus(vehicle.pollutionExpiryDate).text}
                          </span>
                        )}
                      </div>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Last Maintenance Date</label>
                    <p className="form-control-plaintext">{vehicle.lastMaintenanceDate || 'Not Set'}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Next Maintenance Date</label>
                    <p className="form-control-plaintext">{vehicle.nextMaintenanceDate || 'Not Set'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Documents</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Document Name</th>
                      <th>Type</th>
                      <th>Expiry Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicle.documents.map((doc, index) => (
                      <tr key={index}>
                        <td>{doc.name}</td>
                        <td>
                          <span className="badge bg-secondary">{doc.type}</span>
                        </td>
                        <td>{doc.expiryDate}</td>
                        <td>
                          <span className={`badge bg-${getExpiryStatus(doc.expiryDate).bg}`}>
                            {getExpiryStatus(doc.expiryDate).text}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Maintenance History */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Maintenance History</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Cost</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicle.maintenanceHistory.map((maintenance, index) => (
                      <tr key={index}>
                        <td>{maintenance.date}</td>
                        <td>
                          <span className="badge bg-info">{maintenance.type}</span>
                        </td>
                        <td>₹{maintenance.cost.toLocaleString()}</td>
                        <td>{maintenance.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          {/* Quick Actions */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link to={`/vehicles/${id}/edit`} className="btn btn-warning">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Vehicle
                </Link>
                <button 
                  className="btn btn-outline-danger"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this vehicle?')) {
                      // Implement delete functionality
                      window.alert('Delete functionality to be implemented');
                    }
                  }}
                >
                  <i className="bi bi-trash me-2"></i>
                  Delete Vehicle
                </button>
                <button className="btn btn-outline-info" onClick={handlePrint}>
                  <i className="bi bi-printer me-2"></i>
                  Print Details
                </button>
                <button className="btn btn-outline-success">
                  <i className="bi bi-file-earmark-plus me-2"></i>
                  Schedule Maintenance
                </button>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Timeline</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-muted">Added On</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-calendar-plus me-2"></i>
                  {vehicle.addedDate}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Added By</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-person-plus me-2"></i>
                  {vehicle.addedBy}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Last Modified</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-pencil-square me-2"></i>
                  {vehicle.lastModified}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
