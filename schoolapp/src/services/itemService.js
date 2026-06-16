import apiService from './api';
import { authService } from './authService';

const getSessionUserId = () => {
  const currentUser = authService?.getCurrentUser?.();
  if (currentUser) {
    return currentUser.Id ?? currentUser.id ?? '';
  }
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return '';
    const parsed = JSON.parse(raw);
    return parsed.Id ?? parsed.id ?? '';
  } catch {
    return '';
  }
};

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

const normalizeItemPostCreateResponse = (response) => {
  const normalized = normalizeItemResponse(response);

  // If backend returns a created-item result, enforce required status contract.
  const allowedMessages = new Set([
    'Item Added Successfully',
    'Item Added Successfuly', // backend may return this misspelling
  ]);

  const fixOne = (item) => {
    void 0;
    if (!item || typeof item !== 'object') return item;

    // removed unused var status: item.status ?? item.Status
    const statusMessage = item.statusMessage ?? item.StatusMessage;

    const shouldFix = statusMessage && allowedMessages.has(statusMessage);

    if (shouldFix) {
      return {
        ...item,
        status: 'INC',
        statusMessage,
      };
    }
    return item;
  };

  if (Array.isArray(normalized)) return normalized.map(fixOne);
  return fixOne(normalized);
};

const toApiPayload = (data, id) => {
  // For CREATE we must NOT send an empty string for Guid fields.
  const normalizedId = (id ?? data.id);
  const safeId = typeof normalizedId === 'string' ? normalizedId.trim() : normalizedId;

  // CreatedBy/ModifiedBy must come from session/auth (NOT from the form)
  const sessionUserId = getSessionUserId();

  const isUpdate = Boolean(id);

  const payload = {
    // omit id when it's empty/null/undefined so backend won't try to parse "" as Guid
    ...(safeId ? { id: safeId } : {}),
    itemName: (data.name ?? data.itemName ?? '').trim(),
    description: (data.description ?? data.code ?? '').trim(),
    itemTypeMasterId: data.itemTypeId || data.itemTypeMasterId,
    isActive: data.isActive ?? true,
  };

  if (data.companyId) payload.companyId = data.companyId;
  if (data.schoolId) payload.schoolId = data.schoolId;

  // Force audit fields from session for both create/update
  if (isUpdate) {
    payload.modifiedBy = sessionUserId;
  } else {
    payload.createdBy = sessionUserId;
  }

  // Preserve any explicitly provided audit/status fields from UI if present,
  // but ensure status fields are set to what the backend expects for "item added"
  if (data.createdDate) payload.createdDate = data.createdDate;
  if (data.modifiedDate) payload.modifiedDate = data.modifiedDate;
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
      return normalizeItemPostCreateResponse(response);
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
