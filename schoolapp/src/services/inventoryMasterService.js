import apiService from './api';
import { authService } from './authService';

const normalizeInventoryMaster = (row) => {
  if (!row || typeof row !== 'object') return row;

  const id = row.Id ?? row.id ?? row.ID ?? '';
  const name = row.Name ?? row.name ?? row.InventoryMasterName ?? row.itemName ?? row.itemNameValue ?? '';

  return {
    ...row,
    id,
    name,
    itemId: row.ItemId ?? row.itemId ?? row.itemID ?? '',
    locationId: row.LocationId ?? row.locationId ?? '',
    quantity: row.Quantity ?? row.quantity ?? 0,
    costPerItem: row.CostPerItem ?? row.costPerItem ?? 0,
    isActive: row.IsActive ?? row.isActive ?? true,
    isDeleted: row.IsDeleted ?? row.isDeleted ?? false,
    companyId: row.CompanyId ?? row.companyId ?? '',
    schoolId: row.SchoolId ?? row.schoolId ?? '',
    createdBy: row.CreatedBy ?? row.createdBy ?? '',
    createdDate: row.CreatedDate ?? row.createdDate ?? null,
    modifiedBy: row.ModifiedBy ?? row.modifiedBy ?? '',
    modifiedDate: row.ModifiedDate ?? row.modifiedDate ?? null,
    status: row.Status ?? row.status ?? '',
    statusMessage: row.StatusMessage ?? row.statusMessage ?? '',
  };
};

const normalizeInventoryMasterResponse = (response) => {
  if (Array.isArray(response)) return response.map(normalizeInventoryMaster);
  if (response?.data && Array.isArray(response.data)) return response.data.map(normalizeInventoryMaster);
  if (response?.items && Array.isArray(response.items)) return response.items.map(normalizeInventoryMaster);
  return normalizeInventoryMaster(response);
};

const getSessionCompanyAndSchoolIds = () => {
  // Keep consistent with other parts of the app that rely on authService helpers.
  const companyId = authService?.getCompanyId?.() ?? '';
  const schoolId = authService?.getSchoolId?.() ?? '';
  return { companyId, schoolId };
};

const toApiPayload = (data) => {
  const { companyId, schoolId } = getSessionCompanyAndSchoolIds();

  return {
    id: data.id || undefined,
    name: (data.name ?? data.Name ?? data.itemName ?? '').trim() || undefined,
    itemId: data.itemId || data.ItemId || undefined,
    locationId: data.locationId || data.LocationId || undefined,
    quantity: data.quantity != null ? Number(data.quantity) : undefined,
    costPerItem: data.costPerItem != null ? Number(data.costPerItem) : undefined,
    isActive: data.isActive ?? true,
    isDeleted: data.isDeleted ?? false,
    companyId: data.companyId || companyId || undefined,
    schoolId: data.schoolId || schoolId || undefined,
  };
};

export const inventoryMasterService = {
  async getAll() {
    const response = await apiService.get('/InventoryMaster');
    return normalizeInventoryMasterResponse(response);
  },

  async getById(id) {
    const response = await apiService.get(`/InventoryMaster/${id}`);
    return normalizeInventoryMasterResponse(response);
  },

  async create(data) {
    const response = await apiService.post('/InventoryMaster', toApiPayload(data));
    return normalizeInventoryMasterResponse(response);
  },

  async update(id, data) {
    const payload = toApiPayload({ ...data, id });
    const response = await apiService.put(`/InventoryMaster/${id}`, payload);
    return normalizeInventoryMasterResponse(response);
  },

  async delete(id) {
    await apiService.delete(`/InventoryMaster/${id}`);
    return true;
  },
};

