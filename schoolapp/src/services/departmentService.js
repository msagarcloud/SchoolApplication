import api from './authService';

export const departmentService = {
  async getAll() {
    try {
      const response = await api.get('/dept');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch departments' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/dept/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch department' };
    }
  },

  async create(departmentData) {
    try {
      const response = await api.post('/dept', departmentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create department' };
    }
  },

  async update(id, departmentData) {
    try {
      const response = await api.put(`/dept/${id}`, departmentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update department' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/dept/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete department' };
    }
  }
};
