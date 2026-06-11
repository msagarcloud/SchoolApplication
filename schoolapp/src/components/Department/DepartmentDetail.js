import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { departmentService } from '../../services/departmentService';

const formatDateTime = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
};

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

const DepartmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
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
      setDepartment(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch department details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDepartment();
  }, [fetchDepartment]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${department.departmentName}"? This action cannot be undone.`)) {
      try {
        await departmentService.delete(id);
        navigate('/departments');
      } catch (err) {
        setError(err.message || 'Failed to delete department');
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
        <Link to="/departments" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Departments
        </Link>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Department not found
        </div>
        <Link to="/departments" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Departments
        </Link>
      </div>
    );
  }

  const deptId = getDeptValue(department, 'id');
  const deptName = getDeptValue(department, 'departmentName') || 'N/A';
  const deptCode = getDeptValue(department, 'departmentCode') || 'N/A';
  const deptIsActive = getDeptValue(department, 'isActive');
  const deptDescription = getDeptValue(department, 'description') || '';
  const deptCreatedDate = getDeptValue(department, 'createdDate');
  const deptModifiedDate = getDeptValue(department, 'modifiedDate') ?? getDeptValue(department, 'ModifiedDate');

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Department Details</h2>
        <div className="btn-group" role="group">
          <Link to="/departments" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Departments
          </Link>
          <Link to={`/departments/${deptId}/edit`} className="btn btn-warning">
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
              <h5 className="mb-0">Department Information</h5>
              <span className={`badge ${deptIsActive ? 'bg-success' : 'bg-danger'}`}>
                {deptIsActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Department Name:</div>
                <div className="col-sm-9">{deptName}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Department Code:</div>
                <div className="col-sm-9">
                  <span className="badge bg-info">{deptCode}</span>
                </div>
              </div>

              {deptDescription && (
                <div className="row mb-3">
                  <div className="col-sm-3 fw-bold">Description:</div>
                  <div className="col-sm-9">{deptDescription}</div>
                </div>
              )}
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
                <div className="col-sm-4 fw-bold">Department ID:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{deptId}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created Date:</div>
                <div className="col-sm-8">
                  {formatDateTime(deptCreatedDate)}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Modified Date:</div>
                <div className="col-sm-8">
                  {deptModifiedDate ? formatDateTime(deptModifiedDate) : 'Not modified'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;
