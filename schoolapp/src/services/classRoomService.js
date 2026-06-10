import api from './authService';

export const classRoomService = {
  async getAll() {
    try {
      const response = await api.get('/classroom');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch classrooms' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/classroom/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch classroom' };
    }
  },

  async create(classRoomData) {
    try {
      const response = await api.post('/classroom', classRoomData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create classroom' };
    }
  },

  async update(id, classRoomData) {
    try {
      const response = await api.put(`/classroom/${id}`, classRoomData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update classroom' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/classroom/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete classroom' };
    }
  }
};
