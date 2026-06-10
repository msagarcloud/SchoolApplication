import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { classRoomService } from '../../services/classRoomService';
import { authService } from '../../services/authService';

const ClassRoomForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    schoolId: '',
    companyId: ''
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');

  const fetchClassRoom = useCallback(async () => {
    try {
      setFetchLoading(true);
      const classRoom = await classRoomService.getById(id);
      setFormData({
        name: classRoom.name || '',
        schoolId: classRoom.schoolId || '',
        companyId: classRoom.companyId || ''
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch classroom details');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEditing) {
      fetchClassRoom();
    }
    // Initialize CompanyId and SchoolId from current user session
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        companyId: currentUser.companyId || '',
        schoolId: currentUser.schoolId || ''
      }));
    }
  }, [id, isEditing, fetchClassRoom]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        setError('Classroom name is required');
        setLoading(false);
        return;
      }

      if (!formData.companyId.trim()) {
        setError('Company ID is required. Please ensure you are logged in with proper company access.');
        setLoading(false);
        return;
      }

      if (!formData.schoolId.trim()) {
        setError('School ID is required. Please ensure you are logged in with proper school access.');
        setLoading(false);
        return;
      }

      const classRoomData = {
        ...formData,
        companyId: formData.companyId || '00000000-0000-0000-0000-000000000000',
        schoolId: formData.schoolId || '00000000-0000-0000-0000-000000000000'
      };

      if (isEditing) {
        await classRoomService.update(id, classRoomData);
      } else {
        await classRoomService.create(classRoomData);
      }

      navigate('/classrooms');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} classroom`);
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
        <h2>{isEditing ? 'Edit Classroom' : 'Create New Classroom'}</h2>
        <Link to="/classrooms" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Classrooms
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
            {isEditing ? 'Classroom Information' : 'New Classroom Details'}
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Classroom Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter classroom name (e.g., Room A, Lab 1)"
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
                    readOnly
                    placeholder="Company ID (from session)"
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
                    readOnly
                    placeholder="School ID (from session)"
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Link to="/classrooms" className="btn btn-outline-secondary">
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
                    {isEditing ? 'Update Classroom' : 'Create Classroom'}
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

export default ClassRoomForm;
