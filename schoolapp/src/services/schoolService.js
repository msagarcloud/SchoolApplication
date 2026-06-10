import api from './authService';

export const schoolService = {
  async getAll() {
    try {
      const response = await api.get('/school');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch schools' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/school/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch school' };
    }
  },

  async create(schoolData) {
    try {
      const response = await api.post('/school', schoolData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create school' };
    }
  },

  async update(id, schoolData) {
    try {
      const response = await api.put(`/school/${id}`, schoolData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update school' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/school/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete school' };
    }
  }
};
