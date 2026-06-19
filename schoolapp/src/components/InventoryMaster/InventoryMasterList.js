import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { inventoryMasterService } from '../../services/inventoryMasterService';
import { itemService } from '../../services/itemService';
import { itemLocationService } from '../../services/itemLocationService';
import { authService } from '../../services/authService';

const InventoryMasterList = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    itemId: '',
    itemLocationId: '',
    minQuantity: '',
    status: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const itemMap = useMemo(() => {
    return items.reduce((m, x) => {
      m[String(x.id)] = x.name;
      return m;
    }, {});
  }, [items]);

  const locationMap = useMemo(() => {
    return locations.reduce((m, x) => {
      m[String(x.id)] = x.name ?? x.locationName ?? x.itemLocationName;
      return m;
    }, {});
  }, [locations]);

  const applyFilters = useCallback(() => {
    let filtered = records;

    if (filters.itemId) {
      filtered = filtered.filter((r) => String(r.itemId) === String(filters.itemId));
    }

    if (filters.itemLocationId) {
      filtered = filtered.filter((r) => String(r.itemLocationId) === String(filters.itemLocationId));
    }

    if (filters.minQuantity) {
      const v = Number(filters.minQuantity);
      if (!Number.isNaN(v)) filtered = filtered.filter((r) => Number(r.quantity ?? 0) >= v);
    }

    if (filters.status) {
      if (filters.status === 'active') filtered = filtered.filter((r) => r.isActive === true);
      if (filters.status === 'inactive') filtered = filtered.filter((r) => r.isActive === false);
    }

    setFilteredRecords(filtered);
  }, [records, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [masters, itemsData, locationsData] = await Promise.all([
        inventoryMasterService.getAll(),
        itemService.getAll(),
        itemLocationService.getAll(),
      ]);
      setRecords(masters);
      setFilteredRecords(masters);
      setItems(itemsData);
      setLocations(locationsData);
    } catch (err) {
      setError(err.message || 'Failed to fetch inventory masters');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

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
        if (i - l === 2) rangeWithDots.push(l + 1);
        else if (i - l !== 1) rangeWithDots.push('...');
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await inventoryMasterService.delete(id);
      setRecords(records.filter((r) => r.id !== id));
      setFilteredRecords(filteredRecords.filter((r) => r.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete');
    }
  };

  const clearFilters = () => {
    setFilters({ itemId: '', itemLocationId: '', minQuantity: '', status: '' });
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
        <h2>Inventory Master</h2>
        <Link to="/inventorymasters/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New
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
              <label className="form-label small">Item</label>
              <select
                className="form-select form-select-sm"
                value={filters.itemId}
                onChange={(e) => setFilters((p) => ({ ...p, itemId: e.target.value }))}
              >
                <option value="">All Items</option>
                {items.map((it) => (
                  <option key={it.id} value={it.id}>
                    {it.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col">
              <label className="form-label small">Location</label>
              <select
                className="form-select form-select-sm"
                value={filters.itemLocationId}
                onChange={(e) => setFilters((p) => ({ ...p, itemLocationId: e.target.value }))}
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name ?? loc.locationName ?? 'Location'}
                  </option>
                ))}
              </select>
            </div>

            <div className="col">
              <label className="form-label small">Min Quantity</label>
              <input
                type="number"
                className="form-control form-control-sm"
                value={filters.minQuantity}
                onChange={(e) => setFilters((p) => ({ ...p, minQuantity: e.target.value }))}
                placeholder="0"
              />
            </div>

            <div className="col">
              <label className="form-label small">Status</label>
              <select
                className="form-select form-select-sm"
                value={filters.status}
                onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))}
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
            Showing {paginatedRecords.length} of {filteredRecords.length}
          </span>
        </div>
        <div className="card-body">
          {filteredRecords.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-box display-4 text-muted"></i>
              <p className="text-muted mt-3">No records found</p>
              <Link to="/inventorymasters/create" className="btn btn-outline-primary">
                Create First Record
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Location</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRecords.map((r) => {
                    const name = `${itemMap[String(r.itemId)] ?? 'Item'} @ ${locationMap[String(r.itemLocationId)] ?? 'Location'}`;
                    return (
                      <tr key={r.id}>
                        <td>
                          <Link
                            to={`/inventorymasters/${r.id}`}
                            className="text-decoration-none"
                          >
                            {itemMap[String(r.itemId)] ?? 'N/A'}
                          </Link>
                        </td>
                        <td>{locationMap[String(r.itemLocationId)] ?? 'N/A'}</td>
                        <td>{r.quantity ?? 0}</td>
                        <td>
                          <span className={`badge ${r.isActive ? 'bg-success' : 'bg-danger'}`}>
                            {r.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link to={`/inventorymasters/${r.id}`} className="btn btn-sm btn-outline-primary" title="View">
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link to={`/inventorymasters/${r.id}/edit`} className="btn btn-sm btn-outline-warning" title="Edit">
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(r.id, name)} title="Delete">
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
                    <button className="page-link" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                      Previous
                    </button>
                  </li>
                  {getPaginationNumbers().map((p, idx) => (
                    <li
                      key={idx}
                      className={`page-item ${p === currentPage ? 'active' : ''} ${p === '...' ? 'disabled' : ''}`}
                    >
                      {p === '...' ? (
                        <span className="page-link">...</span>
                      ) : (
                        <button className="page-link" onClick={() => setCurrentPage(p)}>
                          {p}
                        </button>
                      )}
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
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

