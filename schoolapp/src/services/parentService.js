import api from './authService';

const parentService = {
  // Get all parents
  getAll: async () => {
    try {
      const response = await api.get('/parent');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch parents');
    }
  },

  // Get parent by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/parent/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch parent');
    }
  },

  // Get parents by student ID
  getByStudentId: async (studentId) => {
    try {
      const response = await api.get(`/parent/student/${studentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch parents for student');
    }
  },

  // Create new parent
  create: async (parentData) => {
    try {
      const response = await api.post('/parent', parentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create parent');
    }
  },

  // Update parent
  update: async (id, parentData) => {
    try {
      const response = await api.put(`/parent/${id}`, parentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update parent');
    }
  },

  // Delete parent
  delete: async (id) => {
    try {
      await api.delete(`/parent/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete parent');
    }
  }
};

export { parentService };
