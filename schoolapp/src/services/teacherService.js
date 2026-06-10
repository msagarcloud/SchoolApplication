import api from './authService';

export const teacherService = {
  async getAll() {
    try {
      const response = await api.get('/teachermaster');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch teachers' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/teachermaster/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch teacher' };
    }
  },

  async create(teacherData) {
    try {
      const response = await api.post('/teachermaster', teacherData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create teacher' };
    }
  },

  async update(id, teacherData) {
    try {
      const response = await api.put(`/teachermaster/${id}`, teacherData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update teacher' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/teachermaster/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete teacher' };
    }
  }
};
