import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { countryService } from '../../services/countryService';

const CountryDetail = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCountry = useCallback(async () => {
    try {
      setLoading(true);
      const data = await countryService.getById(id);
      setCountry(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch country details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCountry();
  }, [fetchCountry]);

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
        <Link to="/countries" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Countries
        </Link>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Country not found
        </div>
        <Link to="/countries" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Countries
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Country Details</h2>
        <div className="btn-group" role="group">
          <Link to="/countries" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Countries
          </Link>
          <Link 
            to={`/countries/${country.id}/edit`} 
            className="btn btn-warning"
          >
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Country Information</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td className="fw-bold" style={{ width: '150px' }}>ID:</td>
                    <td>{country.id}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Country Name:</td>
                    <td>{country.countryName || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Status:</td>
                    <td>
                      <span className={`badge ${country.isActive ? 'bg-success' : 'bg-danger'}`}>
                        {country.isActive ? 'Active' : 'Inactive'}
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
                    <td>{new Date(country.createdDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Modified Date:</td>
                    <td>
                      {country.modifiedDate 
                        ? new Date(country.modifiedDate).toLocaleDateString() 
                        : 'N/A'}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Is Deleted:</td>
                    <td>
                      <span className={`badge ${country.isDeleted ? 'bg-danger' : 'bg-success'}`}>
                        {country.isDeleted ? 'Yes' : 'No'}
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

export default CountryDetail;
