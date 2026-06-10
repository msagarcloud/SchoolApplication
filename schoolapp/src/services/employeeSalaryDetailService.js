import api from './authService';

export const employeeSalaryDetailService = {
  async getAll() {
    try {
      const response = await api.get('/employeesalarydetail');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch salary details' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/employeesalarydetail/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch salary detail' };
    }
  },

  async create(salaryData) {
    try {
      const response = await api.post('/employeesalarydetail', salaryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create salary record' };
    }
  },

  async update(id, salaryData) {
    try {
      const response = await api.put(`/employeesalarydetail/${id}`, salaryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update salary record' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/employeesalarydetail/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete salary record' };
    }
  },

  async getSalaryDetailsByEmployee(employeeId) {
    try {
      const response = await api.get(`/employeesalarydetail/employee/${employeeId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch employee salary details' };
    }
  },

  async getSalaryDetailsByMonth(month, year) {
    try {
      const response = await api.get(`/employeesalarydetail/month/${month}/year/${year}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch salary details for month/year' };
    }
  },

  async processSalary(id, processingData) {
    try {
      const response = await api.post(`/employeesalarydetail/${id}/process`, processingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to process salary' };
    }
  },

  async generatePayslip(id) {
    try {
      const response = await api.get(`/employeesalarydetail/${id}/payslip`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to generate payslip' };
    }
  },

  async bulkProcessSalary(month, year, processingData) {
    try {
      const response = await api.post(`/employeesalarydetail/bulk-process/${month}/${year}`, processingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to process bulk salary' };
    }
  }
};
