import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { designationService } from '../../services/designationService';
import { departmentService } from '../../services/departmentService';

const DesignationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    designationName: '',
    departmentId: '',
    description: '',
    isActive: true
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [error, setError] = useState('');

  const loadDepartments = async () => {
    try {
      const data = await departmentService.getAll();
      setDepartments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load departments:', err);
    }
  };

  const loadDesignation = useCallback(async () => {
    if (!isEditing) return;

    try {
      setFetching(true);
      const data = await designationService.getById(id);
      setFormData({
        designationName: data.designationName || data.name || data.DesignationName || data.Name || '',
        designationCode: data.designationCode || data.code || data.DesignationCode || data.Code || '',
        isActive: data.isActive !== undefined ? data.isActive : true
      });
    } catch (err) {
      setError(err.message || 'Failed to load designation');
    } finally {
      setFetching(false);
    }
  }, [id, isEditing]);

  useEffect(() => {
    loadDepartments();
    loadDesignation();
  }, [loadDesignation]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue
    }));

    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.designationName.trim()) {
      setError('Designation name is required');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        designationName: formData.designationName.trim(),
        departmentId: formData.departmentId || null,
        description: formData.description.trim(),
        isActive: formData.isActive
      };

      if (isEditing) {
        await designationService.update(id, payload);
      } else {
        await designationService.create(payload);
      }

      navigate('/designations');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} designation`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
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
        <h2>{isEditing ? 'Edit Designation' : 'Create New Designation'}</h2>
        <Link to="/designations" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2" />
          Back to Designations
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
            <div className="row gy-3">
              <div className="col-md-6">
                <label htmlFor="designationCode" className="form-label">
                  Designation Code <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="designationCode"
                  name="designationCode"
                  className="form-control"
                  value={formData.designationCode || ''}
                  onChange={handleChange}
                  placeholder="Enter designation code"
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="designationName" className="form-label">
                  Designation Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="designationName"
                  name="designationName"
                  className="form-control"
                  value={formData.designationName}
                  onChange={handleChange}
                  placeholder="Enter designation name"
                  required
                />
              </div>

              <div className="col-md-4">
                <div className="form-check form-switch mt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="isActive">
                    Active
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                    Saving...
                  </>
                ) : (
                  <>{isEditing ? 'Update Designation' : 'Create Designation'}</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DesignationForm;
