import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EmployeeDocumentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [document, setDocument] = useState({
    employeeId: '',
    documentType: '',
    documentName: '',
    file: null,
    uploadDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    description: '',
    isActive: true
  });

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    fetchEmployees();
    if (isEdit) {
      fetchDocument();
    }
  }, [id, isEdit]);

  const fetchEmployees = async () => {
    try {
      // Mock data - replace with actual API call
      const mockEmployees = [
        { id: 1, name: 'John Doe', employeeCode: 'EMP001' },
        { id: 2, name: 'Jane Smith', employeeCode: 'EMP002' },
        { id: 3, name: 'Mike Johnson', employeeCode: 'EMP003' }
      ];
      setEmployees(mockEmployees);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    }
  };

  const fetchDocument = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockDocument = {
        id: 1,
        employeeId: 1,
        documentType: 'Resume',
        documentName: 'John_Doe_Resume.pdf',
        uploadDate: '2024-01-15',
        expiryDate: '2025-01-15',
        description: 'Updated resume for 2024',
        isActive: true
      };
      setDocument(mockDocument);
    } catch (err) {
      setError(err.message || 'Failed to fetch document details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDocument(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocument(prev => ({
        ...prev,
        file: file,
        documentName: file.name
      }));
      
      // Create preview for image files
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      // Validate required fields
      if (!document.employeeId || !document.documentType || !document.file) {
        setError('Please fill in all required fields and select a file');
        return;
      }
      
      // Replace with actual API call
      console.log('Submitting document:', document);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/employee-documents');
    } catch (err) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'upload'} document`);
    } finally {
      setLoading(false);
    }
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
          <h2>{isEdit ? 'Edit Document' : 'Upload New Document'}</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/employee-documents">Employee Documents</Link>
              </li>
              <li className="breadcrumb-item active">
                {isEdit ? 'Edit' : 'Upload'}
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/employee-documents" className="btn btn-outline-secondary me-2">
            <i className="bi bi-x-lg me-2"></i>
            Cancel
          </Link>
          <button 
            type="submit" 
            form="document-form"
            className="btn btn-primary"
            disabled={loading}
          >
            <i className="bi bi-check-lg me-2"></i>
            {loading ? 'Saving...' : (isEdit ? 'Update' : 'Upload')}
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
        <form id="document-form" onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="employeeId" className="form-label">
                    Employee <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="employeeId"
                    name="employeeId"
                    value={document.employeeId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Employee</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name} ({employee.employeeCode})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="documentType" className="form-label">
                    Document Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="documentType"
                    name="documentType"
                    value={document.documentType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Document Type</option>
                    <option value="Resume">Resume</option>
                    <option value="Contract">Contract</option>
                    <option value="ID Proof">ID Proof</option>
                    <option value="Address Proof">Address Proof</option>
                    <option value="Educational Certificate">Educational Certificate</option>
                    <option value="Experience Certificate">Experience Certificate</option>
                    <option value="Passport">Passport</option>
                    <option value="PAN Card">PAN Card</option>
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="file" className="form-label">
                    Document File <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    required={!isEdit}
                  />
                  <div className="form-text">
                    Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB)
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="expiryDate" className="form-label">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="expiryDate"
                    name="expiryDate"
                    value={document.expiryDate}
                    onChange={handleInputChange}
                    min={document.uploadDate}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={document.description}
                    onChange={handleInputChange}
                    placeholder="Enter document description..."
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={document.isActive}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="isActive">
                    Document is Active
                  </label>
                </div>
              </div>
            </div>

            {/* File Preview */}
            {filePreview && (
              <div className="row mt-3">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">File Preview</h6>
                    </div>
                    <div className="card-body text-center">
                      <img 
                        src={filePreview} 
                        alt="Document preview" 
                        className="img-fluid"
                        style={{ maxHeight: '300px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeDocumentForm;
