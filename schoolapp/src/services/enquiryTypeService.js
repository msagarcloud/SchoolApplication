import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const enquiryTypeService = {
  getAll: async () => {
    const response = await axios.get(`${API_BASE_URL}/EnquiryType`);
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/EnquiryType/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/EnquiryType`, data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}/EnquiryType/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/EnquiryType/${id}`);
    return response.data;
  }
};

export default enquiryTypeService;
