import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import teacherApiService from '../../services/teacherApiService';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    teacherName: '',
    subject: '',
    department: '',
    status: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [teachers, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTeachers = filteredTeachers.slice(startIndex, endIndex);

  const applyFilters = () => {
    let filtered = teachers;

    if (filters.teacherName) {
      filtered = filtered.filter(teacher => {
        const fullName = `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim();
        return fullName.toLowerCase().includes(filters.teacherName.toLowerCase());
      });
    }

    if (filters.subject) {
      filtered = filtered.filter(teacher =>
        teacher.subject?.toLowerCase().includes(filters.subject.toLowerCase())
      );
    }

    if (filters.department) {
      filtered = filtered.filter(teacher =>
        teacher.department?.toLowerCase().includes(filters.department.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(teacher =>
        teacher.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    setFilteredTeachers(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      teacherName: '',
      subject: '',
      department: '',
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

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const data = await teacherApiService.getTeachers();
      setTeachers(data);
      setFilteredTeachers(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch teachers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, teacherName) => {
    if (window.confirm(`Are you sure you want to delete teacher "${teacherName}"?`)) {
      try {
        await teacherApiService.deleteTeacher(id);
        setTeachers(teachers.filter(teacher => teacher.id !== id));
        setFilteredTeachers(filteredTeachers.filter(teacher => teacher.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete teacher');
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { bg: 'success', icon: 'check-circle' },
      'Inactive': { bg: 'danger', icon: 'x-circle' },
      'On Leave': { bg: 'warning', icon: 'clock' },
      'Suspended': { bg: 'secondary', icon: 'dash-circle' }
    };
    
    const config = statusConfig[status] || { bg: 'secondary', icon: 'question-circle' };
    
    return (
      <span className={`badge bg-${config.bg}`}>
        <i className={`bi bi-${config.icon} me-1`}></i>
        {status}
      </span>
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
        <h2>Teacher Management</h2>
        <Link to="/teachers/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Teacher
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
              <label className="form-label small">Teacher Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search teacher..."
                value={filters.teacherName}
                onChange={(e) => handleFilterChange('teacherName', e.target.value)}
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
              <label className="form-label small">Department</label>
              <select
                className="form-select form-select-sm"
                value={filters.department}
                onChange={(e) => handleFilterChange('department', e.target.value)}
              >
                <option value="">All Departments</option>
                <option value="Science">Science</option>
                <option value="Languages">Languages</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Social Studies">Social Studies</option>
                <option value="Arts">Arts</option>
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
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
                <option value="Suspended">Suspended</option>
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
          <h5 className="mb-0">All Teachers</h5>
          <span className="badge bg-secondary">
            Showing {paginatedTeachers.length} of {filteredTeachers.length} teachers
          </span>
        </div>
        <div className="card-body">
          {filteredTeachers.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-mortarboard display-4 text-muted"></i>
              <p className="text-muted mt-3">No teachers found</p>
              <Link to="/teachers/create" className="btn btn-outline-primary">
                Add First Teacher
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Teacher Name</th>
                      <th>Subject</th>
                      <th>Department</th>
                      <th>Experience</th>
                      <th>Classes Assigned</th>
                      <th>Students</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTeachers.map((teacher) => (
                      <tr key={teacher.id}>
                        <td>
                          <Link to={`/teachers/${teacher.id}`} className="text-decoration-none">
                            <strong>{teacher.firstName} {teacher.lastName}</strong>
                            <div className="small text-muted">
                              {teacher.email || 'N/A'}
                            </div>
                          </Link>
                        </td>
                        <td>
                          <span className="badge bg-primary">{teacher.subject || 'Not Assigned'}</span>
                        </td>
                        <td>{teacher.department || 'Not Assigned'}</td>
                        <td>
                          <span className="badge bg-info">{teacher.yearsOfExperience || 'N/A'} years</span>
                        </td>
                        <td>
                          <div className="small">
                            <div className="text-muted">Not available</div>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-success">N/A</span>
                        </td>
                        <td>{getStatusBadge(teacher.status)}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/employees/${teacher.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/employees/${teacher.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(teacher.id, `${teacher.firstName} ${teacher.lastName}`)}
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

export default TeacherList;
