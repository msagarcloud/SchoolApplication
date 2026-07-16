import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { holidayService } from '../../services/holidayService';

const formatDateTime = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
};

const formatDate = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString();
};

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

const HolidayMasterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [holiday, setHoliday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHoliday = useCallback(async () => {
    try {
      setLoading(true);
      let data = await holidayService.getById(id);
      
      if (data?.data && typeof data.data === 'object') {
        data = data.data;
      } else if (data?.result && typeof data.result === 'object') {
        data = data.result;
      }
      
      setHoliday(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch holiday details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchHoliday();
  }, [fetchHoliday]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${holiday.name}"? This action cannot be undone.`)) {
      try {
        await holidayService.delete(id);
        navigate('/holidaymaster');
      } catch (err) {
        setError(err.message || 'Failed to delete holiday');
      }
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
        <Link to="/holidaymaster" className="btn btn-outline-secondary">
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
          Holiday not found
        </div>
        <Link to="/holidaymaster" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Holidays
        </Link>
      </div>
    );
  }

  const holidayId = getHolidayValue(holiday, 'id');
  const holidayName = getHolidayValue(holiday, 'name') || 'N/A';
  const holidayDescription = getHolidayValue(holiday, 'description') || 'N/A';
  const holidayFromDate = getHolidayValue(holiday, 'fromDate');
  const holidayToDate = getHolidayValue(holiday, 'toDate');
  const holidayIsActive = getHolidayValue(holiday, 'isActive');
  const holidayIsStaffApplicable = getHolidayValue(holiday, 'isStaffApplicable');
  const holidayCreatedDate = getHolidayValue(holiday, 'createdDate');
  const holidayModifiedDate = getHolidayValue(holiday, 'modifiedDate') ?? getHolidayValue(holiday, 'ModifiedDate');

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Holiday Details</h2>
        <div className="btn-group" role="group">
          <Link to="/holidaymaster" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Holidays
          </Link>
          <Link to={`/holidaymaster/${holidayId}/edit`} className="btn btn-warning">
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
              <h5 className="mb-0">Holiday Information</h5>
              <span className={`badge ${holidayIsActive ? 'bg-success' : 'bg-danger'}`}>
                {holidayIsActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Holiday Name:</div>
                <div className="col-sm-9">{holidayName}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Description:</div>
                <div className="col-sm-9">{holidayDescription}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">From Date:</div>
                <div className="col-sm-9">{formatDate(holidayFromDate)}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">To Date:</div>
                <div className="col-sm-9">{formatDate(holidayToDate)}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Staff Applicable:</div>
                <div className="col-sm-9">
                  <span className={`badge ${holidayIsStaffApplicable ? 'bg-primary' : 'bg-secondary'}`}>
                    {holidayIsStaffApplicable ? 'Yes' : 'No'}
                  </span>
                </div>
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
                <div className="col-sm-4 fw-bold">Holiday ID:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{holidayId}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created Date:</div>
                <div className="col-sm-8">
                  {formatDateTime(holidayCreatedDate)}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Modified Date:</div>
                <div className="col-sm-8">
                  {holidayModifiedDate ? formatDateTime(holidayModifiedDate) : 'Not modified'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayMasterDetail;
