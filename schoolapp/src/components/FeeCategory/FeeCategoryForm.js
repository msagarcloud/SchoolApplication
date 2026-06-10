import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { feeCategoryService } from '../../services/feeCategoryService';
import { authService } from '../../services/authService';

const FeeCategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    feesCatgoryName: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');

  const fetchFeeCategory = useCallback(async () => {
    try {
      setFetchLoading(true);
      const feeCategory = await feeCategoryService.getById(id);
      setFormData({
        feesCatgoryName: feeCategory.feesCatgoryName || '',
        description: feeCategory.description || '',
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch fee category details');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEditing) {
      fetchFeeCategory();
    }
  }, [id, isEditing, fetchFeeCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.feesCatgoryName.trim()) {
        setError('Fee category name is required');
        setLoading(false);
        return;
      }

      if (isEditing) {
        await feeCategoryService.update(id, formData);
      } else {
        await feeCategoryService.create(formData);
      }

      navigate('/feecategory');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} fee category`);
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
                    <i className="bi bi-building me-2"></i>
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
        <h2>{isEditing ? 'Edit Fee Category' : 'Create New Fee Category'}</h2>
        <Link to="/feecategory" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Fee Categories
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
            {isEditing ? 'Fee Category Information' : 'New Fee Category Details'}
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="feesCatgoryName" className="form-label">
                    Fee Category Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="feesCatgoryName"
                    name="feesCatgoryName"
                    value={formData.feesCatgoryName}
                    onChange={handleChange}
                    required
                    placeholder="Enter fee category name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Link to="/feecategory" className="btn btn-outline-secondary">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    {isEditing ? 'Update Fee Category' : 'Create Fee Category'}
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

export default FeeCategoryForm;
