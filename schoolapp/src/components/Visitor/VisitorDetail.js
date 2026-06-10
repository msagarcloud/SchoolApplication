import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import visitorService from '../../services/visitorService';

const VisitorDetail = () => {
  const { id } = useParams();
  const [visitor, setVisitor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVisitor();
  }, [id]);

  const fetchVisitor = async () => {
    try {
      setLoading(true);
      const data = await visitorService.getVisitorById(id);
      setVisitor(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch visitor details');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
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
      <span className={`badge bg-${config.bg} fs-6`}>
        <i className={`bi bi-${config.icon} me-1`}></i>
        {status}
      </span>
    );
  };

  const calculateVisitDuration = () => {
    if (visitor.checkInTime && visitor.checkOutTime) {
      const checkIn = new Date(`2024-01-15 ${visitor.checkInTime}`);
      const checkOut = new Date(`2024-01-15 ${visitor.checkOutTime}`);
      const diffMs = checkOut - checkIn;
      const diffMins = Math.floor(diffMs / 60000);
      const hours = Math.floor(diffMins / 60);
      const minutes = diffMins % 60;
      
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      } else {
        return `${minutes}m`;
      }
    }
    return 'N/A';
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
        <Link to="/visitors" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Visitors
        </Link>
      </div>
    );
  }

  if (!visitor) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Visitor not found
        </div>
        <Link to="/visitors" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Visitors
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Visitor Details</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/visitors">Visitor Management</Link>
              </li>
              <li className="breadcrumb-item active">Visitor Details</li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/visitors" className="btn btn-outline-secondary me-2">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <button className="btn btn-outline-info me-2" onClick={handlePrint}>
            <i className="bi bi-printer me-2"></i>
            Print
          </button>
          <Link to={`/visitors/${id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
        </div>
      </div>

      {/* Visitor Header */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center mb-2">
                <h3 className="mb-0 me-3">{visitor.visitorName}</h3>
                <span className="badge bg-info me-2">{visitor.purpose}</span>
                {getStatusBadge(visitor.status)}
              </div>
              <p className="text-muted mb-2">
                {visitor.phone} | {visitor.email}
              </p>
              <div className="d-flex gap-3">
                <small><i className="bi bi-person me-1"></i> Meeting: {visitor.personToMeet}</small>
                <small><i className="bi bi-calendar me-1"></i> {visitor.visitDate}</small>
                <small><i className="bi bi-clock me-1"></i> Duration: {calculateVisitDuration()}</small>
              </div>
            </div>
            <div className="col-md-4 text-end">
              <div className="row g-2">
                <div className="col-6">
                  <div className="card bg-light">
                    <div className="card-body text-center py-2">
                      <h5 className="mb-0 text-primary">{visitor.checkInTime}</h5>
                      <small className="text-muted">Check In</small>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card bg-light">
                    <div className="card-body text-center py-2">
                      <h5 className="mb-0 text-success">{visitor.checkOutTime || 'Active'}</h5>
                      <small className="text-muted">Check Out</small>
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
          {/* Visitor Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Visitor Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Full Name</label>
                    <p className="form-control-plaintext">{visitor.visitorName}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Phone Number</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-telephone me-2"></i>
                      {visitor.phone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Email Address</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-envelope me-2"></i>
                      {visitor.email || 'Not Provided'}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Purpose of Visit</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-info">{visitor.purpose}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label text-muted">Address</label>
                    <p className="form-control-plaintext">{visitor.address || 'Not Provided'}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label text-muted">Notes</label>
                    <p className="form-control-plaintext">{visitor.notes || 'No additional notes'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visit Details */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Visit Details</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Person to Meet</label>
                    <p className="form-control-plaintext">
                      <strong>{visitor.personToMeet}</strong>
                      {visitor.personMet && (
                        <div className="small text-muted">
                          {visitor.personMet.designation} - {visitor.personMet.department}
                        </div>
                      )}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Visit Date</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-calendar me-2"></i>
                      {visitor.visitDate}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Scheduled Time</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-clock me-2"></i>
                      {visitor.scheduledTime || 'Not Specified'}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Check In Time</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      {visitor.checkInTime}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Check Out Time</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-box-arrow-right me-2"></i>
                      {visitor.checkOutTime || 'Not Checked Out'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Status</label>
                    <p className="form-control-plaintext">
                      {getStatusBadge(visitor.status)}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Visit Duration</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-hourglass me-2"></i>
                      {calculateVisitDuration()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Identification Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Identification Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">ID Proof Type</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-secondary">{visitor.idProof || 'Not Provided'}</span>
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">ID Number</label>
                    <p className="form-control-plaintext">{visitor.idNumber || 'Not Provided'}</p>
                  </div>
                </div>
              </div>
              {visitor.documents && visitor.documents.idProof && (
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label text-muted">ID Verification Status</label>
                      <p className="form-control-plaintext">
                        <span className="badge bg-success">
                          <i className="bi bi-check-circle me-1"></i>
                          Verified
                        </span>
                        <div className="small text-muted">
                          By {visitor.documents.idProof.verifiedBy} at {visitor.documents.idProof.verifiedTime}
                        </div>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label text-muted">Visitor Pass</label>
                      <p className="form-control-plaintext">
                        <span className="badge bg-primary">
                          <i className="bi bi-badge me-1"></i>
                          {visitor.documents.visitorPass.passNumber}
                        </span>
                        <div className="small text-muted">
                          Issued by {visitor.documents.visitorPass.issuedBy} at {visitor.documents.visitorPass.issuedTime}
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Visit History */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Visit History</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Action</th>
                      <th>Details</th>
                      <th>Operator</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitor.visitHistory.map((history, index) => (
                      <tr key={index}>
                        <td>{history.time}</td>
                        <td>
                          <span className="badge bg-info">{history.action}</span>
                        </td>
                        <td>{history.details}</td>
                        <td>{history.operator}</td>
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
                <Link to={`/visitors/${id}/edit`} className="btn btn-warning">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Visitor
                </Link>
                <button 
                  className="btn btn-outline-danger"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this visitor record?')) {
                      // Implement delete functionality
                      window.alert('Delete functionality to be implemented');
                    }
                  }}
                >
                  <i className="bi bi-trash me-2"></i>
                  Delete Record
                </button>
                <button className="btn btn-outline-info" onClick={handlePrint}>
                  <i className="bi bi-printer me-2"></i>
                  Print Details
                </button>
                {visitor.status === 'Active' && (
                  <button 
                    className="btn btn-outline-success"
                    onClick={() => {
                      if (window.confirm('Check out this visitor?')) {
                        // Implement check out functionality
                        window.alert('Check out functionality to be implemented');
                      }
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Check Out
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Person Met Information */}
          {visitor.personMet && (
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Person Met</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label text-muted">Name</label>
                  <p className="form-control-plaintext">
                    <strong>{visitor.personMet.name}</strong>
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted">Designation</label>
                  <p className="form-control-plaintext">{visitor.personMet.designation}</p>
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted">Department</label>
                  <p className="form-control-plaintext">{visitor.personMet.department}</p>
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted">Email</label>
                  <p className="form-control-plaintext">{visitor.personMet.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Record Timeline</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-muted">Record Created</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-calendar-plus me-2"></i>
                  {visitor.addedDate}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Added By</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-person-plus me-2"></i>
                  {visitor.addedBy}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Last Modified</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-pencil-square me-2"></i>
                  {visitor.lastModified}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorDetail;
