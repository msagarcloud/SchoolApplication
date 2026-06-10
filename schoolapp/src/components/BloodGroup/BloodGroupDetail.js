import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { bloodGroupService } from '../../services/bloodGroupService';

const BloodGroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bloodGroup, setBloodGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBloodGroup = useCallback(async () => {
    try {
      setLoading(true);
      const data = await bloodGroupService.getById(id);
      setBloodGroup(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch blood group details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBloodGroup();
  }, [fetchBloodGroup]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${bloodGroup.name}"? This action cannot be undone.`)) {
      try {
        await bloodGroupService.delete(id);
        navigate('/bloodgroups');
      } catch (err) {
        setError(err.message || 'Failed to delete blood group');
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
        <Link to="/bloodgroups" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Blood Groups
        </Link>
      </div>
    );
  }

  if (!bloodGroup) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Blood group not found
        </div>
        <Link to="/bloodgroups" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Blood Groups
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Blood Group Details</h2>
        <div className="btn-group" role="group">
          <Link to="/bloodgroups" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Blood Groups
          </Link>
          <Link to={`/bloodgroups/${bloodGroup.id}/edit`} className="btn btn-warning">
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
              <h5 className="mb-0">Blood Group Information</h5>
              <span className={`badge ${bloodGroup.isActive ? 'bg-success' : 'bg-danger'}`}>
                {bloodGroup.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Blood Group Name:</div>
                <div className="col-sm-9">{bloodGroup.name || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status:</div>
                <div className="col-sm-9">
                  <span className="badge bg-info">{bloodGroup.status || 'N/A'}</span>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status Message:</div>
                <div className="col-sm-9">{bloodGroup.statusMessage || 'N/A'}</div>
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
                <div className="col-sm-4 fw-bold">Blood Group ID:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{bloodGroup.id}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created Date:</div>
                <div className="col-sm-8">
                  {new Date(bloodGroup.createdDate).toLocaleDateString()} at{' '}
                  {new Date(bloodGroup.createdDate).toLocaleTimeString()}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Modified Date:</div>
                <div className="col-sm-8">
                  {bloodGroup.modifiedDate ? (
                    <>
                      {new Date(bloodGroup.modifiedDate).toLocaleDateString()} at{' '}
                      {new Date(bloodGroup.modifiedDate).toLocaleTimeString()}
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

export default BloodGroupDetail;
