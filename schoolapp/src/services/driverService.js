import apiService from './api';

const driverService = {
  getAll: async () => {
    try {
      return await apiService.get('/DriverMaster');
    } catch (error) {
      console.error('Error fetching drivers:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      return await apiService.get(`/DriverMaster/${id}`);
    } catch (error) {
      console.error('Error fetching driver:', error);
      throw error;
    }
  },

  create: async (driverData) => {
    try {
      return await apiService.post('/DriverMaster', driverData);
    } catch (error) {
      console.error('Error creating driver:', error);
      throw error;
    }
  },

  update: async (id, driverData) => {
    try {
      return await apiService.put(`/DriverMaster/${id}`, driverData);
    } catch (error) {
      console.error('Error updating driver:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await apiService.delete(`/DriverMaster/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting driver:', error);
      throw error;
    }
  },
};

export default driverService;
