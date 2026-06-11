import apiService from './api';

const normalizeItemType = (item) => {
  if (!item || typeof item !== 'object') return item;

  const id = item.id ?? item.Id ?? item.itemTypeId ?? item.ItemTypeId ?? item.ID;
  const name = item.name ?? item.Name ?? item.itemTypeName ?? item.ItemTypeName ?? '';
  const isActive = item.isActive ?? item.IsActive;
  const createdDate = item.createdDate ?? item.CreatedDate ?? item.createdAt ?? null;

  return {
    ...item,
    id,
    name,
    isActive,
    createdDate,
  };
};

const normalizeItemTypeResponse = (response) => {
  if (Array.isArray(response)) return response.map(normalizeItemType);
  if (response?.data && Array.isArray(response.data)) return response.data.map(normalizeItemType);
  if (response?.items && Array.isArray(response.items)) return response.items.map(normalizeItemType);
  return normalizeItemType(response);
};

export const itemTypeService = {
  async getAll() {
    try {
      const response = await apiService.get('/ItemType');
      return normalizeItemTypeResponse(response);
    } catch (error) {
      console.error('ItemType API error:', error);
      throw new Error(error.message || 'Failed to fetch item types');
    }
  },

  async getById(id) {
    try {
      const response = await apiService.get(`/ItemType/${id}`);
      return normalizeItemType(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch item type');
    }
  },

  async create(data) {
    try {
      const response = await apiService.post('/ItemType', data);
      return normalizeItemType(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to create item type');
    }
  },

  async update(id, data) {
    try {
      const response = await apiService.put(`/ItemType/${id}`, data);
      return normalizeItemType(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to update item type');
    }
  },

  async delete(id) {
    try {
      await apiService.delete(`/ItemType/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete item type');
    }
  }
};
