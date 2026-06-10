import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { privilegeService } from '../../services/privilegeService';
import { authService } from '../../services/authService';

const PrivilegeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    privilegeName: '',
    isActive: true,
    isDeleted: false,
    status: '',
    statusMessage: '',
    privilegeParentId: ''
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');

  const fetchPrivilege = useCallback(async () => {
    try {
      setFetchLoading(true);
      const privilege = await privilegeService.getById(id);
      setFormData({
        privilegeName: privilege.privilegeName || '',
        isActive: privilege.isActive !== undefined ? privilege.isActive : true,
        isDeleted: privilege.isDeleted !== undefined ? privilege.isDeleted : false,
        status: privilege.status || '',
        statusMessage: privilege.statusMessage || '',
        privilegeParentId: privilege.privilegeParentId || ''
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch privilege details');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEditing) {
      fetchPrivilege();
    }
  }, [id, isEditing, fetchPrivilege]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
    
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.privilegeName.trim()) {
        setError('Privilege name is required');
        setLoading(false);
        return;
      }

      const privilegeData = {
        ...formData,
        privilegeParentId: formData.privilegeParentId || '00000000-0000-0000-0000-000000000000'
      };

      if (isEditing) {
        await privilegeService.update(id, privilegeData);
      } else {
        await privilegeService.create(privilegeData);
      }

      navigate('/privileges');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} privilege`);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
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
      <div className="row mb-3">
        <div className="col-12">
          <div className="card bg-light">
            <div className="card-body py-2">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h6 className="mb-0 text-primary">
                    <i className="bi bi-shield-check me-2"></i>
                    <strong>{authService.getSchoolName() || 'School Name'}</strong>
                  </h6>
                </div>
                <div className="col-md-6 text-md-end">
                  <h6 className="mb-0 text-secondary">
                    <i className="bi bi-briefcase me-2"></i>
                    {authService.getCompanyName() || 'Company Name'}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isEditing ? 'Edit Privilege' : 'Create New Privilege'}</h2>
        <Link to="/privileges" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Privileges
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            {isEditing ? 'Privilege Information' : 'New Privilege Details'}
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="privilegeName" className="form-label">
                    Privilege Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="privilegeName"
                    name="privilegeName"
                    value={formData.privilegeName}
                    onChange={handleChange}
                    required
                    placeholder="Enter privilege name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="privilegeParentId" className="form-label">
                    Parent Privilege ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="privilegeParentId"
                    name="privilegeParentId"
                    value={formData.privilegeParentId}
                    onChange={handleChange}
                    placeholder="Enter parent privilege ID (optional)"
                  />
                  <small className="text-muted">Leave empty for root-level privileges</small>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    placeholder="Enter status"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="statusMessage" className="form-label">
                    Status Message
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="statusMessage"
                    name="statusMessage"
                    value={formData.statusMessage}
                    onChange={handleChange}
                    placeholder="Enter status message"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="isActive" className="form-label">
                    Active Status
                  </label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isActive"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="isActive">
                      Active
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="isDeleted" className="form-label">
                    Delete Status
                  </label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isDeleted"
                      name="isDeleted"
                      checked={formData.isDeleted}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="isDeleted">
                      Deleted
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Link to="/privileges" className="btn btn-outline-secondary">
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
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    {isEditing ? 'Update Privilege' : 'Create Privilege'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrivilegeForm;
