import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { classSectionService } from '../../services/classSectionService';
import { classService } from '../../services/classService';
import { sectionService } from '../../services/sectionService';
import { classRoomService } from '../../services/classRoomService';
import { authService } from '../../services/authService';

const ClassSectionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    classMasterId: '',
    sectionMasterId: '',
    locationId: '',
    isActive: true,
    status: 'A',
    statusMessage: ''
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');
  
  // Dropdown data states
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [classRooms, setClassRooms] = useState([]);
  const [dropdownLoading, setDropdownLoading] = useState(false);

  const fetchDropdownData = useCallback(async () => {
    try {
      setDropdownLoading(true);
      
      // Get current user for filtering
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser || !currentUser.companyId || !currentUser.schoolId) {
        console.error('Company ID or School ID not found in current user session');
        setError('User session invalid. Please log in again.');
        return;
      }

      const { companyId, schoolId } = currentUser;
      console.log('Fetching dropdown data for:', { companyId, schoolId });

      const [allClasses, allSections, allClassRooms] = await Promise.all([
        classService.getAll(),
        sectionService.getAll(),
        classRoomService.getAll()
      ]);

      // Filter data by company and school
      const filteredClasses = allClasses.filter(cls => 
        cls.companyId === companyId && cls.schoolId === schoolId
      );
      
      const filteredSections = allSections.filter(section => 
        section.companyId === companyId && section.schoolId === schoolId
      );
      
      const filteredClassRooms = allClassRooms.filter(classRoom => 
        classRoom.companyId === companyId && classRoom.schoolId === schoolId
      );

      console.log('Filtered dropdown data:', {
        classes: filteredClasses.length,
        sections: filteredSections.length,
        classRooms: filteredClassRooms.length
      });

      setClasses(filteredClasses);
      setSections(filteredSections);
      setClassRooms(filteredClassRooms);
    } catch (err) {
      console.error('Failed to fetch dropdown data:', err);
      setError('Failed to load dropdown data');
    } finally {
      setDropdownLoading(false);
    }
  }, []);

  const fetchClassSection = useCallback(async () => {
    try {
      setFetchLoading(true);
      const classSection = await classSectionService.getById(id);
      setFormData({
        classMasterId: classSection.classMasterId || '',
        sectionMasterId: classSection.sectionMasterId || '',
        locationId: classSection.locationId || '',
        isActive: classSection.isActive ?? true,
        status: classSection.status || 'A',
        statusMessage: classSection.statusMessage || ''
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch class section details');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  const getSessionData = useCallback(() => {
    const currentUser = authService.getCurrentUser();
    return {
      companyId: currentUser?.companyId || '00000000-0000-0000-0000-000000000000',
      schoolId: currentUser?.schoolId || '00000000-0000-0000-0000-000000000000'
    };
  }, []);

  useEffect(() => {
    // Fetch dropdown data
    fetchDropdownData();
    
    if (isEditing) {
      fetchClassSection();
    }
  }, [id, isEditing, fetchClassSection, fetchDropdownData]);

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
      if (!formData.classMasterId.trim()) {
        setError('Class is required');
        setLoading(false);
        return;
      }

      if (!formData.sectionMasterId.trim()) {
        setError('Section is required');
        setLoading(false);
        return;
      }

      const classSectionData = {
        classMasterId: formData.classMasterId,
        sectionMasterId: formData.sectionMasterId,
        locationId: formData.locationId,
        ...getSessionData()
      };

      if (isEditing) {
        await classSectionService.update(id, classSectionData);
      } else {
        await classSectionService.create(classSectionData);
      }

      navigate('/classsections');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} class section`);
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isEditing ? 'Edit Class Section' : 'Create New Class Section'}</h2>
        <Link to="/classsections" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Class Sections
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
            {isEditing ? 'Class Section Information' : 'New Class Section Details'}
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="classMasterId" className="form-label">
                    Class <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="classMasterId"
                    name="classMasterId"
                    value={formData.classMasterId}
                    onChange={handleChange}
                    required
                    disabled={dropdownLoading}
                  >
                    <option value="">Select Class</option>
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.id}>
                        {cls.className || cls.name}
                      </option>
                    ))}
                  </select>
                  {dropdownLoading && (
                    <small className="text-muted">Loading classes...</small>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="sectionMasterId" className="form-label">
                    Section <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="sectionMasterId"
                    name="sectionMasterId"
                    value={formData.sectionMasterId}
                    onChange={handleChange}
                    required
                    disabled={dropdownLoading}
                  >
                    <option value="">Select Section</option>
                    {sections.map(section => (
                      <option key={section.id} value={section.id}>
                        {section.sectionName || section.name}
                      </option>
                    ))}
                  </select>
                  {dropdownLoading && (
                    <small className="text-muted">Loading sections...</small>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="locationId" className="form-label">
                    Location
                  </label>
                  <select
                    className="form-select"
                    id="locationId"
                    name="locationId"
                    value={formData.locationId}
                    onChange={handleChange}
                    disabled={dropdownLoading}
                  >
                    <option value="">Select Location</option>
                    {classRooms.map(classRoom => (
                      <option key={classRoom.id} value={classRoom.id}>
                        {classRoom.roomNumber || classRoom.name || classRoom.className}
                      </option>
                    ))}
                  </select>
                  {dropdownLoading && (
                    <small className="text-muted">Loading locations...</small>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={dropdownLoading}
                  >
                    <option value="A">Active</option>
                    <option value="I">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      disabled={dropdownLoading}
                    />
                    <label className="form-check-label" htmlFor="isActive">
                      Active Assignment
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="statusMessage" className="form-label">
                    Status Message
                  </label>
                  <textarea
                    className="form-control"
                    id="statusMessage"
                    name="statusMessage"
                    rows="2"
                    value={formData.statusMessage}
                    onChange={handleChange}
                    placeholder="Enter any additional status information..."
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Link to="/classsections" className="btn btn-outline-secondary">
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
                    {isEditing ? 'Update Class Section' : 'Create Class Section'}
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

export default ClassSectionForm;
