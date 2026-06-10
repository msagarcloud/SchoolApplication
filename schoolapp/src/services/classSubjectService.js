import api from './authService';

export const classSubjectService = {
  async getAll(schoolId) {
    try {
      const response = await api.get('/classsubjectdetail', {
        params: schoolId ? { schoolId } : {}
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch class subjects' };
    }
  },

  async getById(id, schoolId) {
    try {
      const response = await api.get(`/classsubjectdetail/${id}`, {
        params: { schoolId }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch class subject' };
    }
  },

  async create(classSubjectData) {
    try {
      const response = await api.post('/classsubjectdetail', classSubjectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create class subject' };
    }
  },

  async update(id, classSubjectData, schoolId) {
    try {
      const response = await api.put(`/classsubjectdetail/${id}`, classSubjectData, {
        params: { schoolId }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update class subject' };
    }
  },

  async delete(id, schoolId) {
    try {
      await api.delete(`/classsubjectdetail/${id}`, {
        params: { schoolId }
      });
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete class subject' };
    }
  },

  async getSubjectsByClass(classId, schoolId) {
    try {
      // Use the existing GetAll endpoint and filter on client side
      const response = await api.get('/classsubjectdetail', {
        params: { schoolId }
      });
      
      // Filter the results to get only subjects for the specified class
      const classSubjects = response.data.filter(cs => cs.classMasterId === classId);
      return classSubjects;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch subjects for class' };
    }
  }
};
