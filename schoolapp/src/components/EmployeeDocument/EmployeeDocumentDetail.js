import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EmployeeDocumentDetail = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDocument();
  }, [id]);

  const fetchDocument = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockDocument = {
        id: 1,
        employeeId: 1,
        employeeName: 'John Doe',
        employeeCode: 'EMP001',
        documentType: 'Resume',
        documentName: 'John_Doe_Resume.pdf',
        uploadDate: '2024-01-15',
        expiryDate: '2025-01-15',
        description: 'Updated resume for 2024 with latest experience and skills',
        fileSize: '2.5 MB',
        fileType: 'PDF',
        isActive: true,
        uploadedBy: 'Admin User',
        lastModified: '2024-01-15',
        downloadCount: 15
      };
      setDocument(mockDocument);
    } catch (err) {
      setError(err.message || 'Failed to fetch document details');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // Implement download functionality
    window.alert('Download functionality to be implemented');
  };

  const getStatusBadge = (isActive, expiryDate) => {
    if (!isActive) {
      return <span className="badge bg-secondary">Inactive</span>;
    }
    
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) {
      return <span className="badge bg-danger">Expired</span>;
    } else if (daysUntilExpiry <= 30) {
      return <span className="badge bg-warning">Expiring Soon</span>;
    } else {
      return <span className="badge bg-success">Active</span>;
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
        <Link to="/employee-documents" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Documents
        </Link>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Document not found
        </div>
        <Link to="/employee-documents" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Documents
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Document Details</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/employee-documents">Employee Documents</Link>
              </li>
              <li className="breadcrumb-item active">Document Details</li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/employee-documents" className="btn btn-outline-secondary me-2">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <Link to={`/employee-documents/${id}/edit`} className="btn btn-warning me-2">
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
          <button className="btn btn-primary" onClick={handleDownload}>
            <i className="bi bi-download me-2"></i>
            Download
          </button>
        </div>
      </div>

      {/* Document Details */}
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Document Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Employee Name</label>
                    <p className="form-control-plaintext">
                      <Link to={`/employees/${document.employeeId}`} className="text-decoration-none">
                        {document.employeeName}
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Employee Code</label>
                    <p className="form-control-plaintext">{document.employeeCode}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Document Type</label>
                    <p className="form-control-plaintext">{document.documentType}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Document Name</label>
                    <p className="form-control-plaintext">{document.documentName}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">File Type</label>
                    <p className="form-control-plaintext">{document.fileType}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">File Size</label>
                    <p className="form-control-plaintext">{document.fileSize}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Upload Date</label>
                    <p className="form-control-plaintext">{document.uploadDate}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Expiry Date</label>
                    <p className="form-control-plaintext">
                      {document.expiryDate || 'No expiry date'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Status</label>
                    <p className="form-control-plaintext">
                      {getStatusBadge(document.isActive, document.expiryDate)}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Download Count</label>
                    <p className="form-control-plaintext">{document.downloadCount} times</p>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-muted">Description</label>
                <p className="form-control-plaintext">
                  {document.description || 'No description provided'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Additional Information</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-muted">Uploaded By</label>
                <p className="form-control-plaintext">{document.uploadedBy}</p>
              </div>

              <div className="mb-3">
                <label className="form-label text-muted">Last Modified</label>
                <p className="form-control-plaintext">{document.lastModified}</p>
              </div>

              <div className="mb-3">
                <label className="form-label text-muted">Document ID</label>
                <p className="form-control-plaintext">#{document.id}</p>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary" onClick={handleDownload}>
                  <i className="bi bi-download me-2"></i>
                  Download Document
                </button>
                <Link to={`/employee-documents/${id}/edit`} className="btn btn-outline-warning">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Document
                </Link>
                <button 
                  className="btn btn-outline-danger"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this document?')) {
                      // Implement delete functionality
                      window.alert('Delete functionality to be implemented');
                    }
                  }}
                >
                  <i className="bi bi-trash me-2"></i>
                  Delete Document
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDocumentDetail;
