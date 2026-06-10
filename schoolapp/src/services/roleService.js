import api from './authService';

export const roleService = {
  async getAll() {
    try {
      const response = await api.get('/role');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch roles' };
    }
  },

  async getRolesByCompanyAndSchool(companyId, schoolId) {
    try {
      const response = await api.get(`/role/by-company-school/${companyId}/${schoolId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch roles by company and school' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/role/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch role' };
    }
  },

  async create(roleData) {
    try {
      // Get current user from session and add createdBy
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const dataWithUser = {
        ...roleData,
        createdBy: currentUser.id || null
      };
      
      const response = await api.post('/role', dataWithUser);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create role' };
    }
  },

  async update(id, roleData) {
    try {
      // Get current user from session and add modifiedBy
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const dataWithUser = {
        ...roleData,
        modifiedBy: currentUser.id || null
      };
      
      const response = await api.put(`/role/${id}`, dataWithUser);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update role' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/role/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete role' };
    }
  }
};
