import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { schoolService } from '../../services/schoolService';
import { locationService } from '../../services/locationService';
import { authService } from '../../services/authService';

const SchoolForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    email: '',
    address1: '',
    address2: '',
    cityId: '',
    stateId: '',
    countryId: '',
    zipCode: '',
    phone: '',
    establishmentYear: '',
    mobile: '',
    judistrictionCityId: '',
    judistrictionStateId: '',
    judistrictionCountryId: '',
    bankName: '',
    bankAddress1: '',
    bankAddress2: '',
    bankCityId: '',
    bankStateId: '',
    bankCountryId: '',
    bankZipCode: '',
    accountNumber: '',
    isActive: true,
    isDeleted: false,
    companyId: ''
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');
  
  // Location data for cascaded dropdowns
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [judistrictionCountries, setJudistrictionCountries] = useState([]);
  const [judistrictionStates, setJudistrictionStates] = useState([]);
  const [judistrictionCities, setJudistrictionCities] = useState([]);
  const [bankCountries, setBankCountries] = useState([]);
  const [bankStates, setBankStates] = useState([]);
  const [bankCities, setBankCities] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const fetchSchool = useCallback(async () => {
    try {
      setFetchLoading(true);
      const school = await schoolService.getById(id);
      setFormData({
        name: school.name || '',
        description: school.description || '',
        email: school.email || '',
        address1: school.address1 || '',
        address2: school.address2 || '',
        cityId: school.cityId || '',
        stateId: school.stateId || '',
        countryId: school.countryId || '',
        zipCode: school.zipCode || '',
        phone: school.phone || '',
        establishmentYear: school.establishmentYear || '',
        mobile: school.mobile || '',
        judistrictionCityId: school.judistrictionCityId || '',
        judistrictionStateId: school.judistrictionStateId || '',
        judistrictionCountryId: school.judistrictionCountryId || '',
        bankName: school.bankName || '',
        bankAddress1: school.bankAddress1 || '',
        bankAddress2: school.bankAddress2 || '',
        bankCityId: school.bankCityId || '',
        bankStateId: school.bankStateId || '',
        bankCountryId: school.bankCountryId || '',
        bankZipCode: school.bankZipCode || '',
        accountNumber: school.accountNumber || '',
        isActive: school.isActive !== undefined ? school.isActive : true,
        isDeleted: school.isDeleted !== undefined ? school.isDeleted : false,
        companyId: school.companyId || ''
      });
      // Load location data for existing school
      if (school.countryId) {
        fetchStates(school.countryId);
      }
      if (school.stateId) {
        fetchCities(school.stateId);
      }
      if (school.judistrictionCountryId) {
        fetchJudistrictionStates(school.judistrictionCountryId);
      }
      if (school.judistrictionStateId) {
        fetchJudistrictionCities(school.judistrictionStateId);
      }
      if (school.bankCountryId) {
        fetchBankStates(school.bankCountryId);
      }
      if (school.bankStateId) {
        fetchBankCities(school.bankStateId);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch school details');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEditing) {
      fetchSchool();
    }
    // Initialize CompanyId from current user session
    const currentUser = authService.getCurrentUser();
    if (currentUser && currentUser.companyId) {
      setFormData(prev => ({
        ...prev,
        companyId: currentUser.companyId
      }));
    }
    // Fetch initial location data
    fetchCountries();
    fetchJudistrictionCountries();
    fetchBankCountries();
  }, [id, isEditing, fetchSchool]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
    
    // Handle cascaded dropdown logic for Address Location
    if (name === 'countryId') {
      setFormData(prev => ({
        ...prev,
        countryId: finalValue,
        stateId: '',
        cityId: ''
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
        cityId: ''
      }));
      if (finalValue) {
        fetchCities(finalValue);
      } else {
        setCities([]);
      }
    }
    
    // Handle cascaded dropdown logic for Jurisdiction Location
    if (name === 'judistrictionCountryId') {
      setFormData(prev => ({
        ...prev,
        judistrictionCountryId: finalValue,
        judistrictionStateId: '',
        judistrictionCityId: ''
      }));
      if (finalValue) {
        fetchJudistrictionStates(finalValue);
      } else {
        setJudistrictionStates([]);
        setJudistrictionCities([]);
      }
    } else if (name === 'judistrictionStateId') {
      setFormData(prev => ({
        ...prev,
        judistrictionStateId: finalValue,
        judistrictionCityId: ''
      }));
      if (finalValue) {
        fetchJudistrictionCities(finalValue);
      } else {
        setJudistrictionCities([]);
      }
    }
    
    // Handle cascaded dropdown logic for Bank Location
    if (name === 'bankCountryId') {
      setFormData(prev => ({
        ...prev,
        bankCountryId: finalValue,
        bankStateId: '',
        bankCityId: ''
      }));
      if (finalValue) {
        fetchBankStates(finalValue);
      } else {
        setBankStates([]);
        setBankCities([]);
      }
    } else if (name === 'bankStateId') {
      setFormData(prev => ({
        ...prev,
        bankStateId: finalValue,
        bankCityId: ''
      }));
      if (finalValue) {
        fetchBankCities(finalValue);
      } else {
        setBankCities([]);
      }
    }
    
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.name.trim()) {
        setError('School name is required');
        setLoading(false);
        return;
      }

      if (!formData.email.trim()) {
        setError('Email is required');
        setLoading(false);
        return;
      }

      if (!formData.companyId.trim()) {
        setError('Company is required');
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

      const schoolData = {
        ...formData,
        cityId: formData.cityId || null,
        stateId: formData.stateId || null,
        countryId: formData.countryId || null,
        judistrictionCityId: formData.judistrictionCityId || null,
        judistrictionStateId: formData.judistrictionStateId || null,
        judistrictionCountryId: formData.judistrictionCountryId || null,
        bankCityId: formData.bankCityId || null,
        bankStateId: formData.bankStateId || null,
        bankCountryId: formData.bankCountryId || null,
        isActive: formData.isActive !== undefined ? formData.isActive : true,
        isDeleted: formData.isDeleted !== undefined ? formData.isDeleted : false,
        companyId: formData.companyId || '00000000-0000-0000-0000-000000000000'
      };

      if (isEditing) {
        await schoolService.update(id, schoolData);
      } else {
        await schoolService.create(schoolData);
      }

      navigate('/schools');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} school`);
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
      setJudistrictionCountries(countriesData);
      setBankCountries(countriesData);
    } catch (err) {
      console.error('Failed to fetch countries:', err);
    } finally {
      setLocationLoading(false);
    }
  };

  const fetchJudistrictionCountries = async () => {
    try {
      setLocationLoading(true);
      const countriesData = await locationService.getCountries();
      setJudistrictionCountries(countriesData);
    } catch (err) {
      console.error('Failed to fetch judistriction countries:', err);
    } finally {
      setLocationLoading(false);
    }
  };

  const fetchBankCountries = async () => {
    try {
      setLocationLoading(true);
      const countriesData = await locationService.getCountries();
      setBankCountries(countriesData);
    } catch (err) {
      console.error('Failed to fetch bank countries:', err);
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

  const fetchJudistrictionStates = async (countryId) => {
    try {
      setLocationLoading(true);
      const statesData = await locationService.getStatesByCountryId(countryId);
      setJudistrictionStates(statesData);
    } catch (err) {
      console.error('Failed to fetch judistriction states:', err);
    } finally {
      setLocationLoading(false);
    }
  };

  const fetchJudistrictionCities = async (stateId) => {
    try {
      setLocationLoading(true);
      const citiesData = await locationService.getCitiesByStateId(stateId);
      setJudistrictionCities(citiesData);
    } catch (err) {
      console.error('Failed to fetch judistriction cities:', err);
    } finally {
      setLocationLoading(false);
    }
  };

  const fetchBankStates = async (countryId) => {
    try {
      setLocationLoading(true);
      const statesData = await locationService.getStatesByCountryId(countryId);
      setBankStates(statesData);
    } catch (err) {
      console.error('Failed to fetch bank states:', err);
    } finally {
      setLocationLoading(false);
    }
  };

  const fetchBankCities = async (stateId) => {
    try {
      setLocationLoading(true);
      const citiesData = await locationService.getCitiesByStateId(stateId);
      setBankCities(citiesData);
    } catch (err) {
      console.error('Failed to fetch bank cities:', err);
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
        <h2>{isEditing ? 'Edit School' : 'Create New School'}</h2>
        <Link to="/schools" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Schools
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
            {isEditing ? 'School Information' : 'New School Details'}
          </h5>
        </div>
        <div className="card-body">
          {/* Tab Navigation */}
          <ul className="nav nav-tabs mb-4" id="schoolFormTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'basic' ? 'active' : ''}`}
                type="button"
                onClick={() => setActiveTab('basic')}
              >
                <i className="bi bi-info-circle me-2"></i>
                Basic Information
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'address' ? 'active' : ''}`}
                type="button"
                onClick={() => setActiveTab('address')}
              >
                <i className="bi bi-geo-alt me-2"></i>
                Address Information
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'jurisdiction' ? 'active' : ''}`}
                type="button"
                onClick={() => setActiveTab('jurisdiction')}
              >
                <i className="bi bi-bank me-2"></i>
                Jurisdiction Information
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'bank' ? 'active' : ''}`}
                type="button"
                onClick={() => setActiveTab('bank')}
              >
                <i className="bi bi-credit-card me-2"></i>
                Bank Information
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'status' ? 'active' : ''}`}
                type="button"
                onClick={() => setActiveTab('status')}
              >
                <i className="bi bi-toggle-on me-2"></i>
                Status Information
              </button>
            </li>
          </ul>

          <form onSubmit={handleSubmit}>
            {/* Basic Information Tab */}
            {activeTab === 'basic' && (
              <div className="tab-content">
                <div className="row mb-4">
                  <div className="col-12">
                    <h6 className="border-bottom pb-2 mb-3">Basic Information</h6>
                  </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    School Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter school name"
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
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="establishmentYear" className="form-label">
                    Establishment Year
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="establishmentYear"
                    name="establishmentYear"
                    value={formData.establishmentYear}
                    onChange={handleChange}
                    placeholder="e.g., 2020"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="companyId" className="form-label">
                    Company Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="companyId"
                    name="companyId"
                    value={authService.getCompanyName() || 'No company found'}
                    readOnly
                    disabled
                    placeholder="Company Name (from session)"
                  />
                  <small className="text-muted">Automatically fetched from user session</small>
                </div>
              </div>
              <div className="col-12">
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
                    placeholder="Enter school description"
                  />
                </div>
              </div>
                </div>
              </div>
            )}

            {/* Address Information Tab */}
            {activeTab === 'address' && (
              <div className="tab-content">
                <div className="row mb-4">
                  <div className="col-12">
                    <h6 className="border-bottom pb-2 mb-3">Address Information</h6>
                  </div>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="address1" className="form-label">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address1"
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    placeholder="Enter address line 1"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="address2" className="form-label">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    placeholder="Enter address line 2"
                  />
                </div>
              </div>
              <div className="col-md-3">
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
              <div className="col-md-3">
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
              <div className="col-md-3">
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
              <div className="col-md-3">
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
                </div>
              </div>
            )}

            {/* Jurisdiction Information Tab */}
            {activeTab === 'jurisdiction' && (
              <div className="tab-content">
                <div className="row mb-4">
                  <div className="col-12">
                    <h6 className="border-bottom pb-2 mb-3">Jurisdiction Information</h6>
                  </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="judistrictionCountryId" className="form-label">
                    Jurisdiction Country
                  </label>
                  <select
                    className="form-select"
                    id="judistrictionCountryId"
                    name="judistrictionCountryId"
                    value={formData.judistrictionCountryId}
                    onChange={handleChange}
                    disabled={locationLoading}
                  >
                    <option value="">Select Country</option>
                    {judistrictionCountries.map(country => (
                      <option key={country.id} value={country.id}>
                        {country.countryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="judistrictionStateId" className="form-label">
                    Jurisdiction State
                  </label>
                  <select
                    className="form-select"
                    id="judistrictionStateId"
                    name="judistrictionStateId"
                    value={formData.judistrictionStateId}
                    onChange={handleChange}
                    disabled={locationLoading || !formData.judistrictionCountryId}
                  >
                    <option value="">Select State</option>
                    {judistrictionStates.map(state => (
                      <option key={state.id} value={state.id}>
                        {state.stateName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="judistrictionCityId" className="form-label">
                    Jurisdiction City
                  </label>
                  <select
                    className="form-select"
                    id="judistrictionCityId"
                    name="judistrictionCityId"
                    value={formData.judistrictionCityId}
                    onChange={handleChange}
                    disabled={locationLoading || !formData.judistrictionStateId}
                  >
                    <option value="">Select City</option>
                    {judistrictionCities.map(city => (
                      <option key={city.id} value={city.id}>
                        {city.cityName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
                </div>
              </div>
            )}

            {/* Bank Information Tab */}
            {activeTab === 'bank' && (
              <div className="tab-content">
                <div className="row mb-4">
                  <div className="col-12">
                    <h6 className="border-bottom pb-2 mb-3">Bank Information</h6>
                  </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="bankName" className="form-label">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    placeholder="Enter bank name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="accountNumber" className="form-label">
                    Account Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="accountNumber"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    placeholder="Enter account number"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="bankAddress1" className="form-label">
                    Bank Address Line 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bankAddress1"
                    name="bankAddress1"
                    value={formData.bankAddress1}
                    onChange={handleChange}
                    placeholder="Enter bank address line 1"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="bankAddress2" className="form-label">
                    Bank Address Line 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bankAddress2"
                    name="bankAddress2"
                    value={formData.bankAddress2}
                    onChange={handleChange}
                    placeholder="Enter bank address line 2"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="bankCountryId" className="form-label">
                    Bank Country
                  </label>
                  <select
                    className="form-select"
                    id="bankCountryId"
                    name="bankCountryId"
                    value={formData.bankCountryId}
                    onChange={handleChange}
                    disabled={locationLoading}
                  >
                    <option value="">Select Country</option>
                    {bankCountries.map(country => (
                      <option key={country.id} value={country.id}>
                        {country.countryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="bankStateId" className="form-label">
                    Bank State
                  </label>
                  <select
                    className="form-select"
                    id="bankStateId"
                    name="bankStateId"
                    value={formData.bankStateId}
                    onChange={handleChange}
                    disabled={locationLoading || !formData.bankCountryId}
                  >
                    <option value="">Select State</option>
                    {bankStates.map(state => (
                      <option key={state.id} value={state.id}>
                        {state.stateName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="bankCityId" className="form-label">
                    Bank City
                  </label>
                  <select
                    className="form-select"
                    id="bankCityId"
                    name="bankCityId"
                    value={formData.bankCityId}
                    onChange={handleChange}
                    disabled={locationLoading || !formData.bankStateId}
                  >
                    <option value="">Select City</option>
                    {bankCities.map(city => (
                      <option key={city.id} value={city.id}>
                        {city.cityName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="bankZipCode" className="form-label">
                    Bank Zip Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bankZipCode"
                    name="bankZipCode"
                    value={formData.bankZipCode}
                    onChange={handleChange}
                    placeholder="Enter bank zip code"
                  />
                </div>
              </div>
                </div>
              </div>
            )}

            {/* Status Information Tab */}
            {activeTab === 'status' && (
              <div className="tab-content">
                <div className="row mb-4">
                  <div className="col-12">
                    <h6 className="border-bottom pb-2 mb-3">Status Information</h6>
                  </div>
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
              </div>
            )}

            <div className="d-flex justify-content-end gap-2">
              <Link to="/schools" className="btn btn-outline-secondary">
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
                    {isEditing ? 'Update School' : 'Create School'}
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

export default SchoolForm;
