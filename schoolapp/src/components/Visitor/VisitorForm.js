import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import visitorService from '../../services/visitorService';

const VisitorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [visitor, setVisitor] = useState({
    visitorName: '',
    phone: '',
    email: '',
    purpose: '',
    personToMeet: '',
    visitDate: new Date().toISOString().split('T')[0],
    scheduledTime: '',
    idProof: '',
    idNumber: '',
    address: '',
    notes: '',
    status: 'Scheduled'
  });

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployees();
    if (isEdit) {
      fetchVisitor();
    }
  }, [id, isEdit]);

  const fetchEmployees = async () => {
    try {
      const data = await visitorService.getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVisitor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      // Validate required fields
      if (!visitor.visitorName || !visitor.purpose || !visitor.personToMeet || !visitor.visitDate) {
        setError('Please fill in all required fields');
        return;
      }
      
      // Validate email format
      if (visitor.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(visitor.email)) {
        setError('Please enter a valid email address');
        return;
      }
      
      // Validate phone format
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (visitor.phone && !phoneRegex.test(visitor.phone)) {
        setError('Please enter a valid phone number');
        return;
      }
      
      // Validate visit date
      const visitDate = new Date(visitor.visitDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (visitDate < today) {
        setError('Visit date cannot be in the past');
        return;
      }
      
      // Call appropriate API method
      if (isEdit) {
        await visitorService.updateVisitor(id, visitor);
      } else {
        await visitorService.createVisitor(visitor);
      }
      
      navigate('/visitors');
    } catch (err) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} visitor record`);
    } finally {
      setLoading(false);
    }
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
          <h2>{isEdit ? 'Edit Visitor' : 'Register New Visitor'}</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/visitors">Visitor Management</Link>
              </li>
              <li className="breadcrumb-item active">
                {isEdit ? 'Edit' : 'Register'}
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/visitors" className="btn btn-outline-secondary me-2">
            <i className="bi bi-x-lg me-2"></i>
            Cancel
          </Link>
          <button 
            type="submit" 
            form="visitor-form"
            className="btn btn-primary"
            disabled={loading}
          >
            <i className="bi bi-check-lg me-2"></i>
            {loading ? 'Saving...' : (isEdit ? 'Update' : 'Register')}
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
        <form id="visitor-form" onSubmit={handleSubmit}>
          <div className="card-body">
            {/* Visitor Information */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Visitor Information</h5>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="visitorName" className="form-label">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="visitorName"
                    name="visitorName"
                    value={visitor.visitorName}
                    onChange={handleInputChange}
                    placeholder="e.g., John Smith"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={visitor.phone}
                    onChange={handleInputChange}
                    placeholder="e.g., +1-234-567-8901"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={visitor.email}
                    onChange={handleInputChange}
                    placeholder="e.g., visitor@email.com"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="purpose" className="form-label">
                    Purpose of Visit <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="purpose"
                    name="purpose"
                    value={visitor.purpose}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Purpose</option>
                    <option value="Parent Meeting">Parent Meeting</option>
                    <option value="Admission Inquiry">Admission Inquiry</option>
                    <option value="Vendor Meeting">Vendor Meeting</option>
                    <option value="Job Interview">Job Interview</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Visit Details */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Visit Details</h5>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="personToMeet" className="form-label">
                    Person to Meet <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="personToMeet"
                    name="personToMeet"
                    value={visitor.personToMeet}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Person</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.name}>
                        {employee.name} - {employee.designation}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="visitDate" className="form-label">
                    Visit Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="visitDate"
                    name="visitDate"
                    value={visitor.visitDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="scheduledTime" className="form-label">
                    Scheduled Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="scheduledTime"
                    name="scheduledTime"
                    value={visitor.scheduledTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={visitor.status}
                    onChange={handleInputChange}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Identification Information */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Identification Information</h5>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="idProof" className="form-label">
                    ID Proof Type
                  </label>
                  <select
                    className="form-select"
                    id="idProof"
                    name="idProof"
                    value={visitor.idProof}
                    onChange={handleInputChange}
                  >
                    <option value="">Select ID Proof</option>
                    <option value="Aadhar Card">Aadhar Card</option>
                    <option value="Driving License">Driving License</option>
                    <option value="PAN Card">PAN Card</option>
                    <option value="Passport">Passport</option>
                    <option value="Voter ID">Voter ID</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="idNumber" className="form-label">
                    ID Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="idNumber"
                    name="idNumber"
                    value={visitor.idNumber}
                    onChange={handleInputChange}
                    placeholder="Enter ID number"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Address Information</h5>
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
                    value={visitor.address}
                    onChange={handleInputChange}
                    placeholder="Enter visitor's address..."
                  />
                </div>
              </div>
            </div>

            {/* Additional Notes */}
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
                    value={visitor.notes}
                    onChange={handleInputChange}
                    placeholder="Enter any additional notes about the visit..."
                  />
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="alert alert-info" role="alert">
              <h6 className="alert-heading">
                <i className="bi bi-info-circle me-2"></i>
                Important Information
              </h6>
              <ul className="mb-0">
                <li>Visitors must carry valid ID proof for verification</li>
                <li>Visitors are required to sign in at the reception desk</li>
                <li>Visitors must wear the visitor pass during their stay</li>
                <li>Visitors should be escorted by the person they are meeting</li>
                <li>Visitors must check out when leaving the premises</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisitorForm;
