import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { discountCategoryService } from '../../services/discountCategoryService';
import { feeCategoryService } from '../../services/feeCategoryService';

const formatDateTime = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
};

const getDiscountCategoryValue = (discountCategory, key) =>
  discountCategory?.[key] ?? discountCategory?.[key.charAt(0).toUpperCase() + key.slice(1)];

const DiscountCategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [discountCategory, setDiscountCategory] = useState(null);
  const [feeCategory, setFeeCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDiscountCategory = useCallback(async () => {
    try {
      setLoading(true);
      const data = await discountCategoryService.getById(id);
      setDiscountCategory(data);

      // Fetch the associated fee category
      if (data.feeCategoryId) {
        const feeCat = await feeCategoryService.getById(data.feeCategoryId);
        setFeeCategory(feeCat);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch discount category details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDiscountCategory();
  }, [fetchDiscountCategory]);

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${discountCategory.name}"? This action cannot be undone.`
      )
    ) {
      try {
        await discountCategoryService.delete(id);
        navigate('/discountCategory');
      } catch (err) {
        setError(err.message || 'Failed to delete discount category');
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
        <Link to="/discountCategory" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Discount Categories
        </Link>
      </div>
    );
  }

  if (!discountCategory) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Discount category not found
        </div>
        <Link to="/discountCategory" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Discount Categories
        </Link>
      </div>
    );
  }

  const discountCategoryId = getDiscountCategoryValue(discountCategory, 'id');
  const discountCategoryName = getDiscountCategoryValue(discountCategory, 'name') || 'N/A';
  const discountCategoryDescription =
    getDiscountCategoryValue(discountCategory, 'description') || 'N/A';
  const discountCategoryIsPercentage =
    getDiscountCategoryValue(discountCategory, 'isPercentAge') || false;
  const discountCategoryAmount = getDiscountCategoryValue(discountCategory, 'amount') || 0;
  const discountCategoryIsActive = getDiscountCategoryValue(discountCategory, 'isActive');
  const discountCategoryStatus = getDiscountCategoryValue(discountCategory, 'status') || 'N/A';
  const discountCategoryStatusMessage =
    getDiscountCategoryValue(discountCategory, 'statusMessage') || 'N/A';
  const discountCategoryCreatedDate = getDiscountCategoryValue(discountCategory, 'createdDate');
  const discountCategoryModifiedDate = getDiscountCategoryValue(discountCategory, 'modifiedDate');
  const feeCategoryName =
    feeCategory?.feesCatgoryName || getDiscountCategoryValue(discountCategory, 'feeCategoryName') ||
    'N/A';

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Discount Category Details</h2>
        <div className="btn-group" role="group">
          <Link to="/discountCategory" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Discount Categories
          </Link>
          <Link to={`/discountCategory/${discountCategoryId}/edit`} className="btn btn-warning">
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
              <h5 className="mb-0">Discount Category Information</h5>
              <span className={`badge ${discountCategoryIsActive ? 'bg-success' : 'bg-danger'}`}>
                {discountCategoryIsActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Name:</div>
                <div className="col-sm-9">{discountCategoryName}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Fee Category:</div>
                <div className="col-sm-9">{feeCategoryName}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Description:</div>
                <div className="col-sm-9">{discountCategoryDescription}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Discount Type:</div>
                <div className="col-sm-9">
                  <span className="badge bg-info">
                    {discountCategoryIsPercentage ? 'Percentage' : 'Fixed Amount'}
                  </span>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Discount Amount:</div>
                <div className="col-sm-9">
                  <strong>
                    {discountCategoryIsPercentage
                      ? `${discountCategoryAmount}%`
                      : `₹${discountCategoryAmount.toFixed(2)}`}
                  </strong>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status:</div>
                <div className="col-sm-9">
                  <span className="badge bg-info">{discountCategoryStatus}</span>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status Message:</div>
                <div className="col-sm-9">{discountCategoryStatusMessage}</div>
              </div>

              <hr />

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Created Date:</div>
                <div className="col-sm-9">{formatDateTime(discountCategoryCreatedDate)}</div>
              </div>

              <div className="row mb-0">
                <div className="col-sm-3 fw-bold">Modified Date:</div>
                <div className="col-sm-9">{formatDateTime(discountCategoryModifiedDate)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link
                  to={`/discountCategory/${discountCategoryId}/edit`}
                  className="btn btn-warning"
                >
                  <i className="bi bi-pencil me-2"></i>
                  Edit Discount Category
                </Link>
                <button className="btn btn-danger" onClick={handleDelete}>
                  <i className="bi bi-trash me-2"></i>
                  Delete Discount Category
                </button>
                <Link to="/discountCategory" className="btn btn-outline-secondary">
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to List
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountCategoryDetail;
