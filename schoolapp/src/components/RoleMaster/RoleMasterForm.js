import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { roleService } from '../../services/roleService';
import { authService } from '../../services/authService';

const RoleMasterForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    roleName: '',
    description: '',
    isActive: true,
    isDeleted: false
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');

  const fetchRole = useCallback(async () => {
    try {
      setFetchLoading(true);
      const role = await roleService.getById(id);
      setFormData({
        roleName: role.name || '',
        description: role.description || '',
        isActive: role.isActive !== undefined ? role.isActive : true,
        isDeleted: role.isDeleted !== undefined ? role.isDeleted : false
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch role details');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEditing) {
      fetchRole();
    }
  }, [id, isEditing, fetchRole]);

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
      if (!formData.roleName.trim()) {
        setError('Role name is required');
        setLoading(false);
        return;
      }

      if (formData.roleName.trim().length < 2) {
        setError('Role name must be at least 2 characters long');
        setLoading(false);
        return;
      }

      if (formData.roleName.trim().length > 100) {
        setError('Role name must not exceed 100 characters');
        setLoading(false);
        return;
      }

      if (formData.description && formData.description.length > 500) {
        setError('Description must not exceed 500 characters');
        setLoading(false);
        return;
      }

      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const roleData = {
        name: formData.roleName.trim(),
        description: formData.description?.trim() || '',
        companyId: currentUser.companyId || localStorage.getItem('companyId') || '00000000-0000-0000-0000-000000000000',
        schoolId: currentUser.schoolId || localStorage.getItem('schoolId') || '00000000-0000-0000-0000-000000000000',
        createdBy: currentUser.id || null,
        modifiedBy: currentUser.id || null
      };

      if (isEditing) {
        await roleService.update(id, roleData);
      } else {
        await roleService.create(roleData);
      }

      navigate('/roles');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} role`);
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
        <h2>{isEditing ? 'Edit Role' : 'Create New Role'}</h2>
        <Link to="/roles" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Roles
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
            {isEditing ? 'Role Information' : 'New Role Details'}
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="roleName" className="form-label">
                    Role Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="roleName"
                    name="roleName"
                    value={formData.roleName}
                    onChange={handleChange}
                    required
                    placeholder="Enter role name"
                    maxLength="100"
                  />
                  <small className="text-muted">
                    Role name must be between 2 and 100 characters
                  </small>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter role description"
                    maxLength="500"
                  />
                  <small className="text-muted">
                    Optional: Maximum 500 characters
                  </small>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="isActive" className="form-label">
                    Status
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
                  <small className="text-muted">
                    Uncheck to deactivate this role
                  </small>
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
                  <small className="text-muted">
                    Check to mark this role as deleted
                  </small>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Link to="/roles" className="btn btn-outline-secondary">
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
                    {isEditing ? 'Update Role' : 'Create Role'}
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

export default RoleMasterForm;
