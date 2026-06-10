import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { feeCategoryService } from '../../services/feeCategoryService';

const formatDateTime = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
};

const getFeeCategoryValue = (feeCategory, key) =>
  feeCategory?.[key] ?? feeCategory?.[key.charAt(0).toUpperCase() + key.slice(1)];

const FeeCategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [feeCategory, setFeeCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFeeCategory = useCallback(async () => {
    try {
      setLoading(true);
      const data = await feeCategoryService.getById(id);
      setFeeCategory(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch fee category details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchFeeCategory();
  }, [fetchFeeCategory]);

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${feeCategory.feesCatgoryName}"? This action cannot be undone.`
      )
    ) {
      try {
        await feeCategoryService.delete(id);
        navigate('/feecategory');
      } catch (err) {
        setError(err.message || 'Failed to delete fee category');
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
        <Link to="/feecategory" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Fee Categories
        </Link>
      </div>
    );
  }

  if (!feeCategory) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Fee category not found
        </div>
        <Link to="/feecategory" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Fee Categories
        </Link>
      </div>
    );
  }

  const feeCategoryId = getFeeCategoryValue(feeCategory, 'id');
  const feeCategoryName = getFeeCategoryValue(feeCategory, 'feesCatgoryName') || 'N/A';
  const feeCategoryDescription = getFeeCategoryValue(feeCategory, 'description') || 'N/A';
  const feeCategoryIsActive = getFeeCategoryValue(feeCategory, 'isActive');
  const feeCategoryStatus = getFeeCategoryValue(feeCategory, 'status') || 'N/A';
  const feeCategoryStatusMessage =
    getFeeCategoryValue(feeCategory, 'statusMessage') || 'N/A';
  const feeCategoryCreatedDate = getFeeCategoryValue(feeCategory, 'createdDate');
  const feeCategoryModifiedDate =
    getFeeCategoryValue(feeCategory, 'modifiedDate') ?? getFeeCategoryValue(feeCategory, 'ModifiedDate');

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Fee Category Details</h2>
        <div className="btn-group" role="group">
          <Link to="/feecategory" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Fee Categories
          </Link>
          <Link to={`/feecategory/${feeCategoryId}/edit`} className="btn btn-warning">
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
              <h5 className="mb-0">Fee Category Information</h5>
              <span className={`badge ${feeCategoryIsActive ? 'bg-success' : 'bg-danger'}`}>
                {feeCategoryIsActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Fee Category Name:</div>
                <div className="col-sm-9">{feeCategoryName}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Description:</div>
                <div className="col-sm-9">{feeCategoryDescription}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status:</div>
                <div className="col-sm-9">
                  <span className="badge bg-info">{feeCategoryStatus}</span>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status Message:</div>
                <div className="col-sm-9">{feeCategoryStatusMessage}</div>
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
                <div className="col-sm-4 fw-bold">Fee Category ID:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{feeCategory.id}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created Date:</div>
                <div className="col-sm-8">{formatDateTime(feeCategoryCreatedDate)}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Modified Date:</div>
                <div className="col-sm-8">
                  {feeCategoryModifiedDate
                    ? formatDateTime(feeCategoryModifiedDate)
                    : 'Not modified'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeCategoryDetail;
