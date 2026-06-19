import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { inventoryMasterService } from '../../services/inventoryMasterService';

const formatDateTime = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
};

const InventoryMasterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRecord = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await inventoryMasterService.getById(id);
      setRecord(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch InventoryMaster details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRecord();
  }, [fetchRecord]);

  const handleDelete = async () => {
    if (!record) return;
    if (
      !window.confirm(
        `Are you sure you want to delete "${record.name || record.id}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      await inventoryMasterService.delete(id);
      navigate('/inventory-masters');
    } catch (err) {
      setError(err.message || 'Failed to delete record');
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
        <Link to="/inventory-masters" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Inventory Masters
        </Link>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Inventory Master not found
        </div>
        <Link to="/inventory-masters" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Inventory Masters
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Inventory Master Details</h2>
        <div className="btn-group" role="group">
          <Link to="/inventory-masters" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </Link>
          <Link to={`/inventory-masters/${record.id}/edit`} className="btn btn-warning">
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
              <h5 className="mb-0">Inventory Master</h5>
              <span className={`badge ${record.isActive ? 'bg-success' : 'bg-danger'}`}>
                {record.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Name:</div>
                <div className="col-sm-9">{record.name || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">ItemId:</div>
                <div className="col-sm-9">{record.itemId || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">LocationId:</div>
                <div className="col-sm-9">{record.locationId || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Quantity:</div>
                <div className="col-sm-9">{record.quantity ?? 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Cost Per Item:</div>
                <div className="col-sm-9">{record.costPerItem ?? 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status:</div>
                <div className="col-sm-9">
                  <span className="badge bg-info">{record.status || 'N/A'}</span>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status Message:</div>
                <div className="col-sm-9">{record.statusMessage || 'N/A'}</div>
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
                <div className="col-sm-4 fw-bold">Id:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{record.id}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created Date:</div>
                <div className="col-sm-8">{formatDateTime(record.createdDate)}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Modified Date:</div>
                <div className="col-sm-8">{formatDateTime(record.modifiedDate)}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">CompanyId:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{record.companyId}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">SchoolId:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{record.schoolId}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryMasterDetail;

