import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gradeApiService from '../../services/gradeApiService';

const GradeList = () => {
  const [grades, setGrades] = useState([]);
  const [filteredGrades, setFilteredGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    gradeName: '',
    class: '',
    subject: '',
    examType: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchGrades();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [grades, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredGrades.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedGrades = filteredGrades.slice(startIndex, endIndex);

  const applyFilters = () => {
    let filtered = grades;

    if (filters.gradeName) {
      filtered = filtered.filter(grade =>
        grade.gradeName?.toLowerCase().includes(filters.gradeName.toLowerCase())
      );
    }

    if (filters.class) {
      filtered = filtered.filter(grade =>
        grade.className?.toLowerCase().includes(filters.class.toLowerCase())
      );
    }

    if (filters.subject) {
      filtered = filtered.filter(grade =>
        grade.subject?.toLowerCase().includes(filters.subject.toLowerCase())
      );
    }

    if (filters.examType) {
      filtered = filtered.filter(grade =>
        grade.examType?.toLowerCase() === filters.examType.toLowerCase()
      );
    }

    setFilteredGrades(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      gradeName: '',
      class: '',
      subject: '',
      examType: ''
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

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const data = await gradeApiService.getGrades();
      setGrades(data);
      setFilteredGrades(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch grades');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, studentName) => {
    if (window.confirm(`Are you sure you want to delete grade record for "${studentName}"?`)) {
      try {
        await gradeApiService.deleteGrade(id);
        setGrades(grades.filter(grade => grade.id !== id));
        setFilteredGrades(filteredGrades.filter(grade => grade.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete grade');
      }
    }
  };

  const getGradeBadge = (grade) => {
    const gradeColors = {
      'A+': 'success',
      'A': 'success',
      'B+': 'info',
      'B': 'info',
      'C+': 'warning',
      'C': 'warning',
      'D': 'danger',
      'F': 'danger'
    };
    
    const color = gradeColors[grade] || 'secondary';
    
    return (
      <span className={`badge bg-${color}`}>{grade}</span>
    );
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 80) return 'text-info';
    if (percentage >= 70) return 'text-warning';
    return 'text-danger';
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
        <h2>Grade Management</h2>
        <Link to="/grades/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Grade
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
              <label className="form-label small">Student Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search student..."
                value={filters.gradeName}
                onChange={(e) => handleFilterChange('gradeName', e.target.value)}
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
              <label className="form-label small">Exam Type</label>
              <select
                className="form-select form-select-sm"
                value={filters.examType}
                onChange={(e) => handleFilterChange('examType', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Final Exam">Final Exam</option>
                <option value="Mid Term">Mid Term</option>
                <option value="Quiz">Quiz</option>
                <option value="Assignment">Assignment</option>
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
          <h5 className="mb-0">All Grades</h5>
          <span className="badge bg-secondary">
            Showing {paginatedGrades.length} of {filteredGrades.length} grades
          </span>
        </div>
        <div className="card-body">
          {filteredGrades.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-award display-4 text-muted"></i>
              <p className="text-muted mt-3">No grades found</p>
              <Link to="/grades/create" className="btn btn-outline-primary">
                Add First Grade
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Class</th>
                      <th>Subject</th>
                      <th>Exam Type</th>
                      <th>Marks</th>
                      <th>Percentage</th>
                      <th>Grade</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedGrades.map((grade) => (
                      <tr key={grade.id}>
                        <td>
                          <Link to={`/grades/${grade.id}`} className="text-decoration-none">
                            <strong>{grade.studentName}</strong>
                            <div className="small text-muted">ID: {grade.studentId}</div>
                          </Link>
                        </td>
                        <td>{grade.className}</td>
                        <td>{grade.subject}</td>
                        <td>
                          <span className="badge bg-info">{grade.examType}</span>
                        </td>
                        <td>
                          <div>{grade.obtainedMarks}/{grade.maxMarks}</div>
                        </td>
                        <td>
                          <span className={`fw-bold ${getPercentageColor(grade.percentage)}`}>
                            {grade.percentage}%
                          </span>
                        </td>
                        <td>{getGradeBadge(grade.grade)}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/grades/${grade.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/grades/${grade.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(grade.id, grade.studentName)}
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

export default GradeList;
