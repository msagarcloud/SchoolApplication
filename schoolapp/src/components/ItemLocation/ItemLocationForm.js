import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { itemLocationService } from '../../services/itemLocationService';
import { companyService } from '../../services/companyService';
import { schoolService } from '../../services/schoolService';
import { useSessionData } from '../../hooks/useSessionData';

const ItemLocationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const { sessionData, isSuperAdmin } = useSessionData();

  const [formData, setFormData] = useState({
    locationName: '',
    description: '',
    building: '',
    locationFloor: '',
    locationNumber: '',
    capacity: '',
    isActive: true,
    companyId: '',
    schoolId: '',
  });

  const [companies, setCompanies] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDependencies = useCallback(async () => {
    try {
      if (isSuperAdmin) {
        const [companiesData, schoolsData] = await Promise.all([
          companyService.getAll(),
          schoolService.getAll()
        ]);
        setCompanies(companiesData || []);
        setSchools(schoolsData || []);
      }
    } catch (err) {
      console.error('Failed to load dependencies', err);
    }
  }, [isSuperAdmin]);

  const fetchLocation = useCallback(async () => {
    try {
      setFetchLoading(true);
      await fetchDependencies();
      
      if (isEditing) {
        const data = await itemLocationService.getById(id);
        setFormData({
          locationName: data.locationName || '',
          description: data.description || '',
          building: data.building || '',
          locationFloor: data.locationFloor || '',
          locationNumber: data.locationNumber !== null ? data.locationNumber.toString() : '',
          capacity: data.capacity !== null ? data.capacity.toString() : '',
          isActive: data.isActive !== false,
          companyId: data.companyId || '',
          schoolId: data.schoolId || '',
        });
      } else {
        setFormData(prev => ({
          ...prev,
          companyId: sessionData.companyId || '',
          schoolId: sessionData.schoolId || '',
        }));
      }
    } catch (err) {
      setError(err.message || 'Failed to load details');
    } finally {
      setFetchLoading(false);
    }
  }, [id, isEditing, fetchDependencies, sessionData]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Form validations
    if (!formData.locationName.trim()) {
      setError('Location name is required');
      setLoading(false);
      return;
    }

    if (!formData.companyId) {
      setError('Company is required');
      setLoading(false);
      return;
    }

    if (!formData.schoolId) {
      setError('School is required');
      setLoading(false);
      return;
    }

    if (formData.capacity && Number(formData.capacity) < 0) {
      setError('Capacity must be a positive number');
      setLoading(false);
      return;
    }

    if (formData.locationNumber && Number(formData.locationNumber) < 0) {
      setError('Location number must be a positive number');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        locationName: formData.locationName.trim(),
        description: formData.description.trim(),
        building: formData.building.trim(),
        locationFloor: formData.locationFloor.trim(),
        locationNumber: formData.locationNumber ? Number(formData.locationNumber) : null,
        capacity: formData.capacity ? Number(formData.capacity) : null,
        isActive: formData.isActive,
        companyId: formData.companyId,
        schoolId: formData.schoolId,
      };

      if (isEditing) {
        await itemLocationService.update(id, payload);
      } else {
        await itemLocationService.create(payload);
      }

      navigate('/itemlocations');
    } catch (err) {
      setError(err.message || 'Failed to save item location');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{isEditing ? 'Edit Item Location' : 'Create Item Location'}</h2>
          <p className="text-muted mb-0">{isEditing ? 'Update location details.' : 'Add a new warehouse, floor, shelf or room.'}</p>
        </div>
        <Link to="/itemlocations" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Locations
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Location Name <span className="text-danger">*</span></label>
                <input
                  name="locationName"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Science Lab Shelf A"
                  value={formData.locationName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label fw-semibold">Building</label>
                <input
                  name="building"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Block A"
                  value={formData.building}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label fw-semibold">Floor</label>
                <input
                  name="locationFloor"
                  type="text"
                  className="form-control"
                  placeholder="e.g. 2nd Floor"
                  value={formData.locationFloor}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold">Location Number</label>
                <input
                  name="locationNumber"
                  type="number"
                  className="form-control"
                  placeholder="e.g. 104"
                  value={formData.locationNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold">Capacity</label>
                <input
                  name="capacity"
                  type="number"
                  className="form-control"
                  placeholder="Max items capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4 mb-3 d-flex align-items-end pb-2">
                <div className="form-check form-switch">
                  <input
                    id="isActive"
                    name="isActive"
                    type="checkbox"
                    className="form-check-input"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />
                  <label htmlFor="isActive" className="form-check-label fw-semibold">Active</label>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                placeholder="Optional description..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {isSuperAdmin ? (
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Company <span className="text-danger">*</span></label>
                  <select
                    name="companyId"
                    className="form-select"
                    value={formData.companyId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Company --</option>
                    {companies.map(c => (
                      <option key={c.id} value={c.id}>{c.companyName}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">School <span className="text-danger">*</span></label>
                  <select
                    name="schoolId"
                    className="form-select"
                    value={formData.schoolId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select School --</option>
                    {schools.map(s => (
                      <option key={s.id} value={s.id}>{s.name || s.schoolName}</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <input type="hidden" name="companyId" value={formData.companyId} />
            )}

            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : (isEditing ? 'Update Location' : 'Create Location')}
              </button>
              <Link to="/itemlocations" className="btn btn-outline-secondary">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItemLocationForm;
