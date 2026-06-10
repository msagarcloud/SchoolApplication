import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { employeeService } from '../../services/employeeService';
import { categoryService } from '../../services/categoryService';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import EmpMaster from './tabs/EmpMaster';
import EmpProfQualiDetails from './tabs/EmpProfQualiDetails';
import EmpDocumentDetails from './tabs/EmpDocumentDetails';
import EmpLeaveDetails from './tabs/EmpLeaveDetails';
import EmpSalaryMaster from './tabs/EmpSalaryMaster';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [employee, setEmployee] = useState({
    salutation: '',
    firstName: '',
    lastName: '',
    fathersName: '',
    mothersName: '',
    dob: '',
    doj: '',
    probationStartDate: '',
    probationPeriod: '',
    confirmationDate: '',
    dateOfLeaving: '',
    pannumber: '',
    esicnumber: '',
    pfnumeber: '',
    currentAddress1: '',
    currentAddress2: '',
    currentCityId: '',
    currentStateId: '',
    currentCountryId: '',
    currentZipCode: '',
    permanentAddress1: '',
    permanentAddress2: '',
    permanentCityId: '',
    permanentStateId: '',
    permanentCountryId: '',
    permanentZipCode: '',
    phoneNumber: '',
    mobileNumber: '',
    emailId: '',
    departmentId: '',
    designationId: '',
    paymentModeId: '',
    employeeTypeId: '',
    categoryId: '',
    bankAccountNumber: '',
    bankName: '',
    genderId: '',
    bloodGroupId: '',
    gradeId: '',
    image: '',
    employeeOldId: '',
    description: '',
    licenceNumber: '',
    licenceIssueDate: '',
    licenceValidUpto: '',
    licenceDescription: '',
    licenceImage: '',
    licenceType: '',
    maritalStatus: '',
    yearsOfExperience: '',
    previoudSchoolCompany: '',
    aadhaarNumber: '',
    mathUpToClass: '',
    englishUptoClass: '',
    sstuptoClass: '',
    isActive: true,
    isDeleted: false,
    status: '',
    statusMessage: '',
    companyId: '',
    schoolId: ''
  });

  const [salaryData, setSalaryData] = useState(null);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('master');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchEmployee();
    }
    
    // Auto-populate CompanyId and SchoolId from session
    const companyId = sessionStorage.getItem('companyId') || localStorage.getItem('companyId');
    const schoolId = sessionStorage.getItem('schoolId') || localStorage.getItem('schoolId');
    
    if (companyId || schoolId) {
      setEmployee(prev => ({
        ...prev,
        companyId: companyId || '',
        schoolId: schoolId || ''
      }));
    }
  }, [id, isEdit]);

  const fetchCategories = async () => {
    try {
      console.log('Fetching categories...');
      const data = await categoryService.getAll();
      console.log('Categories received:', data);
      console.log('Categories count:', data?.length || 0);
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      console.error('Category fetch error details:', err);
    }
  };

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const data = await employeeService.getById(id);
      setEmployee(data);
      
      // Also fetch salary data for edit mode
      try {
        console.log('Fetching salary data for employee edit:', id);
        const salaryInfo = await employeeService.getSalaryMaster(id);
        console.log('Salary data received for edit:', salaryInfo);
        setSalaryData(salaryInfo);
      } catch (salaryErr) {
        console.log('No salary data found for employee:', salaryErr);
        setSalaryData(null);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch employee details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployee(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const transformEmployeeData = (employeeData, isEditMode = false) => {
    // Convert camelCase to PascalCase and ensure required fields
    const transformed = {};
    
    // Salary-related fields that should not be sent to employee update endpoint
    const salaryFields = [
      'basicSalary', 'hra', 'da', 'conveyance', 'medical', 'specialAllowance',
      'grossSalary', 'pfDeduction', 'esiDeduction', 'professionalTax', 
      'incomeTax', 'totalDeductions', 'totalEarnings', 'netSalary',
      'salaryHistory', 'salaryPaymentDate', 'paymentMode'
    ];
    
    // Map frontend camelCase to backend PascalCase
    Object.keys(employeeData).forEach(key => {
      // Skip salary fields during employee update
      if (isEditMode && salaryFields.includes(key)) {
        console.log(`Skipping salary field during employee update: ${key}`);
        return;
      }
      
      if (key === 'companyId' || key === 'schoolId') {
        transformed[key.charAt(0).toUpperCase() + key.slice(1)] = employeeData[key];
      } else if (key === 'doj') {
        transformed['Doj'] = employeeData[key];
      } else if (key === 'dob') {
        transformed['Dob'] = employeeData[key];
      } else if (key === 'pfnumeber') {
        transformed['Pfnumeber'] = employeeData[key];
      } else if (key === 'pannumber') {
        transformed['Pannumber'] = employeeData[key];
      } else if (key === 'esicnumber') {
        transformed['Esicnumber'] = employeeData[key];
      } else if (key === 'emailId') {
        transformed['EmailId'] = employeeData[key];
      } else if (key === 'phoneNumber') {
        transformed['PhoneNumber'] = employeeData[key];
      } else if (key === 'mobileNumber') {
        transformed['MobileNumber'] = employeeData[key];
      } else if (key === 'fathersName') {
        transformed['FathersName'] = employeeData[key];
      } else if (key === 'mothersName') {
        transformed['MothersName'] = employeeData[key];
      } else if (key === 'employeeOldId') {
        transformed['EmployeeOldId'] = employeeData[key];
      } else if (key === 'employeeCode') {
        transformed['EmployeeCode'] = employeeData[key];
      } else if (key === 'licenceNumber') {
        transformed['LicenceNumber'] = employeeData[key];
      } else if (key === 'licenceIssueDate') {
        transformed['LicenceIssueDate'] = employeeData[key];
      } else if (key === 'licenceValidUpto') {
        transformed['LicenceValidUpto'] = employeeData[key];
      } else if (key === 'licenceDescription') {
        transformed['LicenceDescription'] = employeeData[key];
      } else if (key === 'licenceImage') {
        transformed['LicenceImage'] = employeeData[key];
      } else if (key === 'licenceType') {
        transformed['LicenceType'] = employeeData[key];
      } else if (key === 'salutation') {
        transformed['Salutation'] = employeeData[key];
      } else if (key === 'dateOfLeaving') {
        transformed['DateOfLeaving'] = employeeData[key];
      } else if (key === 'maritalStatus') {
        transformed['MaritalStatus'] = employeeData[key];
      } else if (key === 'yearsOfExperience') {
        transformed['YearsOfExperience'] = employeeData[key];
      } else if (key === 'previoudSchoolCompany') {
        transformed['PrevioudSchoolCompany'] = employeeData[key];
      } else if (key === 'aadhaarNumber') {
        transformed['AadhaarNumber'] = employeeData[key];
      } else if (key === 'mathUpToClass') {
        transformed['MathUpToClass'] = employeeData[key];
      } else if (key === 'englishUptoClass') {
        transformed['EnglishUptoClass'] = employeeData[key];
      } else if (key === 'sstuptoClass') {
        transformed['SstuptoClass'] = employeeData[key];
      } else if (key === 'companyId') {
        transformed['CompanyId'] = employeeData[key];
      } else if (key === 'schoolId') {
        transformed['SchoolId'] = employeeData[key];
      } else if (key === 'probationStartDate') {
        transformed['ProbationStartDate'] = employeeData[key];
      } else if (key === 'probationPeriod') {
        transformed['ProbationPeriod'] = employeeData[key];
      } else if (key === 'confirmationDate') {
        transformed['ConfirmationDate'] = employeeData[key];
      } else if (key === 'currentAddress1') {
        transformed['CurrentAddress1'] = employeeData[key];
      } else if (key === 'currentAddress2') {
        transformed['CurrentAddress2'] = employeeData[key];
      } else if (key === 'currentCityId') {
        transformed['CurrentCityId'] = employeeData[key];
      } else if (key === 'currentStateId') {
        transformed['CurrentStateId'] = employeeData[key];
      } else if (key === 'currentCountryId') {
        transformed['CurrentCountryId'] = employeeData[key];
      } else if (key === 'currentZipCode') {
        transformed['CurrentZipCode'] = employeeData[key];
      } else if (key === 'permanentAddress1') {
        transformed['PermanentAddress1'] = employeeData[key];
      } else if (key === 'permanentAddress2') {
        transformed['PermanentAddress2'] = employeeData[key];
      } else if (key === 'permanentCityId') {
        transformed['PermanentCityId'] = employeeData[key];
      } else if (key === 'permanentStateId') {
        transformed['PermanentStateId'] = employeeData[key];
      } else if (key === 'permanentCountryId') {
        transformed['PermanentCountryId'] = employeeData[key];
      } else if (key === 'permanentZipCode') {
        transformed['PermanentZipCode'] = employeeData[key];
      } else if (key === 'departmentId') {
        transformed['DepartmentId'] = employeeData[key];
      } else if (key === 'designationId') {
        transformed['DesignationId'] = employeeData[key];
      } else if (key === 'paymentModeId') {
        transformed['PaymentModeId'] = employeeData[key];
      } else if (key === 'employeeTypeId') {
        transformed['EmployeeTypeId'] = employeeData[key];
      } else if (key === 'categoryId') {
        transformed['CategoryId'] = employeeData[key];
      } else if (key === 'bankAccountNumber') {
        transformed['BankAccountNumber'] = employeeData[key];
      } else if (key === 'bankName') {
        transformed['BankName'] = employeeData[key];
      } else if (key === 'genderId') {
        transformed['GenderId'] = employeeData[key];
      } else if (key === 'bloodGroupId') {
        transformed['BloodGroupId'] = employeeData[key];
      } else if (key === 'gradeId') {
        transformed['GradeId'] = employeeData[key];
      } else if (key === 'image') {
        transformed['Image'] = employeeData[key];
      } else if (key === 'description') {
        transformed['Description'] = employeeData[key];
      } else if (key === 'maritalStatus') {
        transformed['MaritalStatus'] = employeeData[key];
      } else if (key === 'isActive') {
        transformed['IsActive'] = employeeData[key];
      } else {
        // For other fields, just capitalize first letter
        transformed[key.charAt(0).toUpperCase() + key.slice(1)] = employeeData[key];
      }
    });

    // Set default values for required fields if not provided - prioritize session storage
    if (!transformed.CompanyId) {
      transformed.CompanyId = sessionStorage.getItem('companyId') || localStorage.getItem('companyId') || '00000000-0000-0000-0000-000000000001';
    }
    if (!transformed.SchoolId) {
      transformed.SchoolId = sessionStorage.getItem('schoolId') || localStorage.getItem('schoolId') || '00000000-0000-0000-0000-000000000001';
    }

    return transformed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      // Validate required fields
      if (!employee.firstName || !employee.lastName || !employee.doj || !employee.emailId) {
        setError('Please fill in all required fields (First Name, Last Name, Date of Joining, Email)');
        return;
      }

      // Transform data to match backend expectations
      const transformedData = transformEmployeeData(employee, isEdit);
      
      console.log('Submit mode:', isEdit ? 'UPDATE' : 'CREATE');
      console.log('Original employee data:', employee);
      console.log('Transformed data for API:', transformedData);
      
      if (isEdit) {
        console.log('Calling update API with ID:', id);
        console.log('Update payload:', transformedData);
        console.log('API URL:', process.env.REACT_APP_API_URL || 'http://localhost:5260/api');
        try {
          const response = await employeeService.update(id, transformedData);
          console.log('Update API response:', response);
        } catch (apiError) {
          console.error('Update API call failed:', apiError);
          throw apiError;
        }
      } else {
        console.log('Calling create API');
        console.log('Create payload:', transformedData);
        console.log('API URL:', process.env.REACT_APP_API_URL || 'http://localhost:5260/api');
        try {
          const response = await employeeService.create(transformedData);
          console.log('Create API response:', response);
        } catch (apiError) {
          console.error('Create API call failed:', apiError);
          throw apiError;
        }
      }
      
      navigate('/employees');
    } catch (err) {
      console.error('Employee operation error:', err);
      console.error('Error response:', err.response);
      console.error('Error status:', err.response?.status);
      console.error('Error data:', err.response?.data);
      setError(err.response?.data?.message || err.message || `Failed to ${isEdit ? 'update' : 'create'} employee`);
    } finally {
      setLoading(false);
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
          <h2>{isEdit ? 'Edit Employee' : 'Create New Employee'}</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/employees">Employees</Link>
              </li>
              <li className="breadcrumb-item active">
                {isEdit ? 'Edit' : 'Create'}
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/employees" className="btn btn-outline-secondary me-2">
            <i className="bi bi-x-lg me-2"></i>
            Cancel
          </Link>
          <button 
            type="submit" 
            form="employee-form"
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
        <form id="employee-form" onSubmit={handleSubmit}>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
            id="employee-form-tabs"
          >
            <Tab eventKey="master" title="Employee Master">
              <EmpMaster 
                employeeData={employee}
                categories={categories}
                onInputChange={handleInputChange}
                isEdit={isEdit}
              />
            </Tab>
                        <Tab eventKey="professional" title="Professional Qualifications">
              <EmpProfQualiDetails 
                employeeData={employee}
                onInputChange={handleInputChange}
              />
            </Tab>
            <Tab eventKey="documents" title="Documents">
              <EmpDocumentDetails 
                employeeData={employee}
                onInputChange={handleInputChange}
              />
            </Tab>
            <Tab eventKey="leave" title="Leave Details">
              <EmpLeaveDetails 
                employeeData={employee}
                onInputChange={handleInputChange}
              />
            </Tab>
            <Tab eventKey="salary" title="Salary Master">
              <EmpSalaryMaster 
                employeeData={{...employee, ...salaryData}}
                onInputChange={handleInputChange}
              />
            </Tab>
                      </Tabs>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
