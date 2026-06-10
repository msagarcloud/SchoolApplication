import apiService from './api';

const timeTablePeriodService = {
  // Get all time table periods
  getAll: async () => {
    try {
      const response = await apiService.get('/TimeTablePeriod');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch time table periods');
    }
  },

  // Get time table period by ID
  getById: async (id) => {
    try {
      const response = await apiService.get(`/TimeTablePeriod/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch time table period');
    }
  },

  // Create new time table period
  create: async (periodData) => {
    try {
      const response = await apiService.post('/TimeTablePeriod', periodData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to create time table period');
    }
  },

  // Update time table period
  update: async (id, periodData) => {
    try {
      const response = await apiService.put(`/TimeTablePeriod/${id}`, periodData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update time table period');
    }
  },

  // Delete time table period
  delete: async (id) => {
    try {
      await apiService.delete(`/TimeTablePeriod/${id}`);
    } catch (error) {
      throw new Error(error.message || 'Failed to delete time table period');
    }
  }
};

export default timeTablePeriodService;
