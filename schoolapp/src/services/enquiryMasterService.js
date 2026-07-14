import api from './authService';

// EnquiryMaster CRUD service
// API field names follow backend model:
// EnquirerName, ContactNumber, EmailAddress, EnquiryType, Subject, Message, Priority, Status, StatusMessage,
// EnquiryDate, ResponseMessage, ResponseType, ResponseDate,
// CompanyId, SchoolId, IsActive, IsDeleted, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate
export const enquiryMasterService = {
  async getAll() {
    try {
      const response = await api.get('/enquirymaster');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch enquiries' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/enquirymaster/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch enquiry' };
    }
  },

  async create(enquiryData) {
    try {
      const response = await api.post('/enquirymaster', enquiryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create enquiry' };
    }
  },

  async update(id, enquiryData) {
    try {
      const response = await api.put(`/enquirymaster/${id}`, enquiryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update enquiry' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/enquirymaster/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete enquiry' };
    }
  }
};

