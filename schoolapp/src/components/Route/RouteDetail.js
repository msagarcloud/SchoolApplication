import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import routeService from '../../services/routeService';

const RouteDetail = () => {
  const { id } = useParams();
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRoute();
  }, [id]);

  const loadRoute = async () => {
    try {
      const data = await routeService.getById(id);
      setRoute(data);
    } catch (err) {
      setError('Failed to load route details. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
      </div>
    );
  }

  if (!route) {
    return (
      <div className="alert alert-warning">
        Route not found.
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Route Details</h4>
        <div className="btn-group" role="group">
          <Link to="/routes" className="btn btn-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <Link to={`/routes/${route.id}/edit`} className="btn btn-primary">
            <i className="bi bi-pencil me-2"></i>
            Edit Route
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">
            {route.routeName}
            <span className={`badge ${route.isActive ? 'bg-success' : 'bg-danger'} ms-2`}>
              {route.isActive ? 'Active' : 'Inactive'}
            </span>
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h6>Route Information</h6>
              <table className="table table-sm">
                <tr>
                  <td><strong>Route Name:</strong></td>
                  <td>{route.routeName}</td>
                </tr>
                <tr>
                  <td><strong>Start Point:</strong></td>
                  <td>{route.startPoint}</td>
                </tr>
                <tr>
                  <td><strong>End Point:</strong></td>
                  <td>{route.endPoint}</td>
                </tr>
                <tr>
                  <td><strong>Distance:</strong></td>
                  <td>{route.distance ? `${route.distance} km` : 'N/A'}</td>
                </tr>
                <tr>
                  <td><strong>Estimated Time:</strong></td>
                  <td>{route.estimatedTime || 'N/A'}</td>
                </tr>
                <tr>
                  <td><strong>Fare:</strong></td>
                  <td>{route.fare ? `$${route.fare}` : 'N/A'}</td>
                </tr>
                {route.intermediateStops && (
                  <tr>
                    <td><strong>Intermediate Stops:</strong></td>
                    <td>{route.intermediateStops}</td>
                  </tr>
                )}
                {route.routeDescription && (
                  <tr>
                    <td><strong>Description:</strong></td>
                    <td>{route.routeDescription}</td>
                  </tr>
                )}
              </table>
            </div>
            <div className="col-md-6">
              <h6>System Information</h6>
              <table className="table table-sm">
                <tr>
                  <td><strong>Created Date:</strong></td>
                  <td>{new Date(route.createdDate).toLocaleString()}</td>
                </tr>
                <tr>
                  <td><strong>Modified Date:</strong></td>
                  <td>{route.modifiedDate ? new Date(route.modifiedDate).toLocaleString() : 'Never'}</td>
                </tr>
                <tr>
                  <td><strong>Status:</strong></td>
                  <td>
                    <span className={`badge ${route.isActive ? 'bg-success' : 'bg-danger'}`}>
                      {route.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteDetail;
