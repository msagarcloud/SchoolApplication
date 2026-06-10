import api from './authService';

const transportAssignmentService = {
  // Get all transport assignments
  getAll: async () => {
    try {
      const response = await api.get('/TransportAssignment');
      return response.data;
    } catch (error) {
      console.error('Error fetching transport assignments:', error);
      throw error;
    }
  },

  // Get transport assignment by id
  getById: async (id) => {
    try {
      const response = await api.get(`/TransportAssignment/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching transport assignment:', error);
      throw error;
    }
  },

  // Create new transport assignment
  create: async (assignmentData) => {
    try {
      const response = await api.post('/TransportAssignment', assignmentData);
      return response.data;
    } catch (error) {
      console.error('Error creating transport assignment:', error);
      throw error;
    }
  },

  // Update transport assignment
  update: async (id, assignmentData) => {
    try {
      const response = await api.put(`/TransportAssignment/${id}`, assignmentData);
      return response.data;
    } catch (error) {
      console.error('Error updating transport assignment:', error);
      throw error;
    }
  },

  // Delete transport assignment
  delete: async (id) => {
    try {
      await api.delete(`/TransportAssignment/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting transport assignment:', error);
      throw error;
    }
  },

  // Get assignments by student
  getByStudent: async (studentId) => {
    try {
      const response = await api.get(`/TransportAssignment/by-student/${studentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching student assignments:', error);
      throw error;
    }
  },

  // Get assignments by vehicle
  getByVehicle: async (vehicleId) => {
    try {
      const response = await api.get(`/TransportAssignment/by-vehicle/${vehicleId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicle assignments:', error);
      throw error;
    }
  }
};

export default transportAssignmentService;
