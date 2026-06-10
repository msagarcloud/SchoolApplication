import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EmployeeLeaveDetail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeave();
  }, [id]);

  const fetchLeave = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockLeave = {
        id: 1,
        employeeId: 1,
        employeeName: 'John Doe',
        employeeCode: 'EMP001',
        department: 'IT',
        leaveType: 'Sick Leave',
        fromDate: '2024-01-15',
        toDate: '2024-01-16',
        days: 2,
        reason: 'Fever and headache. Doctor advised complete rest for 2 days.',
        status: 'Approved',
        appliedDate: '2024-01-14',
        approvedBy: 'Sarah Manager',
        approvedDate: '2024-01-14',
        contactAddress: '123 Main St, Apt 4B, City, State 12345',
        contactPhone: '+1-234-567-8900',
        emergencyContact: 'Jane Doe - +1-987-654-3210',
        isHalfDay: false,
        halfDayType: null,
        approverComments: 'Approved based on medical certificate provided.',
        attachments: [
          { name: 'Medical_Certificate.pdf', size: '1.2 MB' },
          { name: 'Doctor_Note.pdf', size: '0.8 MB' }
        ],
        leaveBalance: {
          before: 8,
          after: 6,
          type: 'Sick Leave'
        }
      };
      setLeave(mockLeave);
    } catch (err) {
      setError(err.message || 'Failed to fetch leave details');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Approved': { bg: 'success', icon: 'check-circle' },
      'Rejected': { bg: 'danger', icon: 'x-circle' },
      'Pending': { bg: 'warning', icon: 'clock' },
      'Cancelled': { bg: 'secondary', icon: 'dash-circle' }
    };
    
    const config = statusConfig[status] || { bg: 'secondary', icon: 'question-circle' };
    
    return (
      <span className={`badge bg-${config.bg} fs-6`}>
        <i className={`bi bi-${config.icon} me-1`}></i>
        {status}
      </span>
    );
  };

  const handleDownloadAttachment = (attachment) => {
    // Implement download functionality
    window.alert(`Downloading ${attachment.name}...`);
  };

  const handlePrint = () => {
    window.print();
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
        <Link to="/employee-leaves" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Leaves
        </Link>
      </div>
    );
  }

  if (!leave) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Leave request not found
        </div>
        <Link to="/employee-leaves" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Leaves
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Leave Request Details</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/employee-leaves">Employee Leaves</Link>
              </li>
              <li className="breadcrumb-item active">Leave Details</li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/employee-leaves" className="btn btn-outline-secondary me-2">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <button className="btn btn-outline-info me-2" onClick={handlePrint}>
            <i className="bi bi-printer me-2"></i>
            Print
          </button>
          <Link to={`/employee-leaves/${id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
        </div>
      </div>

      {/* Status Alert */}
      <div className={`alert alert-${leave.status === 'Approved' ? 'success' : leave.status === 'Rejected' ? 'danger' : 'warning'}`} role="alert">
        <div className="d-flex align-items-center">
          {getStatusBadge(leave.status)}
          <div className="ms-3">
            <strong>Leave Status: {leave.status}</strong>
            {leave.status === 'Approved' && leave.approvedDate && (
              <div className="small">
                Approved by {leave.approvedBy} on {leave.approvedDate}
              </div>
            )}
            {leave.approverComments && (
              <div className="small mt-1">
                <em>Comments: {leave.approverComments}</em>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          {/* Employee Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Employee Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Employee Name</label>
                    <p className="form-control-plaintext">
                      <Link to={`/employees/${leave.employeeId}`} className="text-decoration-none">
                        {leave.employeeName}
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Employee Code</label>
                    <p className="form-control-plaintext">{leave.employeeCode}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label text-muted">Department</label>
                    <p className="form-control-plaintext">{leave.department}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leave Details */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Leave Details</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Leave Type</label>
                    <p className="form-control-plaintext">{leave.leaveType}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Total Days</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-primary fs-6">{leave.days} days</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">From Date</label>
                    <p className="form-control-plaintext">{leave.fromDate}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">To Date</label>
                    <p className="form-control-plaintext">{leave.toDate}</p>
                  </div>
                </div>
              </div>
              {leave.isHalfDay && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label text-muted">Half Day Type</label>
                      <p className="form-control-plaintext">
                        <span className="badge bg-info">{leave.halfDayType}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="mb-3">
                <label className="form-label text-muted">Reason for Leave</label>
                <p className="form-control-plaintext">{leave.reason}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Contact Information During Leave</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-muted">Contact Address</label>
                <p className="form-control-plaintext">{leave.contactAddress}</p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Contact Phone</label>
                    <p className="form-control-plaintext">{leave.contactPhone}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Emergency Contact</label>
                    <p className="form-control-plaintext">{leave.emergencyContact}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attachments */}
          {leave.attachments && leave.attachments.length > 0 && (
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Attachments</h5>
              </div>
              <div className="card-body">
                <div className="list-group">
                  {leave.attachments.map((attachment, index) => (
                    <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <i className="bi bi-file-earmark-pdf me-2"></i>
                        {attachment.name}
                        <span className="text-muted ms-2">({attachment.size})</span>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleDownloadAttachment(attachment)}
                      >
                        <i className="bi bi-download"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="col-md-4">
          {/* Leave Balance */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Leave Balance</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-muted">Leave Type</label>
                <p className="form-control-plaintext">{leave.leaveBalance.type}</p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Balance Before</label>
                <p className="form-control-plaintext">
                  <span className="badge bg-secondary">{leave.leaveBalance.before} days</span>
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Leave Consumed</label>
                <p className="form-control-plaintext">
                  <span className="badge bg-warning">{leave.days} days</span>
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Balance After</label>
                <p className="form-control-plaintext">
                  <span className="badge bg-success">{leave.leaveBalance.after} days</span>
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Timeline</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-muted">Applied On</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-calendar-event me-2"></i>
                  {leave.appliedDate}
                </p>
              </div>
              {leave.approvedDate && (
                <div className="mb-3">
                  <label className="form-label text-muted">Approved On</label>
                  <p className="form-control-plaintext">
                    <i className="bi bi-check-circle me-2"></i>
                    {leave.approvedDate}
                  </p>
                </div>
              )}
              {leave.approvedBy && (
                <div className="mb-3">
                  <label className="form-label text-muted">Approved By</label>
                  <p className="form-control-plaintext">
                    <i className="bi bi-person-check me-2"></i>
                    {leave.approvedBy}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link to={`/employee-leaves/${id}/edit`} className="btn btn-outline-warning">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Leave Request
                </Link>
                <button 
                  className="btn btn-outline-danger"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this leave request?')) {
                      // Implement delete functionality
                      window.alert('Delete functionality to be implemented');
                    }
                  }}
                >
                  <i className="bi bi-trash me-2"></i>
                  Delete Leave Request
                </button>
                {leave.status === 'Pending' && (
                  <>
                    <button 
                      className="btn btn-outline-success"
                      onClick={() => {
                        // Implement approve functionality
                        window.alert('Approve functionality to be implemented');
                      }}
                    >
                      <i className="bi bi-check-circle me-2"></i>
                      Approve Request
                    </button>
                    <button 
                      className="btn btn-outline-danger"
                      onClick={() => {
                        // Implement reject functionality
                        window.alert('Reject functionality to be implemented');
                      }}
                    >
                      <i className="bi bi-x-circle me-2"></i>
                      Reject Request
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeaveDetail;
