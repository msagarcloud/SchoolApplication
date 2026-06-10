import api from './authService';

export const employeeTypeService = {
  async getAll() {
    try {
      const response = await api.get('/emptype');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch employee types' };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/emptype/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch employee type' };
    }
  },

  async create(employeeTypeData) {
    try {
      const response = await api.post('/emptype', employeeTypeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create employee type' };
    }
  },

  async update(id, employeeTypeData) {
    try {
      const response = await api.put(`/emptype/${id}`, employeeTypeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update employee type' };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/emptype/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete employee type' };
    }
  }
};
