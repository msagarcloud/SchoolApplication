import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { studentAttendanceService } from '../../services/studentAttendanceService';
import { studentService } from '../../services/studentService';
import { classService } from '../../services/classService';
import { sectionService } from '../../services/sectionService';

const StudentAttendanceList = () => {
  const [attendances, setAttendances] = useState([]);
  const [filteredAttendances, setFilteredAttendances] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    studentGuid: '',
    classId: '',
    sectionId: '',
    month: '',
    year: '',
    attendanceStatus: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Create lookup maps using useMemo
  const studentMap = useMemo(() => {
    return students.reduce((map, student) => {
      map[student.id] = student.firstName + ' ' + (student.lastName || '');
      return map;
    }, {});
  }, [students]);

  const classMap = useMemo(() => {
    return classes.reduce((map, cls) => {
      map[cls.id] = cls.className;
      return map;
    }, {});
  }, [classes]);

  const sectionMap = useMemo(() => {
    return sections.reduce((map, section) => {
      map[section.id] = section.sectionName;
      return map;
    }, {});
  }, [sections]);

  useEffect(() => {
    fetchReferenceData().then(() => {
      fetchAttendances();
    });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [attendances, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAttendances.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAttendances = filteredAttendances.slice(startIndex, endIndex);

  const applyFilters = () => {
    let filtered = attendances;

    if (filters.studentGuid) {
      filtered = filtered.filter(attendance =>
        attendance.studentGuid === filters.studentGuid
      );
    }

    if (filters.classId) {
      filtered = filtered.filter(attendance =>
        attendance.classId === filters.classId
      );
    }

    if (filters.sectionId) {
      filtered = filtered.filter(attendance =>
        attendance.sectionId === filters.sectionId
      );
    }

    if (filters.month) {
      filtered = filtered.filter(attendance =>
        attendance.month === parseInt(filters.month)
      );
    }

    if (filters.year) {
      filtered = filtered.filter(attendance =>
        attendance.year === parseInt(filters.year)
      );
    }

    if (filters.attendanceStatus !== '') {
      filtered = filtered.filter(attendance =>
        attendance.attendenceStatus === (filters.attendanceStatus === 'true')
      );
    }

    setFilteredAttendances(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      studentGuid: '',
      classId: '',
      sectionId: '',
      month: '',
      year: '',
      attendanceStatus: ''
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

  const fetchReferenceData = async () => {
    try {
      const [studentsData, classesData, sectionsData] = await Promise.all([
        studentService.getAll(),
        classService.getAll(),
        sectionService.getAll()
      ]);
      setStudents(studentsData);
      setClasses(classesData);
      setSections(sectionsData);
      return Promise.resolve();
    } catch (err) {
      console.error('Failed to fetch reference data:', err);
      return Promise.reject(err);
    }
  };

  const fetchAttendances = async () => {
    try {
      setLoading(true);
      const data = await studentAttendanceService.getAll();
      setAttendances(data);
      setFilteredAttendances(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch student attendances');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      try {
        await studentAttendanceService.delete(id);
        setAttendances(attendances.filter(attendance => attendance.id !== id));
        setFilteredAttendances(filteredAttendances.filter(attendance => attendance.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete attendance');
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
        <h2>Student Attendance Management</h2>
        <Link to="/attendence/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Attendance
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
              <label className="form-label small">Student</label>
              <select
                className="form-select form-select-sm"
                value={filters.studentGuid}
                onChange={(e) => handleFilterChange('studentGuid', e.target.value)}
              >
                <option value="">All Students</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.firstName} {student.lastName || ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <label className="form-label small">Class</label>
              <select
                className="form-select form-select-sm"
                value={filters.classId}
                onChange={(e) => handleFilterChange('classId', e.target.value)}
              >
                <option value="">All Classes</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>
                    {cls.className}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <label className="form-label small">Section</label>
              <select
                className="form-select form-select-sm"
                value={filters.sectionId}
                onChange={(e) => handleFilterChange('sectionId', e.target.value)}
              >
                <option value="">All Sections</option>
                {sections.map(section => (
                  <option key={section.id} value={section.id}>
                    {section.sectionName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <label className="form-label small">Month</label>
              <select
                className="form-select form-select-sm"
                value={filters.month}
                onChange={(e) => handleFilterChange('month', e.target.value)}
              >
                <option value="">All Months</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                  <option key={month} value={month}>
                    {new Date(2024, month - 1).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <label className="form-label small">Year</label>
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Year..."
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                min="2020"
                max="2030"
              />
            </div>
            <div className="col">
              <label className="form-label small">Status</label>
              <select
                className="form-select form-select-sm"
                value={filters.attendanceStatus}
                onChange={(e) => handleFilterChange('attendanceStatus', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="true">Present</option>
                <option value="false">Absent</option>
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
          <h5 className="mb-0">All Attendance Records</h5>
          <span className="badge bg-secondary">
            Showing {paginatedAttendances.length} of {filteredAttendances.length} records
          </span>
        </div>
        <div className="card-body">
          {filteredAttendances.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-calendar-check display-4 text-muted"></i>
              <p className="text-muted mt-3">No attendance records found</p>
              <Link to="/attendence/create" className="btn btn-outline-primary">
                Create First Attendance Record
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
                      <th>Section</th>
                      <th>Date</th>
                      <th>Month</th>
                      <th>Year</th>
                      <th>Status</th>
                      <th>Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAttendances.map((attendance) => (
                      <tr key={attendance.id}>
                        <td>
                          <Link to={`/attendence/${attendance.id}`} className="text-decoration-none">
                            {studentMap[attendance.studentGuid] || 'Unknown'}
                          </Link>
                        </td>
                        <td>{classMap[attendance.classId] || 'N/A'}</td>
                        <td>{sectionMap[attendance.sectionId] || 'N/A'}</td>
                        <td>{new Date(attendance.attendenceDate).toLocaleDateString()}</td>
                        <td>{attendance.month || 'N/A'}</td>
                        <td>{attendance.year || 'N/A'}</td>
                        <td>
                          <span className={`badge ${attendance.attendenceStatus ? 'bg-success' : 'bg-danger'}`}>
                            {attendance.attendenceStatus ? 'Present' : 'Absent'}
                          </span>
                        </td>
                        <td>{attendance.attendenceTime || 'N/A'}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/attendence/${attendance.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/attendence/${attendance.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(attendance.id)}
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

export default StudentAttendanceList;
