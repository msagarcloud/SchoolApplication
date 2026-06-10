import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { stateService } from '../../services/stateService';
import { countryService } from '../../services/countryService';

const StateDetail = () => {
  const { id } = useParams();
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  const fetchState = async () => {
    try {
      setLoading(true);
      const data = await stateService.getById(id);
      setState(data);
      
      // Fetch country details
      if (data.countryId) {
        const countryData = await countryService.getById(data.countryId);
        setCountry(countryData);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch state details');
    } finally {
      setLoading(false);
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
        <Link to="/states" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to States
        </Link>
      </div>
    );
  }

  if (!state) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          State not found
        </div>
        <Link to="/states" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to States
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>State Details</h2>
        <div className="btn-group" role="group">
          <Link to="/states" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to States
          </Link>
          <Link 
            to={`/states/${state.id}/edit`} 
            className="btn btn-warning"
          >
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">State Information</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td className="fw-bold" style={{ width: '150px' }}>ID:</td>
                    <td>{state.id}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">State Name:</td>
                    <td>{state.stateName || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Country:</td>
                    <td>
                      {country ? (
                        <Link to={`/countries/${country.id}`} className="text-decoration-none">
                          {country.countryName}
                        </Link>
                      ) : (
                        'N/A'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Status:</td>
                    <td>
                      <span className={`badge ${state.isActive ? 'bg-success' : 'bg-danger'}`}>
                        {state.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td className="fw-bold" style={{ width: '150px' }}>Created Date:</td>
                    <td>{new Date(state.createdDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Modified Date:</td>
                    <td>
                      {state.modifiedDate 
                        ? new Date(state.modifiedDate).toLocaleDateString() 
                        : 'N/A'}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Is Deleted:</td>
                    <td>
                      <span className={`badge ${state.isDeleted ? 'bg-danger' : 'bg-success'}`}>
                        {state.isDeleted ? 'Yes' : 'No'}
                      </span>
                    </td>
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

export default StateDetail;
