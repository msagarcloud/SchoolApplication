import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { companyService } from '../../services/companyService';
import { cityService } from '../../services/cityService';
import { stateService } from '../../services/stateService';
import { countryService } from '../../services/countryService';

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const data = await companyService.getById(id);
        setCompany(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch company details');
      } finally {
        setLoading(false);
      }
    };

    const fetchLocationData = async () => {
      try {
        const [citiesData, statesData, countriesData] = await Promise.all([
          cityService.getAll(),
          stateService.getAll(),
          countryService.getAll()
        ]);

        setCities(citiesData || []);
        setStates(statesData || []);
        setCountries(countriesData || []);
      } catch (err) {
        console.error('Failed to fetch location data', err);
      }
    };

    fetchCompany();
    fetchLocationData();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${company.companyName}"? This action cannot be undone.`)) {
      try {
        await companyService.delete(id);
        navigate('/companies');
      } catch (err) {
        setError(err.message || 'Failed to delete company');
      }
    }
  };

  const cityName = company?.cityName || cities.find(city => city.id === company?.cityId)?.cityName || 'N/A';
  const stateName = company?.stateName || states.find(state => state.id === company?.stateId)?.stateName || 'N/A';
  const countryName = company?.countryName || countries.find(country => country.id === company?.countryId)?.countryName || 'N/A';

  const formatDateTime = (value) => {
    if (!value) return 'N/A';

    const parsedDate = new Date(value);
    if (Number.isNaN(parsedDate.getTime())) return value;

    return parsedDate.toLocaleString();
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
        <Link to="/companies" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Companies
        </Link>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Company not found
        </div>
        <Link to="/companies" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Companies
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Company Details</h2>
        <div className="btn-group" role="group">
          <Link to="/companies" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Companies
          </Link>
          <Link to={`/companies/${company.id}/edit`} className="btn btn-warning">
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
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Company Information</h5>
              <span className={`badge ${company.isActive ? 'bg-success' : 'bg-danger'}`}>
                {company.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Company Name:</div>
                <div className="col-sm-9">{company.companyName || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Email:</div>
                <div className="col-sm-9">
                  {company.email ? (
                    <a href={`mailto:${company.email}`} className="text-decoration-none">
                      {company.email}
                    </a>
                  ) : 'N/A'}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Description:</div>
                <div className="col-sm-9">{company.description || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Address:</div>
                <div className="col-sm-9">{company.address || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Zip Code:</div>
                <div className="col-sm-9">{company.zipCode || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Establishment Year:</div>
                <div className="col-sm-9">{company.establishmentYear || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status:</div>
                <div className="col-sm-9">
                  <span className="badge bg-info">{company.status || 'N/A'}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">System Information</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created Date:</div>
                <div className="col-sm-8">{formatDateTime(company.createdDate)}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Modified Date:</div>
                <div className="col-sm-8">{company.modifiedDate ? formatDateTime(company.modifiedDate) : 'Not modified'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">City:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{cityName}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">State:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{stateName}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Country:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{countryName}</small>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-4 fw-bold">Jurisdiction Area:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{company.JudistrictionArea}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
