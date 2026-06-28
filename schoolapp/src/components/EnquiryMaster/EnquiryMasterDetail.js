import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { enquiryMasterService } from '../../services/enquiryMasterService';
import enquiryTypeService from '../../services/enquiryTypeService';
import responseTypeService from '../../services/responseTypeService';

const EnquiryMasterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enquiryTypes, setEnquiryTypes] = useState([]);
  const [responseTypes, setResponseTypes] = useState([]);
  const [dropdownsLoading, setDropdownsLoading] = useState(true);

  const fetchEnquiry = async () => {
    try {
      setLoading(true);
      const data = await enquiryMasterService.getById(id);
      setEnquiry(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch enquiry');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        setDropdownsLoading(true);
        const [enqTypes, respTypes] = await Promise.all([
          enquiryTypeService.getAll(),
          responseTypeService.getAll()
        ]);
        setEnquiryTypes(enqTypes);
        setResponseTypes(respTypes);
      } catch (err) {
        console.error('Failed to fetch dropdown data:', err);
      } finally {
        setDropdownsLoading(false);
      }
    };

    fetchDropdownData();
  }, []);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        await enquiryMasterService.delete(id);
        navigate('/enquiry-masters');
      } catch (err) {
        setError(err.message || 'Failed to delete enquiry');
      }
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
        <Link to="/enquiry-masters" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Enquiries
        </Link>
      </div>
    );
  }

  if (!enquiry) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Enquiry not found
        </div>
        <Link to="/enquiry-masters" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Enquiries
        </Link>
      </div>
    );
  }

  const fmtDate = (d) => {
    if (!d) return 'N/A';
    try {
      return new Date(d).toLocaleDateString();
    } catch {
      return String(d);
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Enquiry Details</h2>
        <div className="btn-group" role="group">
          <Link to="/enquiry-masters" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </Link>
          <Link to={`/enquiry-masters/${id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            <i className="bi bi-trash me-2"></i>
            Delete
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Enquiry Information</h5>
              <span className={`badge ${enquiry.IsActive ? 'bg-success' : 'bg-danger'}`}>
                {enquiry.IsActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">EnquirerName:</div>
                <div className="col-sm-9">{enquiry.EnquirerName || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">ContactNumber:</div>
                <div className="col-sm-9">{enquiry.ContactNumber || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">EmailAddress:</div>
                <div className="col-sm-9">{enquiry.EmailAddress || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">EnquiryType:</div>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={enquiry.EnquiryType || ''}
                    disabled
                  >
                    <option value="">Select Enquiry Type</option>
                    {enquiryTypes.map((type) => (
                      <option key={type.id} value={type.enquiryTypeName}>
                        {type.enquiryTypeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Subject:</div>
                <div className="col-sm-9">{enquiry.Subject || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Message:</div>
                <div className="col-sm-9">{enquiry.Message || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Priority:</div>
                <div className="col-sm-9">{enquiry.Priority || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status:</div>
                <div className="col-sm-9">{enquiry.Status || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">StatusMessage:</div>
                <div className="col-sm-9">{enquiry.StatusMessage || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">EnquiryDate:</div>
                <div className="col-sm-9">{fmtDate(enquiry.EnquiryDate)}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">ResponseType:</div>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={enquiry.ResponseType || ''}
                    disabled
                  >
                    <option value="">Select Response Type</option>
                    {responseTypes.map((type) => (
                      <option key={type.id} value={type.responseTypeName}>
                        {type.responseTypeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">ResponseDate:</div>
                <div className="col-sm-9">{fmtDate(enquiry.ResponseDate)}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">ResponseMessage:</div>
                <div className="col-sm-9">{enquiry.ResponseMessage || 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">System Information</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Id:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{enquiry.Id || id}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">CompanyId:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{enquiry.CompanyId || 'N/A'}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">SchoolId:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{enquiry.SchoolId || 'N/A'}</small>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">CreatedDate:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{fmtDate(enquiry.CreatedDate)}</small>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-4 fw-bold">ModifiedDate:</div>
                <div className="col-sm-8">
                  <small className="text-muted font-monospace">{fmtDate(enquiry.ModifiedDate)}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryMasterDetail;

