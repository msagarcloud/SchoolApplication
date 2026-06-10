import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { classSubjectService } from '../../services/classSubjectService';
import { classService } from '../../services/classService';
import subjectService from '../../services/subjectService';
import { authService } from '../../services/authService';

const ClassSubjectList = () => {
  const [classSubjects, setClassSubjects] = useState([]);
  const [filteredClassSubjects, setFilteredClassSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sessionData, setSessionData] = useState({ companyId: '', schoolId: '' });

  // Filter states
  const [filters, setFilters] = useState({
    classId: '',
    subjectId: '',
    isActive: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchClassSubjects();
    initializeSessionData();
  }, []);

  // Memoized filter function to prevent unnecessary re-renders
  const applyFilters = useMemo(() => {
    return () => {
      let filtered = classSubjects;

      if (filters.classId) {
        filtered = filtered.filter(classSubject => classSubject.classMasterId === filters.classId);
      }

      if (filters.subjectId) {
        filtered = filtered.filter(classSubject => classSubject.subjectId === filters.subjectId);
      }

      if (filters.isActive !== '') {
        const isActive = filters.isActive === 'true';
        filtered = filtered.filter(classSubject => classSubject.isActive === isActive);
      }

      return filtered;
    };
  }, [classSubjects, filters]);

  // Update filtered data when filters or data change
  useEffect(() => {
    setFilteredClassSubjects(applyFilters());
  }, [applyFilters]);

  const fetchClassesBySchool = useCallback(async () => {
    try {
      if (!sessionData.schoolId) {
        return;
      }

      const classesData = await classService.getBySchoolId(sessionData.schoolId);
      setClasses(classesData || []);
    } catch (err) {
      console.error('Error in fetchClassesBySchool:', err);
      setError(err.message || 'Failed to fetch classes by school');
    }
  }, [sessionData.schoolId]);

  const filterClassesBySession = useCallback(() => {
    if (!sessionData.companyId && !sessionData.schoolId) {
      setFilteredClasses(classes);
      return;
    }

    let filtered = classes;

    if (sessionData.companyId) {
      filtered = filtered.filter(cls => cls.companyId === sessionData.companyId);
    }

    if (sessionData.schoolId) {
      filtered = filtered.filter(cls => cls.schoolId === sessionData.schoolId);
    }

    setFilteredClasses(filtered);
  }, [classes, sessionData]);


  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    if (classes.length > 0) {
      filterClassesBySession();
    }
  }, [filterClassesBySession, classes.length]);

  useEffect(() => {
    if (sessionData.schoolId) {
      fetchClassesBySchool();
    }
  }, [fetchClassesBySchool, sessionData.schoolId]);

  // Clear subject filter when class filter changes
  useEffect(() => {
    if (filters.classId) {
      setFilters(prev => ({
        ...prev,
        subjectId: ''
      }));
    }
  }, [filters.classId]);


  // Pagination calculations
  const totalPages = Math.ceil(filteredClassSubjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedClassSubjects = filteredClassSubjects.slice(startIndex, endIndex);

  // Show all subjects without filtering
  const filteredSubjects = useMemo(() => {
    return subjects;
  }, [subjects]);

  const fetchClassSubjects = async () => {
    try {
      setLoading(true);
      const currentUser = authService.getCurrentUser();
      const schoolId = currentUser?.schoolId;
      
      // Fetch classes by schoolId if available, otherwise get all classes
      const classesPromise = schoolId ? classService.getBySchoolId(schoolId) : classService.getAll();
      
      // Fetch classes first, then other data
      const classesData = await classesPromise;
      setClasses(classesData || []);
      
      const [classSubjectsData, subjectsData] = await Promise.all([
        classSubjectService.getAll(schoolId).catch(err => {
          console.error('Error fetching class subjects:', err);
          return [];
        }),
        subjectService.getAll().catch(err => {
          console.error('Error fetching subjects:', err);
          return [];
        })
      ]);
      setClassSubjects(classSubjectsData);
      setFilteredClassSubjects(classSubjectsData);
      setSubjects(subjectsData || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch class subjects');
    } finally {
      setLoading(false);
    }
  };

  const initializeSessionData = () => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      const sessionData = {
        companyId: currentUser.companyId || '',
        schoolId: currentUser.schoolId || ''
      };
      setSessionData(sessionData);
    }
  };

  const handleApplyFilters = () => {
    applyFilters();
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      classId: '',
      subjectId: '',
      isActive: ''
    });
    setFilteredClassSubjects(classSubjects);
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

  // Memoized class lookup to prevent repeated searches
  const getClassName = useCallback((classId) => {
    if (!classes || classes.length === 0) {
      return 'Loading...';
    }
    
    const classItem = classes.find(cls => cls.id === classId);
    return classItem ? (classItem.name || classItem.Name || 'Unknown') : 'Unknown';
  }, [classes]);

  // Memoized subject lookup to prevent repeated searches
  const getSubjectName = useCallback((subjectId) => {
    if (!subjects || subjects.length === 0) {
      return 'Loading...';
    }
    const subject = subjects.find(sub => sub.id === subjectId);
    return subject ? (subject.subjectName || subject.SubjectName || 'Unknown') : 'Unknown';
  }, [subjects]);

  // Memoized periods per week lookup to prevent repeated searches
  const getPeriodsPerWeek = useCallback((subjectId) => {
    if (!subjects || subjects.length === 0) {
      return 'N/A';
    }
    const subject = subjects.find(sub => sub.id === subjectId);
    return subject && subject.periodsPerWeek !== null && subject.periodsPerWeek !== undefined ? subject.periodsPerWeek : 'N/A';
  }, [subjects]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this class subject?')) {
      try {
        await classSubjectService.delete(id, sessionData.schoolId);
        setClassSubjects(classSubjects.filter(cs => cs.id !== id));
        setFilteredClassSubjects(filteredClassSubjects.filter(cs => cs.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete class subject');
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
        <h2>Class Subject Management</h2>
        <Link to="/classsubjects/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Class Subject
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
              <label className="form-label small">Class</label>
              <select
                className="form-select form-select-sm"
                value={filters.classId}
                onChange={(e) => handleFilterChange('classId', e.target.value)}
              >
                <option value="">All Classes</option>
                {filteredClasses.map(cls => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name || cls.Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <label className="form-label small">Subject</label>
              <select
                className="form-select form-select-sm"
                value={filters.subjectId}
                onChange={(e) => handleFilterChange('subjectId', e.target.value)}
              >
                <option value="">All Subjects</option>
                {filteredSubjects.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.subjectName || subject.SubjectName}
                  </option>
                ))}
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
                className="btn btn-primary btn-sm me-2"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </button>
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
          <h5 className="mb-0">All Class Subjects</h5>
          <span className="badge bg-secondary">
            Showing {paginatedClassSubjects.length} of {filteredClassSubjects.length} class subjects
          </span>
        </div>
        <div className="card-body">
          {filteredClassSubjects.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-book display-4 text-muted"></i>
              <p className="text-muted mt-3">No class subjects found</p>
              <Link to="/classsubjects/create" className="btn btn-outline-primary">
                Create First Class Subject
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Subject</th>
                      <th>Periods/Week</th>
                      <th>Status</th>
                      <th>Created Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedClassSubjects.map((classSubject) => (
                      <tr key={classSubject.id}>
                        <td>
                          <span className="fw-medium">{getClassName(classSubject.classMasterId)}</span>
                        </td>
                        <td>
                          <span className="fw-medium">{getSubjectName(classSubject.subjectId)}</span>
                        </td>
                        <td>
                          <span className="fw-medium">{getPeriodsPerWeek(classSubject.subjectId)}</span>
                        </td>
                        <td>
                          <span className={`badge ${classSubject.isActive ? 'bg-success' : 'bg-danger'}`}>
                            {classSubject.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          {new Date(classSubject.createdDate).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/classsubjects/${classSubject.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/classsubjects/${classSubject.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(classSubject.id)}
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

export default ClassSubjectList;
