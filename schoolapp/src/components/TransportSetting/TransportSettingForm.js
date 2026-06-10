import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import transportSettingService from '../../services/transportSettingService';

const TransportSettingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    settingName: '',
    settingDescription: '',
    settingValue: '',
    settingType: 'General',
    companyId: '',
    schoolId: '',
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      loadSetting();
    }
  }, [id]);

  const loadSetting = async () => {
    try {
      const setting = await transportSettingService.getById(id);
      setFormData(setting);
    } catch (err) {
      setError('Failed to load transport setting. Please try again.');
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
      const settingData = {
        ...formData,
        createdById: '00000000-0000-0000-0000-000000000001' // TODO: Get from auth context
      };

      if (isEditing) {
        await transportSettingService.update(id, settingData);
      } else {
        await transportSettingService.create(settingData);
      }

      navigate('/transport-settings');
    } catch (err) {
      setError('Failed to save transport setting. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>{isEditing ? 'Edit Transport Setting' : 'Add Transport Setting'}</h4>
        <button 
          onClick={() => navigate('/transport-settings')} 
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
            <label className="form-label">Setting Name *</label>
            <input
              type="text"
              className="form-control"
              name="settingName"
              value={formData.settingName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Setting Type</label>
            <select
              className="form-select"
              name="settingType"
              value={formData.settingType}
              onChange={handleChange}
            >
              <option value="General">General</option>
              <option value="Timing">Timing</option>
              <option value="Fee">Fee</option>
              <option value="Route">Route</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Safety">Safety</option>
            </select>
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Setting Description</label>
            <textarea
              className="form-control"
              name="settingDescription"
              value={formData.settingDescription}
              onChange={handleChange}
              rows="3"
              placeholder="Optional description of this setting"
            />
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Setting Value *</label>
            <textarea
              className="form-control"
              name="settingValue"
              value={formData.settingValue}
              onChange={handleChange}
              rows="4"
              required
              placeholder="Enter the setting value"
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
                  {isEditing ? 'Update Setting' : 'Save Setting'}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TransportSettingForm;
