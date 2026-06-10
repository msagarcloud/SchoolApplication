import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { roleService } from '../../services/roleService';

const RoleMasterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRole();
  }, [id]);

  const fetchRole = async () => {
    try {
      setLoading(true);
      const data = await roleService.getById(id);
      console.log('Fetched role detail data:', data);
      console.log('Role detail fields:', Object.keys(data));
      console.log('Role name field values:', {
        roleName: data.roleName,
        name: data.name,
        RoleName: data.RoleName,
        role_name: data.role_name
      });
      setRole(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch role details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const roleName = role.roleName || role.name || role.RoleName || role.role_name || 'this role';
    if (window.confirm(`Are you sure you want to delete "${roleName}"? This action cannot be undone.`)) {
      try {
        await roleService.delete(id);
        navigate('/roles');
      } catch (err) {
        setError(err.message || 'Failed to delete role');
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
        <Link to="/roles" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Roles
        </Link>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Role not found
        </div>
        <Link to="/roles" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Roles
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Role Details</h2>
        <div className="btn-group" role="group">
          <Link to="/roles" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Roles
          </Link>
          <Link to={`/roles/${role.id}/edit`} className="btn btn-warning">
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
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-shield-check me-2"></i>
                Role Information
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Role Name</label>
                    <p className="form-control-plaintext fw-bold">
                      {role.roleName || role.name || role.RoleName || role.role_name || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Status</label>
                    <div>
                      <span className={`badge ${role.isActive ? 'bg-success' : 'bg-danger'}`}>
                        {role.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-muted">Description</label>
                <p className="form-control-plaintext">
                  {role.description || 'No description provided'}
                </p>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Created Date</label>
                    <p className="form-control-plaintext">
                      {role.createdDate ? new Date(role.createdDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Modified Date</label>
                    <p className="form-control-plaintext">
                      {role.modifiedDate ? new Date(role.modifiedDate).toLocaleDateString() : 'Not modified'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link to={`/roles/${role.id}/edit`} className="btn btn-warning">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Role
                </Link>
                <button className="btn btn-danger" onClick={handleDelete}>
                  <i className="bi bi-trash me-2"></i>
                  Delete Role
                </button>
                <Link to="/roles" className="btn btn-outline-secondary">
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to List
                </Link>
              </div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-shield me-2"></i>
                Role Statistics
              </h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-6">
                  <div className="border-end">
                    <h4 className="text-primary">
                      {role.isActive ? 'Active' : 'Inactive'}
                    </h4>
                    <small className="text-muted">Current Status</small>
                  </div>
                </div>
                <div className="col-6">
                  <h4 className="text-info">
                    {role.isDeleted ? 'Deleted' : 'Available'}
                  </h4>
                  <small className="text-muted">Delete Status</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleMasterDetail;
