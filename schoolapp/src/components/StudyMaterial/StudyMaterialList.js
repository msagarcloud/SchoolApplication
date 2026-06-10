import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import studyMaterialService from '../../services/studyMaterialService';

const StudyMaterialList = () => {
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    title: '',
    class: '',
    subject: '',
    type: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchMaterials();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [materials, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMaterials = filteredMaterials.slice(startIndex, endIndex);

  const applyFilters = () => {
    let filtered = materials;

    if (filters.title) {
      filtered = filtered.filter(material =>
        material.title?.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.class) {
      filtered = filtered.filter(material =>
        material.className?.toLowerCase().includes(filters.class.toLowerCase())
      );
    }

    if (filters.subject) {
      filtered = filtered.filter(material =>
        material.subject?.toLowerCase().includes(filters.subject.toLowerCase())
      );
    }

    if (filters.type) {
      filtered = filtered.filter(material =>
        material.type?.toLowerCase() === filters.type.toLowerCase()
      );
    }

    setFilteredMaterials(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      title: '',
      class: '',
      subject: '',
      type: ''
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

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const data = await studyMaterialService.getStudyMaterials();
      setMaterials(data);
      setFilteredMaterials(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch study materials');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await studyMaterialService.deleteMaterial(id);
        setMaterials(materials.filter(material => material.id !== id));
        setFilteredMaterials(filteredMaterials.filter(material => material.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete material');
      }
    }
  };

  const handleDownload = async (id, title) => {
    try {
      await studyMaterialService.downloadMaterial(id, title);
    } catch (err) {
      setError(err.message || 'Failed to download material');
    }
  };

  const getTypeBadge = (type) => {
    const typeColors = {
      'PDF': 'danger',
      'DOCX': 'primary',
      'XLSX': 'success',
      'PPTX': 'warning',
      'MP4': 'info',
      'ZIP': 'secondary'
    };
    
    const color = typeColors[type] || 'secondary';
    
    return (
      <span className={`badge bg-${color}`}>{type}</span>
    );
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
        <h2>Study Materials</h2>
        <Link to="/materials/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Upload Material
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
              <label className="form-label small">Material Title</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search material..."
                value={filters.title}
                onChange={(e) => handleFilterChange('title', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Class</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search class..."
                value={filters.class}
                onChange={(e) => handleFilterChange('class', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Subject</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search subject..."
                value={filters.subject}
                onChange={(e) => handleFilterChange('subject', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">File Type</label>
              <select
                className="form-select form-select-sm"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="PDF">PDF</option>
                <option value="DOCX">DOCX</option>
                <option value="XLSX">XLSX</option>
                <option value="PPTX">PPTX</option>
                <option value="MP4">MP4</option>
                <option value="ZIP">ZIP</option>
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
          <h5 className="mb-0">All Study Materials</h5>
          <span className="badge bg-secondary">
            Showing {paginatedMaterials.length} of {filteredMaterials.length} materials
          </span>
        </div>
        <div className="card-body">
          {filteredMaterials.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-journal-text display-4 text-muted"></i>
              <p className="text-muted mt-3">No study materials found</p>
              <Link to="/materials/create" className="btn btn-outline-primary">
                Upload First Material
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Material</th>
                      <th>Class</th>
                      <th>Subject</th>
                      <th>Teacher</th>
                      <th>Type</th>
                      <th>Size</th>
                      <th>Downloads</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedMaterials.map((material) => (
                      <tr key={material.id}>
                        <td>
                          <Link to={`/materials/${material.id}`} className="text-decoration-none">
                            <div className="d-flex align-items-center">
                              <i className={`bi bi-file-${material.type.toLowerCase()} me-2 text-${material.type === 'PDF' ? 'danger' : 'primary'}`}></i>
                              <div>
                                <strong>{material.title}</strong>
                                <div className="small text-muted">{material.description}</div>
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td>
                          <span className="badge bg-primary">{material.className}</span>
                        </td>
                        <td>{material.subject}</td>
                        <td>{material.teacherName}</td>
                        <td>{getTypeBadge(material.type)}</td>
                        <td>{material.fileSize}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <i className="bi bi-download me-1"></i>
                            <span>{material.downloadCount}</span>
                          </div>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/materials/${material.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-success"
                              onClick={() => handleDownload(material.id, material.title)}
                              title="Download"
                            >
                              <i className="bi bi-download"></i>
                            </button>
                            <Link 
                              to={`/materials/${material.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(material.id, material.title)}
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

export default StudyMaterialList;
