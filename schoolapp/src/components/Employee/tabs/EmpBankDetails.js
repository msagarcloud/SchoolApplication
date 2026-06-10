import React, { useState } from 'react';

const EmpBankDetails = ({ employeeData, onInputChange, onDataChange }) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    
    if (name.includes('bankAccountNumber') && value && !/^\d{9,18}$/.test(value)) {
      error = 'Invalid bank account number';
    } else if (name.includes('ifscCode') && value && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
      error = 'Invalid IFSC code format';
    } else if (name.includes('panNumber') && value && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
      error = 'Invalid PAN card format';
    } else if (name.includes('aadharNumber') && value && !/^\d{12}$/.test(value)) {
      error = 'Invalid Aadhar number format';
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    
    // Validate field
    validateField(name, value);
    
    // Call parent onChange
    onInputChange(e);
    
    // Notify parent of data change
    onDataChange?.({
      ...employeeData,
      [name]: value
    });
  };

  return (
    <div className="p-3">
      <div className="row">
        <div className="col-md-6">
          <h5 className="mb-3">Bank Information</h5>
          
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
                <label className="form-label">Branch Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="branchName"
                  value={employeeData.branchName || ''}
                  onChange={handleFieldChange}
                  placeholder="Enter branch name"
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
                  style={{ textTransform: 'uppercase' }}
                />
                {errors.ifscCode && <div className="invalid-feedback">{errors.ifscCode}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">MICR Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="micrCode"
                  value={employeeData.micrCode || ''}
                  onChange={handleFieldChange}
                  placeholder="Enter MICR code"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h5 className="mb-3">Payment & Tax Information</h5>
          
          <div className="card">
            <div className="card-body">
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
                      className={`form-control ${errors.aadharNumber ? 'is-invalid' : ''}`}
                      name="aadharNumber"
                      value={employeeData.aadharNumber || ''}
                      onChange={handleFieldChange}
                      placeholder="Enter Aadhar number"
                      maxLength={12}
                    />
                    {errors.aadharNumber && <div className="invalid-feedback">{errors.aadharNumber}</div>}
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

              <div className="mb-3">
                <label className="form-label">Tax Regime</label>
                <select
                  className="form-select"
                  name="taxRegime"
                  value={employeeData.taxRegime || 'Old'}
                  onChange={handleFieldChange}
                >
                  <option value="Old">Old Tax Regime</option>
                  <option value="New">New Tax Regime</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h6 className="mb-0">Bank & Payment Guidelines</h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h6 className="text-primary">Bank Information</h6>
              <ul className="list-unstyled small">
                <li>• Account Number: 9-18 digits</li>
                <li>• IFSC Code: 11 characters (e.g., SBIN0001234)</li>
                <li>• MICR Code: 9 digits magnetic ink code</li>
                <li>• Ensure bank details are accurate for salary processing</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h6 className="text-primary">Tax & Compliance</h6>
              <ul className="list-unstyled small">
                <li>• PAN: 10 characters (e.g., ABCDE1234F)</li>
                <li>• Aadhar: 12 digits unique identification</li>
                <li>• PF/ESI numbers for statutory deductions</li>
                <li>• Tax regime affects income tax calculations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpBankDetails;
