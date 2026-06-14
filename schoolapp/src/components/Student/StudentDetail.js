import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [parents, setParents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [bloodGroups, setBloodGroups] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [religions, setReligions] = useState([]);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const [activeParentTab, setActiveParentTab] = useState('father');

  useEffect(() => {
    fetchStudentData();
  }, [id]);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch student and dropdown data in parallel
      const [
        studentData,
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
        studentService.getById(id),
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
      
      // Try to fetch parents separately, but don't fail if it doesn't work
      let parentsData = [];
      try {
        console.log('Fetching parents for student:', id);
        parentsData = await parentService.getByStudentId(id);
        console.log('Parents data received:', parentsData);
      } catch (parentError) {
        console.warn('Failed to fetch parents for student:', parentError.message);
        // Continue without parents data
      }
      
      setStudent(studentData);
      setParents(parentsData);
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
      setError(err.message || 'Failed to fetch student details');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get display name from dropdown data
  const getDisplayName = (id, dataArray, fallback = 'N/A') => {
    if (!id || !dataArray || dataArray.length === 0) {
      // If dropdown data isn't loaded yet, return the ID as fallback
      return id || fallback;
    }
    const item = dataArray.find(item => item.id === id);
    if (!item) return id || fallback;
    // Handle different property names for different entities
    return item.name || item.cityName || item.stateName || item.countryName || id || fallback;
  };

  // Helper function to format gender display
  const getGenderDisplay = (gender) => {
    if (!gender) return 'N/A';
    if (gender === '1' || gender === 1 || gender === 'Male') return 'Male';
    if (gender === '2' || gender === 2 || gender === 'Female') return 'Female';
    if (gender === '3' || gender === 3 || gender === 'Other') return 'Other';
    return gender; // Return as-is if it's already text
  };

  // Helper function to get parent by relation type
  const getParentByRelation = (relationTypeName) => {
    return parents.find(parent => parent.relationTypeName === relationTypeName);
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

  if (error) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/students')}>
          Back to Students
        </button>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Student not found
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/students')}>
          Back to Students
        </button>
      </div>
    );
  }

  const father = getParentByRelation('Father') || {};
  const mother = getParentByRelation('Mother') || {};

  // Debug: Log the data to understand structure
  console.log('Student data:', student);
  console.log('Parents data:', parents);
  console.log('Dropdown data:', {
    bloodGroups: bloodGroups.length,
    countries: countries.length,
    religions: religions.length,
    houses: houses.length
  });
  console.log('Student field values:', {
    gender: student.gender,
    nationality: student.nationality,
    religionId: student.religionId,
    houseAllotted: student.houseAllotted,
    bloodGroupId: student.bloodGroupId
  });

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Student Details</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/students">Students</Link>
              </li>
              <li className="breadcrumb-item active">
                {student.rollNumber || `${student.firstName} ${student.lastName}`}
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/students" className="btn btn-outline-secondary me-2">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <Link to={`/students/${id}/edit`} className="btn btn-primary">
            <i className="bi bi-pencil me-2"></i>
            Edit Student
          </Link>
        </div>
      </div>

      {/* Student Summary Card */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <h4 className="card-title">
                {student.rollNumber && (
                  <span className="badge bg-primary me-2">{student.rollNumber}</span>
                )}
                {`${student.firstName || ''} ${student.lastName || ''}`.trim() || 'N/A'}
              </h4>
              <p className="text-muted mb-2">
                <i className="bi bi-envelope me-2"></i>
                {student.email || 'N/A'}
              </p>
              <p className="text-muted mb-2">
                <i className="bi bi-telephone me-2"></i>
                {student.contactNumber || 'N/A'}
              </p>
              <p className="text-muted mb-2">
                <i className="bi bi-card-text me-2"></i>
                Registration: {student.registrationNumber || 'N/A'}
              </p>
              <p className="text-muted mb-0">
                <i className="bi bi-building me-2"></i>
                Class: {getDisplayName(student.classId, classes)} - Section: {getDisplayName(student.sectionId, sections)}
              </p>
            </div>
            <div className="col-md-4 text-end">
              <span className={`badge bg-${student.isActive ? 'success' : 'danger'} fs-6`}>
                {student.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Student Details Tabs */}
      <div className="card">
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
          id="student-tabs"
        >
          <Tab eventKey="personal" title="Personal Info">
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">First Name</label>
                    <div className="form-control-plaintext">{student.firstName || 'N/A'}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Last Name</label>
                    <div className="form-control-plaintext">{student.lastName || 'N/A'}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Date of Birth</label>
                    <div className="form-control-plaintext">
                      {student.dob ? new Date(student.dob).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Gender</label>
                    <div className="form-control-plaintext">
                      {getGenderDisplay(student.gender)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Blood Group</label>
                    <div className="form-control-plaintext">{getDisplayName(student.bloodGroupId, bloodGroups)}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Nationality</label>
                    <div className="form-control-plaintext">{getDisplayName(student.nationality, countries)}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Category</label>
                    <div className="form-control-plaintext">{getDisplayName(student.categoryId, categories)}</div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Religion</label>
                    <div className="form-control-plaintext">{getDisplayName(student.religionId, religions)}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">House Allotted</label>
                    <div className="form-control-plaintext">{getDisplayName(student.houseAllotted, houses)}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Hobbies</label>
                    <div className="form-control-plaintext">{student.hobbies || 'N/A'}</div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Disability (if any)</label>
                    <div className="form-control-plaintext">{student.disabilityAny || 'N/A'}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Medical Allergies</label>
                    <div className="form-control-plaintext">{student.medicalAlleryAny || 'N/A'}</div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="siblingsIfAny"
                        checked={student.siblingsIfAny}
                        disabled
                      />
                      <label className="form-check-label" htmlFor="siblingsIfAny">
                        Has siblings in the school
                      </label>
                    </div>
                  </div>
                </div>
                {student.siblingsIfAny && (
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label text-muted">Sibling Class</label>
                      <div className="form-control-plaintext">{getDisplayName(student.siblingClassId, classes)}</div>
                    </div>
                  </div>
                )}
                <div className="col-md-4">
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="isActive"
                        checked={student.isActive}
                        disabled
                      />
                      <label className="form-check-label" htmlFor="isActive">
                        Active
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label text-muted">Student Image</label>
                    <div>
                      {student.image ? (
                        <img src={student.image} alt="Student" className="img-thumbnail" style={{maxHeight: '200px'}} />
                      ) : (
                        <div className="text-muted">No image available</div>
                      )}
                    </div>
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
                    <label className="form-label text-muted">Roll Number</label>
                    <div className="form-control-plaintext">{student.rollNumber || 'N/A'}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Registration Number</label>
                    <div className="form-control-plaintext">{student.registrationNumber || 'N/A'}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Class</label>
                    <div className="form-control-plaintext">{getDisplayName(student.classId, classes)}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Section</label>
                    <div className="form-control-plaintext">{getDisplayName(student.sectionId, sections)}</div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">School</label>
                    <div className="form-control-plaintext">Session-based School</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Session</label>
                    <div className="form-control-plaintext">{student.sessionId || 'N/A'}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Class Teacher</label>
                    <div className="form-control-plaintext">{student.classTeacherId || 'N/A'}</div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Date of Joining</label>
                    <div className="form-control-plaintext">
                      {student.doj ? new Date(student.doj).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-4" />
              <h6 className="mb-3">Previous School Information</h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Previous School Attended</label>
                    <div className="form-control-plaintext">{student.previousSchoolAttended || 'N/A'}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Previous Class</label>
                    <div className="form-control-plaintext">{getDisplayName(student.previousSchoolClassId, classes)}</div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Previous School Percentage</label>
                    <div className="form-control-plaintext">{student.previousSchoolPercentage || 'N/A'}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Previous School Rank</label>
                    <div className="form-control-plaintext">{student.previousSchoolRank || 'N/A'}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Previous School Board</label>
                    <div className="form-control-plaintext">{getDisplayName(student.previousSchoolBoardId, countries)}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Period</label>
                    <div className="form-control-plaintext">
                      {student.previousSchoolFromDate && student.previousSchoolToDate ? 
                        `${new Date(student.previousSchoolFromDate).toLocaleDateString()} - ${new Date(student.previousSchoolToDate).toLocaleDateString()}` : 
                        'N/A'
                      }
                    </div>
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
                    <label className="form-label text-muted">Address</label>
                    <div className="form-control-plaintext">{student.address || 'N/A'}</div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">City</label>
                    <div className="form-control-plaintext">{getDisplayName(student.cityId, cities)}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">State</label>
                    <div className="form-control-plaintext">{getDisplayName(student.stateId, states)}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Country</label>
                    <div className="form-control-plaintext">{getDisplayName(student.countryId, countries)}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Zip Code</label>
                    <div className="form-control-plaintext">{student.zipCode || 'N/A'}</div>
                  </div>
                </div>
              </div>

              <hr className="my-4" />
              <h6 className="mb-3">Contact Details</h6>
              <div className="row">
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Email</label>
                    <div className="form-control-plaintext">{student.email || 'N/A'}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Phone</label>
                    <div className="form-control-plaintext">{student.phone || 'N/A'}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Contact Number</label>
                    <div className="form-control-plaintext">{student.contactNumber || 'N/A'}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Emergency Contact</label>
                    <div className="form-control-plaintext">{student.emergencyContactNumber || 'N/A'}</div>
                  </div>
                </div>
              </div>

              <hr className="my-4" />
              <h6 className="mb-3">Birth Place</h6>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Birth City</label>
                    <div className="form-control-plaintext">{getDisplayName(student.birthCityId, cities)}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Birth State</label>
                    <div className="form-control-plaintext">{getDisplayName(student.birthStateId, states)}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-muted">Birth Country</label>
                    <div className="form-control-plaintext">{getDisplayName(student.birthCountryId, countries)}</div>
                  </div>
                </div>
              </div>
            </div>
          </Tab>

          <Tab eventKey="parents" title="Parent Details">
            <div className="card-body">
              {parents.length === 0 ? (
                <div className="text-center text-muted py-4">
                  <i className="bi bi-people fs-1 mb-3"></i>
                  <h5>No Parent Information Available</h5>
                  <p>Parent details have not been added for this student yet.</p>
                </div>
              ) : (
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
                            <label className="form-label text-muted">First Name</label>
                            <div className="form-control-plaintext">{father.parentFirstName || 'N/A'}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Last Name</label>
                            <div className="form-control-plaintext">{father.parentLastName || 'N/A'}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Date of Birth</label>
                            <div className="form-control-plaintext">
                              {father.parentDob ? new Date(father.parentDob).toLocaleDateString() : 'N/A'}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Email</label>
                            <div className="form-control-plaintext">{father.email || 'N/A'}</div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Phone</label>
                            <div className="form-control-plaintext">{father.phone || 'N/A'}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Mobile</label>
                            <div className="form-control-plaintext">{father.mobile || 'N/A'}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Occupation</label>
                            <div className="form-control-plaintext">{father.occupation || 'N/A'}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Annual Income</label>
                            <div className="form-control-plaintext">{father.annualIncome || 'N/A'}</div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label text-muted">Address Line 1</label>
                            <div className="form-control-plaintext">{father.address1 || 'N/A'}</div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label text-muted">Address Line 2</label>
                            <div className="form-control-plaintext">{father.address2 || 'N/A'}</div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">City</label>
                            <div className="form-control-plaintext">{getDisplayName(father.cityId, cities)}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">State</label>
                            <div className="form-control-plaintext">{getDisplayName(father.stateId, states)}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Country</label>
                            <div className="form-control-plaintext">{getDisplayName(father.countryId, countries)}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Zip Code</label>
                            <div className="form-control-plaintext">{father.zipCode || 'N/A'}</div>
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" />
                      <h6 className="mb-3">Father Office Information</h6>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label text-muted">Office Address Line 1</label>
                            <div className="form-control-plaintext">{father.officeAddress1 || 'N/A'}</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label text-muted">Office Address Line 2</label>
                            <div className="form-control-plaintext">{father.officeAddress2 || 'N/A'}</div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Office City</label>
                            <div className="form-control-plaintext">{getDisplayName(father.officeCityId, cities)}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Office State</label>
                            <div className="form-control-plaintext">{getDisplayName(father.officeStateId, states)}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Office Country</label>
                            <div className="form-control-plaintext">{getDisplayName(father.officeCountryId, countries)}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Office Phone</label>
                            <div className="form-control-plaintext">{father.officePhone || 'N/A'}</div>
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
                            <label className="form-label text-muted">First Name</label>
                            <div className="form-control-plaintext">{mother.parentFirstName || 'N/A'}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Last Name</label>
                            <div className="form-control-plaintext">{mother.parentLastName || 'N/A'}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Date of Birth</label>
                            <div className="form-control-plaintext">
                              {mother.parentDob ? new Date(mother.parentDob).toLocaleDateString() : 'N/A'}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Email</label>
                            <div className="form-control-plaintext">{mother.email || 'N/A'}</div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Phone</label>
                            <div className="form-control-plaintext">{mother.phone || 'N/A'}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Mobile</label>
                            <div className="form-control-plaintext">{mother.mobile || 'N/A'}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Occupation</label>
                            <div className="form-control-plaintext">{mother.occupation || 'N/A'}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Annual Income</label>
                            <div className="form-control-plaintext">{mother.annualIncome || 'N/A'}</div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label text-muted">Address Line 1</label>
                            <div className="form-control-plaintext">{mother.address1 || 'N/A'}</div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label text-muted">Address Line 2</label>
                            <div className="form-control-plaintext">{mother.address2 || 'N/A'}</div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">City</label>
                            <div className="form-control-plaintext">{getDisplayName(mother.cityId, cities)}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">State</label>
                            <div className="form-control-plaintext">{getDisplayName(mother.stateId, states)}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Country</label>
                            <div className="form-control-plaintext">{getDisplayName(mother.countryId, countries)}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Zip Code</label>
                            <div className="form-control-plaintext">{mother.zipCode || 'N/A'}</div>
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" />
                      <h6 className="mb-3">Mother Office Information</h6>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label text-muted">Office Address Line 1</label>
                            <div className="form-control-plaintext">{mother.officeAddress1 || 'N/A'}</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label text-muted">Office Address Line 2</label>
                            <div className="form-control-plaintext">{mother.officeAddress2 || 'N/A'}</div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Office City</label>
                            <div className="form-control-plaintext">{getDisplayName(mother.officeCityId, cities)}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Office State</label>
                            <div className="form-control-plaintext">{getDisplayName(mother.officeStateId, states)}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Office Country</label>
                            <div className="form-control-plaintext">{getDisplayName(mother.officeCountryId, countries)}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label className="form-label text-muted">Office Phone</label>
                            <div className="form-control-plaintext">{mother.officePhone || 'N/A'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              )}
            </div>
          </Tab>

          <Tab eventKey="fees" title="Fees & Transport">
            <div className="card-body">
              <h6 className="mb-3">Fee Details</h6>
              <div className="row">
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Tuition Fees</label>
                    <div className="form-control-plaintext">{student.tutionFees || 'N/A'}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Annual Fees</label>
                    <div className="form-control-plaintext">{student.annualFees || 'N/A'}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Transport Fees</label>
                    <div className="form-control-plaintext">{student.transportFees || 'N/A'}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Fee Discount Category</label>
                    <div className="form-control-plaintext">{getDisplayName(student.feesDiscountCategoryMasterId, categories)}</div>
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
                        checked={student.useTransportFees}
                        disabled
                      />
                      <label className="form-check-label" htmlFor="useTransportFees">
                        Use Transport Fees
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="availTransport"
                        checked={student.availTransport}
                        disabled
                      />
                      <label className="form-check-label" htmlFor="availTransport">
                        Available Transport
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
                    <label className="form-label text-muted">Route</label>
                    <div className="form-control-plaintext">{getDisplayName(student.routeId, categories)}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label text-muted">Route Stop Details</label>
                    <div className="form-control-plaintext">{getDisplayName(student.routeStopDetailsId, categories)}</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="routePickAndDrop"
                        checked={student.routePickAndDrop}
                        disabled
                      />
                      <label className="form-check-label" htmlFor="routePickAndDrop">
                        Route Pick and Drop
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-4" />
              <h6 className="mb-3">Additional Information</h6>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label text-muted">Additional Notes</label>
                    <div className="form-control-plaintext">{student.additionalNotes || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDetail;
