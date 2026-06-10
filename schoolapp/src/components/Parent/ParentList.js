import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { parentService } from '../../services/parentService';

const ParentList = () => {
  const [parents, setParents] = useState([]);
  const [filteredParents, setFilteredParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    parentFirstName: '',
    parentLastName: '',
    email: '',
    mobile: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchParents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [parents, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredParents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedParents = filteredParents.slice(startIndex, endIndex);

  const applyFilters = () => {
    let filtered = parents;

    if (filters.parentFirstName) {
      filtered = filtered.filter(parent =>
        parent.parentFirstName?.toLowerCase().includes(filters.parentFirstName.toLowerCase())
      );
    }

    if (filters.parentLastName) {
      filtered = filtered.filter(parent =>
        parent.parentLastName?.toLowerCase().includes(filters.parentLastName.toLowerCase())
      );
    }

    if (filters.email) {
      filtered = filtered.filter(parent =>
        parent.email?.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    if (filters.mobile) {
      filtered = filtered.filter(parent =>
        parent.mobile?.toLowerCase().includes(filters.mobile.toLowerCase())
      );
    }

    setFilteredParents(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      parentFirstName: '',
      parentLastName: '',
      email: '',
      mobile: ''
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

  const fetchParents = async () => {
    try {
      setLoading(true);
      const data = await parentService.getAll();
      setParents(data);
      setFilteredParents(data);
    } catch (err) {
      // Check if it's a 404 error (API not implemented)
      if (err.message.includes('404') || err.message.includes('Failed to fetch')) {
        setError('Parent API is not yet implemented. Please contact the backend team to set up the Parent Management API endpoints.');
      } else {
        setError(err.message || 'Failed to fetch parents');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, parentName) => {
    if (window.confirm(`Are you sure you want to delete "${parentName}"?`)) {
      try {
        await parentService.delete(id);
        setParents(parents.filter(parent => parent.id !== id));
        setFilteredParents(filteredParents.filter(parent => parent.id !== id));
      } catch (err) {
        // Check if it's a 404 error (API not implemented)
        if (err.message.includes('404') || err.message.includes('Failed to fetch')) {
          setError('Parent API is not yet implemented. Delete operations are not available until the backend is set up.');
        } else {
          setError(err.message || 'Failed to delete parent');
        }
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
        <h2>Parent Management</h2>
        <Link to="/parents/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Parent
        </Link>
      </div>

      {error && (
        <div className={`alert ${error.includes('not yet implemented') ? 'alert-warning' : 'alert-danger'}`} role="alert">
          <div className="d-flex align-items-center">
            <i className={`bi ${error.includes('not yet implemented') ? 'bi-exclamation-triangle' : 'bi-exclamation-circle'} me-2`}></i>
            <div>
              <strong>{error.includes('not yet implemented') ? 'API Not Available' : 'Error'}</strong>
              <div className="small">{error}</div>
            </div>
          </div>
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
              <label className="form-label small">First Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search first name..."
                value={filters.parentFirstName}
                onChange={(e) => handleFilterChange('parentFirstName', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Last Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search last name..."
                value={filters.parentLastName}
                onChange={(e) => handleFilterChange('parentLastName', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Email</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search email..."
                value={filters.email}
                onChange={(e) => handleFilterChange('email', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Mobile</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search mobile..."
                value={filters.mobile}
                onChange={(e) => handleFilterChange('mobile', e.target.value)}
              />
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
          <h5 className="mb-0">All Parents</h5>
          <span className="badge bg-secondary">
            Showing {paginatedParents.length} of {filteredParents.length} parents
          </span>
        </div>
        <div className="card-body">
          {filteredParents.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-people display-4 text-muted"></i>
              <p className="text-muted mt-3">No parents found</p>
              <Link to="/parents/create" className="btn btn-outline-primary">
                Create First Parent
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Phone</th>
                      <th>Occupation</th>
                      <th>Relation</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedParents.map((parent) => (
                      <tr key={parent.id}>
                        <td>
                          <Link to={`/parents/${parent.id}`} className="text-decoration-none">
                            {`${parent.parentFirstName || ''} ${parent.parentLastName || ''}`.trim() || 'N/A'}
                          </Link>
                        </td>
                        <td>{parent.email || 'N/A'}</td>
                        <td>{parent.mobile || 'N/A'}</td>
                        <td>{parent.phone || 'N/A'}</td>
                        <td>{parent.occupation || 'N/A'}</td>
                        <td>
                          <span className="badge bg-info">
                            {parent.relationTypeId === 'father-relation-type-id' ? 'Father' : 
                             parent.relationTypeId === 'mother-relation-type-id' ? 'Mother' : 'Parent'}
                          </span>
                        </td>
                        <td>
                          <span className={`badge bg-${parent.isActive ? 'success' : 'danger'}`}>
                            {parent.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/parents/${parent.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/parents/${parent.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(parent.id, `${parent.parentFirstName} ${parent.parentLastName}`)}
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

export default ParentList;
