import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { itemService } from '../../services/itemService';
import { itemTypeService } from '../../services/itemTypeService';

const formatDateTime = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
};

const getItemValue = (item, key) => item?.[key] ?? item?.[key.charAt(0).toUpperCase() + key.slice(1)];

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [itemTypes, setItemTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchItem = useCallback(async () => {
    try {
      setLoading(true);
      const [itemData, typesData] = await Promise.all([itemService.getById(id), itemTypeService.getAll()]);
      setItem(itemData);
      setItemTypes(typesData);
    } catch (err) {
      setError(err.message || 'Failed to fetch item details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"? This action cannot be undone.`)) {
      try {
        await itemService.delete(id);
        navigate('/inventoryitems');
      } catch (err) {
        setError(err.message || 'Failed to delete item');
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
        <Link to="/inventoryitems" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Inventory Items
        </Link>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Item not found
        </div>
        <Link to="/inventoryitems" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Inventory Items
        </Link>
      </div>
    );
  }

  const itemId = getItemValue(item, 'id');
  const itemName = getItemValue(item, 'name') || 'N/A';
  const itemCode = getItemValue(item, 'code') || 'N/A';
  const itemTypeId = getItemValue(item, 'itemTypeId');
  const itemIsActive = getItemValue(item, 'isActive');
  const itemCreatedDate = getItemValue(item, 'createdDate');
  const itemModifiedDate = getItemValue(item, 'modifiedDate') ?? getItemValue(item, 'ModifiedDate');
  const typeName = itemTypes.find(t => String(t.id) === String(itemTypeId))?.name || 'N/A';

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Item Details</h2>
        <div className="btn-group" role="group">
          <Link to="/inventoryitems" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Inventory Items
          </Link>
          <Link to={`/inventoryitems/${itemId}/edit`} className="btn btn-warning">
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
              <h5 className="mb-0">Item Information</h5>
              <span className={`badge ${itemIsActive ? 'bg-success' : 'bg-danger'}`}>
                {itemIsActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Item Name:</div>
                <div className="col-sm-9">{itemName}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Code:</div>
                <div className="col-sm-9">{itemCode}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Item Type:</div>
                <div className="col-sm-9">{typeName}</div>
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
                <div className="col-sm-4 fw-bold">Item ID:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{item.id}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created Date:</div>
                <div className="col-sm-8">
                  {formatDateTime(itemCreatedDate)}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Modified Date:</div>
                <div className="col-sm-8">
                  {itemModifiedDate ? formatDateTime(itemModifiedDate) : 'Not modified'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
