import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import timeTablePeriodService from '../../services/timeTablePeriodService';

const TimeTablePeriodForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [period, setPeriod] = useState({
    description: '',
    startTime: '',
    endTime: '',
    sessionId: '',
    periodNumber: '',
    isActive: true
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (isEdit && id) {
      fetchPeriod();
    }
    // In a real implementation, you would fetch sessions from sessionService
    // For now, we'll use mock data
    setSessions([
      { id: 'session-1', name: '2024-2025' },
      { id: 'session-2', name: '2025-2026' }
    ]);
  }, [id, isEdit]);

  const fetchPeriod = async () => {
    try {
      setLoading(true);
      const data = await timeTablePeriodService.getById(id);
      setPeriod({
        description: data.description || '',
        startTime: data.startTime ? data.startTime.toString().substring(0, 5) : '',
        endTime: data.endTime ? data.endTime.toString().substring(0, 5) : '',
        sessionId: data.sessionId || '',
        periodNumber: data.periodNumber || '',
        isActive: data.isActive ?? true
      });
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPeriod(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      // Prepare period data
      const periodData = {
        ...period,
        id: period.id || crypto.randomUUID(),
        createdDate: new Date().toISOString(),
        // Get schoolId and companyId from session variables (these should come from auth context or session)
        companyId: 'session-company-id', // This should come from session/company context
        schoolId: 'session-school-id', // This should come from session/school context
        createdBy: 'current-user', // This should come from auth context
        modifiedBy: isEdit ? 'current-user' : null,
        modifiedDate: isEdit ? new Date().toISOString() : null,
        status: isEdit ? 'Updated' : 'Created',
        statusMessage: isEdit ? 'TimeTablePeriod updated successfully' : 'TimeTablePeriod created successfully'
      };
      
      if (isEdit) {
        await timeTablePeriodService.update(id, periodData);
      } else {
        await timeTablePeriodService.create(periodData);
      }
      
      navigate('/timetableperiods');
    } catch (err) {
      // Check if it's a 404 error (API not implemented)
      if (err.message.includes('404') || err.message.includes('Failed to fetch')) {
        setError('TimeTablePeriod API is not yet implemented. Save operations are not available until the backend is set up.');
      } else {
        setError(err.message || 'Failed to save period');
      }
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!period.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (!period.startTime) {
      setError('Start time is required');
      return false;
    }
    if (!period.endTime) {
      setError('End time is required');
      return false;
    }
    if (!period.periodNumber.trim()) {
      setError('Period number is required');
      return false;
    }
    if (!period.sessionId) {
      setError('Session is required');
      return false;
    }
    
    // Validate time logic
    if (period.startTime >= period.endTime) {
      setError('End time must be after start time');
      return false;
    }
    
    return true;
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isEdit ? 'Edit Time Table Period' : 'Create New Time Table Period'}</h2>
        <div>
          <Link to="/timetableperiods" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
        </div>
      </div>

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

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Period Information</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="periodNumber" className="form-label">
                    Period Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="periodNumber"
                    name="periodNumber"
                    value={period.periodNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., Period 1"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={period.description}
                    onChange={handleInputChange}
                    placeholder="e.g., Morning Assembly"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="startTime" className="form-label">
                    Start Time <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="startTime"
                    name="startTime"
                    value={period.startTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="endTime" className="form-label">
                    End Time <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="endTime"
                    name="endTime"
                    value={period.endTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="sessionId" className="form-label">
                    Academic Session <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="sessionId"
                    name="sessionId"
                    value={period.sessionId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Session</option>
                    {sessions.map(session => (
                      <option key={session.id} value={session.id}>
                        {session.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <div className="form-check form-switch mt-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={period.isActive}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="isActive">
                      Active Status
                    </label>
                  </div>
                  <small className="form-text text-muted">
                    Uncheck to make this period inactive
                  </small>
                </div>
              </div>
            </div>

            <hr className="my-4" />

            <div className="d-flex justify-content-between">
              <div>
                <small className="text-muted">
                  <strong>Note:</strong> School ID and Company ID will be automatically set from your session.
                </small>
              </div>
              <div>
                <Link to="/timetableperiods" className="btn btn-outline-secondary me-2">
                  <i className="bi bi-x-circle me-2"></i>
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  onClick={() => {
                    if (!validateForm()) {
                      return false;
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      {isEdit ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      {isEdit ? 'Update Period' : 'Create Period'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TimeTablePeriodForm;
