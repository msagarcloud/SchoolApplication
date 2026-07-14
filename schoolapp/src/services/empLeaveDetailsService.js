import api from './authService';

// Backend base URL (from task): https://localhost:7200/api/EmployeeLeave
// We assume EmpLeaveDetails corresponds to the same resource name in backend.
export const empLeaveDetailsService = {
  async getAll() {
    try {
      const response = await api.get('/EmployeeLeave');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch employee leave details' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/EmployeeLeave/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch employee leave detail' };
    }
  },

  async create(payload) {
    try {
      const response = await api.post('/EmployeeLeave', payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create employee leave detail' };
    }
  },

  async update(id, payload) {
    try {
      const response = await api.put(`/EmployeeLeave/${id}`, payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update employee leave detail' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/EmployeeLeave/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete employee leave detail' };
    }
  }
};

