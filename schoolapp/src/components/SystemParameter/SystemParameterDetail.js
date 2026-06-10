import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { systemParameterService } from '../../services/systemParameterService';

const SystemParameterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parameter, setParameter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadParameter = async () => {
      try {
        setLoading(true);
        const data = await systemParameterService.getById(id);
        setParameter(data);
      } catch (err) {
        setError(err.message || 'Failed to load system parameter');
      } finally {
        setLoading(false);
      }
    };

    loadParameter();
  }, [id]);

  const handleDelete = async () => {
    if (!parameter) return;
    if (window.confirm(`Delete parameter '${parameter.parameterName || parameter.parameterKey}'?`)) {
      try {
        await systemParameterService.delete(id);
        navigate('/system-parameters');
      } catch (err) {
        setError(err.message || 'Failed to delete system parameter');
      }
    }
  };

  const formatDate = (value) => {
    if (!value) return 'N/A';
    const date = new Date(value);
    return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
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
        <Link to="/system-parameters" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Parameters
        </Link>
      </div>
    );
  }

  if (!parameter) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          System parameter not found.
        </div>
        <Link to="/system-parameters" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Parameters
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>System Parameter Details</h2>
        <div className="btn-group" role="group">
          <Link to="/system-parameters" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Parameters
          </Link>
          <Link to={`/system-parameters/${id}/edit`} className="btn btn-warning">
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
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Parameter Information</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Name</div>
                <div className="col-sm-8">{parameter.parameterName || parameter.parameterKey || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Value</div>
                <div className="col-sm-8">{parameter.parameterValue || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Description</div>
                <div className="col-sm-8">{parameter.description || 'N/A'}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Status</div>
                <div className="col-sm-8">
                  <span className={`badge ${parameter.isActive ? 'bg-success' : 'bg-secondary'}`}>
                    {parameter.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">System Info</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-5 fw-bold">ID</div>
                <div className="col-7 text-truncate">{parameter.id}</div>
              </div>
              <div className="row mb-3">
                <div className="col-5 fw-bold">Created</div>
                <div className="col-7">{formatDate(parameter.createdDate)}</div>
              </div>
              <div className="row">
                <div className="col-5 fw-bold">Modified</div>
                <div className="col-7">{formatDate(parameter.modifiedDate)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemParameterDetail;
