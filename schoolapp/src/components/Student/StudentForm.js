import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { studentService } from '../../services/studentService';
import { parentService } from '../../services/parentService';
import { categoryService } from '../../services/categoryService';
import { cityService } from '../../services/cityService';
import { stateService } from '../../services/stateService';
import { countryService } from '../../services/countryService';
import { bloodGroupService } from '../../services/bloodGroupService';
import { classService } from '../../services/classService';
import { sectionService } from '../../services/sectionService';
import { religionService } from '../../services/religionService';
import { houseService } from '../../services/houseService';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [student, setStudent] = useState({
    id: '',
    rollNumber: '',
    firstName: '',
    lastName: '',
    address: '',
    cityId: '',
    stateId: '',
    countryId: '',
    zipCode: '',
    contactNumber: '',
    emergencyContactNumber: '',
    dob: '',
    doj: '',
    registrationNumber: '',
    classId: '',
    sectionId: '',
    availTransport: false,
    image: '',
    email: '',
    categoryId: '',
    siblingsIfAny: false,
    siblingClassId: '',
    gender: '',
    disabilityAny: '',
    medicalAlleryAny: '',
    birthCityId: '',
    birthStateId: '',
    birthCountryId: '',
    previousSchoolAttended: '',
    previousSchoolClassId: '',
    previousSchoolPercentage: '',
    previousSchoolRank: '',
    previousSchoolBoardId: '',
    previousSchoolFromDate: '',
    previousSchoolToDate: '',
    withdrawnDate: '',
    withdrawnReason: '',
    bloodGroupId: '',
    nationality: '',
    hobbies: '',
    religionId: '',
    phone: '',
    routeId: '',
    routeStopDetailsId: '',
    classTeacherId: '',
    routePickAndDrop: false,
    feesDiscountCategoryMasterId: '',
    tutionFees: '',
    annualFees: '',
    transportFees: '',
    useTransportFees: false,
    sessionId: '',
    isActive: true,
    isDeleted: false,
    createdBy: '',
    createdDate: '',
    modifiedBy: '',
    modifiedDate: '',
    status: '',
    statusMessage: '',
    houseAllotted: '',
    additionalNotes: ''
  });

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [bloodGroups, setBloodGroups] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [religions, setReligions] = useState([]);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const [activeParentTab, setActiveParentTab] = useState('father');

  // Parent state
  const [father, setFather] = useState({
    parentFirstName: '',
    parentLastName: '',
    parentDob: '',
    qualificationId: '',
    occupation: '',
    annualIncome: '',
    designationId: '',
    phone: '',
    mobile: '',
    email: '',
    address1: '',
    address2: '',
    cityId: '',
    stateId: '',
    countryId: '',
    zipCode: '',
    officeAddress1: '',
    officeAddress2: '',
    officeCityId: '',
    officeStateId: '',
    officeCountryId: '',
    officeZipCode: '',
    officePhone: '',
    image: '',
    relationTypeId: '' // Will be set to 'Father' relation type
  });

  const [mother, setMother] = useState({
    parentFirstName: '',
    parentLastName: '',
    parentDob: '',
    qualificationId: '',
    occupation: '',
    annualIncome: '',
    designationId: '',
    phone: '',
    mobile: '',
    email: '',
    address1: '',
    address2: '',
    cityId: '',
    stateId: '',
    countryId: '',
    zipCode: '',
    officeAddress1: '',
    officeAddress2: '',
    officeCityId: '',
    officeStateId: '',
    officeCountryId: '',
    officeZipCode: '',
    officePhone: '',
    image: '',
    relationTypeId: '' // Will be set to 'Mother' relation type
  });

  const fetchStudent = useCallback(async () => {
    try {
      setLoading(true);
      const data = await studentService.getById(id);
      setStudent(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch student details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDropdownData();
    if (isEdit) {
      fetchStudent();
    }
  }, [id, isEdit, fetchStudent]);

  const fetchDropdownData = async () => {
    try {
      const [
        categoriesData,
        citiesData,
        statesData,
        countriesData,
        bloodGroupsData,
        classesData,
        sectionsData,
        religionsData,
        housesData
      ] = await Promise.all([
        categoryService.getAll(),
        cityService.getAll(),
        stateService.getAll(),
        countryService.getAll(),
        bloodGroupService.getAll(),
        classService.getAll(),
        sectionService.getAll(),
        religionService.getAll(),
        houseService.getAll()
      ]);
      
      setCategories(categoriesData);
      setCities(citiesData);
      setStates(statesData);
      setCountries(countriesData);
      setBloodGroups(bloodGroupsData);
      setClasses(classesData);
      setSections(sectionsData);
      setReligions(religionsData);
      setHouses(housesData);
    } catch (err) {
      console.error('Failed to fetch dropdown data:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFatherInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFather(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMotherInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMother(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      // Prepare student data
      const studentData = {
        ...student,
        id: student.id || crypto.randomUUID(),
        rollNumber: student.rollNumber || crypto.randomUUID(),
        createdDate: new Date().toISOString(),
        // Get schoolId and companyId from session variables (these should come from auth context or session)
        // In a real implementation, these would come from:
        // - const { schoolId } = useAuth(); or similar auth context
        // - const { companyId } = useCompany(); or similar company context  
        // - sessionStorage.getItem('currentSchoolId') or localStorage
        companyId: 'session-company-id', // Replace with actual session value
        schoolId: 'session-school-id', // Replace with actual session value
        createdBy: 'current-user' // This should come from auth context
      };
      
      let createdStudent;
      if (isEdit) {
        createdStudent = await studentService.update(id, studentData);
      } else {
        createdStudent = await studentService.create(studentData);
      }
      
      // Create parents if not in edit mode or if parent data is provided
      if (!isEdit && (father.parentFirstName || mother.parentFirstName)) {
        const parentPromises = [];
        
        // Create father record if data is provided
        if (father.parentFirstName) {
          const fatherData = {
            ...father,
            id: crypto.randomUUID(),
            studentGuid: createdStudent.id,
            relationTypeId: 'father-relation-type-id', // This should come from relation types dropdown
            schoolId: studentData.schoolId,
            companyId: studentData.companyId,
            isActive: true,
            isDeleted: false,
            createdDate: new Date().toISOString(),
            createdBy: 'current-user'
          };
          parentPromises.push(parentService.create(fatherData));
        }
        
        // Create mother record if data is provided
        if (mother.parentFirstName) {
          const motherData = {
            ...mother,
            id: crypto.randomUUID(),
            studentGuid: createdStudent.id,
            relationTypeId: 'mother-relation-type-id', // This should come from relation types dropdown
            schoolId: studentData.schoolId,
            companyId: studentData.companyId,
            isActive: true,
            isDeleted: false,
            createdDate: new Date().toISOString(),
            createdBy: 'current-user'
          };
          parentPromises.push(parentService.create(motherData));
        }
        
        // Create UserDetail entries for student and parents
        const userDetailPromises = [];
        
        // Create UserDetail for student
        if (studentData.email) {
          const studentUserDetail = {
            id: crypto.randomUUID(),
            userName: studentData.email,
            userPassword: 'default-password', // This should be handled properly
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            emailAddress: studentData.email,
            designationId: 'student-designation-id', // This should come from designations
            userRoleId: 'student-role-id', // This should come from user roles
            schoolId: studentData.schoolId,
            companyId: studentData.companyId,
            isActive: true,
            isDeleted: false,
            createdDate: new Date().toISOString(),
            createdBy: 'current-user'
          };
          userDetailPromises.push(createUserDetail(studentUserDetail));
        }
        
        // Create UserDetail for father
        if (father.email && father.parentFirstName) {
          const fatherUserDetail = {
            id: crypto.randomUUID(),
            userName: father.email,
            userPassword: 'default-password', // This should be handled properly
            firstName: father.parentFirstName,
            lastName: father.parentLastName,
            emailAddress: father.email,
            designationId: 'parent-designation-id', // This should come from designations
            userRoleId: 'parent-role-id', // This should come from user roles
            schoolId: studentData.schoolId,
            companyId: studentData.companyId,
            isActive: true,
            isDeleted: false,
            createdDate: new Date().toISOString(),
            createdBy: 'current-user'
          };
          userDetailPromises.push(createUserDetail(fatherUserDetail));
        }
        
        // Create UserDetail for mother
        if (mother.email && mother.parentFirstName) {
          const motherUserDetail = {
            id: crypto.randomUUID(),
            userName: mother.email,
            userPassword: 'default-password', // This should be handled properly
            firstName: mother.parentFirstName,
            lastName: mother.parentLastName,
            emailAddress: mother.email,
            designationId: 'parent-designation-id', // This should come from designations
            userRoleId: 'parent-role-id', // This should come from user roles
            schoolId: studentData.schoolId,
            companyId: studentData.companyId,
            isActive: true,
            isDeleted: false,
            createdDate: new Date().toISOString(),
            createdBy: 'current-user'
          };
          userDetailPromises.push(createUserDetail(motherUserDetail));
        }
        
        // Execute all parent and user detail creation promises
        await Promise.all([...parentPromises, ...userDetailPromises]);
      }
      
      navigate('/students');
    } catch (err) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} student`);
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to create UserDetail (this would need to be implemented in API)
  const createUserDetail = async (userDetailData) => {
    try {
      // This would call a userDetail service
      console.log('Creating UserDetail:', userDetailData);
      // For now, just return success
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create user detail');
    }
  };

  if (loading && isEdit) {
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
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{isEdit ? 'Edit Student' : 'Create New Student'}</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/students">Students</Link>
              </li>
              <li className="breadcrumb-item active">
                {isEdit ? 'Edit' : 'Create'}
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/students" className="btn btn-outline-secondary me-2">
            <i className="bi bi-x-lg me-2"></i>
            Cancel
          </Link>
          <button 
            type="submit" 
            form="student-form"
            className="btn btn-primary"
            disabled={loading}
          >
            <i className="bi bi-check-lg me-2"></i>
            {loading ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Form Tabs */}
      <div className="card">
        <form id="student-form" onSubmit={handleSubmit}>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
            id="student-form-tabs"
          >
            <Tab eventKey="personal" title="Personal Info">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">First Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={student.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={student.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="dob" className="form-label">Date of Birth *</label>
                      <input
                        type="date"
                        className="form-control"
                        id="dob"
                        name="dob"
                        value={student.dob}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="gender" className="form-label">Gender</label>
                      <select
                        className="form-select"
                        id="gender"
                        name="gender"
                        value={student.gender}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="bloodGroupId" className="form-label">Blood Group</label>
                      <select
                        className="form-select"
                        id="bloodGroupId"
                        name="bloodGroupId"
                        value={student.bloodGroupId}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map(bloodGroup => (
                          <option key={bloodGroup.id} value={bloodGroup.id}>
                            {bloodGroup.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="nationality" className="form-label">Nationality</label>
                      <select
                        className="form-select"
                        id="nationality"
                        name="nationality"
                        value={student.nationality}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Nationality</option>
                        {countries.map(country => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="categoryId" className="form-label">Category</label>
                      <select
                        className="form-select"
                        id="categoryId"
                        name="categoryId"
                        value={student.categoryId}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="religionId" className="form-label">Religion</label>
                      <select
                        className="form-select"
                        id="religionId"
                        name="religionId"
                        value={student.religionId}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Religion</option>
                        {religions.map(religion => (
                          <option key={religion.id} value={religion.id}>
                            {religion.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="houseAllotted" className="form-label">House Allotted</label>
                      <select
                        className="form-select"
                        id="houseAllotted"
                        name="houseAllotted"
                        value={student.houseAllotted}
                        onChange={handleInputChange}
                      >
                        <option value="">Select House</option>
                        {houses.map(house => (
                          <option key={house.id} value={house.id}>
                            {house.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="disabilityAny" className="form-label">Disability (if any)</label>
                      <input
                        type="text"
                        className="form-control"
                        id="disabilityAny"
                        name="disabilityAny"
                        value={student.disabilityAny}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="medicalAlleryAny" className="form-label">Medical Allergies (if any)</label>
                      <input
                        type="text"
                        className="form-control"
                        id="medicalAlleryAny"
                        name="medicalAlleryAny"
                        value={student.medicalAlleryAny}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="siblingsIfAny"
                          name="siblingsIfAny"
                          checked={student.siblingsIfAny}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="siblingsIfAny">
                          Has siblings in the school
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="siblingClassId" className="form-label">Sibling Class</label>
                      <select
                        className="form-select"
                        id="siblingClassId"
                        name="siblingClassId"
                        value={student.siblingClassId}
                        onChange={handleInputChange}
                        disabled={!student.siblingsIfAny}
                      >
                        <option value="">Select Class</option>
                        {classes.map(cls => (
                          <option key={cls.id} value={cls.id}>
                            {cls.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="isActive"
                          name="isActive"
                          checked={student.isActive}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="isActive">
                          Active
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Student Image</label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Tab>

            <Tab eventKey="academic" title="Academic Info">
              <div className="card-body">
                <h6 className="mb-3">Current Academic Information</h6>
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="rollNumber" className="form-label">Roll Number *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="rollNumber"
                        name="rollNumber"
                        value={student.rollNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="registrationNumber" className="form-label">Registration Number *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="registrationNumber"
                        name="registrationNumber"
                        value={student.registrationNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="classId" className="form-label">Class *</label>
                      <select
                        className="form-select"
                        id="classId"
                        name="classId"
                        value={student.classId}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Class</option>
                        {classes.map(cls => (
                          <option key={cls.id} value={cls.id}>
                            {cls.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="sectionId" className="form-label">Section *</label>
                      <select
                        className="form-select"
                        id="sectionId"
                        name="sectionId"
                        value={student.sectionId}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Section</option>
                        {sections.map(section => (
                          <option key={section.id} value={section.id}>
                            {section.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="sessionId" className="form-label">Session</label>
                      <input
                        type="text"
                        className="form-control"
                        id="sessionId"
                        name="sessionId"
                        value={student.sessionId}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="classTeacherId" className="form-label">Class Teacher</label>
                      <input
                        type="text"
                        className="form-control"
                        id="classTeacherId"
                        name="classTeacherId"
                        value={student.classTeacherId}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="doj" className="form-label">Date of Joining *</label>
                      <input
                        type="date"
                        className="form-control"
                        id="doj"
                        name="doj"
                        value={student.doj}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="hobbies" className="form-label">Hobbies</label>
                      <input
                        type="text"
                        className="form-control"
                        id="hobbies"
                        name="hobbies"
                        value={student.hobbies}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <hr className="my-4" />
                <h6 className="mb-3">Previous School Details</h6>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="previousSchoolAttended" className="form-label">Previous School</label>
                      <input
                        type="text"
                        className="form-control"
                        id="previousSchoolAttended"
                        name="previousSchoolAttended"
                        value={student.previousSchoolAttended}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="previousSchoolClassId" className="form-label">Previous Class</label>
                      <input
                        type="text"
                        className="form-control"
                        id="previousSchoolClassId"
                        name="previousSchoolClassId"
                        value={student.previousSchoolClassId}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="previousSchoolPercentage" className="form-label">Percentage</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        id="previousSchoolPercentage"
                        name="previousSchoolPercentage"
                        value={student.previousSchoolPercentage}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="previousSchoolRank" className="form-label">Rank</label>
                      <input
                        type="text"
                        className="form-control"
                        id="previousSchoolRank"
                        name="previousSchoolRank"
                        value={student.previousSchoolRank}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="previousSchoolBoardId" className="form-label">Board</label>
                      <input
                        type="text"
                        className="form-control"
                        id="previousSchoolBoardId"
                        name="previousSchoolBoardId"
                        value={student.previousSchoolBoardId}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="previousSchoolFromDate" className="form-label">From Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="previousSchoolFromDate"
                        name="previousSchoolFromDate"
                        value={student.previousSchoolFromDate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="previousSchoolToDate" className="form-label">To Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="previousSchoolToDate"
                        name="previousSchoolToDate"
                        value={student.previousSchoolToDate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Tab>

            <Tab eventKey="contact" title="Contact Info">
              <div className="card-body">
                <h6 className="mb-3">Current Address</h6>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">Address</label>
                      <textarea
                        className="form-control"
                        id="address"
                        name="address"
                        rows="2"
                        value={student.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="cityId" className="form-label">City</label>
                      <select
                        className="form-select"
                        id="cityId"
                        name="cityId"
                        value={student.cityId}
                        onChange={handleInputChange}
                      >
                        <option value="">Select City</option>
                        {cities.map(city => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="stateId" className="form-label">State</label>
                      <select
                        className="form-select"
                        id="stateId"
                        name="stateId"
                        value={student.stateId}
                        onChange={handleInputChange}
                      >
                        <option value="">Select State</option>
                        {states.map(state => (
                          <option key={state.id} value={state.id}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="countryId" className="form-label">Country</label>
                      <select
                        className="form-select"
                        id="countryId"
                        name="countryId"
                        value={student.countryId}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Country</option>
                        {countries.map(country => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="zipCode" className="form-label">Zip Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="zipCode"
                        name="zipCode"
                        value={student.zipCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <hr className="my-4" />
                <h6 className="mb-3">Contact Details</h6>
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={student.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={student.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="contactNumber"
                        name="contactNumber"
                        value={student.contactNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="emergencyContactNumber" className="form-label">Emergency Contact</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="emergencyContactNumber"
                        name="emergencyContactNumber"
                        value={student.emergencyContactNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <hr className="my-4" />
                <h6 className="mb-3">Birth Place</h6>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="birthCityId" className="form-label">Birth City</label>
                      <select
                        className="form-select"
                        id="birthCityId"
                        name="birthCityId"
                        value={student.birthCityId}
                        onChange={handleInputChange}
                      >
                        <option value="">Select City</option>
                        {cities.map(city => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="birthStateId" className="form-label">Birth State</label>
                      <select
                        className="form-select"
                        id="birthStateId"
                        name="birthStateId"
                        value={student.birthStateId}
                        onChange={handleInputChange}
                      >
                        <option value="">Select State</option>
                        {states.map(state => (
                          <option key={state.id} value={state.id}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="birthCountryId" className="form-label">Birth Country</label>
                      <select
                        className="form-select"
                        id="birthCountryId"
                        name="birthCountryId"
                        value={student.birthCountryId}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Country</option>
                        {countries.map(country => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>

            <Tab eventKey="parents" title="Parent Details">
              <div className="card-body">
                <Tabs
                  activeKey={activeParentTab}
                  onSelect={(k) => setActiveParentTab(k)}
                  className="mb-3"
                  id="parent-tabs"
                >
                  <Tab eventKey="father" title="Father Information">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherFirstName" className="form-label">First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="fatherFirstName"
                              name="parentFirstName"
                              value={father.parentFirstName}
                              onChange={handleFatherInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherLastName" className="form-label">Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="fatherLastName"
                              name="parentLastName"
                              value={father.parentLastName}
                              onChange={handleFatherInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherDob" className="form-label">Date of Birth</label>
                            <input
                              type="date"
                              className="form-control"
                              id="fatherDob"
                              name="parentDob"
                              value={father.parentDob}
                              onChange={handleFatherInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherEmail" className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="fatherEmail"
                              name="email"
                              value={father.email}
                              onChange={handleFatherInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherPhone" className="form-label">Phone</label>
                            <input
                              type="tel"
                              className="form-control"
                              id="fatherPhone"
                              name="phone"
                              value={father.phone}
                              onChange={handleFatherInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherMobile" className="form-label">Mobile</label>
                            <input
                              type="tel"
                              className="form-control"
                              id="fatherMobile"
                              name="mobile"
                              value={father.mobile}
                              onChange={handleFatherInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherOccupation" className="form-label">Occupation</label>
                            <input
                              type="text"
                              className="form-control"
                              id="fatherOccupation"
                              name="occupation"
                              value={father.occupation}
                              onChange={handleFatherInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherAnnualIncome" className="form-label">Annual Income</label>
                            <input
                              type="number"
                              step="0.01"
                              className="form-control"
                              id="fatherAnnualIncome"
                              name="annualIncome"
                              value={father.annualIncome}
                              onChange={handleFatherInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label htmlFor="fatherAddress1" className="form-label">Address Line 1</label>
                            <input
                              type="text"
                              className="form-control"
                              id="fatherAddress1"
                              name="address1"
                              value={father.address1}
                              onChange={handleFatherInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label htmlFor="fatherAddress2" className="form-label">Address Line 2</label>
                            <input
                              type="text"
                              className="form-control"
                              id="fatherAddress2"
                              name="address2"
                              value={father.address2}
                              onChange={handleFatherInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherCity" className="form-label">City</label>
                            <select
                              className="form-select"
                              id="fatherCity"
                              name="cityId"
                              value={father.cityId}
                              onChange={handleFatherInputChange}
                            >
                              <option value="">Select City</option>
                              {cities.map(city => (
                                <option key={city.id} value={city.id}>
                                  {city.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherState" className="form-label">State</label>
                            <select
                              className="form-select"
                              id="fatherState"
                              name="stateId"
                              value={father.stateId}
                              onChange={handleFatherInputChange}
                            >
                              <option value="">Select State</option>
                              {states.map(state => (
                                <option key={state.id} value={state.id}>
                                  {state.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherCountry" className="form-label">Country</label>
                            <select
                              className="form-select"
                              id="fatherCountry"
                              name="countryId"
                              value={father.countryId}
                              onChange={handleFatherInputChange}
                            >
                              <option value="">Select Country</option>
                              {countries.map(country => (
                                <option key={country.id} value={country.id}>
                                  {country.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherZipCode" className="form-label">Zip Code</label>
                            <input
                              type="text"
                              className="form-control"
                              id="fatherZipCode"
                              name="zipCode"
                              value={father.zipCode}
                              onChange={handleFatherInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" />
                      <h6 className="mb-3">Father Office Information</h6>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="fatherOfficeAddress1" className="form-label">Office Address Line 1</label>
                            <input
                              type="text"
                              className="form-control"
                              id="fatherOfficeAddress1"
                              name="officeAddress1"
                              value={father.officeAddress1}
                              onChange={handleFatherInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="fatherOfficeAddress2" className="form-label">Office Address Line 2</label>
                            <input
                              type="text"
                              className="form-control"
                              id="fatherOfficeAddress2"
                              name="officeAddress2"
                              value={father.officeAddress2}
                              onChange={handleFatherInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherOfficeCity" className="form-label">Office City</label>
                            <select
                              className="form-select"
                              id="fatherOfficeCity"
                              name="officeCityId"
                              value={father.officeCityId}
                              onChange={handleFatherInputChange}
                            >
                              <option value="">Select City</option>
                              {cities.map(city => (
                                <option key={city.id} value={city.id}>
                                  {city.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherOfficeState" className="form-label">Office State</label>
                            <select
                              className="form-select"
                              id="fatherOfficeState"
                              name="officeStateId"
                              value={father.officeStateId}
                              onChange={handleFatherInputChange}
                            >
                              <option value="">Select State</option>
                              {states.map(state => (
                                <option key={state.id} value={state.id}>
                                  {state.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherOfficeCountry" className="form-label">Office Country</label>
                            <select
                              className="form-select"
                              id="fatherOfficeCountry"
                              name="officeCountryId"
                              value={father.officeCountryId}
                              onChange={handleFatherInputChange}
                            >
                              <option value="">Select Country</option>
                              {countries.map(country => (
                                <option key={country.id} value={country.id}>
                                  {country.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherOfficePhone" className="form-label">Office Phone</label>
                            <input
                              type="tel"
                              className="form-control"
                              id="fatherOfficePhone"
                              name="officePhone"
                              value={father.officePhone}
                              onChange={handleFatherInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>

                  <Tab eventKey="mother" title="Mother Information">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherFirstName" className="form-label">First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="motherFirstName"
                              name="parentFirstName"
                              value={mother.parentFirstName}
                              onChange={handleMotherInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherLastName" className="form-label">Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="motherLastName"
                              name="parentLastName"
                              value={mother.parentLastName}
                              onChange={handleMotherInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherDob" className="form-label">Date of Birth</label>
                            <input
                              type="date"
                              className="form-control"
                              id="motherDob"
                              name="parentDob"
                              value={mother.parentDob}
                              onChange={handleMotherInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherEmail" className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="motherEmail"
                              name="email"
                              value={mother.email}
                              onChange={handleMotherInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherPhone" className="form-label">Phone</label>
                            <input
                              type="tel"
                              className="form-control"
                              id="motherPhone"
                              name="phone"
                              value={mother.phone}
                              onChange={handleMotherInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherMobile" className="form-label">Mobile</label>
                            <input
                              type="tel"
                              className="form-control"
                              id="motherMobile"
                              name="mobile"
                              value={mother.mobile}
                              onChange={handleMotherInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherOccupation" className="form-label">Occupation</label>
                            <input
                              type="text"
                              className="form-control"
                              id="motherOccupation"
                              name="occupation"
                              value={mother.occupation}
                              onChange={handleMotherInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherAnnualIncome" className="form-label">Annual Income</label>
                            <input
                              type="number"
                              step="0.01"
                              className="form-control"
                              id="motherAnnualIncome"
                              name="annualIncome"
                              value={mother.annualIncome}
                              onChange={handleMotherInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label htmlFor="motherAddress1" className="form-label">Address Line 1</label>
                            <input
                              type="text"
                              className="form-control"
                              id="motherAddress1"
                              name="address1"
                              value={mother.address1}
                              onChange={handleMotherInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label htmlFor="motherAddress2" className="form-label">Address Line 2</label>
                            <input
                              type="text"
                              className="form-control"
                              id="motherAddress2"
                              name="address2"
                              value={mother.address2}
                              onChange={handleMotherInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherCity" className="form-label">City</label>
                            <select
                              className="form-select"
                              id="motherCity"
                              name="cityId"
                              value={mother.cityId}
                              onChange={handleMotherInputChange}
                            >
                              <option value="">Select City</option>
                              {cities.map(city => (
                                <option key={city.id} value={city.id}>
                                  {city.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherState" className="form-label">State</label>
                            <select
                              className="form-select"
                              id="motherState"
                              name="stateId"
                              value={mother.stateId}
                              onChange={handleMotherInputChange}
                            >
                              <option value="">Select State</option>
                              {states.map(state => (
                                <option key={state.id} value={state.id}>
                                  {state.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherCountry" className="form-label">Country</label>
                            <select
                              className="form-select"
                              id="motherCountry"
                              name="countryId"
                              value={mother.countryId}
                              onChange={handleMotherInputChange}
                            >
                              <option value="">Select Country</option>
                              {countries.map(country => (
                                <option key={country.id} value={country.id}>
                                  {country.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherZipCode" className="form-label">Zip Code</label>
                            <input
                              type="text"
                              className="form-control"
                              id="motherZipCode"
                              name="zipCode"
                              value={mother.zipCode}
                              onChange={handleMotherInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" />
                      <h6 className="mb-3">Mother Office Information</h6>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="motherOfficeAddress1" className="form-label">Office Address Line 1</label>
                            <input
                              type="text"
                              className="form-control"
                              id="motherOfficeAddress1"
                              name="officeAddress1"
                              value={mother.officeAddress1}
                              onChange={handleMotherInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="motherOfficeAddress2" className="form-label">Office Address Line 2</label>
                            <input
                              type="text"
                              className="form-control"
                              id="motherOfficeAddress2"
                              name="officeAddress2"
                              value={mother.officeAddress2}
                              onChange={handleMotherInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherOfficeCity" className="form-label">Office City</label>
                            <select
                              className="form-select"
                              id="motherOfficeCity"
                              name="officeCityId"
                              value={mother.officeCityId}
                              onChange={handleMotherInputChange}
                            >
                              <option value="">Select City</option>
                              {cities.map(city => (
                                <option key={city.id} value={city.id}>
                                  {city.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherOfficeState" className="form-label">Office State</label>
                            <select
                              className="form-select"
                              id="motherOfficeState"
                              name="officeStateId"
                              value={mother.officeStateId}
                              onChange={handleMotherInputChange}
                            >
                              <option value="">Select State</option>
                              {states.map(state => (
                                <option key={state.id} value={state.id}>
                                  {state.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherOfficeCountry" className="form-label">Office Country</label>
                            <select
                              className="form-select"
                              id="motherOfficeCountry"
                              name="officeCountryId"
                              value={mother.officeCountryId}
                              onChange={handleMotherInputChange}
                            >
                              <option value="">Select Country</option>
                              {countries.map(country => (
                                <option key={country.id} value={country.id}>
                                  {country.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherOfficePhone" className="form-label">Office Phone</label>
                            <input
                              type="tel"
                              className="form-control"
                              id="motherOfficePhone"
                              name="officePhone"
                              value={mother.officePhone}
                              onChange={handleMotherInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </Tab>

            <Tab eventKey="fees" title="Fees & Transport">
              <div className="card-body">
                <h6 className="mb-3">Fee Details</h6>
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="tutionFees" className="form-label">Tuition Fees</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        id="tutionFees"
                        name="tutionFees"
                        value={student.tutionFees}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="annualFees" className="form-label">Annual Fees</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        id="annualFees"
                        name="annualFees"
                        value={student.annualFees}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="transportFees" className="form-label">Transport Fees</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        id="transportFees"
                        name="transportFees"
                        value={student.transportFees}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="feesDiscountCategoryMasterId" className="form-label">Fee Discount Category</label>
                      <input
                        type="text"
                        className="form-control"
                        id="feesDiscountCategoryMasterId"
                        name="feesDiscountCategoryMasterId"
                        value={student.feesDiscountCategoryMasterId}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="useTransportFees"
                          name="useTransportFees"
                          checked={student.useTransportFees}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="useTransportFees">
                          Use Transport Fees
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />
                <h6 className="mb-3">Transport Information</h6>
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="availTransport"
                          name="availTransport"
                          checked={student.availTransport}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="availTransport">
                          Available Transport
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="routePickAndDrop"
                          name="routePickAndDrop"
                          checked={student.routePickAndDrop}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="routePickAndDrop">
                          Pick and Drop
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="routeId" className="form-label">Route</label>
                      <input
                        type="text"
                        className="form-control"
                        id="routeId"
                        name="routeId"
                        value={student.routeId}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="routeStopDetailsId" className="form-label">Route Stop</label>
                      <input
                        type="text"
                        className="form-control"
                        id="routeStopDetailsId"
                        name="routeStopDetailsId"
                        value={student.routeStopDetailsId}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <hr className="my-4" />
                <h6 className="mb-3">Additional Information</h6>
                <div className="mb-3">
                  <label htmlFor="additionalNotes" className="form-label">Additional Notes</label>
                  <textarea
                    className="form-control"
                    id="additionalNotes"
                    name="additionalNotes"
                    rows="3"
                    value={student.additionalNotes}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </Tab>
          </Tabs>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
