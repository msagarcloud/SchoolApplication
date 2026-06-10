import api from './authService';

export const gradeService = {
  async getAll() {
    try {
      const response = await api.get('/grade');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch grades' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/grade/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch grade' };
    }
  },

  async create(gradeData) {
    try {
      const response = await api.post('/grade', gradeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create grade' };
    }
  },

  async update(id, gradeData) {
    try {
      const response = await api.put(`/grade/${id}`, gradeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update grade' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/grade/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete grade' };
    }
  }
};
