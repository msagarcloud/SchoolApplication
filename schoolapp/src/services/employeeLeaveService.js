import api from './authService';

export const employeeLeaveService = {
  async getAll() {
    try {
      const response = await api.get('/employeeleave');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch employee leaves' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/employeeleave/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch leave request' };
    }
  },

  async create(leaveData) {
    try {
      const response = await api.post('/employeeleave', leaveData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create leave request' };
    }
  },

  async update(id, leaveData) {
    try {
      const response = await api.put(`/employeeleave/${id}`, leaveData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update leave request' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/employeeleave/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete leave request' };
    }
  },

  async approveLeave(id, approvalData) {
    try {
      const response = await api.post(`/employeeleave/${id}/approve`, approvalData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to approve leave request' };
    }
  },

  async rejectLeave(id, rejectionData) {
    try {
      const response = await api.post(`/employeeleave/${id}/reject`, rejectionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to reject leave request' };
    }
  }
};
