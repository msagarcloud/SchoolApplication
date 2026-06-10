import React from 'react';

const PlaceholderPage = ({ title, description }) => {
  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className="text-muted mb-4">
            {description || 'This page is not implemented yet. Please contact your administrator for access or implementation details.'}
          </p>
          <div className="alert alert-warning">
            This is a placeholder page. The full implementation is pending.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
