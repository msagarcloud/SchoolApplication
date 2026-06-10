import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { parentService } from '../../services/parentService';
import { cityService } from '../../services/cityService';
import { stateService } from '../../services/stateService';
import { countryService } from '../../services/countryService';

const ParentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [parent, setParent] = useState({
    id: '',
    studentGuid: '',
    parentFirstName: '',
    parentLastName: '',
    parentDob: '',
    qualificationId: '',
    occupation: '',
    annualIncome: '',
    designationId: '',
    phone: '',
    mobile: '',
    email: '',
    address1: '',
    address2: '',
    cityId: '',
    stateId: '',
    countryId: '',
    zipCode: '',
    officeAddress1: '',
    officeAddress2: '',
    officeCityId: '',
    officeStateId: '',
    officeCountryId: '',
    officeZipCode: '',
    officePhone: '',
    image: '',
    relationTypeId: '',
    schoolId: '',
    companyId: '',
    isActive: true,
    isDeleted: false,
    createdBy: '',
    createdDate: '',
    modifiedBy: '',
    modifiedDate: '',
    status: '',
    statusMessage: ''
  });

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDropdownData();
    if (isEdit) {
      fetchParent();
    }
  }, [id]);

  const fetchDropdownData = async () => {
    try {
      const [
        citiesData,
        statesData,
        countriesData
      ] = await Promise.all([
        cityService.getAll(),
        stateService.getAll(),
        countryService.getAll()
      ]);
      
      setCities(citiesData);
      setStates(statesData);
      setCountries(countriesData);
    } catch (err) {
      console.error('Failed to fetch dropdown data:', err);
    }
  };

  const fetchParent = async () => {
    try {
      setLoading(true);
      const data = await parentService.getById(id);
      setParent(data);
    } catch (err) {
      // Check if it's a 404 error (API not implemented)
      if (err.message.includes('404') || err.message.includes('Failed to fetch')) {
        setError('Parent API is not yet implemented. Please contact the backend team to set up the Parent Management API endpoints.');
      } else {
        setError(err.message || 'Failed to fetch parent details');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setParent(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      // Prepare parent data
      const parentData = {
        ...parent,
        id: parent.id || crypto.randomUUID(),
        createdDate: new Date().toISOString(),
        // Get schoolId and companyId from session variables (these should come from auth context or session)
        companyId: 'session-company-id', // This should come from session/company context
        schoolId: 'session-school-id', // This should come from session/school context
        createdBy: 'current-user' // This should come from auth context
      };
      
      if (isEdit) {
        await parentService.update(id, parentData);
      } else {
        await parentService.create(parentData);
      }
      
      navigate('/parents');
    } catch (err) {
      // Check if it's a 404 error (API not implemented)
      if (err.message.includes('404') || err.message.includes('Failed to fetch')) {
        setError('Parent API is not yet implemented. Save operations are not available until the backend is set up.');
      } else {
        setError(err.message || 'Failed to save parent');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
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
        <div>
          <h2>{isEdit ? 'Edit Parent' : 'Add New Parent'}</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/parents">Parents</Link>
              </li>
              <li className="breadcrumb-item active">
                {isEdit ? 'Edit Parent' : 'Add New Parent'}
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/parents" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
        </div>
      </div>

      {error && (
        <div className={`alert ${error.includes('not yet implemented') ? 'alert-warning' : 'alert-danger'}`} role="alert">
          <div className="d-flex align-items-center">
            <i className={`bi ${error.includes('not yet implemented') ? 'bi-exclamation-triangle' : 'bi-exclamation-circle'} me-2`}></i>
            <div>
              <strong>{error.includes('not yet implemented') ? 'API Not Available' : 'Error'}</strong>
              <div className="small">{error}</div>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Parent Information</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="row mb-4">
              <h6 className="col-12 mb-3">Personal Information</h6>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="parentFirstName" className="form-label">First Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="parentFirstName"
                    name="parentFirstName"
                    value={parent.parentFirstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="parentLastName" className="form-label">Last Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="parentLastName"
                    name="parentLastName"
                    value={parent.parentLastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="parentDob" className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    id="parentDob"
                    name="parentDob"
                    value={parent.parentDob}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="relationTypeId" className="form-label">Relation Type *</label>
                  <select
                    className="form-select"
                    id="relationTypeId"
                    name="relationTypeId"
                    value={parent.relationTypeId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Relation</option>
                    <option value="father-relation-type-id">Father</option>
                    <option value="mother-relation-type-id">Mother</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="row mb-4">
              <h6 className="col-12 mb-3">Contact Information</h6>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={parent.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={parent.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">Mobile</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    value={parent.mobile}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="occupation" className="form-label">Occupation</label>
                  <input
                    type="text"
                    className="form-control"
                    id="occupation"
                    name="occupation"
                    value={parent.occupation}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Home Address */}
            <div className="row mb-4">
              <h6 className="col-12 mb-3">Home Address</h6>
              <div className="col-md-12">
                <div className="mb-3">
                  <label htmlFor="address1" className="form-label">Address Line 1</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address1"
                    name="address1"
                    value={parent.address1}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label htmlFor="address2" className="form-label">Address Line 2</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    name="address2"
                    value={parent.address2}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="cityId" className="form-label">City</label>
                  <select
                    className="form-select"
                    id="cityId"
                    name="cityId"
                    value={parent.cityId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="stateId" className="form-label">State</label>
                  <select
                    className="form-select"
                    id="stateId"
                    name="stateId"
                    value={parent.stateId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="countryId" className="form-label">Country</label>
                  <select
                    className="form-select"
                    id="countryId"
                    name="countryId"
                    value={parent.countryId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="zipCode" className="form-label">Zip Code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zipCode"
                    name="zipCode"
                    value={parent.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Office Information */}
            <div className="row mb-4">
              <h6 className="col-12 mb-3">Office Information</h6>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="officeAddress1" className="form-label">Office Address Line 1</label>
                  <input
                    type="text"
                    className="form-control"
                    id="officeAddress1"
                    name="officeAddress1"
                    value={parent.officeAddress1}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="officeAddress2" className="form-label">Office Address Line 2</label>
                  <input
                    type="text"
                    className="form-control"
                    id="officeAddress2"
                    name="officeAddress2"
                    value={parent.officeAddress2}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="officeCityId" className="form-label">Office City</label>
                  <select
                    className="form-select"
                    id="officeCityId"
                    name="officeCityId"
                    value={parent.officeCityId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="officeStateId" className="form-label">Office State</label>
                  <select
                    className="form-select"
                    id="officeStateId"
                    name="officeStateId"
                    value={parent.officeStateId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="officeCountryId" className="form-label">Office Country</label>
                  <select
                    className="form-select"
                    id="officeCountryId"
                    name="officeCountryId"
                    value={parent.officeCountryId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="officePhone" className="form-label">Office Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="officePhone"
                    name="officePhone"
                    value={parent.officePhone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="row mb-4">
              <h6 className="col-12 mb-3">Additional Information</h6>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="annualIncome" className="form-label">Annual Income</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    id="annualIncome"
                    name="annualIncome"
                    value={parent.annualIncome}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="studentGuid" className="form-label">Student GUID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="studentGuid"
                    name="studentGuid"
                    value={parent.studentGuid}
                    onChange={handleInputChange}
                    placeholder="Optional: Link to student"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={parent.isActive}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="isActive">
                      Active
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-end">
                  <Link to="/parents" className="btn btn-secondary me-2">
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
                        {isEdit ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        <i className="bi bi-save me-2"></i>
                        {isEdit ? 'Update Parent' : 'Create Parent'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ParentForm;
