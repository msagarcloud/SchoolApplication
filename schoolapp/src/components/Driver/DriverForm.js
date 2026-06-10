import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import driverService from '../../services/driverService';
import { authService } from '../../services/authService';
import { countryService } from '../../services/countryService';
import { stateService } from '../../services/stateService';
import { cityService } from '../../services/cityService';

const ZERO_GUID = '00000000-0000-0000-0000-000000000000';

const normalizeId = (data, ...keys) => {
  if (!data) return null;
  for (const key of keys) {
    if (data[key]) return data[key];
  }
  return null;
};

const DriverForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    fathersName: '',
    mothersName: '',
    address1: '',
    address2: '',
    cityId: '',
    stateId: '',
    countryId: '',
    zipCode: '',
    mobileNumber: '',
    phoneNumber: '',
    driverImage: '',
    licenceNumber: '',
    licenceIssueDate: '',
    licenceValidUptoDate: '',
    licenceDescription: '',
    licenceImage: '',
    licenceType: '',
    companyId: '',
    schoolId: '',
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const resolveSessionIds = () => {
    const currentUser = authService.getCurrentUser();
    return {
      companyId: normalizeId(currentUser, 'companyId', 'CompanyId', 'CompanyID'),
      schoolId: normalizeId(currentUser, 'schoolId', 'SchoolId', 'SchoolID'),
      createdBy: normalizeId(currentUser, 'id', 'Id', 'userId', 'UserId') || ZERO_GUID
    };
  };

  useEffect(() => {
    const initialize = async () => {
      await fetchCountries();
      if (isEditing) {
        await loadDriver();
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

  const fetchCountries = async () => {
    try {
      const data = await countryService.getAll();
      setCountries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch countries:', err);
      setCountries([]);
    }
  };

  const fetchStates = async (countryId) => {
    try {
      let statesData = [];
      if (stateService.getByCountryId) {
        statesData = await stateService.getByCountryId(countryId);
      } else {
        const allStates = await stateService.getAll();
        statesData = Array.isArray(allStates)
          ? allStates.filter((state) => state.countryId === countryId)
          : [];
      }
      setStates(Array.isArray(statesData) ? statesData : []);
    } catch (err) {
      console.error('Failed to fetch states:', err);
      setStates([]);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      let citiesData = [];
      if (cityService.getByStateId) {
        citiesData = await cityService.getByStateId(stateId);
      } else {
        const allCities = await cityService.getAll();
        citiesData = Array.isArray(allCities)
          ? allCities.filter((city) => city.stateId === stateId)
          : [];
      }
      setCities(Array.isArray(citiesData) ? citiesData : []);
    } catch (err) {
      console.error('Failed to fetch cities:', err);
      setCities([]);
    }
  };

  const loadDriver = async () => {
    try {
      const driver = await driverService.getById(id);
      const sessionIds = resolveSessionIds();
      setFormData({
        ...driver,
        companyId: driver.companyId || sessionIds.companyId || '',
        schoolId: driver.schoolId || sessionIds.schoolId || '',
        dateOfBirth: driver.dateOfBirth ? new Date(driver.dateOfBirth).toISOString().split('T')[0] : '',
        licenceIssueDate: driver.licenceIssueDate ? new Date(driver.licenceIssueDate).toISOString().split('T')[0] : '',
        licenceValidUptoDate: driver.licenceValidUptoDate ? new Date(driver.licenceValidUptoDate).toISOString().split('T')[0] : '',
      });
      if (driver.countryId) {
        await fetchStates(driver.countryId);
      }
      if (driver.stateId) {
        await fetchCities(driver.stateId);
      }
    } catch (err) {
      setError('Failed to load driver. Please try again.');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue
    }));

    if (name === 'countryId') {
      setFormData((prev) => ({
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
      setFormData((prev) => ({
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
  };

  const buildDriverPayload = () => {
    const sessionIds = resolveSessionIds();
    const {
      firstName,
      lastName,
      dateOfBirth,
      fathersName,
      mothersName,
      address1,
      address2,
      cityId,
      stateId,
      countryId,
      zipCode,
      mobileNumber,
      phoneNumber,
      driverImage,
      licenceNumber,
      licenceIssueDate,
      licenceValidUptoDate,
      licenceDescription,
      licenceImage,
      licenceType,
      companyId,
      schoolId,
      qualificationId
    } = formData;

    return {
      firstName,
      lastName,
      dateOfBirth: dateOfBirth || null,
      fathersName,
      mothersName,
      address1,
      address2,
      cityId: cityId || ZERO_GUID,
      stateId: stateId || ZERO_GUID,
      countryId: countryId || ZERO_GUID,
      zipCode,
      mobileNumber,
      phoneNumber,
      driverImage,
      licenceNumber,
      licenceIssueDate: licenceIssueDate || null,
      licenceValidUptoDate: licenceValidUptoDate || null,
      licenceDescription,
      licenceImage,
      licenceType,
      companyId: companyId || sessionIds.companyId || ZERO_GUID,
      schoolId: schoolId || sessionIds.schoolId || ZERO_GUID,
      createdBy: sessionIds.createdBy,
      qualificationId: qualificationId || ZERO_GUID
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const driverData = buildDriverPayload();

      if (isEditing) {
        await driverService.update(id, driverData);
      } else {
        await driverService.create(driverData);
      }

      navigate('/drivers');
    } catch (err) {
      const message = err.response?.data?.title
        || err.response?.data?.message
        || (typeof err.response?.data === 'string' ? err.response.data : null)
        || err.message
        || 'Failed to save driver. Please try again.';
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>{isEditing ? 'Edit Driver' : 'Add Driver'}</h4>
        <button 
          onClick={() => navigate('/drivers')} 
          className="btn btn-secondary"
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to List
        </button>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">First Name *</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Father's Name *</label>
            <input
              type="text"
              className="form-control"
              name="fathersName"
              value={formData.fathersName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Mother's Name *</label>
            <input
              type="text"
              className="form-control"
              name="mothersName"
              value={formData.mothersName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Address Line 1</label>
            <input
              type="text"
              className="form-control"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Address Line 2</label>
            <input
              type="text"
              className="form-control"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Country *</label>
            <select
              className="form-select"
              name="countryId"
              value={formData.countryId}
              onChange={handleChange}
              required
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.countryName || country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">State *</label>
            <select
              className="form-select"
              name="stateId"
              value={formData.stateId}
              onChange={handleChange}
              required
              disabled={!formData.countryId}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.stateName || state.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">City *</label>
            <select
              className="form-select"
              name="cityId"
              value={formData.cityId}
              onChange={handleChange}
              required
              disabled={!formData.stateId}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.cityName || city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Zip Code</label>
            <input
              type="text"
              className="form-control"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Mobile Number</label>
            <input
              type="tel"
              className="form-control"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">License Number *</label>
            <input
              type="text"
              className="form-control"
              name="licenceNumber"
              value={formData.licenceNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">License Issue Date</label>
            <input
              type="date"
              className="form-control"
              name="licenceIssueDate"
              value={formData.licenceIssueDate}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">License Valid Until</label>
            <input
              type="date"
              className="form-control"
              name="licenceValidUptoDate"
              value={formData.licenceValidUptoDate}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">License Description</label>
            <textarea
              className="form-control"
              name="licenceDescription"
              value={formData.licenceDescription}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">License Type</label>
            <input
              type="text"
              className="form-control"
              name="licenceType"
              value={formData.licenceType}
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
                  {isEditing ? 'Update Driver' : 'Save Driver'}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DriverForm;
