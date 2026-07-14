import React from 'react';
import { Link } from 'react-router-dom';

const EnquiryMasterList = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Enquiry List</h2>
        <div className="badge bg-secondary">Coming soon</div>
      </div>

      <div className="card">
        <div className="card-body">
          <p className="mb-2">This page is currently pending implementation.</p>
          <p className="text-muted mb-3">Manage general enquiries here (list, filters, and status updates).</p>
          <Link to="/enquiry-masters/create" className="btn btn-primary btn-sm">
            <i className="bi bi-plus-circle me-2" />
            Create Enquiry
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnquiryMasterList;

