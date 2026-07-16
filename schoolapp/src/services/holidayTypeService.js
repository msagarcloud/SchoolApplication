import api from './api';

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

export const holidayTypeService = {
  async getAll() {
    try {
      // `api.get` returns the parsed response body directly (not an Axios
      // response object). Reading `.data` here discarded the array returned
      // by the API, leaving the Holiday Type dropdown empty on initial load.
      const data = await api.get('/holidaytype');
      if (Array.isArray(data)) {
        return data;
      }
      if (Array.isArray(data?.data)) {
        return data.data;
      }
      if (Array.isArray(data?.results)) {
        return data.results;
      }
      if (Array.isArray(data?.items)) {
        return data.items;
      }
      return [];
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Failed to fetch holiday types'));
    }
  },

  async getById(id) {
    try {
      return await api.get(`/holidaytype/${id}`);
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Failed to fetch holiday type'));
    }
  },

  async create(holidayTypeData) {
    try {
      return await api.post('/holidaytype', holidayTypeData);
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Failed to create holiday type'));
    }
  },

  async update(id, holidayTypeData) {
    try {
      return await api.put(`/holidaytype/${id}`, holidayTypeData);
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Failed to update holiday type'));
    }
  },

  async delete(id) {
    try {
      await api.delete(`/holidaytype/${id}`);
      return true;
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Failed to delete holiday type'));
    }
  }
};
