import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { schoolService } from '../../services/schoolService';
import { locationService } from '../../services/locationService';
import { companyService } from '../../services/companyService';

const SchoolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(true);
  const [error, setError] = useState('');
  const [locationData, setLocationData] = useState({
    countries: [],
    states: [],
    cities: []
  });
  const [companies, setCompanies] = useState([]);

  const fetchSchool = useCallback(async () => {
    try {
      setLoading(true);
      const data = await schoolService.getById(id);
      console.log('School data with IDs:', {
        cityId: data.cityId,
        stateId: data.stateId,
        countryId: data.countryId,
        bankCityId: data.bankCityId,
        bankStateId: data.bankStateId,
        bankCountryId: data.bankCountryId,
        companyId: data.companyId,
        judistrictionCityId: data.judistrictionCityId,
        judistrictionStateId: data.judistrictionStateId,
        judistrictionCountryId: data.judistrictionCountryId
      });
      setSchool(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch school details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSchool();
    fetchLocationData();
    fetchCompanies();
  }, [id, fetchSchool]);

  const fetchLocationData = async () => {
    try {
      setLocationLoading(true);
      console.log('Fetching location data...');
      const [countriesData, statesData, citiesData] = await Promise.all([
        locationService.getCountries(),
        locationService.getStates(),
        locationService.getCities()
      ]);
      
      console.log('Location data fetched:', {
        countries: countriesData,
        states: statesData,
        cities: citiesData
      });
      
      setLocationData({
        countries: countriesData || [],
        states: statesData || [],
        cities: citiesData || []
      });
    } catch (err) {
      console.error('Failed to fetch location data:', err);
      // Set empty arrays to prevent undefined errors
      setLocationData({
        countries: [],
        states: [],
        cities: []
      });
    } finally {
      setLocationLoading(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      const data = await companyService.getAll();
      console.log('Companies data:', data);
      setCompanies(data);
    } catch (err) {
      console.error('Failed to fetch companies:', err);
    }
  };

  const getNameById = (id, list, entityType = 'default') => {
    if (!id || !list || list.length === 0) {
      console.log(`getNameById: Missing data - ID: ${id}, List length: ${list?.length || 0}, Entity: ${entityType}`);
      return 'N/A';
    }
    
    console.log(`Looking for ${entityType} with ID: ${id} in list of ${list.length} items`);
    console.log(`Available IDs for ${entityType}:`, list.slice(0, 3).map(item => ({
      id: item.id || item.Id,
      name: item.name || item.Name || item.CountryName || item.StateName || item.CityName || item.CompanyName
    })));
    
    // Handle GUID comparison - convert both to string for comparison
    const item = list.find(item => 
      item.id?.toString() === id.toString() || 
      item.Id?.toString() === id.toString()
    );
    
    if (!item) {
      console.log(`Item not found for ID: ${id}, Entity: ${entityType}, Available IDs:`, 
        list.slice(0, 5).map(i => ({ id: i.id || i.Id, name: i.name || i.Name })));
      return 'N/A';
    }
    
    // Use appropriate property name based on entity type
    let name;
    switch (entityType) {
      case 'country':
        name = item.CountryName || item.countryName || item.name || item.Name;
        break;
      case 'state':
        name = item.StateName || item.stateName || item.name || item.Name;
        break;
      case 'city':
        name = item.CityName || item.cityName || item.name || item.Name;
        break;
      case 'company':
        name = item.CompanyName || item.companyName || item.name || item.Name;
        break;
      default:
        name = item.name || item.Name || 'N/A';
    }
    
    console.log(`Found ${entityType} name: ${name} for ID: ${id}`);
    return name || 'N/A';
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${school.name}"? This action cannot be undone.`)) {
      try {
        await schoolService.delete(id);
        navigate('/schools');
      } catch (err) {
        setError(err.message || 'Failed to delete school');
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/schools" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Schools
        </Link>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          School not found
        </div>
        <Link to="/schools" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Schools
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>School Details</h2>
        <div className="btn-group" role="group">
          <Link to="/schools" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Schools
          </Link>
          <Link to={`/schools/${school.id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            <i className="bi bi-trash me-2"></i>
            Delete
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          {/* Basic Information */}
          <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Basic Information</h5>
              <span className={`badge ${school.isActive ? 'bg-success' : 'bg-danger'}`}>
                {school.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">School Name:</div>
                <div className="col-sm-9">{school.name || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Email:</div>
                <div className="col-sm-9">
                  {school.email ? (
                    <a href={`mailto:${school.email}`} className="text-decoration-none">
                      {school.email}
                    </a>
                  ) : 'N/A'}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Phone:</div>
                <div className="col-sm-9">
                  {school.phone ? (
                    <a href={`tel:${school.phone}`} className="text-decoration-none">
                      {school.phone}
                    </a>
                  ) : 'N/A'}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Mobile:</div>
                <div className="col-sm-9">
                  {school.mobile ? (
                    <a href={`tel:${school.mobile}`} className="text-decoration-none">
                      {school.mobile}
                    </a>
                  ) : 'N/A'}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Establishment Year:</div>
                <div className="col-sm-9">{school.establishmentYear || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Description:</div>
                <div className="col-sm-9">{school.description || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status:</div>
                <div className="col-sm-9">
                  <span className="badge bg-info">{school.status || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="card mb-3">
            <div className="card-header">
              <h5 className="mb-0">Address Information</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Address Line 1:</div>
                <div className="col-sm-9">{school.address1 || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Address Line 2:</div>
                <div className="col-sm-9">{school.address2 || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Zip Code:</div>
                <div className="col-sm-9">{school.zipCode || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">City:</div>
                <div className="col-sm-9">
                  {locationLoading ? (
                    <span className="text-muted">Loading...</span>
                  ) : (
                    getNameById(school.cityId, locationData.cities, 'city')
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">State:</div>
                <div className="col-sm-9">
                  {locationLoading ? (
                    <span className="text-muted">Loading...</span>
                  ) : (
                    getNameById(school.stateId, locationData.states, 'state')
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Country:</div>
                <div className="col-sm-9">
                  {locationLoading ? (
                    <span className="text-muted">Loading...</span>
                  ) : (
                    getNameById(school.countryId, locationData.countries, 'country')
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          {/* System Information */}
          <div className="card mb-3">
            <div className="card-header">
              <h5 className="mb-0">System Information</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">School Name:</div>
                <div className="col-sm-8">
                  {school.name || 'N/A'}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Company:</div>
                <div className="col-sm-8">
                  {getNameById(school.companyId, companies, 'company')}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created Date:</div>
                <div className="col-sm-8">
                  {new Date(school.createdDate).toLocaleDateString()} at{' '}
                  {new Date(school.createdDate).toLocaleTimeString()}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Modified Date:</div>
                <div className="col-sm-8">
                  {school.modifiedDate ? (
                    <>
                      {new Date(school.modifiedDate).toLocaleDateString()} at{' '}
                      {new Date(school.modifiedDate).toLocaleTimeString()}
                    </>
                  ) : 'Not modified'}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Jurisdiction City:</div>
                <div className="col-sm-8">
                  {locationLoading ? (
                    <span className="text-muted">Loading...</span>
                  ) : (
                    getNameById(school.judistrictionCityId, locationData.cities, 'city')
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Jurisdiction State:</div>
                <div className="col-sm-8">
                  {locationLoading ? (
                    <span className="text-muted">Loading...</span>
                  ) : (
                    getNameById(school.judistrictionStateId, locationData.states, 'state')
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-sm-4 fw-bold">Jurisdiction Country:</div>
                <div className="col-sm-8">
                  {locationLoading ? (
                    <span className="text-muted">Loading...</span>
                  ) : (
                    getNameById(school.judistrictionCountryId, locationData.countries, 'country')
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bank Information */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Bank Information</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Bank Name:</div>
                <div className="col-sm-8">{school.bankName || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Account Number:</div>
                <div className="col-sm-8">{school.accountNumber || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Bank Address Line 1:</div>
                <div className="col-sm-8">{school.bankAddress1 || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Bank Address Line 2:</div>
                <div className="col-sm-8">{school.bankAddress2 || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Bank Zip Code:</div>
                <div className="col-sm-8">{school.bankZipCode || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Bank City:</div>
                <div className="col-sm-8">
                  {locationLoading ? (
                    <span className="text-muted">Loading...</span>
                  ) : (
                    getNameById(school.bankCityId, locationData.cities, 'city')
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Bank State:</div>
                <div className="col-sm-8">
                  {locationLoading ? (
                    <span className="text-muted">Loading...</span>
                  ) : (
                    getNameById(school.bankStateId, locationData.states, 'state')
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-sm-4 fw-bold">Bank Country:</div>
                <div className="col-sm-8">
                  {locationLoading ? (
                    <span className="text-muted">Loading...</span>
                  ) : (
                    getNameById(school.bankCountryId, locationData.countries, 'country')
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetail;
