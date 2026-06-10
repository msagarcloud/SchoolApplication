import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import transportAssignmentService from '../../services/transportAssignmentService';

const TransportAssignmentDetail = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAssignment();
  }, [id]);

  const loadAssignment = async () => {
    try {
      const data = await transportAssignmentService.getById(id);
      setAssignment(data);
    } catch (err) {
      setError('Failed to load transport assignment details. Please try again.');
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

  if (!assignment) {
    return (
      <div className="alert alert-warning">
        Transport assignment not found.
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Transport Assignment Details</h4>
        <div className="btn-group" role="group">
          <Link to="/transport-assignments" className="btn btn-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <Link to={`/transport-assignments/${assignment.id}/edit`} className="btn btn-primary">
            <i className="bi bi-pencil me-2"></i>
            Edit Assignment
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">
            Transport Assignment
            <span className={`badge ${assignment.isActive ? 'bg-success' : 'bg-danger'} ms-2`}>
              {assignment.isActive ? 'Active' : 'Inactive'}
            </span>
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h6>Assignment Information</h6>
              <table className="table table-sm">
                <tr>
                  <td><strong>Assignment Date:</strong></td>
                  <td>{assignment.assignmentDate ? new Date(assignment.assignmentDate).toLocaleDateString() : 'N/A'}</td>
                </tr>
                <tr>
                  <td><strong>Effective From:</strong></td>
                  <td>{assignment.effectiveFrom ? new Date(assignment.effectiveFrom).toLocaleDateString() : 'N/A'}</td>
                </tr>
                <tr>
                  <td><strong>Effective To:</strong></td>
                  <td>{assignment.effectiveTo ? new Date(assignment.effectiveTo).toLocaleDateString() : 'N/A'}</td>
                </tr>
                <tr>
                  <td><strong>Monthly Fee:</strong></td>
                  <td>{assignment.monthlyFee ? `$${assignment.monthlyFee}` : 'N/A'}</td>
                </tr>
              </table>
            </div>
            <div className="col-md-6">
              <h6>Timing Information</h6>
              <table className="table table-sm">
                <tr>
                  <td><strong>Pickup Point:</strong></td>
                  <td>{assignment.pickupPoint || 'N/A'}</td>
                </tr>
                <tr>
                  <td><strong>Drop Point:</strong></td>
                  <td>{assignment.dropPoint || 'N/A'}</td>
                </tr>
                <tr>
                  <td><strong>Pickup Time:</strong></td>
                  <td>{assignment.pickupTime || 'N/A'}</td>
                </tr>
                <tr>
                  <td><strong>Drop Time:</strong></td>
                  <td>{assignment.dropTime || 'N/A'}</td>
                </tr>
              </table>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-6">
              <h6>Student Information</h6>
              {assignment.student && (
                <table className="table table-sm">
                  <tr>
                    <td><strong>Name:</strong></td>
                    <td>{assignment.student.firstName} {assignment.student.lastName}</td>
                  </tr>
                  {assignment.student.studentNumber && (
                    <tr>
                      <td><strong>Student Number:</strong></td>
                      <td>{assignment.student.studentNumber}</td>
                    </tr>
                  )}
                </table>
              )}
            </div>
            <div className="col-md-6">
              <h6>Vehicle Information</h6>
              {assignment.vehicle && (
                <table className="table table-sm">
                  <tr>
                    <td><strong>Vehicle Number:</strong></td>
                    <td>{assignment.vehicle.vehicleNumber}</td>
                  </tr>
                  {assignment.vehicle.vehicleModel && (
                    <tr>
                      <td><strong>Model:</strong></td>
                      <td>{assignment.vehicle.vehicleModel}</td>
                    </tr>
                  )}
                </table>
              )}
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-6">
              <h6>Driver Information</h6>
              {assignment.driver && (
                <table className="table table-sm">
                  <tr>
                    <td><strong>Name:</strong></td>
                    <td>{assignment.driver.firstName} {assignment.driver.lastName}</td>
                  </tr>
                  {assignment.driver.mobileNumber && (
                    <tr>
                      <td><strong>Contact:</strong></td>
                      <td>{assignment.driver.mobileNumber}</td>
                    </tr>
                  )}
                </table>
              )}
            </div>
            <div className="col-md-6">
              <h6>Route Information</h6>
              {assignment.route && (
                <table className="table table-sm">
                  <tr>
                    <td><strong>Route Name:</strong></td>
                    <td>{assignment.route.routeName}</td>
                  </tr>
                  <tr>
                    <td><strong>Route:</strong></td>
                    <td>{assignment.route.startPoint} → {assignment.route.endPoint}</td>
                  </tr>
                </table>
              )}
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <h6>System Information</h6>
              <table className="table table-sm">
                <tr>
                  <td><strong>Created Date:</strong></td>
                  <td>{new Date(assignment.createdDate).toLocaleString()}</td>
                </tr>
                <tr>
                  <td><strong>Modified Date:</strong></td>
                  <td>{assignment.modifiedDate ? new Date(assignment.modifiedDate).toLocaleString() : 'Never'}</td>
                </tr>
                <tr>
                  <td><strong>Status:</strong></td>
                  <td>
                    <span className={`badge ${assignment.isActive ? 'bg-success' : 'bg-danger'}`}>
                      {assignment.isActive ? 'Active' : 'Inactive'}
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

export default TransportAssignmentDetail;
