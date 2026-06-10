import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { classSectionService } from '../../services/classSectionService';
import { classService } from '../../services/classService';
import { sectionService } from '../../services/sectionService';
import { classRoomService } from '../../services/classRoomService';
import { authService } from '../../services/authService';

const ClassSectionList = () => {
  const [classSections, setClassSections] = useState([]);
  const [filteredClassSections, setFilteredClassSections] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [classRooms, setClassRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    classId: '',
    sectionId: '',
    classRoomId: '',
    isActive: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchMasterData();
    fetchClassSections();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [classSections, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredClassSections.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedClassSections = filteredClassSections.slice(startIndex, endIndex);

  const fetchMasterData = async () => {
    try {
      // Get current user for filtering
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser || !currentUser.companyId || !currentUser.schoolId) {
        console.error('Company ID or School ID not found in current user session');
        setError('User session invalid. Please log in again.');
        return;
      }

      const { companyId, schoolId } = currentUser;
      console.log('Fetching master data for:', { companyId, schoolId });

      const classesPromise = schoolId
        ? classService.getBySchoolId(schoolId)
        : classService.getAll();

      const [allClasses, allSections, allClassRooms] = await Promise.all([
        classesPromise,
        sectionService.getAll(),
        classRoomService.getAll()
      ]);

      // Filter data by company and school (classes may already be school-scoped)
      const filteredClasses = allClasses.filter(cls =>
        cls.companyId === companyId && cls.schoolId === schoolId
      );
      
      const filteredSections = allSections.filter(section => 
        section.companyId === companyId && section.schoolId === schoolId
      );
      
      const filteredClassRooms = allClassRooms.filter(classRoom => 
        classRoom.companyId === companyId && classRoom.schoolId === schoolId
      );

      console.log('Filtered data:', {
        classes: filteredClasses.length,
        sections: filteredSections.length,
        classRooms: filteredClassRooms.length
      });

      setClasses(filteredClasses);
      setSections(filteredSections);
      setClassRooms(filteredClassRooms);
    } catch (err) {
      console.error('Failed to fetch master data:', err);
      setError('Failed to load master data');
    }
  };

  const fetchClassSections = async () => {
    try {
      setLoading(true);
      
      // Get current user for filtering
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser || !currentUser.companyId || !currentUser.schoolId) {
        console.error('Company ID or School ID not found in current user session');
        setError('User session invalid. Please log in again.');
        return;
      }

      const { companyId, schoolId } = currentUser;
      console.log('Fetching class sections for:', { companyId, schoolId });

      const allClassSections = schoolId
        ? await classSectionService.getBySchoolId(schoolId)
        : await classSectionService.getAll();

      const companyMatches = (id) => String(id) === String(companyId);
      const schoolMatches = (id) => !schoolId || String(id) === String(schoolId);

      const filteredClassSections = allClassSections.filter(
        (classSection) =>
          companyMatches(classSection.companyId) && schoolMatches(classSection.schoolId)
      );

      console.log(`Found ${filteredClassSections.length} class sections for user`);
      setClassSections(filteredClassSections);
      setFilteredClassSections(filteredClassSections);
    } catch (err) {
      setError(err.message || 'Failed to fetch class sections');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = classSections;

    if (filters.classId) {
      filtered = filtered.filter(classSection => classSection.classMasterId === filters.classId);
    }

    if (filters.sectionId) {
      filtered = filtered.filter(classSection => classSection.sectionMasterId === filters.sectionId);
    }

    if (filters.classRoomId) {
      filtered = filtered.filter(classSection => classSection.locationId === filters.classRoomId);
    }

    if (filters.isActive !== '') {
      const isActive = filters.isActive === 'true';
      filtered = filtered.filter(classSection => classSection.isActive === isActive);
    }

    setFilteredClassSections(filtered);
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
      sectionId: '',
      classRoomId: '',
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

  const getClassNameById = (classMasterId) => {
    const classObj = classes.find(c => c.id === classMasterId);
    return classObj ? classObj.name : `Class ID: ${classMasterId}`;
  };

  const getSectionNameById = (sectionMasterId) => {
    const sectionObj = sections.find(s => s.id === sectionMasterId);
    return sectionObj ? sectionObj.name : `Section ID: ${sectionMasterId}`;
  };

  const getLocationNameById = (locationId) => {
    console.log('Looking for classroom ID:', locationId);
    console.log('Available classrooms:', classRooms);
    const classRoomObj = classRooms.find(c => c.id === locationId);
    console.log('Found classroom object:', classRoomObj);
    return classRoomObj ? classRoomObj.name : `ClassRoom ID: ${locationId}`;
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this class section?')) {
      try {
        await classSectionService.delete(id);
        setClassSections(classSections.filter(cs => cs.id !== id));
        setFilteredClassSections(filteredClassSections.filter(cs => cs.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete class section');
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
        <h2>Class Section Management</h2>
        <Link to="/classsections/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Class Section
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
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
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
                    {section.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <label className="form-label small">ClassRoom</label>
              <select
                className="form-select form-select-sm"
                value={filters.classRoomId}
                onChange={(e) => handleFilterChange('classRoomId', e.target.value)}
              >
                <option value="">All ClassRooms</option>
                {classRooms.map(classRoom => (
                  <option key={classRoom.id} value={classRoom.id}>
                    {classRoom.name}
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
          <h5 className="mb-0">All Class Sections</h5>
          <span className="badge bg-secondary">
            Showing {paginatedClassSections.length} of {filteredClassSections.length} class sections
          </span>
        </div>
        <div className="card-body">
          {filteredClassSections.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-link display-4 text-muted"></i>
              <p className="text-muted mt-3">No class sections found</p>
              <Link to="/classsections/create" className="btn btn-outline-primary">
                Create First Class Section
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Section</th>
                      <th>ClassRoom</th>
                      <th>Status</th>
                      <th>Created Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedClassSections.map((classSection) => (
                      <tr key={classSection.id}>
                        <td>
                          <span className="fw-medium">{getClassNameById(classSection.classMasterId)}</span>
                        </td>
                        <td>
                          <span className="fw-medium">{getSectionNameById(classSection.sectionMasterId)}</span>
                        </td>
                        <td>
                          <span className="fw-medium">{getLocationNameById(classSection.locationId)}</span>
                        </td>
                        <td>
                          <span className={`badge ${classSection.isActive ? 'bg-success' : 'bg-danger'}`}>
                            {classSection.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          {new Date(classSection.createdDate).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/classsections/${classSection.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/classsections/${classSection.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(classSection.id)}
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

export default ClassSectionList;
