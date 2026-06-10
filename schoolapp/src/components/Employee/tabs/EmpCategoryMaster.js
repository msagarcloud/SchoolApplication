import React, { useState } from 'react';

const EmpCategoryMaster = ({ employeeData, onInputChange, onDataChange }) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'joiningDate':
        if (!value) error = 'Joining date is required';
        break;
      case 'designation':
        if (!value.trim()) error = 'Designation is required';
        break;
      case 'department':
        if (!value.trim()) error = 'Department is required';
        break;
      case 'employmentType':
        if (!value) error = 'Employment type is required';
        break;
      case 'workLocation':
        if (!value.trim()) error = 'Work location is required';
        break;
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    // Validate field
    validateField(name, fieldValue);
    
    // Call parent onChange
    onInputChange(e);
    
    // Notify parent of data change
    onDataChange?.({
      ...employeeData,
      [name]: fieldValue
    });
  };

  return (
    <div className="p-2" style={{maxHeight: 'calc(100vh - 100px)', overflowY: 'auto'}}>
      <div className="row g-2">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <h6 className="mb-2">Employment Details</h6>
          
          <div className="mb-2">
            <label className="form-label">Joining Date *</label>
            <input
              type="date"
              className={`form-control form-control-sm ${errors.joiningDate ? 'is-invalid' : ''}`}
              name="joiningDate"
              value={employeeData.joiningDate || ''}
              onChange={handleFieldChange}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.joiningDate && <div className="invalid-feedback">{errors.joiningDate}</div>}
          </div>

          <div className="mb-2">
            <label className="form-label">Designation *</label>
            <input
              type="text"
              className={`form-control form-control-sm ${errors.designation ? 'is-invalid' : ''}`}
              name="designation"
              value={employeeData.designation || ''}
              onChange={handleFieldChange}
              placeholder="Enter designation"
            />
            {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
          </div>

          <div className="mb-2">
            <label className="form-label">Department *</label>
            <input
              type="text"
              className={`form-control form-control-sm ${errors.department ? 'is-invalid' : ''}`}
              name="department"
              value={employeeData.department || ''}
              onChange={handleFieldChange}
              placeholder="Enter department"
            />
            {errors.department && <div className="invalid-feedback">{errors.department}</div>}
          </div>

          <div className="mb-2">
            <label className="form-label">Employment Type *</label>
            <select
              className={`form-select form-select-sm ${errors.employmentType ? 'is-invalid' : ''}`}
              name="employmentType"
              value={employeeData.employmentType || ''}
              onChange={handleFieldChange}
            >
              <option value="">Select Employment Type</option>
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
              <option value="Probation">Probation</option>
              <option value="Intern">Intern</option>
              <option value="Part-time">Part-time</option>
              <option value="Consultant">Consultant</option>
            </select>
            {errors.employmentType && <div className="invalid-feedback">{errors.employmentType}</div>}
          </div>

          <div className="mb-2">
            <label className="form-label">Work Location *</label>
            <input
              type="text"
              className={`form-control form-control-sm ${errors.workLocation ? 'is-invalid' : ''}`}
              name="workLocation"
              value={employeeData.workLocation || ''}
              onChange={handleFieldChange}
              placeholder="Enter work location"
            />
            {errors.workLocation && <div className="invalid-feedback">{errors.workLocation}</div>}
          </div>

          <div className="mb-2">
            <label className="form-label">Work Shift</label>
            <select
              className="form-select form-select-sm"
              name="workShift"
              value={employeeData.workShift || ''}
              onChange={handleFieldChange}
            >
              <option value="">Select Shift</option>
              <option value="Morning">Morning (6AM - 2PM)</option>
              <option value="General">General (9AM - 6PM)</option>
              <option value="Evening">Evening (2PM - 10PM)</option>
              <option value="Night">Night (10PM - 6AM)</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="form-label">Reporting Manager</label>
            <input
              type="text"
              className="form-control form-control-sm"
              name="reportingManagerName"
              value={employeeData.reportingManagerName || ''}
              onChange={handleFieldChange}
              placeholder="Enter reporting manager name"
            />
            <input
              type="hidden"
              name="reportingManagerId"
              value={employeeData.reportingManagerId || ''}
            />
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <h6 className="mb-2">Category Specific Information</h6>
          
          <div className="card">
            <div className="card-body p-2">
              <h6 className="card-title mb-2">Category Details</h6>
              <p className="text-muted small">
                Based on the selected category, additional fields and requirements will be displayed here.
              </p>
              
              <div className="mb-2">
                <label className="form-label small">Category Description</label>
                <textarea
                  className="form-control form-control-sm"
                  name="categoryDescription"
                  value={employeeData.categoryDescription || ''}
                  onChange={handleFieldChange}
                  rows={2}
                  placeholder="Enter category-specific description or notes"
                />
              </div>

              <div className="mb-2">
                <label className="form-label small">Skills Required</label>
                <textarea
                  className="form-control form-control-sm"
                  name="skillsRequired"
                  value={employeeData.skillsRequired || ''}
                  onChange={handleFieldChange}
                  rows={2}
                  placeholder="Enter required skills for this category"
                />
              </div>

              <div className="row g-2">
                <div className="col-6">
                  <div className="mb-2">
                    <label className="form-label small">Experience Level</label>
                    <select
                      className="form-select form-select-sm"
                      name="experienceLevel"
                      value={employeeData.experienceLevel || ''}
                      onChange={handleFieldChange}
                    >
                      <option value="">Select Experience Level</option>
                      <option value="Fresher">Fresher</option>
                      <option value="Junior">Junior (0-2 years)</option>
                      <option value="Mid">Mid Level (2-5 years)</option>
                      <option value="Senior">Senior (5-10 years)</option>
                      <option value="Lead">Lead (10+ years)</option>
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-2">
                    <label className="form-label small">Specialization</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="specialization"
                      value={employeeData.specialization || ''}
                      onChange={handleFieldChange}
                      placeholder="Enter specialization area"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <label className="form-label small">Category Notes</label>
                <textarea
                  className="form-control form-control-sm"
                  name="categoryNotes"
                  value={employeeData.categoryNotes || ''}
                  onChange={handleFieldChange}
                  rows={2}
                  placeholder="Enter any additional notes related to this category"
                />
              </div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body p-2">
              <h6 className="card-title mb-2">Category Benefits</h6>
              
              <div className="row g-2">
                <div className="col-6">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="hasHealthInsurance"
                      id="hasHealthInsurance"
                      checked={employeeData.hasHealthInsurance || false}
                      onChange={handleFieldChange}
                    />
                    <label className="form-check-label small" htmlFor="hasHealthInsurance">
                      Health Insurance
                    </label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="hasProvidentFund"
                      id="hasProvidentFund"
                      checked={employeeData.hasProvidentFund || false}
                      onChange={handleFieldChange}
                    />
                    <label className="form-check-label small" htmlFor="hasProvidentFund">
                      Provident Fund
                    </label>
                  </div>
                </div>
              </div>

              <div className="row g-2">
                <div className="col-6">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="hasESI"
                      id="hasESI"
                      checked={employeeData.hasESI || false}
                      onChange={handleFieldChange}
                    />
                    <label className="form-check-label small" htmlFor="hasESI">
                      ESI Benefits
                    </label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="hasGratuity"
                      id="hasGratuity"
                      checked={employeeData.hasGratuity || false}
                      onChange={handleFieldChange}
                    />
                    <label className="form-check-label small" htmlFor="hasGratuity">
                      Gratuity
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="hasLeaveEncashment"
                  id="hasLeaveEncashment"
                  checked={employeeData.hasLeaveEncashment || false}
                  onChange={handleFieldChange}
                />
                <label className="form-check-label small" htmlFor="hasLeaveEncashment">
                  Leave Encashment
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpCategoryMaster;
