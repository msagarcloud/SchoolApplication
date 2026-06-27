import React from 'react';
import { Link } from 'react-router-dom';

const InquiriesList = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>General Inquiries</h2>
        <div className="badge bg-secondary">Coming soon</div>
      </div>

      <div className="card">
        <div className="card-body">
          <p className="mb-2">This page is currently pending implementation.</p>
          <p className="text-muted mb-3">
            Expected features: inquiry list, priority/status filters, and assignment to staff.
          </p>

          <div className="d-flex gap-2 flex-wrap">
            <Link to="/enquiry-masters" className="btn btn-primary btn-sm">
              <i className="bi bi-list-ul me-2" />
              Enquiry List
            </Link>
            <Link to="/enquiry-masters/create" className="btn btn-outline-primary btn-sm">
              <i className="bi bi-plus-circle me-2" />
              New Enquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiriesList;


