import apiService from './api';

class VisitorService {
  // Get all visitors
  async getVisitors() {
    return apiService.get('/visitors');
  }

  // Get visitor by ID
  async getVisitorById(id) {
    return apiService.get(`/visitors/${id}`);
  }

  // Create new visitor
  async createVisitor(visitorData) {
    return apiService.post('/visitors', visitorData);
  }

  // Update visitor
  async updateVisitor(id, visitorData) {
    return apiService.put(`/visitors/${id}`, visitorData);
  }

  // Delete visitor
  async deleteVisitor(id) {
    return apiService.delete(`/visitors/${id}`);
  }

  // Check out visitor
  async checkOutVisitor(id) {
    return apiService.post(`/visitors/${id}/checkout`);
  }

  // Get employees for meeting selection
  async getEmployees() {
    return apiService.get('/employees');
  }

  // Get visitor history
  async getVisitorHistory(visitorId) {
    return apiService.get(`/visitors/${visitorId}/history`);
  }

  // Get visitor pass details
  async getVisitorPass(visitorId) {
    return apiService.get(`/visitors/${visitorId}/pass`);
  }

  // Get today's visitors
  async getTodaysVisitors() {
    return apiService.get('/visitors/today');
  }

  // Get visitor statistics
  async getVisitorStatistics() {
    return apiService.get('/visitors/statistics');
  }
}

export default new VisitorService();
