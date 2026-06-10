import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { teacherSectionDetailService } from '../../services/teacherSectionDetailService';
import { authService } from '../../services/authService';
import { teacherService } from '../../services/teacherService';
import { classService } from '../../services/classService';
import { sectionService } from '../../services/sectionService';
import subjectService from '../../services/subjectService';
import { classSectionService } from '../../services/classSectionService';
import { classSubjectService } from '../../services/classSubjectService';

const TeacherSectionDetailForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    teacherId: '',
    classId: '',
    sectionId: '',
    subjectId: '',
    isClassTeacher: false,
    schoolId: '',
    companyId: ''
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');

  // Dropdown options
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [allSections, setAllSections] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [classSectionMappings, setClassSectionMappings] = useState([]);
  const [classSubjectMappings, setClassSubjectMappings] = useState([]);
  const [dropdownLoading, setDropdownLoading] = useState(false);

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

  const fetchTeacherSectionDetail = useCallback(async () => {
    try {
      setFetchLoading(true);
      const detail = await teacherSectionDetailService.getById(id);
      setFormData({
        teacherId: pickFirst(detail, ['teacherId', 'TeacherId']) || '',
        classId: pickFirst(detail, ['classId', 'ClassId']) || '',
        sectionId: pickFirst(detail, ['sectionId', 'SectionId']) || '',
        subjectId: pickFirst(detail, ['subjectId', 'SubjectId']) || '',
        isClassTeacher: Boolean(pickFirst(detail, ['isClassTeacher', 'IsClassTeacher'])),
        schoolId: pickFirst(detail, ['schoolId', 'SchoolId']) || '',
        companyId: pickFirst(detail, ['companyId', 'CompanyId']) || ''
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch teacher section detail');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  // Fetch dropdown data based on companyId and schoolId
  const fetchDropdownData = useCallback(async () => {
    try {
      setDropdownLoading(true);
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser || !currentUser.companyId || !currentUser.schoolId) {
        console.error('Company ID or School ID not found in current user session');
        return;
      }

      const { companyId, schoolId } = currentUser;
      console.log('Fetching dropdown data for:', { companyId, schoolId });

      // Fetch teachers (teachers from TeacherMaster table)
      console.log('Fetching teachers...');
      const allTeachers = toArray(await teacherService.getAll());
      console.log('All teachers received:', allTeachers);
      
      // Filter teachers by company and school
      const filteredTeachers = allTeachers.filter(teacher => 
        sameId(pickFirst(teacher, ['companyId', 'CompanyId']), companyId) &&
        sameId(pickFirst(teacher, ['schoolId', 'SchoolId']), schoolId) &&
        pickFirst(teacher, ['isActive', 'IsActive']) &&
        !pickFirst(teacher, ['isDeleted', 'IsDeleted'])
      );
      console.log('Filtered teachers:', filteredTeachers);
      setTeachers(filteredTeachers);

      // Fetch classes
      console.log('Fetching classes...');
      const allClasses = toArray(await classService.getAll());
      console.log('All classes received:', allClasses);
      const filteredClasses = allClasses.filter(cls => 
        sameId(pickFirst(cls, ['companyId', 'CompanyId']), companyId) &&
        sameId(pickFirst(cls, ['schoolId', 'SchoolId']), schoolId)
      );
      console.log('Filtered classes:', filteredClasses);

      // Fetch sections
      console.log('Fetching sections...');
      const allSectionsData = toArray(await sectionService.getAll());
      console.log('All sections received:', allSectionsData);
      let filteredSections = allSectionsData.filter(section =>
        sameId(pickFirst(section, ['companyId', 'CompanyId']), companyId) &&
        sameId(pickFirst(section, ['schoolId', 'SchoolId']), schoolId)
      );
      // Fallback for legacy data where schoolId might not align
      if (filteredSections.length === 0) {
        filteredSections = allSectionsData.filter(section =>
          sameId(pickFirst(section, ['companyId', 'CompanyId']), companyId)
        );
      }
      console.log('Filtered sections:', filteredSections);

      // Fetch subjects
      console.log('Fetching subjects...');
      const allSubjectsData = toArray(await subjectService.getAll());
      console.log('All subjects received:', allSubjectsData);
      let filteredSubjects = allSubjectsData.filter(subject =>
        sameId(pickFirst(subject, ['companyId', 'CompanyId']), companyId) &&
        sameId(pickFirst(subject, ['schoolId', 'SchoolId']), schoolId)
      );
      // Fallback for legacy data where schoolId might not align
      if (filteredSubjects.length === 0) {
        filteredSubjects = allSubjectsData.filter(subject =>
          sameId(pickFirst(subject, ['companyId', 'CompanyId']), companyId)
        );
      }
      console.log('Filtered subjects:', filteredSubjects);

      // Fetch class-section and class-subject mappings
      const [classSectionData, classSubjectData] = await Promise.all([
        classSectionService.getAll(),
        classSubjectService.getAll()
      ]);

      setClasses(filteredClasses);
      setAllSections(filteredSections);
      setAllSubjects(filteredSubjects);
      setSections(filteredSections);
      setSubjects(filteredSubjects);
      setClassSectionMappings(toArray(classSectionData));
      setClassSubjectMappings(toArray(classSubjectData));
    } catch (err) {
      console.error('Failed to fetch dropdown data:', err);
      setError('Failed to load dropdown options');
    } finally {
      setDropdownLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isEditing) {
      fetchTeacherSectionDetail();
    }
    // Initialize CompanyId and SchoolId from current user session
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        companyId: currentUser.companyId || '',
        schoolId: currentUser.schoolId || ''
      }));
      // Fetch dropdown data after setting company and school IDs
      fetchDropdownData();
    }
  }, [id, isEditing, fetchTeacherSectionDetail, fetchDropdownData]);

  useEffect(() => {
    if (!formData.classId) {
      setSections([]);
      setSubjects([]);
      return;
    }

    const classId = formData.classId;
    const sectionIdsForClass = new Set(
      classSectionMappings
        .filter(mapping => sameId(
          pickFirst(mapping, ['classMasterId', 'classId', 'ClassMasterId', 'ClassId']),
          classId
        ))
        .map(mapping => pickFirst(mapping, ['sectionMasterId', 'sectionId', 'SectionMasterId', 'SectionId']))
        .filter(Boolean)
        .map(normalizeId)
    );
    const hasSectionMappingsForClass = sectionIdsForClass.size > 0;

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
    const hasSubjectMappingsForClass = subjectIdsForClass.size > 0;

    const filteredSections = allSections.filter(section => {
      const sectionId = pickFirst(section, ['id', 'Id']);
      const sectionClassId = pickFirst(section, ['classId', 'classMasterId', 'ClassId', 'ClassMasterId']);

      // Preferred: class-section mapping
      if (hasSectionMappingsForClass) {
        return sectionIdsForClass.has(normalizeId(sectionId));
      }

      // Fallback: direct class link on section master
      if (sectionClassId) {
        return sameId(sectionClassId, classId);
      }

      // Final fallback: if we don't have class-section mappings, keep section visible
      return true;
    });

    const filteredSubjects = allSubjects.filter(subject => {
      const subjectId = pickFirst(subject, ['id', 'Id']);
      const subjectClassId = pickFirst(subject, ['classId', 'classMasterId', 'ClassId', 'ClassMasterId']);

      // Preferred: class-subject mapping
      if (hasSubjectMappingsForClass) {
        return subjectIdsForClass.has(normalizeId(subjectId));
      }

      // Fallback: direct class link on subject
      if (subjectClassId) {
        return sameId(subjectClassId, classId);
      }

      // Final fallback: if we don't have class-subject mappings, keep subject visible
      return true;
    });

    setSections(filteredSections);
    setSubjects(filteredSubjects);
  }, [formData.classId, allSections, allSubjects, classSectionMappings, classSubjectMappings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'classId') {
      setFormData(prev => ({
        ...prev,
        classId: value,
        sectionId: '',
        subjectId: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.teacherId || formData.teacherId === '') {
        setError('Teacher is required');
        setLoading(false);
        return;
      }

      if (!formData.classId || formData.classId === '') {
        setError('Class is required');
        setLoading(false);
        return;
      }

      if (!formData.sectionId || formData.sectionId === '') {
        setError('Section is required');
        setLoading(false);
        return;
      }

      if (!formData.subjectId || formData.subjectId === '') {
        setError('Subject is required');
        setLoading(false);
        return;
      }

      const teacherSectionDetailData = {
        teacherId: formData.teacherId,
        classId: formData.classId,
        sectionId: formData.sectionId,
        subjectId: formData.subjectId,
        isClassTeacher: formData.isClassTeacher,
        companyId: formData.companyId,
        schoolId: formData.schoolId
      };

      console.log('Form data before submission:', formData);
      console.log('Submitting TeacherSectionDetail:', teacherSectionDetailData);
      console.log('Is editing:', isEditing);
      console.log('ID for update:', id);

      if (isEditing) {
        console.log('Calling update service with ID:', id, 'and data:', teacherSectionDetailData);
        const result = await teacherSectionDetailService.update(id, teacherSectionDetailData);
        console.log('Update result:', result);
      } else {
        console.log('Calling create service with data:', teacherSectionDetailData);
        const result = await teacherSectionDetailService.create(teacherSectionDetailData);
        console.log('Create result:', result);
      }

      navigate('/teacher-section-details');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} teacher section detail`);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
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
      <div className="row mb-3">
        <div className="col-12">
          <div className="card bg-light">
            <div className="card-body py-2">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h6 className="mb-0 text-primary">
                    <i className="bi bi-building me-2"></i>
                    <strong>{authService.getSchoolName() || 'School Name'}</strong>
                  </h6>
                </div>
                <div className="col-md-6 text-md-end">
                  <h6 className="mb-0 text-secondary">
                    <i className="bi bi-briefcase me-2"></i>
                    {authService.getCompanyName() || 'Company Name'}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isEditing ? 'Edit Teacher Section Detail' : 'Create New Teacher Section Detail'}</h2>
        <Link to="/teacher-section-details" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Teacher Section Details
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            {isEditing ? 'Teacher Section Detail Information' : 'New Teacher Section Detail Details'}
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="teacherId" className="form-label">
                    Teacher <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    id="teacherId"
                    name="teacherId"
                    value={formData.teacherId}
                    onChange={handleChange}
                    required
                    disabled={dropdownLoading}
                  >
                    <option value="">Select Teacher</option>
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
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="classId" className="form-label">
                    Class <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    id="classId"
                    name="classId"
                    value={formData.classId}
                    onChange={handleChange}
                    required
                    disabled={dropdownLoading}
                  >
                    <option value="">Select Class</option>
                    {classes.map(cls => {
                      const classId = pickFirst(cls, ['id', 'Id']);
                      const className = pickFirst(cls, ['name', 'Name']);
                      return (
                      <option key={classId} value={classId}>
                        {className} {cls.section ? `(${cls.section})` : ''}
                      </option>
                    )})}
                  </select>
                  {dropdownLoading && (
                    <small className="text-muted">Loading classes...</small>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="sectionId" className="form-label">
                    Section <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    id="sectionId"
                    name="sectionId"
                    value={formData.sectionId}
                    onChange={handleChange}
                    required
                    disabled={dropdownLoading || !formData.classId}
                  >
                    <option value="">
                      {formData.classId ? 'Select Section' : 'Select Class First'}
                    </option>
                    {sections.map(section => {
                      const sectionId = pickFirst(section, ['id', 'Id']);
                      const sectionName = pickFirst(section, ['name', 'Name', 'sectionName', 'SectionName']);
                      return (
                      <option key={sectionId} value={sectionId}>
                        {sectionName}
                      </option>
                    )})}
                  </select>
                  {dropdownLoading && (
                    <small className="text-muted">Loading sections...</small>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="subjectId" className="form-label">
                    Subject <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    id="subjectId"
                    name="subjectId"
                    value={formData.subjectId}
                    onChange={handleChange}
                    required
                    disabled={dropdownLoading || !formData.classId}
                  >
                    <option value="">
                      {formData.classId ? 'Select Subject' : 'Select Class First'}
                    </option>
                    {subjects.map(subject => {
                      const subjectId = pickFirst(subject, ['id', 'Id']);
                      const subjectName = pickFirst(subject, ['subjectName', 'SubjectName', 'name', 'Name']);
                      return (
                      <option key={subjectId} value={subjectId}>
                        {subjectName} {subject.code ? `(${subject.code})` : ''}
                      </option>
                    )})}
                  </select>
                  {dropdownLoading && (
                    <small className="text-muted">Loading subjects...</small>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isClassTeacher"
                      name="isClassTeacher"
                      checked={formData.isClassTeacher}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="isClassTeacher">
                      Is Class Teacher
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Link to="/teacher-section-details" className="btn btn-outline-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    {isEditing ? 'Update Teacher Section Detail' : 'Create Teacher Section Detail'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherSectionDetailForm;
