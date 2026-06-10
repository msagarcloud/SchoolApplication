import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const GradeDetail = () => {
  const { id } = useParams();
  const [grade, setGrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGrade();
  }, [id]);

  const fetchGrade = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockGrade = {
        id: 1,
        studentId: 1,
        studentName: 'John Smith',
        rollNumber: 'STU001',
        className: 'Class 10A',
        subject: 'Mathematics',
        examType: 'Final Exam',
        maxMarks: 100,
        obtainedMarks: 95,
        percentage: 95,
        grade: 'A+',
        remarks: 'Excellent performance in all topics',
        examDate: '2024-01-15',
        teacherName: 'Dr. Sarah Johnson',
        addedDate: '2024-01-16',
        addedBy: 'Dr. Sarah Johnson',
        lastModified: '2024-01-16',
        classAverage: 82.5,
        subjectAverage: 85.2,
        studentRank: 3,
        totalStudents: 45,
        gradeBreakdown: {
          'Algebra': 48,
          'Geometry': 47,
          'Trigonometry': 45,
          'Statistics': 46,
          'Calculus': 44
        },
        performanceHistory: [
          { exam: 'Mid Term', marks: 88, percentage: 88, grade: 'A', date: '2023-10-15' },
          { exam: 'Quiz 1', marks: 92, percentage: 92, grade: 'A+', date: '2023-09-20' },
          { exam: 'Assignment 1', marks: 90, percentage: 90, grade: 'A+', date: '2023-09-10' }
        ],
        attendance: {
          totalClasses: 120,
          attendedClasses: 118,
          percentage: 98.33
        }
      };
      setGrade(mockGrade);
    } catch (err) {
      setError(err.message || 'Failed to fetch grade details');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getGradeBadge = (grade) => {
    const gradeColors = {
      'A+': 'success',
      'A': 'success',
      'B+': 'info',
      'B': 'info',
      'C+': 'warning',
      'C': 'warning',
      'D': 'danger',
      'F': 'danger'
    };
    
    const color = gradeColors[grade] || 'secondary';
    
    return (
      <span className={`badge bg-${color} fs-6`}>{grade}</span>
    );
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 80) return 'text-info';
    if (percentage >= 70) return 'text-warning';
    return 'text-danger';
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
        <Link to="/grades" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Grades
        </Link>
      </div>
    );
  }

  if (!grade) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Grade record not found
        </div>
        <Link to="/grades" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Grades
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Grade Details</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/grades">Grade Management</Link>
              </li>
              <li className="breadcrumb-item active">Grade Details</li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/grades" className="btn btn-outline-secondary me-2">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <button className="btn btn-outline-info me-2" onClick={handlePrint}>
            <i className="bi bi-printer me-2"></i>
            Print
          </button>
          <Link to={`/grades/${id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
        </div>
      </div>

      {/* Grade Header */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center mb-2">
                <h3 className="mb-0 me-3">{grade.studentName}</h3>
                <span className="badge bg-primary me-2">{grade.className}</span>
                <span className="badge bg-info me-2">{grade.subject}</span>
                <span className="badge bg-secondary me-2">{grade.examType}</span>
                {getGradeBadge(grade.grade)}
              </div>
              <p className="text-muted mb-2">
                Roll No: {grade.rollNumber} | Exam Date: {grade.examDate} | Teacher: {grade.teacherName}
              </p>
              <div className="d-flex gap-3">
                <small><i className="bi bi-trophy me-1"></i> Rank: {grade.studentRank}/{grade.totalStudents}</small>
                <small><i className="bi bi-graph-up me-1"></i> Class Average: {grade.classAverage}%</small>
                <small><i className="bi bi-book me-1"></i> Subject Average: {grade.subjectAverage}%</small>
              </div>
            </div>
            <div className="col-md-4 text-end">
              <div className="row g-2">
                <div className="col-6">
                  <div className="card bg-light">
                    <div className="card-body text-center py-2">
                      <h5 className={`mb-0 ${getPercentageColor(grade.percentage)}`}>{grade.percentage}%</h5>
                      <small className="text-muted">Percentage</small>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card bg-light">
                    <div className="card-body text-center py-2">
                      <h5 className="mb-0">{grade.obtainedMarks}/{grade.maxMarks}</h5>
                      <small className="text-muted">Marks</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          {/* Grade Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Grade Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Student Name</label>
                    <p className="form-control-plaintext">
                      <strong>{grade.studentName}</strong>
                      <div className="small text-muted">Roll No: {grade.rollNumber}</div>
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Class</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-primary">{grade.className}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Subject</label>
                    <p className="form-control-plaintext">{grade.subject}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Exam Type</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-info">{grade.examType}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Maximum Marks</label>
                    <p className="form-control-plaintext">{grade.maxMarks}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Obtained Marks</label>
                    <p className="form-control-plaintext">
                      <span className={`fw-bold ${getPercentageColor(grade.percentage)}`}>
                        {grade.obtainedMarks}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Percentage</label>
                    <p className="form-control-plaintext">
                      <span className={`fw-bold ${getPercentageColor(grade.percentage)}`}>
                        {grade.percentage}%
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Grade</label>
                    <p className="form-control-plaintext">
                      {getGradeBadge(grade.grade)}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Teacher</label>
                    <p className="form-control-plaintext">{grade.teacherName}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label text-muted">Remarks</label>
                    <p className="form-control-plaintext">{grade.remarks || 'No remarks provided'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grade Breakdown */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Topic-wise Performance</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Topic</th>
                      <th>Marks Obtained</th>
                      <th>Maximum Marks</th>
                      <th>Percentage</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(grade.gradeBreakdown).map(([topic, marks]) => {
                      const topicMaxMarks = 50; // Assuming each topic is out of 50
                      const topicPercentage = ((marks / topicMaxMarks) * 100).toFixed(1);
                      const topicGrade = topicPercentage >= 90 ? 'A+' : topicPercentage >= 80 ? 'A' : topicPercentage >= 70 ? 'B+' : topicPercentage >= 60 ? 'B' : 'C';
                      
                      return (
                        <tr key={topic}>
                          <td>{topic}</td>
                          <td>{marks}</td>
                          <td>{topicMaxMarks}</td>
                          <td>
                            <span className={getPercentageColor(topicPercentage)}>
                              {topicPercentage}%
                            </span>
                          </td>
                          <td>{getGradeBadge(topicGrade)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Performance History */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Performance History</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Exam</th>
                      <th>Date</th>
                      <th>Marks</th>
                      <th>Percentage</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grade.performanceHistory.map((history, index) => (
                      <tr key={index}>
                        <td>{history.exam}</td>
                        <td>{history.date}</td>
                        <td>{history.marks}</td>
                        <td>
                          <span className={getPercentageColor(history.percentage)}>
                            {history.percentage}%
                          </span>
                        </td>
                        <td>{getGradeBadge(history.grade)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Attendance */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Attendance</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Total Classes</label>
                    <p className="form-control-plaintext">{grade.attendance.totalClasses}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Attended Classes</label>
                    <p className="form-control-plaintext">{grade.attendance.attendedClasses}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Attendance Percentage</label>
                    <p className="form-control-plaintext">
                      <span className={grade.attendance.percentage >= 90 ? 'text-success' : grade.attendance.percentage >= 75 ? 'text-warning' : 'text-danger'}>
                        {grade.attendance.percentage}%
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          {/* Performance Summary */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Performance Summary</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span>Class Rank</span>
                  <strong>{grade.studentRank} / {grade.totalStudents}</strong>
                </div>
                <div className="progress mt-1">
                  <div 
                    className="progress-bar bg-success" 
                    style={{ width: `${((grade.totalStudents - grade.studentRank + 1) / grade.totalStudents) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Class Average</span>
                  <strong>{grade.classAverage}%</strong>
                </div>
                <div className="progress mt-1">
                  <div 
                    className="progress-bar bg-info" 
                    style={{ width: `${grade.classAverage}%` }}
                  ></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Subject Average</span>
                  <strong>{grade.subjectAverage}%</strong>
                </div>
                <div className="progress mt-1">
                  <div 
                    className="progress-bar bg-warning" 
                    style={{ width: `${grade.subjectAverage}%` }}
                  ></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Your Score</span>
                  <strong className={getPercentageColor(grade.percentage)}>{grade.percentage}%</strong>
                </div>
                <div className="progress mt-1">
                  <div 
                    className="progress-bar bg-primary" 
                    style={{ width: `${grade.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link to={`/grades/${id}/edit`} className="btn btn-warning">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Grade
                </Link>
                <button 
                  className="btn btn-outline-danger"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this grade record?')) {
                      // Implement delete functionality
                      window.alert('Delete functionality to be implemented');
                    }
                  }}
                >
                  <i className="bi bi-trash me-2"></i>
                  Delete Grade
                </button>
                <button className="btn btn-outline-info" onClick={handlePrint}>
                  <i className="bi bi-printer me-2"></i>
                  Print Report
                </button>
                <button className="btn btn-outline-success">
                  <i className="bi bi-download me-2"></i>
                  Download PDF
                </button>
                <button className="btn btn-outline-primary">
                  <i className="bi bi-share me-2"></i>
                  Send to Parent
                </button>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Record Timeline</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-muted">Grade Added</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-calendar-plus me-2"></i>
                  {grade.addedDate}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Added By</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-person-plus me-2"></i>
                  {grade.addedBy}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Last Modified</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-pencil-square me-2"></i>
                  {grade.lastModified}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeDetail;
