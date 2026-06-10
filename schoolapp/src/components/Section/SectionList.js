import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sectionService } from '../../services/sectionService';
import { authService } from '../../services/authService';

const sameGuid = (a, b) =>
  String(a ?? '').trim().toLowerCase() === String(b ?? '').trim().toLowerCase();

const SectionList = () => {
  const [sections, setSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    sectionName: '',
    isActive: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [sections, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredSections.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSections = filteredSections.slice(startIndex, endIndex);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const data = await sectionService.getAll();
      const list = Array.isArray(data) ? data : [];
      const currentUser = authService.getCurrentUser();
      const schoolId = currentUser?.schoolId;
      const scoped =
        schoolId != null && schoolId !== ''
          ? list.filter((section) => sameGuid(section.schoolId, schoolId))
          : list;
      setSections(scoped);
      setFilteredSections(scoped);
    } catch (err) {
      setError(err.message || 'Failed to fetch sections');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = sections;

    if (filters.sectionName) {
      filtered = filtered.filter(section =>
        section.name?.toLowerCase().includes(filters.sectionName.toLowerCase())
      );
    }

    if (filters.isActive !== '') {
      const isActive = filters.isActive === 'true';
      filtered = filtered.filter(section => section.isActive === isActive);
    }

    setFilteredSections(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      sectionName: '',
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
        await sectionService.delete(id);
        setSections(sections.filter(section => section.id !== id));
        setFilteredSections(filteredSections.filter(section => section.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete section');
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
        <h2>Section Management</h2>
        <Link to="/sections/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Section
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
              <label className="form-label small">Section Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search section..."
                value={filters.sectionName}
                onChange={(e) => handleFilterChange('sectionName', e.target.value)}
              />
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
          <h5 className="mb-0">All Sections</h5>
          <span className="badge bg-secondary">
            Showing {paginatedSections.length} of {filteredSections.length} sections
          </span>
        </div>
        <div className="card-body">
          {filteredSections.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-grid-3x3-gap display-4 text-muted"></i>
              <p className="text-muted mt-3">No sections found</p>
              <Link to="/sections/create" className="btn btn-outline-primary">
                Create First Section
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Section Name</th>
                      <th>Status</th>
                      <th>Created Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedSections.map((section) => (
                      <tr key={section.id}>
                        <td>
                          <Link to={`/sections/${section.id}`} className="text-decoration-none">
                            {section.name || 'N/A'}
                          </Link>
                        </td>
                        <td>
                          <span className={`badge ${section.isActive ? 'bg-success' : 'bg-danger'}`}>
                            {section.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          {new Date(section.createdDate).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/sections/${section.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/sections/${section.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(section.id, section.name)}
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

export default SectionList;
