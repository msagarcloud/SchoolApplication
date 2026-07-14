import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { enquiryMasterService } from '../../services/enquiryMasterService';

const EnquiryMasterList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    enquirerName: '',
    contactNumber: '',
    emailAddress: '',
    enquiryType: '',
    priority: '',
    status: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEnquiries = filteredEnquiries.slice(startIndex, endIndex);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enquiries, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const applyFilters = () => {
    let filtered = enquiries;

    if (filters.enquirerName) {
      filtered = filtered.filter(e => e.EnquirerName?.toLowerCase().includes(filters.enquirerName.toLowerCase()));
    }
    if (filters.contactNumber) {
      filtered = filtered.filter(e => e.ContactNumber?.toLowerCase().includes(filters.contactNumber.toLowerCase()));
    }
    if (filters.emailAddress) {
      filtered = filtered.filter(e => e.EmailAddress?.toLowerCase().includes(filters.emailAddress.toLowerCase()));
    }
    if (filters.enquiryType) {
      filtered = filtered.filter(e => e.EnquiryType?.toLowerCase().includes(filters.enquiryType.toLowerCase()));
    }
    if (filters.priority) {
      filtered = filtered.filter(e => e.Priority?.toLowerCase() === filters.priority.toLowerCase());
    }
    if (filters.status) {
      filtered = filtered.filter(e => e.Status?.toLowerCase() === filters.status.toLowerCase());
    }

    setFilteredEnquiries(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      enquirerName: '',
      contactNumber: '',
      emailAddress: '',
      enquiryType: '',
      priority: '',
      status: '',
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const data = await enquiryMasterService.getAll();
      setEnquiries(data || []);
      setFilteredEnquiries(data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, enquirerName) => {
    if (window.confirm(`Are you sure you want to delete enquiry for "${enquirerName}"?`)) {
      try {
        await enquiryMasterService.delete(id);
        setEnquiries(prev => prev.filter(e => e.Id !== id));
        setFilteredEnquiries(prev => prev.filter(e => e.Id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete enquiry');
      }
    }
  };

  const priorityOptions = useMemo(() => {
    const set = new Set(enquiries.map(e => e.Priority).filter(Boolean));
    return Array.from(set);
  }, [enquiries]);

  const statusOptions = useMemo(() => {
    const set = new Set(enquiries.map(e => e.Status).filter(Boolean));
    return Array.from(set);
  }, [enquiries]);

  const getId = (e) => e.Id ?? e.id;

  const getPaginationNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
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

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Enquiry Management</h2>
        <Link to="/enquiry-masters/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Enquiry
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Filters</h5>
        </div>
        <div className="card-body">
          <div className="row g-2 align-items-end">
            <div className="col">
              <label className="form-label small">Enquirer Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search name..."
                value={filters.enquirerName}
                onChange={(e) => handleFilterChange('enquirerName', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Contact Number</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search number..."
                value={filters.contactNumber}
                onChange={(e) => handleFilterChange('contactNumber', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Email</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search email..."
                value={filters.emailAddress}
                onChange={(e) => handleFilterChange('emailAddress', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Type</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search type..."
                value={filters.enquiryType}
                onChange={(e) => handleFilterChange('enquiryType', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Priority</label>
              <select
                className="form-select form-select-sm"
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
              >
                <option value="">All Priorities</option>
                {priorityOptions.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="col">
              <label className="form-label small">Status</label>
              <select
                className="form-select form-select-sm"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Statuses</option>
                {statusOptions.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <button className="btn btn-secondary btn-sm" onClick={clearFilters}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">All Enquiries</h5>
          <span className="badge bg-secondary">
            Showing {paginatedEnquiries.length} of {filteredEnquiries.length} enquiries
          </span>
        </div>

        <div className="card-body">
          {filteredEnquiries.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-chat-left-text display-4 text-muted"></i>
              <p className="text-muted mt-3 mb-3">No enquiries found</p>
              <Link to="/enquiry-masters/create" className="btn btn-outline-primary">Create First Enquiry</Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Enquirer</th>
                    <th>Type</th>
                    <th>Subject</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Enquiry Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedEnquiries.map((e) => {
                    const id = getId(e);
                    return (
                      <tr key={id}>
                        <td>
                          <Link to={`/enquiry-masters/${id}`} className="text-decoration-none">
                            <strong>{e.EnquirerName || 'N/A'}</strong>
                            <div className="small text-muted">{e.ContactNumber || 'N/A'} | {e.EmailAddress || 'N/A'}</div>
                          </Link>
                        </td>
                        <td><span className="badge bg-info">{e.EnquiryType || 'N/A'}</span></td>
                        <td>{e.Subject || 'N/A'}</td>
                        <td>{e.Priority || 'N/A'}</td>
                        <td>{e.Status || 'N/A'}</td>
                        <td>{e.EnquiryDate ? new Date(e.EnquiryDate).toLocaleDateString() : 'N/A'}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link to={`/enquiry-masters/${id}`} className="btn btn-sm btn-outline-primary" title="View">
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link to={`/enquiry-masters/${id}/edit`} className="btn btn-sm btn-outline-warning" title="Edit">
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(id, e.EnquirerName)}
                              title="Delete"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex align-items-center">
                <label className="form-label mb-0 me-2">Items per page:</label>
                <select
                  className="form-select form-select-sm"
                  style={{ width: 'auto' }}
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <nav>
                <ul className="pagination mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>

                  {getPaginationNumbers().map((page, index) => (
                    <li
                      key={index}
                      className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
                    >
                      {page === '...' ? (
                        <span className="page-link">...</span>
                      ) : (
                        <button className="page-link" onClick={() => handlePageChange(page)}>
                          {page}
                        </button>
                      )}
                    </li>
                  ))}

                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryMasterList;

