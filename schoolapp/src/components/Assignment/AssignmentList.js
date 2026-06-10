import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import assignmentService from '../../services/assignmentService';

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    title: '',
    class: '',
    subject: '',
    status: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const applyFilters = useCallback(() => {
    let filtered = assignments;

    if (filters.title) {
      filtered = filtered.filter(assignment =>
        assignment.title?.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.class) {
      filtered = filtered.filter(assignment =>
        assignment.className?.toLowerCase().includes(filters.class.toLowerCase())
      );
    }

    if (filters.subject) {
      filtered = filtered.filter(assignment =>
        assignment.subject?.toLowerCase().includes(filters.subject.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(assignment =>
        assignment.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    setFilteredAssignments(filtered);
  }, [assignments, filters]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAssignments = filteredAssignments.slice(startIndex, endIndex);

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

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const data = await assignmentService.getAssignments();
      setAssignments(data);
      setFilteredAssignments(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch assignments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete assignment "${title}"?`)) {
      try {
        await assignmentService.deleteAssignment(id);
        setAssignments(assignments.filter(assignment => assignment.id !== id));
        setFilteredAssignments(filteredAssignments.filter(assignment => assignment.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete assignment');
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { bg: 'primary', icon: 'clock' },
      'Completed': { bg: 'success', icon: 'check-circle' },
      'Overdue': { bg: 'danger', icon: 'exclamation-triangle' },
      'Draft': { bg: 'secondary', icon: 'file-earmark' }
    };
    
    const config = statusConfig[status] || { bg: 'secondary', icon: 'question-circle' };
    
    return (
      <span className={`badge bg-${config.bg}`}>
        <i className={`bi bi-${config.icon} me-1`}></i>
        {status}
      </span>
    );
  };

  const getSubmissionProgress = (submitted, total) => {
    const percentage = total > 0 ? Math.round((submitted / total) * 100) : 0;
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <span>{submitted}/{total}</span>
          <span>{percentage}%</span>
        </div>
        <div className="progress" style={{ height: '6px' }}>
          <div 
            className={`progress-bar ${percentage >= 80 ? 'bg-success' : percentage >= 50 ? 'bg-warning' : 'bg-danger'}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
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
        <h2>Assignment Management</h2>
        <Link to="/assignments/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Create Assignment
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
              <label className="form-label small">Assignment Title</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search assignment..."
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
              <label className="form-label small">Status</label>
              <select
                className="form-select form-select-sm"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Overdue">Overdue</option>
                <option value="Draft">Draft</option>
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
          <h5 className="mb-0">All Assignments</h5>
          <span className="badge bg-secondary">
            Showing {paginatedAssignments.length} of {filteredAssignments.length} assignments
          </span>
        </div>
        <div className="card-body">
          {filteredAssignments.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-clipboard-check display-4 text-muted"></i>
              <p className="text-muted mt-3">No assignments found</p>
              <Link to="/assignments/create" className="btn btn-outline-primary">
                Create First Assignment
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Assignment</th>
                      <th>Class</th>
                      <th>Teacher</th>
                      <th>Due Date</th>
                      <th>Submissions</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAssignments.map((assignment) => (
                      <tr key={assignment.id}>
                        <td>
                          <Link to={`/assignments/${assignment.id}`} className="text-decoration-none">
                            <strong>{assignment.title}</strong>
                            <div className="small text-muted">
                              {assignment.subject} | {assignment.assignmentType}
                            </div>
                          </Link>
                        </td>
                        <td>
                          <span className="badge bg-primary">{assignment.className}</span>
                        </td>
                        <td>{assignment.teacherName}</td>
                        <td>
                          <div className="small">
                            <div>Due: {assignment.dueDate}</div>
                            <div className="text-muted">Assigned: {assignment.assignedDate}</div>
                          </div>
                        </td>
                        <td style={{ minWidth: '120px' }}>
                          {getSubmissionProgress(assignment.submittedCount, assignment.totalStudents)}
                        </td>
                        <td>{getStatusBadge(assignment.status)}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/assignments/${assignment.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/assignments/${assignment.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(assignment.id, assignment.title)}
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

export default AssignmentList;
