import React from 'react';

const EnquiryMasterForm = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>New Enquiry</h2>
        <div className="badge bg-secondary">Coming soon</div>
      </div>

      <div className="card">
        <div className="card-body">
          <p className="mb-2">This form is currently pending implementation.</p>
          <p className="text-muted mb-0">
            Expected fields: visitor/customer details, enquiry subject, priority, assigned staff, and status.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnquiryMasterForm;

