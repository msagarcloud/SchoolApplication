import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import driverService from '../../services/driverService';
import { cityService } from '../../services/cityService';
import { stateService } from '../../services/stateService';
import { countryService } from '../../services/countryService';

const resolveLocationName = (items, id, ...nameKeys) => {
  if (!id || !Array.isArray(items)) return '';
  const match = items.find((item) => item.id === id);
  if (!match) return '';
  for (const key of nameKeys) {
    if (match[key]) return match[key];
  }
  return '';
};

const DriverDetail = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [locationNames, setLocationNames] = useState({ city: '', state: '', country: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDriver();
  }, [id]);

  useEffect(() => {
    if (!driver) return;

    const loadLocationNames = async () => {
      try {
        const [cities, states, countries] = await Promise.all([
          cityService.getAll(),
          stateService.getAll(),
          countryService.getAll()
        ]);

        setLocationNames({
          city: resolveLocationName(cities, driver.cityId, 'cityName', 'name'),
          state: resolveLocationName(states, driver.stateId, 'stateName', 'name'),
          country: resolveLocationName(countries, driver.countryId, 'countryName', 'name')
        });
      } catch (err) {
        console.error('Failed to load location names:', err);
      }
    };

    loadLocationNames();
  }, [driver]);

  const loadDriver = async () => {
    try {
      const data = await driverService.getById(id);
      setDriver(data);
    } catch (err) {
      setError('Failed to load driver details. Please try again.');
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

  if (!driver) {
    return (
      <div className="alert alert-warning">
        Driver not found.
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Driver Details</h4>
        <div className="btn-group" role="group">
          <Link to="/drivers" className="btn btn-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <Link to={`/drivers/${driver.id}/edit`} className="btn btn-primary">
            <i className="bi bi-pencil me-2"></i>
            Edit Driver
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">
            {driver.firstName} {driver.lastName}
            <span className={`badge ${driver.isActive ? 'bg-success' : 'bg-danger'} ms-2`}>
              {driver.isActive ? 'Active' : 'Inactive'}
            </span>
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h6>Personal Information</h6>
              <table className="table table-sm">
                <tr>
                  <td><strong>First Name:</strong></td>
                  <td>{driver.firstName}</td>
                </tr>
                <tr>
                  <td><strong>Last Name:</strong></td>
                  <td>{driver.lastName}</td>
                </tr>
                <tr>
                  <td><strong>Date of Birth:</strong></td>
                  <td>{driver.dateOfBirth ? new Date(driver.dateOfBirth).toLocaleDateString() : 'N/A'}</td>
                </tr>
                <tr>
                  <td><strong>Father's Name:</strong></td>
                  <td>{driver.fathersName}</td>
                </tr>
                <tr>
                  <td><strong>Mother's Name:</strong></td>
                  <td>{driver.mothersName}</td>
                </tr>
              </table>
            </div>
            <div className="col-md-6">
              <h6>Contact Information</h6>
              <table className="table table-sm">
                <tr>
                  <td><strong>Mobile:</strong></td>
                  <td>{driver.mobileNumber || 'N/A'}</td>
                </tr>
                <tr>
                  <td><strong>Phone:</strong></td>
                  <td>{driver.phoneNumber || 'N/A'}</td>
                </tr>
                <tr>
                  <td><strong>Address:</strong></td>
                  <td>
                    {driver.address1 && <div>{driver.address1}</div>}
                    {driver.address2 && <div>{driver.address2}</div>}
                    <div>
                      {locationNames.city && <span>{locationNames.city}, </span>}
                      {locationNames.state && <span>{locationNames.state}, </span>}
                      {locationNames.country && <span>{locationNames.country}</span>}
                      {driver.zipCode && <span> - {driver.zipCode}</span>}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <h6>License Information</h6>
              <table className="table table-sm">
                <tr>
                  <td><strong>License Number:</strong></td>
                  <td>{driver.licenceNumber}</td>
                </tr>
                <tr>
                  <td><strong>License Type:</strong></td>
                  <td>{driver.licenceType || 'N/A'}</td>
                </tr>
                <tr>
                  <td><strong>Issue Date:</strong></td>
                  <td>{driver.licenceIssueDate ? new Date(driver.licenceIssueDate).toLocaleDateString() : 'N/A'}</td>
                </tr>
                <tr>
                  <td><strong>Valid Until:</strong></td>
                  <td>{driver.licenceValidUptoDate ? new Date(driver.licenceValidUptoDate).toLocaleDateString() : 'N/A'}</td>
                </tr>
                {driver.licenceDescription && (
                  <tr>
                    <td><strong>Description:</strong></td>
                    <td>{driver.licenceDescription}</td>
                  </tr>
                )}
              </table>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <h6>System Information</h6>
              <table className="table table-sm">
                <tr>
                  <td><strong>Created Date:</strong></td>
                  <td>{new Date(driver.createdDate).toLocaleString()}</td>
                </tr>
                <tr>
                  <td><strong>Modified Date:</strong></td>
                  <td>{driver.modifiedDate ? new Date(driver.modifiedDate).toLocaleString() : 'Never'}</td>
                </tr>
                <tr>
                  <td><strong>Status:</strong></td>
                  <td>
                    <span className={`badge ${driver.isActive ? 'bg-success' : 'bg-danger'}`}>
                      {driver.isActive ? 'Active' : 'Inactive'}
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

export default DriverDetail;
