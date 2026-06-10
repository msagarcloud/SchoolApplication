import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentService } from '../../services/studentService';
import { classService } from '../../services/classService';
import { sectionService } from '../../services/sectionService';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);

  // Filter states
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
    rollNumber: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchStudents();
    fetchDropdownData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [students, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  // Helper function to get display name from dropdown data
  const getDisplayName = (id, dataArray, fallback = 'N/A') => {
    if (!id || !dataArray || dataArray.length === 0) {
      return id || fallback;
    }
    const item = dataArray.find(item => item.id === id);
    return item ? item.name : id || fallback;
  };

  const applyFilters = () => {
    let filtered = students;

    if (filters.firstName) {
      filtered = filtered.filter(student =>
        student.firstName?.toLowerCase().includes(filters.firstName.toLowerCase())
      );
    }

    if (filters.lastName) {
      filtered = filtered.filter(student =>
        student.lastName?.toLowerCase().includes(filters.lastName.toLowerCase())
      );
    }

    if (filters.email) {
      filtered = filtered.filter(student =>
        student.email?.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    if (filters.rollNumber) {
      filtered = filtered.filter(student =>
        student.rollNumber?.toString().toLowerCase().includes(filters.rollNumber.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      firstName: '',
      lastName: '',
      email: '',
      rollNumber: ''
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

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentService.getAll();
      setStudents(data);
      setFilteredStudents(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const [classesData, sectionsData] = await Promise.all([
        classService.getAll(),
        sectionService.getAll()
      ]);
      setClasses(classesData);
      setSections(sectionsData);
    } catch (err) {
      console.error('Failed to fetch dropdown data:', err);
    }
  };

  const handleDelete = async (id, studentName) => {
    if (window.confirm(`Are you sure you want to delete "${studentName}"?`)) {
      try {
        await studentService.delete(id);
        setStudents(students.filter(student => student.id !== id));
        setFilteredStudents(filteredStudents.filter(student => student.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete student');
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
        <h2>Student Management</h2>
        <Link to="/students/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Student
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
              <label className="form-label small">First Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search first name..."
                value={filters.firstName}
                onChange={(e) => handleFilterChange('firstName', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Last Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search last name..."
                value={filters.lastName}
                onChange={(e) => handleFilterChange('lastName', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Email</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search email..."
                value={filters.email}
                onChange={(e) => handleFilterChange('email', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Roll Number</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search roll number..."
                value={filters.rollNumber}
                onChange={(e) => handleFilterChange('rollNumber', e.target.value)}
              />
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
          <h5 className="mb-0">All Students</h5>
          <span className="badge bg-secondary">
            Showing {paginatedStudents.length} of {filteredStudents.length} students
          </span>
        </div>
        <div className="card-body">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-people display-4 text-muted"></i>
              <p className="text-muted mt-3">No students found</p>
              <Link to="/students/create" className="btn btn-outline-primary">
                Create First Student
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Roll Number</th>
                      <th>Registration Number</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Class</th>
                      <th>Section</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedStudents.map((student) => (
                      <tr key={student.id}>
                        <td>
                          <Link to={`/students/${student.id}`} className="text-decoration-none">
                            {`${student.firstName || ''} ${student.lastName || ''}`.trim() || 'N/A'}
                          </Link>
                        </td>
                        <td>{student.rollNumber || 'N/A'}</td>
                        <td>{student.registrationNumber || 'N/A'}</td>
                        <td>{student.email || 'N/A'}</td>
                        <td>{student.contactNumber || 'N/A'}</td>
                        <td>{getDisplayName(student.classId, classes)}</td>
                        <td>{getDisplayName(student.sectionId, sections)}</td>
                        <td>
                          <span className={`badge bg-${student.isActive ? 'success' : 'danger'}`}>
                            {student.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/students/${student.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/students/${student.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(student.id, `${student.firstName} ${student.lastName}`)}
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

export default StudentList;
