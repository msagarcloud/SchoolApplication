import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import transportAssignmentService from '../../services/transportAssignmentService';

const TransportAssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      setLoading(true);
      const data = await transportAssignmentService.getAll();
      setAssignments(data);
    } catch (err) {
      setError('Failed to load transport assignments. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transport assignment?')) {
      try {
        await transportAssignmentService.delete(id);
        setAssignments(assignments.filter(assignment => assignment.id !== id));
      } catch (err) {
        setError('Failed to delete transport assignment. Please try again.');
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
        <h4>Transport Assignments</h4>
        <Link to="/transport-assignments/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add Assignment
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Student</th>
              <th>Vehicle</th>
              <th>Driver</th>
              <th>Route</th>
              <th>Monthly Fee</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>
                  {assignment.student && (
                    <div>
                      <strong>{assignment.student.firstName} {assignment.student.lastName}</strong>
                      {assignment.student.studentNumber && <div className="text-muted small">{assignment.student.studentNumber}</div>}
                    </div>
                  )}
                </td>
                <td>
                  {assignment.vehicle && (
                    <div>
                      <strong>{assignment.vehicle.vehicleNumber}</strong>
                      {assignment.vehicle.vehicleModel && <div className="text-muted small">{assignment.vehicle.vehicleModel}</div>}
                    </div>
                  )}
                </td>
                <td>
                  {assignment.driver && (
                    <div>
                      <strong>{assignment.driver.firstName} {assignment.driver.lastName}</strong>
                      {assignment.driver.mobileNumber && <div className="text-muted small">{assignment.driver.mobileNumber}</div>}
                    </div>
                  )}
                </td>
                <td>
                  {assignment.route && (
                    <div>
                      <strong>{assignment.route.routeName}</strong>
                      <div className="text-muted small">{assignment.route.startPoint} → {assignment.route.endPoint}</div>
                    </div>
                  )}
                </td>
                <td>{assignment.monthlyFee ? `$${assignment.monthlyFee}` : 'N/A'}</td>
                <td>
                  <span className={`badge ${assignment.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {assignment.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <Link to={`/transport-assignments/${assignment.id}`} className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-eye"></i>
                    </Link>
                    <Link to={`/transport-assignments/${assignment.id}/edit`} className="btn btn-sm btn-outline-warning">
                      <i className="bi bi-pencil"></i>
                    </Link>
                    <button 
                      onClick={() => handleDelete(assignment.id)} 
                      className="btn btn-sm btn-outline-danger"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {assignments.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No transport assignments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransportAssignmentList;
