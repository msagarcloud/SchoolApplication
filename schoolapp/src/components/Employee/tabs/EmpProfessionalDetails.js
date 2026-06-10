import React, { useState } from 'react';

const EmpProfessionalDetails = ({ employeeData, onInputChange, onDataChange }) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    
    if (name.includes('yearsOfExperience') && value && (isNaN(value) || parseFloat(value) < 0)) {
      error = 'Years of experience must be a positive number';
    } else if (name.includes('mathUpToClass') && value && (isNaN(value) || parseInt(value) < 1 || parseInt(value) > 12)) {
      error = 'Class must be between 1 and 12';
    } else if (name.includes('englishUpToClass') && value && (isNaN(value) || parseInt(value) < 1 || parseInt(value) > 12)) {
      error = 'Class must be between 1 and 12';
    } else if (name.includes('physicsUpToClass') && value && (isNaN(value) || parseInt(value) < 1 || parseInt(value) > 12)) {
      error = 'Class must be between 1 and 12';
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
    <div className="p-3">
      <div className="row g-2">
        <div className="col-lg-4 col-md-6">
          <h6 className="mb-3">Professional Information</h6>
          
          <div className="mb-3">
            <label className="form-label">Years of Experience</label>
            <input
              type="text"
              className={`form-control ${errors.yearsOfExperience ? 'is-invalid' : ''}`}
              name="yearsOfExperience"
              value={employeeData.yearsOfExperience || ''}
              onChange={handleFieldChange}
              placeholder="Enter years of experience"
            />
            {errors.yearsOfExperience && <div className="invalid-feedback">{errors.yearsOfExperience}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Previous School/Company</label>
            <input
              type="text"
              className="form-control"
              name="previoudSchoolCompany"
              value={employeeData.previoudSchoolCompany || ''}
              onChange={handleFieldChange}
              placeholder="Enter previous school or company"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={employeeData.description || ''}
              onChange={handleFieldChange}
              rows={3}
              placeholder="Enter description"
            />
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <h6 className="mb-3">License Information</h6>
          
          <div className="mb-3">
            <label className="form-label">License Number</label>
            <input
              type="text"
              className="form-control"
              name="licenceNumber"
              value={employeeData.licenceNumber || ''}
              onChange={handleFieldChange}
              placeholder="Enter license number"
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">License Issue Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="licenceIssueDate"
                  value={employeeData.licenceIssueDate || ''}
                  onChange={handleFieldChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">License Valid Upto</label>
                <input
                  type="date"
                  className="form-control"
                  name="licenceValidUpto"
                  value={employeeData.licenceValidUpto || ''}
                  onChange={handleFieldChange}
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">License Type</label>
            <input
              type="text"
              className="form-control"
              name="licenceType"
              value={employeeData.licenceType || ''}
              onChange={handleFieldChange}
              placeholder="Enter license type"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">License Description</label>
            <textarea
              className="form-control"
              name="licenceDescription"
              value={employeeData.licenceDescription || ''}
              onChange={handleFieldChange}
              rows={2}
              placeholder="Enter license description"
            />
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <h6 className="mb-3">Educational Qualification</h6>
          
          <div className="row g-2">
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label small">Math Upto Class</label>
                <input
                  type="number"
                  className={`form-control form-control-sm ${errors.mathUpToClass ? 'is-invalid' : ''}`}
                  name="mathUpToClass"
                  value={employeeData.mathUpToClass || ''}
                  onChange={handleFieldChange}
                  placeholder="Class"
                  min="1"
                  max="12"
                />
                {errors.mathUpToClass && <div className="invalid-feedback">{errors.mathUpToClass}</div>}
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label small">English Upto Class</label>
                <input
                  type="number"
                  className={`form-control form-control-sm ${errors.englishUpToClass ? 'is-invalid' : ''}`}
                  name="englishUptoClass"
                  value={employeeData.englishUptoClass || ''}
                  onChange={handleFieldChange}
                  placeholder="Class"
                  min="1"
                  max="12"
                />
                {errors.englishUpToClass && <div className="invalid-feedback">{errors.englishUpToClass}</div>}
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label small">Physics Upto Class</label>
                <input
                  type="number"
                  className={`form-control form-control-sm ${errors.physicsUpToClass ? 'is-invalid' : ''}`}
                  name="physicsUptoClass"
                  value={employeeData.physicsUptoClass || ''}
                  onChange={handleFieldChange}
                  placeholder="Class"
                  min="1"
                  max="12"
                />
                {errors.physicsUpToClass && <div className="invalid-feedback">{errors.physicsUpToClass}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpProfessionalDetails;
