import api from './authService';

const transportSettingService = {
  // Get all transport settings
  getAll: async () => {
    try {
      const response = await api.get('/TransportSetting');
      return response.data;
    } catch (error) {
      console.error('Error fetching transport settings:', error);
      throw error;
    }
  },

  // Get transport setting by id
  getById: async (id) => {
    try {
      const response = await api.get(`/TransportSetting/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching transport setting:', error);
      throw error;
    }
  },

  // Create new transport setting
  create: async (settingData) => {
    try {
      const response = await api.post('/TransportSetting', settingData);
      return response.data;
    } catch (error) {
      console.error('Error creating transport setting:', error);
      throw error;
    }
  },

  // Update transport setting
  update: async (id, settingData) => {
    try {
      const response = await api.put(`/TransportSetting/${id}`, settingData);
      return response.data;
    } catch (error) {
      console.error('Error updating transport setting:', error);
      throw error;
    }
  },

  // Delete transport setting
  delete: async (id) => {
    try {
      await api.delete(`/TransportSetting/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting transport setting:', error);
      throw error;
    }
  }
};

export default transportSettingService;
