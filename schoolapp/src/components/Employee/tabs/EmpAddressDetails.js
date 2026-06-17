import React, { useEffect, useState } from 'react';
import { countryService } from '../../../services/countryService';
import { stateService } from '../../../services/stateService';
import { cityService } from '../../../services/cityService';
import { useAddress } from '../../../hooks/useAddress';


const EmpAddressDetails = ({ employeeData, onInputChange, onDataChange }) => {
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  
  const { onChange: addressOnChange } = useAddress({

    address1: employeeData?.address1 || employeeData?.currentAddress1 || '',
    address2: employeeData?.address2 || employeeData?.currentAddress2 || '',
    country: employeeData?.country || employeeData?.currentCountryId || '',
    state: employeeData?.state || employeeData?.currentStateId || '',
    city: employeeData?.city || employeeData?.currentCityId || '',
    pincode: employeeData?.pincode || employeeData?.currentZipCode || ''
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [permanentStates, setPermanentStates] = useState([]);
  const [permanentCities, setPermanentCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMasterData();
  }, []);

  useEffect(() => {
    if (employeeData.currentCountryId) {
      fetchStates(employeeData.currentCountryId, 'current');
    }
    if (employeeData.permanentCountryId) {
      fetchStates(employeeData.permanentCountryId, 'permanent');
    }
  }, [employeeData.currentCountryId, employeeData.permanentCountryId]);

  useEffect(() => {
    if (employeeData.currentStateId) {
      fetchCities(employeeData.currentStateId, 'current');
    }
    if (employeeData.permanentStateId) {
      fetchCities(employeeData.permanentStateId, 'permanent');
    }
  }, [employeeData.currentStateId, employeeData.permanentStateId]);

  const fetchMasterData = async () => {
    try {
      setLoading(true);
      const countriesRes = await countryService.getAll();
      setCountries(countriesRes || []);
    } catch (error) {
      console.error('Failed to fetch countries:', error);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStates = async (countryId, type) => {
    if (!countryId) return;
    try {
      const statesRes = await stateService.getByCountryId(countryId);
      if (type === 'current') {
        setStates(statesRes || []);
      } else {
        setPermanentStates(statesRes || []);
      }
    } catch (error) {
      console.error('Failed to fetch states:', error);
      if (type === 'current') {
        setStates([]);
      } else {
        setPermanentStates([]);
      }
    }
  };

  const fetchCities = async (stateId, type) => {
    if (!stateId) return;
    try {
      const citiesRes = await cityService.getByStateId(stateId);
      if (type === 'current') {
        setCities(citiesRes || []);
      } else {
        setPermanentCities(citiesRes || []);
      }
    } catch (error) {
      console.error('Failed to fetch cities:', error);
      if (type === 'current') {
        setCities([]);
      } else {
        setPermanentCities([]);
      }
    }
  };

  const handleCountryChange = (e, type) => {
    const { name, value } = e.target;
    handleFieldChange(e);
    
    // Reset dependent fields
    if (type === 'current') {
      onInputChange({ target: { name: 'currentStateId', value: '' } });
      onInputChange({ target: { name: 'currentCityId', value: '' } });
      setStates([]);
      setCities([]);
    } else {
      onInputChange({ target: { name: 'permanentStateId', value: '' } });
      onInputChange({ target: { name: 'permanentCityId', value: '' } });
      setPermanentStates([]);
      setPermanentCities([]);
    }
    
    if (value) {
      fetchStates(value, type);
    }
  };

  const handleStateChange = (e, type) => {
    const { name, value } = e.target;
    handleFieldChange(e);
    
    // Reset dependent city
    if (type === 'current') {
      onInputChange({ target: { name: 'currentCityId', value: '' } });
      setCities([]);
    } else {
      onInputChange({ target: { name: 'permanentCityId', value: '' } });
      setPermanentCities([]);
    }
    
    if (value) {
      fetchCities(value, type);
    }
  };

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Keep the local reusable address hook in sync (if the field matches)
    addressOnChange(e);

    const fieldValue = type === 'checkbox' ? checked : value;

    // Call parent onChange
    onInputChange(e);

    // Notify parent of data change
    onDataChange?.({
      ...employeeData,
      [name]: fieldValue
    });
  };


  const copyCurrentToPermanent = () => {
    const permanentData = {
      permanentAddress1: employeeData.currentAddress1,
      permanentAddress2: employeeData.currentAddress2,
      permanentCountryId: employeeData.currentCountryId,
      permanentStateId: employeeData.currentStateId,
      permanentCityId: employeeData.currentCityId,
      permanentZipCode: employeeData.currentZipCode
    };
    
    onDataChange?.({
      ...employeeData,
      ...permanentData
    });
    
    // Fetch permanent states and cities if needed
    if (employeeData.currentCountryId) {
      fetchStates(employeeData.currentCountryId, 'permanent');
    }
    if (employeeData.currentStateId) {
      fetchCities(employeeData.currentStateId, 'permanent');
    }
  };

  return (
    <div className="p-3">
      {loading && (
        <div className="d-flex justify-content-center mb-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      
      <div className="row">
        <div className="col-md-6">
          <h5 className="mb-3">Current Address</h5>
          
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Address Line 1</label>
                <textarea
                  className="form-control"
                  name="currentAddress1"
                  value={employeeData.currentAddress1 || ''}
                  onChange={handleFieldChange}
                  rows={3}
                  placeholder="Enter address line 1"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Address Line 2</label>
                <textarea
                  className="form-control"
                  name="currentAddress2"
                  value={employeeData.currentAddress2 || ''}
                  onChange={handleFieldChange}
                  rows={2}
                  placeholder="Enter address line 2"
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Country *</label>
                    <select
                      className="form-select"
                      name="currentCountryId"
                      value={employeeData.currentCountryId || ''}
                      onChange={(e) => handleCountryChange(e, 'current')}
                    >
                      <option value="">Select Country</option>
                      {countries?.map(country => (
                        <option key={country.id} value={country.id}>
                          {country.countryName}
                        </option>
                      ))}
                    </select>
                    {countries.length === 0 && (
                      <small className="text-muted">Loading countries...</small>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">State *</label>
                    <select
                      className="form-select"
                      name="currentStateId"
                      value={employeeData.currentStateId || ''}
                      onChange={(e) => handleStateChange(e, 'current')}
                      disabled={!employeeData.currentCountryId}
                    >
                      <option value="">Select State</option>
                      {states?.map(state => (
                        <option key={state.id} value={state.id}>
                          {state.stateName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">City *</label>
                    <select
                      className="form-select"
                      name="currentCityId"
                      value={employeeData.currentCityId || ''}
                      onChange={handleFieldChange}
                      disabled={!employeeData.currentStateId}
                    >
                      <option value="">Select City</option>
                      {cities?.map(city => (
                        <option key={city.id} value={city.id}>
                          {city.cityName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">ZIP Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="currentZipCode"
                      value={employeeData.currentZipCode || ''}
                      onChange={handleFieldChange}
                      placeholder="Enter ZIP code"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h5 className="mb-3">Permanent Address</h5>
          
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label mb-0">Permanent Address</label>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={copyCurrentToPermanent}
                    disabled={!employeeData.currentAddress1}
                  >
                    <i className="bi bi-arrow-down-circle me-1"></i>
                    Copy from Current
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Address Line 1</label>
                <textarea
                  className="form-control"
                  name="permanentAddress1"
                  value={employeeData.permanentAddress1 || ''}
                  onChange={handleFieldChange}
                  rows={3}
                  placeholder="Enter address line 1"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Address Line 2</label>
                <textarea
                  className="form-control"
                  name="permanentAddress2"
                  value={employeeData.permanentAddress2 || ''}
                  onChange={handleFieldChange}
                  rows={2}
                  placeholder="Enter address line 2"
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Country</label>
                    <select
                      className="form-select"
                      name="permanentCountryId"
                      value={employeeData.permanentCountryId || ''}
                      onChange={(e) => handleCountryChange(e, 'permanent')}
                    >
                      <option value="">Select Country</option>
                      {countries?.map(country => (
                        <option key={country.id} value={country.id}>
                          {country.countryName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">State</label>
                    <select
                      className="form-select"
                      name="permanentStateId"
                      value={employeeData.permanentStateId || ''}
                      onChange={(e) => handleStateChange(e, 'permanent')}
                      disabled={!employeeData.permanentCountryId}
                    >
                      <option value="">Select State</option>
                      {permanentStates?.map(state => (
                        <option key={state.id} value={state.id}>
                          {state.stateName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">City</label>
                    <select
                      className="form-select"
                      name="permanentCityId"
                      value={employeeData.permanentCityId || ''}
                      onChange={handleFieldChange}
                      disabled={!employeeData.permanentStateId}
                    >
                      <option value="">Select City</option>
                      {permanentCities?.map(city => (
                        <option key={city.id} value={city.id}>
                          {city.cityName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">ZIP Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="permanentZipCode"
                      value={employeeData.permanentZipCode || ''}
                      onChange={handleFieldChange}
                      placeholder="Enter ZIP code"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h6 className="mb-0">Address Guidelines</h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h6 className="text-primary">Current Address</h6>
              <ul className="list-unstyled small">
                <li>• Where the employee currently resides</li>
                <li>• Used for official communications</li>
                <li>• Must be a valid, deliverable address</li>
                <li>• Country, State, and City are required</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h6 className="text-primary">Permanent Address</h6>
              <ul className="list-unstyled small">
                <li>• Employee's permanent home address</li>
                <li>• Used for official records</li>
                <li>• Can be same as current address</li>
                <li>• Use "Copy from Current" for convenience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpAddressDetails;
