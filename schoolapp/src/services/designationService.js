import api from './authService';

export const designationService = {
  async getAll() {
    try {
      const response = await api.get('/desig');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch designations' };
    }
  },

  async getByDepartmentId(departmentId) {
    try {
      console.log('Fetching designations for department:', departmentId);
      const response = await api.get(`/desig/bydepartment/${departmentId}`);
      console.log('Designations by department response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch designations by department:', error);
      throw error.response?.data || { message: 'Failed to fetch designations by department' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/desig/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch designation' };
    }
  },

  async create(designationData) {
    try {
      const response = await api.post('/desig', designationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create designation' };
    }
  },

  async update(id, designationData) {
    try {
      const response = await api.put(`/desig/${id}`, designationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update designation' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/desig/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete designation' };
    }
  }
};
