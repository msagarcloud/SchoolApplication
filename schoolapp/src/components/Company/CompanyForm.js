import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { companyService } from '../../services/companyService';
import { locationService } from '../../services/locationService';
import { authService } from '../../services/authService';

const CompanyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    address: '',
    cityId: '',
    stateId: '',
    countryId: '',
    zipCode: '',
    email: '',
    isActive: true,
    isDeleted: false,
    establishmentYear: '',
    JudistrictionArea: ''
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');
  
  // Location data for cascaded dropdowns
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);

  const fetchCompany = useCallback(async () => {
    try {
      setFetchLoading(true);
      const company = await companyService.getById(id);
      setFormData({
        companyName: company.companyName || '',
        description: company.description || '',
        address: company.address || '',
        cityId: company.cityId || '',
        stateId: company.stateId || '',
        countryId: company.countryId || '',
        zipCode: company.zipCode || '',
        email: company.email || '',
        isActive: company.isActive !== undefined ? company.isActive : true,
        isDeleted: company.isDeleted !== undefined ? company.isDeleted : false,
        establishmentYear: company.establishmentYear || '',
        JudistrictionArea: company.JudistrictionArea || ''
      });
      
      // Load states and cities if country and state are selected
      if (company.countryId) {
        fetchStates(company.countryId);
      }
      if (company.stateId) {
        fetchCities(company.stateId);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch company details');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEditing) {
      fetchCompany();
    }
    fetchCountries();
  }, [id, isEditing, fetchCompany]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
    
    // Handle cascaded dropdown logic
    if (name === 'countryId') {
      setFormData(prev => ({
        ...prev,
        countryId: finalValue,
        stateId: '',
        cityId: '',
        JudistrictionArea: ''
      }));
      if (finalValue) {
        fetchStates(finalValue);
      } else {
        setStates([]);
        setCities([]);
      }
    } else if (name === 'stateId') {
      setFormData(prev => ({
        ...prev,
        stateId: finalValue,
        cityId: '',
        JudistrictionArea: ''
      }));
      if (finalValue) {
        fetchCities(finalValue);
      } else {
        setCities([]);
      }
    } else if (name === 'cityId') {
      setFormData(prev => ({
        ...prev,
        cityId: finalValue,
        JudistrictionArea: finalValue // Jurisdiction Area mirrors City
      }));
    }
    
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.companyName.trim()) {
        setError('Company name is required');
        setLoading(false);
        return;
      }

      if (!formData.email.trim()) {
        setError('Email is required');
        setLoading(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      const companyData = {
        ...formData,
        cityId: formData.cityId || '00000000-0000-0000-0000-000000000000',
        stateId: formData.stateId || '00000000-0000-0000-0000-000000000000',
        countryId: formData.countryId || '00000000-0000-0000-0000-000000000000',
        JudistrictionArea: formData.JudistrictionArea || '00000000-0000-0000-0000-000000000000'
      };

      if (isEditing) {
        await companyService.update(id, companyData);
      } else {
        await companyService.create(companyData);
      }

      navigate('/companies');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} company`);
    } finally {
      setLoading(false);
    }
  };

  // Location data fetching functions
  const fetchCountries = async () => {
    try {
      setLocationLoading(true);
      const countriesData = await locationService.getCountries();
      setCountries(countriesData);
    } catch (err) {
      console.error('Failed to fetch countries:', err);
    } finally {
      setLocationLoading(false);
    }
  };

  const fetchStates = async (countryId) => {
    try {
      setLocationLoading(true);
      const statesData = await locationService.getStatesByCountryId(countryId);
      setStates(statesData);
    } catch (err) {
      console.error('Failed to fetch states:', err);
    } finally {
      setLocationLoading(false);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      setLocationLoading(true);
      const citiesData = await locationService.getCitiesByStateId(stateId);
      setCities(citiesData);
    } catch (err) {
      console.error('Failed to fetch cities:', err);
    } finally {
      setLocationLoading(false);
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
        <h2>{isEditing ? 'Edit Company' : 'Create New Company'}</h2>
        <Link to="/companies" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Companies
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
            {isEditing ? 'Company Information' : 'New Company Details'}
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="companyName" className="form-label">
                    Company Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    placeholder="Enter company name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Enter company description"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                placeholder="Enter company address"
              />
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="countryId" className="form-label">
                    Country
                  </label>
                  <select
                    className="form-select"
                    id="countryId"
                    name="countryId"
                    value={formData.countryId}
                    onChange={handleChange}
                    disabled={locationLoading}
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country.id} value={country.id}>
                        {country.countryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="stateId" className="form-label">
                    State
                  </label>
                  <select
                    className="form-select"
                    id="stateId"
                    name="stateId"
                    value={formData.stateId}
                    onChange={handleChange}
                    disabled={locationLoading || !formData.countryId}
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state.id} value={state.id}>
                        {state.stateName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="cityId" className="form-label">
                    City
                  </label>
                  <select
                    className="form-select"
                    id="cityId"
                    name="cityId"
                    value={formData.cityId}
                    onChange={handleChange}
                    disabled={locationLoading || !formData.stateId}
                  >
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city.id} value={city.id}>
                        {city.cityName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="JudistrictionArea" className="form-label">
                    Jurisdiction Area
                  </label>
                  <select
                    className="form-select"
                    id="JudistrictionArea"
                    name="JudistrictionArea"
                    value={formData.JudistrictionArea}
                    onChange={handleChange}
                    disabled={locationLoading || !formData.stateId}
                  >
                    <option value="">Select Jurisdiction Area</option>
                    {cities.map(city => (
                      <option key={city.id} value={city.id}>
                        {city.cityName}
                      </option>
                    ))}
                  </select>
                  <small className="text-muted">Jurisdiction Area mirrors City values</small>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="zipCode" className="form-label">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Enter zip code"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="establishmentYear" className="form-label">
                    Establishment Year
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="establishmentYear"
                    name="establishmentYear"
                    value={formData.establishmentYear}
                    onChange={handleChange}
                    placeholder="e.g., 2020"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="isActive" className="form-label">
                    Status
                  </label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isActive"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="isActive">
                      Active
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="isDeleted" className="form-label">
                    Delete Status
                  </label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isDeleted"
                      name="isDeleted"
                      checked={formData.isDeleted}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="isDeleted">
                      Deleted
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Link to="/companies" className="btn btn-outline-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    {isEditing ? 'Update Company' : 'Create Company'}
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

export default CompanyForm;
