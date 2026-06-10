import React from 'react';

/**
 * A beautiful, premium AlertMessage component for validation errors, success messages, etc.
 * Supports icons corresponding to warning levels, dismissible closing, and micro-fade entry.
 */
const AlertMessage = ({
  message,
  type = 'danger', // 'success', 'danger', 'warning', 'info'
  onClose,
  dismissible = false,
  icon
}) => {
  if (!message) return null;

  const getIconClass = () => {
    if (icon) return icon;
    switch (type) {
      case 'success':
        return 'bi-check-circle-fill';
      case 'danger':
        return 'bi-exclamation-triangle-fill';
      case 'warning':
        return 'bi-exclamation-circle-fill';
      case 'info':
        return 'bi-info-circle-fill';
      default:
        return '';
    }
  };

  const iconClass = getIconClass();

  return (
    <div
      className={`alert alert-${type} d-flex align-items-center shadow-sm rounded-3 py-3 px-4 mb-4 custom-alert fade show ${
        dismissible || onClose ? 'alert-dismissible' : ''
      }`}
      role="alert"
    >
      {iconClass && (
        <span className={`alert-icon-container text-${type} me-3 d-flex align-items-center justify-content-center`}>
          <i className={`bi ${iconClass} fs-5`}></i>
        </span>
      )}
      <div className="flex-grow-1 alert-text fw-medium small-95">{message}</div>
      {(dismissible || onClose) && (
        <button
          type="button"
          className="btn-close shadow-none"
          aria-label="Close"
          onClick={onClose}
        ></button>
      )}

      <style>{`
        .custom-alert {
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border-left: 4px solid var(--bs-alert-border-color, currentColor);
        }
        .small-95 {
          font-size: 0.95rem;
          line-height: 1.5;
        }
        .alert-icon-container {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: rgba(var(--bs-alert-color-rgb, 0,0,0), 0.1);
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AlertMessage;
