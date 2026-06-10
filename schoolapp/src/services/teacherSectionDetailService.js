import api from './authService';

export const teacherSectionDetailService = {
  async getAll() {
    try {
      const response = await api.get('/teachersectiondetail');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch teacher section details' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/teachersectiondetail/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch teacher section detail' };
    }
  },

  async create(teacherSectionDetailData) {
    try {
      // Get current user from session and add createdBy
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const dataWithUser = {
        ...teacherSectionDetailData,
        createdBy: currentUser.id || null
      };
      
      const response = await api.post('/teachersectiondetail', dataWithUser);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create teacher section detail' };
    }
  },

  async update(id, teacherSectionDetailData) {
    try {
      // Get current user from session and add modifiedBy
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const dataWithUser = {
        ...teacherSectionDetailData,
        modifiedBy: currentUser.id || null
      };
      
      const response = await api.put(`/teachersectiondetail/${id}`, dataWithUser);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update teacher section detail' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/teachersectiondetail/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete teacher section detail' };
    }
  }
};
