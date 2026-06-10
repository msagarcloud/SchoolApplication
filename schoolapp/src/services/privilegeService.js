import api from './authService';

export const privilegeService = {
  async getAll() {
    try {
      const response = await api.get('/privilege');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch privileges' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/privilege/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch privilege' };
    }
  },

  async create(privilegeData) {
    try {
      const response = await api.post('/privilege', privilegeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create privilege' };
    }
  },

  async update(id, privilegeData) {
    try {
      const response = await api.put(`/privilege/${id}`, privilegeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update privilege' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/privilege/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete privilege' };
    }
  }
};
