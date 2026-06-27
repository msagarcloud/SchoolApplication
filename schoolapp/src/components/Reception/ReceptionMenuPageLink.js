import React from 'react';
import { Link } from 'react-router-dom';

const ReceptionMenuPageLink = ({ to, iconClass, label }) => {
  return (
    <Link to={to} className="text-decoration-none">
      <div className="d-flex align-items-center p-3 rounded border bg-white h-100">
        <i className={`bi ${iconClass} me-2 text-primary`} />
        <div className="fw-semibold text-truncate">{label}</div>
      </div>
    </Link>
  );
};

export default ReceptionMenuPageLink;

