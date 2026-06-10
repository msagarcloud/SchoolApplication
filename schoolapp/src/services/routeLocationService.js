import api from './authService';

const routeLocationService = {
  getAll: async () => {
    try {
      const response = await api.get('/RouteLocationMaster');
      return response.data;
    } catch (error) {
      console.error('Error fetching route locations:', error);
      throw error;
    }
  }
};

export default routeLocationService;
