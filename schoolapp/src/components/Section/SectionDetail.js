import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { sectionService } from '../../services/sectionService';

const SectionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSection();
  }, [fetchSection]);

  const fetchSection = async () => {
    try {
      setLoading(true);
      const data = await sectionService.getById(id);
      setSection(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch section details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${section.name}"? This action cannot be undone.`)) {
      try {
        await sectionService.delete(id);
        navigate('/sections');
      } catch (err) {
        setError(err.message || 'Failed to delete section');
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/sections" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Sections
        </Link>
      </div>
    );
  }

  if (!section) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Section not found
        </div>
        <Link to="/sections" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Sections
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Section Details</h2>
        <div className="btn-group" role="group">
          <Link to="/sections" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Sections
          </Link>
          <Link to={`/sections/${section.id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            <i className="bi bi-trash me-2"></i>
            Delete
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Section Information</h5>
              <span className={`badge ${section.isActive ? 'bg-success' : 'bg-danger'}`}>
                {section.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Section Name:</div>
                <div className="col-sm-9">{section.name || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status:</div>
                <div className="col-sm-9">
                  <span className="badge bg-info">{section.status || 'N/A'}</span>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status Message:</div>
                <div className="col-sm-9">{section.statusMessage || 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">System Information</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Section ID:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{section.id}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Company ID:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{section.companyId}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">School ID:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{section.schoolId}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created Date:</div>
                <div className="col-sm-8">
                  {new Date(section.createdDate).toLocaleDateString()} at{' '}
                  {new Date(section.createdDate).toLocaleTimeString()}
                </div>
              </div>

              <div className="row">
                <div className="col-sm-4 fw-bold">Modified Date:</div>
                <div className="col-sm-8">
                  {section.modifiedDate ? (
                    <>
                      {new Date(section.modifiedDate).toLocaleDateString()} at{' '}
                      {new Date(section.modifiedDate).toLocaleTimeString()}
                    </>
                  ) : 'Not modified'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionDetail;
