import React from 'react';

/**
 * A premium reusable Loading Spinner component.
 * Features centered flexboxes, customizable sizes, colors, spin animations, and typography.
 */
const LoadingSpinner = ({
  message = 'Loading...',
  size = 'md', // 'sm', 'md', 'lg'
  fullWidth = true,
  type = 'border', // 'border' or 'grow'
  color = 'primary' // 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'
}) => {
  const spinnerSizeClass = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  }[size] || '';

  const containerClass = fullWidth
    ? 'd-flex flex-column justify-content-center align-items-center py-5 w-100 my-4 loading-container'
    : 'd-inline-flex flex-column align-items-center loading-container';

  const spinnerStyle = size === 'lg' 
    ? { width: '3.5rem', height: '3.5rem', borderWidth: '0.28em' } 
    : undefined;

  return (
    <div className={containerClass}>
      <div
        className={`spinner-${type} text-${color} ${spinnerSizeClass} custom-spinner`}
        role="status"
        style={spinnerStyle}
      >
        <span className="visually-hidden">{message}</span>
      </div>
      {message && (
        <span className="mt-3 text-muted small fw-semibold tracking-wide text-uppercase animate-pulse">
          {message}
        </span>
      )}

      <style>{`
        .loading-container {
          animation: fadeIn 0.4s ease-out;
        }
        .custom-spinner {
          transition: transform 0.3s ease;
        }
        .animate-pulse {
          animation: pulse 1.6s infinite ease-in-out;
          letter-spacing: 0.05em;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
