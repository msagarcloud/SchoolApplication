import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { classService } from '../../services/classService';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    className: '',
    examAssessment: '',
    isGradePointApplicable: '',
    isActive: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [classes, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedClasses = filteredClasses.slice(startIndex, endIndex);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const data = await classService.getAll();
      setClasses(data);
      setFilteredClasses(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch classes');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = classes;

    if (filters.className) {
      filtered = filtered.filter(cls =>
        cls.name?.toLowerCase().includes(filters.className.toLowerCase())
      );
    }

    if (filters.examAssessment) {
      filtered = filtered.filter(cls =>
        cls.examAssessment?.toLowerCase().includes(filters.examAssessment.toLowerCase())
      );
    }

    if (filters.isGradePointApplicable !== '') {
      const isApplicable = filters.isGradePointApplicable === 'true';
      filtered = filtered.filter(cls => cls.isGradePointApplicable === isApplicable);
    }

    if (filters.isActive !== '') {
      const isActive = filters.isActive === 'true';
      filtered = filtered.filter(cls => cls.isActive === isActive);
    }

    setFilteredClasses(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      className: '',
      examAssessment: '',
      isGradePointApplicable: '',
      isActive: ''
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
        await classService.delete(id);
        setClasses(classes.filter(cls => cls.id !== id));
        setFilteredClasses(filteredClasses.filter(cls => cls.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete class');
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
        <h2>Class Management</h2>
        <Link to="/classes/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Class
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
              <label className="form-label small">Class Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search class..."
                value={filters.className}
                onChange={(e) => handleFilterChange('className', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Exam Assessment</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search assessment..."
                value={filters.examAssessment}
                onChange={(e) => handleFilterChange('examAssessment', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Grade Point</label>
              <select
                className="form-select form-select-sm"
                value={filters.isGradePointApplicable}
                onChange={(e) => handleFilterChange('isGradePointApplicable', e.target.value)}
              >
                <option value="">All</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="col">
              <label className="form-label small">Status</label>
              <select
                className="form-select form-select-sm"
                value={filters.isActive}
                onChange={(e) => handleFilterChange('isActive', e.target.value)}
              >
                <option value="">All</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
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
          <h5 className="mb-0">All Classes</h5>
          <span className="badge bg-secondary">
            Showing {paginatedClasses.length} of {filteredClasses.length} classes
          </span>
        </div>
        <div className="card-body">
          {filteredClasses.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-mortarboard display-4 text-muted"></i>
              <p className="text-muted mt-3">No classes found</p>
              <Link to="/classes/create" className="btn btn-outline-primary">
                Create First Class
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Class Name</th>
                      <th>Exam Assessment</th>
                      <th>Grade Point</th>
                      <th>Status</th>
                      <th>Created Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedClasses.map((cls) => (
                      <tr key={cls.id}>
                        <td>
                          <Link to={`/classes/${cls.id}`} className="text-decoration-none">
                            {cls.name || 'N/A'}
                          </Link>
                        </td>
                        <td>{cls.examAssessment || 'N/A'}</td>
                        <td>
                          <span className={`badge ${cls.isGradePointApplicable ? 'bg-success' : 'bg-secondary'}`}>
                            {cls.isGradePointApplicable ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${cls.isActive ? 'bg-success' : 'bg-danger'}`}>
                            {cls.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          {new Date(cls.createdDate).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/classes/${cls.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/classes/${cls.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(cls.id, cls.name)}
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

export default ClassList;
