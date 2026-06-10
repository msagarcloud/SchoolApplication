import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { cityService } from '../../services/cityService';
import { stateService } from '../../services/stateService';
import { countryService } from '../../services/countryService';

const CityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    cityName: '',
    cityStateId: ''
  });

  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [dropdownLoading, setDropdownLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStates = useCallback(async () => {
    try {
      setDropdownLoading(true);
      const data = await stateService.getAll();
      setStates(data);
    } catch (err) {
      console.error('Failed to fetch states:', err);
    } finally {
      setDropdownLoading(false);
    }
  }, []);

  const fetchCity = useCallback(async () => {
    try {
      setFetchLoading(true);
      const city = await cityService.getById(id);
      setFormData({
        cityName: city.cityName || '',
        cityStateId: city.cityStateId || ''
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch city details');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  useEffect(() => {
    if (isEditing) {
      fetchCity();
    }
  }, [id, isEditing, fetchCity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.cityName.trim()) {
        setError('City name is required');
        setLoading(false);
        return;
      }

      if (!formData.cityStateId) {
        setError('State selection is required');
        setLoading(false);
        return;
      }

      if (isEditing) {
        await cityService.update(id, formData);
      } else {
        await cityService.create(formData);
      }

      navigate('/cities');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} city`);
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
      <div className="row mb-3">
        <div className="col-12">
          <div className="card bg-light">
            <div className="card-body py-2">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h6 className="mb-0 text-primary">
                    <i className="bi bi-building me-2"></i>
                    <strong>School Name</strong>
                  </h6>
                </div>
                <div className="col-md-6 text-md-end">
                  <h6 className="mb-0 text-secondary">
                    <i className="bi bi-briefcase me-2"></i>
                    Company Name
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isEditing ? 'Edit City' : 'Create New City'}</h2>
        <Link to="/cities" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Cities
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            {isEditing ? 'City Information' : 'New City Details'}
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="cityName" className="form-label">
                    City Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cityName"
                    name="cityName"
                    value={formData.cityName}
                    onChange={handleChange}
                    required
                    placeholder="Enter city name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="cityStateId" className="form-label">
                    State <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="cityStateId"
                    name="cityStateId"
                    value={formData.cityStateId}
                    onChange={handleChange}
                    required
                    disabled={dropdownLoading}
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state.id} value={state.id}>
                        {state.stateName}
                      </option>
                    ))}
                  </select>
                  {dropdownLoading && (
                    <small className="text-muted">Loading states...</small>
                  )}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Link to="/cities" className="btn btn-outline-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading || dropdownLoading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    {isEditing ? 'Update City' : 'Create City'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CityForm;
