import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const DepartmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [department, setDepartment] = useState({
    departmentName: '',
    departmentCode: '',
    hodEmployeeId: '',
    description: '',
    isActive: true,
    establishedDate: '',
    floorNumber: '',
    block: '',
    contactNumber: '',
    emailId: '',
    totalSeats: '',
    currentStrength: ''
  });

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployees();
    if (isEdit) {
      fetchDepartment();
    }
  }, [id, isEdit]);

  const fetchEmployees = async () => {
    try {
      // Mock data - replace with actual API call
      const mockEmployees = [
        { id: 101, name: 'Dr. John Smith', employeeCode: 'EMP101', designation: 'Professor' },
        { id: 102, name: 'Dr. Sarah Johnson', employeeCode: 'EMP102', designation: 'Associate Professor' },
        { id: 103, name: 'Dr. Mike Wilson', employeeCode: 'EMP103', designation: 'Professor' }
      ];
      setEmployees(mockEmployees);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    }
  };

  const fetchDepartment = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockDepartment = {
        id: 1,
        departmentName: 'Computer Science',
        departmentCode: 'CS',
        hodEmployeeId: 101,
        description: 'Department of Computer Science and Engineering offering undergraduate and postgraduate programs.',
        isActive: true,
        establishedDate: '2010-06-15',
        floorNumber: '2nd Floor',
        block: 'A Block',
        contactNumber: '+1-123-456-7890',
        emailId: 'cs.department@school.edu',
        totalSeats: 180,
        currentStrength: 150
      };
      setDepartment(mockDepartment);
    } catch (err) {
      setError(err.message || 'Failed to fetch department details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDepartment(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      // Validate required fields
      if (!department.departmentName || !department.departmentCode) {
        setError('Department name and code are required');
        return;
      }
      
      // Validate department code format
      if (!/^[A-Z]{2,4}$/.test(department.departmentCode)) {
        setError('Department code should be 2-4 uppercase letters');
        return;
      }
      
      // Validate email format if provided
      if (department.emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(department.emailId)) {
        setError('Please enter a valid email address');
        return;
      }
      
      // Replace with actual API call
      console.log('Submitting department:', department);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/departments');
    } catch (err) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} department`);
    } finally {
      setLoading(false);
    }
  };

  const generateDepartmentCode = (name) => {
    if (!name) return '';
    // Generate code from name - take first letters of words
    const words = name.trim().split(/\s+/);
    let code = '';
    words.forEach(word => {
      if (word.length > 0) {
        code += word[0].toUpperCase();
      }
    });
    // Limit to 4 characters
    return code.substring(0, 4);
  };

  const handleDepartmentNameChange = (e) => {
    const name = e.target.value;
    setDepartment(prev => ({
      ...prev,
      departmentName: name,
      departmentCode: prev.departmentCode || generateDepartmentCode(name)
    }));
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
          <h2>{isEdit ? 'Edit Department' : 'Create New Department'}</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/departments">Departments</Link>
              </li>
              <li className="breadcrumb-item active">
                {isEdit ? 'Edit' : 'Create'}
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/departments" className="btn btn-outline-secondary me-2">
            <i className="bi bi-x-lg me-2"></i>
            Cancel
          </Link>
          <button 
            type="submit" 
            form="department-form"
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
        <form id="department-form" onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="departmentName" className="form-label">
                    Department Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="departmentName"
                    name="departmentName"
                    value={department.departmentName}
                    onChange={handleDepartmentNameChange}
                    placeholder="e.g., Computer Science"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="departmentCode" className="form-label">
                    Department Code <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="departmentCode"
                    name="departmentCode"
                    value={department.departmentCode}
                    onChange={handleInputChange}
                    placeholder="e.g., CS"
                    pattern="[A-Z]{2,4}"
                    title="Department code should be 2-4 uppercase letters"
                    required
                  />
                  <div className="form-text">2-4 uppercase letters (e.g., CS, EC, ME)</div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="hodEmployeeId" className="form-label">
                    Head of Department (HOD)
                  </label>
                  <select
                    className="form-select"
                    id="hodEmployeeId"
                    name="hodEmployeeId"
                    value={department.hodEmployeeId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select HOD</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name} ({employee.employeeCode}) - {employee.designation}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="establishedDate" className="form-label">
                    Established Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="establishedDate"
                    name="establishedDate"
                    value={department.establishedDate}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split('T')[0]}
                  />
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
                    value={department.description}
                    onChange={handleInputChange}
                    placeholder="Enter department description..."
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="floorNumber" className="form-label">
                    Floor Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="floorNumber"
                    name="floorNumber"
                    value={department.floorNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., 2nd Floor"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="block" className="form-label">
                    Block
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="block"
                    name="block"
                    value={department.block}
                    onChange={handleInputChange}
                    placeholder="e.g., A Block"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="contactNumber" className="form-label">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="contactNumber"
                    name="contactNumber"
                    value={department.contactNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., +1-123-456-7890"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="emailId" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    value={department.emailId}
                    onChange={handleInputChange}
                    placeholder="e.g., dept@school.edu"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="totalSeats" className="form-label">
                    Total Seats
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalSeats"
                    name="totalSeats"
                    value={department.totalSeats}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="e.g., 180"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="currentStrength" className="form-label">
                    Current Strength
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="currentStrength"
                    name="currentStrength"
                    value={department.currentStrength}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="e.g., 150"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={department.isActive}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="isActive">
                    Department is Active
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentForm;
