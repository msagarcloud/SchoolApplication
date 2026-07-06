import api from './authService';

export const companyService = {
  async getAll() {
    try {
      const response = await api.get('/company');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch companies' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/company/${id}`);
      return response.data;
    } catch (error) {
      // axios keeps useful details in error.response
      const details = {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
      // eslint-disable-next-line no-console
      console.error('[companyService.getById] failed:', details);
      throw error.response?.data || { message: 'Failed to fetch company', details };
    }
  },

  async create(companyData) {
    try {
      const response = await api.post('/company', companyData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create company' };
    }
  },

  async update(id, companyData) {
    try {
      const response = await api.put(`/company/${id}`, companyData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update company' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/company/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete company' };
    }
  }
};
