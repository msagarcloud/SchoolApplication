import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { inventoryMasterService } from '../../services/inventoryMasterService';
import { itemService } from '../../services/itemService';
import { itemLocationService } from '../../services/itemLocationService';

const formatDateTime = (value) => {
  if (!value) return 'N/A';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return 'N/A';
  return `${d.toLocaleDateString()} at ${d.toLocaleTimeString()}`;
};

const InventoryMasterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [record, setRecord] = useState(null);
  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [data, itemsData, locationsData] = await Promise.all([
        inventoryMasterService.getById(id),
        itemService.getAll(),
        itemLocationService.getAll(),
      ]);

      setRecord(data);
      setItems(itemsData);
      setLocations(locationsData);
    } catch (err) {
      setError(err.message || 'Failed to fetch inventory master');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    if (!record) return;
    if (!window.confirm(`Are you sure you want to delete this record?`)) return;
    try {
      await inventoryMasterService.delete(id);
      navigate('/inventorymasters');
    } catch (err) {
      setError(err.message || 'Failed to delete');
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
        <Link to="/inventorymasters" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back
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
        <Link to="/inventorymasters" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </Link>
      </div>
    );
  }

  const itemName = items.find((x) => String(x.id) === String(record.itemId))?.name ?? 'N/A';
  const locationName =
    locations.find((x) => String(x.id) === String(record.itemLocationId))?.name ??
    locations.find((x) => String(x.id) === String(record.itemLocationId))?.locationName ??
    'N/A';

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Inventory Master Details</h2>
        <div className="btn-group" role="group">
          <Link to="/inventorymasters" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </Link>
          <Link to={`/inventorymasters/${id}/edit`} className="btn btn-warning">
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
              <h5 className="mb-0">Inventory Information</h5>
              <span className={`badge ${record.isActive ? 'bg-success' : 'bg-danger'}`}>
                {record.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Item</div>
                <div className="col-sm-9">{itemName}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Location</div>
                <div className="col-sm-9">{locationName}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Quantity</div>
                <div className="col-sm-9">{record.quantity ?? 0}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Min Quantity</div>
                <div className="col-sm-9">{record.minQuantity ?? 'N/A'}</div>
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
                <div className="col-sm-4 fw-bold">ID</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{record.id}</small>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created</div>
                <div className="col-sm-8">{formatDateTime(record.createdDate)}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Modified</div>
                <div className="col-sm-8">{record.modifiedDate ? formatDateTime(record.modifiedDate) : 'Not modified'}</div>
              </div>
              <div className="row">
                <div className="col-sm-4 fw-bold">Deleted</div>
                <div className="col-sm-8">{record.isDeleted ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryMasterDetail;

