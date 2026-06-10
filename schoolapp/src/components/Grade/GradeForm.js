import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const GradeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [grade, setGrade] = useState({
    studentId: '',
    className: '',
    subject: '',
    examType: '',
    maxMarks: '',
    obtainedMarks: '',
    examDate: '',
    remarks: '',
    teacherName: ''
  });

  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
    fetchClasses();
    fetchSubjects();
    fetchTeachers();
    if (isEdit) {
      fetchGrade();
    }
  }, [id, isEdit]);

  const fetchStudents = async () => {
    try {
      // Mock data - replace with actual API call
      const mockStudents = [
        { id: 1, name: 'John Smith', rollNumber: 'STU001' },
        { id: 2, name: 'Emily Davis', rollNumber: 'STU002' },
        { id: 3, name: 'Michael Chen', rollNumber: 'STU003' }
      ];
      setStudents(mockStudents);
    } catch (err) {
      console.error('Failed to fetch students:', err);
    }
  };

  const fetchClasses = async () => {
    try {
      const mockClasses = [
        'Class 1A', 'Class 1B', 'Class 2A', 'Class 2B', 'Class 3A', 'Class 3B',
        'Class 4A', 'Class 4B', 'Class 5A', 'Class 5B', 'Class 6A', 'Class 6B',
        'Class 7A', 'Class 7B', 'Class 8A', 'Class 8B', 'Class 9A', 'Class 9B', 'Class 9C',
        'Class 10A', 'Class 10B', 'Class 10C', 'Class 11A', 'Class 11B', 'Class 12A', 'Class 12B'
      ];
      setClasses(mockClasses);
    } catch (err) {
      console.error('Failed to fetch classes:', err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const mockSubjects = [
        'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History',
        'Geography', 'Computer Science', 'Physical Education', 'Art', 'Music'
      ];
      setSubjects(mockSubjects);
    } catch (err) {
      console.error('Failed to fetch subjects:', err);
    }
  };

  const fetchTeachers = async () => {
    try {
      const mockTeachers = [
        'Dr. Sarah Johnson', 'Mr. Michael Chen', 'Ms. Emily Davis', 'Dr. Robert Wilson'
      ];
      setTeachers(mockTeachers);
    } catch (err) {
      console.error('Failed to fetch teachers:', err);
    }
  };

  const fetchGrade = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockGrade = {
        id: 1,
        studentId: 1,
        className: 'Class 10A',
        subject: 'Mathematics',
        examType: 'Final Exam',
        maxMarks: 100,
        obtainedMarks: 95,
        examDate: '2024-01-15',
        remarks: 'Excellent performance',
        teacherName: 'Dr. Sarah Johnson'
      };
      setGrade(mockGrade);
    } catch (err) {
      setError(err.message || 'Failed to fetch grade details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setGrade(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : parseInt(value)) : value
    }));
  };

  const calculateGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 85) return 'A';
    if (percentage >= 80) return 'B+';
    if (percentage >= 75) return 'B';
    if (percentage >= 70) return 'C+';
    if (percentage >= 65) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const calculatePercentage = () => {
    if (grade.maxMarks && grade.obtainedMarks) {
      const percentage = (grade.obtainedMarks / grade.maxMarks) * 100;
      return percentage.toFixed(2);
    }
    return 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      // Validate required fields
      if (!grade.studentId || !grade.className || !grade.subject || !grade.examType) {
        setError('Please fill in all required fields');
        return;
      }
      
      // Validate marks
      const maxMarks = parseInt(grade.maxMarks);
      const obtainedMarks = parseInt(grade.obtainedMarks);
      
      if (!maxMarks || maxMarks <= 0) {
        setError('Maximum marks must be greater than 0');
        return;
      }
      
      if (obtainedMarks < 0 || obtainedMarks > maxMarks) {
        setError('Obtained marks must be between 0 and maximum marks');
        return;
      }
      
      // Calculate percentage and grade
      const percentage = calculatePercentage();
      const calculatedGrade = calculateGrade(percentage);
      
      const gradeData = {
        ...grade,
        percentage: parseFloat(percentage),
        grade: calculatedGrade
      };
      
      // Replace with actual API call
      console.log('Submitting grade:', gradeData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/grades');
    } catch (err) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} grade`);
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

  const percentage = calculatePercentage();
  const calculatedGrade = calculateGrade(percentage);

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{isEdit ? 'Edit Grade' : 'Add New Grade'}</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/grades">Grade Management</Link>
              </li>
              <li className="breadcrumb-item active">
                {isEdit ? 'Edit' : 'Create'}
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/grades" className="btn btn-outline-secondary me-2">
            <i className="bi bi-x-lg me-2"></i>
            Cancel
          </Link>
          <button 
            type="submit" 
            form="grade-form"
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
        <form id="grade-form" onSubmit={handleSubmit}>
          <div className="card-body">
            {/* Student Information */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Student Information</h5>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="studentId" className="form-label">
                    Student <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="studentId"
                    name="studentId"
                    value={grade.studentId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Student</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} ({student.rollNumber})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="className" className="form-label">
                    Class <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="className"
                    name="className"
                    value={grade.className}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Exam Information */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Exam Information</h5>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="subject"
                    name="subject"
                    value={grade.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="examType" className="form-label">
                    Exam Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="examType"
                    name="examType"
                    value={grade.examType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Exam Type</option>
                    <option value="Final Exam">Final Exam</option>
                    <option value="Mid Term">Mid Term</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Assignment">Assignment</option>
                    <option value="Practical">Practical</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="examDate" className="form-label">
                    Exam Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="examDate"
                    name="examDate"
                    value={grade.examDate}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>

            {/* Marks Information */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Marks Information</h5>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="maxMarks" className="form-label">
                    Maximum Marks <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="maxMarks"
                    name="maxMarks"
                    value={grade.maxMarks}
                    onChange={handleInputChange}
                    placeholder="e.g., 100"
                    min="1"
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="obtainedMarks" className="form-label">
                    Obtained Marks <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="obtainedMarks"
                    name="obtainedMarks"
                    value={grade.obtainedMarks}
                    onChange={handleInputChange}
                    placeholder="e.g., 85"
                    min="0"
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Calculated Results</label>
                  <div className="p-2 bg-light rounded">
                    <div className="d-flex justify-content-between">
                      <span>Percentage:</span>
                      <strong className={percentage >= 70 ? 'text-success' : percentage >= 50 ? 'text-warning' : 'text-danger'}>
                        {percentage}%
                      </strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Grade:</span>
                      <strong className={`bg-${calculatedGrade === 'A+' || calculatedGrade === 'A' ? 'success' : calculatedGrade === 'B+' || calculatedGrade === 'B' ? 'info' : calculatedGrade === 'C+' || calculatedGrade === 'C' ? 'warning' : 'danger'} text-white px-2 py-1 rounded`}>
                        {calculatedGrade}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Additional Information</h5>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="teacherName" className="form-label">
                    Teacher Name
                  </label>
                  <select
                    className="form-select"
                    id="teacherName"
                    name="teacherName"
                    value={grade.teacherName}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map((teacher) => (
                      <option key={teacher} value={teacher}>{teacher}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="remarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="remarks"
                    name="remarks"
                    value={grade.remarks}
                    onChange={handleInputChange}
                    placeholder="Enter remarks..."
                  />
                </div>
              </div>
            </div>

            {/* Grade Reference */}
            <div className="alert alert-info" role="alert">
              <h6 className="alert-heading">
                <i className="bi bi-info-circle me-2"></i>
                Grade Reference
              </h6>
              <div className="row">
                <div className="col-md-6">
                  <ul className="mb-0">
                    <li><strong>A+</strong> = 90% - 100%</li>
                    <li><strong>A</strong> = 85% - 89.99%</li>
                    <li><strong>B+</strong> = 80% - 84.99%</li>
                    <li><strong>B</strong> = 75% - 79.99%</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="mb-0">
                    <li><strong>C+</strong> = 70% - 74.99%</li>
                    <li><strong>C</strong> = 65% - 69.99%</li>
                    <li><strong>D</strong> = 60% - 64.99%</li>
                    <li><strong>F</strong> = Below 60%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GradeForm;
