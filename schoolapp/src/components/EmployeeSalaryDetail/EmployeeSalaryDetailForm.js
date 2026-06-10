import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EmployeeSalaryDetailForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [salaryDetail, setSalaryDetail] = useState({
    employeeId: '',
    month: '',
    year: new Date().getFullYear(),
    basicSalary: '',
    hra: '',
    da: '',
    otherAllowances: '',
    grossSalary: '',
    pfDeduction: '',
    esiDeduction: '',
    taxDeduction: '',
    otherDeductions: '',
    totalDeductions: '',
    netSalary: '',
    paymentDate: '',
    status: 'Pending',
    paymentMode: 'Bank Transfer',
    bankAccount: '',
    remarks: ''
  });

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [autoCalculate, setAutoCalculate] = useState(true);

  useEffect(() => {
    fetchEmployees();
    if (isEdit) {
      fetchSalaryDetail();
    }
  }, [id, isEdit]);

  useEffect(() => {
    if (autoCalculate) {
      calculateGrossSalary();
      calculateTotalDeductions();
      calculateNetSalary();
    }
  }, [salaryDetail.basicSalary, salaryDetail.hra, salaryDetail.da, salaryDetail.otherAllowances, 
      salaryDetail.pfDeduction, salaryDetail.esiDeduction, salaryDetail.taxDeduction, salaryDetail.otherDeductions, autoCalculate]);

  const fetchEmployees = async () => {
    try {
      // Mock data - replace with actual API call
      const mockEmployees = [
        { id: 1, name: 'John Doe', employeeCode: 'EMP001', department: 'IT', basicSalary: 50000 },
        { id: 2, name: 'Jane Smith', employeeCode: 'EMP002', department: 'HR', basicSalary: 45000 },
        { id: 3, name: 'Mike Johnson', employeeCode: 'EMP003', department: 'Finance', basicSalary: 55000 }
      ];
      setEmployees(mockEmployees);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    }
  };

  const fetchSalaryDetail = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockSalaryDetail = {
        id: 1,
        employeeId: 1,
        month: 'January',
        year: 2024,
        basicSalary: 50000,
        hra: 15000,
        da: 8000,
        otherAllowances: 5000,
        grossSalary: 78000,
        pfDeduction: 6000,
        esiDeduction: 1500,
        taxDeduction: 8000,
        otherDeductions: 500,
        totalDeductions: 16000,
        netSalary: 62000,
        paymentDate: '2024-02-01',
        status: 'Paid',
        paymentMode: 'Bank Transfer',
        bankAccount: '****1234',
        remarks: 'Monthly salary for January 2024'
      };
      setSalaryDetail(mockSalaryDetail);
    } catch (err) {
      setError(err.message || 'Failed to fetch salary details');
    } finally {
      setLoading(false);
    }
  };

  const calculateGrossSalary = () => {
    const basic = parseFloat(salaryDetail.basicSalary) || 0;
    const hra = parseFloat(salaryDetail.hra) || 0;
    const da = parseFloat(salaryDetail.da) || 0;
    const other = parseFloat(salaryDetail.otherAllowances) || 0;
    const gross = basic + hra + da + other;
    
    setSalaryDetail(prev => ({
      ...prev,
      grossSalary: gross.toFixed(2)
    }));
  };

  const calculateTotalDeductions = () => {
    const pf = parseFloat(salaryDetail.pfDeduction) || 0;
    const esi = parseFloat(salaryDetail.esiDeduction) || 0;
    const tax = parseFloat(salaryDetail.taxDeduction) || 0;
    const other = parseFloat(salaryDetail.otherDeductions) || 0;
    const total = pf + esi + tax + other;
    
    setSalaryDetail(prev => ({
      ...prev,
      totalDeductions: total.toFixed(2)
    }));
  };

  const calculateNetSalary = () => {
    const gross = parseFloat(salaryDetail.grossSalary) || 0;
    const totalDeductions = parseFloat(salaryDetail.totalDeductions) || 0;
    const net = gross - totalDeductions;
    
    setSalaryDetail(prev => ({
      ...prev,
      netSalary: net.toFixed(2)
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSalaryDetail(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;
    const selectedEmployee = employees.find(emp => emp.id === parseInt(employeeId));
    
    setSalaryDetail(prev => ({
      ...prev,
      employeeId: employeeId,
      basicSalary: selectedEmployee ? selectedEmployee.basicSalary : ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      // Validate required fields
      if (!salaryDetail.employeeId || !salaryDetail.month || !salaryDetail.year) {
        setError('Please fill in all required fields');
        return;
      }
      
      // Validate salary amounts
      if (parseFloat(salaryDetail.basicSalary) <= 0) {
        setError('Basic salary must be greater than 0');
        return;
      }
      
      // Replace with actual API call
      console.log('Submitting salary detail:', salaryDetail);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/employee-salary-details');
    } catch (err) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} salary record`);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentYear = () => new Date().getFullYear();
  const getYears = () => {
    const years = [];
    for (let i = getCurrentYear(); i >= getCurrentYear() - 5; i--) {
      years.push(i);
    }
    return years;
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
          <h2>{isEdit ? 'Edit Salary Detail' : 'Create Salary Detail'}</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/employee-salary-details">Employee Salary Details</Link>
              </li>
              <li className="breadcrumb-item active">
                {isEdit ? 'Edit' : 'Create'}
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/employee-salary-details" className="btn btn-outline-secondary me-2">
            <i className="bi bi-x-lg me-2"></i>
            Cancel
          </Link>
          <button 
            type="submit" 
            form="salary-form"
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
        <form id="salary-form" onSubmit={handleSubmit}>
          <div className="card-body">
            {/* Employee and Period Information */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Employee & Period Information</h5>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="employeeId" className="form-label">
                    Employee <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="employeeId"
                    name="employeeId"
                    value={salaryDetail.employeeId}
                    onChange={handleEmployeeChange}
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
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="month" className="form-label">
                    Month <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="month"
                    name="month"
                    value={salaryDetail.month}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="year" className="form-label">
                    Year <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="year"
                    name="year"
                    value={salaryDetail.year}
                    onChange={handleInputChange}
                    required
                  >
                    {getYears().map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Earnings Section */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Earnings</h5>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="basicSalary" className="form-label">
                    Basic Salary <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="basicSalary"
                    name="basicSalary"
                    value={salaryDetail.basicSalary}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="hra" className="form-label">HRA</label>
                  <input
                    type="number"
                    className="form-control"
                    id="hra"
                    name="hra"
                    value={salaryDetail.hra}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="da" className="form-label">DA</label>
                  <input
                    type="number"
                    className="form-control"
                    id="da"
                    name="da"
                    value={salaryDetail.da}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="otherAllowances" className="form-label">Other Allowances</label>
                  <input
                    type="number"
                    className="form-control"
                    id="otherAllowances"
                    name="otherAllowances"
                    value={salaryDetail.otherAllowances}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label htmlFor="grossSalary" className="form-label">Gross Salary</label>
                  <input
                    type="number"
                    className="form-control"
                    id="grossSalary"
                    name="grossSalary"
                    value={salaryDetail.grossSalary}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Deductions Section */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Deductions</h5>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="pfDeduction" className="form-label">PF Deduction</label>
                  <input
                    type="number"
                    className="form-control"
                    id="pfDeduction"
                    name="pfDeduction"
                    value={salaryDetail.pfDeduction}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="esiDeduction" className="form-label">ESI Deduction</label>
                  <input
                    type="number"
                    className="form-control"
                    id="esiDeduction"
                    name="esiDeduction"
                    value={salaryDetail.esiDeduction}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="taxDeduction" className="form-label">Tax Deduction</label>
                  <input
                    type="number"
                    className="form-control"
                    id="taxDeduction"
                    name="taxDeduction"
                    value={salaryDetail.taxDeduction}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="otherDeductions" className="form-label">Other Deductions</label>
                  <input
                    type="number"
                    className="form-control"
                    id="otherDeductions"
                    name="otherDeductions"
                    value={salaryDetail.otherDeductions}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label htmlFor="totalDeductions" className="form-label">Total Deductions</label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalDeductions"
                    name="totalDeductions"
                    value={salaryDetail.totalDeductions}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Net Salary and Payment Details */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Net Salary & Payment</h5>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="netSalary" className="form-label">Net Salary</label>
                  <input
                    type="number"
                    className="form-control"
                    id="netSalary"
                    name="netSalary"
                    value={salaryDetail.netSalary}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="paymentDate" className="form-label">Payment Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="paymentDate"
                    name="paymentDate"
                    value={salaryDetail.paymentDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={salaryDetail.status}
                    onChange={handleInputChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Paid">Paid</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Mode and Additional Details */}
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Payment Details</h5>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="paymentMode" className="form-label">Payment Mode</label>
                  <select
                    className="form-select"
                    id="paymentMode"
                    name="paymentMode"
                    value={salaryDetail.paymentMode}
                    onChange={handleInputChange}
                  >
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Online Payment">Online Payment</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="bankAccount" className="form-label">Bank Account</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bankAccount"
                    name="bankAccount"
                    value={salaryDetail.bankAccount}
                    onChange={handleInputChange}
                    placeholder="Last 4 digits"
                  />
                </div>
              </div>
            </div>

            {/* Remarks */}
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="remarks" className="form-label">Remarks</label>
                  <textarea
                    className="form-control"
                    id="remarks"
                    name="remarks"
                    rows="3"
                    value={salaryDetail.remarks}
                    onChange={handleInputChange}
                    placeholder="Enter any additional remarks..."
                  />
                </div>
              </div>
            </div>

            {/* Auto Calculate Toggle */}
            <div className="row">
              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="autoCalculate"
                    checked={autoCalculate}
                    onChange={(e) => setAutoCalculate(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="autoCalculate">
                    Auto-calculate gross salary, total deductions, and net salary
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

export default EmployeeSalaryDetailForm;
