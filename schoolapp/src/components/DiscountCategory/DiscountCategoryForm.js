import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { discountCategoryService } from '../../services/discountCategoryService';
import { feeCategoryService } from '../../services/feeCategoryService';
import { authService } from '../../services/authService';
import { useSessionData } from '../../hooks/useSessionData';

const DiscountCategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const sessionData = useSessionData();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    feeCategoryId: '',
    isPercentAge: false,
    amount: '',
  });

  const [feeCategories, setFeeCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');

  const fetchDiscountCategory = useCallback(async () => {
    try {
      setFetchLoading(true);
      const discountCategory = await discountCategoryService.getById(id);
      setFormData({
        name: discountCategory.name || '',
        description: discountCategory.description || '',
        feeCategoryId: discountCategory.feeCategoryId || '',
        isPercentAge: discountCategory.isPercentAge || false,
        amount: discountCategory.amount || '',
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch discount category details');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categories = await feeCategoryService.getAll();
        setFeeCategories(categories);
      } catch (err) {
        console.error('Failed to fetch fee categories:', err);
      }
    };

    fetchInitialData();
    if (isEditing) {
      fetchDiscountCategory();
    }
  }, [id, isEditing, fetchDiscountCategory]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validation
      if (!formData.name.trim()) {
        setError('Discount category name is required');
        setLoading(false);
        return;
      }

      if (!formData.feeCategoryId) {
        setError('Fee category is required');
        setLoading(false);
        return;
      }

      if (!formData.amount || formData.amount <= 0) {
        setError('Amount must be greater than 0');
        setLoading(false);
        return;
      }

      const submitData = {
        name: formData.name,
        description: formData.description,
        feeCategoryId: formData.feeCategoryId,
        isPercentAge: formData.isPercentAge,
        amount: parseFloat(formData.amount),
        companyId: sessionData.companyId,
        schoolId: sessionData.schoolId,
      };

      if (isEditing) {
        await discountCategoryService.update(id, submitData);
      } else {
        await discountCategoryService.create(submitData);
      }

      navigate('/discountCategory');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} discount category`);
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
        <h2>{isEditing ? 'Edit Discount Category' : 'Create New Discount Category'}</h2>
        <Link to="/discountCategory" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Discount Categories
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
            {isEditing ? 'Discount Category Information' : 'New Discount Category Details'}
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Discount Category Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter discount category name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="feeCategoryId" className="form-label">
                    Fee Category <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="feeCategoryId"
                    name="feeCategoryId"
                    value={formData.feeCategoryId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a fee category</option>
                    {feeCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.feesCatgoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Discount Amount <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                      placeholder="Enter amount"
                      step="0.01"
                      min="0"
                    />
                    <span className="input-group-text">
                      {formData.isPercentAge ? '%' : '₹'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label d-block">Discount Type</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="percentageType"
                      name="discountType"
                      value="percentage"
                      checked={formData.isPercentAge}
                      onChange={() => setFormData((prev) => ({ ...prev, isPercentAge: true }))}
                    />
                    <label className="form-check-label" htmlFor="percentageType">
                      Percentage (%)
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="fixedType"
                      name="discountType"
                      value="fixed"
                      checked={!formData.isPercentAge}
                      onChange={() => setFormData((prev) => ({ ...prev, isPercentAge: false }))}
                    />
                    <label className="form-check-label" htmlFor="fixedType">
                      Fixed Amount (₹)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
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
                    placeholder="Enter description"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Link to="/discountCategory" className="btn btn-outline-secondary">
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
                    {isEditing ? 'Update Discount Category' : 'Create Discount Category'}
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

export default DiscountCategoryForm;
