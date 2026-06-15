import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { itemService } from '../../services/itemService';
import { itemTypeService } from '../../services/itemTypeService';
import { useSessionData } from '../../hooks/useSessionData';

const emptyForm = {
  id: '',
  name: '',
  code: '',
  itemTypeId: '',
  isActive: true,
  companyId: '',
  schoolId: '',
  createdBy: '',
  createdDate: '',
  status: '',
  statusMessage: '',
};

const ItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const { sessionData } = useSessionData();

  const [formData, setFormData] = useState(emptyForm);
  const [itemTypes, setItemTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');

  const mapItemToForm = useCallback((item) => ({
    id: item.id || '',
    name: item.name || '',
    code: item.code || item.description || '',
    itemTypeId: item.itemTypeId || '',
    isActive: item.isActive ?? true,
    companyId: item.companyId || '',
    schoolId: item.schoolId || '',
    createdBy: item.createdBy || '',
    createdDate: item.createdDate || '',
    status: item.status || '',
    statusMessage: item.statusMessage || '',
  }), []);

  const fetchData = useCallback(async () => {
    try {
      setFetchLoading(true);
      const types = await itemTypeService.getAll();
      setItemTypes(types);

      if (isEditing) {
        const item = await itemService.getById(id);
        setFormData(mapItemToForm(item));
      } else {
        setFormData({
          ...emptyForm,
          companyId: sessionData.companyId || '',
          schoolId: sessionData.schoolId || '',
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch');
    } finally {
      setFetchLoading(false);
    }
  }, [id, isEditing, mapItemToForm, sessionData.companyId, sessionData.schoolId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (!formData.name.trim()) {
        setError('Name is required');
        setLoading(false);
        return;
      }

      if (!formData.itemTypeId) {
        setError('Item type is required');
        setLoading(false);
        return;
      }

      if (isEditing) await itemService.update(id, formData);
      else await itemService.create(formData);

      navigate('/inventoryitems');
    } catch (err) {
      setError(err.message || 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isEditing ? 'Edit Item' : 'Create Item'}</h2>
        <Link to="/inventoryitems" className="btn btn-outline-secondary">Back</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-2">
              <div className="col-md-6">
                <label className="form-label">Name <span className="text-danger">*</span></label>
                <input name="name" value={formData.name} onChange={handleChange} className="form-control" required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Description</label>
                <input name="code" value={formData.code} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Type <span className="text-danger">*</span></label>
                <select name="itemTypeId" value={formData.itemTypeId} onChange={handleChange} className="form-select" required>
                  <option value="">Select type</option>
                  {itemTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
            </div>

            <div className="form-check form-switch my-3">
              <input className="form-check-input" type="checkbox" id="isActive" name="isActive" checked={!!formData.isActive} onChange={handleChange} />
              <label className="form-check-label" htmlFor="isActive">Active</label>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Link to="/inventoryitems" className="btn btn-outline-secondary">Cancel</Link>
              <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : (isEditing ? 'Update' : 'Create')}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
