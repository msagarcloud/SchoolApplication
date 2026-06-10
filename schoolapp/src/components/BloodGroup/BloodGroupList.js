import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bloodGroupService } from '../../services/bloodGroupService';

const BloodGroupList = () => {
  const [bloodGroups, setBloodGroups] = useState([]);
  const [filteredBloodGroups, setFilteredBloodGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    name: '',
    status: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchBloodGroups();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bloodGroups, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredBloodGroups.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBloodGroups = filteredBloodGroups.slice(startIndex, endIndex);

  const fetchBloodGroups = async () => {
    try {
      setLoading(true);
      const data = await bloodGroupService.getAll();
      setBloodGroups(data);
      setFilteredBloodGroups(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch blood groups');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = bloodGroups;

    if (filters.name) {
      filtered = filtered.filter(bloodGroup =>
        bloodGroup.name?.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.status) {
      const isActive = filters.status === 'active';
      filtered = filtered.filter(bloodGroup => bloodGroup.isActive === isActive);
    }

    setFilteredBloodGroups(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: '',
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

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await bloodGroupService.delete(id);
        setBloodGroups(bloodGroups.filter(bg => bg.id !== id));
        setFilteredBloodGroups(filteredBloodGroups.filter(bg => bg.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete blood group');
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
        <h2>Blood Group Management</h2>
        <Link to="/bloodgroups/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Blood Group
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
            <div className="col-md-6">
              <label className="form-label small">Blood Group Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search blood group..."
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small">Status</label>
              <select
                className="form-select form-select-sm"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-secondary btn-sm w-100"
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
          <h5 className="mb-0">All Blood Groups</h5>
          <span className="badge bg-secondary">
            Showing {paginatedBloodGroups.length} of {filteredBloodGroups.length} blood groups
          </span>
        </div>
        <div className="card-body">
          {filteredBloodGroups.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-droplet display-4 text-muted"></i>
              <p className="text-muted mt-3">No blood groups found</p>
              <Link to="/bloodgroups/create" className="btn btn-outline-primary">
                Create First Blood Group
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Created Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedBloodGroups.map((bloodGroup) => (
                      <tr key={bloodGroup.id}>
                        <td>
                          <Link to={`/bloodgroups/${bloodGroup.id}`} className="text-decoration-none">
                            {bloodGroup.name || 'N/A'}
                          </Link>
                        </td>
                        <td>
                          <span className={`badge ${bloodGroup.isActive ? 'bg-success' : 'bg-danger'}`}>
                            {bloodGroup.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          {new Date(bloodGroup.createdDate).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/bloodgroups/${bloodGroup.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/bloodgroups/${bloodGroup.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(bloodGroup.id, bloodGroup.name)}
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

export default BloodGroupList;
