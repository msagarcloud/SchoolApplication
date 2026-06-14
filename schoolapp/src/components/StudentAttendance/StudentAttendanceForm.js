import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { studentAttendanceService } from '../../services/studentAttendanceService';
import { studentService } from '../../services/studentService';
import { classService } from '../../services/classService';
import { sectionService } from '../../services/sectionService';
import { authService } from '../../services/authService';

const StudentAttendanceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    studentGuid: '',
    classId: '',
    sectionId: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    attendenceDate: new Date().toISOString().split('T')[0],
    attendenceStatus: true,
    attendanceReasonId: '',
    attendenceTime: '',
    companyId: '',
    schoolId: ''
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');
  
  // Reference data for dropdowns
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [referenceLoading, setReferenceLoading] = useState(false);

  const fetchAttendance = useCallback(async () => {
    try {
      setFetchLoading(true);
      const attendance = await studentAttendanceService.getById(id);
      setFormData({
        studentGuid: attendance.studentGuid || '',
        classId: attendance.classId || '',
        sectionId: attendance.sectionId || '',
        month: attendance.month || new Date().getMonth() + 1,
        year: attendance.year || new Date().getFullYear(),
        attendenceDate: attendance.attendenceDate ? new Date(attendance.attendenceDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        attendenceStatus: attendance.attendenceStatus !== undefined ? attendance.attendenceStatus : true,
        attendanceReasonId: attendance.attendanceReasonId || '',
        attendenceTime: attendance.attendenceTime || '',
        companyId: attendance.companyId || '',
        schoolId: attendance.schoolId || ''
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch attendance details');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEditing) {
      fetchAttendance();
    }
    fetchReferenceData();
  }, [id, isEditing, fetchAttendance]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
    
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.studentGuid) {
        setError('Student is required');
        setLoading(false);
        return;
      }

      if (!formData.classId) {
        setError('Class is required');
        setLoading(false);
        return;
      }

      if (!formData.sectionId) {
        setError('Section is required');
        setLoading(false);
        return;
      }

      if (!formData.attendenceDate) {
        setError('Attendance date is required');
        setLoading(false);
        return;
      }

      const attendanceData = {
        ...formData,
        studentGuid: formData.studentGuid || '00000000-0000-0000-0000-000000000000',
        classId: formData.classId || '00000000-0000-0000-0000-000000000000',
        sectionId: formData.sectionId || '00000000-0000-0000-0000-000000000000',
        attendanceReasonId: formData.attendanceReasonId || '00000000-0000-0000-0000-000000000000',
        companyId: formData.companyId || authService.getCompanyId() || '00000000-0000-0000-0000-000000000000',
        schoolId: formData.schoolId || authService.getSchoolId() || '00000000-0000-0000-0000-000000000000',
        createdBy: authService.getUserId() || '00000000-0000-0000-0000-000000000000',
        modifiedBy: isEditing ? authService.getUserId() || '00000000-0000-0000-0000-000000000000' : undefined
      };

      if (isEditing) {
        await studentAttendanceService.update(id, attendanceData);
      } else {
        await studentAttendanceService.create(attendanceData);
      }

      navigate('/attendence');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} attendance`);
    } finally {
      setLoading(false);
    }
  };

  const fetchReferenceData = async () => {
    try {
      setReferenceLoading(true);
      const [studentsData, classesData, sectionsData] = await Promise.all([
        studentService.getAll(),
        classService.getAll(),
        sectionService.getAll()
      ]);
      setStudents(studentsData);
      setClasses(classesData);
      setSections(sectionsData);
      
      // Set default company and school IDs from auth service
      setFormData(prev => ({
        ...prev,
        companyId: authService.getCompanyId() || '',
        schoolId: authService.getSchoolId() || ''
      }));
    } catch (err) {
      console.error('Failed to fetch reference data:', err);
    } finally {
      setReferenceLoading(false);
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
        <h2>{isEditing ? 'Edit Student Attendance' : 'Create New Student Attendance'}</h2>
        <Link to="/attendence" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Attendance
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
            {isEditing ? 'Attendance Information' : 'New Attendance Details'}
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="studentGuid" className="form-label">
                    Student <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="studentGuid"
                    name="studentGuid"
                    value={formData.studentGuid}
                    onChange={handleChange}
                    disabled={referenceLoading}
                    required
                  >
                    <option value="">Select Student</option>
                    {students.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.firstName} {student.lastName || ''} ({student.admissionNumber || 'N/A'})
                      </option>
                    ))}
                  </select>
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
                    value={formData.classId}
                    onChange={handleChange}
                    disabled={referenceLoading}
                    required
                  >
                    <option value="">Select Class</option>
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.id}>
                        {cls.className}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="sectionId" className="form-label">
                    Section <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="sectionId"
                    name="sectionId"
                    value={formData.sectionId}
                    onChange={handleChange}
                    disabled={referenceLoading}
                    required
                  >
                    <option value="">Select Section</option>
                    {sections.map(section => (
                      <option key={section.id} value={section.id}>
                        {section.sectionName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="attendenceDate" className="form-label">
                    Attendance Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="attendenceDate"
                    name="attendenceDate"
                    value={formData.attendenceDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="month" className="form-label">
                    Month
                  </label>
                  <select
                    className="form-select"
                    id="month"
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                      <option key={month} value={month}>
                        {new Date(2024, month - 1).toLocaleString('default', { month: 'long' })}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="year" className="form-label">
                    Year
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    min="2020"
                    max="2030"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="attendenceTime" className="form-label">
                    Attendance Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="attendenceTime"
                    name="attendenceTime"
                    value={formData.attendenceTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="attendenceStatus" className="form-label">
                    Attendance Status <span className="text-danger">*</span>
                  </label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="attendenceStatus"
                      name="attendenceStatus"
                      checked={formData.attendenceStatus}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="attendenceStatus">
                      Present
                    </label>
                  </div>
                  <small className="text-muted">Uncheck if absent</small>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="attendanceReasonId" className="form-label">
                    Attendance Reason
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="attendanceReasonId"
                    name="attendanceReasonId"
                    value={formData.attendanceReasonId}
                    onChange={handleChange}
                    placeholder="Reason ID (if absent)"
                    disabled={formData.attendenceStatus}
                  />
                  <small className="text-muted">Required when absent</small>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Link to="/student-attendance" className="btn btn-outline-secondary">
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
                    {isEditing ? 'Update Attendance' : 'Create Attendance'}
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

export default StudentAttendanceForm;
