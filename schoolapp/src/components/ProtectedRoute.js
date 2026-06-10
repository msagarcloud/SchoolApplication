import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Spinner } from 'react-bootstrap';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, refreshTokenIfNeeded, tokenRemainingTime } = useAuth();
  const location = useLocation();
  const [checkingToken, setCheckingToken] = useState(false);

  useEffect(() => {
    // Check if token needs refresh when accessing protected routes
    if (isAuthenticated && tokenRemainingTime < 300 && !checkingToken) { // Less than 5 minutes
      setCheckingToken(true);
      refreshTokenIfNeeded().finally(() => {
        setCheckingToken(false);
      });
    }
  }, [isAuthenticated, tokenRemainingTime, refreshTokenIfNeeded, checkingToken]);

  if (loading || checkingToken) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="text-muted">
            {checkingToken ? 'Refreshing session...' : 'Verifying authentication...'}
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
