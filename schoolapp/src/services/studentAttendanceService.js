import api from './authService';

export const studentAttendanceService = {
  async getAll() {
    try {
      const response = await api.get('/StudentAttendanceDetails');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch student attendance' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/StudentAttendanceDetails/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch student attendance' };
    }
  },

  async create(attendanceData) {
    try {
      const response = await api.post('/StudentAttendanceDetails', attendanceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create student attendance' };
    }
  },

  async update(id, attendanceData) {
    try {
      const response = await api.put(`/StudentAttendanceDetails/${id}`, attendanceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update student attendance' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/StudentAttendanceDetails/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete student attendance' };
    }
  }
};
