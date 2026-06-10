import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { assesmentMasterService } from '../../services/assesmentMasterService';
import { authService } from '../../services/authService';
import { useSessionData } from '../../hooks/useSessionData';

const AssesmentMasterForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const sessionData = useSessionData();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    percentageWeightage: '',
    fromPeriod: '',
    toPeriod: '',
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');

  const fetchAssesment = useCallback(async () => {
    try {
      setFetchLoading(true);
      const data = await assesmentMasterService.getById(id);
      setFormData({
        name: data.name || '',
        description: data.description || '',
        percentageWeightage: data.percentageWeightage ?? '',
        fromPeriod: data.fromPeriod ? data.fromPeriod.split('T')[0] : '',
        toPeriod: data.toPeriod ? data.toPeriod.split('T')[0] : '',
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch assessment details');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEditing) {
      fetchAssesment();
    }
  }, [id, isEditing, fetchAssesment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.name.trim()) {
        setError('Assessment name is required');
        setLoading(false);
        return;
      }

      const submitData = {
        name: formData.name,
        description: formData.description,
        percentageWeightage: formData.percentageWeightage !== '' ? parseFloat(formData.percentageWeightage) : null,
        fromPeriod: formData.fromPeriod || null,
        toPeriod: formData.toPeriod || null,
        companyId: sessionData.companyId,
        schoolId: sessionData.schoolId,
      };

      if (isEditing) {
        await assesmentMasterService.update(id, submitData);
      } else {
        await assesmentMasterService.create(submitData);
      }

      navigate('/assesmentMaster');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} assessment`);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* School / Company header */}
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
        <h2>
          <i className="bi bi-clipboard-check me-2 text-primary"></i>
          {isEditing ? 'Edit Assessment' : 'Create New Assessment'}
        </h2>
        <Link to="/assesmentMaster" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Assessments
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            <i className="bi bi-clipboard-data me-2"></i>
            {isEditing ? 'Assessment Information' : 'New Assessment Details'}
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Assessment Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter assessment name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="percentageWeightage" className="form-label">
                    Percentage Weightage (%)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="percentageWeightage"
                    name="percentageWeightage"
                    value={formData.percentageWeightage}
                    onChange={handleChange}
                    placeholder="e.g. 25"
                    step="0.01"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="fromPeriod" className="form-label">
                    From Period
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="fromPeriod"
                    name="fromPeriod"
                    value={formData.fromPeriod}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="toPeriod" className="form-label">
                    To Period
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="toPeriod"
                    name="toPeriod"
                    value={formData.toPeriod}
                    onChange={handleChange}
                  />
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
              <Link to="/assesmentMaster" className="btn btn-outline-secondary">
                <i className="bi bi-x-circle me-2"></i>Cancel
              </Link>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    {isEditing ? 'Update Assessment' : 'Create Assessment'}
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

export default AssesmentMasterForm;
