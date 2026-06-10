import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import routeService from '../../services/routeService';

const RouteList = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      setLoading(true);
      const data = await routeService.getAll();
      setRoutes(data);
    } catch (err) {
      setError('Failed to load routes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      try {
        await routeService.delete(id);
        setRoutes(routes.filter(route => route.id !== id));
      } catch (err) {
        setError('Failed to delete route. Please try again.');
        console.error(err);
      }
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

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Route Management</h4>
        <Link to="/routes/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add Route
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Route Name</th>
              <th>Start Point</th>
              <th>End Point</th>
              <th>Distance</th>
              <th>Fare</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.id}>
                <td>{route.routeName}</td>
                <td>{route.startPoint}</td>
                <td>{route.endPoint}</td>
                <td>{route.distance ? `${route.distance} km` : 'N/A'}</td>
                <td>{route.fare ? `$${route.fare}` : 'N/A'}</td>
                <td>
                  <span className={`badge ${route.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {route.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <Link to={`/routes/${route.id}`} className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-eye"></i>
                    </Link>
                    <Link to={`/routes/${route.id}/edit`} className="btn btn-sm btn-outline-warning">
                      <i className="bi bi-pencil"></i>
                    </Link>
                    <button 
                      onClick={() => handleDelete(route.id)} 
                      className="btn btn-sm btn-outline-danger"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {routes.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No routes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RouteList;
