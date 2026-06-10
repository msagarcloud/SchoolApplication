import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { classSubjectService } from '../../services/classSubjectService';
import { classService } from '../../services/classService';
import subjectService from '../../services/subjectService';
import { authService } from '../../services/authService';

const ClassSubjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    classMasterId: '',
    subjectId: '',
    periodsPerWeek: '',
    companyId: '',
    schoolId: ''
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');
  
  // Dropdown data states
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [existingClassSubjects, setExistingClassSubjects] = useState([]);
  const [dropdownLoading, setDropdownLoading] = useState(false);

  // Utility function to get session data
  const getSessionData = useCallback(() => {
    const currentUser = authService.getCurrentUser();
    return {
      companyId: currentUser?.companyId || '00000000-0000-0000-0000-000000000000',
      schoolId: currentUser?.schoolId || '00000000-0000-0000-0000-000000000000'
    };
  }, []);

  const fetchClassSubject = useCallback(async () => {
    try {
      setFetchLoading(true);
      const { schoolId } = getSessionData();
      const classSubject = await classSubjectService.getById(id, schoolId);
      setFormData({
        classMasterId: classSubject.classMasterId || '',
        subjectId: classSubject.subjectId || '',
        periodsPerWeek: classSubject.periodsPerWeek || '',
        companyId: classSubject.companyId || '',
        schoolId: classSubject.schoolId || ''
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch class subject details');
    } finally {
      setFetchLoading(false);
    }
  }, [id, getSessionData]);

  const fetchDropdownData = useCallback(async () => {
    try {
      setDropdownLoading(true);
      const { schoolId } = getSessionData();
      const [classesData, subjectsData, classSubjectsData] = await Promise.all([
        schoolId ? classService.getBySchoolId(schoolId) : classService.getAll(),
        subjectService.getAll(),
        classSubjectService.getAll(schoolId)
      ]);
      setClasses(classesData || []);
      setSubjects(subjectsData || []);
      setExistingClassSubjects(classSubjectsData || []);
    } catch (err) {
      console.error('Failed to fetch dropdown data:', err);
    } finally {
      setDropdownLoading(false);
    }
  }, [getSessionData]);

  const filterSubjectsByClass = useCallback((classId) => {
    // Always show all subjects for both create and edit forms
    // This ensures users can see all available subjects
    setFilteredSubjects(subjects);
  }, [subjects]);

  useEffect(() => {
    // Fetch dropdown data
    fetchDropdownData();
    
    if (isEditing) {
      fetchClassSubject();
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
  }, [id, isEditing, fetchClassSubject, fetchDropdownData]);

  useEffect(() => {
    // Initialize filtered subjects when subjects data is loaded
    setFilteredSubjects(subjects);
  }, [subjects]);

  useEffect(() => {
    // Filter subjects when class changes or when existing relationships are loaded
    filterSubjectsByClass(formData.classMasterId);
  }, [formData.classMasterId, filterSubjectsByClass]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // If class is changed, clear subject selection
    if (name === 'classMasterId') {
      setFormData(prev => ({
        ...prev,
        classMasterId: value,
        subjectId: '' // Clear subject when class changes
      }));
    }
    
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

      if (!formData.subjectId.trim()) {
        setError('Subject is required');
        setLoading(false);
        return;
      }

      if (!formData.periodsPerWeek.trim()) {
        setError('Periods per week is required');
        setLoading(false);
        return;
      }

      const periodsPerWeekNum = parseInt(formData.periodsPerWeek);
      if (isNaN(periodsPerWeekNum) || periodsPerWeekNum < 1 || periodsPerWeekNum > 50) {
        setError('Periods per week must be a number between 1 and 50');
        setLoading(false);
        return;
      }

      const sessionData = getSessionData();
      const currentUser = authService.getCurrentUser();
      
      // Validate session data
      if (!sessionData.companyId || sessionData.companyId === '00000000-0000-0000-0000-000000000000') {
        setError('Company information is missing. Please log in again.');
        setLoading(false);
        return;
      }

      if (!sessionData.schoolId || sessionData.schoolId === '00000000-0000-0000-0000-000000000000') {
        setError('School information is missing. Please log in again.');
        setLoading(false);
        return;
      }

      const classSubjectData = {
        classMasterId: formData.classMasterId,
        subjectId: formData.subjectId,
        periodsPerWeek: formData.periodsPerWeek ? parseInt(formData.periodsPerWeek) : null,
        ...sessionData,
        createdBy: currentUser?.id || null,
        modifiedBy: currentUser?.id || null
      };

      if (isEditing) {
        const { schoolId } = getSessionData();
        await classSubjectService.update(id, classSubjectData, schoolId);
      } else {
        await classSubjectService.create(classSubjectData);
      }

      navigate('/classsubjects');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} class subject`);
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
        <h2>{isEditing ? 'Edit Class Subject' : 'Create New Class Subject'}</h2>
        <Link to="/classsubjects" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Class Subjects
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
            {isEditing ? 'Class Subject Information' : 'New Class Subject Details'}
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
                        {cls.name || cls.Name}
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
                  <label htmlFor="subjectId" className="form-label">
                    Subject <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="subjectId"
                    name="subjectId"
                    value={formData.subjectId}
                    onChange={handleChange}
                    required
                    disabled={dropdownLoading}
                  >
                    <option value="">Select Subject</option>
                    {filteredSubjects.map(subject => (
                      <option key={subject.id} value={subject.id}>
                        {subject.subjectName || subject.SubjectName}
                      </option>
                    ))}
                  </select>
                  {dropdownLoading && (
                    <small className="text-muted">Loading subjects...</small>
                  )}
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="periodsPerWeek" className="form-label">
                    Periods Per Week
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="periodsPerWeek"
                    name="periodsPerWeek"
                    value={formData.periodsPerWeek}
                    onChange={handleChange}
                    placeholder="Enter periods per week"
                    min="1"
                    max="50"
                  />
                  <small className="text-muted">
                    Specify the number of periods per week for this class-subject combination
                  </small>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Link to="/classsubjects" className="btn btn-outline-secondary">
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
                    {isEditing ? 'Update Class Subject' : 'Create Class Subject'}
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

export default ClassSubjectForm;
