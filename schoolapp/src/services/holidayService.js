import api from './authService';

const getErrorMessage = (error, fallbackMessage) => {
  if (error.response) {
    const data = error.response.data;
    if (!data) {
      return fallbackMessage;
    }
    if (typeof data === 'string') {
      return data;
    }
    if (data.message) {
      return data.message;
    }
    if (data.error) {
      return data.error;
    }
    return JSON.stringify(data);
  }
  if (error.request) {
    return 'No response from server. Please check your network connection.';
  }
  return error.message || fallbackMessage;
};

export const holidayService = {
  async getAll() {
    try {
      const response = await api.get('/holiday');
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Failed to fetch holidays'));
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/holiday/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Failed to fetch holiday'));
    }
  },

  async create(holidayData) {
    try {
      const response = await api.post('/holiday', holidayData);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Failed to create holiday'));
    }
  },

  async update(id, holidayData) {
    try {
      const response = await api.put(`/holiday/${id}`, holidayData);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Failed to update holiday'));
    }
  },

  async delete(id) {
    try {
      await api.delete(`/holiday/${id}`);
      return true;
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Failed to delete holiday'));
    }
  }
};
