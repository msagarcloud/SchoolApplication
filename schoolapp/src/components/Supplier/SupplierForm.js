import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import supplierService from '../../services/supplierService';
import { authService } from '../../services/authService';
import { countryService } from '../../services/countryService';
import { stateService } from '../../services/stateService';
import { cityService } from '../../services/cityService';
import { companyService } from '../../services/companyService';
import { schoolService } from '../../services/schoolService';

const SupplierForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address1: '',
    address2: '',
    cityId: '',
    stateId: '',
    countryId: '',
    zipCode: '',
    phoneNumber: '',
    mobileNumber: '',
    emailId: '',
    companyId: '',
    schoolId: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data for dropdowns - replace with actual API calls
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [schools, setSchools] = useState([]);
  const companiesRef = useRef([]);
  const schoolsRef = useRef([]);

  const normalizeId = useCallback((data, ...keys) => {
    if (!data) return null;
    for (const key of keys) {
      if (data[key]) return data[key];
    }
    return null;
  }, []);

  const dedupeById = useCallback((items) => items.filter(
    (item, index, self) => item && item.id && self.findIndex(el => el.id === item.id) === index
  ), []);

  const zeroGuid = '00000000-0000-0000-0000-000000000000';

  const isValidGuid = (value) => value && value !== zeroGuid;

  const resolveSessionIds = useCallback(() => {
    const currentUser = authService.getCurrentUser();
    return {
      companyId: normalizeId(currentUser, 'companyId', 'CompanyId', 'CompanyID'),
      schoolId: normalizeId(currentUser, 'schoolId', 'SchoolId', 'SchoolID')
    };
  }, [normalizeId]);

  const setUniqueCompanies = useCallback((nextCompanies) => {
    const unique = dedupeById(nextCompanies);
    companiesRef.current = unique;
    setCompanies(unique);
  }, [dedupeById]);

  const setUniqueSchools = useCallback((nextSchools) => {
    const unique = dedupeById(nextSchools);
    schoolsRef.current = unique;
    setSchools(unique);
  }, [dedupeById]);

  const fetchSupplier = useCallback(async () => {
    try {
      setLoading(true);
      const supplier = await supplierService.getSupplierById(id);
      if (supplier) {
        const sessionIds = resolveSessionIds();
        const supplierCompanyId = normalizeId(supplier, 'companyId', 'CompanyId', 'CompanyID');
        const supplierSchoolId = normalizeId(supplier, 'schoolId', 'SchoolId', 'SchoolID');

        const selectedCompanyId = isValidGuid(supplierCompanyId)
          ? supplierCompanyId
          : sessionIds.companyId || '';
        const selectedSchoolId = isValidGuid(supplierSchoolId)
          ? supplierSchoolId
          : sessionIds.schoolId || '';

        setFormData({
          name: supplier.name || '',
          description: supplier.description || '',
          address1: supplier.address1 || '',
          address2: supplier.address2 || '',
          cityId: supplier.cityId || '',
          stateId: supplier.stateId || '',
          countryId: supplier.countryId || '',
          zipCode: supplier.zipCode || '',
          phoneNumber: supplier.phoneNumber || '',
          mobileNumber: supplier.mobileNumber || '',
          emailId: supplier.emailId || '',
          companyId: selectedCompanyId,
          schoolId: selectedSchoolId
        });

        // Fetch cities for the selected state if editing
        if (supplier.stateId) {
          await fetchCitiesByState(supplier.stateId);
        }

        if (selectedCompanyId && !companiesRef.current.some(company => company.id === selectedCompanyId)) {
          setUniqueCompanies([
            ...companiesRef.current,
            {
              id: selectedCompanyId,
              name: supplier.companyName || supplier.company?.companyName || supplier.company?.name || authService.getCompanyName() || 'Current Company'
            }
          ]);
        }

        if (selectedSchoolId && !schoolsRef.current.some(school => school.id === selectedSchoolId)) {
          setUniqueSchools([
            ...schoolsRef.current,
            {
              id: selectedSchoolId,
              name: supplier.schoolName || supplier.school?.schoolName || supplier.school?.name || authService.getSchoolName() || 'Current School'
            }
          ]);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch supplier');
    } finally {
      setLoading(false);
    }
  }, [id, normalizeId, resolveSessionIds, setUniqueCompanies, setUniqueSchools]);

  const fetchDropdownData = useCallback(async () => {
    try {
      const sessionIds = resolveSessionIds();
      const companyName = authService.getCompanyName();
      const schoolName = authService.getSchoolName();

      const [companiesData, schoolsData, countriesData, statesData] = await Promise.allSettled([
        companyService.getAll(),
        schoolService.getAll(),
        countryService.getAll(),
        stateService.getAll()
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

      if (sessionIds.companyId && !companyList.some(item => item.id === sessionIds.companyId)) {
        companyList.unshift({ id: sessionIds.companyId, name: companyName || 'Current Company' });
      }
      if (sessionIds.schoolId && !schoolList.some(item => item.id === sessionIds.schoolId)) {
        schoolList.unshift({ id: sessionIds.schoolId, name: schoolName || 'Current School' });
      }

      const uniqueCompanies = dedupeById(companyList.length ? companyList : [{ id: sessionIds.companyId || 'session_company', name: companyName || 'Default Company' }]);
      const uniqueSchools = dedupeById(schoolList.length ? schoolList : [{ id: sessionIds.schoolId || 'session_school', name: schoolName || 'Default School' }]);

      setUniqueCompanies(uniqueCompanies);
      setUniqueSchools(uniqueSchools);

      if (!id) {
        setFormData(prev => ({
          ...prev,
          companyId: sessionIds.companyId || 'session_company',
          schoolId: sessionIds.schoolId || 'session_school'
        }));
      }

      if (countriesData.status === 'fulfilled' && Array.isArray(countriesData.value)) {
        setCountries(countriesData.value);
      } else {
        console.error('Failed to load countries:', countriesData.reason);
        setCountries([]);
      }

      if (statesData.status === 'fulfilled' && Array.isArray(statesData.value)) {
        const sortedStates = [...statesData.value].sort((a, b) => 
          (a.stateName || '').localeCompare(b.stateName || '')
        );
        setStates(sortedStates);
      } else {
        console.error('Failed to load states:', statesData.reason);
        setStates([]);
      }

      // Cities are loaded dynamically based on state selection
    } catch (err) {
      console.error('Failed to fetch dropdown data:', err);
    }
  }, [id, dedupeById, resolveSessionIds, setUniqueCompanies, setUniqueSchools]);

  /* initialize effect must run after the helpers are defined */
  useEffect(() => {
    const initialize = async () => {
      await fetchDropdownData();
      if (id) {
        setIsEditing(true);
        await fetchSupplier();
      }
    };
    initialize();
  }, [id, fetchDropdownData, fetchSupplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'stateId') {
      // Reset city when state changes and fetch cities for the new state
      setFormData(prev => ({
        ...prev,
        [name]: value,
        cityId: ''
      }));
      
      if (value) {
        fetchCitiesByState(value);
      } else {
        setCities([]);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const fetchCitiesByState = async (stateId) => {
    try {
      const citiesData = await cityService.getByStateId(stateId);
      if (Array.isArray(citiesData)) {
        const sortedCities = [...citiesData].sort((a, b) => 
          (a.cityName || '').localeCompare(b.cityName || '')
        );
        setCities(sortedCities);
      } else {
        setCities([]);
      }
    } catch (err) {
      console.error('Failed to fetch cities by state:', err);
      setCities([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditing) {
        await supplierService.updateSupplier(id, formData);
      } else {
        await supplierService.createSupplier(formData);
      }
      navigate('/suppliers');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} supplier`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/suppliers');
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
        <h2>{isEditing ? 'Edit Supplier' : 'Add New Supplier'}</h2>
        <button className="btn btn-secondary" onClick={handleCancel}>
          <i className="bi bi-arrow-left me-2"></i>
          Back to Suppliers
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Supplier Information</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Basic Information */}
              <div className="col-md-6 mb-3">
                <h6 className="text-muted mb-3">Basic Information</h6>
                
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Supplier Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
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
              </div>

              {/* Contact Information */}
              <div className="col-md-6 mb-3">
                <h6 className="text-muted mb-3">Contact Information</h6>
                
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="companyId" className="form-label">Company *</label>
                  <select
                    className="form-select"
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
                </div>

                <div className="mb-3">
                  <label htmlFor="schoolId" className="form-label">School *</label>
                  <select
                    className="form-select"
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
                  className="form-control"
                  id="address1"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="address2" className="form-label">Address Line 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="countryId" className="form-label">Country *</label>
                <select
                  className="form-select"
                  id="countryId"
                  name="countryId"
                  value={formData.countryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country.id} value={country.id}>
                      {country.countryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="stateId" className="form-label">State *</label>
                <select
                  className="form-select"
                  id="stateId"
                  name="stateId"
                  value={formData.stateId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state.id} value={state.id}>
                      {state.stateName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="cityId" className="form-label">City *</label>
                <select
                  className="form-select"
                  id="cityId"
                  name="cityId"
                  value={formData.cityId}
                  onChange={handleChange}
                  required
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

            {/* Email and Zip Code in separate columns */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="emailId" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="zipCode" className="form-label">Zip Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
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
                    {isEditing ? 'Update Supplier' : 'Create Supplier'}
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

export default SupplierForm;
