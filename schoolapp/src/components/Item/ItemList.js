import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { itemService } from '../../services/itemService';
import { itemTypeService } from '../../services/itemTypeService';
import { authService } from '../../services/authService';

const getItemValue = (item, key) => item?.[key] ?? item?.[key.charAt(0).toUpperCase() + key.slice(1)];
const formatItemDate = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
};

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({ itemName: '', itemTypeId: '', status: '' });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = items;

    if (filters.itemName) {
      filtered = filtered.filter(item =>
        item.name?.toLowerCase().includes(filters.itemName.toLowerCase())
      );
    }

    if (filters.itemTypeId) {
      filtered = filtered.filter(item => String(item.itemTypeId) === String(filters.itemTypeId));
    }

    if (filters.status) {
      const isActive = filters.status === 'active';
      filtered = filtered.filter(item => item.isActive === isActive);
    }

    setFilteredItems(filtered);
  }, [items, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [itemsData, typesData] = await Promise.all([itemService.getAll(), itemTypeService.getAll()]);
      setItems(itemsData);
      setFilteredItems(itemsData);
      setItemTypes(typesData);
    } catch (err) {
      setError(err.message || 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({ itemName: '', itemTypeId: '', status: '' });
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
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await itemService.delete(id);
      setItems(items.filter(i => i.id !== id));
      setFilteredItems(filteredItems.filter(i => i.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete');
    }
  };

  if (loading) return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;

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
        <h2>Inventory Items Management</h2>
        <Link to="/inventoryitems/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Item
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
              <label className="form-label small">Item Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search item..."
                value={filters.itemName}
                onChange={(e) => handleFilterChange('itemName', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Item Type</label>
              <select
                className="form-select form-select-sm"
                value={filters.itemTypeId}
                onChange={(e) => handleFilterChange('itemTypeId', e.target.value)}
              >
                <option value="">All Types</option>
                {itemTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div className="col">
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
          <h5 className="mb-0">All Items</h5>
          <span className="badge bg-secondary">
            Showing {paginatedItems.length} of {filteredItems.length} items
          </span>
        </div>
        <div className="card-body">
          {filteredItems.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-box display-4 text-muted"></i>
              <p className="text-muted mt-3">No items found</p>
              <Link to="/inventoryitems/create" className="btn btn-outline-primary">
                Create First Item
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Created Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.map((item) => {
                      const itemId = getItemValue(item, 'id');
                      const itemName = getItemValue(item, 'name') || 'N/A';
                      const itemTypeId = getItemValue(item, 'itemTypeId');
                      const itemIsActive = getItemValue(item, 'isActive');
                      const itemCreatedDate = getItemValue(item, 'createdDate');
                      const typeName = itemTypes.find(t => String(t.id) === String(itemTypeId))?.name || 'N/A';

                      return (
                        <tr key={itemId || itemName}>
                          <td>
                            <Link to={`/inventoryitems/${itemId}`} className="text-decoration-none">
                              {itemName}
                            </Link>
                          </td>
                          <td>{typeName}</td>
                          <td>
                            <span className={`badge ${itemIsActive ? 'bg-success' : 'bg-danger'}`}>
                              {itemIsActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            {formatItemDate(itemCreatedDate)}
                          </td>
                          <td>
                            <div className="btn-group" role="group">
                              <Link
                                to={`/inventoryitems/${itemId}`}
                                className="btn btn-sm btn-outline-primary"
                                title="View"
                              >
                                <i className="bi bi-eye"></i>
                              </Link>
                              <Link
                                to={`/inventoryitems/${itemId}/edit`}
                                className="btn btn-sm btn-outline-warning"
                                title="Edit"
                              >
                                <i className="bi bi-pencil"></i>
                              </Link>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(itemId, itemName)}
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

export default ItemList;
