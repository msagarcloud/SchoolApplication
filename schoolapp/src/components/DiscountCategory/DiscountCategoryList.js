import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { discountCategoryService } from '../../services/discountCategoryService';
import { feeCategoryService } from '../../services/feeCategoryService';

const getDiscountCategoryValue = (discountCategory, key) =>
  discountCategory?.[key] ?? discountCategory?.[key.charAt(0).toUpperCase() + key.slice(1)];

const formatDiscountCategoryDate = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
};

const DiscountCategoryList = () => {
  const [discountCategories, setDiscountCategories] = useState([]);
  const [filteredDiscountCategories, setFilteredDiscountCategories] = useState([]);
  const [feeCategories, setFeeCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    name: '',
    feeCategoryId: '',
    status: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [discountCategoriesData, feeCategoriesData] = await Promise.all([
        discountCategoryService.getAll(),
        feeCategoryService.getAll(),
      ]);
      setDiscountCategories(discountCategoriesData);
      setFilteredDiscountCategories(discountCategoriesData);
      setFeeCategories(feeCategoriesData);
    } catch (err) {
      setError(err.message || 'Failed to fetch discount categories');
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = discountCategories;

    if (filters.name) {
      filtered = filtered.filter((discountCategory) =>
        discountCategory.name?.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.feeCategoryId) {
      filtered = filtered.filter(
        (discountCategory) => discountCategory.feeCategoryId === filters.feeCategoryId
      );
    }

    if (filters.status) {
      const isActive = filters.status === 'active';
      filtered = filtered.filter((discountCategory) => discountCategory.isActive === isActive);
    }

    setFilteredDiscountCategories(filtered);
  }, [discountCategories, filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.ceil(filteredDiscountCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDiscountCategories = filteredDiscountCategories.slice(startIndex, endIndex);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      feeCategoryId: '',
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
    const pages = [];
    const maxPagesToShow = 5;
    const halfPages = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfPages);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const getFeeCategoryName = (feeCategoryId) => {
    const feeCategory = feeCategories.find((fc) => fc.id === feeCategoryId);
    return feeCategory?.feesCatgoryName || 'N/A';
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
        <h2>Discount Categories</h2>
        <Link to="/discountCategory/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Discount Category
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Filter</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="filterName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="filterName"
                placeholder="Search by name"
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="filterFeeCategory" className="form-label">
                Fee Category
              </label>
              <select
                className="form-select"
                id="filterFeeCategory"
                value={filters.feeCategoryId}
                onChange={(e) => handleFilterChange('feeCategoryId', e.target.value)}
              >
                <option value="">All Categories</option>
                {feeCategories.map((feeCategory) => (
                  <option key={feeCategory.id} value={feeCategory.id}>
                    {feeCategory.feesCatgoryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <label htmlFor="filterStatus" className="form-label">
                Status
              </label>
              <select
                className="form-select"
                id="filterStatus"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="col-md-2 d-flex align-items-end">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={clearFilters}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Discount Categories List</h5>
          <div className="d-flex align-items-center gap-2">
            <label htmlFor="itemsPerPage" className="form-label mb-0">
              Items per page:
            </label>
            <select
              className="form-select form-select-sm"
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              style={{ width: '70px' }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Fee Category</th>
                <th>Description</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDiscountCategories.length > 0 ? (
                paginatedDiscountCategories.map((discountCategory) => (
                  <tr key={discountCategory.id}>
                    <td>{getDiscountCategoryValue(discountCategory, 'name') || 'N/A'}</td>
                    <td>{getFeeCategoryName(discountCategory.feeCategoryId)}</td>
                    <td>{getDiscountCategoryValue(discountCategory, 'description') || 'N/A'}</td>
                    <td>
                      <span className="badge bg-info">
                        {getDiscountCategoryValue(discountCategory, 'isPercentAge')
                          ? 'Percentage'
                          : 'Fixed Amount'}
                      </span>
                    </td>
                    <td>
                      {getDiscountCategoryValue(discountCategory, 'isPercentAge')
                        ? `${getDiscountCategoryValue(discountCategory, 'amount')}%`
                        : `₹${getDiscountCategoryValue(discountCategory, 'amount')}`}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          getDiscountCategoryValue(discountCategory, 'isActive')
                            ? 'bg-success'
                            : 'bg-danger'
                        }`}
                      >
                        {getDiscountCategoryValue(discountCategory, 'isActive')
                          ? 'Active'
                          : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      {formatDiscountCategoryDate(
                        getDiscountCategoryValue(discountCategory, 'createdDate')
                      )}
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <Link
                          to={`/discountCategory/${discountCategory.id}`}
                          className="btn btn-outline-info"
                          title="View"
                        >
                          <i className="bi bi-eye"></i>
                        </Link>
                        <Link
                          to={`/discountCategory/${discountCategory.id}/edit`}
                          className="btn btn-outline-warning"
                          title="Edit"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    <p className="text-muted mb-0">No discount categories found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="card-footer d-flex justify-content-center">
            <nav aria-label="Page navigation">
              <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  >
                    First
                  </button>
                </li>
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
                  <li key={index} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                    {page === '...' ? (
                      <span className="page-link">...</span>
                    ) : (
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page)}
                        disabled={page === '...'}
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
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    Last
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountCategoryList;
