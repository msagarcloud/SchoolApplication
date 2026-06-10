import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import transportSettingService from '../../services/transportSettingService';

const TransportSettingList = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await transportSettingService.getAll();
      setSettings(data);
    } catch (err) {
      setError('Failed to load transport settings. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transport setting?')) {
      try {
        await transportSettingService.delete(id);
        setSettings(settings.filter(setting => setting.id !== id));
      } catch (err) {
        setError('Failed to delete transport setting. Please try again.');
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Transport Settings</h4>
        <Link to="/transport-settings/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add Setting
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Setting Name</th>
              <th>Setting Type</th>
              <th>Setting Value</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {settings.map((setting) => (
              <tr key={setting.id}>
                <td>{setting.settingName}</td>
                <td>
                  <span className="badge bg-info">{setting.settingType || 'General'}</span>
                </td>
                <td>
                  <code className="small">{setting.settingValue}</code>
                </td>
                <td>{setting.settingDescription || 'N/A'}</td>
                <td>
                  <span className={`badge ${setting.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {setting.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <Link to={`/transport-settings/${setting.id}`} className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-eye"></i>
                    </Link>
                    <Link to={`/transport-settings/${setting.id}/edit`} className="btn btn-sm btn-outline-warning">
                      <i className="bi bi-pencil"></i>
                    </Link>
                    <button 
                      onClick={() => handleDelete(setting.id)} 
                      className="btn btn-sm btn-outline-danger"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {settings.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No transport settings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransportSettingList;
