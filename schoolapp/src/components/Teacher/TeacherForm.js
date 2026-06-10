import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import teacherApiService from '../../services/teacherApiService';

const TeacherForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [teacher, setTeacher] = useState({
    teacherName: '',
    employeeCode: '',
    email: '',
    phone: '',
    subject: '',
    department: '',
    qualification: '',
    experience: '',
    joiningDate: '',
    status: 'Active',
    specialization: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    nationality: '',
    religion: '',
    maritalStatus: '',
    classesAssigned: [],
    notes: ''
  });

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
    if (isEdit) {
      fetchTeacher();
    }
  }, [id, isEdit]);

  const fetchClasses = async () => {
    try {
      const data = await teacherApiService.getAvailableClasses();
      setClasses(data);
    } catch (err) {
      console.error('Failed to fetch classes:', err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const data = await teacherApiService.getSubjects();
      setSubjects(data);
    } catch (err) {
      console.error('Failed to fetch subjects:', err);
    }
  };

  const fetchTeacher = async () => {
    try {
      setLoading(true);
      const data = await teacherApiService.getTeacherById(id);
      setTeacher(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch teacher details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setTeacher(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
  };

  const handleClassesChange = (e) => {
    const selectedClasses = Array.from(e.target.selectedOptions, option => option.value);
    setTeacher(prev => ({
      ...prev,
      classesAssigned: selectedClasses
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      // Validate required fields
      if (!teacher.teacherName || !teacher.email || !teacher.subject || !teacher.department) {
        setError('Please fill in all required fields');
        return;
      }
      
      // Validate email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(teacher.email)) {
        setError('Please enter a valid email address');
        return;
      }
      
      // Validate phone format
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (teacher.phone && !phoneRegex.test(teacher.phone)) {
        setError('Please enter a valid phone number');
        return;
      }
      
      // Call appropriate API method
      if (isEdit) {
        await teacherApiService.updateTeacher(id, teacher);
      } else {
        await teacherApiService.createTeacher(teacher);
      }
      
      navigate('/teachers');
    } catch (err) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} teacher`);
    } finally {
      setLoading(false);
    }
  };

  const availableClasses = classes;

  const availableSubjects = subjects;

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
          <h2>{isEdit ? 'Edit Teacher' : 'Add New Teacher'}</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/teachers">Teacher Management</Link>
              </li>
              <li className="breadcrumb-item active">
                {isEdit ? 'Edit' : 'Create'}
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/teachers" className="btn btn-outline-secondary me-2">
            <i className="bi bi-x-lg me-2"></i>
            Cancel
          </Link>
          <button 
            type="submit" 
            form="teacher-form"
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
        <form id="teacher-form" onSubmit={handleSubmit}>
          <div className="card-body">
            {/* Basic Information */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Basic Information</h5>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="teacherName" className="form-label">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="teacherName"
                    name="teacherName"
                    value={teacher.teacherName}
                    onChange={handleInputChange}
                    placeholder="e.g., Dr. Sarah Johnson"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="employeeCode" className="form-label">
                    Employee Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="employeeCode"
                    name="employeeCode"
                    value={teacher.employeeCode}
                    onChange={handleInputChange}
                    placeholder="e.g., TCH001"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={teacher.email}
                    onChange={handleInputChange}
                    placeholder="e.g., teacher@school.edu"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={teacher.phone}
                    onChange={handleInputChange}
                    placeholder="e.g., +1-234-567-8901"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Professional Information</h5>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={teacher.subject}
                    onChange={handleInputChange}
                    placeholder="e.g., Mathematics"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="department" className="form-label">
                    Department <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="department"
                    name="department"
                    value={teacher.department}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Science">Science</option>
                    <option value="Languages">Languages</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Social Studies">Social Studies</option>
                    <option value="Arts">Arts</option>
                    <option value="Physical Education">Physical Education</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="qualification" className="form-label">
                    Highest Qualification
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="qualification"
                    name="qualification"
                    value={teacher.qualification}
                    onChange={handleInputChange}
                    placeholder="e.g., Ph.D. in Mathematics"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="experience" className="form-label">
                    Experience
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="experience"
                    name="experience"
                    value={teacher.experience}
                    onChange={handleInputChange}
                    placeholder="e.g., 15 Years"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="joiningDate" className="form-label">
                    Joining Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="joiningDate"
                    name="joiningDate"
                    value={teacher.joiningDate}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split('T')[0]}
                  />
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
                    value={teacher.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="specialization" className="form-label">
                    Specialization
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="specialization"
                    name="specialization"
                    value={teacher.specialization}
                    onChange={handleInputChange}
                    placeholder="e.g., Advanced Calculus, Statistics"
                  />
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Personal Information</h5>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="dateOfBirth" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={teacher.dateOfBirth}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    value={teacher.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="bloodGroup" className="form-label">
                    Blood Group
                  </label>
                  <select
                    className="form-select"
                    id="bloodGroup"
                    name="bloodGroup"
                    value={teacher.bloodGroup}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="nationality" className="form-label">
                    Nationality
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nationality"
                    name="nationality"
                    value={teacher.nationality}
                    onChange={handleInputChange}
                    placeholder="e.g., American"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="maritalStatus" className="form-label">
                    Marital Status
                  </label>
                  <select
                    className="form-select"
                    id="maritalStatus"
                    name="maritalStatus"
                    value={teacher.maritalStatus}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Address and Emergency Contact */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Contact Information</h5>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    rows="2"
                    value={teacher.address}
                    onChange={handleInputChange}
                    placeholder="Enter full address..."
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="emergencyContact" className="form-label">
                    Emergency Contact Person
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={teacher.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="Emergency contact name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="emergencyPhone" className="form-label">
                    Emergency Contact Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="emergencyPhone"
                    name="emergencyPhone"
                    value={teacher.emergencyPhone}
                    onChange={handleInputChange}
                    placeholder="Emergency contact phone"
                  />
                </div>
              </div>
            </div>

            {/* Class Assignment */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Class Assignment</h5>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="classesAssigned" className="form-label">
                    Classes Assigned
                  </label>
                  <select
                    className="form-select"
                    id="classesAssigned"
                    name="classesAssigned"
                    multiple
                    value={teacher.classesAssigned}
                    onChange={handleClassesChange}
                    style={{ height: '120px' }}
                  >
                    {availableClasses.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                  <div className="form-text">
                    Hold Ctrl/Cmd to select multiple classes
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="notes" className="form-label">
                    Additional Notes
                  </label>
                  <textarea
                    className="form-control"
                    id="notes"
                    name="notes"
                    rows="3"
                    value={teacher.notes}
                    onChange={handleInputChange}
                    placeholder="Enter any additional notes about the teacher..."
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherForm;
