import api from './authService';

const getErrorMessage = (error, fallbackMessage) => {
  // Our api wrapper (src/services/api.js) throws plain Error instances.
  // Sometimes it may include server payload information; also handle axios-like shapes.
  if (!error) return fallbackMessage;

  // Axios-ish shape
  if (error.response) {
    const data = error.response.data;
    if (!data) return fallbackMessage;
    if (typeof data === 'string') return data;

    const candidates = [
      data?.message,
      data?.error,
      data?.title,
      data?.detail,
      data?.innerException,
      data?.InnerException,
      data?.exception,
      data?.Exception,
      data?.trace,
      data?.stack,
      data?.errors,
      data?.Errors,
      data,
    ];

    const firstMeaningful = candidates.find((c) => c !== undefined && c !== null && c !== '');
    if (typeof firstMeaningful === 'string') return firstMeaningful;
    return JSON.stringify(firstMeaningful);
  }

  // Fetch/api wrapper: either message only, or sometimes attaches response payload
  const embedded = error?.data || error?.response?.data || error?.body;
  if (embedded) {
    if (typeof embedded === 'string') return embedded;
    return JSON.stringify(embedded);
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
