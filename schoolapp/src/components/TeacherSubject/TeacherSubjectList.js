import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import teacherSubjectApiService from '../../services/teacherSubjectApiService';
import { teacherService } from '../../services/teacherService';
import subjectService from '../../services/subjectService';
import { classService } from '../../services/classService';
import { authService } from '../../services/authService';
import { useSessionData } from '../../hooks/useSessionData';

const TeacherSubjectList = () => {
  const { sessionData } = useSessionData();
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Reference data for names
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [schools, setSchools] = useState([]);

  // Filter states
  const [filters, setFilters] = useState({
    teacherName: '',
    subjectName: '',
    className: '',
    status: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchAssignments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [assignments, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAssignments = filteredAssignments.slice(startIndex, endIndex);

  const applyFilters = () => {
    let filtered = assignments;

    if (filters.teacherName) {
      filtered = filtered.filter(assignment =>
        getTeacherName(assignment.teacherId).toLowerCase().includes(filters.teacherName.toLowerCase())
      );
    }

    if (filters.subjectName) {
      filtered = filtered.filter(assignment =>
        getSubjectName(assignment.subjectId).toLowerCase().includes(filters.subjectName.toLowerCase())
      );
    }

    if (filters.className) {
      filtered = filtered.filter(assignment =>
        getClassName(assignment.classId).toLowerCase().includes(filters.className.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(assignment =>
        assignment.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    setFilteredAssignments(filtered);
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
      subjectName: '',
      className: '',
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

  // Helper functions to get names by IDs
  const getTeacherName = (teacherId) => {
    const teacher = teachers.find(t => t.id === teacherId);
    if (teacher) {
      const name = `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim();
      return name || 'Unknown Teacher';
    }
    return 'Unknown Teacher';
  };

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.subjectName || subject?.SubjectName || 'Unknown Subject';
  };

  const getClassName = (classId) => {
    const cls = classes.find(c => c.id === classId);
    return cls?.name || 'Unknown Class';
  };

  const getSchoolName = (schoolId) => {
    const school = schools.find(s => s.id === schoolId);
    return school?.name || school?.schoolName || authService.getSchoolName() || 'Unknown School';
  };

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const [assignmentsData, teachersData, subjectsData, classesData] = await Promise.all([
        teacherSubjectApiService.getTeacherSubjects(),
        teacherService.getAll(),
        subjectService.getAll(),
        classService.getAll()
      ]);
      
      setAssignments(assignmentsData);
      setFilteredAssignments(assignmentsData);
      setTeachers(teachersData || []);
      setSubjects(subjectsData || []);
      setClasses(classesData || []);
      
      // Get school data from session data
      if (sessionData?.schoolId) {
        setSchools([{ 
          id: sessionData.schoolId, 
          name: authService.getSchoolName() || 'Current School' 
        }]);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch teacher-subject assignments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, description) => {
    if (window.confirm(`Are you sure you want to delete this assignment "${description}"?`)) {
      try {
        await teacherSubjectApiService.deleteTeacherSubject(id);
        setAssignments(assignments.filter(assignment => assignment.id !== id));
        setFilteredAssignments(filteredAssignments.filter(assignment => assignment.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete assignment');
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { bg: 'success', icon: 'check-circle' },
      'Inactive': { bg: 'danger', icon: 'x-circle' },
      'Pending': { bg: 'warning', icon: 'clock' },
      'Completed': { bg: 'info', icon: 'check2-circle' }
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
        <h2>Teacher-Subject Assignment Management</h2>
        <Link to="/teacher-subjects/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Assignment
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
                value={filters.subjectName}
                onChange={(e) => handleFilterChange('subjectName', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Class</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search class..."
                value={filters.className}
                onChange={(e) => handleFilterChange('className', e.target.value)}
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
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
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
              <i className="bi bi-book display-4 text-muted"></i>
              <p className="text-muted mt-3">No teacher-subject assignments found</p>
              <Link to="/teacher-subjects/create" className="btn btn-outline-primary">
                Add First Assignment
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Teacher</th>
                      <th>Subject</th>
                      <th>Class</th>
                      <th>School</th>
                      <th>Status</th>
                      <th>Created Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAssignments.map((assignment) => (
                      <tr key={assignment.id}>
                        <td>
                          <Link to={`/teacher-subjects/${assignment.id}`} className="text-decoration-none">
                            <strong>{getTeacherName(assignment.teacherId)}</strong>
                          </Link>
                        </td>
                        <td>
                          <span className="badge bg-primary">{getSubjectName(assignment.subjectId)}</span>
                        </td>
                        <td>
                          <span className="badge bg-info">{getClassName(assignment.classId)}</span>
                        </td>
                        <td>
                          {getSchoolName(assignment.schoolId)}
                        </td>
                        <td>{getStatusBadge(assignment.status)}</td>
                        <td>
                          <div className="small">
                            {new Date(assignment.createdDate).toLocaleDateString()}
                            <div className="text-muted">
                              {new Date(assignment.createdDate).toLocaleTimeString()}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/teacher-subjects/${assignment.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/teacher-subjects/${assignment.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(assignment.id, `${getTeacherName(assignment.teacherId)} - ${getSubjectName(assignment.subjectId)}`)}
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

export default TeacherSubjectList;
