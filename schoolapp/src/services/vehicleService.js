import apiService from './api';

class VehicleService {
  // Get all vehicles
  async getVehicles() {
    return apiService.get('/Vehicle');
  }

  // Get vehicle by ID
  async getVehicleById(id) {
    return apiService.get(`/Vehicle/${id}`);
  }

  // Create new vehicle
  async createVehicle(vehicleData) {
    return apiService.post('/Vehicle', vehicleData);
  }

  // Update vehicle
  async updateVehicle(id, vehicleData) {
    return apiService.put(`/Vehicle/${id}`, vehicleData);
  }

  // Delete vehicle
  async deleteVehicle(id) {
    return apiService.delete(`/Vehicle/${id}`);
  }

  // Get drivers for assignment
  async getDrivers() {
    return apiService.get('/DriverMaster');
  }

  // Get routes for assignment
  async getRoutes() {
    return apiService.get('/RouteMaster');
  }

  // Check out vehicle
  async checkOutVehicle(id) {
    return apiService.post(`/Vehicle/${id}/checkout`);
  }

  // Get vehicle maintenance history
  async getMaintenanceHistory(vehicleId) {
    return apiService.get(`/Vehicle/${vehicleId}/maintenance`);
  }

  // Schedule maintenance
  async scheduleMaintenance(vehicleId, maintenanceData) {
    return apiService.post(`/Vehicle/${vehicleId}/maintenance`, maintenanceData);
  }
}

export default new VehicleService();
