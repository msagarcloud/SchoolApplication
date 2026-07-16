import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { holidayService } from '../../services/holidayService';
import { holidayTypeService } from '../../services/holidayTypeService';
import { sessionMasterService } from '../../services/sessionMasterService';
import { useSessionData } from '../../hooks/useSessionData';

const getHolidayValue = (holiday, key) => {
  if (holiday?.[key] !== undefined && holiday[key] !== null) return holiday[key];
  
  const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
  if (holiday?.[pascalKey] !== undefined && holiday[pascalKey] !== null) return holiday[pascalKey];
  
  const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
  if (holiday?.[snakeKey] !== undefined && holiday[snakeKey] !== null) return holiday[snakeKey];
  
  const upperSnakeKey = snakeKey.toUpperCase();
  if (holiday?.[upperSnakeKey] !== undefined && holiday[upperSnakeKey] !== null) return holiday[upperSnakeKey];
  
  const lowerKey = key.toLowerCase();
  if (holiday?.[lowerKey] !== undefined && holiday[lowerKey] !== null) return holiday[lowerKey];
  
  return undefined;
};

const HolidayMasterForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
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
  const [fetchLoading, setFetchLoading] = useState(isEdit);
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

  const getSessionLabel = (sessionId) => {
    if (!sessionId) return 'N/A';
    const session = sessions.find(
      (session) => session.id === sessionId || session.Id === sessionId || session.value === sessionId || session.Value === sessionId
    );
    return session ? session.value || session.Value || session.name || session.Name || sessionId : sessionId;
  };

  const fetchHolidayTypes = useCallback(async () => {
    try {
      setTypesLoading(true);
      const data = await holidayTypeService.getAll();
      setHolidayTypes(data || []);
    } catch (err) {
      setHolidayTypes([]);
    } finally {
      setTypesLoading(false);
    }
  }, []);

  const fetchSessions = useCallback(async () => {
    try {
      setSessionsLoading(true);
      const data = await sessionMasterService.getAll();
      setSessions(data || []);
    } catch (err) {
      setSessions([]);
    } finally {
      setSessionsLoading(false);
    }
  }, []);

  const fetchHoliday = useCallback(async () => {
    try {
      setFetchLoading(true);
      let data = await holidayService.getById(id);
      
      if (data?.data && typeof data.data === 'object') {
        data = data.data;
      } else if (data?.result && typeof data.result === 'object') {
        data = data.result;
      }
      
      setFormData({
        name: getHolidayValue(data, 'name') || '',
        description: getHolidayValue(data, 'description') || '',
        typeId: getHolidayValue(data, 'typeId') || getHolidayValue(data, 'holidayTypeId') || '',
        fromDate: normalizeDate(getHolidayValue(data, 'fromDate')),
        toDate: normalizeDate(getHolidayValue(data, 'toDate')),
        year: getHolidayValue(data, 'year')?.toString() || new Date().getFullYear().toString(),
        isStaffApplicable: getHolidayValue(data, 'isStaffApplicable') || false,
        sessionId: getHolidayValue(data, 'sessionId') || '',
        isActive: getHolidayValue(data, 'isActive') !== false,
        isDeleted: getHolidayValue(data, 'isDeleted') || false
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch holiday details');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchHolidayTypes();
    fetchSessions();
    if (isEdit) {
      fetchHoliday();
    }
  }, [isEdit, fetchHoliday, fetchHolidayTypes, fetchSessions]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
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
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
      
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        typeId: formData.typeId,
        fromDate: fromDateObj.toISOString(),
        toDate: toDateObj.toISOString(),
        year: formData.year && formData.year.match(/^[0-9a-fA-F-]{36}$/) ? formData.year : (formData.sessionId || ''),
        isStaffApplicable: formData.isStaffApplicable,
        sessionId: formData.sessionId,
        companyId: sessionData.sessionData?.companyId,
        schoolId: sessionData.sessionData?.schoolId,
        isActive: formData.isActive,
        isDeleted: formData.isDeleted
      };
      
      if (isEdit) {
        await holidayService.update(id, payload);
      } else {
        await holidayService.create(payload);
      }
      
      navigate('/holidaymaster');
    } catch (err) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} holiday`);
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
        <h2>{isEdit ? 'Edit Holiday' : 'Create New Holiday'}</h2>
        <div>
          <Link to="/holidaymaster" className="btn btn-outline-secondary me-2">
            <i className="bi bi-x-lg me-2"></i>
            Cancel
          </Link>
          <button 
            type="submit" 
            form="holiday-form"
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

      <div className="card">
        <form id="holiday-form" onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Holiday Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Diwali"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="typeId" className="form-label">
                    Holiday Type <span className="text-danger">*</span>
                  </label>
                  <select
                    id="typeId"
                    name="typeId"
                    className="form-select"
                    value={formData.typeId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Select Type --</option>
                    {holidayTypes.map((type) => (
                      <option key={String(type.id)} value={type.id}>
                        {type.holidayTypeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="fromDate" className="form-label">
                    From Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="fromDate"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="toDate" className="form-label">
                    To Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="toDate"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="sessionId" className="form-label">
                    Session <span className="text-danger">*</span>
                  </label>
                  <select
                    id="sessionId"
                    name="sessionId"
                    className="form-select"
                    value={formData.sessionId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Select Session --</option>
                    {sessions.map((session) => (
                      <option key={String(session.id)} value={session.id}>
                        {session.value || session.Value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="year" className="form-label">
                    Academic Year
                  </label>
                  <input id="year" name="year" type="hidden" value={formData.year} />
                  <input
                    type="text"
                    className="form-control"
                    value={getSessionLabel(formData.year)}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isStaffApplicable"
                    name="isStaffApplicable"
                    checked={formData.isStaffApplicable}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="isStaffApplicable">
                    Staff Applicable
                  </label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="isActive">
                    Active
                  </label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isDeleted"
                    name="isDeleted"
                    checked={formData.isDeleted}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="isDeleted">
                    Deleted
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HolidayMasterForm;
