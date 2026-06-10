import { authService } from './authService';
import api from './authService';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5260/api/';

// Use the configured API instance from authService which includes auth interceptors

const employeeService = {
  // Get all employees
  getAll: async () => {
    try {
      console.log('Making API call to /employee');
      const response = await api.get('/employee');
      console.log('API response received:', response);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch employees');
    }
  },

  // Get employee by ID
  getById: async (id) => {
    try {
      console.log(`Fetching employee with ID: ${id}`);
      const response = await api.get(`/employee/${id}`);
      console.log('Employee data received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching employee:', error);
      if (error.response?.status === 404) {
        throw new Error('Employee not found');
      } else if (error.response?.status === 401) {
        throw new Error('Authentication required - please login again');
      } else {
        throw new Error(error.response?.data?.message || 'Failed to fetch employee');
      }
    }
  },

  // Create new employee
  create: async (employeeData) => {
    try {
      const response = await api.post('/employee', employeeData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create employee');
    }
  },

  // Update employee
  update: async (id, employeeData) => {
    try {
      const response = await api.put(`/employee/${id}`, employeeData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update employee');
    }
  },

  // Delete employee
  delete: async (id) => {
    try {
      await api.delete(`/employee/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete employee');
    }
  },

  // Get employee documents
  getDocuments: async (employeeId) => {
    try {
      const response = await api.get(`/employeedocument/employee/${employeeId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch employee documents');
    }
  },

  // Upload employee document
  uploadDocument: async (employeeId, documentData) => {
    try {
      const formData = new FormData();
      formData.append('EmployeeId', employeeId);
      formData.append('DocumentFile', documentData.file);
      formData.append('DocumentType', documentData.documentType);
      formData.append('DocumentName', documentData.documentName);
      
      const response = await api.post(`/employeedocument/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload document');
    }
  },

  // Get employee leave records
  getLeaveRecords: async (employeeId) => {
    try {
      const response = await api.get(`/employeeleave/employee/${employeeId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch leave records');
    }
  },

  // Add leave record
  addLeaveRecord: async (leaveData) => {
    try {
      const response = await api.post('/employeeleave', leaveData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add leave record');
    }
  },

  // Get employee professional qualifications
  getProfessionalQualifications: async (employeeId) => {
    try {
      const response = await api.get(`/employeeprofessionalqualification/employee/${employeeId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch professional qualifications');
    }
  },

  // Add professional qualification
  addProfessionalQualification: async (qualificationData) => {
    try {
      const response = await api.post('/employeeprofessionalqualification', qualificationData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add professional qualification');
    }
  },

  // Get employee salary master
  getSalaryMaster: async (employeeId) => {
    try {
      const response = await api.get(`/employeesalarymaster/employee/${employeeId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch salary details');
    }
  },

  // Update salary master
  updateSalaryMaster: async (employeeId, salaryData) => {
    try {
      const response = await api.put(`/employeesalarymaster/employee/${employeeId}`, salaryData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update salary details');
    }
  },

  // Get employee salary structure
  getSalaryStructure: async (employeeId) => {
    try {
      const response = await api.get(`/employeesalarydetail/employee/${employeeId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch salary structure');
    }
  },

  // Update salary structure
  updateSalaryStructure: async (employeeId, structureData) => {
    try {
      const response = await api.put(`/employeesalarydetail/employee/${employeeId}`, structureData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update salary structure');
    }
  },

  // Search employees
  search: async (searchParams) => {
    try {
      const response = await api.get('/employee/search', { params: searchParams });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search employees');
    }
  },

  // Get employee statistics
  getStatistics: async () => {
    try {
      const response = await api.get('/employee/statistics');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch employee statistics');
    }
  },

  // Export employees
  export: async (format = 'excel') => {
    try {
      const response = await api.get('/employee/export?format=${format}', {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to export employees');
    }
  },

  // Get non-teaching staff only
  getNonTeachingStaff: async () => {
    try {
      console.log('Fetching non-teaching staff...');
      const response = await api.get('/employee');
      const allEmployees = response.data;
      
      // Filter to show only non-teaching staff
      // We'll consider non-teaching staff as those who don't have teaching-related designations
      const nonTeachingKeywords = [
        'teacher', 'principal', 'professor', 'lecturer', 'tutor', 'instructor',
        'academic', 'education', 'school head', 'vice principal', 'headmaster', 'headmistress'
      ];
      
      const nonTeachingEmployees = allEmployees.filter(employee => {
        const designation = (employee.designationName || employee.roleName || employee.role || '').toLowerCase();
        return !nonTeachingKeywords.some(keyword => designation.includes(keyword));
      });
      
      console.log('Non-teaching staff filtered:', nonTeachingEmployees);
      return nonTeachingEmployees;
    } catch (error) {
      console.error('API error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch non-teaching staff');
    }
  }
};

export { employeeService };
