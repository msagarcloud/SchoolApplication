import apiService from './api';

class VendorService {
  // Get all vendors
  async getVendors() {
    return apiService.get('/vendor');
  }

  // Get vendor by ID
  async getVendorById(id) {
    return apiService.get(`/vendor/${id}`);
  }

  // Create new vendor
  async createVendor(vendorData) {
    return apiService.post('/vendor', vendorData);
  }

  // Update vendor
  async updateVendor(id, vendorData) {
    return apiService.put(`/vendor/${id}`, vendorData);
  }

  // Delete vendor
  async deleteVendor(id) {
    return apiService.delete(`/vendor/${id}`);
  }
}

export default new VendorService();
