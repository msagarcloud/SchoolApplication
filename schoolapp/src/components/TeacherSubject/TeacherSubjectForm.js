import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import teacherSubjectApiService from '../../services/teacherSubjectApiService';
import { useSessionData } from '../../hooks/useSessionData';
import { authService } from '../../services/authService';
import { teacherService } from '../../services/teacherService';
import { classService } from '../../services/classService';
import subjectService from '../../services/subjectService';
import { classSubjectService } from '../../services/classSubjectService';

const TeacherSubjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { sessionData } = useSessionData();
  
  const [assignment, setAssignment] = useState({
    teacherId: '',
    subjectId: '',
    classId: '',
    companyId: sessionData.companyId || '',
    schoolId: sessionData.schoolId || '',
    isActive: true,
    status: 'Active',
    statusMessage: ''
  });

  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]); // Store all subjects for reference
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownLoading, setDropdownLoading] = useState(false);
  const [subjectsLoading, setSubjectsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDropdownData();
    if (isEdit) {
      fetchAssignment();
    }
  }, [id, isEdit, sessionData]);

  // Fetch subjects when assignment is loaded in edit mode
  useEffect(() => {
    if (isEdit && assignment.classId && allSubjects.length > 0) {
      fetchSubjectsByClass(assignment.classId);
    }
  }, [assignment.classId, isEdit, allSubjects.length]);

  // Update assignment when session data changes (for new assignments)
  useEffect(() => {
    if (!isEdit && sessionData.companyId && sessionData.schoolId) {
      setAssignment(prev => ({
        ...prev,
        companyId: sessionData.companyId,
        schoolId: sessionData.schoolId
      }));
    }
  }, [sessionData, isEdit]);

  const fetchDropdownData = async () => {
    if (!sessionData.schoolId) {
      console.warn('No school ID in session data');
      setError('School information not available. Please log in again.');
      return;
    }
    
    try {
      setDropdownLoading(true);
      const [teachersData, subjectsData, classesData] = await Promise.all([
        teacherService.getAll(),
        subjectService.getAll(),
        classService.getBySchoolId(sessionData.schoolId)
      ]);
      
      console.log('Fetched teachers:', teachersData?.length || 0, 'items');
      console.log('Fetched subjects:', subjectsData?.length || 0, 'items');
      console.log('Fetched classes:', classesData?.length || 0, 'items');
      
      // Filter teachers by school if needed (assuming teachers come filtered by session)
      const filteredTeachers = Array.isArray(teachersData) ? teachersData : [];
      const filteredSubjects = Array.isArray(subjectsData) ? subjectsData : [];
      const filteredClasses = Array.isArray(classesData) ? classesData : [];
      
      setTeachers(filteredTeachers);
      setAllSubjects(filteredSubjects); // Store all subjects for reference
      setSubjects(filteredSubjects); // Initially show all subjects
      setClasses(filteredClasses);
      
      if (filteredTeachers.length === 0) {
        console.warn('No teachers found');
      }
      if (filteredClasses.length === 0) {
        console.warn('No classes found for school:', sessionData.schoolId);
      }
      if (filteredSubjects.length === 0) {
        console.warn('No subjects found');
      }
    } catch (err) {
      console.error('Failed to fetch dropdown data:', err);
      setError('Failed to load dropdown data. Please refresh the page.');
    } finally {
      setDropdownLoading(false);
    }
  };

  const fetchAssignment = async () => {
    try {
      setLoading(true);
      const data = await teacherSubjectApiService.getTeacherSubjectById(id);
      // Update assignment with session data
      const updatedAssignment = {
        ...data,
        companyId: sessionData.companyId || data.companyId,
        schoolId: sessionData.schoolId || data.schoolId
      };
      setAssignment(updatedAssignment);
    } catch (err) {
      setError(err.message || 'Failed to fetch assignment details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setAssignment(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));

    // If class is changed, fetch subjects for that class
    if (name === 'classId' && value) {
      fetchSubjectsByClass(value);
    } else if (name === 'classId' && !value) {
      // If class is cleared, reset to all subjects
      setSubjects(allSubjects);
    }
  };

  const fetchSubjectsByClass = async (classId) => {
    if (!classId || !sessionData.schoolId) {
      setSubjects(allSubjects);
      return;
    }

    try {
      setSubjectsLoading(true);
      console.log('Fetching subjects for class:', classId);
      console.log('School ID:', sessionData.schoolId);
      
      const classSubjects = await classSubjectService.getSubjectsByClass(classId, sessionData.schoolId);
      console.log('Class subjects fetched:', classSubjects);
      
      if (!Array.isArray(classSubjects)) {
        console.warn('Class subjects is not an array:', classSubjects);
        setSubjects(allSubjects);
        return;
      }
      
      // Extract subject IDs from class subjects (handle different field name formats)
      const subjectIds = classSubjects.map(cs => cs.subjectId || cs.SubjectId).filter(id => id);
      console.log('Extracted subject IDs:', subjectIds);
      
      if (subjectIds.length === 0) {
        console.log('No subject IDs found for class:', classId);
        setSubjects([]);
        return;
      }
      
      // Filter subjects based on class subjects
      const filteredSubjects = allSubjects.filter(subject => 
        subjectIds.includes(subject.id)
      );
      
      console.log('Filtered subjects for class:', filteredSubjects);
      setSubjects(filteredSubjects);
      
      // Clear subject selection if the current subject is not in the filtered list
      if (assignment.subjectId && !subjectIds.includes(assignment.subjectId)) {
        console.log('Clearing subject selection as it is not valid for this class');
        setAssignment(prev => ({ ...prev, subjectId: '' }));
      }
      
    } catch (err) {
      console.error('Failed to fetch subjects for class:', err);
      console.error('Error details:', err.response?.data || err.message);
      setError('Failed to load subjects for selected class. Showing all subjects.');
      // Fallback to all subjects
      setSubjects(allSubjects);
    } finally {
      setSubjectsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      // Validate required fields
      if (!assignment.teacherId || !assignment.subjectId || !assignment.classId) {
        setError('Please fill in all required fields');
        return;
      }
      
      // Ensure session data is included
      const submissionData = {
        ...assignment,
        companyId: sessionData.companyId || assignment.companyId,
        schoolId: sessionData.schoolId || assignment.schoolId,
        modifiedBy: sessionData.userId || 'current-user',
        modifiedDate: new Date().toISOString()
      };

      if (!isEdit) {
        submissionData.createdBy = sessionData.userId || 'current-user';
        submissionData.createdDate = new Date().toISOString();
      }
      
      // Call appropriate API method
      if (isEdit) {
        await teacherSubjectApiService.updateTeacherSubject(id, submissionData);
      } else {
        await teacherSubjectApiService.createTeacherSubject(submissionData);
      }
      
      navigate('/teacher-subjects');
    } catch (err) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} assignment`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
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
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{isEdit ? 'Edit Teacher-Subject Assignment' : 'Add New Assignment'}</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/teacher-subjects">Assignment Management</Link>
              </li>
              <li className="breadcrumb-item active">
                {isEdit ? 'Edit' : 'Create'}
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/teacher-subjects" className="btn btn-outline-secondary me-2">
            <i className="bi bi-x-lg me-2"></i>
            Cancel
          </Link>
          <button 
            type="submit" 
            form="assignment-form"
            className="btn btn-primary"
            disabled={loading}
          >
            <i className="bi bi-check-lg me-2"></i>
            {loading ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Form Section */}
      <div className="card">
        <form id="assignment-form" onSubmit={handleSubmit}>
          <div className="card-body">
            {/* Assignment Information */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Assignment Information</h5>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="teacherId" className="form-label">
                    Teacher <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="teacherId"
                    name="teacherId"
                    value={assignment.teacherId}
                    onChange={handleInputChange}
                    required
                    disabled={dropdownLoading}
                  >
                    <option value="">
                      {dropdownLoading ? 'Loading teachers...' : 'Select Teacher'}
                    </option>
                    {teachers.map((teacher) => {
                      const teacherName = `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim() || 'Unknown Teacher';
                      const employeeCode = teacher.employeeCode || teacher.code || '';
                      return (
                        <option key={teacher.id} value={teacher.id}>
                          {teacherName} {employeeCode ? `(${employeeCode})` : ''}
                        </option>
                      );
                    })}
                  </select>
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
                    value={assignment.subjectId}
                    onChange={handleInputChange}
                    required
                    disabled={dropdownLoading || subjectsLoading}
                  >
                    <option value="">
                      {subjectsLoading ? 'Loading subjects...' : 
                       dropdownLoading ? 'Loading data...' : 
                       'Select Subject'}
                    </option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.subjectName || subject.SubjectName || 'Unknown Subject'}
                      </option>
                    ))}
                  </select>
                  {subjectsLoading && (
                    <small className="text-muted">Loading subjects for selected class...</small>
                  )}
                  {!subjectsLoading && subjects.length === 0 && assignment.classId && (
                    <small className="text-warning">No subjects found for this class</small>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="classId" className="form-label">
                    Class <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="classId"
                    name="classId"
                    value={assignment.classId}
                    onChange={handleInputChange}
                    required
                    disabled={dropdownLoading}
                  >
                    <option value="">
                      {dropdownLoading ? 'Loading classes...' : 'Select Class'}
                    </option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
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
                    value={assignment.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Settings */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Additional Settings</h5>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={assignment.isActive}
                      onChange={handleInputChange}
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
                    value={assignment.statusMessage}
                    onChange={handleInputChange}
                    placeholder="Enter any additional status information..."
                  />
                </div>
              </div>
            </div>

            {/* Assignment Summary */}
            {assignment.teacherId && assignment.subjectId && assignment.classId && (
              <div className="row mb-4">
                <h5 className="col-12 mb-3">Assignment Summary</h5>
                <div className="col-12">
                  <div className="alert alert-info">
                    <h6 className="alert-heading">Assignment Details</h6>
                    <p className="mb-0">
                      <strong>Teacher:</strong> {
                        (() => {
                          const teacher = teachers.find(t => t.id === assignment.teacherId);
                          if (teacher) {
                            const teacherName = `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim() || 'Unknown Teacher';
                            const employeeCode = teacher.employeeCode || teacher.code || '';
                            return employeeCode ? `${teacherName} (${employeeCode})` : teacherName;
                          }
                          return 'Selected';
                        })()
                      }<br/>
                      <strong>Subject:</strong> {subjects.find(s => s.id === assignment.subjectId)?.subjectName || subjects.find(s => s.id === assignment.subjectId)?.SubjectName || 'Selected'}<br/>
                      <strong>Class:</strong> {classes.find(c => c.id === assignment.classId)?.name || 'Selected'}<br/>
                      <strong>School ID:</strong> {sessionData.schoolId || 'Session School ID'}<br/>
                      <strong>Company ID:</strong> {sessionData.companyId || 'Session Company ID'}<br/>
                      <strong>Status:</strong> {assignment.status}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherSubjectForm;
