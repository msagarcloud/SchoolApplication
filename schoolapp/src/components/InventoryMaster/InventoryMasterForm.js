import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { inventoryMasterService } from '../../services/inventoryMasterService';
import { itemService } from '../../services/itemService';
import { itemLocationService } from '../../services/itemLocationService';
import { authService } from '../../services/authService';

const emptyForm = {
  id: '',
  itemId: '',
  itemLocationId: '',
  quantity: 0,
  minQuantity: '',
  isActive: true,
  isDeleted: false,
};

const InventoryMasterForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');

  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]);

  const fetchLists = useCallback(async () => {
    const [itemsData, locationsData] = await Promise.all([
      itemService.getAll(),
      itemLocationService.getAll(),
    ]);
    setItems(itemsData);
    setLocations(locationsData);
  }, []);

  const fetchRecord = useCallback(async () => {
    if (!isEditing) return;
    setFetchLoading(true);
    try {
      const data = await inventoryMasterService.getById(id);
      setFormData({
        id: data.id || '',
        itemId: data.itemId || '',
        itemLocationId: data.itemLocationId || '',
        quantity: data.quantity ?? 0,
        minQuantity: data.minQuantity ?? data.MinQuantity ?? '',
        isActive: data.isActive ?? true,
        isDeleted: data.isDeleted ?? false,
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch record');
    } finally {
      setFetchLoading(false);
    }
  }, [id, isEditing]);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  useEffect(() => {
    fetchRecord();
  }, [fetchRecord]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const v = type === 'checkbox' ? checked : value;

    setFormData((p) => ({
      ...p,
      [name]: v,
    }));

    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.itemId) {
        setError('Item is required');
        return;
      }
      if (!formData.itemLocationId) {
        setError('Item Location is required');
        return;
      }

      const payload = {
        ...formData,
        quantity: Number(formData.quantity ?? 0),
        minQuantity: formData.minQuantity === '' ? null : Number(formData.minQuantity),
      };

      if (isEditing) await inventoryMasterService.update(id, payload);
      else await inventoryMasterService.create(payload);

      navigate('/inventorymasters');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'}`);
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

  const headerTitle = isEditing ? 'Edit Inventory Master' : 'Create Inventory Master';

  return (
    <div className="container-fluid">
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
        <h2>{headerTitle}</h2>
        <Link to="/inventorymasters" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Inventory Master Information</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-2">
              <div className="col-md-6">
                <label className="form-label">
                  Item <span className="text-danger">*</span>
                </label>
                <select
                  name="itemId"
                  value={formData.itemId}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Item</option>
                  {items.map((it) => (
                    <option key={it.id} value={it.id}>
                      {it.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Item Location <span className="text-danger">*</span>
                </label>
                <select
                  name="itemLocationId"
                  value={formData.itemLocationId}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Location</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name ?? loc.locationName ?? 'Location'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="form-control"
                  min={0}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Min Quantity</label>
                <input
                  type="number"
                  name="minQuantity"
                  value={formData.minQuantity}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="(optional)"
                  min={0}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Status</label>
                <div className="form-check form-switch mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={!!formData.isActive}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="isActive">
                    {formData.isActive ? 'Active' : 'Inactive'}
                  </label>
                </div>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <label className="form-label">Delete Status</label>
                <div className="form-check form-switch mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isDeleted"
                    name="isDeleted"
                    checked={!!formData.isDeleted}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="isDeleted">
                    {formData.isDeleted ? 'Deleted' : 'Not deleted'}
                  </label>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <Link to="/inventorymasters" className="btn btn-outline-secondary">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary" disabled={loading}>
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

