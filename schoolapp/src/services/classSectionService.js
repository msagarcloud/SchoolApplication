import api from './authService';

export const classSectionService = {
  async getAll() {
    try {
      const response = await api.get('/classsectiondetail');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch class sections' };
    }
  },

  async getBySchoolId(schoolId) {
    try {
      const response = await api.get(`/classsectiondetail/school/${schoolId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch class sections for school' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/classsectiondetail/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch class section' };
    }
  },

  async create(classSectionData) {
    try {
      const response = await api.post('/classsectiondetail', classSectionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create class section' };
    }
  },

  async update(id, classSectionData) {
    try {
      const response = await api.put(`/classsectiondetail/${id}`, classSectionData);
      return response.data;
    } catch (error) {
      console.error('Update error:', error);
      if (error.response?.status === 500) {
        throw { message: 'Server error: Update functionality is currently under maintenance. Please try again later or contact support.' };
      } else if (error.response?.status === 400) {
        throw error.response?.data || { message: 'Invalid data provided. Please check all fields.' };
      } else {
        throw error.response?.data || { message: 'Failed to update class section' };
      }
    }
  },

  async delete(id) {
    try {
      await api.delete(`/classsectiondetail/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete class section' };
    }
  }
};
