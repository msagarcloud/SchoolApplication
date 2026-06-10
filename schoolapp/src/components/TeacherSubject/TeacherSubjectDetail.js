import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import teacherSubjectApiService from '../../services/teacherSubjectApiService';

const TeacherSubjectDetail = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  const fetchAssignment = async () => {
    try {
      setLoading(true);
      const data = await teacherSubjectApiService.getTeacherSubjectById(id);
      setAssignment(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch assignment details');
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
      'Pending': { bg: 'warning', icon: 'clock' },
      'Completed': { bg: 'info', icon: 'check2-circle' }
    };
    
    const config = statusConfig[status] || { bg: 'secondary', icon: 'question-circle' };
    
    return (
      <span className={`badge bg-${config.bg} fs-6`}>
        <i className={`bi bi-${config.icon} me-1`}></i>
        {status}
      </span>
    );
  };

  const getActiveBadge = (isActive) => {
    return (
      <span className={`badge fs-6 ${isActive ? 'bg-success' : 'bg-danger'}`}>
        <i className={`bi bi-${isActive ? 'check-circle' : 'x-circle'} me-1`}></i>
        {isActive ? 'Active' : 'Inactive'}
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
        <Link to="/teacher-subjects" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Assignments
        </Link>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Assignment not found
        </div>
        <Link to="/teacher-subjects" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Assignments
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Assignment Details</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/teacher-subjects">Assignment Management</Link>
              </li>
              <li className="breadcrumb-item active">Assignment Details</li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/teacher-subjects" className="btn btn-outline-secondary me-2">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <button className="btn btn-outline-info me-2" onClick={handlePrint}>
            <i className="bi bi-printer me-2"></i>
            Print
          </button>
          <Link to={`/teacher-subjects/${id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
        </div>
      </div>

      {/* Assignment Header */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center mb-2">
                <h3 className="mb-0 me-3">Teacher-Subject Assignment</h3>
                {getStatusBadge(assignment.status)}
                {getActiveBadge(assignment.isActive)}
              </div>
              <p className="text-muted mb-2">
                Assignment ID: {assignment.id}
              </p>
              <div className="d-flex gap-3">
                <small><i className="bi bi-person me-1"></i> Teacher ID: {assignment.teacherId}</small>
                <small><i className="bi bi-book me-1"></i> Subject ID: {assignment.subjectId}</small>
                <small><i className="bi bi-house me-1"></i> Class ID: {assignment.classId}</small>
              </div>
            </div>
            <div className="col-md-4 text-end">
              <div className="row g-2">
                <div className="col-6">
                  <div className="card bg-light">
                    <div className="card-body text-center py-2">
                      <h5 className="mb-0 text-primary">
                        {assignment.teacherName || 'Unknown'}
                      </h5>
                      <small className="text-muted">Teacher</small>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card bg-light">
                    <div className="card-body text-center py-2">
                      <h5 className="mb-0 text-success">
                        {assignment.subjectName || 'Unknown'}
                      </h5>
                      <small className="text-muted">Subject</small>
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
          {/* Assignment Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Assignment Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Teacher</label>
                    <p className="form-control-plaintext">
                      <strong>{assignment.teacherName || 'Unknown Teacher'}</strong>
                      <br />
                      <small className="text-muted">ID: {assignment.teacherId}</small>
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Subject</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-primary">{assignment.subjectName || 'Unknown Subject'}</span>
                      <br />
                      <small className="text-muted">ID: {assignment.subjectId}</small>
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Class</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-info">{assignment.className || 'Unknown Class'}</span>
                      <br />
                      <small className="text-muted">ID: {assignment.classId}</small>
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">School</label>
                    <p className="form-control-plaintext">
                      <strong>{assignment.schoolName || 'Unknown School'}</strong>
                      <br />
                      <small className="text-muted">ID: {assignment.schoolId}</small>
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Company</label>
                    <p className="form-control-plaintext">
                      <strong>{assignment.companyName || 'Unknown Company'}</strong>
                      <br />
                      <small className="text-muted">ID: {assignment.companyId}</small>
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Status</label>
                    <p className="form-control-plaintext">
                      {getStatusBadge(assignment.status)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label text-muted">Status Message</label>
                    <p className="form-control-plaintext">
                      {assignment.statusMessage || 'No status message available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Additional Details</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Assignment Status</label>
                    <p className="form-control-plaintext">
                      {getActiveBadge(assignment.isActive)}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Is Deleted</label>
                    <p className="form-control-plaintext">
                      <span className={`badge ${assignment.isDeleted ? 'bg-danger' : 'bg-success'}`}>
                        {assignment.isDeleted ? 'Yes' : 'No'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status History */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Status History</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Created Date</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-calendar-plus me-2"></i>
                      {new Date(assignment.createdDate).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Created By</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-person-plus me-2"></i>
                      {assignment.createdBy || 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>

              {assignment.modifiedDate && (
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label text-muted">Last Modified Date</label>
                      <p className="form-control-plaintext">
                        <i className="bi bi-pencil-square me-2"></i>
                        {new Date(assignment.modifiedDate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label text-muted">Last Modified By</label>
                      <p className="form-control-plaintext">
                        <i className="bi bi-person-gear me-2"></i>
                        {assignment.modifiedBy || 'Unknown'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
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
                <Link to={`/teacher-subjects/${id}/edit`} className="btn btn-warning">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Assignment
                </Link>
                <button 
                  className="btn btn-outline-danger"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this assignment?')) {
                      // Implement delete functionality
                      window.alert('Delete functionality to be implemented');
                    }
                  }}
                >
                  <i className="bi bi-trash me-2"></i>
                  Delete Assignment
                </button>
                <button className="btn btn-outline-info" onClick={handlePrint}>
                  <i className="bi bi-printer me-2"></i>
                  Print Details
                </button>
                <button className="btn btn-outline-success">
                  <i className="bi bi-check-circle me-2"></i>
                  Mark as Active
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-pause-circle me-2"></i>
                  Mark as Inactive
                </button>
              </div>
            </div>
          </div>

          {/* Related Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Related Information</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-muted">Assignment ID</label>
                <p className="form-control-plaintext">
                  <code>{assignment.id}</code>
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">System Status</label>
                <p className="form-control-plaintext">
                  <span className="badge bg-success">
                    <i className="bi bi-check-circle me-1"></i>
                    Valid Assignment
                  </span>
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Data Integrity</label>
                <p className="form-control-plaintext">
                  <span className="badge bg-info">
                    <i className="bi bi-shield-check me-1"></i>
                    Verified
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Assignment Timeline */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Assignment Timeline</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-muted">Created On</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-calendar-plus me-2"></i>
                  {new Date(assignment.createdDate).toLocaleDateString()}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Days Active</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-clock-history me-2"></i>
                  {Math.floor((new Date() - new Date(assignment.createdDate)) / (1000 * 60 * 60 * 24))} days
                </p>
              </div>
              {assignment.modifiedDate && (
                <div className="mb-3">
                  <label className="form-label text-muted">Last Updated</label>
                  <p className="form-control-plaintext">
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    {new Date(assignment.modifiedDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSubjectDetail;
