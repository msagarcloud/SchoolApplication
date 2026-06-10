import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { holidayService } from '../../services/holidayService';
import { holidayTypeService } from '../../services/holidayTypeService';
import { sessionMasterService } from '../../services/sessionMasterService';

const HolidayDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [holiday, setHoliday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [holidayTypeName, setHolidayTypeName] = useState('');
  const [sessionLabel, setSessionLabel] = useState('');
  const [yearLabel, setYearLabel] = useState('');

  const getEntityLabel = (entity, fallback = '') => {
    if (!entity) return fallback;
    return (
      entity.HolidayTypeName || entity.holidayTypeName || entity.name || entity.Name || entity.sessionName || entity.SessionName || entity.value || entity.Value || entity.AcademicYear || entity.academicYear || fallback
    );
  };

  useEffect(() => {
    const fetchHoliday = async () => {
      try {
        setLoading(true);
        const data = await holidayService.getById(id);
        setHoliday(data);
      } catch (err) {
        setError(err.message || 'Failed to load holiday details');
      } finally {
        setLoading(false);
      }
    };

    fetchHoliday();
  }, [id]);

  useEffect(() => {
    const resolveRelatedLabels = async () => {
      if (!holiday) return;

      const typeId = holiday.typeId || holiday.TypeId || holiday.typeID || holiday.TypeID;
      const sessionId = holiday.sessionId || holiday.SessionId || holiday.sessionID || holiday.SessionID;
      const yearId = holiday.year || holiday.Year;

      const typePromise = typeId ? holidayTypeService.getById(typeId) : Promise.resolve(null);
      const sessionPromise = sessionId ? sessionMasterService.getById(sessionId) : Promise.resolve(null);
      const yearPromise = yearId && yearId !== sessionId ? sessionMasterService.getById(yearId) : Promise.resolve(null);

      try {
        const [typeResult, sessionResult, yearResult] = await Promise.allSettled([
          typePromise,
          sessionPromise,
          yearPromise
        ]);

        if (typeResult.status === 'fulfilled' && typeResult.value) {
          setHolidayTypeName(getEntityLabel(typeResult.value, holiday.typeName || holiday.typeId || ''));
        }

        if (sessionResult.status === 'fulfilled' && sessionResult.value) {
          setSessionLabel(getEntityLabel(sessionResult.value, holiday.sessionName || holiday.sessionId || ''));
        }

        if (yearResult.status === 'fulfilled' && yearResult.value) {
          setYearLabel(getEntityLabel(yearResult.value, holiday.year || ''));
        } else if (yearId && yearId === sessionId && sessionResult.status === 'fulfilled' && sessionResult.value) {
          setYearLabel(getEntityLabel(sessionResult.value, holiday.year || ''));
        }
      } catch (err) {
        console.error('Failed to resolve related holiday labels:', err);
      }
    };

    resolveRelatedLabels();
  }, [holiday]);

  const handleDelete = async () => {
    if (!holiday) return;
    if (window.confirm(`Delete holiday '${holiday.holidayName}'?`)) {
      try {
        await holidayService.delete(id);
        navigate('/holidays');
      } catch (err) {
        setError(err.message || 'Failed to delete holiday');
      }
    }
  };

  const formatDate = (value) => {
    if (!value) return 'N/A';
    const date = new Date(value);
    return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
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
        <Link to="/holidays" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Holidays
        </Link>
      </div>
    );
  }

  if (!holiday) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Holiday not found.
        </div>
        <Link to="/holidays" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Holidays
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Holiday Details</h2>
        <div className="btn-group" role="group">
          <Link to="/holidays" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Holidays
          </Link>
          <Link to={`/holidays/${id}/edit`} className="btn btn-warning">
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
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Holiday Information</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Holiday Name</div>
                <div className="col-sm-8">{holiday.name || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">From Date</div>
                <div className="col-sm-8">{formatDate(holiday.fromDate)}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">To Date</div>
                <div className="col-sm-8">{formatDate(holiday.toDate)}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Description</div>
                <div className="col-sm-8">{holiday.description || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Holiday Type</div>
                <div className="col-sm-8">
                  {holidayTypeName || holiday.typeName || holiday.typeId || 'N/A'}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Academic Year</div>
                <div className="col-sm-8">
                  {yearLabel || holiday.year || 'N/A'}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Session</div>
                <div className="col-sm-8">
                  {sessionLabel || holiday.sessionName || holiday.sessionId || 'N/A'}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Staff Applicable</div>
                <div className="col-sm-8">
                  <span className={`badge ${holiday.isStaffApplicable ? 'bg-success' : 'bg-secondary'}`}>
                    {holiday.isStaffApplicable ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Status</div>
                <div className="col-sm-8">
                  <span className={`badge ${holiday.isActive ? 'bg-success' : 'bg-secondary'}`}>
                    {holiday.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">System Info</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-5 fw-bold">ID</div>
                <div className="col-7 text-truncate">{holiday.id}</div>
              </div>
              <div className="row mb-3">
                <div className="col-5 fw-bold">Created</div>
                <div className="col-7">{formatDate(holiday.createdDate)}</div>
              </div>
              <div className="row">
                <div className="col-5 fw-bold">Modified</div>
                <div className="col-7">{formatDate(holiday.modifiedDate)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayDetail;
