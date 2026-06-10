import api from './authService';

export const genderService = {
  async getAll() {
    try {
      console.log('Making API call to /gender');
      const response = await api.get('/gender');
      console.log('Gender API response:', response);
      console.log('Gender API data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Gender API error details:', error);
      console.error('Gender API error response:', error.response);
      console.error('Gender API error status:', error.response?.status);
      console.error('Gender API error data:', error.response?.data);
      throw error.response?.data || { message: 'Failed to fetch genders' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/gender/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch gender' };
    }
  },

  async create(genderData) {
    try {
      const response = await api.post('/gender', genderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create gender' };
    }
  },

  async update(id, genderData) {
    try {
      const response = await api.put(`/gender/${id}`, genderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update gender' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/gender/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete gender' };
    }
  }
};
