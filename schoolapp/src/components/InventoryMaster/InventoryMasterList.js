import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { inventoryMasterService } from '../../services/inventoryMasterService';
import { authService } from '../../services/authService';

const InventoryMasterList = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    name: '',
    itemId: '',
    locationId: '',
    status: '',
    isActive: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyFilters = useMemo(() => {
    let filtered = records;

    if (filters.name) {
      const q = filters.name.toLowerCase();
      filtered = filtered.filter((r) => (r.name || '').toLowerCase().includes(q));
    }

    if (filters.itemId) {
      filtered = filtered.filter((r) => String(r.itemId || '') === String(filters.itemId));
    }

    if (filters.locationId) {
      filtered = filtered.filter((r) => String(r.locationId || '') === String(filters.locationId));
    }

    if (filters.status) {
      filtered = filtered.filter((r) => String(r.status || '') === String(filters.status));
    }

    if (filters.isActive) {
      const desired = filters.isActive === 'active';
      filtered = filtered.filter((r) => Boolean(r.isActive) === desired);
    }

    return filtered;
  }, [records, filters]);

  useEffect(() => {
    setFilteredRecords(applyFilters);
    setCurrentPage(1);
  }, [applyFilters]);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await inventoryMasterService.getAll();
      setRecords(Array.isArray(data) ? data : []);
      setFilteredRecords(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch InventoryMaster records');
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({ name: '', itemId: '', locationId: '', status: '', isActive: '' });
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleDelete = async (id, name) => {
    const targetName = name || id;
    if (!window.confirm(`Are you sure you want to delete "${targetName}"? This action cannot be undone.`)) return;

    try {
      await inventoryMasterService.delete(id);
      setRecords((prev) => prev.filter((r) => String(r.id) !== String(id)));
      setFilteredRecords((prev) => prev.filter((r) => String(r.id) !== String(id)));
    } catch (err) {
      setError(err.message || 'Failed to delete');
    }
  };

  const getPaginationNumbers = () => {
    if (totalPages <= 1) return [1];
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
        if (i - l === 2) rangeWithDots.push(l + 1);
        else if (i - l !== 1) rangeWithDots.push('...');
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
      <div className="row mb-3">
        <div className="col-12">
          <div className="card bg-light">
            <div className="card-body py-2">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h6 className="mb-0 text-primary">
                    <i className="bi bi-building me-2"></i>
                    <strong>{authService.getSchoolName() || 'School Name'}</strong>
                  </h6>
                </div>
                <div className="col-md-6 text-md-end">
                  <h6 className="mb-0 text-secondary">
                    <i className="bi bi-briefcase me-2"></i>
                    {authService.getCompanyName() || 'Company Name'}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Inventory Master Management</h2>
        <Link to="/inventory-masters/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Inventory Master
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
              <label className="form-label small">Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search name..."
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
              />
            </div>

            <div className="col">
              <label className="form-label small">ItemId</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Filter by ItemId..."
                value={filters.itemId}
                onChange={(e) => handleFilterChange('itemId', e.target.value)}
              />
            </div>

            <div className="col">
              <label className="form-label small">LocationId</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Filter by LocationId..."
                value={filters.locationId}
                onChange={(e) => handleFilterChange('locationId', e.target.value)}
              />
            </div>

            <div className="col">
              <label className="form-label small">IsActive</label>
              <select
                className="form-select form-select-sm"
                value={filters.isActive}
                onChange={(e) => handleFilterChange('isActive', e.target.value)}
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
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
          <h5 className="mb-0">All Inventory Masters</h5>
          <span className="badge bg-secondary">
            Showing {paginatedRecords.length} of {filteredRecords.length} records
          </span>
        </div>

        <div className="card-body">
          {filteredRecords.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-box display-4 text-muted"></i>
              <p className="text-muted mt-3">No inventory master records found</p>
              <Link to="/inventory-masters/create" className="btn btn-outline-primary">
                Create First Record
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>ItemId</th>
                    <th>LocationId</th>
                    <th>Quantity</th>
                    <th>Cost/Item</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRecords.map((r) => (
                    <tr key={r.id || r.Name || `${r.itemId}-${r.locationId}`}> 
                      <td>
                        <Link to={`/inventory-masters/${r.id}`} className="text-decoration-none">
                          {r.name || 'N/A'}
                        </Link>
                      </td>
                      <td>{r.itemId || 'N/A'}</td>
                      <td>{r.locationId || 'N/A'}</td>
                      <td>{r.quantity ?? 'N/A'}</td>
                      <td>{r.costPerItem ?? 'N/A'}</td>
                      <td>
                        <span className={`badge ${r.isActive ? 'bg-success' : 'bg-danger'}`}>
                          {r.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link
                            to={`/inventory-masters/${r.id}`}
                            className="btn btn-sm btn-outline-primary"
                            title="View"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link
                            to={`/inventory-masters/${r.id}/edit`}
                            className="btn btn-sm btn-outline-warning"
                            title="Edit"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(r.id, r.name)}
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
          )}

          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex align-items-center">
                <label className="form-label mb-0 me-2">Items per page:</label>
                <select
                  className="form-select form-select-sm"
                  style={{ width: 'auto' }}
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
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
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>

                  {getPaginationNumbers().map((page, idx) => (
                    <li
                      key={idx}
                      className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
                    >
                      {page === '...' ? (
                        <span className="page-link">...</span>
                      ) : (
                        <button className="page-link" onClick={() => setCurrentPage(page)}>
                          {page}
                        </button>
                      )}
                    </li>
                  ))}

                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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

export default InventoryMasterList;

