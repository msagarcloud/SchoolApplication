import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EmployeeProfessionalQualificationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [qualification, setQualification] = useState({
    employeeId: '',
    qualification: '',
    specialization: '',
    institute: '',
    university: '',
    yearOfPassing: '',
    percentage: '',
    grade: '',
    certificateFile: null,
    certificateFileName: '',
    isVerified: false,
    verificationDate: '',
    remarks: ''
  });

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    fetchEmployees();
    if (isEdit) {
      fetchQualification();
    }
  }, [id, isEdit]);

  const fetchEmployees = async () => {
    try {
      // Mock data - replace with actual API call
      const mockEmployees = [
        { id: 1, name: 'John Doe', employeeCode: 'EMP001', department: 'IT' },
        { id: 2, name: 'Jane Smith', employeeCode: 'EMP002', department: 'HR' },
        { id: 3, name: 'Mike Johnson', employeeCode: 'EMP003', department: 'Finance' }
      ];
      setEmployees(mockEmployees);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    }
  };

  const fetchQualification = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockQualification = {
        id: 1,
        employeeId: 1,
        qualification: 'Master of Computer Applications',
        specialization: 'Software Engineering',
        institute: 'University of Technology',
        university: 'State University',
        yearOfPassing: '2020',
        percentage: '85',
        grade: 'A+',
        certificateFileName: 'MCA_Certificate.pdf',
        isVerified: true,
        verificationDate: '2024-01-15',
        remarks: 'Professional qualification verified with original documents'
      };
      setQualification(mockQualification);
    } catch (err) {
      setError(err.message || 'Failed to fetch qualification details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQualification(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setQualification(prev => ({
        ...prev,
        certificateFile: file,
        certificateFileName: file.name
      }));
      
      // Create preview for image files
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      // Validate required fields
      if (!qualification.employeeId || !qualification.qualification || !qualification.institute) {
        setError('Please fill in all required fields');
        return;
      }
      
      // Validate year of passing
      const currentYear = new Date().getFullYear();
      const yearOfPassing = parseInt(qualification.yearOfPassing);
      if (yearOfPassing < 1950 || yearOfPassing > currentYear) {
        setError(`Year of passing must be between 1950 and ${currentYear}`);
        return;
      }
      
      // Validate percentage
      if (qualification.percentage && (qualification.percentage < 0 || qualification.percentage > 100)) {
        setError('Percentage must be between 0 and 100');
        return;
      }
      
      // Replace with actual API call
      console.log('Submitting qualification:', qualification);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/employee-professional-qualifications');
    } catch (err) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'add'} qualification`);
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
          <h2>{isEdit ? 'Edit Professional Qualification' : 'Add Professional Qualification'}</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/employee-professional-qualifications">Professional Qualifications</Link>
              </li>
              <li className="breadcrumb-item active">
                {isEdit ? 'Edit' : 'Add'}
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/employee-professional-qualifications" className="btn btn-outline-secondary me-2">
            <i className="bi bi-x-lg me-2"></i>
            Cancel
          </Link>
          <button 
            type="submit" 
            form="qualification-form"
            className="btn btn-primary"
            disabled={loading}
          >
            <i className="bi bi-check-lg me-2"></i>
            {loading ? 'Saving...' : (isEdit ? 'Update' : 'Save')}
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
        <form id="qualification-form" onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="employeeId" className="form-label">
                    Employee <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="employeeId"
                    name="employeeId"
                    value={qualification.employeeId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Employee</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name} ({employee.employeeCode}) - {employee.department}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="qualification" className="form-label">
                    Qualification <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="qualification"
                    name="qualification"
                    value={qualification.qualification}
                    onChange={handleInputChange}
                    placeholder="e.g., Master of Computer Applications"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="specialization" className="form-label">
                    Specialization
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="specialization"
                    name="specialization"
                    value={qualification.specialization}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Engineering"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="institute" className="form-label">
                    Institute <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="institute"
                    name="institute"
                    value={qualification.institute}
                    onChange={handleInputChange}
                    placeholder="e.g., University of Technology"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="university" className="form-label">
                    University
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="university"
                    name="university"
                    value={qualification.university}
                    onChange={handleInputChange}
                    placeholder="e.g., State University"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="yearOfPassing" className="form-label">
                    Year of Passing <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="yearOfPassing"
                    name="yearOfPassing"
                    value={qualification.yearOfPassing}
                    onChange={handleInputChange}
                    min="1950"
                    max={new Date().getFullYear()}
                    placeholder="e.g., 2020"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="percentage" className="form-label">
                    Percentage (%)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="percentage"
                    name="percentage"
                    value={qualification.percentage}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="e.g., 85"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="grade" className="form-label">
                    Grade
                  </label>
                  <select
                    className="form-select"
                    id="grade"
                    name="grade"
                    value={qualification.grade}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Grade</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="First Class">First Class</option>
                    <option value="Second Class">Second Class</option>
                    <option value="Distinction">Distinction</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="certificateFile" className="form-label">
                    Certificate File
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="certificateFile"
                    name="certificateFile"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                  <div className="form-text">
                    Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB)
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="remarks" className="form-label">
                    Remarks
                  </label>
                  <textarea
                    className="form-control"
                    id="remarks"
                    name="remarks"
                    rows="3"
                    value={qualification.remarks}
                    onChange={handleInputChange}
                    placeholder="Enter any additional remarks..."
                  />
                </div>
              </div>
            </div>

            {/* File Preview */}
            {filePreview && (
              <div className="row mt-3">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">Certificate Preview</h6>
                    </div>
                    <div className="card-body text-center">
                      <img 
                        src={filePreview} 
                        alt="Certificate preview" 
                        className="img-fluid"
                        style={{ maxHeight: '300px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Verification Section (only for edit mode) */}
            {isEdit && (
              <div className="row mt-3">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">Verification Details</h6>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="isVerified"
                              name="isVerified"
                              checked={qualification.isVerified}
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="isVerified">
                              Qualification is Verified
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="verificationDate" className="form-label">
                              Verification Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="verificationDate"
                              name="verificationDate"
                              value={qualification.verificationDate}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
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

export default EmployeeProfessionalQualificationForm;
