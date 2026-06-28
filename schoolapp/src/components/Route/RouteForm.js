import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import routeService from '../../services/routeService';
import routeLocationService from '../../services/routeLocationService';
import { authServiceOptimized } from '../../services/authService';

const ZERO_GUID = '00000000-0000-0000-0000-000000000000';

const normalizeId = (data, ...keys) => {
  if (!data) return null;
  for (const key of keys) {
    if (data[key]) return data[key];
  }
  return null;
};

const RouteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    routeName: '',
    routeDescription: '',
    startPoint: '',
    endPoint: '',
    intermediateStops: '',
    distance: '',
    estimatedTime: '',
    fare: '',
    companyId: '',
    schoolId: '',
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [routeLocations, setRouteLocations] = useState([]);

  const resolveSessionIds = () => {
    const currentUser = authServiceOptimized.getCurrentUser();
    return {
      companyId: normalizeId(currentUser, 'companyId', 'CompanyId', 'CompanyID'),
      schoolId: normalizeId(currentUser, 'schoolId', 'SchoolId', 'SchoolID'),
      createdBy: normalizeId(currentUser, 'id', 'Id', 'userId', 'UserId') || ZERO_GUID
    };
  };

  useEffect(() => {
    const initialize = async () => {
      await loadRouteLocations();
      if (isEditing) {
        await loadRoute();
      } else {
        const sessionIds = resolveSessionIds();
        setFormData((prev) => ({
          ...prev,
          companyId: sessionIds.companyId || prev.companyId,
          schoolId: sessionIds.schoolId || prev.schoolId
        }));
      }
    };
    initialize();
  }, [id]);

  const loadRouteLocations = async () => {
    try {
      const locations = await routeLocationService.getAll();
      setRouteLocations(locations || []);
    } catch (err) {
      console.error('Failed to load route locations:', err);
    }
  };

  const loadRoute = async () => {
    try {
      const route = await routeService.getById(id);
      setFormData({
        routeName: route.routeName || '',
        routeDescription: route.routeDescription || '',
        startPoint: route.startPoint || '',
        endPoint: route.endPoint || '',
        intermediateStops: route.intermediateStops || '',
        distance: route.distance ?? '',
        estimatedTime: route.estimatedTime || '',
        fare: route.fare ?? '',
        companyId: route.companyId || '',
        schoolId: route.schoolId || '',
        isActive: route.isActive ?? true
      });
    } catch (err) {
      setError('Failed to load route. Please try again.');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const sessionIds = resolveSessionIds();
      const companyId = formData.companyId || sessionIds.companyId;
      const schoolId = formData.schoolId || sessionIds.schoolId;

      if (!companyId || !schoolId) {
        setError('Company and school are required. Please log in again.');
        return;
      }

      const routeData = {
        routeName: formData.routeName.trim(),
        routeDescription: formData.routeDescription?.trim() || null,
        startPoint: formData.startPoint.trim(),
        endPoint: formData.endPoint.trim(),
        intermediateStops: formData.intermediateStops?.trim() || null,
        distance: formData.distance !== '' ? Number(formData.distance) : null,
        fare: formData.fare !== '' ? Number(formData.fare) : null,
        estimatedTime: formData.estimatedTime?.trim() || null,
        companyId,
        schoolId,
        createdBy: sessionIds.createdBy,
        isActive: formData.isActive
      };

      if (isEditing) {
        await routeService.update(id, routeData);
      } else {
        await routeService.create(routeData);
      }

      navigate('/routes');
    } catch (err) {
      setError(err.response?.data?.title || err.response?.data || 'Failed to save route. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>{isEditing ? 'Edit Route' : 'Add Route'}</h4>
        <button 
          onClick={() => navigate('/routes')} 
          className="btn btn-secondary"
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to List
        </button>
      </div>

      {error && (
        <div className="alert alert-danger">
          {typeof error === 'string' ? error : 'Failed to save route. Please try again.'}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Route Name *</label>
            <input
              type="text"
              className="form-control"
              name="routeName"
              value={formData.routeName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              name="routeDescription"
              value={formData.routeDescription}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Start Point *</label>
            <select
              className="form-select"
              name="startPoint"
              value={formData.startPoint}
              onChange={handleChange}
              required
            >
              <option value="">Select Start Point</option>
              {routeLocations.map((location) => {
                const label = location.routeLocationName || location.locationName || location.name || location.value || '';
                return (
                  <option key={location.id || location.routeLocationId || label} value={label}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">End Point *</label>
            <select
              className="form-select"
              name="endPoint"
              value={formData.endPoint}
              onChange={handleChange}
              required
            >
              <option value="">Select End Point</option>
              {routeLocations.map((location) => {
                const label = location.routeLocationName || location.locationName || location.name || location.value || '';
                return (
                  <option key={location.id || location.routeLocationId || label} value={label}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col-md-12 mb-3">
            <label className="form-label">Intermediate Stops</label>
            <textarea
              className="form-control"
              name="intermediateStops"
              value={formData.intermediateStops}
              onChange={handleChange}
              rows="3"
              placeholder="Enter intermediate stops separated by commas"
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Distance (km)</label>
            <input
              type="number"
              step="0.1"
              className="form-control"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Estimated Time</label>
            <input
              type="text"
              className="form-control"
              name="estimatedTime"
              value={formData.estimatedTime}
              onChange={handleChange}
              placeholder="e.g., 45 minutes"
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Fare ($)</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="fare"
              value={formData.fare}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
              <label className="form-check-label">
                Active
              </label>
            </div>
          </div>

          <div className="col-12">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-2"></i>
                  {isEditing ? 'Update Route' : 'Save Route'}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RouteForm;
