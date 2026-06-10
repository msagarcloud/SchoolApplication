import api from './authService';

const houseService = {
  // Get all houses
  getAll: async () => {
    try {
      const response = await api.get('/house');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch houses');
    }
  },

  // Get house by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/house/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch house');
    }
  },

  // Create new house
  create: async (houseData) => {
    try {
      const response = await api.post('/house', houseData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create house');
    }
  },

  // Update house
  update: async (id, houseData) => {
    try {
      const response = await api.put(`/house/${id}`, houseData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update house');
    }
  },

  // Delete house
  delete: async (id) => {
    try {
      await api.delete(`/house/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete house');
    }
  }
};

export { houseService };
