import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { feeCategoryService } from '../../services/feeCategoryService';

const getFeeCategoryValue = (feeCategory, key) =>
  feeCategory?.[key] ?? feeCategory?.[key.charAt(0).toUpperCase() + key.slice(1)];

const formatFeeCategoryDate = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
};

const FeeCategoryList = () => {
  const [feeCategories, setFeeCategories] = useState([]);
  const [filteredFeeCategories, setFilteredFeeCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    feesCatgoryName: '',
    status: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchFeeCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [feeCategories, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.ceil(filteredFeeCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFeeCategories = filteredFeeCategories.slice(startIndex, endIndex);

  const fetchFeeCategories = async () => {
    try {
      setLoading(true);
      const data = await feeCategoryService.getAll();
      setFeeCategories(data);
      setFilteredFeeCategories(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch fee categories');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = feeCategories;

    if (filters.feesCatgoryName) {
      filtered = filtered.filter((feeCategory) =>
        feeCategory.feesCatgoryName
          ?.toLowerCase()
          .includes(filters.feesCatgoryName.toLowerCase())
      );
    }

    if (filters.status) {
      const isActive = filters.status === 'active';
      filtered = filtered.filter((feeCategory) => feeCategory.isActive === isActive);
    }

    setFilteredFeeCategories(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      feesCatgoryName: '',
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
        await feeCategoryService.delete(id);
        setFeeCategories(feeCategories.filter((item) => item.id !== id));
        setFilteredFeeCategories(filteredFeeCategories.filter((item) => item.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete fee category');
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
        <h2>Fee Category Management</h2>
        <Link to="/feecategory/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Fee Category
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
              <label className="form-label small">Fee Category Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search fee category..."
                value={filters.feesCatgoryName}
                onChange={(e) => handleFilterChange('feesCatgoryName', e.target.value)}
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
          <h5 className="mb-0">All Fee Categories</h5>
          <span className="badge bg-secondary">
            Showing {paginatedFeeCategories.length} of {filteredFeeCategories.length} fee categories
          </span>
        </div>
        <div className="card-body">
          {filteredFeeCategories.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-briefcase display-4 text-muted"></i>
              <p className="text-muted mt-3">No fee categories found</p>
              <Link to="/feecategory/create" className="btn btn-outline-primary">
                Create First Fee Category
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Created Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedFeeCategories.map((feeCategory) => {
                      const feeCategoryId = getFeeCategoryValue(feeCategory, 'id');
                      const feeCategoryName =
                        getFeeCategoryValue(feeCategory, 'feesCatgoryName') || 'N/A';
                      const feeCategoryDescription =
                        getFeeCategoryValue(feeCategory, 'description') || 'N/A';
                      const feeCategoryIsActive = getFeeCategoryValue(feeCategory, 'isActive');
                      const feeCategoryCreatedDate = getFeeCategoryValue(feeCategory, 'createdDate');

                      return (
                        <tr key={feeCategoryId || feeCategoryName}>
                          <td>
                            <Link
                              to={`/feecategory/${feeCategoryId}`}
                              className="text-decoration-none"
                            >
                              {feeCategoryName}
                            </Link>
                          </td>
                          <td>{feeCategoryDescription}</td>
                          <td>
                            <span
                              className={`badge ${feeCategoryIsActive ? 'bg-success' : 'bg-danger'}`}
                            >
                              {feeCategoryIsActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>{formatFeeCategoryDate(feeCategoryCreatedDate)}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <Link
                                to={`/feecategory/${feeCategoryId}`}
                                className="btn btn-sm btn-outline-primary"
                                title="View"
                              >
                                <i className="bi bi-eye"></i>
                              </Link>
                              <Link
                                to={`/feecategory/${feeCategoryId}/edit`}
                                className="btn btn-sm btn-outline-warning"
                                title="Edit"
                              >
                                <i className="bi bi-pencil"></i>
                              </Link>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(feeCategoryId, feeCategoryName)}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeeCategoryList;
