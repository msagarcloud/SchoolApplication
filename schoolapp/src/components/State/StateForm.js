import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { stateService } from '../../services/stateService';
import { countryService } from '../../services/countryService';
import { authService } from '../../services/authService';

const StateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    stateName: '',
    countryId: ''
  });

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [dropdownLoading, setDropdownLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCountries = useCallback(async () => {
    try {
      setDropdownLoading(true);
      const data = await countryService.getAll();
      setCountries(data);
    } catch (err) {
      console.error('Failed to fetch countries:', err);
    } finally {
      setDropdownLoading(false);
    }
  }, []);

  const fetchState = useCallback(async () => {
    try {
      setFetchLoading(true);
      const state = await stateService.getById(id);
      setFormData({
        stateName: state.stateName || '',
        countryId: state.countryId || ''
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch state details');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  useEffect(() => {
    if (isEditing) {
      fetchState();
    }
  }, [id, isEditing, fetchState]);

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
      if (!formData.stateName.trim()) {
        setError('State name is required');
        setLoading(false);
        return;
      }

      if (!formData.countryId) {
        setError('Country selection is required');
        setLoading(false);
        return;
      }

      if (isEditing) {
        await stateService.update(id, formData);
      } else {
        await stateService.create(formData);
      }

      navigate('/states');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} state`);
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
                    <strong>{authService.getSchoolName() || 'School Name'}</strong>
                  </h6>
                </div>
                <div className="col-md-6 text-md-end">
                  <h6 className="mb-0 text-secondary">
                    <i className="bi bi-briefcase me-2"></i>
                    {authService.getCompanyName() || 'Company Name'}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isEditing ? 'Edit State' : 'Create New State'}</h2>
        <Link to="/states" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to States
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
            {isEditing ? 'State Information' : 'New State Details'}
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="stateName" className="form-label">
                    State Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="stateName"
                    name="stateName"
                    value={formData.stateName}
                    onChange={handleChange}
                    required
                    placeholder="Enter state name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="countryId" className="form-label">
                    Country <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="countryId"
                    name="countryId"
                    value={formData.countryId}
                    onChange={handleChange}
                    required
                    disabled={dropdownLoading}
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country.id} value={country.id}>
                        {country.countryName}
                      </option>
                    ))}
                  </select>
                  {dropdownLoading && (
                    <small className="text-muted">Loading countries...</small>
                  )}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Link to="/states" className="btn btn-outline-secondary">
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
                    {isEditing ? 'Update State' : 'Create State'}
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

export default StateForm;
