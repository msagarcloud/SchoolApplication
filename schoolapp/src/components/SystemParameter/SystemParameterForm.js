import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { systemParameterService } from '../../services/systemParameterService';

const SystemParameterForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    parameterKey: '',
    parameterValue: '',
    description: '',
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');

  const fetchParameter = useCallback(async () => {
    try {
      setFetchLoading(true);
      const parameter = await systemParameterService.getById(id);
      setFormData({
        parameterKey: parameter.parameterKey || '',
        parameterValue: parameter.parameterValue || '',
        description: parameter.description || '',
        isActive: parameter.isActive !== undefined ? parameter.isActive : true,
      });
    } catch (err) {
      setError(err.message || 'Failed to load system parameter');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEditing) {
      fetchParameter();
    }
  }, [isEditing, fetchParameter]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.parameterKey.trim()) {
      setError('Parameter key is required');
      setLoading(false);
      return;
    }

    if (!formData.parameterValue.trim()) {
      setError('Parameter value is required');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        parameterKey: formData.parameterKey.trim(),
        parameterValue: formData.parameterValue.trim(),
        description: formData.description.trim(),
        isActive: formData.isActive,
      };

      if (isEditing) {
        await systemParameterService.update(id, payload);
      } else {
        await systemParameterService.create(payload);
      }

      navigate('/system-parameters');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} system parameter`);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{isEditing ? 'Edit System Parameter' : 'Create System Parameter'}</h2>
          <p className="text-muted mb-0">{isEditing ? 'Update the parameter details.' : 'Add a new system configuration parameter.'}</p>
        </div>
        <Link to="/system-parameters" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to List
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="parameterKey" className="form-label">Parameter Key</label>
              <input
                id="parameterKey"
                name="parameterKey"
                type="text"
                className="form-control"
                value={formData.parameterKey}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="parameterValue" className="form-label">Parameter Value</label>
              <input
                id="parameterValue"
                name="parameterValue"
                type="text"
                className="form-control"
                value={formData.parameterValue}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-check form-switch mb-4">
              <input
                id="isActive"
                name="isActive"
                type="checkbox"
                className="form-check-input"
                checked={formData.isActive}
                onChange={handleChange}
                disabled={loading}
              />
              <label htmlFor="isActive" className="form-check-label">Active</label>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </>
                ) : (
                  isEditing ? 'Update Parameter' : 'Create Parameter'
                )}
              </button>
              <Link to="/system-parameters" className="btn btn-outline-secondary">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SystemParameterForm;
