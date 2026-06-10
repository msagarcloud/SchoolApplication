import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assesmentMasterService } from '../../services/assesmentMasterService';
import { authService } from '../../services/authService';

const AssesmentMasterList = () => {
  const [assesments, setAssesments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  const fetchAssesments = async () => {
    try {
      setLoading(true);
      const data = await assesmentMasterService.getAll();
      setAssesments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load assessments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssesments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await assesmentMasterService.delete(id);
      setAssesments((prev) => prev.filter((a) => a.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError(err.message || 'Failed to delete assessment');
    }
  };

  const filtered = assesments.filter(
    (a) =>
      (a.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

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

      {/* Page header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">
            <i className="bi bi-clipboard-check me-2 text-primary"></i>
            Assessment Master
          </h2>
          <p className="text-muted mb-0 mt-1">Manage exam assessments and their weightages</p>
        </div>
        <Link to="/assessments/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add Assessment
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="bi bi-list-ul me-2"></i>
            Assessments ({filtered.length})
          </h5>
          <div className="col-md-4">
            <div className="input-group input-group-sm">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="assesmentSearch"
              />
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          {filtered.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-clipboard-x fs-1 text-muted"></i>
              <h5 className="mt-3 text-muted">No assessments found</h5>
              <p className="text-muted">
                {searchTerm ? 'Try adjusting your search.' : 'Create your first assessment to get started.'}
              </p>
              {!searchTerm && (
                <Link to="/assessments/create" className="btn btn-primary">
                  <i className="bi bi-plus-circle me-2"></i>Add Assessment
                </Link>
              )}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Weightage (%)</th>
                    <th>From Period</th>
                    <th>To Period</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((assesment, idx) => (
                    <tr key={assesment.id}>
                      <td>{idx + 1}</td>
                      <td>
                        <strong>{assesment.name || '-'}</strong>
                      </td>
                      <td>{assesment.description || '-'}</td>
                      <td>
                        {assesment.percentageWeightage != null
                          ? `${assesment.percentageWeightage}%`
                          : '-'}
                      </td>
                      <td>
                        {assesment.fromPeriod
                          ? new Date(assesment.fromPeriod).toLocaleDateString()
                          : '-'}
                      </td>
                      <td>
                        {assesment.toPeriod
                          ? new Date(assesment.toPeriod).toLocaleDateString()
                          : '-'}
                      </td>
                      <td>
                        <span
                          className={`badge ${assesment.isActive ? 'bg-success' : 'bg-secondary'}`}
                        >
                          {assesment.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-info"
                            title="View Details"
                            onClick={() => navigate(`/assessments/${assesment.id}`)}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button
                            className="btn btn-outline-primary"
                            title="Edit"
                            onClick={() => navigate(`/assessments/${assesment.id}/edit`)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            title="Delete"
                            onClick={() => setDeleteConfirm(assesment)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                <button type="button" className="btn-close" onClick={() => setDeleteConfirm(null)}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete assessment{' '}
                <strong>"{deleteConfirm.name}"</strong>? This action cannot be undone.
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(deleteConfirm.id)}
                >
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

export default AssesmentMasterList;
