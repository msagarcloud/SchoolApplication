import apiService from './api';

class SupplierService {
  // Get all suppliers
  async getSuppliers() {
    return apiService.get('/supplier');
  }

  // Get supplier by ID
  async getSupplierById(id) {
    return apiService.get(`/supplier/${id}`);
  }

  // Create new supplier
  async createSupplier(supplierData) {
    return apiService.post('/supplier', supplierData);
  }

  // Update supplier
  async updateSupplier(id, supplierData) {
    return apiService.put(`/supplier/${id}`, supplierData);
  }

  // Delete supplier
  async deleteSupplier(id) {
    return apiService.delete(`/supplier/${id}`);
  }
}

export default new SupplierService();
