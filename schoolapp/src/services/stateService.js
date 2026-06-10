import api from './authService';

export const stateService = {
  async getAll() {
    try {
      const response = await api.get('/state');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch states' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/state/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch state' };
    }
  },

  async getByCountryId(countryId) {
    try {
      const response = await api.get(`/state/by-country/${countryId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch states by country' };
    }
  },

  async create(stateData) {
    try {
      const response = await api.post('/state', stateData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create state' };
    }
  },

  async update(id, stateData) {
    try {
      const response = await api.put(`/state/${id}`, stateData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update state' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/state/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete state' };
    }
  }
};
