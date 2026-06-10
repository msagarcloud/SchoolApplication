import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import timeTablePeriodService from '../../services/timeTablePeriodService';

const TimeTablePeriodDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [period, setPeriod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchPeriodData();
    }
  }, [id]);

  const fetchPeriodData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const periodData = await timeTablePeriodService.getById(id);
      setPeriod(periodData);
    } catch (err) {
      // Check if it's a 404 error (API not implemented)
      if (err.message.includes('404') || err.message.includes('Failed to fetch')) {
        setError('TimeTablePeriod API is not yet implemented. Please contact the backend team to set up the TimeTablePeriod Management API endpoints.');
      } else {
        setError(err.message || 'Failed to fetch period details');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => {
    if (!time) return 'N/A';
    // Handle TimeOnly format
    return time.toString().substring(0, 5);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
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
        {error && (
          <div className={`alert ${error.includes('not yet implemented') ? 'alert-warning' : 'alert-danger'}`} role="alert">
            <div className="d-flex align-items-center">
              <i className={`bi ${error.includes('not yet implemented') ? 'bi-exclamation-triangle' : 'bi-exclamation-circle'} me-2`}></i>
              <div>
                <strong>{error.includes('not yet implemented') ? 'API Not Available' : 'Error'}</strong>
                <div className="small">{error}</div>
              </div>
            </div>
          </div>
        )}
        <button className="btn btn-secondary" onClick={() => navigate('/timetableperiods')}>
          Back to Periods
        </button>
      </div>
    );
  }

  if (!period) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning">
          <h5>Period Not Found</h5>
          <p>The requested time table period could not be found.</p>
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/timetableperiods')}>
          Back to Periods
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Time Table Period Details</h2>
        <div>
          <Link to="/timetableperiods" className="btn btn-outline-secondary me-2">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <Link to={`/timetableperiods/${id}/edit`} className="btn btn-primary">
            <i className="bi bi-pencil me-2"></i>
            Edit Period
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Period Information</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label text-muted">Period Number</label>
                <div className="form-control-plaintext">
                  <span className="badge bg-primary fs-6">{period.periodNumber}</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label text-muted">Description</label>
                <div className="form-control-plaintext">
                  {period.description || 'N/A'}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label text-muted">Start Time</label>
                <div className="form-control-plaintext">
                  <i className="bi bi-clock me-2"></i>
                  {formatTime(period.startTime)}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label text-muted">End Time</label>
                <div className="form-control-plaintext">
                  <i className="bi bi-clock me-2"></i>
                  {formatTime(period.endTime)}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label text-muted">Status</label>
                <div className="form-control-plaintext">
                  <span className={`badge ${period.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {period.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label text-muted">Session ID</label>
                <div className="form-control-plaintext">
                  {period.sessionId || 'N/A'}
                </div>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label text-muted">Created Date</label>
                <div className="form-control-plaintext">
                  <i className="bi bi-calendar-plus me-2"></i>
                  {formatDate(period.createdDate)}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label text-muted">Last Modified</label>
                <div className="form-control-plaintext">
                  <i className="bi bi-calendar-check me-2"></i>
                  {formatDate(period.modifiedDate)}
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="form-label text-muted">Status Message</label>
                <div className="form-control-plaintext">
                  {period.statusMessage || 'N/A'}
                </div>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <div className="d-flex justify-content-between">
            <div>
              <small className="text-muted">
                <strong>System Information:</strong><br />
                Company ID: {period.companyId}<br />
                School ID: {period.schoolId}<br />
                Created By: {period.createdBy}
              </small>
            </div>
            <div>
              <Link to="/timetableperiods" className="btn btn-outline-secondary me-2">
                <i className="bi bi-arrow-left me-2"></i>
                Back to List
              </Link>
              <Link to={`/timetableperiods/${id}/edit`} className="btn btn-primary">
                <i className="bi bi-pencil me-2"></i>
                Edit Period
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTablePeriodDetail;
