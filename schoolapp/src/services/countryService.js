import api from './authService';

export const countryService = {
  async getAll() {
    try {
      const response = await api.get('/country');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch countries' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/country/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch country' };
    }
  },

  async create(countryData) {
    try {
      const response = await api.post('/country', countryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create country' };
    }
  },

  async update(id, countryData) {
    try {
      const response = await api.put(`/country/${id}`, countryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update country' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/country/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete country' };
    }
  }
};
