import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockUser = {
        id: 1,
        userName: 'admin',
        fullName: 'System Administrator',
        email: 'admin@school.edu',
        phone: '+1-234-567-8900',
        role: 'Super Administrator',
        department: 'Administration',
        status: 'Active',
        permissions: ['All Access'],
        address: '123 Admin St, Apt 4B, City, State 12345',
        emergencyContact: 'Emergency Contact',
        emergencyPhone: '+1-234-567-9999',
        dateOfBirth: '1980-01-01',
        gender: 'Male',
        bloodGroup: 'O+',
        notes: 'System administrator with full access to all system features and modules.',
        addedDate: '2020-01-01',
        lastModified: '2024-01-15',
        addedBy: 'System',
        lastLogin: '2024-01-15 09:30 AM',
        loginHistory: [
          { date: '2024-01-15', time: '09:30 AM', ip: '192.168.1.100', status: 'Success' },
          { date: '2024-01-14', time: '04:45 PM', ip: '192.168.1.100', status: 'Success' },
          { date: '2024-01-14', time: '09:15 AM', ip: '192.168.1.100', status: 'Success' },
          { date: '2024-01-13', time: '03:30 PM', ip: '192.168.1.100', status: 'Failed - Wrong Password' }
        ],
        activityLog: [
          { date: '2024-01-15', time: '09:35 AM', action: 'Created new user', details: 'User: john.smith' },
          { date: '2024-01-15', time: '09:30 AM', action: 'Logged in', details: 'Successful login' },
          { date: '2024-01-14', time: '04:50 PM', action: 'Updated settings', details: 'System configuration updated' },
          { date: '2024-01-14', time: '04:45 PM', action: 'Logged in', details: 'Successful login' }
        ],
        profileImage: null
      };
      setUser(mockUser);
    } catch (err) {
      setError(err.message || 'Failed to fetch user details');
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
      'Suspended': { bg: 'warning', icon: 'pause-circle' },
      'Locked': { bg: 'secondary', icon: 'lock' }
    };
    
    const config = statusConfig[status] || { bg: 'secondary', icon: 'question-circle' };
    
    return (
      <span className={`badge bg-${config.bg} fs-6`}>
        <i className={`bi bi-${config.icon} me-1`}></i>
        {status}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleColors = {
      'Super Administrator': 'danger',
      'Administrator': 'warning',
      'Teacher': 'primary',
      'Transport Manager': 'info',
      'Reception': 'secondary',
      'Student': 'success',
      'Parent': 'dark'
    };
    
    const color = roleColors[role] || 'secondary';
    
    return (
      <span className={`badge bg-${color} fs-6`}>{role}</span>
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
        <Link to="/users" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Users
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          User not found
        </div>
        <Link to="/users" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>User Details</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/users">User Management</Link>
              </li>
              <li className="breadcrumb-item active">User Details</li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/users" className="btn btn-outline-secondary me-2">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <button className="btn btn-outline-info me-2" onClick={handlePrint}>
            <i className="bi bi-printer me-2"></i>
            Print
          </button>
          <Link to={`/users/${id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
        </div>
      </div>

      {/* User Header */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center mb-2">
                <div className="avatar-lg bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="mb-0">{user.fullName}</h3>
                  <div className="d-flex gap-2 mb-2">
                    {getRoleBadge(user.role)}
                    {getStatusBadge(user.status)}
                  </div>
                  <p className="text-muted mb-2">
                    @{user.userName} | {user.email} | {user.phone}
                  </p>
                  <div className="d-flex gap-3">
                    <small><i className="bi bi-building me-1"></i> {user.department}</small>
                    <small><i className="bi bi-calendar me-1"></i> Joined: {user.addedDate}</small>
                    <small><i className="bi bi-clock me-1"></i> Last Login: {user.lastLogin}</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-end">
              <div className="row g-2">
                <div className="col-6">
                  <div className="card bg-light">
                    <div className="card-body text-center py-2">
                      <h5 className="mb-0 text-primary">{user.permissions.length}</h5>
                      <small className="text-muted">Permissions</small>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card bg-light">
                    <div className="card-body text-center py-2">
                      <h5 className="mb-0 text-info">Active</h5>
                      <small className="text-muted">Account</small>
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
          {/* Account Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Account Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Username</label>
                    <p className="form-control-plaintext">@{user.userName}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Full Name</label>
                    <p className="form-control-plaintext">{user.fullName}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Email Address</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-envelope me-2"></i>
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Phone Number</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-telephone me-2"></i>
                      {user.phone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Role</label>
                    <p className="form-control-plaintext">
                      {getRoleBadge(user.role)}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Department</label>
                    <p className="form-control-plaintext">{user.department}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Status</label>
                    <p className="form-control-plaintext">
                      {getStatusBadge(user.status)}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Last Login</label>
                    <p className="form-control-plaintext">{user.lastLogin}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Permissions</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  {user.permissions.map((permission, index) => (
                    <span key={index} className="badge bg-primary me-2 mb-2">
                      <i className="bi bi-shield-check me-1"></i>
                      {permission}
                    </span>
                  ))}
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
                    <p className="form-control-plaintext">{user.dateOfBirth}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Gender</label>
                    <p className="form-control-plaintext">{user.gender}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Blood Group</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-danger">{user.bloodGroup}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label text-muted">Address</label>
                    <p className="form-control-plaintext">{user.address}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Emergency Contact</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-person-badge me-2"></i>
                      {user.emergencyContact}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Emergency Phone</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-telephone-fill me-2"></i>
                      {user.emergencyPhone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label text-muted">Notes</label>
                    <p className="form-control-plaintext">{user.notes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Login History */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Login History</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>IP Address</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.loginHistory.map((login, index) => (
                      <tr key={index}>
                        <td>{login.date}</td>
                        <td>{login.time}</td>
                        <td>{login.ip}</td>
                        <td>
                          <span className={`badge bg-${login.status === 'Success' ? 'success' : 'danger'}`}>
                            {login.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Activity Log</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Action</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.activityLog.map((activity, index) => (
                      <tr key={index}>
                        <td>{activity.date}</td>
                        <td>{activity.time}</td>
                        <td>
                          <span className="badge bg-info">{activity.action}</span>
                        </td>
                        <td>{activity.details}</td>
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
                <Link to={`/users/${id}/edit`} className="btn btn-warning">
                  <i className="bi bi-pencil me-2"></i>
                  Edit User
                </Link>
                <button 
                  className="btn btn-outline-danger"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this user?')) {
                      // Implement delete functionality
                      window.alert('Delete functionality to be implemented');
                    }
                  }}
                >
                  <i className="bi bi-trash me-2"></i>
                  Delete User
                </button>
                <button className="btn btn-outline-info" onClick={handlePrint}>
                  <i className="bi bi-printer me-2"></i>
                  Print Details
                </button>
                <button 
                  className="btn btn-outline-warning"
                  onClick={() => {
                    if (window.confirm('Send password reset email to this user?')) {
                      // Implement password reset functionality
                      window.alert('Password reset functionality to be implemented');
                    }
                  }}
                >
                  <i className="bi bi-key me-2"></i>
                  Reset Password
                </button>
                <button 
                  className="btn btn-outline-success"
                  onClick={() => {
                    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
                    if (window.confirm(`${newStatus === 'Active' ? 'Activate' : 'Deactivate'} this user?`)) {
                      // Implement status toggle functionality
                      window.alert('Status toggle functionality to be implemented');
                    }
                  }}
                >
                  <i className={`bi bi-${user.status === 'Active' ? 'pause' : 'play'} me-2`}></i>
                  {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Account Statistics</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span>Account Age</span>
                  <strong>4+ Years</strong>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Total Logins</span>
                  <strong>1,247</strong>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Failed Attempts</span>
                  <strong>3</strong>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Last Activity</span>
                  <strong>Today</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Account Timeline</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-muted">Account Created</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-calendar-plus me-2"></i>
                  {user.addedDate}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Added By</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-person-plus me-2"></i>
                  {user.addedBy}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Last Modified</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-pencil-square me-2"></i>
                  {user.lastModified}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
