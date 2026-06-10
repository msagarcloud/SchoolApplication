import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import vendorService from '../../services/vendorService';
import { authService } from '../../services/authService';
import { countryService } from '../../services/countryService';
import { stateService } from '../../services/stateService';
import { cityService } from '../../services/cityService';
import { companyService } from '../../services/companyService';
import { schoolService } from '../../services/schoolService';

const VendorForm = () => {
  const [formData, setFormData] = useState({
    vendorName: '',
    description: '',
    address1: '',
    address2: '',
    cityId: '',
    stateId: '',
    countryId: '',
    zipCode: '',
    contactNumber: '',
    mobileNumber: '',
    emailId: '',
    companyId: '',
    schoolId: '',
    isActive: true,
    isDeleted: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  // Location data for cascaded dropdowns
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [schools, setSchools] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await fetchDropdownData();
      if (id) {
        setIsEditing(true);
        await fetchVendor();
      }
    };
    initialize();
  }, [id]);

  const normalizeId = (data, ...keys) => {
    if (!data) return null;
    for (const key of keys) {
      if (data[key]) return data[key];
    }
    return null;
  };

  const zeroGuid = '00000000-0000-0000-0000-000000000000';
  const isValidGuid = (value) => value && value !== zeroGuid;

  // Validation functions
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'vendorName':
        if (!value || !value.trim()) {
          error = 'Vendor name is required';
        } else if (value.trim().length < 2) {
          error = 'Vendor name must be at least 2 characters';
        } else if (value.trim().length > 100) {
          error = 'Vendor name must not exceed 100 characters';
        }
        break;
      
      case 'emailId':
        if (value && value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value.trim())) {
            error = 'Please enter a valid email address';
          }
        }
        break;
      
      case 'contactNumber':
        if (value && value.trim()) {
          const phoneRegex = /^[0-9\-\+\s\(\)]{7,20}$/;
          if (!phoneRegex.test(value.trim())) {
            error = 'Please enter a valid contact number (7-20 digits)';
          }
        }
        break;
      
      case 'mobileNumber':
        if (value && value.trim()) {
          const phoneRegex = /^[0-9\-\+\s\(\)]{7,20}$/;
          if (!phoneRegex.test(value.trim())) {
            error = 'Please enter a valid mobile number (7-20 digits)';
          }
        }
        break;
      
      case 'address1':
        if (!value || !value.trim()) {
          error = 'Address line 1 is required';
        } else if (value.trim().length > 200) {
          error = 'Address line 1 must not exceed 200 characters';
        }
        break;
      
      case 'address2':
        if (value && value.trim().length > 200) {
          error = 'Address line 2 must not exceed 200 characters';
        }
        break;
      
      case 'zipCode':
        if (value && value.trim()) {
          const zipRegex = /^[0-9A-Za-z\-\s]{3,10}$/;
          if (!zipRegex.test(value.trim())) {
            error = 'Please enter a valid zip code (3-10 characters)';
          }
        }
        break;
      
      case 'countryId':
        if (!value || value === '' || value === zeroGuid) {
          error = 'Country is required';
        }
        break;
      
      case 'stateId':
        if (!value || value === '' || value === zeroGuid) {
          error = 'State is required';
        }
        break;
      
      case 'cityId':
        if (!value || value === '' || value === zeroGuid) {
          error = 'City is required';
        }
        break;
      
      case 'companyId':
        if (!value || value === '' || value === 'session_company') {
          error = 'Company is required';
        }
        break;
      
      case 'schoolId':
        if (!value || value === '' || value === 'session_school') {
          error = 'School is required';
        }
        break;
      
      default:
        break;
    }
    
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate all required fields
    newErrors.vendorName = validateField('vendorName', formData.vendorName);
    newErrors.emailId = validateField('emailId', formData.emailId);
    newErrors.contactNumber = validateField('contactNumber', formData.contactNumber);
    newErrors.mobileNumber = validateField('mobileNumber', formData.mobileNumber);
    newErrors.address1 = validateField('address1', formData.address1);
    newErrors.address2 = validateField('address2', formData.address2);
    newErrors.zipCode = validateField('zipCode', formData.zipCode);
    newErrors.countryId = validateField('countryId', formData.countryId);
    newErrors.stateId = validateField('stateId', formData.stateId);
    newErrors.cityId = validateField('cityId', formData.cityId);
    newErrors.companyId = validateField('companyId', formData.companyId);
    newErrors.schoolId = validateField('schoolId', formData.schoolId);
    
    // Remove empty errors
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) {
        delete newErrors[key];
      }
    });
    
    return newErrors;
  };

  const resolveSessionIds = () => {
    const currentUser = authService.getCurrentUser();
    return {
      companyId: normalizeId(currentUser, 'companyId', 'CompanyId', 'CompanyID'),
      schoolId: normalizeId(currentUser, 'schoolId', 'SchoolId', 'SchoolID')
    };
  };

  const fetchVendor = async () => {
    try {
      setLoading(true);
      const vendor = await vendorService.getVendorById(id);
      if (vendor) {
        const sessionIds = resolveSessionIds();
        const vendorCompanyId = normalizeId(vendor, 'companyId', 'CompanyId', 'CompanyID');
        const vendorSchoolId = normalizeId(vendor, 'schoolId', 'SchoolId', 'SchoolID');

        const selectedCompanyId = isValidGuid(vendorCompanyId)
          ? vendorCompanyId
          : sessionIds.companyId || 'session_company';
        const selectedSchoolId = isValidGuid(vendorSchoolId)
          ? vendorSchoolId
          : sessionIds.schoolId || 'session_school';

        setFormData({
          vendorName: vendor.vendorName || '',
          description: vendor.description || '',
          address1: vendor.address1 || '',
          address2: vendor.address2 || '',
          cityId: vendor.cityId || '',
          stateId: vendor.stateId || '',
          countryId: vendor.countryId || '',
          zipCode: vendor.zipCode || '',
          contactNumber: vendor.contactNumber || '',
          mobileNumber: vendor.mobileNumber || '',
          emailId: vendor.emailId || '',
          companyId: selectedCompanyId,
          schoolId: selectedSchoolId,
          isActive: vendor.isActive !== undefined ? vendor.isActive : true,
          isDeleted: vendor.isDeleted !== undefined ? vendor.isDeleted : false
        });

        if (selectedCompanyId && !companies.some(company => company.id === selectedCompanyId)) {
          setCompanies(prev => [
            ...prev,
            {
              id: selectedCompanyId,
              name: vendor.companyName || vendor.company?.companyName || vendor.company?.name || authService.getCompanyName() || 'Current Company'
            }
          ]);
        }

        if (selectedSchoolId && !schools.some(school => school.id === selectedSchoolId)) {
          setSchools(prev => [
            ...prev,
            {
              id: selectedSchoolId,
              name: vendor.schoolName || vendor.school?.schoolName || vendor.school?.name || authService.getSchoolName() || 'Current School'
            }
          ]);
        }

        if (vendor.countryId) {
          fetchStates(vendor.countryId);
        }
        if (vendor.stateId) {
          fetchCities(vendor.stateId);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch vendor');
    } finally {
      setLoading(false);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const sessionIds = resolveSessionIds();
      const companyName = authService.getCompanyName();
      const schoolName = authService.getSchoolName();

      const [companiesData, schoolsData, countriesData, statesData, citiesData] = await Promise.allSettled([
        companyService.getAll(),
        schoolService.getAll(),
        countryService.getAll(),
        stateService.getAll(),
        cityService.getAll()
      ]);

      const companyList = companiesData.status === 'fulfilled' && Array.isArray(companiesData.value)
        ? companiesData.value.map(company => ({
            id: company.id || company.companyId || company.CompanyId,
            name: company.companyName || company.name || company.CompanyName || 'Unknown Company'
          }))
        : [];

      const schoolList = schoolsData.status === 'fulfilled' && Array.isArray(schoolsData.value)
        ? schoolsData.value.map(school => ({
            id: school.id || school.schoolId || school.SchoolId,
            name: school.schoolName || school.name || school.SchoolName || 'Unknown School'
          }))
        : [];

      if (sessionIds.companyId && !companyList.some(company => company.id === sessionIds.companyId)) {
        companyList.unshift({ id: sessionIds.companyId, name: companyName || 'Current Company' });
      }
      if (sessionIds.schoolId && !schoolList.some(school => school.id === sessionIds.schoolId)) {
        schoolList.unshift({ id: sessionIds.schoolId, name: schoolName || 'Current School' });
      }

      setCompanies(companyList.length ? companyList : [{ id: sessionIds.companyId || 'session_company', name: companyName || 'Default Company' }]);
      setSchools(schoolList.length ? schoolList : [{ id: sessionIds.schoolId || 'session_school', name: schoolName || 'Default School' }]);

      if (!id) {
        setFormData(prev => ({
          ...prev,
          companyId: sessionIds.companyId || 'session_company',
          schoolId: sessionIds.schoolId || 'session_school'
        }));
      }

      if (countriesData.status === 'fulfilled') {
        setCountries(countriesData.value || []);
      } else {
        console.error('Failed to load countries:', countriesData.reason);
        setCountries([]);
      }

      if (statesData.status === 'fulfilled') {
        setStates(statesData.value || []);
      } else {
        console.error('Failed to load states:', statesData.reason);
        setStates([]);
      }

      if (citiesData.status === 'fulfilled') {
        setCities(citiesData.value || []);
      } else {
        console.error('Failed to load cities:', citiesData.reason);
        setCities([]);
      }
    } catch (err) {
      console.error('Failed to fetch dropdown data:', err);
    }
  };

  const fetchStates = async (countryId) => {
    try {
      setLocationLoading(true);
      let statesData = [];
      if (stateService.getByCountryId) {
        statesData = await stateService.getByCountryId(countryId);
      } else {
        const allStates = await stateService.getAll();
        statesData = Array.isArray(allStates)
          ? allStates.filter(state => state.countryId === countryId)
          : [];
      }
      setStates(Array.isArray(statesData) ? statesData : []);
    } catch (err) {
      console.error('Failed to fetch states:', err);
      setStates([]);
    } finally {
      setLocationLoading(false);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      setLocationLoading(true);
      let citiesData = [];
      if (cityService.getByStateId) {
        citiesData = await cityService.getByStateId(stateId);
      } else {
        const allCities = await cityService.getAll();
        citiesData = Array.isArray(allCities)
          ? allCities.filter(city => city.stateId === stateId)
          : [];
      }
      setCities(Array.isArray(citiesData) ? citiesData : []);
    } catch (err) {
      console.error('Failed to fetch cities:', err);
      setCities([]);
    } finally {
      setLocationLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
    
    // Validate field on change
    const fieldError = validateField(name, finalValue);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
    
    // Handle cascaded dropdown logic
    if (name === 'countryId') {
      setFormData(prev => ({
        ...prev,
        countryId: finalValue,
        stateId: '',
        cityId: ''
      }));
      setErrors(prev => ({
        ...prev,
        stateId: finalValue ? '' : 'State is required',
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
      setErrors(prev => ({
        ...prev,
        cityId: finalValue ? '' : 'City is required'
      }));
      if (finalValue) {
        fetchCities(finalValue);
      } else {
        setCities([]);
      }
    }
    
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate all fields
      const validationErrors = validateForm();
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setError('Please fix the validation errors before submitting');
        setLoading(false);
        return;
      }

      const vendorData = {
        ...formData,
        cityId: formData.cityId || '00000000-0000-0000-0000-000000000000',
        stateId: formData.stateId || '00000000-0000-0000-0000-000000000000',
        countryId: formData.countryId || '00000000-0000-0000-0000-000000000000'
      };

      if (isEditing) {
        await vendorService.updateVendor(id, vendorData);
      } else {
        await vendorService.createVendor(vendorData);
      }
      navigate('/vendors');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} vendor`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/vendors');
  };

  if (loading && isEditing) {
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
        <h2>{isEditing ? 'Edit Vendor' : 'Add New Vendor'}</h2>
        <button className="btn btn-secondary" onClick={handleCancel}>
          <i className="bi bi-arrow-left me-2"></i>
          Back to Vendors
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Vendor Information</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Basic Information */}
              <div className="col-md-6 mb-3">
                <h6 className="text-muted mb-3">Basic Information</h6>
                
                <div className="mb-3">
                  <label htmlFor="vendorName" className="form-label">Vendor Name *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.vendorName ? 'is-invalid' : ''}`}
                    id="vendorName"
                    name="vendorName"
                    value={formData.vendorName}
                    onChange={handleChange}
                    required
                  />
                  {errors.vendorName && <div className="invalid-feedback">{errors.vendorName}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="emailId" className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
                    id="emailId"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                  />
                  {errors.emailId && <div className="invalid-feedback">{errors.emailId}</div>}
                </div>
              </div>

              {/* Contact Information */}
              <div className="col-md-6 mb-3">
                <h6 className="text-muted mb-3">Contact Information</h6>
                
                <div className="mb-3">
                  <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                  <input
                    type="tel"
                    className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                  />
                  {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                  {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="companyId" className="form-label">Company *</label>
                  <select
                    className={`form-select ${errors.companyId ? 'is-invalid' : ''}`}
                    id="companyId"
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Company</option>
                    {companies.map(company => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                  {errors.companyId && <div className="invalid-feedback">{errors.companyId}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="schoolId" className="form-label">School *</label>
                  <select
                    className={`form-select ${errors.schoolId ? 'is-invalid' : ''}`}
                    id="schoolId"
                    name="schoolId"
                    value={formData.schoolId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select School</option>
                    {schools.map(school => (
                      <option key={school.id} value={school.id}>
                        {school.name}
                      </option>
                    ))}
                  </select>
                  {errors.schoolId && <div className="invalid-feedback">{errors.schoolId}</div>}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="row">
              <div className="col-12 mb-3">
                <h6 className="text-muted mb-3">Address Information</h6>
              </div>
              
              <div className="col-md-6 mb-3">
                <label htmlFor="address1" className="form-label">Address Line 1 *</label>
                <input
                  type="text"
                  className={`form-control ${errors.address1 ? 'is-invalid' : ''}`}
                  id="address1"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  required
                />
                {errors.address1 && <div className="invalid-feedback">{errors.address1}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="address2" className="form-label">Address Line 2</label>
                <input
                  type="text"
                  className={`form-control ${errors.address2 ? 'is-invalid' : ''}`}
                  id="address2"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                />
                {errors.address2 && <div className="invalid-feedback">{errors.address2}</div>}
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="countryId" className="form-label">Country *</label>
                <select
                  className={`form-select ${errors.countryId ? 'is-invalid' : ''}`}
                  id="countryId"
                  name="countryId"
                  value={formData.countryId}
                  onChange={handleChange}
                  required
                  disabled={locationLoading}
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country.id} value={country.id}>
                      {country.countryName}
                    </option>
                  ))}
                </select>
                {errors.countryId && <div className="invalid-feedback">{errors.countryId}</div>}
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="stateId" className="form-label">State *</label>
                <select
                  className={`form-select ${errors.stateId ? 'is-invalid' : ''}`}
                  id="stateId"
                  name="stateId"
                  value={formData.stateId}
                  onChange={handleChange}
                  required
                  disabled={locationLoading || !formData.countryId}
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state.id} value={state.id}>
                      {state.stateName}
                    </option>
                  ))}
                </select>
                {errors.stateId && <div className="invalid-feedback">{errors.stateId}</div>}
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="cityId" className="form-label">City *</label>
                <select
                  className={`form-select ${errors.cityId ? 'is-invalid' : ''}`}
                  id="cityId"
                  name="cityId"
                  value={formData.cityId}
                  onChange={handleChange}
                  required
                  disabled={locationLoading || !formData.stateId}
                >
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>
                      {city.cityName}
                    </option>
                  ))}
                </select>
                {errors.cityId && <div className="invalid-feedback">{errors.cityId}</div>}
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="zipCode" className="form-label">Zip Code</label>
                <input
                  type="text"
                  className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
                {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
              </div>
            </div>

            {/* Status */}
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="isActive" className="form-label">Status</label>
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
            </div>

            {/* Form Actions */}
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    {isEditing ? 'Update Vendor' : 'Create Vendor'}
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

export default VendorForm;
