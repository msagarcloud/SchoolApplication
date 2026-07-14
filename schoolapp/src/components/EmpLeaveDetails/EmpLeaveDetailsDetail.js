import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { empLeaveDetailsService } from '../../services/empLeaveDetailsService';

const formatDateTime = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
};

const EmpLeaveDetailsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRecord = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await empLeaveDetailsService.getById(id);
      setRecord(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch employee leave detail');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRecord();
  }, [fetchRecord]);

  const handleDelete = async () => {
    if (!record) return;
    if (!window.confirm(`Are you sure you want to delete "${record.employeeName || record.id || id}"? This action cannot be undone.`)) return;

    try {
      await empLeaveDetailsService.delete(id);
      navigate('/emp-leave-details');
    } catch (err) {
      setError(err.message || 'Failed to delete record');
    }
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
        <Link to="/emp-leave-details" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Leave Details
        </Link>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Employee Leave Detail not found
        </div>
        <Link to="/emp-leave-details" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Leave Details
        </Link>
      </div>
    );
  }

  const status = record.status || 'N/A';
  const statusLower = String(status).toLowerCase();
  const badgeClass =
    statusLower === 'approved'
      ? 'bg-success'
      : statusLower === 'rejected'
        ? 'bg-danger'
        : statusLower === 'cancelled'
          ? 'bg-secondary'
          : 'bg-warning';

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employee Leave Detail</h2>
        <div className="btn-group" role="group">
          <Link to="/emp-leave-details" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </Link>
          <Link to={`/emp-leave-details/${id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            <i className="bi bi-trash me-2"></i>
            Delete
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Leave Detail</h5>
              <span className={`badge ${badgeClass}`}>{status}</span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Employee:</div>
                <div className="col-sm-9">{record.employeeName || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Leave Type:</div>
                <div className="col-sm-9">{record.leaveType || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">From Date:</div>
                <div className="col-sm-9">{record.fromDate || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">To Date:</div>
                <div className="col-sm-9">{record.toDate || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Total Days:</div>
                <div className="col-sm-9">{record.days ?? 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Reason:</div>
                <div className="col-sm-9">{record.reason || 'N/A'}</div>
              </div>

              {record.isHalfDay && (
                <div className="row mb-3">
                  <div className="col-sm-3 fw-bold">Half Day Type:</div>
                  <div className="col-sm-9">{record.halfDayType || 'N/A'}</div>
                </div>
              )}

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Contact Address:</div>
                <div className="col-sm-9">{record.contactAddress || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Contact Phone:</div>
                <div className="col-sm-9">{record.contactPhone || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Emergency Contact:</div>
                <div className="col-sm-9">{record.emergencyContact || 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">System Information</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Id:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{record.id || record.Id || id}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created:</div>
                <div className="col-sm-8">{formatDateTime(record.createdDate)}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Modified:</div>
                <div className="col-sm-8">{formatDateTime(record.modifiedDate)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpLeaveDetailsDetail;

