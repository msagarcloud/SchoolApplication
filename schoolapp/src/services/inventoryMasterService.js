import apiService from './api';

const normalizeInventoryMaster = (item) => {
  if (!item || typeof item !== 'object') return item;

  const id = item.id ?? item.Id ?? item.inventoryMasterId ?? item.InventoryMasterId ?? item.ID;
  const itemId = item.itemId ?? item.ItemId ?? item.ItemID ?? item.item_id ?? '';
  const itemName = item.itemName ?? item.ItemName ?? '';

  const itemLocationId =
    item.itemLocationId ??
    item.ItemLocationId ??
    item.itemLocation_id ??
    item.ItemLocationID ??
    '';

  const quantity = item.quantity ?? item.Quantity ?? item.qty ?? item.Qty ?? 0;
  const minQuantity = item.minQuantity ?? item.MinQuantity ?? item.minQty ?? item.MinQty ?? '';

  const isActive = item.isActive ?? item.IsActive;
  const isDeleted = item.isDeleted ?? item.IsDeleted;

  const createdBy = item.createdBy ?? item.CreatedBy ?? '';
  const modifiedBy = item.modifiedBy ?? item.ModifiedBy ?? '';

  const createdDate = item.createdDate ?? item.CreatedDate ?? item.createdAt ?? null;
  const modifiedDate = item.modifiedDate ?? item.ModifiedDate ?? item.modifiedAt ?? null;

  const status = item.status ?? item.Status ?? '';
  const statusMessage = item.statusMessage ?? item.StatusMessage ?? '';

  return {
    ...item,
    id,
    itemId,
    itemName,
    itemLocationId,
    quantity,
    minQuantity,
    isActive,
    isDeleted,
    createdBy,
    modifiedBy,
    createdDate,
    modifiedDate,
    status,
    statusMessage,
  };
};

const normalizeInventoryMasterResponse = (response) => {
  if (Array.isArray(response)) return response.map(normalizeInventoryMaster);
  if (response?.data && Array.isArray(response.data)) return response.data.map(normalizeInventoryMaster);
  if (response?.items && Array.isArray(response.items)) return response.items.map(normalizeInventoryMaster);
  return normalizeInventoryMaster(response);
};

const toPayload = (data, id) => {
  const safeId = typeof id === 'string' ? id.trim() : id;
  const payload = {
    ...(safeId ? { id: safeId } : {}),
    itemId: data.itemId || data.ItemId || '',
    itemLocationId: data.itemLocationId || data.ItemLocationId || '',
    quantity: data.quantity ?? data.Quantity ?? 0,
    minQuantity: data.minQuantity ?? data.MinQuantity ?? null,
    isActive: data.isActive ?? true,
    isDeleted: data.isDeleted ?? false,
  };

  if (data.createdDate) payload.createdDate = data.createdDate;
  if (data.modifiedDate) payload.modifiedDate = data.modifiedDate;
  if (data.createdBy) payload.createdBy = data.createdBy;
  if (data.modifiedBy) payload.modifiedBy = data.modifiedBy;
  if (data.status) payload.status = data.status;
  if (data.statusMessage) payload.statusMessage = data.statusMessage;

  return payload;
};

export const inventoryMasterService = {
  async getAll() {
    const response = await apiService.get('/InventoryMaster');
    return normalizeInventoryMasterResponse(response);
  },

  async getById(id) {
    const response = await apiService.get(`/InventoryMaster/${id}`);
    return normalizeInventoryMaster(response);
  },

  async create(data) {
    const response = await apiService.post('/InventoryMaster', toPayload(data));
    return normalizeInventoryMasterResponse(response);
  },

  async update(id, data) {
    const response = await apiService.put(`/InventoryMaster/${id}`, toPayload(data, id));
    return normalizeInventoryMaster(response);
  },

  async delete(id) {
    await apiService.delete(`/InventoryMaster/${id}`);
    return true;
  },
};

