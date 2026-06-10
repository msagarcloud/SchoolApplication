import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import { companyService } from '../../services/companyService';
import { schoolService } from '../../services/schoolService';
import { employeeService } from '../../services/employeeService';
import { bloodGroupService } from '../../services/bloodGroupService';
import { genderService } from '../../services/genderService';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [activePrivilegeTab, setActivePrivilegeTab] = useState('all');
  const [activeEmployeeTab, setActiveEmployeeTab] = useState('personal');
  const [resolvedNames, setResolvedNames] = useState({});

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        console.log('Current user data:', currentUser); // Debug log to see available fields
        if (currentUser) {
          setUser(currentUser);
          
          // Fetch employee details if user has an employee ID
          if (currentUser.id || currentUser.employeeId) {
            try {
              const employeeId = currentUser.id || currentUser.employeeId;
              const employeeData = await employeeService.getById(employeeId);
              console.log('Employee data:', employeeData);
              setEmployeeDetails(employeeData);
            } catch (err) {
              console.error('Failed to fetch employee details:', err);
              // Don't set error, just continue without employee details
            }
          }
          
          // Fetch company name if companyId exists
          if (currentUser.companyId) {
            try {
              console.log('Fetching company for ID:', currentUser.companyId);
              const companyData = await companyService.getById(currentUser.companyId);
              console.log('Company data received:', companyData);
              const fetchedName = companyData?.name || companyData?.Name || 'N/A';
              console.log('Setting company name to:', fetchedName);
              setCompanyName(fetchedName);
            } catch (err) {
              console.error('Failed to fetch company name:', err);
              console.log('Using fallback company name from auth service');
              setCompanyName(authService.getCompanyName() || 'N/A');
            }
          } else {
            console.log('No companyId found in user data');
            // Try to get company name from auth service as fallback
            setCompanyName(authService.getCompanyName() || 'N/A');
          }
          
          // Fetch school name if schoolId exists
          if (currentUser.schoolId) {
            try {
              const schoolData = await schoolService.getById(currentUser.schoolId);
              setSchoolName(schoolData?.name || 'N/A');
            } catch (err) {
              console.error('Failed to fetch school name:', err);
              setSchoolName('N/A');
            }
          }
        } else {
          setError('No user data found. Please login again.');
        }
      } catch (err) {
        setError('Failed to load user profile');
        console.error('Error loading profile:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

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
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="alert alert-warning" role="alert">
        No user profile data available.
      </div>
    );
  }

  // Debug: Show all available fields
  console.log('Available user fields:', Object.keys(user));
  console.log('User data:', user);
  console.log('Employee details:', employeeDetails);
  console.log('Company name state:', companyName);
  console.log('Company name from auth:', authService.getCompanyName());

  // Function to render a field if it exists
  const renderField = (label, value, formatter = null) => {
    if (value !== undefined && value !== null && value !== '') {
      const displayValue = formatter ? formatter(value) : value;
      return (
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">{label}:</label>
          <p className="form-control-plaintext">{displayValue}</p>
        </div>
      );
    }
    return null;
  };

  // Function to resolve ID to name
  const resolveIdToName = async (category, id) => {
    const cacheKey = `${category}_${id}`;
    if (resolvedNames[cacheKey]) {
      return resolvedNames[cacheKey];
    }

    try {
      let name = 'N/A';
      switch (category) {
        case 'company':
          const companyData = await companyService.getById(id);
          name = companyData?.name || companyData?.Name || 'N/A';
          break;
        case 'school':
          const schoolData = await schoolService.getById(id);
          name = schoolData?.name || schoolData?.Name || 'N/A';
          break;
        case 'bloodgroup':
          const bloodGroupData = await bloodGroupService.getById(id);
          name = bloodGroupData?.name || bloodGroupData?.Name || bloodGroupData?.bloodGroup || bloodGroupData?.BloodGroup || 'N/A';
          break;
        case 'designation':
          // Import and use designation service if available
          // For now, return the ID as fallback
          name = `Designation ${id}`;
          break;
        case 'department':
          // Import and use department service if available
          name = `Department ${id}`;
          break;
        case 'city':
          // Import and use city service if available
          name = `City ${id}`;
          break;
        case 'state':
          // Import and use state service if available
          name = `State ${id}`;
          break;
        case 'country':
          // Import and use country service if available
          name = `Country ${id}`;
          break;
        case 'gender':
          const genderData = await genderService.getById(id);
          name = genderData?.name || genderData?.Name || genderData?.gender || genderData?.Gender || 'N/A';
          break;
        case 'religion':
          // Import and use religion service if available
          name = `Religion ${id}`;
          break;
        default:
          name = id;
      }

      // Cache the resolved name
      setResolvedNames(prev => ({ ...prev, [cacheKey]: name }));
      return name;
    } catch (error) {
      console.error(`Failed to resolve ${category} ID ${id}:`, error);
      return id;
    }
  };

  // Function to categorize employee details
  const categorizeEmployeeDetails = (employeeData) => {
    const categories = {
      personal: {},
      contact: {},
      employment: {},
      professional: {},
      financial: {},
      system: {},
      other: {}
    };

    Object.entries(employeeData).forEach(([key, value]) => {
      const keyLower = key.toLowerCase();
      
      // Personal Information
      if (keyLower.includes('first') || keyLower.includes('last') || keyLower.includes('name') || 
          keyLower.includes('gender') || keyLower.includes('dob') || keyLower.includes('birth') || 
          keyLower.includes('age') || keyLower.includes('blood') || keyLower.includes('religion') || 
          keyLower.includes('marital') || keyLower.includes('nationality')) {
        // Check if this is an ID field that needs resolution
        if (keyLower.includes('id') && value) {
          categories.personal[key] = { 
            type: 'id', 
            value: value, 
            category: keyLower.includes('blood') ? 'bloodgroup' :
                     keyLower.includes('gender') ? 'gender' :
                     keyLower.includes('religion') ? 'religion' : 'other'
          };
        } else {
          categories.personal[key] = value;
        }
      }
      // Contact Information
      else if (keyLower.includes('email') || keyLower.includes('phone') || keyLower.includes('mobile') || 
               keyLower.includes('address') || keyLower.includes('city') || keyLower.includes('state') || 
               keyLower.includes('country') || keyLower.includes('pin') || keyLower.includes('zip')) {
        // Check if this is an ID field that needs resolution
        if (keyLower.includes('id') && value) {
          categories.contact[key] = { 
            type: 'id', 
            value: value, 
            category: keyLower.includes('city') ? 'city' :
                     keyLower.includes('state') ? 'state' :
                     keyLower.includes('country') ? 'country' : 'other'
          };
        } else {
          categories.contact[key] = value;
        }
      }
      // Employment Information (including ID fields that need name resolution)
      else if (keyLower.includes('employee') || keyLower.includes('emp') || keyLower.includes('designation') || 
               keyLower.includes('department') || keyLower.includes('role') || keyLower.includes('join') || 
               keyLower.includes('hire') || keyLower.includes('work') || keyLower.includes('shift')) {
        // For ID fields, store both ID and key for name resolution
        if (keyLower.includes('id') && value) {
          categories.employment[key] = { 
            type: 'id', 
            value: value, 
            category: keyLower.includes('company') ? 'company' : 
                     keyLower.includes('school') ? 'school' :
                     keyLower.includes('designation') || keyLower.includes('desig') ? 'designation' :
                     keyLower.includes('department') || keyLower.includes('dept') ? 'department' :
                     keyLower.includes('role') ? 'role' : 'other'
          };
        } else {
          categories.employment[key] = value;
        }
      }
      // Professional Information
      else if (keyLower.includes('qualification') || keyLower.includes('education') || keyLower.includes('skill') || 
               keyLower.includes('experience') || keyLower.includes('certification') || keyLower.includes('training')) {
        categories.professional[key] = value;
      }
      // Financial Information
      else if (keyLower.includes('salary') || keyLower.includes('pay') || keyLower.includes('bank') || 
               keyLower.includes('account') || keyLower.includes('pan') || keyLower.includes('aadhaar')) {
        categories.financial[key] = value;
      }
      // System Information (including ID fields that need name resolution)
      else if (keyLower.includes('id') || keyLower.includes('code') || keyLower.includes('status') || 
               keyLower.includes('active') || keyLower.includes('created') || keyLower.includes('modified') || 
               keyLower.includes('user') || keyLower.includes('company') || keyLower.includes('school')) {
        // For ID fields, store both ID and key for name resolution
        if (keyLower.includes('id') && value) {
          categories.system[key] = { 
            type: 'id', 
            value: value, 
            category: keyLower.includes('company') ? 'company' : 
                     keyLower.includes('school') ? 'school' :
                     keyLower.includes('city') ? 'city' :
                     keyLower.includes('state') ? 'state' :
                     keyLower.includes('country') ? 'country' :
                     keyLower.includes('blood') ? 'bloodgroup' :
                     keyLower.includes('gender') ? 'gender' :
                     keyLower.includes('religion') ? 'religion' :
                     'other'
          };
        } else {
          categories.system[key] = value;
        }
      }
      // Other Information
      else {
        // Check if this is an ID field that needs resolution
        if (keyLower.includes('id') && value) {
          categories.other[key] = { 
            type: 'id', 
            value: value, 
            category: keyLower.includes('blood') ? 'bloodgroup' :
                     keyLower.includes('gender') ? 'gender' :
                     keyLower.includes('religion') ? 'religion' :
                     keyLower.includes('company') ? 'company' :
                     keyLower.includes('school') ? 'school' : 'other'
          };
        } else {
          categories.other[key] = value;
        }
      }
    });

    return categories;
  };

  // Function to categorize privileges
  const categorizePrivileges = (privileges) => {
    const categories = {
      all: [],
      student: [],
      employee: [],
      attendance: [],
      fees: [],
      academic: [],
      library: [],
      reports: [],
      timetable: [],
      system: [],
      other: []
    };

    privileges.forEach(privilege => {
      const privilegeLower = privilege.toLowerCase();
      
      // Add to all categories
      categories.all.push(privilege);
      
      // Categorize based on keywords
      if (privilegeLower.includes('student')) {
        categories.student.push(privilege);
      } else if (privilegeLower.includes('emp') || privilegeLower.includes('employee') || privilegeLower.includes('salary')) {
        categories.employee.push(privilege);
      } else if (privilegeLower.includes('attendance')) {
        categories.attendance.push(privilege);
      } else if (privilegeLower.includes('fees') || privilegeLower.includes('payment')) {
        categories.fees.push(privilege);
      } else if (privilegeLower.includes('class') || privilegeLower.includes('subject') || privilegeLower.includes('section') || 
                 privilegeLower.includes('grade') || privilegeLower.includes('exam') || privilegeLower.includes('marks')) {
        categories.academic.push(privilege);
      } else if (privilegeLower.includes('book') || privilegeLower.includes('library') || privilegeLower.includes('author') || 
                 privilegeLower.includes('publisher')) {
        categories.library.push(privilege);
      } else if (privilegeLower.includes('report') || privilegeLower.includes('history') || privilegeLower.includes('summary')) {
        categories.reports.push(privilege);
      } else if (privilegeLower.includes('timetable') || privilegeLower.includes('time table') || privilegeLower.includes('substitution')) {
        categories.timetable.push(privilege);
      } else if (privilegeLower.includes('manage') || privilegeLower.includes('generate') || privilegeLower.includes('edit') || 
                 privilegeLower.includes('delete') || privilegeLower.includes('create')) {
        categories.system.push(privilege);
      } else {
        categories.other.push(privilege);
      }
    });

    return categories;
  };

  // Function to render field with ID resolution
  const renderFieldWithIdResolution = async (key, value) => {
    // Check if this is an ID field that needs resolution
    if (typeof value === 'object' && value?.type === 'id') {
      const resolvedName = await resolveIdToName(value.category, value.value);
      return (
        <div className="col-md-6 mb-3" key={key}>
          <label className="form-label fw-bold">{key}:</label>
          <p className="form-control-plaintext">
            {resolvedName}
            <small className="text-muted ms-2">({value.value})</small>
          </p>
        </div>
      );
    }
    
    // Regular field rendering
    return renderField(key, value);
  };

  // Component to handle async field rendering with ID resolution
  const EmployeeFieldDisplay = ({ fieldKey, value }) => {
    const [resolvedValue, setResolvedValue] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const resolveValue = async () => {
        if (typeof value === 'object' && value?.type === 'id') {
          try {
            const resolvedName = await resolveIdToName(value.category, value.value);
            setResolvedValue(resolvedName);
          } catch (error) {
            console.error('Error resolving ID:', error);
            setResolvedValue(value.value);
          }
        } else {
          setResolvedValue(value);
        }
        setLoading(false);
      };

      resolveValue();
    }, [value]);

    if (loading) {
      return (
        <div className="col-md-6 mb-3" key={fieldKey}>
          <label className="form-label fw-bold">{fieldKey}:</label>
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    // Handle date formatting
    if (fieldKey.toLowerCase().includes('date') && resolvedValue) {
      try {
        const dateValue = new Date(resolvedValue);
        return (
          <div className="col-md-6 mb-3" key={fieldKey}>
            <label className="form-label fw-bold">{fieldKey}:</label>
            <p className="form-control-plaintext">
              {dateValue.toLocaleDateString() + ' ' + dateValue.toLocaleTimeString()}
            </p>
          </div>
        );
      } catch (e) {
        // Fall through to regular display
      }
    }

    // Handle boolean values
    if (typeof resolvedValue === 'boolean') {
      return (
        <div className="col-md-6 mb-3" key={fieldKey}>
          <label className="form-label fw-bold">{fieldKey}:</label>
          <p className="form-control-plaintext">
            <span className={`badge ${resolvedValue ? 'bg-success' : 'bg-danger'}`}>
              {resolvedValue ? 'Yes' : 'No'}
            </span>
          </p>
        </div>
      );
    }

    // Handle resolved ID fields
    if (typeof value === 'object' && value?.type === 'id') {
      return (
        <div className="col-md-6 mb-3" key={fieldKey}>
          <label className="form-label fw-bold">{fieldKey}:</label>
          <p className="form-control-plaintext">
            <span className="text-primary fw-bold">{resolvedValue}</span>
            <small className="text-muted ms-2">(ID: {value.value})</small>
          </p>
        </div>
      );
    }

    // Regular fields
    return (
      <div className="col-md-6 mb-3" key={fieldKey}>
        <label className="form-label fw-bold">{fieldKey}:</label>
        <p className="form-control-plaintext">{resolvedValue}</p>
      </div>
    );
  };

  // Function to render all fields from an object
  const renderAllFields = (data, title) => {
    if (!data || typeof data !== 'object') return null;
    
    const entries = Object.entries(data);
    
    // Check if this is employee details (for tabbed display)
    const isEmployeeDetails = title.toLowerCase().includes('employee') || title.toLowerCase().includes('userdetails');
    
    // Check if any of the entries contain privileges array
    let privilegesArray = null;
    let privilegesKey = null;
    
    entries.forEach(([key, value]) => {
      if (Array.isArray(value) && (
        key.toLowerCase().includes('privilege') || 
        key.toLowerCase().includes('permission') ||
        key.toLowerCase().includes('right')
      )) {
        privilegesArray = value;
        privilegesKey = key;
      }
    });
    
    // If privileges array is found, display with tabs
    if (privilegesArray && privilegesArray.length > 0) {
      const categories = categorizePrivileges(privilegesArray);
      
      return (
        <div className="card mt-3">
          <div className="card-header bg-info text-white">
            <h5 className="mb-0">
              <i className="bi bi-database me-2"></i>
              {privilegesKey}
              <span className="badge bg-light text-dark ms-2">
                {privilegesArray.length} items
              </span>
            </h5>
          </div>
          <div className="card-body">
            {/* Tabs Navigation */}
            <ul className="nav nav-tabs mb-3" role="tablist">
              {Object.entries(categories).map(([key, privileges]) => (
                <li className="nav-item" key={key}>
                  <button
                    className={`nav-link ${activePrivilegeTab === key ? 'active' : ''}`}
                    onClick={() => setActivePrivilegeTab(key)}
                    type="button"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <span className="badge bg-secondary ms-1">{privileges.length}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Tab Content */}
            <div className="tab-content">
              <div className="tab-pane fade show active">
                <div className="row">
                  {categories[activePrivilegeTab].map((privilege, index) => (
                    <div className="col-md-6 mb-3" key={index}>
                      <div className="card">
                        <div className="card-body">
                          <h6 className="card-title">
                            <i className="bi bi-check-circle text-success me-2"></i>
                            {privilege}
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {categories[activePrivilegeTab].length === 0 && (
                  <div className="text-center py-4">
                    <i className="bi bi-inbox display-4 text-muted"></i>
                    <p className="text-muted mt-3">No privileges in this category</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // If this is employee details, display with categorized tabs
    if (isEmployeeDetails && !privilegesArray) {
      const categories = categorizeEmployeeDetails(data);
      
      return (
        <div className="card mt-3">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">
              <i className="bi bi-person-badge me-2"></i>
              {title}
              <span className="badge bg-light text-dark ms-2">
                {Object.keys(data).length} fields
              </span>
            </h5>
          </div>
          <div className="card-body">
            {/* Tabs Navigation */}
            <ul className="nav nav-tabs mb-3" role="tablist">
              {Object.entries(categories).map(([key, fields]) => (
                <li className="nav-item" key={key}>
                  <button
                    className={`nav-link ${activeEmployeeTab === key ? 'active' : ''}`}
                    onClick={() => setActiveEmployeeTab(key)}
                    type="button"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <span className="badge bg-secondary ms-1">{Object.keys(fields).length}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Tab Content */}
            <div className="tab-content">
              <div className="tab-pane fade show active">
                <div className="row">
                  {Object.entries(categories[activeEmployeeTab]).map(([key, value]) => (
                    <EmployeeFieldDisplay key={key} fieldKey={key} value={value} />
                  ))}
                </div>
                {Object.keys(categories[activeEmployeeTab]).length === 0 && (
                  <div className="text-center py-4">
                    <i className="bi bi-inbox display-4 text-muted"></i>
                    <p className="text-muted mt-3">No fields in this category</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="card mt-3">
        <div className="card-header bg-info text-white">
          <h5 className="mb-0">
            <i className="bi bi-database me-2"></i>
            {title}
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            {entries.map(([key, value]) => {
              // Skip privileges array since we handled it above
              if (Array.isArray(value) && (
                key.toLowerCase().includes('privilege') || 
                key.toLowerCase().includes('permission') ||
                key.toLowerCase().includes('right')
              )) {
                return null;
              }
              
              // Skip complex objects and arrays for simple display
              if (typeof value === 'object' && value !== null) {
                return (
                  <div className="col-12 mb-3" key={key}>
                    <label className="form-label fw-bold">{key}:</label>
                    <div className="alert alert-secondary">
                      <pre className="mb-0 small">{JSON.stringify(value, null, 2)}</pre>
                    </div>
                  </div>
                );
              }
              
              // For ID fields, try to display names instead
              if (key.toLowerCase().includes('id') && value) {
                // Skip ID display as they're shown in organization section
                return null;
              }
              
              // Format dates
              if (key.toLowerCase().includes('date') && value) {
                try {
                  const dateValue = new Date(value);
                  return renderField(
                    key, 
                    dateValue.toLocaleDateString() + ' ' + dateValue.toLocaleTimeString()
                  );
                } catch (e) {
                  return renderField(key, value);
                }
              }
              
              // Format boolean values
              if (typeof value === 'boolean') {
                return renderField(key, value ? 'Yes' : 'No');
              }
              
              // Regular fields
              return renderField(key, value);
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>My Profile</h2>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-person-circle me-2"></i>
                User Information
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Username:</label>
                  <p className="form-control-plaintext">{user.userName || 'N/A'}</p>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Email:</label>
                  <p className="form-control-plaintext">
                    {user.email || user.Email || user.emailAddress || user.userEmail || user.userName || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">First Name:</label>
                  <p className="form-control-plaintext">{user.firstName || 'N/A'}</p>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Last Name:</label>
                  <p className="form-control-plaintext">{user.lastName || 'N/A'}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Role:</label>
                  <p className="form-control-plaintext">
                    <span className="badge bg-info">{user.userRole || 'N/A'}</span>
                  </p>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Status:</label>
                  <p className="form-control-plaintext">
                    <span className={`badge ${user.isActive ? 'bg-success' : 'bg-danger'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                </div>
              </div>

              {user.phoneNumber && (
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Phone Number:</label>
                    <p className="form-control-plaintext">{user.phoneNumber}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive User Details Section */}
      {renderAllFields(user, 'Authentication User Details')}
      
      {/* Employee Details Section */}
      {renderAllFields(employeeDetails, 'Employee Details (UserDetails Table)')}
    </div>
  );
};

export default MyProfile;
