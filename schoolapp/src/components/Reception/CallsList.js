import React from 'react';

const CallsList = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Phone Calls</h2>
        <div className="badge bg-secondary">Coming soon</div>
      </div>

      <div className="card">
        <div className="card-body">
          <p className="mb-2">
            This page is currently pending implementation.
          </p>
          <p className="text-muted mb-0">
            Expected features: call log list, filters (date/status), and quick actions (log call / mark follow-up).
          </p>
        </div>
      </div>
    </div>
  );
};

export default CallsList;

