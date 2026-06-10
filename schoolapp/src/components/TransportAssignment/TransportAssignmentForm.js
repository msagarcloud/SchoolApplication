import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import transportAssignmentService from '../../services/transportAssignmentService';

const TransportAssignmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    studentId: '',
    vehicleId: '',
    driverId: '',
    routeId: '',
    assignmentDate: '',
    effectiveFrom: '',
    effectiveTo: '',
    pickupPoint: '',
    dropPoint: '',
    pickupTime: '',
    dropTime: '',
    monthlyFee: '',
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      loadAssignment();
    }
  }, [id]);

  const loadAssignment = async () => {
    try {
      const assignment = await transportAssignmentService.getById(id);
      setFormData({
        ...assignment,
        assignmentDate: assignment.assignmentDate ? new Date(assignment.assignmentDate).toISOString().split('T')[0] : '',
        effectiveFrom: assignment.effectiveFrom ? new Date(assignment.effectiveFrom).toISOString().split('T')[0] : '',
        effectiveTo: assignment.effectiveTo ? new Date(assignment.effectiveTo).toISOString().split('T')[0] : '',
      });
    } catch (err) {
      setError('Failed to load transport assignment. Please try again.');
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
      const assignmentData = {
        ...formData,
        createdById: '00000000-0000-0000-0000-000000000001' // TODO: Get from auth context
      };

      if (isEditing) {
        await transportAssignmentService.update(id, assignmentData);
      } else {
        await transportAssignmentService.create(assignmentData);
      }

      navigate('/transport-assignments');
    } catch (err) {
      setError('Failed to save transport assignment. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>{isEditing ? 'Edit Transport Assignment' : 'Add Transport Assignment'}</h4>
        <button 
          onClick={() => navigate('/transport-assignments')} 
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
            <label className="form-label">Student ID *</label>
            <input
              type="text"
              className="form-control"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Vehicle ID *</label>
            <input
              type="text"
              className="form-control"
              name="vehicleId"
              value={formData.vehicleId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Driver ID *</label>
            <input
              type="text"
              className="form-control"
              name="driverId"
              value={formData.driverId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Route ID *</label>
            <input
              type="text"
              className="form-control"
              name="routeId"
              value={formData.routeId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Assignment Date</label>
            <input
              type="date"
              className="form-control"
              name="assignmentDate"
              value={formData.assignmentDate}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Effective From</label>
            <input
              type="date"
              className="form-control"
              name="effectiveFrom"
              value={formData.effectiveFrom}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Effective To</label>
            <input
              type="date"
              className="form-control"
              name="effectiveTo"
              value={formData.effectiveTo}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Pickup Point</label>
            <input
              type="text"
              className="form-control"
              name="pickupPoint"
              value={formData.pickupPoint}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Drop Point</label>
            <input
              type="text"
              className="form-control"
              name="dropPoint"
              value={formData.dropPoint}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Pickup Time</label>
            <input
              type="time"
              className="form-control"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Drop Time</label>
            <input
              type="time"
              className="form-control"
              name="dropTime"
              value={formData.dropTime}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Monthly Fee ($)</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="monthlyFee"
              value={formData.monthlyFee}
              onChange={handleChange}
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
                  {isEditing ? 'Update Assignment' : 'Save Assignment'}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TransportAssignmentForm;
