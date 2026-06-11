import apiService from './api';

const normalizeItem = (item) => {
  if (!item || typeof item !== 'object') return item;

  const id = item.id ?? item.Id ?? item.itemId ?? item.ItemId ?? item.ID;
  const name = item.name ?? item.Name ?? item.itemName ?? item.ItemName ?? '';
  const code = item.code ?? item.Code ?? item.itemCode ?? item.ItemCode ?? '';
  const isActive = item.isActive ?? item.IsActive;
  const itemTypeId = item.itemTypeId ?? item.ItemTypeId ?? item.itemType?.id ?? item.ItemType?.id;
  const createdDate = item.createdDate ?? item.CreatedDate ?? item.createdAt ?? null;

  return {
    ...item,
    id,
    name,
    code,
    isActive,
    itemTypeId,
    createdDate,
  };
};

const normalizeItemResponse = (response) => {
  if (Array.isArray(response)) return response.map(normalizeItem);
  if (response?.data && Array.isArray(response.data)) return response.data.map(normalizeItem);
  if (response?.items && Array.isArray(response.items)) return response.items.map(normalizeItem);
  return normalizeItem(response);
};

export const itemService = {
  async getAll() {
    try {
      const response = await apiService.get('/Item');
      return normalizeItemResponse(response);
    } catch (error) {
      console.error('Item API error:', error);
      throw new Error(error.message || 'Failed to fetch items');
    }
  },

  async getById(id) {
    try {
      const response = await apiService.get(`/Item/${id}`);
      return normalizeItem(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch item');
    }
  },

  async create(data) {
    try {
      const response = await apiService.post('/Item', data);
      return normalizeItem(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to create item');
    }
  },

  async update(id, data) {
    try {
      const response = await apiService.put(`/Item/${id}`, data);
      return normalizeItem(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to update item');
    }
  },

  async delete(id) {
    try {
      await apiService.delete(`/Item/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete item');
    }
  }
};
