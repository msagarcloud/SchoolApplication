import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import teacherApiService from '../../services/teacherApiService';

const TeacherDetail = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeacher();
  }, [id]);

  const fetchTeacher = async () => {
    try {
      setLoading(true);
      const data = await teacherApiService.getTeacherById(id);
      setTeacher(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch teacher details');
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
      'On Leave': { bg: 'warning', icon: 'clock' },
      'Suspended': { bg: 'secondary', icon: 'dash-circle' }
    };
    
    const config = statusConfig[status] || { bg: 'secondary', icon: 'question-circle' };
    
    return (
      <span className={`badge bg-${config.bg} fs-6`}>
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

  if (error) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/teachers" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Teachers
        </Link>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Teacher not found
        </div>
        <Link to="/teachers" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Teachers
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Teacher Details</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/teachers">Teacher Management</Link>
              </li>
              <li className="breadcrumb-item active">Teacher Details</li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/teachers" className="btn btn-outline-secondary me-2">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <button className="btn btn-outline-info me-2" onClick={handlePrint}>
            <i className="bi bi-printer me-2"></i>
            Print
          </button>
          <Link to={`/teachers/${id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
        </div>
      </div>

      {/* Teacher Header */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center mb-2">
                <h3 className="mb-0 me-3">{teacher.firstName} {teacher.lastName}</h3>
                <span className="badge bg-primary me-2">{teacher.subject || 'Not Assigned'}</span>
                {getStatusBadge(teacher.status)}
              </div>
              <p className="text-muted mb-2">
                {teacher.email || 'N/A'} | {teacher.phone || 'N/A'}
              </p>
              <div className="d-flex gap-3">
                <small><i className="bi bi-building me-1"></i> {teacher.department || 'Not Assigned'}</small>
                <small><i className="bi bi-award me-1"></i> {teacher.qualification || 'N/A'}</small>
                <small><i className="bi bi-clock me-1"></i> {teacher.yearsOfExperience || 'N/A'} years</small>
              </div>
            </div>
            <div className="col-md-4 text-end">
              <div className="row g-2">
                <div className="col-6">
                  <div className="card bg-light">
                    <div className="card-body text-center py-2">
                      <h5 className="mb-0 text-primary">0</h5>
                      <small className="text-muted">Classes</small>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card bg-light">
                    <div className="card-body text-center py-2">
                      <h5 className="mb-0 text-success">4.8</h5>
                      <small className="text-muted">Rating</small>
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
          {/* Professional Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Professional Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Employee ID</label>
                    <p className="form-control-plaintext">{teacher.id || 'N/A'}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Subject</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-primary">{teacher.subject || 'Not Assigned'}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Department</label>
                    <p className="form-control-plaintext">{teacher.department || 'Not Assigned'}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Experience</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-info">{teacher.yearsOfExperience || 'N/A'} years</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Highest Qualification</label>
                    <p className="form-control-plaintext">{teacher.qualification || 'N/A'}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Joining Date</label>
                    <p className="form-control-plaintext">{teacher.doj ? new Date(teacher.doj).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label text-muted">Specialization</label>
                    <p className="form-control-plaintext">{teacher.specialization || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Personal Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Date of Birth</label>
                    <p className="form-control-plaintext">{teacher.dob ? new Date(teacher.dob).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Gender</label>
                    <p className="form-control-plaintext">{teacher.gender || 'N/A'}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Blood Group</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-danger">{teacher.bloodGroup || 'N/A'}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Nationality</label>
                    <p className="form-control-plaintext">{teacher.nationality || 'N/A'}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Religion</label>
                    <p className="form-control-plaintext">{teacher.religion || 'N/A'}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Marital Status</label>
                    <p className="form-control-plaintext">{teacher.maritalStatus || 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label text-muted">Address</label>
                    <p className="form-control-plaintext">{teacher.address || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Contact Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Email Address</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-envelope me-2"></i>
                      {teacher.email || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Phone Number</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-telephone me-2"></i>
                      {teacher.phone || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Emergency Contact</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-person-badge me-2"></i>
                      {teacher.emergencyContact || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Emergency Phone</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-telephone-fill me-2"></i>
                      {teacher.emergencyPhone || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Class Schedule */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Class Schedule</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Classes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>No Schedule Available</strong>
                      </td>
                      <td>
                        <div className="small text-muted">Schedule data not available</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Achievements</h5>
            </div>
            <div className="card-body">
              <div className="text-muted text-center py-3">
                <i className="bi bi-trophy display-4 d-block mb-2"></i>
                No achievements data available
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          {/* Performance Metrics */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Performance Metrics</h5>
            </div>
            <div className="card-body">
              <div className="text-center py-3">
                <i className="bi bi-graph-up display-4 text-muted d-block mb-2"></i>
                <p className="text-muted">Performance metrics not available</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link to={`/teachers/${id}/edit`} className="btn btn-warning">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Teacher
                </Link>
                <button 
                  className="btn btn-outline-danger"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this teacher?')) {
                      // Implement delete functionality
                      window.alert('Delete functionality to be implemented');
                    }
                  }}
                >
                  <i className="bi bi-trash me-2"></i>
                  Delete Teacher
                </button>
                <button className="btn btn-outline-info" onClick={handlePrint}>
                  <i className="bi bi-printer me-2"></i>
                  Print Details
                </button>
                <button className="btn btn-outline-success">
                  <i className="bi bi-calendar-plus me-2"></i>
                  Schedule Meeting
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
                <label className="form-label text-muted">Created Date</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-calendar-plus me-2"></i>
                  {teacher.createdDate ? new Date(teacher.createdDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Created By</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-person-plus me-2"></i>
                  {teacher.createdBy || 'N/A'}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Last Modified</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-pencil-square me-2"></i>
                  {teacher.modifiedDate ? new Date(teacher.modifiedDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetail;
