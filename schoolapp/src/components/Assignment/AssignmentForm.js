import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import assignmentService from '../../services/assignmentService';

const AssignmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [assignment, setAssignment] = useState({
    title: '',
    description: '',
    className: '',
    subject: '',
    teacherName: '',
    assignedDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    maxMarks: '',
    assignmentType: 'Homework',
    instructions: '',
    attachments: [],
    isPublished: false
  });

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchClasses = useCallback(async () => {
    try {
      const response = await assignmentService.getClasses();
      setClasses(response.data || response);
    } catch (err) {
      console.error('Failed to fetch classes:', err);
      setError('Failed to fetch classes');
    }
  }, []);

  const fetchSubjects = useCallback(async () => {
    try {
      const response = await assignmentService.getSubjects();
      setSubjects(response.data || response);
    } catch (err) {
      console.error('Failed to fetch subjects:', err);
      setError('Failed to fetch subjects');
    }
  }, []);

  const fetchTeachers = useCallback(async () => {
    try {
      const response = await assignmentService.getTeachers();
      setTeachers(response.data || response);
    } catch (err) {
      console.error('Failed to fetch teachers:', err);
      setError('Failed to fetch teachers');
    }
  }, []);

  const fetchAssignment = useCallback(async () => {
    try {
      setLoading(true);
      const response = await assignmentService.getAssignmentById(id);
      setAssignment(response.data || response);
    } catch (err) {
      setError(err.message || 'Failed to fetch assignment details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
    fetchTeachers();
    if (isEdit) {
      fetchAssignment();
    }
  }, [id, isEdit, fetchClasses, fetchSubjects, fetchTeachers, fetchAssignment]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setAssignment(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      // Validate required fields
      if (!assignment.title || !assignment.className || !assignment.subject || !assignment.dueDate) {
        setError('Please fill in all required fields');
        return;
      }
      
      // Validate due date
      const dueDate = new Date(assignment.dueDate);
      const assignedDate = new Date(assignment.assignedDate);
      if (dueDate <= assignedDate) {
        setError('Due date must be after assigned date');
        return;
      }
      
      // Validate max marks
      const maxMarks = parseInt(assignment.maxMarks);
      if (!maxMarks || maxMarks <= 0) {
        setError('Maximum marks must be greater than 0');
        return;
      }
      
      // Create or update assignment via API
      if (isEdit) {
        await assignmentService.updateAssignment(id, assignment);
      } else {
        await assignmentService.createAssignment(assignment);
      }
      
      navigate('/assignments');
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{isEdit ? 'Edit Assignment' : 'Create Assignment'}</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/assignments">Assignment Management</Link>
              </li>
              <li className="breadcrumb-item active">
                {isEdit ? 'Edit' : 'Create'}
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/assignments" className="btn btn-outline-secondary me-2">
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

      <div className="card">
        <form id="assignment-form" onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Basic Information</h5>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Assignment Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={assignment.title}
                    onChange={handleInputChange}
                    placeholder="Enter assignment title"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="assignmentType" className="form-label">
                    Assignment Type
                  </label>
                  <select
                    className="form-select"
                    id="assignmentType"
                    name="assignmentType"
                    value={assignment.assignmentType}
                    onChange={handleInputChange}
                  >
                    <option value="Homework">Homework</option>
                    <option value="Project">Project</option>
                    <option value="Lab Report">Lab Report</option>
                    <option value="Essay">Essay</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Presentation">Presentation</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={assignment.description}
                    onChange={handleInputChange}
                    placeholder="Enter assignment description"
                  />
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <h5 className="col-12 mb-3">Assignment Details</h5>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="className" className="form-label">
                    Class <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="className"
                    name="className"
                    value={assignment.className}
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
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="subject"
                    name="subject"
                    value={assignment.subject}
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
                  <label htmlFor="teacherName" className="form-label">
                    Teacher
                  </label>
                  <select
                    className="form-select"
                    id="teacherName"
                    name="teacherName"
                    value={assignment.teacherName}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map((teacher) => (
                      <option key={teacher} value={teacher}>{teacher}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="assignedDate" className="form-label">
                    Assigned Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="assignedDate"
                    name="assignedDate"
                    value={assignment.assignedDate}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="dueDate" className="form-label">
                    Due Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    name="dueDate"
                    value={assignment.dueDate}
                    onChange={handleInputChange}
                    min={assignment.assignedDate}
                    required
                  />
                </div>
              </div>
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
                    value={assignment.maxMarks}
                    onChange={handleInputChange}
                    placeholder="e.g., 100"
                    min="1"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <h5 className="col-12 mb-3">Instructions</h5>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="instructions" className="form-label">
                    Assignment Instructions
                  </label>
                  <textarea
                    className="form-control"
                    id="instructions"
                    name="instructions"
                    rows="4"
                    value={assignment.instructions}
                    onChange={handleInputChange}
                    placeholder="Enter detailed instructions for students..."
                  />
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <h5 className="col-12 mb-3">Publishing Options</h5>
              <div className="col-md-6">
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isPublished"
                      name="isPublished"
                      checked={assignment.isPublished}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="isPublished">
                      Publish Assignment Immediately
                    </label>
                    <div className="form-text">
                      If unchecked, assignment will be saved as draft
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-info" role="alert">
              <h6 className="alert-heading">
                <i className="bi bi-info-circle me-2"></i>
                Assignment Guidelines
              </h6>
              <ul className="mb-0">
                <li>Clearly state the assignment objectives and requirements</li>
                <li>Provide detailed instructions for students to follow</li>
                <li>Set appropriate due dates considering student workload</li>
                <li>Define clear marking criteria and rubric</li>
                <li>Consider different learning styles and abilities</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentForm;
