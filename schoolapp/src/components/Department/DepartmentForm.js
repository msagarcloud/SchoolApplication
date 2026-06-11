import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { departmentService } from '../../services/departmentService';

const getDeptValue = (dept, key) => {
  // Try exact match first
  if (dept?.[key] !== undefined && dept[key] !== null) return dept[key];
  
  // Try PascalCase
  const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
  if (dept?.[pascalKey] !== undefined && dept[pascalKey] !== null) return dept[pascalKey];
  
  // Try snake_case
  const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
  if (dept?.[snakeKey] !== undefined && dept[snakeKey] !== null) return dept[snakeKey];
  
  // Try UPPER_SNAKE_CASE
  const upperSnakeKey = snakeKey.toUpperCase();
  if (dept?.[upperSnakeKey] !== undefined && dept[upperSnakeKey] !== null) return dept[upperSnakeKey];
  
  // Try all lowercase
  const lowerKey = key.toLowerCase();
  if (dept?.[lowerKey] !== undefined && dept[lowerKey] !== null) return dept[lowerKey];
  
  // Try matching with "Dept" prefix variations
  const deptPrefixVariations = [
    `dept${pascalKey}`,
    `Dept${pascalKey}`,
    `department${pascalKey}`,
    `Department${pascalKey}`
  ];
  
  for (const variant of deptPrefixVariations) {
    if (dept?.[variant] !== undefined && dept[variant] !== null) return dept[variant];
  }
  
  return undefined;
};

const DepartmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [department, setDepartment] = useState({
    departmentName: '',
    departmentCode: '',
    description: '',
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDepartment = useCallback(async () => {
    try {
      setLoading(true);
      let data = await departmentService.getById(id);
      
      // Handle wrapped responses
      if (data?.data && typeof data.data === 'object') {
        data = data.data;
      } else if (data?.result && typeof data.result === 'object') {
        data = data.result;
      }
      
      console.log('Department API Response:', data);
      console.log('Available keys:', Object.keys(data || {}));
      
      setDepartment({
        departmentName: getDeptValue(data, 'departmentName') || '',
        departmentCode: getDeptValue(data, 'departmentCode') || '',
        description: getDeptValue(data, 'description') || '',
        isActive: getDeptValue(data, 'isActive') !== false
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch department details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEdit) {
      fetchDepartment();
    }
  }, [isEdit, fetchDepartment]);

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
      
      if (!department.departmentName || !department.departmentCode) {
        setError('Department name and code are required');
        setLoading(false);
        return;
      }
      
      if (!/^[A-Z]{2,4}$/.test(department.departmentCode)) {
        setError('Department code should be 2-4 uppercase letters');
        setLoading(false);
        return;
      }
      
      if (isEdit) {
        await departmentService.update(id, department);
      } else {
        await departmentService.create(department);
      }
      
      navigate('/departments');
    } catch (err) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} department`);
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
        <h2>{isEdit ? 'Edit Department' : 'Create New Department'}</h2>
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
                    onChange={handleInputChange}
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
                  <small className="form-text text-muted">2-4 uppercase letters (e.g., CS, EC, ME)</small>
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
                    Active
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
