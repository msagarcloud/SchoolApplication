import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import vendorService from '../../services/vendorService';
import { companyService } from '../../services/companyService';
import { schoolService } from '../../services/schoolService';
import { authService } from '../../services/authService';

const VendorDetail = () => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const zeroGuid = '00000000-0000-0000-0000-000000000000';

  const normalizeId = (item, ...keys) => {
    if (!item) return null;
    for (const key of keys) {
      if (item[key]) return item[key];
    }
    return null;
  };

  const getEntityName = (entity) => {
    if (!entity) return null;
    return (
      entity.companyName || entity.schoolName || entity.name || entity.CompanyName || entity.SchoolName || entity.Name || null
    );
  };

  const isValidGuid = (value) => value && value !== zeroGuid;

  const fetchVendor = useCallback(async () => {
    try {
      setLoading(true);
      const data = await vendorService.getVendorById(id);
      setVendor(data);
      try {
        const companyId = normalizeId(data, 'companyId', 'CompanyId', 'CompanyID');
        const schoolId = normalizeId(data, 'schoolId', 'SchoolId', 'SchoolID');

        const [companyRes, schoolRes] = await Promise.allSettled([
          isValidGuid(companyId) ? companyService.getById(companyId) : Promise.resolve(null),
          isValidGuid(schoolId) ? schoolService.getById(schoolId) : Promise.resolve(null)
        ]);

        if (companyRes.status === 'fulfilled' && companyRes.value) {
          setCompanyName(getEntityName(companyRes.value) || 'N/A');
        }

        if (schoolRes.status === 'fulfilled' && schoolRes.value) {
          setSchoolName(getEntityName(schoolRes.value) || 'N/A');
        }

        if (!isValidGuid(companyId)) {
          setCompanyName(getEntityName(data.company) || authService.getCompanyName() || 'N/A');
        } else if (companyRes.status !== 'fulfilled' || !companyRes.value) {
          setCompanyName(getEntityName(data.company) || authService.getCompanyName() || 'N/A');
        }

        if (!isValidGuid(schoolId)) {
          setSchoolName(getEntityName(data.school) || authService.getSchoolName() || 'N/A');
        } else if (schoolRes.status !== 'fulfilled' || !schoolRes.value) {
          setSchoolName(getEntityName(data.school) || authService.getSchoolName() || 'N/A');
        }
      } catch (err) {
        console.error('Failed to resolve company/school for vendor detail:', err);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch vendor');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchVendor();
  }, [fetchVendor]);
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete vendor "${vendor.vendorName}"?`)) {
      try {
        await vendorService.deleteVendor(id);
        navigate('/vendors');
      } catch (err) {
        setError(err.message || 'Failed to delete vendor');
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
        <Link to="/vendors" className="btn btn-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Vendors
        </Link>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Vendor not found.
        </div>
        <Link to="/vendors" className="btn btn-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Vendors
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Vendor Details</h2>
        <div className="btn-group" role="group">
          <Link to="/vendors" className="btn btn-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Vendors
          </Link>
          <Link to={`/vendors/${id}/edit`} className="btn btn-warning">
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
                <div className="col-sm-4 fw-bold">Vendor Name:</div>
                <div className="col-sm-8">{vendor.vendorName || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Description:</div>
                <div className="col-sm-8">{vendor.description || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Status:</div>
                <div className="col-sm-8">{getStatusBadge(vendor.status)}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Company:</div>
                <div className="col-sm-8">
                  <span className="badge bg-info">
                    {companyName || authService.getCompanyName() || vendor.companyName || vendor.company?.companyName || vendor.company?.name || vendor.companyId || vendor.CompanyId || vendor.CompanyID || 'N/A'}
                  </span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">School:</div>
                <div className="col-sm-8">
                  <span className="badge bg-info">
                    {schoolName || authService.getSchoolName() || vendor.schoolName || vendor.school?.schoolName || vendor.school?.name || vendor.schoolId || vendor.SchoolId || vendor.SchoolID || 'N/A'}
                  </span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Is Active:</div>
                <div className="col-sm-8">
                  <span className={`badge ${vendor.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {vendor.isActive ? 'Active' : 'Inactive'}
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
                <div className="col-sm-4 fw-bold">Contact Number:</div>
                <div className="col-sm-8">{vendor.contactNumber || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Mobile Number:</div>
                <div className="col-sm-8">{vendor.mobileNumber || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Email:</div>
                <div className="col-sm-8">
                  {vendor.emailId ? (
                    <a href={`mailto:${vendor.emailId}`} className="text-decoration-none">
                      {vendor.emailId}
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
                <div className="col-sm-8">{vendor.address1 || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Address Line 2:</div>
                <div className="col-sm-8">{vendor.address2 || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">City ID:</div>
                <div className="col-sm-8">
                  <span className="badge bg-secondary">{vendor.cityId}</span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">State ID:</div>
                <div className="col-sm-8">
                  <span className="badge bg-secondary">{vendor.stateId}</span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Country ID:</div>
                <div className="col-sm-8">
                  <span className="badge bg-secondary">{vendor.countryId}</span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Zip Code:</div>
                <div className="col-sm-8">{vendor.zipCode || 'N/A'}</div>
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
                <div className="col-sm-4 fw-bold">Vendor ID:</div>
                <div className="col-sm-8">
                  <code>{vendor.id}</code>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created Date:</div>
                <div className="col-sm-8">
                  {new Date(vendor.createdDate).toLocaleString()}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Modified Date:</div>
                <div className="col-sm-8">
                  {vendor.modifiedDate 
                    ? new Date(vendor.modifiedDate).toLocaleString()
                    : 'Never modified'
                  }
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Status Message:</div>
                <div className="col-sm-8">{vendor.statusMessage || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Is Deleted:</div>
                <div className="col-sm-8">
                  <span className={`badge ${vendor.isDeleted ? 'bg-danger' : 'bg-success'}`}>
                    {vendor.isDeleted ? 'Deleted' : 'Not Deleted'}
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
            <Link to={`/vendors/${id}/edit`} className="btn btn-warning">
              <i className="bi bi-pencil me-2"></i>
              Edit Vendor
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              <i className="bi bi-trash me-2"></i>
              Delete Vendor
            </button>
            <button className="btn btn-info" onClick={() => window.print()}>
              <i className="bi bi-printer me-2"></i>
              Print Details
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/vendors')}>
              <i className="bi bi-arrow-left me-2"></i>
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetail;
