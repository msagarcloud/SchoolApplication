import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EmployeeProfessionalQualificationDetail = () => {
  const { id } = useParams();
  const [qualification, setQualification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQualification();
  }, [id]);

  const fetchQualification = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockQualification = {
        id: 1,
        employeeId: 1,
        employeeName: 'John Doe',
        employeeCode: 'EMP001',
        department: 'IT',
        qualification: 'Master of Computer Applications',
        specialization: 'Software Engineering',
        institute: 'University of Technology',
        university: 'State University',
        yearOfPassing: '2020',
        percentage: '85',
        grade: 'A+',
        certificateFileName: 'MCA_Certificate.pdf',
        certificateFileSize: '2.5 MB',
        certificateFileType: 'PDF',
        isVerified: true,
        verificationDate: '2024-01-15',
        verifiedBy: 'HR Manager',
        remarks: 'Professional qualification verified with original documents. All credentials are authentic.',
        addedDate: '2024-01-10',
        lastModified: '2024-01-15',
        addedBy: 'Admin User'
      };
      setQualification(mockQualification);
    } catch (err) {
      setError(err.message || 'Failed to fetch qualification details');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCertificate = () => {
    // Implement download functionality
    window.alert(`Downloading ${qualification.certificateFileName}...`);
  };

  const handlePrint = () => {
    window.print();
  };

  const getVerificationBadge = (isVerified) => {
    return isVerified ? (
      <span className="badge bg-success fs-6">
        <i className="bi bi-check-circle me-1"></i>
        Verified
      </span>
    ) : (
      <span className="badge bg-warning fs-6">
        <i className="bi bi-clock me-1"></i>
        Pending Verification
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
        <Link to="/employee-professional-qualifications" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Qualifications
        </Link>
      </div>
    );
  }

  if (!qualification) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Qualification not found
        </div>
        <Link to="/employee-professional-qualifications" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Qualifications
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Professional Qualification Details</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/employee-professional-qualifications">Professional Qualifications</Link>
              </li>
              <li className="breadcrumb-item active">Qualification Details</li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/employee-professional-qualifications" className="btn btn-outline-secondary me-2">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <button className="btn btn-outline-info me-2" onClick={handlePrint}>
            <i className="bi bi-printer me-2"></i>
            Print
          </button>
          <Link to={`/employee-professional-qualifications/${id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
        </div>
      </div>

      {/* Verification Status */}
      <div className={`alert alert-${qualification.isVerified ? 'success' : 'warning'}`} role="alert">
        <div className="d-flex align-items-center">
          {getVerificationBadge(qualification.isVerified)}
          <div className="ms-3">
            <strong>Verification Status: {qualification.isVerified ? 'Verified' : 'Pending'}</strong>
            {qualification.isVerified && qualification.verificationDate && (
              <div className="small">
                Verified by {qualification.verifiedBy} on {qualification.verificationDate}
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
                      <Link to={`/employees/${qualification.employeeId}`} className="text-decoration-none">
                        {qualification.employeeName}
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Employee Code</label>
                    <p className="form-control-plaintext">{qualification.employeeCode}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label text-muted">Department</label>
                    <p className="form-control-plaintext">{qualification.department}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Qualification Details */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Qualification Details</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Qualification</label>
                    <p className="form-control-plaintext">{qualification.qualification}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Specialization</label>
                    <p className="form-control-plaintext">{qualification.specialization || 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Institute</label>
                    <p className="form-control-plaintext">{qualification.institute}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">University</label>
                    <p className="form-control-plaintext">{qualification.university || 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Year of Passing</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-primary">{qualification.yearOfPassing}</span>
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Percentage</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-info">{qualification.percentage}%</span>
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Grade</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-success">{qualification.grade}</span>
                    </p>
                  </div>
                </div>
              </div>

              {qualification.remarks && (
                <div className="mb-3">
                  <label className="form-label text-muted">Remarks</label>
                  <p className="form-control-plaintext">{qualification.remarks}</p>
                </div>
              )}
            </div>
          </div>

          {/* Certificate Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Certificate Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Certificate File</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-file-earmark-pdf me-2"></i>
                      {qualification.certificateFileName}
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">File Size</label>
                    <p className="form-control-plaintext">{qualification.certificateFileSize}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">File Type</label>
                    <p className="form-control-plaintext">{qualification.certificateFileType}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button 
                    className="btn btn-primary"
                    onClick={handleDownloadCertificate}
                  >
                    <i className="bi bi-download me-2"></i>
                    Download Certificate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          {/* Verification Details */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Verification Details</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-muted">Status</label>
                <p className="form-control-plaintext">
                  {getVerificationBadge(qualification.isVerified)}
                </p>
              </div>
              {qualification.isVerified && (
                <>
                  <div className="mb-3">
                    <label className="form-label text-muted">Verified By</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-person-check me-2"></i>
                      {qualification.verifiedBy}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Verification Date</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-calendar-check me-2"></i>
                      {qualification.verificationDate}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Timeline</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-muted">Added On</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-calendar-plus me-2"></i>
                  {qualification.addedDate}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Added By</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-person-plus me-2"></i>
                  {qualification.addedBy}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Last Modified</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-pencil-square me-2"></i>
                  {qualification.lastModified}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link to={`/employee-professional-qualifications/${id}/edit`} className="btn btn-outline-warning">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Qualification
                </Link>
                <button 
                  className="btn btn-outline-danger"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this qualification?')) {
                      // Implement delete functionality
                      window.alert('Delete functionality to be implemented');
                    }
                  }}
                >
                  <i className="bi bi-trash me-2"></i>
                  Delete Qualification
                </button>
                <button 
                  className="btn btn-outline-success"
                  onClick={() => {
                    // Implement verify functionality
                    window.alert('Verify functionality to be implemented');
                  }}
                  disabled={qualification.isVerified}
                >
                  <i className="bi bi-check-circle me-2"></i>
                  {qualification.isVerified ? 'Already Verified' : 'Verify Qualification'}
                </button>
                <button 
                  className="btn btn-outline-primary"
                  onClick={handleDownloadCertificate}
                >
                  <i className="bi bi-download me-2"></i>
                  Download Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfessionalQualificationDetail;
