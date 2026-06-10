import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { teacherSectionDetailService } from '../../services/teacherSectionDetailService';
import { authService } from '../../services/authService';
import { employeeService } from '../../services/employeeService';
import { classService } from '../../services/classService';
import { sectionService } from '../../services/sectionService';
import subjectService from '../../services/subjectService';

const TeacherSectionDetailDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacherSectionDetail, setTeacherSectionDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for resolved names
  const [resolvedNames, setResolvedNames] = useState({
    teacherName: '',
    className: '',
    sectionName: '',
    subjectName: ''
  });
  const [namesLoading, setNamesLoading] = useState(false);

  const fetchTeacherSectionDetail = useCallback(async () => {
    try {
      setLoading(true);
      const data = await teacherSectionDetailService.getById(id);
      setTeacherSectionDetail(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch teacher section detail');
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Function to resolve names based on IDs
  const resolveNames = useCallback(async (detail) => {
    if (!detail) return;

    try {
      setNamesLoading(true);
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser || !currentUser.companyId || !currentUser.schoolId) {
        console.error('Company ID or School ID not found in current user session');
        return;
      }

      const { companyId, schoolId } = currentUser;
      const names = { teacherName: '', className: '', sectionName: '', subjectName: '' };

      // Resolve teacher name
      if (detail.teacherId) {
        try {
          const allEmployees = await employeeService.getAll();
          const teacher = allEmployees.find(emp => 
            emp.id === detail.teacherId && 
            emp.companyId === companyId && 
            emp.schoolId === schoolId
          );
          if (teacher) {
            names.teacherName = `${teacher.firstName} ${teacher.lastName} - ${teacher.employeeCode}`;
          }
        } catch (err) {
          console.error('Failed to resolve teacher name:', err);
        }
      }

      // Resolve class name
      if (detail.classId) {
        try {
          const allClasses = await classService.getAll();
          const cls = allClasses.find(c => 
            c.id === detail.classId && 
            c.companyId === companyId && 
            c.schoolId === schoolId
          );
          if (cls) {
            names.className = cls.name;
          }
        } catch (err) {
          console.error('Failed to resolve class name:', err);
        }
      }

      // Resolve section name
      if (detail.sectionId) {
        try {
          const allSections = await sectionService.getAll();
          const section = allSections.find(s => 
            s.id === detail.sectionId && 
            s.companyId === companyId && 
            s.schoolId === schoolId
          );
          if (section) {
            names.sectionName = section.name;
          }
        } catch (err) {
          console.error('Failed to resolve section name:', err);
        }
      }

      // Resolve subject name
      if (detail.subjectId) {
        try {
          const allSubjects = await subjectService.getAll();
          const subject = allSubjects.find(s => 
            s.id === detail.subjectId && 
            s.companyId === companyId && 
            s.schoolId === schoolId
          );
          if (subject) {
            names.subjectName = subject.subjectName;
          }
        } catch (err) {
          console.error('Failed to resolve subject name:', err);
        }
      }

      setResolvedNames(names);
    } catch (err) {
      console.error('Failed to resolve names:', err);
    } finally {
      setNamesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeacherSectionDetail();
  }, [fetchTeacherSectionDetail]);

  useEffect(() => {
    if (teacherSectionDetail) {
      resolveNames(teacherSectionDetail);
    }
  }, [teacherSectionDetail, resolveNames]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this teacher section detail?')) {
      try {
        await teacherSectionDetailService.delete(id);
        navigate('/teacher-section-details');
      } catch (err) {
        setError(err.message || 'Failed to delete teacher section detail');
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/teacher-section-details" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Teacher Section Details
        </Link>
      </div>
    );
  }

  if (!teacherSectionDetail) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Teacher section detail not found
        </div>
        <Link to="/teacher-section-details" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Teacher Section Details
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Teacher Section Detail Details</h2>
        <div className="btn-group" role="group">
          <Link to="/teacher-section-details" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <Link 
            to={`/teacher-section-details/${id}/edit`} 
            className="btn btn-warning"
          >
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
          <button 
            className="btn btn-danger" 
            onClick={handleDelete}
          >
            <i className="bi bi-trash me-2"></i>
            Delete
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Basic Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>ID:</strong> {teacherSectionDetail.id}</p>
                  <p><strong>Teacher:</strong> {namesLoading ? 'Loading...' : (resolvedNames.teacherName || 'N/A')}</p>
                  <p><strong>Class:</strong> {namesLoading ? 'Loading...' : (resolvedNames.className || 'N/A')}</p>
                  <p><strong>Section:</strong> {namesLoading ? 'Loading...' : (resolvedNames.sectionName || 'N/A')}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Subject:</strong> {namesLoading ? 'Loading...' : (resolvedNames.subjectName || 'N/A')}</p>
                  <p><strong>Company ID:</strong> {teacherSectionDetail.companyId || 'N/A'}</p>
                  <p><strong>School ID:</strong> {teacherSectionDetail.schoolId || 'N/A'}</p>
                  <p><strong>Is Class Teacher:</strong> 
                    <span className={`badge ms-2 ${teacherSectionDetail.isClassTeacher ? 'bg-success' : 'bg-secondary'}`}>
                      {teacherSectionDetail.isClassTeacher ? 'Yes' : 'No'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              <h5 className="mb-0">Status Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Status:</strong> 
                    <span className={`badge ms-2 ${teacherSectionDetail.isActive ? 'bg-success' : 'bg-danger'}`}>
                      {teacherSectionDetail.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                  <p><strong>Created Date:</strong> {new Date(teacherSectionDetail.createdDate).toLocaleDateString()}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Modified Date:</strong> {teacherSectionDetail.modifiedDate ? new Date(teacherSectionDetail.modifiedDate).toLocaleDateString() : 'N/A'}</p>
                  <p><strong>Status Message:</strong> {teacherSectionDetail.statusMessage || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link 
                  to={`/teacher-section-details/${id}/edit`} 
                  className="btn btn-warning"
                >
                  <i className="bi bi-pencil me-2"></i>
                  Edit Detail
                </Link>
                <button 
                  className="btn btn-danger" 
                  onClick={handleDelete}
                >
                  <i className="bi bi-trash me-2"></i>
                  Delete Detail
                </button>
                <Link to="/teacher-section-details" className="btn btn-outline-secondary">
                  <i className="bi bi-list me-2"></i>
                  View All Details
                </Link>
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              <h5 className="mb-0">Summary</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                This teacher section detail assigns a teacher to a specific class, section, and subject combination. 
                It also indicates whether the teacher is the class teacher for this section.
              </p>
              <hr />
              <small className="text-muted">
                <strong>Created:</strong> {new Date(teacherSectionDetail.createdDate).toLocaleString()}<br />
                {teacherSectionDetail.modifiedDate && (
                  <>
                    <strong>Last Modified:</strong> {new Date(teacherSectionDetail.modifiedDate).toLocaleString()}
                  </>
                )}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSectionDetailDetail;
