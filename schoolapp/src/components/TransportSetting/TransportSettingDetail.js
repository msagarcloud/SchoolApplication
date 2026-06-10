import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import transportSettingService from '../../services/transportSettingService';

const TransportSettingDetail = () => {
  const { id } = useParams();
  const [setting, setSetting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSetting();
  }, [id]);

  const loadSetting = async () => {
    try {
      const data = await transportSettingService.getById(id);
      setSetting(data);
    } catch (err) {
      setError('Failed to load transport setting details. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
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

  if (!setting) {
    return (
      <div className="alert alert-warning">
        Transport setting not found.
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Transport Setting Details</h4>
        <div className="btn-group" role="group">
          <Link to="/transport-settings" className="btn btn-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <Link to={`/transport-settings/${setting.id}/edit`} className="btn btn-primary">
            <i className="bi bi-pencil me-2"></i>
            Edit Setting
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">
            {setting.settingName}
            <span className={`badge ${setting.isActive ? 'bg-success' : 'bg-danger'} ms-2`}>
              {setting.isActive ? 'Active' : 'Inactive'}
            </span>
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h6>Setting Information</h6>
              <table className="table table-sm">
                <tr>
                  <td><strong>Setting Name:</strong></td>
                  <td>{setting.settingName}</td>
                </tr>
                <tr>
                  <td><strong>Setting Type:</strong></td>
                  <td>
                    <span className="badge bg-info">{setting.settingType || 'General'}</span>
                  </td>
                </tr>
                <tr>
                  <td><strong>Setting Value:</strong></td>
                  <td>
                    <code className="small">{setting.settingValue}</code>
                  </td>
                </tr>
                {setting.settingDescription && (
                  <tr>
                    <td><strong>Description:</strong></td>
                    <td>{setting.settingDescription}</td>
                  </tr>
                )}
              </table>
            </div>
            <div className="col-md-6">
              <h6>System Information</h6>
              <table className="table table-sm">
                <tr>
                  <td><strong>Created Date:</strong></td>
                  <td>{new Date(setting.createdDate).toLocaleString()}</td>
                </tr>
                <tr>
                  <td><strong>Modified Date:</strong></td>
                  <td>{setting.modifiedDate ? new Date(setting.modifiedDate).toLocaleString() : 'Never'}</td>
                </tr>
                <tr>
                  <td><strong>Status:</strong></td>
                  <td>
                    <span className={`badge ${setting.isActive ? 'bg-success' : 'bg-danger'}`}>
                      {setting.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportSettingDetail;
