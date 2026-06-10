import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import supplierService from '../../services/supplierService';
import { countryService } from '../../services/countryService';
import { stateService } from '../../services/stateService';
import { cityService } from '../../services/cityService';
import { companyService } from '../../services/companyService';
import { schoolService } from '../../services/schoolService';
import { authService } from '../../services/authService';

const SupplierDetail = () => {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const [cityName, setCityName] = useState('');
  const [stateName, setStateName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [schoolName, setSchoolName] = useState('');

  const zeroGuid = '00000000-0000-0000-0000-000000000000';

  const normalizeId = (data, ...keys) => {
    for (const key of keys) {
      if (data && data[key]) return data[key];
    }
    return null;
  };

  const isValidGuid = (value) => value && value !== zeroGuid;

  const getEntityName = (entity, fallbackKeys = []) => {
    if (!entity) return null;
    return (
      entity.companyName || entity.schoolName || entity.name || entity.CompanyName || entity.SchoolName || entity.Name ||
      fallbackKeys.map(key => entity[key]).find(Boolean) || null
    );
  };

  const fetchSupplier = useCallback(async () => {
    try {
      setLoading(true);
      const data = await supplierService.getSupplierById(id);
      setSupplier(data);

      // Fetch related entity names
      if (data) {
        try {
          const cityId = normalizeId(data, 'cityId', 'CityId', 'CityID');
          const stateId = normalizeId(data, 'stateId', 'StateId', 'StateID');
          const countryId = normalizeId(data, 'countryId', 'CountryId', 'CountryID');
          const companyId = normalizeId(data, 'companyId', 'CompanyId', 'CompanyID');
          const schoolId = normalizeId(data, 'schoolId', 'SchoolId', 'SchoolID');

          const requests = [
            isValidGuid(cityId) ? cityService.getById(cityId) : Promise.resolve(null),
            isValidGuid(stateId) ? stateService.getById(stateId) : Promise.resolve(null),
            isValidGuid(countryId) ? countryService.getById(countryId) : Promise.resolve(null),
            isValidGuid(companyId) ? companyService.getById(companyId) : Promise.resolve(null),
            isValidGuid(schoolId) ? schoolService.getById(schoolId) : Promise.resolve(null)
          ];

          const [city, state, country, company, school] = await Promise.allSettled(requests);

          if (city.status === 'fulfilled' && city.value) {
            setCityName(getEntityName(city.value, ['cityName', 'CityName', 'name']));
          }
          if (state.status === 'fulfilled' && state.value) {
            setStateName(getEntityName(state.value, ['stateName', 'StateName', 'name']));
          }
          if (country.status === 'fulfilled' && country.value) {
            setCountryName(getEntityName(country.value, ['countryName', 'CountryName', 'name']));
          }
          if (company.status === 'fulfilled' && company.value) {
            setCompanyName(getEntityName(company.value, ['companyName', 'CompanyName', 'name']));
          }
          if (school.status === 'fulfilled' && school.value) {
            setSchoolName(getEntityName(school.value, ['schoolName', 'SchoolName', 'name']));
          }

          if (!isValidGuid(companyId)) {
            if (data.company) {
              setCompanyName(getEntityName(data.company, ['companyName', 'CompanyName', 'name']));
            } else {
              setCompanyName(authService.getCompanyName() || null);
            }
          }

          if (!isValidGuid(schoolId)) {
            if (data.school) {
              setSchoolName(getEntityName(data.school, ['schoolName', 'SchoolName', 'name']));
            } else {
              setSchoolName(authService.getSchoolName() || null);
            }
          }
        } catch (err) {
          console.error('Failed to fetch related entity names:', err);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch supplier');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSupplier();
  }, [fetchSupplier]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete supplier "${supplier.name}"?`)) {
      try {
        await supplierService.deleteSupplier(id);
        navigate('/suppliers');
      } catch (err) {
        setError(err.message || 'Failed to delete supplier');
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { bg: 'success', icon: 'check-circle' },
      'Inactive': { bg: 'danger', icon: 'x-circle' },
      'Updated': { bg: 'warning', icon: 'pencil' },
      'Deleted': { bg: 'secondary', icon: 'trash' }
    };
    
    const config = statusConfig[status] || { bg: 'secondary', icon: 'question-circle' };
    
    return (
      <span className={`badge bg-${config.bg}`}>
        <i className={`bi bi-${config.icon} me-1`}></i>
        {status}
      </span>
    );
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
        <Link to="/suppliers" className="btn btn-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Suppliers
        </Link>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Supplier not found.
        </div>
        <Link to="/suppliers" className="btn btn-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Suppliers
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Supplier Details</h2>
        <div className="btn-group" role="group">
          <Link to="/suppliers" className="btn btn-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Suppliers
          </Link>
          <Link to={`/suppliers/${id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            <i className="bi bi-trash me-2"></i>
            Delete
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        {/* Basic Information Card */}
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-shop me-2"></i>
                Basic Information
              </h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Supplier Name:</div>
                <div className="col-sm-8">{supplier.name || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Description:</div>
                <div className="col-sm-8">{supplier.description || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Status:</div>
                <div className="col-sm-8">{getStatusBadge(supplier.status)}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Company:</div>
                <div className="col-sm-8">
                  <span className="badge bg-info">
                    {companyName || authService.getCompanyName() || supplier.companyName || supplier.company?.companyName || supplier.company?.name || supplier.companyId || supplier.CompanyId || supplier.CompanyID || 'N/A'}
                  </span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">School:</div>
                <div className="col-sm-8">
                  <span className="badge bg-info">
                    {schoolName || authService.getSchoolName() || supplier.schoolName || supplier.school?.schoolName || supplier.school?.name || supplier.schoolId || supplier.SchoolId || supplier.SchoolID || 'N/A'}
                  </span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Is Active:</div>
                <div className="col-sm-8">
                  <span className={`badge ${supplier.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {supplier.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-telephone me-2"></i>
                Contact Information
              </h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Phone Number:</div>
                <div className="col-sm-8">{supplier.phoneNumber || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Mobile Number:</div>
                <div className="col-sm-8">{supplier.mobileNumber || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Email:</div>
                <div className="col-sm-8">
                  {supplier.emailId ? (
                    <a href={`mailto:${supplier.emailId}`} className="text-decoration-none">
                      {supplier.emailId}
                    </a>
                  ) : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Information Card */}
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-geo-alt me-2"></i>
                Address Information
              </h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Address Line 1:</div>
                <div className="col-sm-8">{supplier.address1 || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Address Line 2:</div>
                <div className="col-sm-8">{supplier.address2 || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">City:</div>
                <div className="col-sm-8">
                  <span className="badge bg-secondary">{cityName || supplier.cityId}</span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">State:</div>
                <div className="col-sm-8">
                  <span className="badge bg-secondary">{stateName || supplier.stateId}</span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Country:</div>
                <div className="col-sm-8">
                  <span className="badge bg-secondary">{countryName || supplier.countryId}</span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Zip Code:</div>
                <div className="col-sm-8">{supplier.zipCode || 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* System Information Card */}
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                System Information
              </h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Supplier ID:</div>
                <div className="col-sm-8">
                  <code>{supplier.id}</code>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created Date:</div>
                <div className="col-sm-8">
                  {new Date(supplier.createdDate).toLocaleString()}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Modified Date:</div>
                <div className="col-sm-8">
                  {supplier.modifiedDate 
                    ? new Date(supplier.modifiedDate).toLocaleString()
                    : 'Never modified'
                  }
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Status Message:</div>
                <div className="col-sm-8">{supplier.statusMessage || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Is Deleted:</div>
                <div className="col-sm-8">
                  <span className={`badge ${supplier.isDeleted ? 'bg-danger' : 'bg-success'}`}>
                    {supplier.isDeleted ? 'Deleted' : 'Not Deleted'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            <i className="bi bi-lightning me-2"></i>
            Quick Actions
          </h5>
        </div>
        <div className="card-body">
          <div className="d-flex gap-2 flex-wrap">
            <Link to={`/suppliers/${id}/edit`} className="btn btn-warning">
              <i className="bi bi-pencil me-2"></i>
              Edit Supplier
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              <i className="bi bi-trash me-2"></i>
              Delete Supplier
            </button>
            <button className="btn btn-info" onClick={() => window.print()}>
              <i className="bi bi-printer me-2"></i>
              Print Details
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/suppliers')}>
              <i className="bi bi-arrow-left me-2"></i>
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetail;
