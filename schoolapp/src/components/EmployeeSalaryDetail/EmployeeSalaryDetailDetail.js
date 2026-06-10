import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EmployeeSalaryDetailDetail = () => {
  const { id } = useParams();
  const [salaryDetail, setSalaryDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSalaryDetail();
  }, [id]);

  const fetchSalaryDetail = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockSalaryDetail = {
        id: 1,
        employeeId: 1,
        employeeName: 'John Doe',
        employeeCode: 'EMP001',
        department: 'IT',
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
        bankName: 'State Bank of India',
        remarks: 'Monthly salary for January 2024. All deductions calculated as per company policy.',
        addedDate: '2024-01-25',
        lastModified: '2024-02-01',
        addedBy: 'HR Manager',
        approvedBy: 'Finance Manager',
        approvedDate: '2024-01-31'
      };
      setSalaryDetail(mockSalaryDetail);
    } catch (err) {
      setError(err.message || 'Failed to fetch salary details');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPayslip = () => {
    // Implement download functionality
    window.alert('Downloading payslip...');
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Paid': { bg: 'success', icon: 'check-circle' },
      'Pending': { bg: 'warning', icon: 'clock' },
      'Processing': { bg: 'info', icon: 'gear' },
      'Failed': { bg: 'danger', icon: 'x-circle' }
    };
    
    const config = statusConfig[status] || { bg: 'secondary', icon: 'question-circle' };
    
    return (
      <span className={`badge bg-${config.bg} fs-6`}>
        <i className={`bi bi-${config.icon} me-1`}></i>
        {status}
      </span>
    );
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
        <Link to="/employee-salary-details" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Salary Details
        </Link>
      </div>
    );
  }

  if (!salaryDetail) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Salary detail not found
        </div>
        <Link to="/employee-salary-details" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Salary Details
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Salary Detail</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/employee-salary-details">Employee Salary Details</Link>
              </li>
              <li className="breadcrumb-item active">Salary Detail</li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/employee-salary-details" className="btn btn-outline-secondary me-2">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <button className="btn btn-outline-info me-2" onClick={handlePrint}>
            <i className="bi bi-printer me-2"></i>
            Print
          </button>
          <button className="btn btn-outline-success me-2" onClick={handleDownloadPayslip}>
            <i className="bi bi-download me-2"></i>
            Download Payslip
          </button>
          <Link to={`/employee-salary-details/${id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
        </div>
      </div>

      {/* Status Alert */}
      <div className={`alert alert-${salaryDetail.status === 'Paid' ? 'success' : salaryDetail.status === 'Failed' ? 'danger' : 'warning'}`} role="alert">
        <div className="d-flex align-items-center">
          {getStatusBadge(salaryDetail.status)}
          <div className="ms-3">
            <strong>Payment Status: {salaryDetail.status}</strong>
            {salaryDetail.paymentDate && (
              <div className="small">
                Payment Date: {salaryDetail.paymentDate} via {salaryDetail.paymentMode}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          {/* Employee Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Employee Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Employee Name</label>
                    <p className="form-control-plaintext">
                      <Link to={`/employees/${salaryDetail.employeeId}`} className="text-decoration-none">
                        {salaryDetail.employeeName}
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Employee Code</label>
                    <p className="form-control-plaintext">{salaryDetail.employeeCode}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Department</label>
                    <p className="form-control-plaintext">{salaryDetail.department}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Pay Period</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-primary">{salaryDetail.month} {salaryDetail.year}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Salary Breakdown */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Salary Breakdown</h5>
            </div>
            <div className="card-body">
              {/* Earnings */}
              <div className="row mb-4">
                <div className="col-12">
                  <h6 className="text-success mb-3">Earnings</h6>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Basic Salary:</span>
                    <strong>₹{salaryDetail.basicSalary.toLocaleString()}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>HRA:</span>
                    <strong>₹{salaryDetail.hra.toLocaleString()}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>DA:</span>
                    <strong>₹{salaryDetail.da.toLocaleString()}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Other Allowances:</span>
                    <strong>₹{salaryDetail.otherAllowances.toLocaleString()}</strong>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card bg-light">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">Gross Salary:</span>
                        <span className="fw-bold text-success">₹{salaryDetail.grossSalary.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deductions */}
              <div className="row mb-4">
                <div className="col-12">
                  <h6 className="text-danger mb-3">Deductions</h6>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-content-between mb-2">
                    <span>PF Deduction:</span>
                    <strong>₹{salaryDetail.pfDeduction.toLocaleString()}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>ESI Deduction:</span>
                    <strong>₹{salaryDetail.esiDeduction.toLocaleString()}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax Deduction:</span>
                    <strong>₹{salaryDetail.taxDeduction.toLocaleString()}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Other Deductions:</span>
                    <strong>₹{salaryDetail.otherDeductions.toLocaleString()}</strong>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card bg-light">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">Total Deductions:</span>
                        <span className="fw-bold text-danger">₹{salaryDetail.totalDeductions.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Net Salary */}
              <div className="row">
                <div className="col-12">
                  <div className="card bg-primary text-white">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Net Salary:</h5>
                        <h3 className="mb-0">₹{salaryDetail.netSalary.toLocaleString()}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Payment Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Payment Mode</label>
                    <p className="form-control-plaintext">{salaryDetail.paymentMode}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Bank Account</label>
                    <p className="form-control-plaintext">
                      {salaryDetail.bankName} - {salaryDetail.bankAccount}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Payment Date</label>
                    <p className="form-control-plaintext">{salaryDetail.paymentDate || 'Not paid yet'}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Status</label>
                    <p className="form-control-plaintext">
                      {getStatusBadge(salaryDetail.status)}
                    </p>
                  </div>
                </div>
              </div>
              {salaryDetail.remarks && (
                <div className="mb-3">
                  <label className="form-label text-muted">Remarks</label>
                  <p className="form-control-plaintext">{salaryDetail.remarks}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          {/* Quick Actions */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-success" onClick={handleDownloadPayslip}>
                  <i className="bi bi-download me-2"></i>
                  Download Payslip
                </button>
                <button className="btn btn-info" onClick={handlePrint}>
                  <i className="bi bi-printer me-2"></i>
                  Print Payslip
                </button>
                <Link to={`/employee-salary-details/${id}/edit`} className="btn btn-warning">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Salary Detail
                </Link>
                <button 
                  className="btn btn-outline-danger"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this salary record?')) {
                      // Implement delete functionality
                      window.alert('Delete functionality to be implemented');
                    }
                  }}
                >
                  <i className="bi bi-trash me-2"></i>
                  Delete Record
                </button>
              </div>
            </div>
          </div>

          {/* Approval Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Approval Information</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-muted">Added By</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-person-plus me-2"></i>
                  {salaryDetail.addedBy}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Added On</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-calendar-plus me-2"></i>
                  {salaryDetail.addedDate}
                </p>
              </div>
              {salaryDetail.approvedBy && (
                <>
                  <div className="mb-3">
                    <label className="form-label text-muted">Approved By</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-person-check me-2"></i>
                      {salaryDetail.approvedBy}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Approved On</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-calendar-check me-2"></i>
                      {salaryDetail.approvedDate}
                    </p>
                  </div>
                </>
              )}
              <div className="mb-3">
                <label className="form-label text-muted">Last Modified</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-pencil-square me-2"></i>
                  {salaryDetail.lastModified}
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Summary</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-muted">Record ID</label>
                <p className="form-control-plaintext">#{salaryDetail.id}</p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Employee ID</label>
                <p className="form-control-plaintext">#{salaryDetail.employeeId}</p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Pay Period</label>
                <p className="form-control-plaintext">
                  <span className="badge bg-primary">{salaryDetail.month} {salaryDetail.year}</span>
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Net Amount</label>
                <p className="form-control-plaintext">
                  <span className="badge bg-success fs-6">₹{salaryDetail.netSalary.toLocaleString()}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSalaryDetailDetail;
