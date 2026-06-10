import React, { useState } from 'react';

const EmpDocumentDetails = ({ employeeData, onInputChange, onDataChange }) => {
  const [errors, setErrors] = useState({});
  const [documents, setDocuments] = useState(employeeData.documents || []);

  const validateField = (name, value) => {
    let error = '';
    
    if (name.includes('documentName') && !value.trim()) {
      error = 'Document name is required';
    } else if (name.includes('documentType') && !value) {
      error = 'Document type is required';
    } else if (name.includes('expiryDate') && value && new Date(value) <= new Date()) {
      error = 'Expiry date must be in the future';
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleFieldChange = (e, index) => {
    const { name, value } = e.target;
    
    // Validate field
    validateField(name, value);
    
    // Update documents array
    const updatedDocuments = [...documents];
    updatedDocuments[index] = {
      ...updatedDocuments[index],
      [name]: value
    };
    
    setDocuments(updatedDocuments);
    
    // Update parent data
    const updatedEmployeeData = {
      ...employeeData,
      documents: updatedDocuments
    };
    
    onDataChange?.(updatedEmployeeData);
    onInputChange({ target: { name: 'documents', value: updatedDocuments } });
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedDocuments = [...documents];
      updatedDocuments[index] = {
        ...updatedDocuments[index],
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        uploadDate: new Date().toISOString().split('T')[0],
        file: file // For actual file upload
      };
      
      setDocuments(updatedDocuments);
      
      const updatedEmployeeData = {
        ...employeeData,
        documents: updatedDocuments
      };
      
      onDataChange?.(updatedEmployeeData);
      onInputChange({ target: { name: 'documents', value: updatedDocuments } });
    }
  };

  const addDocument = () => {
    const newDocument = {
      documentName: '',
      documentType: '',
      documentNumber: '',
      issueDate: '',
      expiryDate: '',
      issuingAuthority: '',
      fileName: '',
      fileSize: '',
      fileType: '',
      uploadDate: '',
      status: 'Active',
      remarks: ''
    };
    
    const updatedDocuments = [...documents, newDocument];
    setDocuments(updatedDocuments);
    
    const updatedEmployeeData = {
      ...employeeData,
      documents: updatedDocuments
    };
    
    onDataChange?.(updatedEmployeeData);
    onInputChange({ target: { name: 'documents', value: updatedDocuments } });
  };

  const removeDocument = (index) => {
    const updatedDocuments = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocuments);
    
    const updatedEmployeeData = {
      ...employeeData,
      documents: updatedDocuments
    };
    
    onDataChange?.(updatedEmployeeData);
    onInputChange({ target: { name: 'documents', value: updatedDocuments } });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDocumentStatusBadge = (status) => {
    const statusClasses = {
      'Active': 'success',
      'Expired': 'danger',
      'Expiring Soon': 'warning',
      'Pending': 'secondary'
    };
    
    return (
      <span className={`badge bg-${statusClasses[status] || 'secondary'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5>Employee Documents</h5>
        <button type="button" className="btn btn-primary" onClick={addDocument}>
          <i className="bi bi-plus-circle me-2"></i>
          Add Document
        </button>
      </div>

      {documents.length === 0 ? (
        <div className="text-center py-4">
          <i className="bi bi-file-earmark-text display-4 text-muted"></i>
          <p className="text-muted mt-3">No documents uploaded yet</p>
          <button type="button" className="btn btn-outline-primary" onClick={addDocument}>
            Add First Document
          </button>
        </div>
      ) : (
        <div className="row">
          {documents.map((document, index) => (
            <div key={index} className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">Document {index + 1}</h6>
                  {documents.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeDocument(index)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Document Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors[`documentName_${index}`] ? 'is-invalid' : ''}`}
                      name="documentName"
                      value={document.documentName || ''}
                      onChange={(e) => handleFieldChange(e, index)}
                      placeholder="e.g., Passport, Driving License"
                    />
                    {errors[`documentName_${index}`] && (
                      <div className="invalid-feedback">{errors[`documentName_${index}`]}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Document Type *</label>
                    <select
                      className={`form-select ${errors[`documentType_${index}`] ? 'is-invalid' : ''}`}
                      name="documentType"
                      value={document.documentType || ''}
                      onChange={(e) => handleFieldChange(e, index)}
                    >
                      <option value="">Select Document Type</option>
                      <option value="Passport">Passport</option>
                      <option value="Driving License">Driving License</option>
                      <option value="Aadhar Card">Aadhar Card</option>
                      <option value="PAN Card">PAN Card</option>
                      <option value="Voter ID">Voter ID</option>
                      <option value="Birth Certificate">Birth Certificate</option>
                      <option value="Educational Certificate">Educational Certificate</option>
                      <option value="Experience Certificate">Experience Certificate</option>
                      <option value="Medical Certificate">Medical Certificate</option>
                      <option value="Police Verification">Police Verification</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors[`documentType_${index}`] && (
                      <div className="invalid-feedback">{errors[`documentType_${index}`]}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Document Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="documentNumber"
                      value={document.documentNumber || ''}
                      onChange={(e) => handleFieldChange(e, index)}
                      placeholder="Enter document number"
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Issue Date</label>
                        <input
                          type="date"
                          className="form-control"
                          name="issueDate"
                          value={document.issueDate || ''}
                          onChange={(e) => handleFieldChange(e, index)}
                          max={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Expiry Date</label>
                        <input
                          type="date"
                          className={`form-control ${errors[`expiryDate_${index}`] ? 'is-invalid' : ''}`}
                          name="expiryDate"
                          value={document.expiryDate || ''}
                          onChange={(e) => handleFieldChange(e, index)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                        {errors[`expiryDate_${index}`] && (
                          <div className="invalid-feedback">{errors[`expiryDate_${index}`]}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Issuing Authority</label>
                    <input
                      type="text"
                      className="form-control"
                      name="issuingAuthority"
                      value={document.issuingAuthority || ''}
                      onChange={(e) => handleFieldChange(e, index)}
                      placeholder="Enter issuing authority"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Upload Document</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => handleFileChange(e, index)}
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    />
                    {document.fileName && (
                      <small className="text-muted">
                        Uploaded: {document.fileName} ({formatFileSize(document.fileSize)})
                      </small>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={document.status || 'Active'}
                      onChange={(e) => handleFieldChange(e, index)}
                    >
                      <option value="Active">Active</option>
                      <option value="Expired">Expired</option>
                      <option value="Expiring Soon">Expiring Soon</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Remarks</label>
                    <textarea
                      className="form-control"
                      name="remarks"
                      value={document.remarks || ''}
                      onChange={(e) => handleFieldChange(e, index)}
                      rows={2}
                      placeholder="Enter any additional remarks"
                    />
                  </div>

                  {document.fileName && (
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        Uploaded on: {document.uploadDate}
                      </small>
                      {getDocumentStatusBadge(document.status)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="card mt-4">
        <div className="card-header">
          <h6 className="mb-0">Document Summary</h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <strong>Total Documents:</strong> {documents.length}
            </div>
            <div className="col-md-3">
              <strong>Active:</strong> {documents.filter(d => d.status === 'Active').length}
            </div>
            <div className="col-md-3">
              <strong>Expired:</strong> {documents.filter(d => d.status === 'Expired').length}
            </div>
            <div className="col-md-3">
              <strong>Expiring Soon:</strong> {documents.filter(d => d.status === 'Expiring Soon').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpDocumentDetails;
