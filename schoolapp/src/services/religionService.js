import api from './authService';

const religionService = {
  // Get all religions
  getAll: async () => {
    try {
      const response = await api.get('/religion');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch religions');
    }
  },

  // Get religion by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/religion/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch religion');
    }
  },

  // Create new religion
  create: async (religionData) => {
    try {
      const response = await api.post('/religion', religionData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create religion');
    }
  },

  // Update religion
  update: async (id, religionData) => {
    try {
      const response = await api.put(`/religion/${id}`, religionData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update religion');
    }
  },

  // Delete religion
  delete: async (id) => {
    try {
      await api.delete(`/religion/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete religion');
    }
  }
};

export { religionService };
