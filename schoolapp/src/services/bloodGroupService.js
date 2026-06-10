import api from './authService';

export const bloodGroupService = {
  async getAll() {
    try {
      console.log('Making API call to /bloodgroup');
      const response = await api.get('/bloodgroup');
      console.log('Blood group API response:', response);
      console.log('Blood group API data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Blood group API error details:', error);
      console.error('Blood group API error response:', error.response);
      console.error('Blood group API error status:', error.response?.status);
      console.error('Blood group API error data:', error.response?.data);
      throw error.response?.data || { message: 'Failed to fetch blood groups' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/bloodgroup/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch blood group' };
    }
  },

  async create(bloodGroupData) {
    try {
      const response = await api.post('/bloodgroup', bloodGroupData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create blood group' };
    }
  },

  async update(id, bloodGroupData) {
    try {
      const response = await api.put(`/bloodgroup/${id}`, bloodGroupData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update blood group' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/bloodgroup/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete blood group' };
    }
  }
};
