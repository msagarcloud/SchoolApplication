import apiService from './api';

const normalizeItem = (item) => {
  if (!item || typeof item !== 'object') return item;

  const id = item.id ?? item.Id ?? item.itemId ?? item.ItemId ?? item.ID;
  const name = item.name ?? item.Name ?? item.itemName ?? item.ItemName ?? '';
  const description = item.description ?? item.Description ?? '';
  const code = item.code ?? item.Code ?? item.itemCode ?? item.ItemCode ?? description;
  const isActive = item.isActive ?? item.IsActive;
  const itemTypeId = item.itemTypeId ?? item.ItemTypeId ?? item.itemTypeMasterId ?? item.ItemTypeMasterId ?? item.itemType?.id ?? item.ItemType?.id ?? '';
  const companyId = item.companyId ?? item.CompanyId ?? '';
  const schoolId = item.schoolId ?? item.SchoolId ?? '';
  const createdBy = item.createdBy ?? item.CreatedBy ?? '';
  const createdDate = item.createdDate ?? item.CreatedDate ?? item.createdAt ?? null;
  const modifiedBy = item.modifiedBy ?? item.ModifiedBy ?? null;
  const modifiedDate = item.modifiedDate ?? item.ModifiedDate ?? null;
  const isDeleted = item.isDeleted ?? item.IsDeleted;
  const status = item.status ?? item.Status ?? '';
  const statusMessage = item.statusMessage ?? item.StatusMessage ?? '';

  return {
    ...item,
    id,
    name,
    description,
    code,
    isActive,
    itemTypeId,
    companyId,
    schoolId,
    createdBy,
    createdDate,
    modifiedBy,
    modifiedDate,
    isDeleted,
    status,
    statusMessage,
  };
};

const normalizeItemResponse = (response) => {
  if (Array.isArray(response)) return response.map(normalizeItem);
  if (response?.data && Array.isArray(response.data)) return response.data.map(normalizeItem);
  if (response?.items && Array.isArray(response.items)) return response.items.map(normalizeItem);
  return normalizeItem(response);
};

const toApiPayload = (data, id) => {
  const payload = {
    id: id || data.id,
    itemName: (data.name ?? data.itemName ?? '').trim(),
    description: (data.description ?? data.code ?? '').trim(),
    itemTypeMasterId: data.itemTypeId || data.itemTypeMasterId,
    isActive: data.isActive ?? true,
  };

  if (data.companyId) payload.companyId = data.companyId;
  if (data.schoolId) payload.schoolId = data.schoolId;
  if (data.createdBy) payload.createdBy = data.createdBy;
  if (data.createdDate) payload.createdDate = data.createdDate;
  if (data.modifiedBy) payload.modifiedBy = data.modifiedBy;
  if (data.status) payload.status = data.status;
  if (data.statusMessage) payload.statusMessage = data.statusMessage;
  if (data.isDeleted != null) payload.isDeleted = data.isDeleted;

  return payload;
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
      const response = await apiService.post('/Item', toApiPayload(data));
      return normalizeItem(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to create item');
    }
  },

  async update(id, data) {
    try {
      const response = await apiService.put(`/Item/${id}`, toApiPayload(data, id));
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
