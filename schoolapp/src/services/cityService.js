import api from './authService';

export const cityService = {
  async getAll() {
    try {
      const response = await api.get('/city');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch cities' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/city/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch city' };
    }
  },

  async getByStateId(stateId) {
    try {
      const response = await api.get(`/city/by-state/${stateId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch cities by state' };
    }
  },

  async create(cityData) {
    try {
      const response = await api.post('/city', cityData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create city' };
    }
  },

  async update(id, cityData) {
    try {
      const response = await api.put(`/city/${id}`, cityData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update city' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/city/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete city' };
    }
  }
};
