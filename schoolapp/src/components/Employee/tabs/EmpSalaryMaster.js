import React, { useState } from 'react';

const EmpSalaryMaster = ({ employeeData, onInputChange, onDataChange }) => {
  const [errors, setErrors] = useState({});
  const [salaryHistory, setSalaryHistory] = useState(employeeData.salaryHistory || []);
  // eslint-disable-next-line no-unused-vars
  const [editingIndex, setEditingIndex] = useState(-1);
  
  // Normalize salary data to ensure all numeric values are properly parsed
  const normalizeEmployeeData = (data) => {
    const numericFields = [
      'basicSalary', 'hra', 'da', 'conveyance', 'medical', 'specialAllowance',
      'grossSalary', 'pfDeduction', 'esiDeduction', 'professionalTax', 
      'incomeTax', 'totalDeductions', 'totalEarnings', 'netSalary'
    ];
    
    const normalized = { ...data };
    
    // Handle backend field mapping - EmployeeSalaryMaster uses different field names
    if (data.BasicSalary !== undefined) {
      normalized.basicSalary = parseFloat(data.BasicSalary) || 0;
    }
    if (data.Allowance !== undefined) {
      // Break down allowance into components if not already present
      if (!normalized.hra) normalized.hra = Math.round((parseFloat(data.Allowance) || 0) * 0.4);
      if (!normalized.da) normalized.da = Math.round((parseFloat(data.Allowance) || 0) * 0.2);
      if (!normalized.conveyance) normalized.conveyance = 1600;
      if (!normalized.medical) normalized.medical = 1250;
      if (!normalized.specialAllowance) normalized.specialAllowance = Math.round((parseFloat(data.Allowance) || 0) * 0.1);
    }
    if (data.Deductions !== undefined) {
      if (!normalized.pfDeduction) normalized.pfDeduction = Math.round((parseFloat(data.Deductions) || 0) * 0.5);
      if (!normalized.esiDeduction) normalized.esiDeduction = Math.round((parseFloat(data.Deductions) || 0) * 0.3);
      if (!normalized.professionalTax) normalized.professionalTax = 200;
    }
    if (data.NetSalary !== undefined) {
      normalized.netSalary = parseFloat(data.NetSalary) || 0;
    }
    
    // Process standard numeric fields
    numericFields.forEach(field => {
      if (normalized[field] !== undefined && normalized[field] !== null) {
        normalized[field] = parseFloat(normalized[field]) || 0;
      }
    });
    
    // Calculate gross salary if not present
    if (!normalized.grossSalary && normalized.basicSalary) {
      normalized.grossSalary = 
        (parseFloat(normalized.basicSalary) || 0) +
        (parseFloat(normalized.hra) || 0) +
        (parseFloat(normalized.da) || 0) +
        (parseFloat(normalized.conveyance) || 0) +
        (parseFloat(normalized.medical) || 0) +
        (parseFloat(normalized.specialAllowance) || 0);
    }
    
    // Calculate total deductions if not present
    if (!normalized.totalDeductions) {
      normalized.totalDeductions = 
        (parseFloat(normalized.pfDeduction) || 0) +
        (parseFloat(normalized.esiDeduction) || 0) +
        (parseFloat(normalized.professionalTax) || 0);
    }
    
    return normalized;
  };
  
  const normalizedEmployeeData = normalizeEmployeeData(employeeData);
  
  // Debug logging to track data flow
  console.log('EmpSalaryMaster - Raw employeeData:', employeeData);
  console.log('EmpSalaryMaster - Normalized data:', normalizedEmployeeData);
  console.log('EmpSalaryMaster - Basic salary:', normalizedEmployeeData.basicSalary);
  console.log('EmpSalaryMaster - HRA:', normalizedEmployeeData.hra);
  console.log('EmpSalaryMaster - DA:', normalizedEmployeeData.da);

  const validateField = (name, value) => {
    let error = '';
    
    if (name.includes('basicSalary') && (!value || value <= 0)) {
      error = 'Basic salary must be greater than 0';
    } else if (name.includes('effectiveDate') && !value) {
      error = 'Effective date is required';
    } else if (name.includes('bankAccountNumber') && value && !/^\d{9,18}$/.test(value)) {
      error = 'Invalid bank account number';
    } else if (name.includes('ifscCode') && value && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
      error = 'Invalid IFSC code format';
    } else if (name.includes('panNumber') && value && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
      error = 'Invalid PAN card format';
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const calculateSalaryComponents = (basicSalary) => {
    const basic = parseFloat(basicSalary) || 0;
    
    const updatedEmployeeData = {
      ...normalizedEmployeeData,
      basicSalary: basic,
      hra: Math.round(basic * 0.4), // 40% of basic
      da: Math.round(basic * 0.2), // 20% of basic
      conveyance: 1600, // Fixed
      medical: 1250, // Fixed
      specialAllowance: Math.round(basic * 0.1), // 10% of basic
      grossSalary: 0 // Will be calculated below
    };
    
    // Calculate gross salary
    updatedEmployeeData.grossSalary = 
      parseFloat(updatedEmployeeData.basicSalary || 0) +
      parseFloat(updatedEmployeeData.hra || 0) +
      parseFloat(updatedEmployeeData.da || 0) +
      parseFloat(updatedEmployeeData.conveyance || 0) +
      parseFloat(updatedEmployeeData.medical || 0) +
      parseFloat(updatedEmployeeData.specialAllowance || 0);
    
    // Calculate Total Earnings
    updatedEmployeeData.totalEarnings = updatedEmployeeData.grossSalary;
    
    // Calculate deductions
    updatedEmployeeData.pfDeduction = Math.round(basic * 0.12); // 12% of basic
    updatedEmployeeData.esiDeduction = updatedEmployeeData.grossSalary <= 21000 ? Math.round(updatedEmployeeData.grossSalary * 0.0075) : 0; // 0.75% for gross <= 21000
    updatedEmployeeData.professionalTax = 200; // Fixed at 200 as requested
    updatedEmployeeData.totalDeductions = 
      parseFloat(updatedEmployeeData.pfDeduction || 0) +
      parseFloat(updatedEmployeeData.esiDeduction || 0) +
      parseFloat(updatedEmployeeData.professionalTax || 0);
    
    // Calculate net salary
    updatedEmployeeData.netSalary = parseFloat(updatedEmployeeData.grossSalary || 0) - parseFloat(updatedEmployeeData.totalDeductions || 0);
    
    return updatedEmployeeData;
  };

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    // Validate field
    validateField(name, fieldValue);
    
    // Recalculate totals if ESI deduction changes
    if (name === 'esiDeduction') {
      const esiValue = parseFloat(value) || 0;
      const updatedEmployeeData = {
        ...normalizedEmployeeData,
        [name]: esiValue
      };
      
      // Recalculate total deductions and net salary
      updatedEmployeeData.totalDeductions = 
        parseFloat(updatedEmployeeData.pfDeduction || 0) +
        parseFloat(updatedEmployeeData.esiDeduction || 0) +
        parseFloat(updatedEmployeeData.professionalTax || 0);
      
      updatedEmployeeData.netSalary = parseFloat(updatedEmployeeData.grossSalary || 0) - parseFloat(updatedEmployeeData.totalDeductions || 0);
      
      onDataChange?.(updatedEmployeeData);
      onInputChange({ target: { name, value: fieldValue } });
    } else {
      // Call parent onChange
      onInputChange(e);
      
      // Notify parent of data change
      onDataChange?.({
        ...normalizedEmployeeData,
        [name]: fieldValue
      });
    }
  };

  const handleBasicSalaryBlur = (e) => {
    const { value } = e.target;
    const basic = parseFloat(value) || 0;
    
    if (basic > 0) {
      const updatedEmployeeData = calculateSalaryComponents(basic);
      onDataChange?.(updatedEmployeeData);
      
      // Update the input field with calculated values
      Object.keys(updatedEmployeeData).forEach(key => {
        if (key !== 'basicSalary' && typeof updatedEmployeeData[key] === 'number') {
          onInputChange({ target: { name: key, value: updatedEmployeeData[key] } });
        }
      });
    }
  };

  const addSalaryRevision = () => {
    // Get current date and set to 1st of current month
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const formattedDate = firstDayOfMonth.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    
    const newRevision = {
      effectiveDate: formattedDate,
      basicSalary: normalizedEmployeeData.basicSalary || 0,
      hra: normalizedEmployeeData.hra || 0,
      da: normalizedEmployeeData.da || 0,
      conveyance: normalizedEmployeeData.conveyance || 0,
      medical: normalizedEmployeeData.medical || 0,
      specialAllowance: normalizedEmployeeData.specialAllowance || 0,
      grossSalary: normalizedEmployeeData.grossSalary || 0,
      pfDeduction: normalizedEmployeeData.pfDeduction || 0,
      esiDeduction: normalizedEmployeeData.esiDeduction || 0,
      professionalTax: normalizedEmployeeData.professionalTax || 0,
      totalDeductions: normalizedEmployeeData.totalDeductions || 0,
      netSalary: normalizedEmployeeData.netSalary || 0,
      reason: '',
      approvedBy: '',
      approvedDate: ''
    };
    
    const updatedHistory = [...salaryHistory, newRevision];
    setSalaryHistory(updatedHistory);
    
    const updatedEmployeeData = {
      ...employeeData,
      salaryHistory: updatedHistory
    };
    
    onDataChange?.(updatedEmployeeData);
    onInputChange({ target: { name: 'salaryHistory', value: updatedHistory } });
  };

  const removeSalaryRevision = (index) => {
    const updatedHistory = salaryHistory.filter((_, i) => i !== index);
    setSalaryHistory(updatedHistory);
    
    const updatedEmployeeData = {
      ...employeeData,
      salaryHistory: updatedHistory
    };
    
    onDataChange?.(updatedEmployeeData);
    onInputChange({ target: { name: 'salaryHistory', value: updatedHistory } });
  };

  // eslint-disable-next-line no-unused-vars
  const updateRevisionField = (index, field, value) => {
    const updatedHistory = [...salaryHistory];
    updatedHistory[index] = {
      ...updatedHistory[index],
      [field]: value
    };
    setSalaryHistory(updatedHistory);
    
    const updatedEmployeeData = {
      ...employeeData,
      salaryHistory: updatedHistory
    };
    
    onDataChange?.(updatedEmployeeData);
    onInputChange({ target: { name: 'salaryHistory', value: updatedHistory } });
  };

  // eslint-disable-next-line no-unused-vars
  const toggleEditRevision = (index) => {
    setEditingIndex(editingIndex === index ? -1 : index);
  };

  const formatCurrency = (amount) => {
    const num = parseFloat(amount) || 0;
    return '₹' + num.toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  return (
    <div className="p-3">
      <div className="row">
        <div className="col-md-6">
          <h5 className="mb-3">Current Salary Details</h5>
          
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Basic Salary *</label>
                <input
                  type="number"
                  className={`form-control ${errors.basicSalary ? 'is-invalid' : ''}`}
                  name="basicSalary"
                  value={normalizedEmployeeData.basicSalary || ''}
                  onChange={handleFieldChange}
                  onBlur={handleBasicSalaryBlur}
                  placeholder="Enter basic salary"
                  min="0"
                  step="100"
                />
                {errors.basicSalary && <div className="invalid-feedback">{errors.basicSalary}</div>}
                <small className="text-muted">HRA, DA, PF and Professional Tax will be calculated automatically when you leave this field</small>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">HRA (40%)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="hra"
                      value={normalizedEmployeeData.hra || ''}
                      onChange={handleFieldChange}
                      readOnly
                      style={{ backgroundColor: '#f8f9fa' }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">DA (20%)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="da"
                      value={normalizedEmployeeData.da || ''}
                      onChange={handleFieldChange}
                      readOnly
                      style={{ backgroundColor: '#f8f9fa' }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Conveyance</label>
                    <input
                      type="number"
                      className="form-control"
                      name="conveyance"
                      value={normalizedEmployeeData.conveyance || ''}
                      onChange={handleFieldChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Medical</label>
                    <input
                      type="number"
                      className="form-control"
                      name="medical"
                      value={normalizedEmployeeData.medical || ''}
                      onChange={handleFieldChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Special Allowance</label>
                <input
                  type="number"
                  className="form-control"
                  name="specialAllowance"
                  value={normalizedEmployeeData.specialAllowance || ''}
                  onChange={handleFieldChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Gross Salary</label>
                <input
                  type="text"
                  className="form-control fw-bold"
                  value={formatCurrency(normalizedEmployeeData.grossSalary)}
                  readOnly
                  style={{ backgroundColor: '#e8f5e8' }}
                />
              </div>

              <hr />

              <h6 className="mb-3">Deductions</h6>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">PF Deduction (12%)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="pfDeduction"
                      value={normalizedEmployeeData.pfDeduction || ''}
                      onChange={handleFieldChange}
                      readOnly
                      style={{ backgroundColor: '#f8f9fa' }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">ESI Deduction</label>
                    <input
                      type="number"
                      className="form-control"
                      name="esiDeduction"
                      value={normalizedEmployeeData.esiDeduction || ''}
                      onChange={handleFieldChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Professional Tax (Fixed)</label>
                <input
                  type="number"
                  className="form-control"
                  name="professionalTax"
                  value={normalizedEmployeeData.professionalTax || ''}
                  onChange={handleFieldChange}
                  readOnly
                  style={{ backgroundColor: '#f8f9fa' }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Total Deductions</label>
                <input
                  type="text"
                  className="form-control fw-bold"
                  value={formatCurrency(normalizedEmployeeData.totalDeductions)}
                  readOnly
                  style={{ backgroundColor: '#ffe8e8' }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Net Salary</label>
                <input
                  type="text"
                  className="form-control fw-bold text-success"
                  value={formatCurrency(normalizedEmployeeData.netSalary)}
                  readOnly
                  style={{ backgroundColor: '#e8f5e8' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h5 className="mb-3">Bank & Tax Details</h5>
          
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Bank Account Number</label>
                <input
                  type="text"
                  className={`form-control ${errors.bankAccountNumber ? 'is-invalid' : ''}`}
                  name="bankAccountNumber"
                  value={employeeData.bankAccountNumber || ''}
                  onChange={handleFieldChange}
                  placeholder="Enter bank account number"
                />
                {errors.bankAccountNumber && <div className="invalid-feedback">{errors.bankAccountNumber}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Bank Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="bankName"
                  value={employeeData.bankName || ''}
                  onChange={handleFieldChange}
                  placeholder="Enter bank name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">IFSC Code</label>
                <input
                  type="text"
                  className={`form-control ${errors.ifscCode ? 'is-invalid' : ''}`}
                  name="ifscCode"
                  value={employeeData.ifscCode || ''}
                  onChange={handleFieldChange}
                  placeholder="Enter IFSC code (e.g., SBIN0001234)"
                />
                {errors.ifscCode && <div className="invalid-feedback">{errors.ifscCode}</div>}
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">PAN Number</label>
                    <input
                      type="text"
                      className={`form-control ${errors.panNumber ? 'is-invalid' : ''}`}
                      name="panNumber"
                      value={employeeData.panNumber || ''}
                      onChange={handleFieldChange}
                      placeholder="Enter PAN number"
                      style={{ textTransform: 'uppercase' }}
                    />
                    {errors.panNumber && <div className="invalid-feedback">{errors.panNumber}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">PF Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="pfNumber"
                      value={employeeData.pfNumber || ''}
                      onChange={handleFieldChange}
                      placeholder="Enter PF number"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">ESI Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="esiNumber"
                      value={employeeData.esiNumber || ''}
                      onChange={handleFieldChange}
                      placeholder="Enter ESI number"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Aadhar Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="aadharNumber"
                      value={employeeData.aadharNumber || ''}
                      onChange={handleFieldChange}
                      placeholder="Enter Aadhar number"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Payment Mode</label>
                <select
                  className="form-select"
                  name="paymentMode"
                  value={employeeData.paymentMode || 'Bank Transfer'}
                  onChange={handleFieldChange}
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Salary Payment Date</label>
                <select
                  className="form-select"
                  name="salaryPaymentDate"
                  value={employeeData.salaryPaymentDate || '1'}
                  onChange={handleFieldChange}
                >
                  <option value="1">1st of every month</option>
                  <option value="5">5th of every month</option>
                  <option value="7">7th of every month</option>
                  <option value="10">10th of every month</option>
                  <option value="15">15th of every month</option>
                  <option value="25">25th of every month</option>
                  <option value="Last">Last day of month</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h6 className="mb-0">Salary Revision History</h6>
          <button type="button" className="btn btn-primary btn-sm" onClick={addSalaryRevision}>
            <i className="bi bi-plus-circle me-2"></i>
            Add Revision
          </button>
        </div>
        <div className="card-body">
          {salaryHistory.length === 0 ? (
            <div className="text-center py-3">
              <i className="bi bi-clock-history display-4 text-muted"></i>
              <p className="text-muted mt-3">No salary revisions found</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Effective Date</th>
                    <th>Basic Salary</th>
                    <th>Gross Salary</th>
                    <th>Net Salary</th>
                    <th>Reason</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryHistory.map((revision, index) => (
                    <tr key={index}>
                      <td>
                        {editingIndex === index ? (
                          <input
                            type="date"
                            className="form-control form-control-sm"
                            value={revision.effectiveDate || ''}
                            onChange={(e) => updateRevisionField(index, 'effectiveDate', e.target.value)}
                            onBlur={() => toggleEditRevision(index)}
                            autoFocus
                          />
                        ) : (
                          <span 
                            onClick={() => toggleEditRevision(index)}
                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                            title="Click to edit"
                          >
                            {revision.effectiveDate || 'N/A'}
                          </span>
                        )}
                      </td>
                      <td>{formatCurrency(revision.basicSalary)}</td>
                      <td>{formatCurrency(revision.grossSalary)}</td>
                      <td>{formatCurrency(revision.netSalary)}</td>
                      <td>{revision.reason || 'N/A'}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary me-1"
                          onClick={() => toggleEditRevision(index)}
                          title="Edit effective date"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeSalaryRevision(index)}
                          title="Delete revision"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpSalaryMaster;
