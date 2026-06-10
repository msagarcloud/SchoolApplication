import api from './authService';

export const paymentModeService = {
  async getAll() {
    try {
      const response = await api.get('/paymentmode');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch payment modes' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/paymentmode/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch payment mode' };
    }
  },

  async create(paymentModeData) {
    try {
      const response = await api.post('/paymentmode', paymentModeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create payment mode' };
    }
  },

  async update(id, paymentModeData) {
    try {
      const response = await api.put(`/paymentmode/${id}`, paymentModeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update payment mode' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/paymentmode/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete payment mode' };
    }
  }
};
