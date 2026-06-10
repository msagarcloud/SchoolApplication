import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { teacherSectionDetailService } from '../../services/teacherSectionDetailService';
import { authService } from '../../services/authService';
import { teacherService } from '../../services/teacherService';
import { classService } from '../../services/classService';
import { sectionService } from '../../services/sectionService';
import subjectService from '../../services/subjectService';
import { classSectionService } from '../../services/classSectionService';
import { classSubjectService } from '../../services/classSubjectService';

const TeacherSectionDetailList = () => {
  const [teacherSectionDetails, setTeacherSectionDetails] = useState([]);
  const [filteredTeacherSectionDetails, setFilteredTeacherSectionDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Dropdown options for filters
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [dropdownLoading, setDropdownLoading] = useState(false);
  
  // Resolved names for display
  const [resolvedNames, setResolvedNames] = useState({});

  // Filter states
  const [filters, setFilters] = useState({
    teacherId: '',
    classId: '',
    sectionId: '',
    subjectId: '',
    isClassTeacher: '',
    isActive: ''
  });


  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch dropdown data based on companyId and schoolId
  const fetchDropdownData = useCallback(async (selectedClassId = '') => {
    const normalizeId = (value) => String(value || '').toLowerCase();
    const sameId = (a, b) => normalizeId(a) === normalizeId(b);
    const pickFirst = (obj, keys) => {
      for (const key of keys) {
        if (obj && obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
          return obj[key];
        }
      }
      return '';
    };
    const toArray = (value) => {
      if (Array.isArray(value)) return value;
      if (Array.isArray(value?.data)) return value.data;
      if (Array.isArray(value?.items)) return value.items;
      if (Array.isArray(value?.$values)) return value.$values;
      return [];
    };

    try {
      setDropdownLoading(true);
      
      // Get current user for filtering
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser || !currentUser.companyId || !currentUser.schoolId) {
        console.error('Company ID or School ID not found in current user session');
        return;
      }

      const { companyId, schoolId } = currentUser;
      // Use the passed selectedClassId first, then fall back to filters.classId
      const classId = selectedClassId || filters.classId;
      console.log('Fetching dropdown data for:', { companyId, schoolId, classId, selectedClassId, filtersClassId: filters.classId });

      // Fetch all data without filtering first
      const [allTeachersRaw, allClassesRaw, allSectionsRaw, allSubjectsRaw, classSectionRaw, classSubjectRaw] = await Promise.all([
        teacherService.getAll(),
        classService.getAll(),
        sectionService.getAll(),
        subjectService.getAll(),
        classSectionService.getAll(),
        classSubjectService.getAll()
      ]);
      
      // Debug: Log raw API responses
      console.log('=== API RESPONSE DEBUG ===');
      console.log('Raw sections response:', allSectionsRaw);
      console.log('Raw class-section mappings response:', classSectionRaw);
      console.log('==========================');
      const allTeachers = toArray(allTeachersRaw);
      const allClasses = toArray(allClassesRaw);
      const allSections = toArray(allSectionsRaw);
      const allSubjects = toArray(allSubjectsRaw);
      const classSectionMappings = toArray(classSectionRaw);
      const classSubjectMappings = toArray(classSubjectRaw);

      // Filter teachers by company and school
      const filteredTeachers = allTeachers.filter(teacher => 
        sameId(pickFirst(teacher, ['companyId', 'CompanyId']), companyId) &&
        sameId(pickFirst(teacher, ['schoolId', 'SchoolId']), schoolId) &&
        pickFirst(teacher, ['isActive', 'IsActive']) &&
        !pickFirst(teacher, ['isDeleted', 'IsDeleted'])
      );

      // Filter classes by company and school
      const filteredClasses = allClasses.filter(cls => 
        sameId(pickFirst(cls, ['companyId', 'CompanyId']), companyId) &&
        sameId(pickFirst(cls, ['schoolId', 'SchoolId']), schoolId)
      );

      // Filter sections by company and school
      let filteredSections = allSections.filter(section => 
        sameId(pickFirst(section, ['companyId', 'CompanyId']), companyId) &&
        sameId(pickFirst(section, ['schoolId', 'SchoolId']), schoolId) &&
        pickFirst(section, ['isActive', 'IsActive']) &&
        !pickFirst(section, ['isDeleted', 'IsDeleted'])
      );

      console.log('=== SECTION FILTERING DEBUG ===');
      console.log('Total sections before filtering:', allSections.length);
      console.log('Sections after company/school filtering:', filteredSections.length);
      console.log('Current user IDs:', { companyId, schoolId });
      console.log('Sample section structure:', allSections[0]);
      if (allSections.length > 0) {
        console.log('Sample section IDs and names:', 
          allSections.slice(0, 3).map(s => ({ 
            id: pickFirst(s, ['id', 'Id']), 
            name: pickFirst(s, ['name', 'Name', 'sectionName', 'SectionName']),
            companyId: pickFirst(s, ['companyId', 'CompanyId']),
            schoolId: pickFirst(s, ['schoolId', 'SchoolId']),
            isActive: pickFirst(s, ['isActive', 'IsActive']),
            isDeleted: pickFirst(s, ['isDeleted', 'IsDeleted'])
          }))
        );
      }
      console.log('============================');

      // If a class is selected, derive sections through class-section mappings
      if (classId) {
        console.log('=== CLASS-SECTION MAPPING DEBUG ===');
        console.log('Selected classId:', classId);
        console.log('Total class-section mappings:', classSectionMappings.length);
        console.log('Sample class-section mapping structure:', classSectionMappings[0]);
        
        // First filter class-section mappings by company and school
        const filteredClassSectionMappings = classSectionMappings.filter(mapping =>
          sameId(pickFirst(mapping, ['companyId', 'CompanyId']), companyId) &&
          sameId(pickFirst(mapping, ['schoolId', 'SchoolId']), schoolId) &&
          pickFirst(mapping, ['isActive', 'IsActive']) &&
          !pickFirst(mapping, ['isDeleted', 'IsDeleted'])
        );
        
        console.log('Class-section mappings after filtering:', filteredClassSectionMappings.length);
        
        const sectionIdsForClass = new Set(
          filteredClassSectionMappings
            .filter(mapping => {
              const mappingClassId = pickFirst(mapping, ['classMasterId', 'classId', 'ClassMasterId', 'ClassId']);
              const matches = sameId(mappingClassId, classId);
              if (matches) {
                console.log('Found matching mapping:', { 
                  mappingClassId, 
                  selectedClassId: classId,
                  mapping 
                });
              }
              return matches;
            })
            .map(mapping => pickFirst(mapping, ['sectionMasterId', 'sectionId', 'SectionMasterId', 'SectionId']))
            .filter(Boolean)
            .map(normalizeId)
        );

        console.log('Section IDs found for class:', Array.from(sectionIdsForClass));
        console.log('==============================');

        if (sectionIdsForClass.size > 0) {
          filteredSections = filteredSections.filter(section =>
            sectionIdsForClass.has(normalizeId(pickFirst(section, ['id', 'Id'])))
          );
        }
      }

      // Filter subjects by company and school
      let filteredSubjects = allSubjects.filter(subject => 
        sameId(pickFirst(subject, ['companyId', 'CompanyId']), companyId) &&
        sameId(pickFirst(subject, ['schoolId', 'SchoolId']), schoolId)
      );

      // If a class is selected, derive subjects through class-subject mappings
      if (classId) {
        const subjectIdsForClass = new Set(
          classSubjectMappings
            .filter(mapping => sameId(
              pickFirst(mapping, ['classMasterId', 'classId', 'ClassMasterId', 'ClassId']),
              classId
            ))
            .map(mapping => pickFirst(mapping, ['subjectId', 'SubjectId', 'subjectMasterId', 'SubjectMasterId']))
            .filter(Boolean)
            .map(normalizeId)
        );

        if (subjectIdsForClass.size > 0) {
          filteredSubjects = filteredSubjects.filter(subject =>
            subjectIdsForClass.has(normalizeId(pickFirst(subject, ['id', 'Id'])))
          );
        }
      }

      setTeachers(filteredTeachers);
      setClasses(filteredClasses);
      setSections(filteredSections);
      setSubjects(filteredSubjects);
      
      console.log('=== FINAL DROPDOWN DATA ===');
      console.log('Sections being set in state:', filteredSections.length);
      console.log('Final sections data:', filteredSections.slice(0, 5));
      console.log('========================');
      
      // Debug: Log when sections are being updated
      console.log('DEBUG: Sections state update triggered with', filteredSections.length, 'sections');
    } catch (err) {
      console.error('Failed to fetch dropdown data:', err);
      setError('Failed to load dropdown options');
    } finally {
      setDropdownLoading(false);
    }
  }, [filters.classId]);

  // Resolve names for all teacher section details
  const resolveAllNames = useCallback(async (details) => {
    const normalizeId = (value) => String(value || '').toLowerCase();
    const sameId = (a, b) => normalizeId(a) === normalizeId(b);
    const pickFirst = (obj, keys) => {
      for (const key of keys) {
        if (obj && obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
          return obj[key];
        }
      }
      return '';
    };
    const toArray = (value) => {
      if (Array.isArray(value)) return value;
      if (Array.isArray(value?.data)) return value.data;
      if (Array.isArray(value?.items)) return value.items;
      if (Array.isArray(value?.$values)) return value.$values;
      return [];
    };

    try {
      // Get current user for filtering
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser || !currentUser.companyId || !currentUser.schoolId) {
        console.error('Company ID or School ID not found in current user session');
        return;
      }

      const { companyId, schoolId } = currentUser;

      // Fetch all reference data once
      const [allTeachersRaw, allClassesRaw, allSectionsRaw, allSubjectsRaw] = await Promise.all([
        teacherService.getAll(),
        classService.getAll(),
        sectionService.getAll(),
        subjectService.getAll()
      ]);
      
      const allTeachers = toArray(allTeachersRaw);
      const allClasses = toArray(allClassesRaw);
      const allSections = toArray(allSectionsRaw);
      const allSubjects = toArray(allSubjectsRaw);

      // Filter data by company and school
      const filteredTeachers = allTeachers.filter(teacher => 
        sameId(pickFirst(teacher, ['companyId', 'CompanyId']), companyId) &&
        sameId(pickFirst(teacher, ['schoolId', 'SchoolId']), schoolId) &&
        pickFirst(teacher, ['isActive', 'IsActive']) &&
        !pickFirst(teacher, ['isDeleted', 'IsDeleted'])
      );

      const filteredClasses = allClasses.filter(cls => 
        sameId(pickFirst(cls, ['companyId', 'CompanyId']), companyId) &&
        sameId(pickFirst(cls, ['schoolId', 'SchoolId']), schoolId)
      );

      const filteredSections = allSections.filter(section => 
        sameId(pickFirst(section, ['companyId', 'CompanyId']), companyId) &&
        sameId(pickFirst(section, ['schoolId', 'SchoolId']), schoolId) &&
        pickFirst(section, ['isActive', 'IsActive']) &&
        !pickFirst(section, ['isDeleted', 'IsDeleted'])
      );

      console.log('All sections structure:', allSections);
      console.log('Filtered sections structure:', filteredSections);
      console.log('Sample section structure:', filteredSections[0]);
      console.log('Section fields available:', filteredSections[0] ? Object.keys(filteredSections[0]) : 'No sections');
      
      // Check if sections have company and school fields
      if (allSections.length > 0) {
        const sampleSection = allSections[0];
        console.log('Sample section company/school fields:', {
          hasCompanyId: 'companyId' in sampleSection,
          hasSchoolId: 'schoolId' in sampleSection,
          companyId: sampleSection.companyId,
          schoolId: sampleSection.schoolId
        });
        
        // Check if there are multiple schools in the data
        const uniqueSchoolIds = [...new Set(allSections.map(s => s.schoolId))];
        console.log('Unique school IDs in sections:', uniqueSchoolIds);
        console.log('Current user school ID:', schoolId);
      }
      
      // Check if we have any sections after filtering
      if (filteredSections.length === 0) {
        console.warn('No sections found after filtering by company and school');
        console.warn('Company ID:', companyId, 'School ID:', schoolId);
        console.warn('Raw sections sample:', allSections.slice(0, 3));
        
        // Use all sections without company/school filtering as fallback
        filteredSections = allSections.filter(section => 
          pickFirst(section, ['isActive', 'IsActive']) &&
          !pickFirst(section, ['isDeleted', 'IsDeleted'])
        );
        console.warn('Using fallback sections without company/school filter:', filteredSections.length);
      }

      const filteredSubjects = allSubjects.filter(subject => 
        sameId(pickFirst(subject, ['companyId', 'CompanyId']), companyId) &&
        sameId(pickFirst(subject, ['schoolId', 'SchoolId']), schoolId)
      );

      // Create lookup maps with flexible ID matching
      const normalizeId = (id) => String(id || '').toLowerCase();
      const teacherMap = new Map();
      const classMap = new Map();
      const sectionMap = new Map();
      const subjectMap = new Map();
      
      // Populate maps with normalized IDs for flexible matching
      filteredTeachers.forEach(teacher => {
        teacherMap.set(normalizeId(teacher.id), teacher);
      });
      filteredClasses.forEach(cls => {
        classMap.set(normalizeId(cls.id), cls);
      });
      filteredSections.forEach(section => {
        sectionMap.set(normalizeId(section.id), section);
      });
      filteredSubjects.forEach(subject => {
        subjectMap.set(normalizeId(subject.id), subject);
      });

      // Resolve names for each detail
      const namesMap = {};
      console.log('Resolving names for details:', details.length);
      console.log('Available sections in map:', filteredSections.map(s => ({ id: s.id, name: s.name, Name: s.Name, sectionName: s.sectionName, SectionName: s.SectionName })));
      
      details.forEach(detail => {
        const normalizedTeacherId = normalizeId(detail.teacherId);
        const normalizedClassId = normalizeId(detail.classId);
        const normalizedSectionId = normalizeId(detail.sectionId);
        const normalizedSubjectId = normalizeId(detail.subjectId);
        
        console.log('Resolving for detail:', {
          detailId: detail.id,
          sectionId: detail.sectionId,
          normalizedSectionId,
          availableSectionIds: Array.from(sectionMap.keys())
        });
        
        const teacher = teacherMap.get(normalizedTeacherId);
        const cls = classMap.get(normalizedClassId);
        let section = sectionMap.get(normalizedSectionId);
        const subject = subjectMap.get(normalizedSubjectId);

        // Fallback: if section not found in filtered map, try to find it in all sections
        if (!section && detail.sectionId) {
          section = allSections.find(s => normalizeId(pickFirst(s, ['id', 'Id'])) === normalizedSectionId);
          if (section) {
            console.log('Section found in all sections fallback:', section);
          }
        }

        console.log('Section found:', section ? {
          id: section.id,
          name: section.name,
          Name: section.Name,
          sectionName: section.sectionName,
          SectionName: section.SectionName
        } : 'NOT FOUND');

        namesMap[detail.id] = {
          teacherName: teacher ? `${pickFirst(teacher, ['firstName', 'FirstName'])} ${pickFirst(teacher, ['lastName', 'LastName']) || ''} ${pickFirst(teacher, ['email', 'Email']) ? `(${pickFirst(teacher, ['email', 'Email'])})` : ''}`.trim() : 'Unknown Teacher',
          className: cls ? pickFirst(cls, ['name', 'Name', 'className', 'ClassName']) : 'Unknown Class',
          sectionName: section ? pickFirst(section, ['name', 'Name', 'sectionName', 'SectionName', 'section', 'Section']) : 'Unknown Section',
          subjectName: subject ? pickFirst(subject, ['subjectName', 'SubjectName', 'name', 'Name']) : 'Unknown Subject'
        };
      });

      setResolvedNames(namesMap);
    } catch (err) {
      console.error('Failed to resolve names:', err);
    }
  }, []);

  const fetchTeacherSectionDetails = async () => {
    try {
      setLoading(true);
      const data = await teacherSectionDetailService.getAll();
      
      console.log('Fetched teacher section details:', data);
      console.log('Sample detail structure:', data[0]);
      
      // Use all data without filtering for now
      setTeacherSectionDetails(data);
      setFilteredTeacherSectionDetails(data);
      
      // Resolve names for the data
      await resolveAllNames(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch teacher section details');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = teacherSectionDetails;

    if (filters.teacherId) {
      filtered = filtered.filter(detail => detail.teacherId === filters.teacherId);
    }

    if (filters.classId) {
      filtered = filtered.filter(detail => detail.classId === filters.classId);
    }

    if (filters.sectionId) {
      filtered = filtered.filter(detail => detail.sectionId === filters.sectionId);
    }

    if (filters.subjectId) {
      filtered = filtered.filter(detail => detail.subjectId === filters.subjectId);
    }

    if (filters.isClassTeacher !== '') {
      const isClassTeacher = filters.isClassTeacher === 'true';
      filtered = filtered.filter(detail => detail.isClassTeacher === isClassTeacher);
    }

    if (filters.isActive !== '') {
      const isActive = filters.isActive === 'true';
      filtered = filtered.filter(detail => detail.isActive === isActive);
    }

    setFilteredTeacherSectionDetails(filtered);
  }, [teacherSectionDetails, filters]);

  useEffect(() => {
    fetchTeacherSectionDetails();
    fetchDropdownData();
  }, []);

  // Update dropdown data when class filter changes
  useEffect(() => {
    if (filters.classId) {
      console.log('DEBUG: Class filter changed to:', filters.classId);
      console.log('DEBUG: Calling fetchDropdownData with classId');
      fetchDropdownData(filters.classId);
    } else {
      console.log('DEBUG: Class filter cleared, calling fetchDropdownData without classId');
      fetchDropdownData();
    }
  }, [filters.classId]);

  // Debug: Track sections and subjects state changes
  useEffect(() => {
    console.log('Sections state updated:', {
      count: sections.length,
      data: sections.slice(0, 3)
    });
  }, [sections]);

  useEffect(() => {
    console.log('Subjects state updated:', {
      count: subjects.length,
      data: subjects.slice(0, 3)
    });
  }, [subjects]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredTeacherSectionDetails.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTeacherSectionDetails = filteredTeacherSectionDetails.slice(startIndex, endIndex);

  const handleFilterChange = (field, value) => {
    // If class filter changed, clear section and subject filters
    if (field === 'classId') {
      setFilters(prev => ({
        ...prev,
        classId: value,
        sectionId: '', // Clear section filter when class changes
        subjectId: ''  // Clear subject filter when class changes
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const clearFilters = () => {
    setFilters({
      teacherId: '',
      classId: '',
      sectionId: '',
      subjectId: '',
      isClassTeacher: '',
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher section detail?')) {
      try {
        await teacherSectionDetailService.delete(id);
        setTeacherSectionDetails(teacherSectionDetails.filter(detail => detail.id !== id));
        setFilteredTeacherSectionDetails(filteredTeacherSectionDetails.filter(detail => detail.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete teacher section detail');
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
        <h2>Teacher Section Details Management</h2>
        <Link to="/teacher-section-details/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Teacher Section Detail
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
              <label className="form-label small">Teacher</label>
              <select
                className="form-select form-select-sm"
                value={filters.teacherId}
                onChange={(e) => handleFilterChange('teacherId', e.target.value)}
                disabled={dropdownLoading}
              >
                <option value="">All Teachers</option>
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.firstName} {teacher.lastName || ''} {teacher.email ? `(${teacher.email})` : ''}
                  </option>
                ))}
              </select>
              {dropdownLoading && (
                <small className="text-muted">Loading teachers...</small>
              )}
            </div>
            <div className="col">
              <label className="form-label small">Class</label>
              <select
                className="form-select form-select-sm"
                value={filters.classId}
                onChange={(e) => handleFilterChange('classId', e.target.value)}
                disabled={dropdownLoading}
              >
                <option value="">All Classes</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
              {dropdownLoading && (
                <small className="text-muted">Loading classes...</small>
              )}
            </div>
            <div className="col">
              <label className="form-label small">Section</label>
              {/* Debug: Show sections state */}
              {/* {process.env.NODE_ENV === 'development' && (
                <small className="text-muted d-block">
                  Debug: {sections.length} sections available
                </small>
              )} */}
              <select
                className="form-select form-select-sm"
                value={filters.sectionId}
                onChange={(e) => handleFilterChange('sectionId', e.target.value)}
                disabled={dropdownLoading || !filters.classId}
              >
                <option value="">
                  {filters.classId ? 'All Sections' : 'Select a class first'}
                </option>
                {sections.map(section => (
                  <option key={section.id} value={section.id}>
                    {section.Name || section.name || section.sectionName || `Section ${section.id}`}
                  </option>
                ))}
              </select>
              {dropdownLoading && (
                <small className="text-muted">Loading sections...</small>
              )}
            </div>
            <div className="col">
              <label className="form-label small">Subject</label>
              {/* Debug: Show subjects state */}
              {/* {process.env.NODE_ENV === 'development' && (
                <small className="text-muted d-block">
                  Debug: {subjects.length} subjects available
                </small>
              )} */}
              <select
                className="form-select form-select-sm"
                value={filters.subjectId}
                onChange={(e) => handleFilterChange('subjectId', e.target.value)}
                disabled={dropdownLoading || !filters.classId}
              >
                <option value="">
                  {filters.classId ? 'All Subjects' : 'Select a class first'}
                </option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.subjectName || subject.name || `Subject ${subject.id}`}
                  </option>
                ))}
              </select>
              {dropdownLoading && (
                <small className="text-muted">Loading subjects...</small>
              )}
            </div>
            <div className="col">
              <label className="form-label small">Class Teacher</label>
              <select
                className="form-select form-select-sm"
                value={filters.isClassTeacher}
                onChange={(e) => handleFilterChange('isClassTeacher', e.target.value)}
              >
                <option value="">All</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
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
          <h5 className="mb-0">All Teacher Section Details</h5>
          <span className="badge bg-secondary">
            Showing {paginatedTeacherSectionDetails.length} of {filteredTeacherSectionDetails.length} details
          </span>
        </div>
        <div className="card-body">
          {filteredTeacherSectionDetails.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-person-workspace display-4 text-muted"></i>
              <p className="text-muted mt-3">No teacher section details found</p>
              <Link to="/teacher-section-details/create" className="btn btn-outline-primary">
                Create First Teacher Section Detail
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Teacher</th>
                      <th>Class</th>
                      <th>Section</th>
                      <th>Subject</th>
                      <th>Class Teacher</th>
                      <th>Status</th>
                      <th>Created Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTeacherSectionDetails.map((detail) => (
                      <tr key={detail.id}>
                        <td>
                          <Link to={`/teacher-section-details/${detail.id}`} className="text-decoration-none">
                            {resolvedNames[detail.id]?.teacherName || 'N/A'}
                          </Link>
                        </td>
                        <td>{resolvedNames[detail.id]?.className || 'Unknown Class'}</td>
                        <td>{resolvedNames[detail.id]?.sectionName || 'Unknown Section'}</td>
                        <td>{resolvedNames[detail.id]?.subjectName || 'Unknown Subject'}</td>
                        <td>
                          <span className={`badge ${detail.isClassTeacher ? 'bg-success' : 'bg-secondary'}`}>
                            {detail.isClassTeacher ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${detail.isActive ? 'bg-success' : 'bg-danger'}`}>
                            {detail.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          {new Date(detail.createdDate).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/teacher-section-details/${detail.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/teacher-section-details/${detail.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(detail.id)}
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

export default TeacherSectionDetailList;
