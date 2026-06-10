import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EmployeeLeaveForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [leave, setLeave] = useState({
    employeeId: '',
    leaveType: '',
    fromDate: '',
    toDate: '',
    days: 0,
    reason: '',
    status: 'Pending',
    contactAddress: '',
    contactPhone: '',
    emergencyContact: '',
    isHalfDay: false,
    halfDayType: 'First Half'
  });

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [leaveBalance, setLeaveBalance] = useState({
    annual: 12,
    sick: 8,
    personal: 5,
    maternity: 90,
    paternity: 15
  });

  useEffect(() => {
    fetchEmployees();
    if (isEdit) {
      fetchLeave();
    }
  }, [id, isEdit]);

  useEffect(() => {
    calculateDays();
  }, [leave.fromDate, leave.toDate, leave.isHalfDay]);

  const fetchEmployees = async () => {
    try {
      // Mock data - replace with actual API call
      const mockEmployees = [
        { id: 1, name: 'John Doe', employeeCode: 'EMP001', department: 'IT' },
        { id: 2, name: 'Jane Smith', employeeCode: 'EMP002', department: 'HR' },
        { id: 3, name: 'Mike Johnson', employeeCode: 'EMP003', department: 'Finance' }
      ];
      setEmployees(mockEmployees);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    }
  };

  const fetchLeave = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockLeave = {
        id: 1,
        employeeId: 1,
        leaveType: 'Sick Leave',
        fromDate: '2024-01-15',
        toDate: '2024-01-16',
        days: 2,
        reason: 'Fever and headache',
        status: 'Approved',
        contactAddress: '123 Main St, City',
        contactPhone: '1234567890',
        emergencyContact: 'Jane Doe - 9876543210',
        isHalfDay: false,
        halfDayType: 'First Half'
      };
      setLeave(mockLeave);
    } catch (err) {
      setError(err.message || 'Failed to fetch leave details');
    } finally {
      setLoading(false);
    }
  };

  const calculateDays = () => {
    if (leave.fromDate && leave.toDate) {
      const from = new Date(leave.fromDate);
      const to = new Date(leave.toDate);
      
      if (from <= to) {
        const diffTime = Math.abs(to - from);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        
        let calculatedDays = diffDays;
        if (leave.isHalfDay) {
          calculatedDays = 0.5;
        }
        
        setLeave(prev => ({
          ...prev,
          days: calculatedDays
        }));
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLeave(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      // Validate required fields
      if (!leave.employeeId || !leave.leaveType || !leave.fromDate || !leave.toDate) {
        setError('Please fill in all required fields');
        return;
      }
      
      // Validate date logic
      if (new Date(leave.fromDate) > new Date(leave.toDate)) {
        setError('From date cannot be after to date');
        return;
      }
      
      // Replace with actual API call
      console.log('Submitting leave:', leave);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/employee-leaves');
    } catch (err) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} leave request`);
    } finally {
      setLoading(false);
    }
  };

  const getAvailableBalance = (leaveType) => {
    const balanceMap = {
      'Annual Leave': leaveBalance.annual,
      'Sick Leave': leaveBalance.sick,
      'Personal Leave': leaveBalance.personal,
      'Maternity Leave': leaveBalance.maternity,
      'Paternity Leave': leaveBalance.paternity
    };
    return balanceMap[leaveType] || 0;
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
          <h2>{isEdit ? 'Edit Leave Request' : 'Create New Leave Request'}</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/employee-leaves">Employee Leaves</Link>
              </li>
              <li className="breadcrumb-item active">
                {isEdit ? 'Edit' : 'Create'}
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/employee-leaves" className="btn btn-outline-secondary me-2">
            <i className="bi bi-x-lg me-2"></i>
            Cancel
          </Link>
          <button 
            type="submit" 
            form="leave-form"
            className="btn btn-primary"
            disabled={loading}
          >
            <i className="bi bi-check-lg me-2"></i>
            {loading ? 'Saving...' : (isEdit ? 'Update' : 'Submit')}
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Leave Balance Info */}
      {leave.employeeId && (
        <div className="alert alert-info" role="alert">
          <h6 className="alert-heading">Leave Balance</h6>
          <div className="row">
            <div className="col-md-2"><strong>Annual:</strong> {leaveBalance.annual} days</div>
            <div className="col-md-2"><strong>Sick:</strong> {leaveBalance.sick} days</div>
            <div className="col-md-2"><strong>Personal:</strong> {leaveBalance.personal} days</div>
            <div className="col-md-3"><strong>Maternity:</strong> {leaveBalance.maternity} days</div>
            <div className="col-md-3"><strong>Paternity:</strong> {leaveBalance.paternity} days</div>
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className="card">
        <form id="leave-form" onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="employeeId" className="form-label">
                    Employee <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="employeeId"
                    name="employeeId"
                    value={leave.employeeId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Employee</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name} ({employee.employeeCode}) - {employee.department}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="leaveType" className="form-label">
                    Leave Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="leaveType"
                    name="leaveType"
                    value={leave.leaveType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Personal Leave">Personal Leave</option>
                    <option value="Maternity Leave">Maternity Leave</option>
                    <option value="Paternity Leave">Paternity Leave</option>
                  </select>
                  {leave.leaveType && (
                    <div className="form-text">
                      Available Balance: {getAvailableBalance(leave.leaveType)} days
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="fromDate" className="form-label">
                    From Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="fromDate"
                    name="fromDate"
                    value={leave.fromDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="toDate" className="form-label">
                    To Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="toDate"
                    name="toDate"
                    value={leave.toDate}
                    onChange={handleInputChange}
                    min={leave.fromDate}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="days" className="form-label">
                    Total Days
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="days"
                    name="days"
                    value={leave.days}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isHalfDay"
                    name="isHalfDay"
                    checked={leave.isHalfDay}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="isHalfDay">
                    Half Day Leave
                  </label>
                </div>
              </div>
            </div>

            {leave.isHalfDay && (
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="halfDayType" className="form-label">
                      Half Day Type
                    </label>
                    <select
                      className="form-select"
                      id="halfDayType"
                      name="halfDayType"
                      value={leave.halfDayType}
                      onChange={handleInputChange}
                    >
                      <option value="First Half">First Half</option>
                      <option value="Second Half">Second Half</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="reason" className="form-label">
                    Reason <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="reason"
                    name="reason"
                    rows="3"
                    value={leave.reason}
                    onChange={handleInputChange}
                    placeholder="Enter reason for leave..."
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="contactAddress" className="form-label">
                    Contact Address During Leave
                  </label>
                  <textarea
                    className="form-control"
                    id="contactAddress"
                    name="contactAddress"
                    rows="2"
                    value={leave.contactAddress}
                    onChange={handleInputChange}
                    placeholder="Enter contact address..."
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="contactPhone" className="form-label">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="contactPhone"
                    name="contactPhone"
                    value={leave.contactPhone}
                    onChange={handleInputChange}
                    placeholder="Enter contact phone..."
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="emergencyContact" className="form-label">
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={leave.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="Emergency contact..."
                  />
                </div>
              </div>
            </div>

            {isEdit && (
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
                      value={leave.status}
                      onChange={handleInputChange}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLeaveForm;
