import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { itemTypeService } from '../../services/itemTypeService';

const formatDateTime = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
};

const getItemTypeValue = (itemType, key) => itemType?.[key] ?? itemType?.[key.charAt(0).toUpperCase() + key.slice(1)];

const ItemTypeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [itemType, setItemType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchItemType = useCallback(async () => {
    try {
      setLoading(true);
      const data = await itemTypeService.getById(id);
      setItemType(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch item type details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchItemType();
  }, [fetchItemType]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${itemType.name}"? This action cannot be undone.`)) {
      try {
        await itemTypeService.delete(id);
        navigate('/itemtypes');
      } catch (err) {
        setError(err.message || 'Failed to delete item type');
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
        <Link to="/itemtypes" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Item Types
        </Link>
      </div>
    );
  }

  if (!itemType) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Item Type not found
        </div>
        <Link to="/itemtypes" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Item Types
        </Link>
      </div>
    );
  }

  const itemTypeId = getItemTypeValue(itemType, 'id');
  const itemTypeName = getItemTypeValue(itemType, 'name') || 'N/A';
  const itemTypeIsActive = getItemTypeValue(itemType, 'isActive');
  const itemTypeCreatedDate = getItemTypeValue(itemType, 'createdDate');
  const itemTypeModifiedDate = getItemTypeValue(itemType, 'modifiedDate') ?? getItemTypeValue(itemType, 'ModifiedDate');

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Item Type Details</h2>
        <div className="btn-group" role="group">
          <Link to="/itemtypes" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Item Types
          </Link>
          <Link to={`/itemtypes/${itemTypeId}/edit`} className="btn btn-warning">
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
              <h5 className="mb-0">Item Type Information</h5>
              <span className={`badge ${itemTypeIsActive ? 'bg-success' : 'bg-danger'}`}>
                {itemTypeIsActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Item Type Name:</div>
                <div className="col-sm-9">{itemTypeName}</div>
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
                <div className="col-sm-4 fw-bold">Item Type ID:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{itemType.id}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created Date:</div>
                <div className="col-sm-8">
                  {formatDateTime(itemTypeCreatedDate)}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Modified Date:</div>
                <div className="col-sm-8">
                  {itemTypeModifiedDate ? formatDateTime(itemTypeModifiedDate) : 'Not modified'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemTypeDetail;
