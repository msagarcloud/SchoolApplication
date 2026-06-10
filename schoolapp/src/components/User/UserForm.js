import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [user, setUser] = useState({
    userName: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    department: '',
    status: 'Active',
    permissions: [],
    profileImage: null,
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchUser();
    }
  }, [id, isEdit]);

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
        address: '123 Admin St, City, State 12345',
        emergencyContact: 'Emergency Contact',
        emergencyPhone: '+1-234-567-9999',
        dateOfBirth: '1980-01-01',
        gender: 'Male',
        bloodGroup: 'O+',
        notes: 'System administrator with full access'
      };
      setUser(mockUser);
    } catch (err) {
      setError(err.message || 'Failed to fetch user details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePermissionChange = (permission) => {
    setUser(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      // Validate required fields
      if (!user.userName || !user.fullName || !user.email || !user.role) {
        setError('Please fill in all required fields');
        return;
      }
      
      // Validate email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        setError('Please enter a valid email address');
        return;
      }
      
      // Validate phone format
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (user.phone && !phoneRegex.test(user.phone)) {
        setError('Please enter a valid phone number');
        return;
      }
      
      // Validate username format
      const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
      if (!usernameRegex.test(user.userName)) {
        setError('Username can only contain letters, numbers, dots, hyphens, and underscores');
        return;
      }
      
      // Validate password for new users
      if (!isEdit && !user.password) {
        setError('Password is required for new users');
        return;
      }
      
      // Validate password confirmation
      if (user.password && user.password !== user.confirmPassword) {
        setError('Password and confirmation do not match');
        return;
      }
      
      // Validate password strength
      if (user.password && user.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }
      
      // Replace with actual API call
      console.log('Submitting user:', user);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/users');
    } catch (err) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} user`);
    } finally {
      setLoading(false);
    }
  };

  const availablePermissions = [
    'All Access',
    'User Management',
    'Student Management',
    'Teacher Management',
    'Class Management',
    'Vehicle Management',
    'Route Management',
    'Visitor Management',
    'Financial Management',
    'Report Access',
    'System Settings'
  ];

  const getPermissionsForRole = (role) => {
    const rolePermissions = {
      'Super Administrator': ['All Access'],
      'Administrator': ['User Management', 'Student Management', 'Teacher Management', 'Report Access'],
      'Teacher': ['Class Management', 'Student Records'],
      'Transport Manager': ['Vehicle Management', 'Route Management', 'Driver Management'],
      'Reception': ['Visitor Management', 'Phone Management'],
      'Student': ['View Schedule', 'View Grades'],
      'Parent': ['View Student Progress', 'View Attendance']
    };
    return rolePermissions[role] || [];
  };

  const handleRoleChange = (newRole) => {
    setUser(prev => ({
      ...prev,
      role: newRole,
      permissions: getPermissionsForRole(newRole)
    }));
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
          <h2>{isEdit ? 'Edit User' : 'Add New User'}</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/users">User Management</Link>
              </li>
              <li className="breadcrumb-item active">
                {isEdit ? 'Edit' : 'Create'}
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/users" className="btn btn-outline-secondary me-2">
            <i className="bi bi-x-lg me-2"></i>
            Cancel
          </Link>
          <button 
            type="submit" 
            form="user-form"
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
        <form id="user-form" onSubmit={handleSubmit}>
          <div className="card-body">
            {/* Basic Information */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Basic Information</h5>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">
                    Username <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    name="userName"
                    value={user.userName}
                    onChange={handleInputChange}
                    placeholder="e.g., john.smith"
                    required
                    disabled={isEdit}
                  />
                  <div className="form-text">
                    Letters, numbers, dots, hyphens, and underscores only
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={user.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g., John Smith"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    placeholder="e.g., user@school.edu"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputChange}
                    placeholder="e.g., +1-234-567-8901"
                  />
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Account Information</h5>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="role"
                    name="role"
                    value={user.role}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Super Administrator">Super Administrator</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Transport Manager">Transport Manager</option>
                    <option value="Reception">Reception</option>
                    <option value="Student">Student</option>
                    <option value="Parent">Parent</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="department" className="form-label">
                    Department
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="department"
                    name="department"
                    value={user.department}
                    onChange={handleInputChange}
                    placeholder="e.g., Science, Administration"
                  />
                </div>
              </div>
            </div>

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
                    value={user.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Locked">Locked</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Permissions</label>
                  <div className="border rounded p-2" style={{ maxHeight: '120px', overflowY: 'auto' }}>
                    {availablePermissions.map((permission) => (
                      <div key={permission} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={permission}
                          checked={user.permissions.includes(permission)}
                          onChange={() => handlePermissionChange(permission)}
                          disabled={user.role === 'Super Administrator' && permission === 'All Access'}
                        />
                        <label className="form-check-label" htmlFor={permission}>
                          {permission}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Password Section */}
            {!isEdit && (
              <div className="row mb-4">
                <h5 className="col-12 mb-3">Password</h5>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={user.password}
                      onChange={handleInputChange}
                      placeholder="Enter password"
                      required
                      minLength="6"
                    />
                    <div className="form-text">
                      Minimum 6 characters
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={user.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm password"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Personal Information */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Personal Information</h5>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="dateOfBirth" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={user.dateOfBirth}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    value={user.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="bloodGroup" className="form-label">
                    Blood Group
                  </label>
                  <select
                    className="form-select"
                    id="bloodGroup"
                    name="bloodGroup"
                    value={user.bloodGroup}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Contact Information</h5>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    rows="2"
                    value={user.address}
                    onChange={handleInputChange}
                    placeholder="Enter full address..."
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="emergencyContact" className="form-label">
                    Emergency Contact Person
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={user.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="Emergency contact name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="emergencyPhone" className="form-label">
                    Emergency Contact Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="emergencyPhone"
                    name="emergencyPhone"
                    value={user.emergencyPhone}
                    onChange={handleInputChange}
                    placeholder="Emergency contact phone"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="notes" className="form-label">
                    Additional Notes
                  </label>
                  <textarea
                    className="form-control"
                    id="notes"
                    name="notes"
                    rows="3"
                    value={user.notes}
                    onChange={handleInputChange}
                    placeholder="Enter any additional notes about the user..."
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

export default UserForm;
