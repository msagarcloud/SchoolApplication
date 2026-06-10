import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { privilegeService } from '../../services/privilegeService';
import { employeeService } from '../../services/employeeService';

const PrivilegeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [privilege, setPrivilege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createdByName, setCreatedByName] = useState('');
  const [modifiedByName, setModifiedByName] = useState('');

  const fetchPrivilege = async () => {
    try {
      setLoading(true);
      const data = await privilegeService.getById(id);
      setPrivilege(data);
      
      // Fetch user names for created by and modified by
      if (data.createdBy) {
        try {
          const creator = await employeeService.getById(data.createdBy);
          setCreatedByName(creator.firstName && creator.lastName 
            ? `${creator.firstName} ${creator.lastName}` 
            : creator.firstName || creator.employeeName || 'Unknown');
        } catch (err) {
          console.warn('Failed to fetch creator name:', err);
          setCreatedByName('Unknown');
        }
      }
      
      if (data.modifiedBy) {
        try {
          const modifier = await employeeService.getById(data.modifiedBy);
          setModifiedByName(modifier.firstName && modifier.lastName 
            ? `${modifier.firstName} ${modifier.lastName}` 
            : modifier.firstName || modifier.employeeName || 'Unknown');
        } catch (err) {
          console.warn('Failed to fetch modifier name:', err);
          setModifiedByName('Unknown');
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch privilege details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrivilege();
  }, []);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${privilege.privilegeName}"? This action cannot be undone.`)) {
      try {
        await privilegeService.delete(id);
        navigate('/privileges');
      } catch (err) {
        setError(err.message || 'Failed to delete privilege');
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
        <Link to="/privileges" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Privileges
        </Link>
      </div>
    );
  }

  if (!privilege) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Privilege not found
        </div>
        <Link to="/privileges" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Privileges
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Privilege Details</h2>
        <div className="btn-group" role="group">
          <Link to="/privileges" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Privileges
          </Link>
          <Link to={`/privileges/${privilege.id}/edit`} className="btn btn-warning">
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
              <h5 className="mb-0">Privilege Information</h5>
              <span className={`badge ${privilege.isActive ? 'bg-success' : 'bg-danger'}`}>
                {privilege.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Privilege Name:</div>
                <div className="col-sm-9">{privilege.privilegeName || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status:</div>
                <div className="col-sm-9">{privilege.status || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status Message:</div>
                <div className="col-sm-9">{privilege.statusMessage || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Parent Privilege ID:</div>
                <div className="col-sm-9">
                  {privilege.privilegeParentId ? (
                    <small className="text-muted font-monospace">{privilege.privilegeParentId}</small>
                  ) : (
                    <span className="text-muted">Root Level Privilege</span>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Active Status:</div>
                <div className="col-sm-9">
                  <span className={`badge ${privilege.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {privilege.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Delete Status:</div>
                <div className="col-sm-9">
                  <span className={`badge ${privilege.isDeleted ? 'bg-danger' : 'bg-secondary'}`}>
                    {privilege.isDeleted ? 'Deleted' : 'Not Deleted'}
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
                <div className="col-sm-4 fw-bold">Created By:</div>
                <div className="col-sm-8">
                  <span className="text-muted">{createdByName || 'Loading...'}</span>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created Date:</div>
                <div className="col-sm-8">
                  {new Date(privilege.createdDate).toLocaleDateString()} at{' '}
                  {new Date(privilege.createdDate).toLocaleTimeString()}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Modified By:</div>
                <div className="col-sm-8">
                  {privilege.modifiedBy ? (
                    <span className="text-muted">{modifiedByName || 'Loading...'}</span>
                  ) : (
                    'Not modified'
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-sm-4 fw-bold">Modified Date:</div>
                <div className="col-sm-8">
                  {privilege.modifiedDate ? (
                    <>
                      {new Date(privilege.modifiedDate).toLocaleDateString()} at{' '}
                      {new Date(privilege.modifiedDate).toLocaleTimeString()}
                    </>
                  ) : 'Not modified'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivilegeDetail;
