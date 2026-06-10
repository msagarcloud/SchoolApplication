import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cityService } from '../../services/cityService';
import { stateService } from '../../services/stateService';
import { countryService } from '../../services/countryService';

const CityDetail = () => {
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCity();
  }, [id]);

  const fetchCity = async () => {
    try {
      setLoading(true);
      const data = await cityService.getById(id);
      setCity(data);
      
      // Fetch state details
      if (data.cityStateId) {
        const stateData = await stateService.getById(data.cityStateId);
        setState(stateData);
        
        // Fetch country details
        if (stateData.countryId) {
          const countryData = await countryService.getById(stateData.countryId);
          setCountry(countryData);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch city details');
    } finally {
      setLoading(false);
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
        <Link to="/cities" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Cities
        </Link>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          City not found
        </div>
        <Link to="/cities" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Cities
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>City Details</h2>
        <div className="btn-group" role="group">
          <Link to="/cities" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Cities
          </Link>
          <Link 
            to={`/cities/${city.id}/edit`} 
            className="btn btn-warning"
          >
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">City Information</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td className="fw-bold" style={{ width: '150px' }}>ID:</td>
                    <td>{city.id}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">City Name:</td>
                    <td>{city.cityName || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">State:</td>
                    <td>
                      {state ? (
                        <Link to={`/states/${state.id}`} className="text-decoration-none">
                          {state.stateName}
                        </Link>
                      ) : (
                        'N/A'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Country:</td>
                    <td>
                      {country ? (
                        <Link to={`/countries/${country.id}`} className="text-decoration-none">
                          {country.countryName}
                        </Link>
                      ) : (
                        'N/A'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Status:</td>
                    <td>
                      <span className={`badge ${city.isActive ? 'bg-success' : 'bg-danger'}`}>
                        {city.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td className="fw-bold" style={{ width: '150px' }}>Created Date:</td>
                    <td>{new Date(city.createdDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Modified Date:</td>
                    <td>
                      {city.modifiedDate 
                        ? new Date(city.modifiedDate).toLocaleDateString() 
                        : 'N/A'}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Is Deleted:</td>
                    <td>
                      <span className={`badge ${city.isDeleted ? 'bg-danger' : 'bg-success'}`}>
                        {city.isDeleted ? 'Yes' : 'No'}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDetail;
