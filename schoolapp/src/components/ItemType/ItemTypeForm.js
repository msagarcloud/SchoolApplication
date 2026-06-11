import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { itemTypeService } from '../../services/itemTypeService';

const ItemTypeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({ name: '' });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setFetchLoading(true);
      const data = await itemTypeService.getById(id);
      setFormData({ name: data.name || '' });
    } catch (err) {
      setError(err.message || 'Failed to fetch');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEditing) fetchData();
  }, [isEditing, fetchData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

      if (isEditing) await itemTypeService.update(id, formData);
      else await itemTypeService.create(formData);

      navigate('/itemtypes');
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
        <h2>{isEditing ? 'Edit Item Type' : 'Create Item Type'}</h2>
        <Link to="/itemtypes" className="btn btn-outline-secondary">Back</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name <span className="text-danger">*</span></label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Enter item type name" required />
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Link to="/itemtypes" className="btn btn-outline-secondary">Cancel</Link>
              <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : (isEditing ? 'Update' : 'Create')}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItemTypeForm;
