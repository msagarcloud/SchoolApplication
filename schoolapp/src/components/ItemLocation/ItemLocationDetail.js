import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { itemLocationService } from '../../services/itemLocationService';
import { companyService } from '../../services/companyService';
import { schoolService } from '../../services/schoolService';

const ItemLocationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [companyName, setCompanyName] = useState('N/A');
  const [schoolName, setSchoolName] = useState('N/A');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDetails = useCallback(async () => {
    try {
      setLoading(true);
      const data = await itemLocationService.getById(id);
      setLocation(data);
      
      // Load company & school name
      try {
        const [company, school] = await Promise.all([
          data.companyId ? companyService.getById(data.companyId) : Promise.resolve(null),
          data.schoolId ? schoolService.getById(data.schoolId) : Promise.resolve(null)
        ]);
        if (company) setCompanyName(company.companyName);
        if (school) setSchoolName(school.name || school.schoolName || 'N/A');
      } catch (err) {
        console.error('Failed to load company/school details', err);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch location details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete this location?`)) {
      try {
        await itemLocationService.delete(id);
        navigate('/itemlocations');
      } catch (err) {
        setError(err.message || 'Failed to delete location');
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !location) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-danger">{error || 'Location details not found.'}</div>
        <Link to="/itemlocations" className="btn btn-outline-secondary">Back to List</Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Location Details</h2>
          <p className="text-muted mb-0">Detailed view of the physical inventory location.</p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/itemlocations" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <Link to={`/itemlocations/${id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit Location
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            <i className="bi bi-trash me-2"></i>
            Delete
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">General Information</h5>
            </div>
            <div className="card-body">
              <table className="table table-borderless mb-0">
                <tbody>
                  <tr>
                    <th className="text-muted w-25" scope="row">Location Name:</th>
                    <td className="fw-semibold">{location.locationName || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th className="text-muted" scope="row">Building:</th>
                    <td>{location.building || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th className="text-muted" scope="row">Floor:</th>
                    <td>{location.locationFloor || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th className="text-muted" scope="row">Location Number:</th>
                    <td>{location.locationNumber !== null ? location.locationNumber : 'N/A'}</td>
                  </tr>
                  <tr>
                    <th className="text-muted" scope="row">Capacity:</th>
                    <td>{location.capacity !== null ? location.capacity : 'N/A'}</td>
                  </tr>
                  <tr>
                    <th className="text-muted" scope="row">Description:</th>
                    <td>{location.description || 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">System & Status</h5>
            </div>
            <div className="card-body">
              <table className="table table-borderless mb-0">
                <tbody>
                  <tr>
                    <th className="text-muted w-50" scope="row">Status:</th>
                    <td>
                      <span className={`badge ${location.isActive ? 'bg-success' : 'bg-danger'}`}>
                        {location.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th className="text-muted" scope="row">Company:</th>
                    <td>{companyName}</td>
                  </tr>
                  <tr>
                    <th className="text-muted" scope="row">School:</th>
                    <td>{schoolName}</td>
                  </tr>
                  <tr>
                    <th className="text-muted" scope="row">Created Date:</th>
                    <td className="small">{location.createdDate ? new Date(location.createdDate).toLocaleDateString() : 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemLocationDetail;
