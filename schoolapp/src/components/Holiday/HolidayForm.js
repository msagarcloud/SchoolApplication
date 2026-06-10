import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { holidayService } from '../../services/holidayService';
import { holidayTypeService } from '../../services/holidayTypeService';
import { sessionMasterService } from '../../services/sessionMasterService';
import { useSessionData } from '../../hooks/useSessionData';

const HolidayForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const sessionData = useSessionData();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    typeId: '',
    fromDate: '',
    toDate: '',
    year: new Date().getFullYear().toString(),
    isStaffApplicable: false,
    sessionId: '',
    isActive: true,
    isDeleted: false
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');
  const [holidayTypes, setHolidayTypes] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [typesLoading, setTypesLoading] = useState(true);
  const [sessionsLoading, setSessionsLoading] = useState(true);

  const normalizeDate = (date) => {
    if (!date) return '';
    return date.split('T')[0];
  };

  const isGuid = (value) => {
    return typeof value === 'string' && /^[0-9a-fA-F-]{36}$/.test(value);
  };

  const getSessionLabel = (id) => {
    if (!id) return 'N/A';
    const session = sessions.find(
      (session) => session.id === id || session.Id === id || session.value === id || session.Value === id
    );
    return session ? session.value || session.Value || session.name || session.Name || id : id;
  };

  // Fetch holiday types from service
  const fetchHolidayTypes = useCallback(async () => {
    try {
      setTypesLoading(true);
      const data = await holidayTypeService.getAll();
      setHolidayTypes(data || []);
    } catch (err) {
      console.log('Holiday types unavailable:', err.message);
      setHolidayTypes([]);
    } finally {
      setTypesLoading(false);
    }
  }, []);

  // Fetch sessions from service
  const fetchSessions = useCallback(async () => {
    try {
      setSessionsLoading(true);
      const data = await sessionMasterService.getAll();
      setSessions(data || []);
    } catch (err) {
      console.log('Sessions unavailable:', err.message);
      setSessions([]);
    } finally {
      setSessionsLoading(false);
    }
  }, []);

  const fetchHoliday = useCallback(async () => {
    try {
      setFetchLoading(true);
      const holiday = await holidayService.getById(id);
      setFormData({
        name: holiday.name || '',
        description: holiday.description || '',
        typeId: holiday.typeId || '',
        fromDate: normalizeDate(holiday.fromDate),
        toDate: normalizeDate(holiday.toDate),
        year: holiday.year?.toString() || new Date().getFullYear().toString(),
        isStaffApplicable: holiday.isStaffApplicable !== undefined ? holiday.isStaffApplicable : false,
        sessionId: holiday.sessionId || '',
        isActive: holiday.isActive !== undefined ? holiday.isActive : true,
        isDeleted: holiday.isDeleted !== undefined ? holiday.isDeleted : false
      });
    } catch (err) {
      setError(err.message || 'Failed to load holiday details');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchHolidayTypes();
    fetchSessions();
    if (isEditing) {
      fetchHoliday();
    }
  }, [isEditing, fetchHoliday, fetchHolidayTypes, fetchSessions]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const nextFormData = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };

      if (name === 'sessionId' && value) {
        if (!isGuid(prev.year)) {
          nextFormData.year = value;
        }
      }

      return nextFormData;
    });
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.name.trim()) {
      setError('Holiday name is required');
      setLoading(false);
      return;
    }

    if (!formData.fromDate) {
      setError('From date is required');
      setLoading(false);
      return;
    }

    if (!formData.toDate) {
      setError('To date is required');
      setLoading(false);
      return;
    }

    if (!formData.typeId) {
      setError('Holiday type is required');
      setLoading(false);
      return;
    }

    if (!formData.sessionId) {
      setError('Session is required');
      setLoading(false);
      return;
    }

    const fromDateObj = new Date(formData.fromDate + 'T00:00:00Z');
    const toDateObj = new Date(formData.toDate + 'T00:00:00Z');

    if (toDateObj < fromDateObj) {
      setError('To date must be after from date');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        typeId: formData.typeId,
        fromDate: fromDateObj.toISOString(),
        toDate: toDateObj.toISOString(),
        // Backend expects a GUID for `Year` (AcademicYear). Use selected session id as a GUID
        // when an academic year GUID isn't provided from the form.
        year: formData.year && formData.year.match(/^[0-9a-fA-F-]{36}$/) ? formData.year : (formData.sessionId || ''),
        isStaffApplicable: formData.isStaffApplicable,
        sessionId: formData.sessionId,
        companyId: sessionData.companyId,
        schoolId: sessionData.schoolId,
        isActive: formData.isActive,
        isDeleted: formData.isDeleted
      };

      if (isEditing) {
        await holidayService.update(id, payload);
      } else {
        await holidayService.create(payload);
      }

      navigate('/holidays');
    } catch (err) {
      const errorMessage = err?.message || (typeof err === 'string' ? err : `Failed to ${isEditing ? 'update' : 'create'} holiday`);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading || typesLoading || sessionsLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{isEditing ? 'Edit Holiday' : 'Create Holiday'}</h2>
          <p className="text-muted mb-0">{isEditing ? 'Update holiday details.' : 'Add a new holiday.'}</p>
        </div>
        <Link to="/holidays" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Holidays
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Holiday Name <span className="text-danger">*</span></label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="typeId" className="form-label">Holiday Type <span className="text-danger">*</span></label>
                  <select
                    id="typeId"
                    name="typeId"
                    className="form-select"
                    value={formData.typeId}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  >
                    <option value="">-- Select Type --</option>
                    {holidayTypes.length === 0 ? (
                      <option disabled value="">
                        No holiday types available
                      </option>
                    ) : (
                      holidayTypes.map((type, index) => {
                        const optionValue = type.Id ?? type.id ?? type.value ?? type.Value ?? '';
                        const optionLabel = type.HolidayTypeName ?? type.holidayTypeName ?? type.name ?? type.Name ?? 'Unnamed Type';
                        return (
                          <option key={optionValue || index} value={optionValue}>
                            {optionLabel}
                          </option>
                        );
                      })
                    )}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="fromDate" className="form-label">From Date <span className="text-danger">*</span></label>
                  <input
                    id="fromDate"
                    name="fromDate"
                    type="date"
                    className="form-control"
                    value={formData.fromDate}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="toDate" className="form-label">To Date <span className="text-danger">*</span></label>
                  <input
                    id="toDate"
                    name="toDate"
                    type="date"
                    className="form-control"
                    value={formData.toDate}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="year" className="form-label">Academic Year</label>
                  <input id="year" name="year" type="hidden" value={formData.year} />
                  <input
                    type="text"
                    className="form-control"
                    value={getSessionLabel(formData.year)}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="sessionId" className="form-label">Session <span className="text-danger">*</span></label>
                  <select
                    id="sessionId"
                    name="sessionId"
                    className="form-select"
                    value={formData.sessionId}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  >
                    <option value="">-- Select Session --</option>
                    {sessions.map((session) => (
                      <option key={session.id} value={session.id}>
                        {session.value || session.Value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="form-check form-switch mb-3">
                  <input
                    id="isStaffApplicable"
                    name="isStaffApplicable"
                    type="checkbox"
                    className="form-check-input"
                    checked={formData.isStaffApplicable}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <label htmlFor="isStaffApplicable" className="form-check-label">Staff Applicable</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-check form-switch mb-3">
                  <input
                    id="isActive"
                    name="isActive"
                    type="checkbox"
                    className="form-check-input"
                    checked={formData.isActive}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <label htmlFor="isActive" className="form-check-label">Active</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-check form-switch mb-3">
                  <input
                    id="isDeleted"
                    name="isDeleted"
                    type="checkbox"
                    className="form-check-input"
                    checked={formData.isDeleted}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <label htmlFor="isDeleted" className="form-check-label">Deleted</label>
                </div>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </>
                ) : (
                  isEditing ? 'Update Holiday' : 'Create Holiday'
                )}
              </button>
              <Link to="/holidays" className="btn btn-outline-secondary">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HolidayForm;
