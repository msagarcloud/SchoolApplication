import apiService from './api';

const normalizeItemLocation = (loc) => {
  if (!loc || typeof loc !== 'object') return loc;

  return {
    ...loc,
    id: loc.id ?? loc.Id ?? '',
    locationName: loc.locationName ?? loc.LocationName ?? '',
    description: loc.description ?? loc.Description ?? '',
    building: loc.building ?? loc.Building ?? '',
    locationFloor: loc.locationFloor ?? loc.LocationFloor ?? '',
    locationNumber: loc.locationNumber ?? loc.LocationNumber ?? null,
    capacity: loc.capacity ?? loc.Capacity ?? null,
    isActive: loc.isActive ?? loc.IsActive,
    companyId: loc.companyId ?? loc.CompanyId ?? '',
    schoolId: loc.schoolId ?? loc.SchoolId ?? '',
    createdDate: loc.createdDate ?? loc.CreatedDate ?? null,
    status: loc.status ?? loc.Status ?? '',
    statusMessage: loc.statusMessage ?? loc.StatusMessage ?? '',
  };
};

const normalizeItemLocationResponse = (response) => {
  if (Array.isArray(response)) return response.map(normalizeItemLocation);
  if (response?.data && Array.isArray(response.data)) return response.data.map(normalizeItemLocation);
  if (response?.items && Array.isArray(response.items)) return response.items.map(normalizeItemLocation);
  return normalizeItemLocation(response);
};

export const itemLocationService = {
  async getAll() {
    try {
      const response = await apiService.get('/itemlocation');
      return normalizeItemLocationResponse(response);
    } catch (error) {
      console.error('Item Location API error:', error);
      throw new Error(error.message || 'Failed to fetch item locations');
    }
  },

  async getById(id) {
    try {
      const response = await apiService.get(`/itemlocation/${id}`);
      return normalizeItemLocation(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch item location');
    }
  },

  async create(data) {
    try {
      const response = await apiService.post('/itemlocation', data);
      return normalizeItemLocation(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to create item location');
    }
  },

  async update(id, data) {
    try {
      const response = await apiService.put(`/itemlocation/${id}`, data);
      return normalizeItemLocation(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to update item location');
    }
  },

  async delete(id) {
    try {
      await apiService.delete(`/itemlocation/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete item location');
    }
  }
};
export default itemLocationService;
