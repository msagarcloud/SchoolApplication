import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import transportHelpService from '../../services/transportHelpService';

const TransportHelpDetail = () => {
  const { id } = useParams();
  const [helpTopic, setHelpTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHelpTopic();
  }, [id]);

  const loadHelpTopic = async () => {
    try {
      const data = await transportHelpService.getById(id);
      setHelpTopic(data);
    } catch (err) {
      setError('Failed to load help topic details. Please try again.');
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

  if (!helpTopic) {
    return (
      <div className="alert alert-warning">
        Help topic not found.
      </div>
    );
  }

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 1: return 'bg-danger';
      case 2: return 'bg-warning';
      case 3: return 'bg-info';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Help Topic Details</h4>
        <div className="btn-group" role="group">
          <Link to="/transport-help" className="btn btn-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <Link to={`/transport-help/${helpTopic.id}/edit`} className="btn btn-primary">
            <i className="bi bi-pencil me-2"></i>
            Edit Help Topic
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">
            {helpTopic.helpTitle}
            <span className={`badge ${getPriorityBadgeClass(helpTopic.priority)} ms-2`}>
              Priority {helpTopic.priority}
            </span>
            <span className={`badge ${helpTopic.isActive ? 'bg-success' : 'bg-danger'} ms-2`}>
              {helpTopic.isActive ? 'Active' : 'Inactive'}
            </span>
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h6>Topic Information</h6>
              <table className="table table-sm">
                <tr>
                  <td><strong>Title:</strong></td>
                  <td>{helpTopic.helpTitle}</td>
                </tr>
                <tr>
                  <td><strong>Category:</strong></td>
                  <td>
                    <span className="badge bg-secondary">{helpTopic.helpCategory || 'General'}</span>
                  </td>
                </tr>
                <tr>
                  <td><strong>Priority:</strong></td>
                  <td>
                    <span className={`badge ${getPriorityBadgeClass(helpTopic.priority)}`}>
                      {helpTopic.priority} - {
                        helpTopic.priority === 1 ? 'High' :
                        helpTopic.priority === 2 ? 'Medium' :
                        helpTopic.priority === 3 ? 'Low' : 'Information'
                      }
                    </span>
                  </td>
                </tr>
              </table>
            </div>
            <div className="col-md-6">
              <h6>System Information</h6>
              <table className="table table-sm">
                <tr>
                  <td><strong>Created Date:</strong></td>
                  <td>{new Date(helpTopic.createdDate).toLocaleString()}</td>
                </tr>
                <tr>
                  <td><strong>Modified Date:</strong></td>
                  <td>{helpTopic.modifiedDate ? new Date(helpTopic.modifiedDate).toLocaleString() : 'Never'}</td>
                </tr>
                <tr>
                  <td><strong>Status:</strong></td>
                  <td>
                    <span className={`badge ${helpTopic.isActive ? 'bg-success' : 'bg-danger'}`}>
                      {helpTopic.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <h6>Problem Description</h6>
              <div className="alert alert-info">
                <strong>Issue:</strong>
                <p className="mb-2">{helpTopic.helpDescription}</p>
              </div>
            </div>
          </div>

          {helpTopic.helpSolution && (
            <div className="row mt-4">
              <div className="col-12">
                <h6>Solution</h6>
                <div className="alert alert-success">
                  <strong>Resolution:</strong>
                  <p className="mb-0">{helpTopic.helpSolution}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransportHelpDetail;
