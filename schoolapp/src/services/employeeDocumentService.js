import api from './authService';

export const employeeDocumentService = {
  async getAll() {
    try {
      const response = await api.get('/employeedocument');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch employee documents' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/employeedocument/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch document' };
    }
  },

  async create(documentData) {
    try {
      const formData = new FormData();
      formData.append('EmployeeId', documentData.employeeId);
      formData.append('DocumentFile', documentData.file);
      formData.append('DocumentType', documentData.documentType);
      formData.append('DocumentName', documentData.documentName);
      formData.append('ExpiryDate', documentData.expiryDate || '');
      
      const response = await api.post('/employeedocument', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to upload document' };
    }
  },

  async update(id, documentData) {
    try {
      const response = await api.put(`/employeedocument/${id}`, documentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update document' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/employeedocument/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete document' };
    }
  },

  async download(id) {
    try {
      const response = await api.get(`/employeedocument/${id}/download`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to download document' };
    }
  },

  async getDocumentsByEmployee(employeeId) {
    try {
      const response = await api.get(`/employeedocument/employee/${employeeId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch employee documents' };
    }
  }
};
