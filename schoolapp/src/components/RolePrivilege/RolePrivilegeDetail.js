import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { rolePrivilegeService } from '../../services/rolePrivilegeService';

const RolePrivilegeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rolePrivilege, setRolePrivilege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRolePrivilege();
  }, [fetchRolePrivilege]);

  const fetchRolePrivilege = async () => {
    try {
      setLoading(true);
      const data = await rolePrivilegeService.getById(id);
      setRolePrivilege(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch role privilege details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the role privilege for "${rolePrivilege?.roleName}" - "${rolePrivilege?.privilegeName}"? This action cannot be undone.`)) {
      try {
        await rolePrivilegeService.delete(id);
        navigate('/roleprivileges');
      } catch (err) {
        setError(err.message || 'Failed to delete role privilege');
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
        <Link to="/roleprivileges" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Role Privileges
        </Link>
      </div>
    );
  }

  if (!rolePrivilege) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Role privilege not found
        </div>
        <Link to="/roleprivileges" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Role Privileges
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Role Privilege Details</h2>
        <div className="btn-group" role="group">
          <Link to="/roleprivileges" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Role Privileges
          </Link>
          <Link to={`/roleprivileges/${rolePrivilege.id}/edit`} className="btn btn-warning">
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
              <h5 className="mb-0">Role Privilege Information</h5>
              <span className={`badge ${rolePrivilege.isActive ? 'bg-success' : 'bg-danger'}`}>
                {rolePrivilege.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Role Name:</div>
                <div className="col-sm-9">{rolePrivilege.roleName || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Privilege Name:</div>
                <div className="col-sm-9">{rolePrivilege.privilegeName || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status:</div>
                <div className="col-sm-9">{rolePrivilege.status || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status Message:</div>
                <div className="col-sm-9">{rolePrivilege.statusMessage || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Active Status:</div>
                <div className="col-sm-9">
                  <span className={`badge ${rolePrivilege.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {rolePrivilege.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Delete Status:</div>
                <div className="col-sm-9">
                  <span className={`badge ${rolePrivilege.isDeleted ? 'bg-danger' : 'bg-secondary'}`}>
                    {rolePrivilege.isDeleted ? 'Deleted' : 'Not Deleted'}
                  </span>
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
                <div className="col-sm-4 fw-bold">Role Privilege ID:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{rolePrivilege.id}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Role ID:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{rolePrivilege.roleId}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Privilege ID:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{rolePrivilege.privilegeId}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created By:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{rolePrivilege.createdBy}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created Date:</div>
                <div className="col-sm-8">
                  {new Date(rolePrivilege.createdDate).toLocaleDateString()} at{' '}
                  {new Date(rolePrivilege.createdDate).toLocaleTimeString()}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Modified By:</div>
                <div className="col-sm-8">
                  {rolePrivilege.modifiedBy ? (
                    <small className="text-muted font-monospace">{rolePrivilege.modifiedBy}</small>
                  ) : (
                    'Not modified'
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-sm-4 fw-bold">Modified Date:</div>
                <div className="col-sm-8">
                  {rolePrivilege.modifiedDate ? (
                    <>
                      {new Date(rolePrivilege.modifiedDate).toLocaleDateString()} at{' '}
                      {new Date(rolePrivilege.modifiedDate).toLocaleTimeString()}
                    </>
                  ) : (
                    'Not modified'
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

export default RolePrivilegeDetail;
