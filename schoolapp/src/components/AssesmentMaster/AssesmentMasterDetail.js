import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { assesmentMasterService } from '../../services/assesmentMasterService';
import { authService } from '../../services/authService';

const AssesmentMasterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assesment, setAssesment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await assesmentMasterService.getById(id);
        setAssesment(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch assessment details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await assesmentMasterService.delete(id);
      navigate('/assessments');
    } catch (err) {
      setError(err.message || 'Failed to delete assessment');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error && !assesment) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
        <Link to="/assessments" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>Back to Assessments
        </Link>
      </div>
    );
  }

  if (!assesment) return null;

  return (
    <div className="container-fluid">
      {/* School/Company header */}
      <div className="row mb-3">
        <div className="col-12">
          <div className="card bg-light">
            <div className="card-body py-2">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h6 className="mb-0 text-primary">
                    <i className="bi bi-building me-2"></i>
                    <strong>{authService.getSchoolName() || 'School Name'}</strong>
                  </h6>
                </div>
                <div className="col-md-6 text-md-end">
                  <h6 className="mb-0 text-secondary">
                    <i className="bi bi-briefcase me-2"></i>
                    {authService.getCompanyName() || 'Company Name'}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="bi bi-clipboard-check me-2 text-primary"></i>
          Assessment Details
        </h2>
        <div className="d-flex gap-2">
          <Link to="/assessments" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>Back
          </Link>
          <Link to={`/assessments/${id}/edit`} className="btn btn-primary">
            <i className="bi bi-pencil me-2"></i>Edit
          </Link>
          <button className="btn btn-danger" onClick={() => setDeleteConfirm(true)}>
            <i className="bi bi-trash me-2"></i>Delete
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            <i className="bi bi-clipboard-data me-2"></i>
            {assesment.name}
            <span className={`badge ms-3 ${assesment.isActive ? 'bg-success' : 'bg-secondary'}`}>
              {assesment.isActive ? 'Active' : 'Inactive'}
            </span>
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th className="text-muted" style={{ width: '40%' }}>Name</th>
                    <td><strong>{assesment.name || '-'}</strong></td>
                  </tr>
                  <tr>
                    <th className="text-muted">Weightage</th>
                    <td>
                      {assesment.percentageWeightage != null
                        ? `${assesment.percentageWeightage}%`
                        : '-'}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-muted">From Period</th>
                    <td>
                      {assesment.fromPeriod
                        ? new Date(assesment.fromPeriod).toLocaleDateString()
                        : '-'}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-muted">To Period</th>
                    <td>
                      {assesment.toPeriod
                        ? new Date(assesment.toPeriod).toLocaleDateString()
                        : '-'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th className="text-muted" style={{ width: '40%' }}>Status</th>
                    <td>
                      <span className={`badge ${assesment.isActive ? 'bg-success' : 'bg-secondary'}`}>
                        {assesment.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th className="text-muted">Created Date</th>
                    <td>{assesment.createdDate ? new Date(assesment.createdDate).toLocaleDateString() : '-'}</td>
                  </tr>
                  <tr>
                    <th className="text-muted">Modified Date</th>
                    <td>{assesment.modifiedDate ? new Date(assesment.modifiedDate).toLocaleDateString() : '-'}</td>
                  </tr>
                  <tr>
                    <th className="text-muted">Status Message</th>
                    <td>{assesment.statusMessage || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {assesment.description && (
            <div className="row mt-2">
              <div className="col-12">
                <h6 className="text-muted">Description</h6>
                <p>{assesment.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-exclamation-triangle text-danger me-2"></i>
                  Confirm Delete
                </h5>
                <button type="button" className="btn-close" onClick={() => setDeleteConfirm(false)}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete assessment <strong>"{assesment.name}"</strong>? This action cannot be undone.
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setDeleteConfirm(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  <i className="bi bi-trash me-2"></i>Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssesmentMasterDetail;
