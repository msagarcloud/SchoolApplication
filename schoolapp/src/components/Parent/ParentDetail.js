import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { parentService } from '../../services/parentService';
import { cityService } from '../../services/cityService';
import { stateService } from '../../services/stateService';
import { countryService } from '../../services/countryService';

const ParentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parent, setParent] = useState(null);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchParentData();
  }, [id]);

  const fetchParentData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch parent and dropdown data in parallel
      const [
        parentData,
        citiesData,
        statesData,
        countriesData
      ] = await Promise.all([
        parentService.getById(id),
        cityService.getAll(),
        stateService.getAll(),
        countryService.getAll()
      ]);
      
      setParent(parentData);
      setCities(citiesData);
      setStates(statesData);
      setCountries(countriesData);
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

  // Helper function to get display name from dropdown data
  const getDisplayName = (id, dataArray, fallback = 'N/A') => {
    if (!id || !dataArray || dataArray.length === 0) {
      return id || fallback;
    }
    const item = dataArray.find(item => item.id === id);
    return item ? item.name : id || fallback;
  };

  // Helper function to get relation type display
  const getRelationTypeDisplay = (relationTypeId) => {
    if (relationTypeId === 'father-relation-type-id') return 'Father';
    if (relationTypeId === 'mother-relation-type-id') return 'Mother';
    return 'Parent';
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
        <button className="btn btn-secondary" onClick={() => navigate('/parents')}>
          Back to Parents
        </button>
      </div>
    );
  }

  if (!parent) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Parent not found
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/parents')}>
          Back to Parents
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Parent Details</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/parents">Parents</Link>
              </li>
              <li className="breadcrumb-item active">
                {`${parent.parentFirstName || ''} ${parent.parentLastName || ''}`.trim() || 'N/A'}
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/parents" className="btn btn-outline-secondary me-2">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <Link to={`/parents/${id}/edit`} className="btn btn-primary">
            <i className="bi bi-pencil me-2"></i>
            Edit Parent
          </Link>
        </div>
      </div>

      {/* Parent Summary Card */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <h4 className="card-title">
                <span className="badge bg-info me-2">{getRelationTypeDisplay(parent.relationTypeId)}</span>
                {`${parent.parentFirstName || ''} ${parent.parentLastName || ''}`.trim() || 'N/A'}
              </h4>
              <p className="text-muted mb-2">
                <i className="bi bi-envelope me-2"></i>
                {parent.email || 'N/A'}
              </p>
              <p className="text-muted mb-2">
                <i className="bi bi-phone me-2"></i>
                {parent.mobile || 'N/A'}
              </p>
              <p className="text-muted mb-0">
                <i className="bi bi-briefcase me-2"></i>
                {parent.occupation || 'N/A'}
              </p>
            </div>
            <div className="col-md-4 text-end">
              <span className={`badge bg-${parent.isActive ? 'success' : 'danger'} fs-6`}>
                {parent.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Parent Details Tabs */}
      <div className="card">
        <ul className="nav nav-tabs" id="parentTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="personal-tab" data-bs-toggle="tab" data-bs-target="#personal" type="button" role="tab" aria-controls="personal" aria-selected="true">
              Personal Info
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">
              Contact Info
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="office-tab" data-bs-toggle="tab" data-bs-target="#office" type="button" role="tab" aria-controls="office" aria-selected="false">
              Office Info
            </button>
          </li>
        </ul>
        <div className="card-body">
          <div className="tab-content" id="parentTabContent">
            {/* Personal Information Tab */}
            <div className="tab-pane fade show active" id="personal" role="tabpanel" aria-labelledby="personal-tab">
              <div className="row">
                <div className="col-md-6">
                  <h6 className="mb-3">Basic Information</h6>
                  <table className="table table-borderless table-sm">
                    <tbody>
                      <tr>
                        <td width="30%"><strong>First Name:</strong></td>
                        <td>{parent.parentFirstName || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td><strong>Last Name:</strong></td>
                        <td>{parent.parentLastName || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td><strong>Date of Birth:</strong></td>
                        <td>{parent.parentDob ? new Date(parent.parentDob).toLocaleDateString() : 'N/A'}</td>
                      </tr>
                      <tr>
                        <td><strong>Relation Type:</strong></td>
                        <td>{getRelationTypeDisplay(parent.relationTypeId)}</td>
                      </tr>
                      <tr>
                        <td><strong>Email:</strong></td>
                        <td>{parent.email || 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6">
                  <h6 className="mb-3">Additional Information</h6>
                  <table className="table table-borderless table-sm">
                    <tbody>
                      <tr>
                        <td width="30%"><strong>Phone:</strong></td>
                        <td>{parent.phone || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td><strong>Mobile:</strong></td>
                        <td>{parent.mobile || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td><strong>Occupation:</strong></td>
                        <td>{parent.occupation || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td><strong>Annual Income:</strong></td>
                        <td>{parent.annualIncome || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td><strong>Status:</strong></td>
                        <td>
                          <span className={`badge bg-${parent.isActive ? 'success' : 'danger'}`}>
                            {parent.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Contact Information Tab */}
            <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
              <h6 className="mb-3">Home Address</h6>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label text-muted">Address Line 1</label>
                    <div className="form-control-plaintext">{parent.address1 || 'N/A'}</div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label text-muted">Address Line 2</label>
                    <div className="form-control-plaintext">{parent.address2 || 'N/A'}</div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">City</label>
                    <div className="form-control-plaintext">{getDisplayName(parent.cityId, cities)}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">State</label>
                    <div className="form-control-plaintext">{getDisplayName(parent.stateId, states)}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Country</label>
                    <div className="form-control-plaintext">{getDisplayName(parent.countryId, countries)}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Zip Code</label>
                    <div className="form-control-plaintext">{parent.zipCode || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Information Tab */}
            <div className="tab-pane fade" id="office" role="tabpanel" aria-labelledby="office-tab">
              <h6 className="mb-3">Office Address</h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Office Address Line 1</label>
                    <div className="form-control-plaintext">{parent.officeAddress1 || 'N/A'}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Office Address Line 2</label>
                    <div className="form-control-plaintext">{parent.officeAddress2 || 'N/A'}</div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Office City</label>
                    <div className="form-control-plaintext">{getDisplayName(parent.officeCityId, cities)}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Office State</label>
                    <div className="form-control-plaintext">{getDisplayName(parent.officeStateId, states)}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Office Country</label>
                    <div className="form-control-plaintext">{getDisplayName(parent.officeCountryId, countries)}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Office Phone</label>
                    <div className="form-control-plaintext">{parent.officePhone || 'N/A'}</div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Office Zip Code</label>
                    <div className="form-control-plaintext">{parent.officeZipCode || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDetail;
