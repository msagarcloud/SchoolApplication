import React, { Suspense, memo } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteLoadFallback = memo(() => (
  <div className="d-flex justify-content-center align-items-center py-5">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading page...</span>
    </div>
  </div>
));

const OptimizedRoute = memo(({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        <Suspense fallback={<RouteLoadFallback />}>
          <Component />
        </Suspense>
      }
    />
  );
});

OptimizedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
};

export default OptimizedRoute;
