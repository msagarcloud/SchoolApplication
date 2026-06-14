import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { studentAttendanceService } from '../../services/studentAttendanceService';
import { studentService } from '../../services/studentService';
import { classService } from '../../services/classService';
import { sectionService } from '../../services/sectionService';

const StudentAttendanceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState(null);
  const [student, setStudent] = useState(null);
  const [classData, setClassData] = useState(null);
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const data = await studentAttendanceService.getById(id);
      setAttendance(data);

      // Fetch related data
      if (data.studentGuid) {
        try {
          const studentData = await studentService.getById(data.studentGuid);
          setStudent(studentData);
        } catch (err) {
          console.error('Failed to fetch student:', err);
        }
      }

      if (data.classId) {
        try {
          const classData = await classService.getById(data.classId);
          setClassData(classData);
        } catch (err) {
          console.error('Failed to fetch class:', err);
        }
      }

      if (data.sectionId) {
        try {
          const sectionData = await sectionService.getById(data.sectionId);
          setSectionData(sectionData);
        } catch (err) {
          console.error('Failed to fetch section:', err);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch attendance details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this attendance record? This action cannot be undone.')) {
      try {
        await studentAttendanceService.delete(id);
        navigate('/attendence');
      } catch (err) {
        setError(err.message || 'Failed to delete attendance');
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
        <Link to="/attendence" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Attendance
        </Link>
      </div>
    );
  }

  if (!attendance) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Attendance record not found
        </div>
        <Link to="/attendence" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Attendance
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student Attendance Details</h2>
        <div className="btn-group" role="group">
          <Link to="/attendence" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Attendance
          </Link>
          <Link to={`/attendence/${attendance.id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            <i className="bi bi-trash me-2"></i>
            Delete
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Attendance Information</h5>
              <span className={`badge ${attendance.isActive ? 'bg-success' : 'bg-danger'}`}>
                {attendance.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Student:</div>
                <div className="col-sm-9">
                  {student ? (
                    <Link to={`/students/${student.id}`} className="text-decoration-none">
                      {student.firstName} {student.lastName || ''}
                    </Link>
                  ) : 'N/A'}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Class:</div>
                <div className="col-sm-9">
                  {classData ? (
                    <Link to={`/classes/${classData.id}`} className="text-decoration-none">
                      {classData.className}
                    </Link>
                  ) : 'N/A'}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Section:</div>
                <div className="col-sm-9">
                  {sectionData ? (
                    <Link to={`/sections/${sectionData.id}`} className="text-decoration-none">
                      {sectionData.sectionName}
                    </Link>
                  ) : 'N/A'}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Attendance Date:</div>
                <div className="col-sm-9">
                  {attendance.attendenceDate ? new Date(attendance.attendenceDate).toLocaleDateString() : 'N/A'}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Month:</div>
                <div className="col-sm-9">
                  {attendance.month ? new Date(2024, attendance.month - 1).toLocaleString('default', { month: 'long' }) : 'N/A'}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Year:</div>
                <div className="col-sm-9">{attendance.year || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Attendance Status:</div>
                <div className="col-sm-9">
                  <span className={`badge ${attendance.attendenceStatus ? 'bg-success' : 'bg-danger'}`}>
                    {attendance.attendenceStatus ? 'Present' : 'Absent'}
                  </span>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Attendance Time:</div>
                <div className="col-sm-9">{attendance.attendenceTime || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Attendance Reason ID:</div>
                <div className="col-sm-9">
                  <small className="text-muted font-monospace">{attendance.attendanceReasonId || 'N/A'}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status:</div>
                <div className="col-sm-9">
                  <span className="badge bg-info">{attendance.status || 'N/A'}</span>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status Message:</div>
                <div className="col-sm-9">{attendance.statusMessage || 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">System Information</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Attendance ID:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{attendance.id}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Student GUID:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{attendance.studentGuid}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Class ID:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{attendance.classId}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Section ID:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{attendance.sectionId}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Company ID:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{attendance.companyId}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">School ID:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{attendance.schoolId}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created Date:</div>
                <div className="col-sm-8">
                  {new Date(attendance.createdDate).toLocaleDateString()} at{' '}
                  {new Date(attendance.createdDate).toLocaleTimeString()}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Modified Date:</div>
                <div className="col-sm-8">
                  {attendance.modifiedDate ? (
                    <>
                      {new Date(attendance.modifiedDate).toLocaleDateString()} at{' '}
                      {new Date(attendance.modifiedDate).toLocaleTimeString()}
                    </>
                  ) : 'Not modified'}
                </div>
              </div>

              <div className="row">
                <div className="col-sm-4 fw-bold">Is Active:</div>
                <div className="col-sm-8">
                  <span className={`badge ${attendance.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {attendance.isActive ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceDetail;
