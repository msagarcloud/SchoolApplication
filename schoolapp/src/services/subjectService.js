import api from './authService';

const subjectService = {
  async getAll() {
    try {
      const response = await api.get('/subject');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch subjects' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/subject/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch subject' };
    }
  },

  async create(subjectData) {
    try {
      const response = await api.post('/subject', subjectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create subject' };
    }
  },

  async update(id, subjectData) {
    try {
      const response = await api.put(`/subject/${id}`, subjectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update subject' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/subject/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete subject' };
    }
  }
};

export default subjectService;
