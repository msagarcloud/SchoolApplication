import api from './authService';

const studentService = {
  // Get all students
  getAll: async () => {
    try {
      const response = await api.get('/student');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch students');
    }
  },

  // Get student by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/student/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch student');
    }
  },

  // Create new student
  create: async (studentData) => {
    try {
      const response = await api.post('/student', studentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create student');
    }
  },

  // Update student
  update: async (id, studentData) => {
    try {
      const response = await api.put(`/student/${id}`, studentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update student');
    }
  },

  // Delete student
  delete: async (id) => {
    try {
      await api.delete(`/student/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete student');
    }
  },

  // Search students
  search: async (searchParams) => {
    try {
      const response = await api.get('/student/search', { params: searchParams });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search students');
    }
  },

  // Get student statistics
  getStatistics: async () => {
    try {
      const response = await api.get('/student/statistics');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch student statistics');
    }
  },

  // Export students
  export: async (format = 'excel') => {
    try {
      const response = await api.get(`/student/export?format=${format}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to export students');
    }
  }
};

export { studentService };
