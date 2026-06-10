import api from './authService';

export const classService = {
  async getAll() {
    try {
      const response = await api.get('/class');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch classes' };
    }
  },

  async getBySchoolId(schoolId) {
    try {
      console.log('Fetching classes by schoolId:', schoolId);
      const response = await api.get(`/class/school/${schoolId}`);
      console.log('Classes by school response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching classes by school:', error);
      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_CONNECTION_REFUSED') {
        throw new Error('Unable to connect to API server. Please ensure API is running on http://localhost:5260');
      }
      if (error.response) {
        console.error('API Error Response:', error.response.data);
        throw error.response.data || { message: 'Failed to fetch classes by school' };
      }
      throw { message: 'Failed to fetch classes by school', details: error.message };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/class/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch class' };
    }
  },

  async create(classData) {
    try {
      const response = await api.post('/class', classData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create class' };
    }
  },

  async update(id, classData) {
    try {
      const response = await api.put(`/class/${id}`, classData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update class' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/class/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete class' };
    }
  }
};
