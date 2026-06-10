import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { employeeService } from '../../services/employeeService';
import { categoryService } from '../../services/categoryService';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import EmpMaster from './tabs/EmpMaster';
import EmpProfQualiDetails from './tabs/EmpProfQualiDetails';
import EmpDocumentDetails from './tabs/EmpDocumentDetails';
import EmpLeaveDetails from './tabs/EmpLeaveDetails';
import EmpSalaryMaster from './tabs/EmpSalaryMaster';
import EmpBankDetails from './tabs/EmpBankDetails';
import EmpAddressDetails from './tabs/EmpAddressDetails';
import EmpProfessionalDetails from './tabs/EmpProfessionalDetails';

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('master');
  const [salaryData, setSalaryData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setEmployee(prev => ({
      ...prev,
      [name]: fieldValue
    }));
  };

  const handleDataChange = (data) => {
    setEmployee(prev => ({
      ...prev,
      ...data
    }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchEmployee();
    fetchCategories();
    fetchSalaryData();
  }, [id]);

  const fetchCategories = async () => {
    try {
      console.log('Fetching categories...');
      const data = await categoryService.getAll();
      console.log('Categories received:', data);
      console.log('Categories count:', data?.length || 0);
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      console.error('Category fetch error details:', err);
    }
  };

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      setError('');
      console.log(`Fetching employee with ID: ${id}`);
      const data = await employeeService.getById(id);
      console.log('Employee data received:', data);
      
      if (!data) {
        setError('Employee data is empty or invalid');
        return;
      }
      
      setEmployee(data);
    } catch (err) {
      console.error('Error fetching employee:', err);
      setError(err.message || 'Failed to fetch employee details');
      setEmployee(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchSalaryData = async () => {
    try {
      console.log('Fetching salary data for employee:', id);
      const data = await employeeService.getSalaryMaster(id);
      console.log('Salary data received:', data);
      setSalaryData(data);
    } catch (err) {
      console.log('No salary data found or error fetching salary data:', err);
      // Don't set error for salary data as it might not exist
      setSalaryData(null);
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
        <button className="btn btn-secondary" onClick={() => navigate('/employees')}>
          Back to Employees
        </button>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Employee not found or data is loading...
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/employees')}>
          Back to Employees
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Employee Details</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/employees">Employees</Link>
              </li>
              <li className="breadcrumb-item active">
                {employee.employeeCode || `${employee.firstName} ${employee.lastName}`}
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/employees" className="btn btn-outline-secondary me-2">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <Link to={`/employees/${id}/edit`} className="btn btn-primary">
            <i className="bi bi-pencil me-2"></i>
            Edit Employee
          </Link>
        </div>
      </div>

      {/* Employee Summary Card */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <h4 className="card-title">
                {employee?.employeeCode && (
                  <span className="badge bg-primary me-2">{employee.employeeCode}</span>
                )}
                {`${employee?.firstName || ''} ${employee?.lastName || ''}`.trim() || 'N/A'}
              </h4>
              <p className="text-muted mb-2">
                <i className="bi bi-envelope me-2"></i>
                {employee?.emailId || 'N/A'}
              </p>
              <p className="text-muted mb-2">
                <i className="bi bi-telephone me-2"></i>
                {employee?.phoneNumber || 'N/A'}
              </p>
              <p className="text-muted mb-0">
                <i className="bi bi-tag me-2"></i>
                Category: {employee?.categoryName || 'N/A'}
              </p>
            </div>
            <div className="col-md-4 text-end">
              <span className={`badge bg-${employee?.isActive ? 'success' : 'danger'} fs-6`}>
                {employee?.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="card">
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
          id="employee-tabs"
        >
          <Tab eventKey="master" title="Employee Master">
            <EmpMaster employeeId={id} employeeData={employee} categories={categories} onInputChange={handleInputChange} onDataChange={handleDataChange} />
          </Tab>
                    <Tab eventKey="address" title="Address Details">
            <EmpAddressDetails employeeId={id} employeeData={employee} onInputChange={handleInputChange} onDataChange={handleDataChange} />
          </Tab>
          <Tab eventKey="professional" title="Professional Details">
            <EmpProfessionalDetails employeeId={id} employeeData={employee} onInputChange={handleInputChange} onDataChange={handleDataChange} />
          </Tab>
          <Tab eventKey="qualifications" title="Professional Qualifications">
            <EmpProfQualiDetails employeeId={id} employeeData={employee} onInputChange={handleInputChange} onDataChange={handleDataChange} />
          </Tab>
          <Tab eventKey="documents" title="Documents">
            <EmpDocumentDetails employeeId={id} employeeData={employee} onInputChange={handleInputChange} onDataChange={handleDataChange} />
          </Tab>
          <Tab eventKey="leave" title="Leave Details">
            <EmpLeaveDetails employeeId={id} employeeData={employee} onInputChange={handleInputChange} onDataChange={handleDataChange} />
          </Tab>
          <Tab eventKey="bank" title="Bank & Payment">
            <EmpBankDetails employeeId={id} employeeData={employee} onInputChange={handleInputChange} onDataChange={handleDataChange} />
          </Tab>
          <Tab eventKey="salary" title="Salary Master">
            <EmpSalaryMaster employeeId={id} employeeData={{...employee, ...salaryData}} onInputChange={handleInputChange} onDataChange={handleDataChange} />
          </Tab>
                  </Tabs>
      </div>
    </div>
  );
};

export default EmployeeDetail;
