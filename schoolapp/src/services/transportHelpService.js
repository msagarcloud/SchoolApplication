import api from './authService';

const transportHelpService = {
  // Get all transport help topics
  getAll: async () => {
    try {
      const response = await api.get('/TransportHelp');
      return response.data;
    } catch (error) {
      console.error('Error fetching transport help:', error);
      throw error;
    }
  },

  // Get transport help by id
  getById: async (id) => {
    try {
      const response = await api.get(`/TransportHelp/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching transport help:', error);
      throw error;
    }
  },

  // Create new transport help
  create: async (helpData) => {
    try {
      const response = await api.post('/TransportHelp', helpData);
      return response.data;
    } catch (error) {
      console.error('Error creating transport help:', error);
      throw error;
    }
  },

  // Update transport help
  update: async (id, helpData) => {
    try {
      const response = await api.put(`/TransportHelp/${id}`, helpData);
      return response.data;
    } catch (error) {
      console.error('Error updating transport help:', error);
      throw error;
    }
  },

  // Delete transport help
  delete: async (id) => {
    try {
      await api.delete(`/TransportHelp/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting transport help:', error);
      throw error;
    }
  }
};

export default transportHelpService;
