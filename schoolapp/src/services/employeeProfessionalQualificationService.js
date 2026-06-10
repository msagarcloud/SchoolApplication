import api from './authService';

export const employeeProfessionalQualificationService = {
  async getAll() {
    try {
      const response = await api.get('/employeeprofessionalqualification');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch professional qualifications' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/employeeprofessionalqualification/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch qualification' };
    }
  },

  async create(qualificationData) {
    try {
      const response = await api.post('/employeeprofessionalqualification', qualificationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create qualification' };
    }
  },

  async update(id, qualificationData) {
    try {
      const response = await api.put(`/employeeprofessionalqualification/${id}`, qualificationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update qualification' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/employeeprofessionalqualification/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete qualification' };
    }
  },

  async getQualificationsByEmployee(employeeId) {
    try {
      const response = await api.get(`/employeeprofessionalqualification/employee/${employeeId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch employee qualifications' };
    }
  },

  async verifyQualification(id, verificationData) {
    try {
      const response = await api.post(`/employeeprofessionalqualification/${id}/verify`, verificationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to verify qualification' };
    }
  },

  async downloadCertificate(id) {
    try {
      const response = await api.get(`/employeeprofessionalqualification/${id}/download`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to download certificate' };
    }
  }
};
