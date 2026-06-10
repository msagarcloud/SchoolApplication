import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { categoryService } from '../../services/categoryService';

const formatDateTime = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
};

const getCategoryValue = (category, key) => category?.[key] ?? category?.[key.charAt(0).toUpperCase() + key.slice(1)];

const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCategory = useCallback(async () => {
    try {
      setLoading(true);
      const data = await categoryService.getById(id);
      setCategory(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch category details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${category.name}"? This action cannot be undone.`)) {
      try {
        await categoryService.delete(id);
        navigate('/categories');
      } catch (err) {
        setError(err.message || 'Failed to delete category');
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
        <Link to="/categories" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Categories
        </Link>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Category not found
        </div>
        <Link to="/categories" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Categories
        </Link>
      </div>
    );
  }

  const categoryId = getCategoryValue(category, 'id');
  const categoryName = getCategoryValue(category, 'name') || 'N/A';
  const categoryIsActive = getCategoryValue(category, 'isActive');
  const categoryStatus = getCategoryValue(category, 'status') || 'N/A';
  const categoryStatusMessage = getCategoryValue(category, 'statusMessage') || getCategoryValue(category, 'StatusMessage') || 'N/A';
  const categoryCreatedDate = getCategoryValue(category, 'createdDate');
  const categoryModifiedDate = getCategoryValue(category, 'modifiedDate') ?? getCategoryValue(category, 'ModifiedDate');

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Category Details</h2>
        <div className="btn-group" role="group">
          <Link to="/categories" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Categories
          </Link>
          <Link to={`/categories/${categoryId}/edit`} className="btn btn-warning">
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
              <h5 className="mb-0">Category Information</h5>
              <span className={`badge ${categoryIsActive ? 'bg-success' : 'bg-danger'}`}>
                {categoryIsActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Category Name:</div>
                <div className="col-sm-9">{categoryName}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status:</div>
                <div className="col-sm-9">
                  <span className="badge bg-info">{categoryStatus}</span>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status Message:</div>
                <div className="col-sm-9">{categoryStatusMessage}</div>
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
                <div className="col-sm-4 fw-bold">Category ID:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{category.id}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created Date:</div>
                <div className="col-sm-8">
                  {formatDateTime(categoryCreatedDate)}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Modified Date:</div>
                <div className="col-sm-8">
                  {categoryModifiedDate ? formatDateTime(categoryModifiedDate) : 'Not modified'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
