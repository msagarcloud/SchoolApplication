import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryService } from '../../services/categoryService';

const getCategoryValue = (category, key) => category?.[key] ?? category?.[key.charAt(0).toUpperCase() + key.slice(1)];
const formatCategoryDate = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
};

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    categoryName: '',
    status: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [categories, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, endIndex);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAll();
      setCategories(data);
      setFilteredCategories(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = categories;

    if (filters.categoryName) {
      filtered = filtered.filter(category =>
        category.name?.toLowerCase().includes(filters.categoryName.toLowerCase())
      );
    }

    if (filters.status) {
      const isActive = filters.status === 'active';
      filtered = filtered.filter(category => category.isActive === isActive);
    }

    setFilteredCategories(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      categoryName: '',
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
        await categoryService.delete(id);
        setCategories(categories.filter(cat => cat.id !== id));
        setFilteredCategories(filteredCategories.filter(cat => cat.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete category');
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
        <h2>Category Management</h2>
        <Link to="/categories/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Category
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
              <label className="form-label small">Category Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search category..."
                value={filters.categoryName}
                onChange={(e) => handleFilterChange('categoryName', e.target.value)}
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
          <h5 className="mb-0">All Categories</h5>
          <span className="badge bg-secondary">
            Showing {paginatedCategories.length} of {filteredCategories.length} categories
          </span>
        </div>
        <div className="card-body">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-tags display-4 text-muted"></i>
              <p className="text-muted mt-3">No categories found</p>
              <Link to="/categories/create" className="btn btn-outline-primary">
                Create First Category
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
                    {paginatedCategories.map((category) => {
                      const categoryId = getCategoryValue(category, 'id');
                      const categoryName = getCategoryValue(category, 'name') || 'N/A';
                      const categoryIsActive = getCategoryValue(category, 'isActive');
                      const categoryCreatedDate = getCategoryValue(category, 'createdDate');

                      return (
                        <tr key={categoryId || categoryName}>
                          <td>
                            <Link to={`/categories/${categoryId}`} className="text-decoration-none">
                              {categoryName}
                            </Link>
                          </td>
                          <td>
                            <span className={`badge ${categoryIsActive ? 'bg-success' : 'bg-danger'}`}>
                              {categoryIsActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            {formatCategoryDate(categoryCreatedDate)}
                          </td>
                          <td>
                            <div className="btn-group" role="group">
                              <Link
                                to={`/categories/${categoryId}`}
                                className="btn btn-sm btn-outline-primary"
                                title="View"
                              >
                                <i className="bi bi-eye"></i>
                              </Link>
                              <Link
                                to={`/categories/${categoryId}/edit`}
                                className="btn btn-sm btn-outline-warning"
                                title="Edit"
                              >
                                <i className="bi bi-pencil"></i>
                              </Link>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(categoryId, categoryName)}
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

export default CategoryList;
