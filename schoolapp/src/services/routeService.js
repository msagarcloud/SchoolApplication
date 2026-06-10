import api from './authService';

const routeService = {
  // Get all routes
  getAll: async () => {
    try {
      const response = await api.get('/RouteMaster');
      return response.data;
    } catch (error) {
      console.error('Error fetching routes:', error);
      throw error;
    }
  },

  // Get route by id
  getById: async (id) => {
    try {
      const response = await api.get(`/RouteMaster/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching route:', error);
      throw error;
    }
  },

  // Create new route
  create: async (routeData) => {
    try {
      const response = await api.post('/RouteMaster', routeData);
      return response.data;
    } catch (error) {
      console.error('Error creating route:', error);
      throw error;
    }
  },

  // Update route
  update: async (id, routeData) => {
    try {
      const response = await api.put(`/RouteMaster/${id}`, routeData);
      return response.data;
    } catch (error) {
      console.error('Error updating route:', error);
      throw error;
    }
  },

  // Delete route
  delete: async (id) => {
    try {
      await api.delete(`/RouteMaster/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting route:', error);
      throw error;
    }
  }
};

export default routeService;
