import apiService from './api';

const normalizeFeeCategoryItem = (item) => {
  if (!item || typeof item !== 'object') return item;

  const id = item.id ?? item.Id;
  const feesCatgoryName =
    item.feesCatgoryName ??
    item.FeesCatgoryName ??
    item.feesCategoryName ??
    item.FeesCategoryName ??
    '';
  const description = item.description ?? item.Description ?? '';
  const isActive =
    item.isActive ??
    item.IsActive ??
    (typeof item.status === 'string' ? item.status.toLowerCase() === 'active' : undefined) ??
    (typeof item.Status === 'string' ? item.Status.toLowerCase() === 'active' : undefined);
  const createdDate =
    item.createdDate ?? item.CreatedDate ?? item.createdAt ?? item.CreatedAt ?? null;
  const modifiedDate = item.modifiedDate ?? item.ModifiedDate ?? null;
  const status = item.status ?? item.Status ?? null;
  const statusMessage = item.statusMessage ?? item.StatusMessage ?? null;

  return {
    ...item,
    id,
    feesCatgoryName,
    description,
    isActive,
    createdDate,
    modifiedDate,
    status,
    statusMessage,
  };
};

const normalizeFeeCategoryResponse = (response) => {
  if (Array.isArray(response)) {
    return response.map(normalizeFeeCategoryItem);
  }

  if (response?.data && Array.isArray(response.data)) {
    return response.data.map(normalizeFeeCategoryItem);
  }

  if (response?.items && Array.isArray(response.items)) {
    return response.items.map(normalizeFeeCategoryItem);
  }

  return normalizeFeeCategoryItem(response);
};

export const feeCategoryService = {
  async getAll() {
    try {
      const response = await apiService.get('/FeesCategory');
      return normalizeFeeCategoryResponse(response);
    } catch (error) {
      console.error('Fee Category API error:', error);
      throw new Error(error.message || 'Failed to fetch fee categories');
    }
  },

  async getById(id) {
    try {
      const response = await apiService.get(`/FeesCategory/${id}`);
      return normalizeFeeCategoryItem(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch fee category');
    }
  },

  async create(feeCategoryData) {
    try {
      const response = await apiService.post('/FeesCategory', feeCategoryData);
      return normalizeFeeCategoryItem(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to create fee category');
    }
  },

  async update(id, feeCategoryData) {
    try {
      const response = await apiService.put(`/FeesCategory/${id}`, feeCategoryData);
      return normalizeFeeCategoryItem(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to update fee category');
    }
  },

  async delete(id) {
    try {
      await apiService.delete(`/FeesCategory/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete fee category');
    }
  },
};
