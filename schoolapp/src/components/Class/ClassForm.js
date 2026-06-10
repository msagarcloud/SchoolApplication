import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { classService } from '../../services/classService';
import { authService } from '../../services/authService';

const ClassForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    examAssessment: '',
    isGradePointApplicable: false,
    companyId: '',
    schoolId: ''
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');

  const fetchClass = useCallback(async () => {
    try {
      setFetchLoading(true);
      const cls = await classService.getById(id);
      setFormData({
        name: cls.name || '',
        examAssessment: cls.examAssessment || '',
        isGradePointApplicable: cls.isGradePointApplicable || false,
        companyId: cls.companyId || '',
        schoolId: cls.schoolId || ''
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch class details');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEditing) {
      fetchClass();
    }
  }, [id, isEditing, fetchClass]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.name.trim()) {
        setError('Class name is required');
        setLoading(false);
        return;
      }

      if (!formData.companyId.trim()) {
        setError('Company is required');
        setLoading(false);
        return;
      }

      if (!formData.schoolId.trim()) {
        setError('School is required');
        setLoading(false);
        return;
      }

      const classData = {
        ...formData,
        companyId: formData.companyId || '00000000-0000-0000-0000-000000000000',
        schoolId: formData.schoolId || '00000000-0000-0000-0000-000000000000'
      };

      if (isEditing) {
        await classService.update(id, classData);
      } else {
        await classService.create(classData);
      }

      navigate('/classes');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} class`);
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
        <h2>{isEditing ? 'Edit Class' : 'Create New Class'}</h2>
        <Link to="/classes" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Classes
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
            {isEditing ? 'Class Information' : 'New Class Details'}
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Class Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter class name (e.g., Grade 1, Class 10A)"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="examAssessment" className="form-label">
                    Exam Assessment
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="examAssessment"
                    name="examAssessment"
                    value={formData.examAssessment}
                    onChange={handleChange}
                    placeholder="Enter exam assessment details"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="companyId" className="form-label">
                    Company ID <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="companyId"
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleChange}
                    required
                    placeholder="Enter company ID"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="schoolId" className="form-label">
                    School ID <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="schoolId"
                    name="schoolId"
                    value={formData.schoolId}
                    onChange={handleChange}
                    required
                    placeholder="Enter school ID"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isGradePointApplicable"
                      name="isGradePointApplicable"
                      checked={formData.isGradePointApplicable}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="isGradePointApplicable">
                      Grade Point Applicable
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Link to="/classes" className="btn btn-outline-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    {isEditing ? 'Update Class' : 'Create Class'}
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

export default ClassForm;
