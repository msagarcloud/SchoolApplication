import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import subjectService from '../../services/subjectService';
import { authService } from '../../services/authService';

const SubjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    subjectName: '',
    isScholastic: true,
    isActive: true,
    periodsPerWeek: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      fetchSubject();
    }
  }, [id, isEditing]);

  const fetchSubject = async () => {
    try {
      setLoading(true);
      const data = await subjectService.getById(id);
      setFormData({
        subjectName: data.subjectName || '',
        isScholastic: data.isScholastic !== false,
        isActive: data.isActive !== false,
        periodsPerWeek: data.periodsPerWeek || 1
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch subject');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'periodsPerWeek' ? parseInt(value, 10) || 1 : value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Get current user context for required fields
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser || !currentUser.companyId || !currentUser.schoolId) {
        throw new Error('Company ID or School ID not found in current user session');
      }

      // Prepare form data with required context fields
      const submissionData = {
        ...formData,
        companyId: currentUser.companyId,
        schoolId: currentUser.schoolId
      };

      if (isEditing) {
        await subjectService.update(id, submissionData);
      } else {
        await subjectService.create(submissionData);
      }
      navigate('/subjects');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} subject`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isEditing ? 'Edit Subject' : 'Add New Subject'}</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/subjects')}>
          Back to Subjects
        </button>
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
              <label htmlFor="subjectName" className="form-label">Subject Name *</label>
              <input
                type="text"
                className="form-control"
                id="subjectName"
                name="subjectName"
                value={formData.subjectName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="periodsPerWeek" className="form-label">Periods Per Week *</label>
              <input
                type="number"
                className="form-control"
                id="periodsPerWeek"
                name="periodsPerWeek"
                value={formData.periodsPerWeek}
                onChange={handleChange}
                min="1"
                max="10"
                required
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isScholastic"
                name="isScholastic"
                checked={formData.isScholastic}
                onChange={handleChange}
              />
              <label htmlFor="isScholastic" className="form-check-label">
                Scholastic Subject
              </label>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
              <label htmlFor="isActive" className="form-check-label">
                Active
              </label>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  isEditing ? 'Update Subject' : 'Create Subject'
                )}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/subjects')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubjectForm;
