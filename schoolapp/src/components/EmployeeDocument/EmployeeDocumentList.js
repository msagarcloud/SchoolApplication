import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { employeeDocumentService } from '../../services/employeeDocumentService';

const EmployeeDocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    employeeName: '',
    documentType: '',
    status: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [documents, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

  const applyFilters = () => {
    let filtered = documents;

    if (filters.employeeName) {
      filtered = filtered.filter(doc =>
        doc.employeeName?.toLowerCase().includes(filters.employeeName.toLowerCase())
      );
    }

    if (filters.documentType) {
      filtered = filtered.filter(doc =>
        doc.documentType?.toLowerCase().includes(filters.documentType.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(doc =>
        doc.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    setFilteredDocuments(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      employeeName: '',
      documentType: '',
      status: ''
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

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

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const data = await employeeDocumentService.getAll();
      setDocuments(data);
      setFilteredDocuments(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch employee documents');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, documentName) => {
    if (window.confirm(`Are you sure you want to delete "${documentName}"?`)) {
      try {
        await employeeDocumentService.delete(id);
        // Refresh the documents list after successful deletion
        await fetchDocuments();
      } catch (err) {
        setError(err.message || 'Failed to delete document');
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

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employee Documents</h2>
        <Link to="/employee-documents/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Document
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Filters Section */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Filters</h5>
        </div>
        <div className="card-body">
          <div className="row g-2 align-items-end">
            <div className="col">
              <label className="form-label small">Employee Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search employee..."
                value={filters.employeeName}
                onChange={(e) => handleFilterChange('employeeName', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Document Type</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search document type..."
                value={filters.documentType}
                onChange={(e) => handleFilterChange('documentType', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Status</label>
              <select
                className="form-select form-select-sm"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-secondary btn-sm"
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">All Documents</h5>
          <span className="badge bg-secondary">
            Showing {paginatedDocuments.length} of {filteredDocuments.length} documents
          </span>
        </div>
        <div className="card-body">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-file-earmark-text display-4 text-muted"></i>
              <p className="text-muted mt-3">No documents found</p>
              <Link to="/employee-documents/create" className="btn btn-outline-primary">
                Upload First Document
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Document Type</th>
                      <th>Document Name</th>
                      <th>Upload Date</th>
                      <th>Expiry Date</th>
                      <th>File Size</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDocuments.map((doc) => (
                      <tr key={doc.id}>
                        <td>
                          <Link to={`/employees/${doc.employeeId}`} className="text-decoration-none">
                            {doc.employeeName}
                          </Link>
                        </td>
                        <td>{doc.documentType}</td>
                        <td>{doc.documentName}</td>
                        <td>{doc.uploadDate}</td>
                        <td>{doc.expiryDate}</td>
                        <td>{doc.fileSize}</td>
                        <td>
                          <span className={`badge bg-${
                            doc.status === 'Active' ? 'success' : 
                            doc.status === 'Expired' ? 'danger' : 'warning'
                          }`}>
                            {doc.status}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              title="Download"
                              onClick={async () => {
                                try {
                                  const blob = await employeeDocumentService.download(doc.id);
                                  const url = window.URL.createObjectURL(blob);
                                  const a = document.createElement('a');
                                  a.href = url;
                                  a.download = doc.documentName;
                                  document.body.appendChild(a);
                                  a.click();
                                  window.URL.revokeObjectURL(url);
                                  document.body.removeChild(a);
                                } catch (err) {
                                  setError(err.message || 'Failed to download document');
                                }
                              }}
                            >
                              <i className="bi bi-download"></i>
                            </button>
                            <Link 
                              to={`/employee-documents/${doc.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(doc.id, doc.documentName)}
                              title="Delete"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
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
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(page)}
                            >
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDocumentList;
