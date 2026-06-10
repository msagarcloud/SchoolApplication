import api from './authService';

export const sectionService = {
  async getAll() {
    try {
      const response = await api.get('/section');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch sections' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/section/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch section' };
    }
  },

  async create(sectionData) {
    try {
      const response = await api.post('/section', sectionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create section' };
    }
  },

  async update(id, sectionData) {
    try {
      const response = await api.put(`/section/${id}`, sectionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update section' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/section/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete section' };
    }
  }
};
