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

export const sessionMasterService = {
  async getAll() {
    try {
      const response = await api.get('/session');
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Failed to fetch sessions'));
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/session/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Failed to fetch session'));
    }
  },

  async create(sessionData) {
    try {
      const response = await api.post('/session', sessionData);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Failed to create session'));
    }
  },

  async update(id, sessionData) {
    try {
      const response = await api.put(`/session/${id}`, sessionData);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Failed to update session'));
    }
  },

  async delete(id) {
    try {
      const response = await api.delete(`/session/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Failed to delete session'));
    }
  }
};
