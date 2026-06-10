import React, { useState, useEffect } from 'react';
import { countryService } from '../../../services/countryService';
import { stateService } from '../../../services/stateService';
import { cityService } from '../../../services/cityService';
import { departmentService } from '../../../services/departmentService';
import { designationService } from '../../../services/designationService';
import { genderService } from '../../../services/genderService';
import { bloodGroupService } from '../../../services/bloodGroupService';
import { gradeService } from '../../../services/gradeService';
import { employeeTypeService } from '../../../services/employeeTypeService';

const EmpMaster = ({ employeeData, categories, onInputChange, onDataChange, isEdit }) => {
  console.log('EmpMaster - Categories prop:', categories);
  console.log('EmpMaster - Categories length:', categories?.length || 0);
  const [errors, setErrors] = useState({});

  // Utility function to format date for HTML date input
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toISOString().split('T')[0];
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };
  // eslint-disable-next-line no-unused-vars
  const [countries, setCountries] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [states, setStates] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [cities, setCities] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [permanentStates, setPermanentStates] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [permanentCities, setPermanentCities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [genders, setGenders] = useState([]);
  const [bloodGroups, setBloodGroups] = useState([]);
  const [grades, setGrades] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMasterData();
  }, []);

  useEffect(() => {
    if (employeeData.currentCountryId) {
      fetchStates(employeeData.currentCountryId, 'current');
    }
    if (employeeData.permanentCountryId) {
      fetchStates(employeeData.permanentCountryId, 'permanent');
    }
  }, [employeeData.currentCountryId, employeeData.permanentCountryId]);

  useEffect(() => {
    if (employeeData.currentStateId) {
      fetchCities(employeeData.currentStateId, 'current');
    }
    if (employeeData.permanentStateId) {
      fetchCities(employeeData.permanentStateId, 'permanent');
    }
  }, [employeeData.currentStateId, employeeData.permanentStateId]);

  useEffect(() => {
    if (employeeData.departmentId) {
      fetchDesignationsByDepartment(employeeData.departmentId);
    } else {
      setDesignations([]);
    }
  }, [employeeData.departmentId]);

  const fetchMasterData = async () => {
    try {
      setLoading(true);
      console.log('Starting to fetch master data...');
      
      // Fetch each service individually to handle failures gracefully
      const results = await Promise.allSettled([
        countryService.getAll(),
        departmentService.getAll(),
        // designationService.getAll(), // Remove this - designations will be fetched by department
        genderService.getAll(),
        bloodGroupService.getAll(),
        gradeService.getAll(),
        employeeTypeService.getAll(),
      ]);
      
      // Handle results individually
      if (results[0].status === 'fulfilled') {
        setCountries(results[0].value || []);
        console.log('Countries loaded:', results[0].value);
      } else {
        console.error('Failed to load countries:', results[0].reason);
        setCountries([]);
      }
      
      if (results[1].status === 'fulfilled') {
        setDepartments(results[1].value || []);
      } else {
        console.error('Failed to load departments:', results[1].reason);
        setDepartments([]);
      }
      
      // Skip designation - will be fetched by department
      
      if (results[2].status === 'fulfilled') {
        setGenders(results[2].value || []);
        console.log('Genders loaded:', results[2].value);
        console.log('Gender count:', results[2].value?.length || 0);
      } else {
        console.error('Failed to load genders from database:', results[2].reason);
        console.error('Gender service error details:', JSON.stringify(results[2].reason, null, 2));
        console.error('Please check if IGenderService is registered in backend DI container');
        setGenders([]);
      }
      
      if (results[3].status === 'fulfilled') {
        setBloodGroups(results[3].value || []);
        console.log('Blood groups loaded:', results[3].value);
        console.log('Blood group count:', results[3].value?.length || 0);
      } else {
        console.error('Failed to load blood groups from database:', results[3].reason);
        console.error('Blood group service error details:', JSON.stringify(results[3].reason, null, 2));
        console.error('Please check if IBloodGroupService is registered in backend DI container');
        setBloodGroups([]);
      }
      
      if (results[4].status === 'fulfilled') {
        setGrades(results[4].value || []);
      } else {
        console.error('Failed to load grades:', results[4].reason);
        setGrades([]);
      }
      
      if (results[5].status === 'fulfilled') {
        setEmployeeTypes(results[5].value || []);
      } else {
        console.error('Failed to load employee types:', results[5].reason);
        setEmployeeTypes([]);
      }
      
      
    } catch (error) {
      console.error('Unexpected error in fetchMasterData:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStates = async (countryId, type) => {
    if (!countryId) return;
    try {
      console.log('Calling stateService.getByCountryId with:', countryId);
      const statesRes = await stateService.getByCountryId(countryId);
      console.log('States received:', statesRes);
      if (type === 'current') {
        setStates(statesRes || []);
      } else {
        setPermanentStates(statesRes || []);
      }
    } catch (error) {
      console.error('Failed to fetch states:', error);
      // Set empty arrays on error to prevent undefined errors
      if (type === 'current') {
        setStates([]);
      } else {
        setPermanentStates([]);
      }
    }
  };

  const fetchDesignationsByDepartment = async (departmentId) => {
    if (!departmentId) return;
    try {
      console.log('Fetching designations for department:', departmentId);
      const designationsRes = await designationService.getByDepartmentId(departmentId);
      console.log('Designations received:', designationsRes);
      console.log('Designations count:', designationsRes?.length || 0);
      console.log('Designations sample:', designationsRes?.[0]);
      setDesignations(designationsRes || []);
    } catch (error) {
      console.error('Failed to fetch designations by department:', error);
      console.error('Error details:', error.response?.data || error.message);
      setDesignations([]);
    }
  };

  const fetchCities = async (stateId, type) => {
    if (!stateId) return;
    try {
      const citiesRes = await cityService.getByStateId(stateId);
      if (type === 'current') {
        setCities(citiesRes || []);
      } else {
        setPermanentCities(citiesRes || []);
      }
    } catch (error) {
      console.error('Failed to fetch cities:', error);
      // Set empty arrays on error to prevent undefined errors
      if (type === 'current') {
        setCities([]);
      } else {
        setPermanentCities([]);
      }
    }
  };

  const handleDepartmentChange = (e) => {
    const { name, value } = e.target;
    console.log('Department changed:', { name, value });
    handleFieldChange(e);
    
    // Reset designation when department changes
    onInputChange({ target: { name: 'designationId', value: '' } });
    setDesignations([]);
    
    if (value) {
      console.log('Fetching designations for department:', value);
      fetchDesignationsByDepartment(value);
    }
  };

  const handleCountryChange = (e, type) => {
    const { name, value } = e.target;
    console.log('Country changed:', { name, value, type });
    handleFieldChange(e);
    
    // Reset dependent fields
    if (type === 'current') {
      onInputChange({ target: { name: 'currentStateId', value: '' } });
      onInputChange({ target: { name: 'currentCityId', value: '' } });
      setStates([]);
      setCities([]);
    } else {
      onInputChange({ target: { name: 'permanentStateId', value: '' } });
      onInputChange({ target: { name: 'permanentCityId', value: '' } });
      setPermanentStates([]);
      setPermanentCities([]);
    }
    
    if (value) {
      console.log('Fetching states for country:', value);
      fetchStates(value, type);
    }
  };

  const handleStateChange = (e, type) => {
    const { name, value } = e.target;
    handleFieldChange(e);
    
    // Reset dependent city
    if (type === 'current') {
      onInputChange({ target: { name: 'currentCityId', value: '' } });
      setCities([]);
    } else {
      onInputChange({ target: { name: 'permanentCityId', value: '' } });
      setPermanentCities([]);
    }
    
    if (value) {
      fetchCities(value, type);
    }
  };

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'firstName':
        if (!value.trim()) error = 'First name is required';
        break;
      case 'lastName':
        if (!value.trim()) error = 'Last name is required';
        break;
      case 'emailId':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Email is invalid';
        }
        break;
      case 'phoneNumber':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^\d{10}$/.test(value.replace(/\s/g, ''))) {
          error = 'Phone number must be 10 digits';
        }
        break;
      case 'categoryId':
        if (!value) error = 'Category is required';
        break;
      case 'dateOfBirth':
        if (value && new Date(value) > new Date()) {
          error = 'Date of birth cannot be in the future';
        }
        break;
      case 'joiningDate':
        if (!value) error = 'Joining date is required';
        break;
      case 'mobileNumber':
        if (value && !/^\d{10}$/.test(value.replace(/\s/g, ''))) {
          error = 'Phone number must be 10 digits';
        }
        break;
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    // Validate field
    validateField(name, fieldValue);
    
    // Call parent onChange
    onInputChange(e);
    
    // Notify parent of data change
    onDataChange?.({
      ...employeeData,
      [name]: fieldValue
    });
  };

  // eslint-disable-next-line no-unused-vars
  const generateEmployeeCode = () => {
    if (employeeData.firstName && employeeData.lastName) {
      const code = `${employeeData.firstName.substring(0, 3).toUpperCase()}${employeeData.lastName.substring(0, 3).toUpperCase()}${Date.now().toString().slice(-4)}`;
      onInputChange({ target: { name: 'employeeCode', value: code } });
    }
  };

  return (
    <div className="p-2" style={{maxHeight: 'calc(100vh - 100px)', overflowY: 'auto'}}>
      {loading && (
        <div className="d-flex justify-content-center mb-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      
      <div className="row g-2">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <h6 className="mb-2">Personal Information</h6>
          
          <div className="mb-3">
            <label className="form-label">Salutation</label>
            <select
              className="form-select"
              name="salutation"
              value={employeeData.salutation || ''}
              onChange={handleFieldChange}
            >
              <option value="">Select Salutation</option>
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Dr.">Dr.</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">First Name *</label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              name="firstName"
              value={employeeData.firstName || ''}
              onChange={handleFieldChange}
              placeholder="Enter first name"
            />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name *</label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              name="lastName"
              value={employeeData.lastName || ''}
              onChange={handleFieldChange}
              placeholder="Enter last name"
            />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
              name="dob"
              value={formatDateForInput(employeeData.dob)}
              onChange={handleFieldChange}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              name="genderId"
              value={employeeData.genderId || ''}
              onChange={handleFieldChange}
            >
              <option value="">Select Gender</option>
              {genders?.map(gender => (
                <option key={gender.id} value={gender.id}>
                  {gender.gender}
                </option>
              ))}
            </select>
            {genders.length === 0 && !loading && (
              <small className="text-danger">
                Unable to load gender data from database. Please check backend service configuration.
              </small>
            )}
          </div>
        </div>

        <div className="col-lg-3 col-md-4 col-sm-6">
          <h6 className="mb-2">Family Information</h6>
          
          <div className="mb-3">
            <label className="form-label">Father's Name</label>
            <input
              type="text"
              className="form-control"
              name="fathersName"
              value={employeeData.fathersName || ''}
              onChange={handleFieldChange}
              placeholder="Enter father's name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mother's Name</label>
            <input
              type="text"
              className="form-control"
              name="mothersName"
              value={employeeData.mothersName || ''}
              onChange={handleFieldChange}
              placeholder="Enter mother's name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Blood Group</label>
            <select
              className="form-select"
              name="bloodGroupId"
              value={employeeData.bloodGroupId || ''}
              onChange={handleFieldChange}
            >
              <option value="">Select Blood Group</option>
              {bloodGroups?.map(bloodGroup => (
                <option key={bloodGroup.id} value={bloodGroup.id}>
                  {bloodGroup.name}
                </option>
              ))}
            </select>
            {bloodGroups.length === 0 && !loading && (
              <small className="text-danger">
                Unable to load blood group data from database. Please check backend service configuration.
              </small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Marital Status</label>
            <select
              className="form-select"
              name="maritalStatus"
              value={employeeData.maritalStatus || ''}
              onChange={handleFieldChange}
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
        </div>

        <div className="col-lg-3 col-md-4 col-sm-6">
          <h6 className="mb-2">Employment Details</h6>
          
          <div className="mb-3">
            <label className="form-label">Category *</label>
            <select
              className={`form-select ${errors.categoryId ? 'is-invalid' : ''}`}
              name="categoryId"
              value={employeeData.categoryId || ''}
              onChange={handleFieldChange}
            >
              <option value="">Select Category</option>
              {categories?.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <div className="invalid-feedback">{errors.categoryId}</div>}
            {(!categories || categories.length === 0) && !loading && (
              <small className="text-danger">
                Unable to load category data. Please check parent component.
              </small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Employee Type</label>
            <select
              className="form-select"
              name="employeeTypeId"
              value={employeeData.employeeTypeId || ''}
              onChange={handleFieldChange}
            >
              <option value="">Select Employee Type</option>
              {employeeTypes?.map(empType => (
                <option key={empType.id} value={empType.id}>
                  {empType.typeName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Grade</label>
            <select
              className="form-select"
              name="gradeId"
              value={employeeData.gradeId || ''}
              onChange={handleFieldChange}
            >
              <option value="">Select Grade</option>
              {grades?.map(grade => (
                <option key={grade.id} value={grade.id}>
                  {grade.gradeName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Department</label>
            <select
              className="form-select"
              name="departmentId"
              value={employeeData.departmentId || ''}
              onChange={handleDepartmentChange}
            >
              <option value="">Select Department</option>
              {departments?.map(department => (
                <option key={department.id} value={department.id}>
                  {department.deptName || department.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Designation</label>
            {console.log('Designations state before render:', designations)}
            {console.log('Designations length:', designations?.length || 0)}
            <select
              className="form-select"
              name="designationId"
              value={employeeData.designationId || ''}
              onChange={handleFieldChange}
            >
              <option value="">Select Designation</option>
              {designations?.map(designation => (
                <option key={designation.id} value={designation.id}>
                  {designation.name}
                </option>
              ))}
            </select>
            {designations && designations.length === 0 && employeeData.departmentId && (
              <small className="text-muted">
                No designations found for this department
              </small>
            )}
          </div>
        </div>

        <div className="col-lg-3 col-md-4 col-sm-6">
          <h6 className="mb-2">Contact & Status</h6>
          
          <div className="mb-3">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
              name="emailId"
              value={employeeData.emailId || ''}
              onChange={handleFieldChange}
              placeholder="Enter email address"
            />
            {errors.emailId && <div className="invalid-feedback">{errors.emailId}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
              name="phoneNumber"
              value={employeeData.phoneNumber || ''}
              onChange={handleFieldChange}
              placeholder="Enter phone number"
            />
            {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Mobile Number</label>
            <input
              type="tel"
              className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
              name="mobileNumber"
              value={employeeData.mobileNumber || ''}
              onChange={handleFieldChange}
              placeholder="Enter mobile number"
            />
            {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Joining *</label>
            <input
              type="date"
              className={`form-control ${errors.joiningDate ? 'is-invalid' : ''}`}
              name="doj"
              value={formatDateForInput(employeeData.doj)}
              onChange={handleFieldChange}
            />
            {errors.joiningDate && <div className="invalid-feedback">{errors.joiningDate}</div>}
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Probation Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="probationStartDate"
                  value={formatDateForInput(employeeData.probationStartDate)}
                  onChange={handleFieldChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Probation Period (months)</label>
                <input
                  type="number"
                  className="form-control"
                  name="probationPeriod"
                  value={employeeData.probationPeriod || ''}
                  onChange={handleFieldChange}
                  placeholder="Enter months"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Confirmation Date</label>
            <input
              type="date"
              className="form-control"
              name="confirmationDate"
              value={formatDateForInput(employeeData.confirmationDate)}
              onChange={handleFieldChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Leaving</label>
            <input
              type="date"
              className="form-control"
              name="dateOfLeaving"
              value={formatDateForInput(employeeData.dateOfLeaving)}
              onChange={handleFieldChange}
            />
          </div>

          
          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="isActive"
                id="isActive"
                checked={employeeData.isActive ?? true}
                onChange={handleFieldChange}
              />
              <label className="form-check-label" htmlFor="isActive">
                Active Employee
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpMaster;
