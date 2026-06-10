import React, { useState } from 'react';

const EmpProfQualiDetails = ({ employeeData, onInputChange, onDataChange }) => {
  const [errors, setErrors] = useState({});
  const [qualifications, setQualifications] = useState(employeeData.professionalQualifications || []);

  const validateField = (name, value) => {
    let error = '';
    
    if (name.includes('qualificationName') && !value.trim()) {
      error = 'Qualification name is required';
    } else if (name.includes('institution') && !value.trim()) {
      error = 'Institution name is required';
    } else if (name.includes('yearOfPassing') && value && (value < 1950 || value > new Date().getFullYear())) {
      error = 'Invalid year of passing';
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleFieldChange = (e, index) => {
    const { name, value } = e.target;
    
    // Validate field
    validateField(name, value);
    
    // Update qualifications array
    const updatedQualifications = [...qualifications];
    updatedQualifications[index] = {
      ...updatedQualifications[index],
      [name]: value
    };
    
    setQualifications(updatedQualifications);
    
    // Update parent data
    const updatedEmployeeData = {
      ...employeeData,
      professionalQualifications: updatedQualifications
    };
    
    onDataChange?.(updatedEmployeeData);
    onInputChange({ target: { name: 'professionalQualifications', value: updatedQualifications } });
  };

  const addQualification = () => {
    const newQualification = {
      qualificationName: '',
      institution: '',
      yearOfPassing: '',
      percentage: '',
      specialization: '',
      certificateNumber: '',
      verificationStatus: 'Pending'
    };
    
    const updatedQualifications = [...qualifications, newQualification];
    setQualifications(updatedQualifications);
    
    const updatedEmployeeData = {
      ...employeeData,
      professionalQualifications: updatedQualifications
    };
    
    onDataChange?.(updatedEmployeeData);
    onInputChange({ target: { name: 'professionalQualifications', value: updatedQualifications } });
  };

  const removeQualification = (index) => {
    const updatedQualifications = qualifications.filter((_, i) => i !== index);
    setQualifications(updatedQualifications);
    
    const updatedEmployeeData = {
      ...employeeData,
      professionalQualifications: updatedQualifications
    };
    
    onDataChange?.(updatedEmployeeData);
    onInputChange({ target: { name: 'professionalQualifications', value: updatedQualifications } });
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5>Professional Qualifications</h5>
        <button type="button" className="btn btn-primary" onClick={addQualification}>
          <i className="bi bi-plus-circle me-2"></i>
          Add Qualification
        </button>
      </div>

      {qualifications.length === 0 ? (
        <div className="text-center py-4">
          <i className="bi bi-mortarboard display-4 text-muted"></i>
          <p className="text-muted mt-3">No professional qualifications added yet</p>
          <button type="button" className="btn btn-outline-primary" onClick={addQualification}>
            Add First Qualification
          </button>
        </div>
      ) : (
        <div className="row">
          {qualifications.map((qualification, index) => (
            <div key={index} className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">Qualification {index + 1}</h6>
                  {qualifications.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeQualification(index)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Qualification Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors[`qualificationName_${index}`] ? 'is-invalid' : ''}`}
                      name="qualificationName"
                      value={qualification.qualificationName || ''}
                      onChange={(e) => handleFieldChange(e, index)}
                      placeholder="e.g., B.Tech, MCA, MBA"
                    />
                    {errors[`qualificationName_${index}`] && (
                      <div className="invalid-feedback">{errors[`qualificationName_${index}`]}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Institution *</label>
                    <input
                      type="text"
                      className={`form-control ${errors[`institution_${index}`] ? 'is-invalid' : ''}`}
                      name="institution"
                      value={qualification.institution || ''}
                      onChange={(e) => handleFieldChange(e, index)}
                      placeholder="Enter institution/university name"
                    />
                    {errors[`institution_${index}`] && (
                      <div className="invalid-feedback">{errors[`institution_${index}`]}</div>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Year of Passing</label>
                        <input
                          type="number"
                          className={`form-control ${errors[`yearOfPassing_${index}`] ? 'is-invalid' : ''}`}
                          name="yearOfPassing"
                          value={qualification.yearOfPassing || ''}
                          onChange={(e) => handleFieldChange(e, index)}
                          placeholder="e.g., 2020"
                          min="1950"
                          max={new Date().getFullYear()}
                        />
                        {errors[`yearOfPassing_${index}`] && (
                          <div className="invalid-feedback">{errors[`yearOfPassing_${index}`]}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Percentage/CGPA</label>
                        <input
                          type="text"
                          className="form-control"
                          name="percentage"
                          value={qualification.percentage || ''}
                          onChange={(e) => handleFieldChange(e, index)}
                          placeholder="e.g., 75%, 8.5 CGPA"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Specialization</label>
                    <input
                      type="text"
                      className="form-control"
                      name="specialization"
                      value={qualification.specialization || ''}
                      onChange={(e) => handleFieldChange(e, index)}
                      placeholder="e.g., Computer Science, Marketing"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Certificate Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="certificateNumber"
                      value={qualification.certificateNumber || ''}
                      onChange={(e) => handleFieldChange(e, index)}
                      placeholder="Enter certificate/roll number"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Verification Status</label>
                    <select
                      className="form-select"
                      name="verificationStatus"
                      value={qualification.verificationStatus || 'Pending'}
                      onChange={(e) => handleFieldChange(e, index)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Verified">Verified</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Remarks</label>
                    <textarea
                      className="form-control"
                      name="remarks"
                      value={qualification.remarks || ''}
                      onChange={(e) => handleFieldChange(e, index)}
                      rows={2}
                      placeholder="Enter any additional remarks"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="card mt-4">
        <div className="card-header">
          <h6 className="mb-0">Summary</h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <strong>Total Qualifications:</strong> {qualifications.length}
            </div>
            <div className="col-md-4">
              <strong>Verified:</strong> {qualifications.filter(q => q.verificationStatus === 'Verified').length}
            </div>
            <div className="col-md-4">
              <strong>Pending:</strong> {qualifications.filter(q => q.verificationStatus === 'Pending').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpProfQualiDetails;
