import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { enquiryMasterService } from '../../services/enquiryMasterService';
import enquiryTypeService from '../../services/enquiryTypeService';
import responseTypeService from '../../services/responseTypeService';
import { useSessionData } from '../../hooks/useSessionData';

const EnquiryMasterForm = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const { sessionData } = useSessionData();

  const [formData, setFormData] = useState({
    EnquirerName: '',
    ContactNumber: '',
    EmailAddress: '',
    EnquiryType: '',
    Subject: '',
    Message: '',
    Priority: '',
    Status: '',
    StatusMessage: '',
    EnquiryDate: '',
    ResponseMessage: '',
    ResponseType: '',
    ResponseDate: '',
    CompanyId: sessionData?.companyId || '',
    SchoolId: sessionData?.schoolId || '',
    IsActive: true,
    IsDeleted: false,
    CreatedBy: '',
    CreatedDate: '',
    ModifiedBy: '',
    ModifiedDate: '',
  });


  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');
  const [enquiryTypes, setEnquiryTypes] = useState([]);
  const [responseTypes, setResponseTypes] = useState([]);
  const [dropdownsLoading, setDropdownsLoading] = useState(true);

  const fetchEnquiry = useCallback(async () => {
    try {
      setFetchLoading(true);
      const enquiry = await enquiryMasterService.getById(id);
      if (!enquiry) return;

      setFormData({
        EnquirerName: enquiry.EnquirerName || '',
        ContactNumber: enquiry.ContactNumber || '',
        EmailAddress: enquiry.EmailAddress || '',
        EnquiryType: enquiry.EnquiryType || '',
        Subject: enquiry.Subject || '',
        Message: enquiry.Message || '',
        Priority: enquiry.Priority || '',
        Status: enquiry.Status || '',
        StatusMessage: enquiry.StatusMessage || '',
        EnquiryDate: enquiry.EnquiryDate ? new Date(enquiry.EnquiryDate).toISOString().slice(0, 10) : '',
        ResponseMessage: enquiry.ResponseMessage || '',
        ResponseType: enquiry.ResponseType || '',
        ResponseDate: enquiry.ResponseDate ? new Date(enquiry.ResponseDate).toISOString().slice(0, 10) : '',
        CompanyId: sessionData?.companyId || enquiry.CompanyId || '',
        SchoolId: sessionData?.schoolId || enquiry.SchoolId || '',

        IsActive: enquiry.IsActive !== undefined ? Boolean(enquiry.IsActive) : true,
        IsDeleted: enquiry.IsDeleted !== undefined ? Boolean(enquiry.IsDeleted) : false,
        CreatedBy: enquiry.CreatedBy || '',
        CreatedDate: enquiry.CreatedDate || '',
        ModifiedBy: enquiry.ModifiedBy || '',
        ModifiedDate: enquiry.ModifiedDate || '',
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch enquiry');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEditing) fetchEnquiry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, fetchEnquiry]);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: finalValue,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.EnquirerName.trim()) throw new Error('EnquirerName is required');
      if (!formData.ContactNumber.trim()) throw new Error('ContactNumber is required');

      if (!formData.EmailAddress.trim()) throw new Error('EmailAddress is required');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.EmailAddress)) throw new Error('Please enter a valid EmailAddress');

      const payload = {
        ...formData,
        EnquiryDate: formData.EnquiryDate ? new Date(formData.EnquiryDate).toISOString() : null,
        ResponseDate: formData.ResponseDate ? new Date(formData.ResponseDate).toISOString() : null,
      };

      if (isEditing) {
        await enquiryMasterService.update(id, payload);
      } else {
        await enquiryMasterService.create(payload);
      }

      navigate('/enquiry-masters');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} enquiry`);
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

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isEditing ? 'Edit Enquiry' : 'Create New Enquiry'}</h2>
        <Link to="/enquiry-masters" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Enquiries
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Enquiry Details</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">EnquirerName *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="EnquirerName"
                    value={formData.EnquirerName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">ContactNumber *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ContactNumber"
                    value={formData.ContactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">EmailAddress *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="EmailAddress"
                    value={formData.EmailAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">EnquiryType</label>
                  <select
                    className="form-select"
                    name="EnquiryType"
                    value={formData.EnquiryType}
                    onChange={handleChange}
                    disabled={dropdownsLoading}
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

              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Subject"
                    value={formData.Subject}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    name="Message"
                    value={formData.Message}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Priority</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Priority"
                    value={formData.Priority}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Status"
                    value={formData.Status}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">StatusMessage</label>
                  <input
                    type="text"
                    className="form-control"
                    name="StatusMessage"
                    value={formData.StatusMessage}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">EnquiryDate</label>
                  <input
                    type="date"
                    className="form-control"
                    name="EnquiryDate"
                    value={formData.EnquiryDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">ResponseType</label>
                  <select
                    className="form-select"
                    name="ResponseType"
                    value={formData.ResponseType}
                    onChange={handleChange}
                    disabled={dropdownsLoading}
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

              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">ResponseDate</label>
                  <input
                    type="date"
                    className="form-control"
                    name="ResponseDate"
                    value={formData.ResponseDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">ResponseMessage</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    name="ResponseMessage"
                    value={formData.ResponseMessage}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">IsActive</label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="IsActive"
                      checked={formData.IsActive}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Active</label>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">IsDeleted</label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="IsDeleted"
                      checked={formData.IsDeleted}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Deleted</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/enquiry-masters')}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    {isEditing ? 'Update Enquiry' : 'Create Enquiry'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquiryMasterForm;

