import api from './authService';

export const privilegeService = {
  async getAll() {
    try {
      const response = await api.get('/Privilege');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch privileges' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/Privilege/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch privilege' };
    }
  },

  async create(privilegeData) {
    try {
      const response = await api.post('/Privilege', privilegeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create privilege' };
    }
  },

  async update(id, privilegeData) {
    try {
      const response = await api.put(`/Privilege/${id}`, privilegeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update privilege' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/Privilege/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete privilege' };
    }
  }
};


