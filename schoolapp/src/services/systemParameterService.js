import api from './authService';

const tryEndpoints = async (endpoints, requestFn, fallbackMessage) => {
  let lastError = null;
  for (const endpoint of endpoints) {
    try {
      return await requestFn(endpoint);
    } catch (error) {
      if (error.response?.status === 404) {
        lastError = error;
        continue;
      }
      throw error;
    }
  }
  throw lastError || new Error(fallbackMessage);
};

const systemParameterUrls = {
  list: ['/systemparameters', '/systemparameter'],
  item: (id) => [`/systemparameters/${id}`, `/systemparameter/${id}`],
};

export const systemParameterService = {
  async getAll() {
    try {
      const response = await tryEndpoints(
        systemParameterUrls.list,
        (endpoint) => api.get(endpoint),
        'Failed to fetch system parameters'
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to fetch system parameters');
    }
  },

  async getById(id) {
    try {
      const response = await tryEndpoints(
        systemParameterUrls.item(id),
        (endpoint) => api.get(endpoint),
        'Failed to fetch system parameter'
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to fetch system parameter');
    }
  },

  async create(parameterData) {
    try {
      const response = await tryEndpoints(
        systemParameterUrls.list,
        (endpoint) => api.post(endpoint, parameterData),
        'Failed to create system parameter'
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to create system parameter');
    }
  },

  async update(id, parameterData) {
    try {
      const response = await tryEndpoints(
        systemParameterUrls.item(id),
        (endpoint) => api.put(endpoint, parameterData),
        'Failed to update system parameter'
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to update system parameter');
    }
  },

  async delete(id) {
    try {
      await tryEndpoints(
        systemParameterUrls.item(id),
        (endpoint) => api.delete(endpoint),
        'Failed to delete system parameter'
      );
      return true;
    } catch (error) {
      throw error.response?.data || new Error('Failed to delete system parameter');
    }
  }
};
