import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import assignmentService from '../../services/assignmentService';

const AssignmentDetail = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAssignment = useCallback(async () => {
    try {
      setLoading(true);
      const response = await assignmentService.getAssignmentById(id);
      setAssignment(response.data || response);
    } catch (err) {
      setError(err.message || 'Failed to fetch assignment details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAssignment();
  }, [fetchAssignment]);

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { bg: 'primary', icon: 'clock' },
      'Completed': { bg: 'success', icon: 'check-circle' },
      'Overdue': { bg: 'danger', icon: 'exclamation-triangle' },
      'Draft': { bg: 'secondary', icon: 'file-earmark' }
    };
    
    const config = statusConfig[status] || { bg: 'secondary', icon: 'question-circle' };
    
    return (
      <span className={`badge bg-${config.bg} fs-6`}>
        <i className={`bi bi-${config.icon} me-1`}></i>
        {status}
      </span>
    );
  };

  const getSubmissionStatusBadge = (status) => {
    const statusConfig = {
      'Graded': { bg: 'success', icon: 'check-circle' },
      'Submitted': { bg: 'info', icon: 'file-earmark-check' },
      'Late': { bg: 'warning', icon: 'clock-history' },
      'Not Submitted': { bg: 'secondary', icon: 'x-circle' }
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

  if (error) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/assignments" className="btn btn-outline-primary">
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
        <Link to="/assignments" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Assignments
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Assignment Details</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/assignments">Assignment Management</Link>
              </li>
              <li className="breadcrumb-item active">Assignment Details</li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/assignments" className="btn btn-outline-secondary me-2">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <button className="btn btn-outline-info me-2" onClick={handlePrint}>
            <i className="bi bi-printer me-2"></i>
            Print
          </button>
          <Link to={`/assignments/${id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center mb-2">
                <h3 className="mb-0 me-3">{assignment.title}</h3>
                <span className="badge bg-primary me-2">{assignment.className}</span>
                <span className="badge bg-info me-2">{assignment.subject}</span>
                <span className="badge bg-secondary me-2">{assignment.assignmentType}</span>
                {getStatusBadge(assignment.status)}
              </div>
              <p className="text-muted mb-2">
                Teacher: {assignment.teacherName} | Assigned: {assignment.assignedDate} | Due: {assignment.dueDate}
              </p>
              <div className="d-flex gap-3">
                <small><i className="bi bi-people me-1"></i> {assignment.totalStudents} Students</small>
                <small><i className="bi bi-file-earmark-check me-1"></i> {assignment.submittedCount} Submitted</small>
                <small><i className="bi bi-check2-square me-1"></i> {assignment.gradedCount} Graded</small>
                <small><i className="bi bi-graph-up me-1"></i> Avg: {assignment.averageScore}%</small>
              </div>
            </div>
            <div className="col-md-4 text-end">
              <div className="row g-2">
                <div className="col-6">
                  <div className="card bg-light">
                    <div className="card-body text-center py-2">
                      <h5 className="mb-0 text-primary">{assignment.submittedCount}/{assignment.totalStudents}</h5>
                      <small className="text-muted">Submissions</small>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card bg-light">
                    <div className="card-body text-center py-2">
                      <h5 className="mb-0 text-success">{assignment.maxMarks}</h5>
                      <small className="text-muted">Max Marks</small>
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
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Assignment Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Title</label>
                    <p className="form-control-plaintext">{assignment.title}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Type</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-secondary">{assignment.assignmentType}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label text-muted">Description</label>
                    <p className="form-control-plaintext">{assignment.description}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Class</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-primary">{assignment.className}</span>
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Subject</label>
                    <p className="form-control-plaintext">{assignment.subject}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Teacher</label>
                    <p className="form-control-plaintext">{assignment.teacherName}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Assigned Date</label>
                    <p className="form-control-plaintext">{assignment.assignedDate}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Due Date</label>
                    <p className="form-control-plaintext">{assignment.dueDate}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Maximum Marks</label>
                    <p className="form-control-plaintext">{assignment.maxMarks}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label text-muted">Instructions</label>
                    <p className="form-control-plaintext">{assignment.instructions}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Student Submissions</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Roll No</th>
                      <th>Submitted Date</th>
                      <th>Status</th>
                      <th>Marks</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignment.submissions.map((submission) => (
                      <tr key={submission.id}>
                        <td>{submission.studentName}</td>
                        <td>{submission.rollNumber}</td>
                        <td>{submission.submittedDate}</td>
                        <td>{getSubmissionStatusBadge(submission.status)}</td>
                        <td>
                          {submission.marks !== null ? (
                            <span className="fw-bold">{submission.marks}</span>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td>
                          {submission.grade ? (
                            <span className={`badge bg-${submission.grade === 'A+' || submission.grade === 'A' ? 'success' : submission.grade === 'B+' || submission.grade === 'B' ? 'info' : 'warning'}`}>
                              {submission.grade}
                            </span>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Attachments</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>Type</th>
                      <th>Size</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignment.attachments.map((attachment, index) => (
                      <tr key={index}>
                        <td>{attachment.name}</td>
                        <td>
                          <span className="badge bg-secondary">{attachment.type}</span>
                        </td>
                        <td>{attachment.size}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary">
                            <i className="bi bi-download"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link to={`/assignments/${id}/edit`} className="btn btn-warning">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Assignment
                </Link>
                <button 
                  className="btn btn-outline-success"
                  onClick={async () => {
                    if (window.confirm('Send reminder to students who haven\'t submitted?')) {
                      try {
                        await assignmentService.sendReminder(id);
                        window.alert('Reminder sent successfully!');
                      } catch (error) {
                        window.alert('Failed to send reminder: ' + error.message);
                      }
                    }
                  }}
                >
                  <i className="bi bi-bell me-2"></i>
                  Send Reminder
                </button>
                <button className="btn btn-outline-info" onClick={handlePrint}>
                  <i className="bi bi-printer me-2"></i>
                  Print Assignment
                </button>
                <button 
                  className="btn btn-outline-primary"
                  onClick={async () => {
                    if (window.confirm('Download all submissions?')) {
                      try {
                        await assignmentService.downloadAllSubmissions(id);
                        window.alert('Download started successfully!');
                      } catch (error) {
                        window.alert('Failed to download submissions: ' + error.message);
                      }
                    }
                  }}
                >
                  <i className="bi bi-download me-2"></i>
                  Download All
                </button>
                <button 
                  className="btn btn-outline-danger"
                  onClick={async () => {
                    if (window.confirm('Are you sure you want to delete this assignment?')) {
                      try {
                        await assignmentService.deleteAssignment(id);
                        window.alert('Assignment deleted successfully!');
                        window.location.href = '/assignments';
                      } catch (error) {
                        window.alert('Failed to delete assignment: ' + error.message);
                      }
                    }
                  }}
                >
                  <i className="bi bi-trash me-2"></i>
                  Delete Assignment
                </button>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Submission Statistics</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span>Submission Rate</span>
                  <strong>{Math.round((assignment.submittedCount / assignment.totalStudents) * 100)}%</strong>
                </div>
                <div className="progress mt-1">
                  <div 
                    className="progress-bar bg-primary" 
                    style={{ width: `${(assignment.submittedCount / assignment.totalStudents) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Graded</span>
                  <strong>{assignment.gradedCount}/{assignment.submittedCount}</strong>
                </div>
                <div className="progress mt-1">
                  <div 
                    className="progress-bar bg-success" 
                    style={{ width: `${assignment.submittedCount > 0 ? (assignment.gradedCount / assignment.submittedCount) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Average Score</span>
                  <strong>{assignment.averageScore}%</strong>
                </div>
                <div className="progress mt-1">
                  <div 
                    className="progress-bar bg-info" 
                    style={{ width: `${assignment.averageScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Timeline</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-muted">Created</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-calendar-plus me-2"></i>
                  {assignment.addedDate}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Created By</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-person-plus me-2"></i>
                  {assignment.addedBy}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Last Modified</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-pencil-square me-2"></i>
                  {assignment.lastModified}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetail;
