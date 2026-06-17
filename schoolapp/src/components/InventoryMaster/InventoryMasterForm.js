import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { inventoryMasterService } from '../../services/inventoryMasterService';
import { useSessionData } from '../../hooks/useSessionData';

const emptyForm = {
  id: '',
  name: '',
  itemId: '',
  locationId: '',
  quantity: 0,
  costPerItem: 0,
  isActive: true,
  isDeleted: false,
  companyId: '',
  schoolId: '',
  status: '',
  statusMessage: '',
};

const InventoryMasterForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const { sessionData } = useSessionData();

  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');

  const mapRecordToForm = useCallback(
    (record) => ({
      id: record.id || record.Id || '',
      name: record.name ?? record.Name ?? record.itemName ?? record.itemNameValue ?? '',
      itemId: record.itemId ?? record.ItemId ?? '',
      locationId: record.locationId ?? record.LocationId ?? '',
      quantity: record.quantity ?? record.Quantity ?? 0,
      costPerItem: record.costPerItem ?? record.CostPerItem ?? 0,
      isActive: record.isActive ?? record.IsActive ?? true,
      isDeleted: record.isDeleted ?? record.IsDeleted ?? false,
      companyId: record.companyId ?? record.CompanyId ?? sessionData.companyId ?? '',
      schoolId: record.schoolId ?? record.SchoolId ?? sessionData.schoolId ?? '',
      status: record.status ?? record.Status ?? '',
      statusMessage: record.statusMessage ?? record.StatusMessage ?? '',
    }),
    [sessionData.companyId, sessionData.schoolId]
  );

  const fetchRecord = useCallback(async () => {
    try {
      setFetchLoading(true);
      setError('');
      if (!isEditing) {
        setFormData({
          ...emptyForm,
          companyId: sessionData.companyId || '',
          schoolId: sessionData.schoolId || '',
        });
        return;
      }

      const record = await inventoryMasterService.getById(id);
      setFormData(mapRecordToForm(record));
    } catch (err) {
      setError(err.message || 'Failed to fetch InventoryMaster details');
    } finally {
      setFetchLoading(false);
    }
  }, [id, isEditing, mapRecordToForm, sessionData.companyId, sessionData.schoolId]);

  useEffect(() => {
    fetchRecord();
  }, [fetchRecord]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const next = { ...prev };
      if (type === 'checkbox') {
        next[name] = checked;
      } else if (name === 'quantity') {
        next[name] = value === '' ? '' : Number(value);
      } else if (name === 'costPerItem') {
        next[name] = value === '' ? '' : Number(value);
      } else {
        next[name] = value;
      }
      return next;
    });

    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Minimal validation based on DB: Name is varchar, quantity/cost likely numeric.
      if (!String(formData.name || '').trim()) {
        setError('Name is required');
        return;
      }
      if (!formData.itemId) {
        setError('ItemId is required');
        return;
      }
      if (!formData.locationId) {
        setError('LocationId is required');
        return;
      }

      const payload = {
        ...formData,
        quantity: formData.quantity === '' ? 0 : Number(formData.quantity),
        costPerItem: formData.costPerItem === '' ? 0 : Number(formData.costPerItem),
      };

      if (isEditing) {
        await inventoryMasterService.update(id, payload);
      } else {
        await inventoryMasterService.create(payload);
      }

      navigate('/inventory-masters');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} InventoryMaster`);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isEditing ? 'Edit Inventory Master' : 'Create Inventory Master'}</h2>
        <Link to="/inventory-masters" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </Link>
      </div>

      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Inventory Master Details</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-2">
              <div className="col-md-6">
                <label className="form-label">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  ItemId <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="itemId"
                  value={formData.itemId}
                  onChange={handleChange}
                  placeholder="Enter ItemId (Guid)"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  LocationId <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="locationId"
                  value={formData.locationId}
                  onChange={handleChange}
                  placeholder="Enter LocationId (Guid)"
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Cost Per Item</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  name="costPerItem"
                  value={formData.costPerItem}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <div className="form-check form-switch my-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={!!formData.isActive}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="isActive">
                    Active
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-check form-switch my-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isDeleted"
                    name="isDeleted"
                    checked={!!formData.isDeleted}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="isDeleted">
                    Deleted
                  </label>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <Link to="/inventory-masters" className="btn btn-outline-secondary">
                Cancel
              </Link>
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Saving...' : isEditing ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InventoryMasterForm;

