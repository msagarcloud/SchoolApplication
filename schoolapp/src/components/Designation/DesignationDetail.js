import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { designationService } from '../../services/designationService';
import { departmentService } from '../../services/departmentService';

const DesignationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [designation, setDesignation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getDesignationName = (item) => item?.designationName || item?.name || item?.DesignationName || item?.Name || 'Untitled';
  const getDesignationCode = (item) => item?.designationCode || item?.code || item?.DesignationCode || item?.Code || '-';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await designationService.getById(id);
        setDesignation(data);
      } catch (err) {
        setError(err.message || 'Failed to load designation details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this designation?')) {
      return;
    }

    try {
      await designationService.delete(id);
      navigate('/designations');
    } catch (err) {
      setError(err.message || 'Failed to delete designation');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
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
        <Link to="/designations" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2" />
          Back to Designations
        </Link>
      </div>
    );
  }

  if (!designation) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Designation not found
        </div>
        <Link to="/designations" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2" />
          Back to Designations
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Designation Details</h2>
        <div className="btn-group">
          <Link to="/designations" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2" />
            Back to Designations
          </Link>
          <Link to={`/designations/${id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2" />
            Edit
          </Link>
          <button className="btn btn-danger" type="button" onClick={handleDelete}>
            <i className="bi bi-trash me-2" />
            Delete
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Information</h5>
        </div>
        <div className="card-body">


          <div className="row mb-3">
            <div className="col-sm-3 fw-bold">Designation Name:</div>
            <div className="col-sm-9">{getDesignationName(designation)}</div>
          </div>
    
          <div className="row mb-3">
            <div className="col-sm-3 fw-bold">Designation Code:</div>
            <div className="col-sm-9">{getDesignationCode(designation)}</div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-3 fw-bold">Status:</div>
            <div className="col-sm-9">
              <span className={`badge ${designation.isActive === false ? 'bg-danger' : 'bg-success'}`}>
                {designation.isActive === false ? 'Inactive' : 'Active'}
              </span>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-3 fw-bold">Designation ID:</div>
            <div className="col-sm-9"><small className="text-muted font-monospace">{designation.id || designation.Id}</small></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignationDetail;
