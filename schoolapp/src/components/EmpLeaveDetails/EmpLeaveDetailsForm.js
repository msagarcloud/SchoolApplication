import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { empLeaveDetailsService } from '../../services/empLeaveDetailsService';

const emptyForm = {
  employeeId: '',
  employeeName: '',
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
};

const EmpLeaveDetailsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');

  const mapRecordToForm = useCallback((record) => ({
    employeeId: record.employeeId ?? '',
    employeeName: record.employeeName ?? '',
    leaveType: record.leaveType ?? '',
    fromDate: record.fromDate ?? '',
    toDate: record.toDate ?? '',
    days: record.days ?? 0,
    reason: record.reason ?? '',
    status: record.status ?? 'Pending',
    contactAddress: record.contactAddress ?? '',
    contactPhone: record.contactPhone ?? '',
    emergencyContact: record.emergencyContact ?? '',
    isHalfDay: record.isHalfDay ?? false,
    halfDayType: record.halfDayType ?? 'First Half'
  }), []);

  const fetchRecord = useCallback(async () => {
    if (!isEditing) {
      setFetchLoading(false);
      return;
    }

    try {
      setFetchLoading(true);
      setError('');
      const record = await empLeaveDetailsService.getById(id);
      setFormData(mapRecordToForm(record));
    } catch (err) {
      setError(err.message || 'Failed to fetch leave detail');
    } finally {
      setFetchLoading(false);
    }
  }, [id, isEditing, mapRecordToForm]);

  useEffect(() => {
    fetchRecord();
  }, [fetchRecord]);

  const calculateDays = useCallback(() => {
    if (!formData.fromDate || !formData.toDate) return;

    const from = new Date(formData.fromDate);
    const to = new Date(formData.toDate);

    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return;
    if (from > to) return;

    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const computed = formData.isHalfDay ? 0.5 : diffDays;

    setFormData((prev) => ({ ...prev, days: computed }));
  }, [formData.fromDate, formData.toDate, formData.isHalfDay]);

  useEffect(() => {
    calculateDays();
  }, [calculateDays]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!String(formData.employeeId).trim() && !String(formData.employeeName).trim()) {
        setError('Employee is required (employeeId or employeeName)');
        return;
      }
      if (!String(formData.leaveType).trim()) {
        setError('Leave Type is required');
        return;
      }
      if (!formData.fromDate || !formData.toDate) {
        setError('From Date and To Date are required');
        return;
      }
      if (new Date(formData.fromDate) > new Date(formData.toDate)) {
        setError('From date cannot be after To date');
        return;
      }
      if (!String(formData.reason).trim()) {
        setError('Reason is required');
        return;
      }

      const payload = {
        ...formData,
        // Keep backend-friendly values
        days: formData.days === '' ? 0 : formData.days,
        isHalfDay: Boolean(formData.isHalfDay)
      };

      if (isEditing) {
        await empLeaveDetailsService.update(id, payload);
      } else {
        await empLeaveDetailsService.create(payload);
      }

      navigate('/emp-leave-details');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} employee leave detail`);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isEditing ? 'Edit Employee Leave Detail' : 'Create Employee Leave Detail'}</h2>
        <Link to="/emp-leave-details" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Leave Details
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Leave Detail Information</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Employee ID</label>
                <input
                  className="form-control"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  placeholder="Enter Employee ID (Guid)"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Employee Name</label>
                <input
                  className="form-control"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleChange}
                  placeholder="Enter Employee Name"
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-4">
                <label className="form-label">Leave Type</label>
                <input
                  className="form-control"
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleChange}
                  placeholder="e.g. Sick Leave"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">From Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">To Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-4">
                <label className="form-label">Total Days</label>
                <input className="form-control" value={formData.days ?? 0} readOnly />
              </div>
              <div className="col-md-8">
                <div className="form-check form-switch my-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="isHalfDay"
                    id="isHalfDay"
                    checked={!!formData.isHalfDay}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="isHalfDay">Half Day Leave</label>
                </div>
              </div>
            </div>

            {formData.isHalfDay && (
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="form-label">Half Day Type</label>
                  <select
                    className="form-select"
                    name="halfDayType"
                    value={formData.halfDayType}
                    onChange={handleChange}
                  >
                    <option value="First Half">First Half</option>
                    <option value="Second Half">Second Half</option>
                  </select>
                </div>
              </div>
            )}

            <div className="mb-3 mt-3">
              <label className="form-label">Reason</label>
              <textarea
                className="form-control"
                name="reason"
                rows={3}
                value={formData.reason}
                onChange={handleChange}
                placeholder="Enter reason..."
                required
              />
            </div>

            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Contact Address</label>
                <textarea
                  className="form-control"
                  name="contactAddress"
                  rows={2}
                  value={formData.contactAddress}
                  onChange={handleChange}
                  placeholder="Contact address during leave"
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Contact Phone</label>
                <input
                  className="form-control"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="Phone"
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Emergency Contact</label>
                <input
                  className="form-control"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Name - Phone"
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label className="form-label">Status</label>
                <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Link to="/emp-leave-details" className="btn btn-outline-secondary">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : isEditing ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpLeaveDetailsForm;

