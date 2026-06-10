import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import transportHelpService from '../../services/transportHelpService';

const TransportHelpForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    helpTitle: '',
    helpDescription: '',
    helpCategory: 'General',
    helpSolution: '',
    priority: 3,
    companyId: '',
    schoolId: '',
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      loadHelpTopic();
    }
  }, [id]);

  const loadHelpTopic = async () => {
    try {
      const helpTopic = await transportHelpService.getById(id);
      setFormData(helpTopic);
    } catch (err) {
      setError('Failed to load help topic. Please try again.');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const helpData = {
        ...formData,
        createdById: '00000000-0000-0000-0000-000000000001' // TODO: Get from auth context
      };

      if (isEditing) {
        await transportHelpService.update(id, helpData);
      } else {
        await transportHelpService.create(helpData);
      }

      navigate('/transport-help');
    } catch (err) {
      setError('Failed to save help topic. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>{isEditing ? 'Edit Help Topic' : 'Add Help Topic'}</h4>
        <button 
          onClick={() => navigate('/transport-help')} 
          className="btn btn-secondary"
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to List
        </button>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Help Title *</label>
            <input
              type="text"
              className="form-control"
              name="helpTitle"
              value={formData.helpTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              name="helpCategory"
              value={formData.helpCategory}
              onChange={handleChange}
            >
              <option value="General">General</option>
              <option value="Application">Application</option>
              <option value="Payment">Payment</option>
              <option value="Schedule">Schedule</option>
              <option value="Safety">Safety</option>
              <option value="Technical">Technical</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Priority</label>
            <select
              className="form-select"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="1">1 - High</option>
              <option value="2">2 - Medium</option>
              <option value="3">3 - Low</option>
              <option value="4">4 - Information</option>
            </select>
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Help Description *</label>
            <textarea
              className="form-control"
              name="helpDescription"
              value={formData.helpDescription}
              onChange={handleChange}
              rows="4"
              required
              placeholder="Describe the problem or question in detail"
            />
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Help Solution</label>
            <textarea
              className="form-control"
              name="helpSolution"
              value={formData.helpSolution}
              onChange={handleChange}
              rows="4"
              placeholder="Provide step-by-step solution or answer"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Company ID *</label>
            <input
              type="text"
              className="form-control"
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">School ID *</label>
            <input
              type="text"
              className="form-control"
              name="schoolId"
              value={formData.schoolId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
              <label className="form-check-label">
                Active
              </label>
            </div>
          </div>

          <div className="col-12">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-2"></i>
                  {isEditing ? 'Update Help Topic' : 'Save Help Topic'}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TransportHelpForm;
