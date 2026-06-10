import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import transportHelpService from '../../services/transportHelpService';

const TransportHelpList = () => {
  const [helpTopics, setHelpTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHelpTopics();
  }, []);

  const loadHelpTopics = async () => {
    try {
      setLoading(true);
      const data = await transportHelpService.getAll();
      setHelpTopics(data);
    } catch (err) {
      setError('Failed to load transport help topics. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this help topic?')) {
      try {
        await transportHelpService.delete(id);
        setHelpTopics(helpTopics.filter(topic => topic.id !== id));
      } catch (err) {
        setError('Failed to delete help topic. Please try again.');
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
        <h4>Transport Help & Support</h4>
        <Link to="/transport-help/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add Help Topic
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Help Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {helpTopics.map((topic) => (
              <tr key={topic.id}>
                <td>
                  <strong>{topic.helpTitle}</strong>
                  {topic.priority && (
                    <span className={`badge ms-2 ${
                      topic.priority === 1 ? 'bg-danger' :
                      topic.priority === 2 ? 'bg-warning' :
                      topic.priority === 3 ? 'bg-info' : 'bg-secondary'
                    }`}>
                      Priority {topic.priority}
                    </span>
                  )}
                </td>
                <td>
                  <span className="badge bg-secondary">{topic.helpCategory || 'General'}</span>
                </td>
                <td>
                  <span className={`badge ${
                    topic.priority === 1 ? 'bg-danger' :
                    topic.priority === 2 ? 'bg-warning' :
                    topic.priority === 3 ? 'bg-info' : 'bg-secondary'
                  }`}>
                    {topic.priority || 'N/A'}
                  </span>
                </td>
                <td>
                  <span className={`badge ${topic.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {topic.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <Link to={`/transport-help/${topic.id}`} className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-eye"></i>
                    </Link>
                    <Link to={`/transport-help/${topic.id}/edit`} className="btn btn-sm btn-outline-warning">
                      <i className="bi bi-pencil"></i>
                    </Link>
                    <button 
                      onClick={() => handleDelete(topic.id)} 
                      className="btn btn-sm btn-outline-danger"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {helpTopics.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No help topics found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransportHelpList;
