import apiService from './api';

const normalizeDiscountCategoryItem = (item) => {
  if (!item || typeof item !== 'object') return item;

  const id = item.id ?? item.Id;
  const name = item.name ?? item.Name ?? '';
  const description = item.description ?? item.Description ?? '';
  const feeCategoryId = item.feeCategoryId ?? item.FeeCategoryId ?? '';
  const feeCategoryName = item.feeCategoryName ?? item.FeeCategoryName ?? 'N/A';
  const isPercentAge =
    item.isPercentAge ??
    item.IsPercentAge ??
    (typeof item.isPercentage === 'boolean' ? item.isPercentage : false);
  const amount = item.amount ?? item.Amount ?? 0;
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
    name,
    description,
    feeCategoryId,
    feeCategoryName,
    isPercentAge,
    amount,
    isActive,
    createdDate,
    modifiedDate,
    status,
    statusMessage,
  };
};

const normalizeDiscountCategoryResponse = (response) => {
  if (Array.isArray(response)) {
    return response.map(normalizeDiscountCategoryItem);
  }

  if (response?.data && Array.isArray(response.data)) {
    return response.data.map(normalizeDiscountCategoryItem);
  }

  if (response?.items && Array.isArray(response.items)) {
    return response.items.map(normalizeDiscountCategoryItem);
  }

  return normalizeDiscountCategoryItem(response);
};

export const discountCategoryService = {
  async getAll() {
    try {
      const response = await apiService.get('/FeesDiscountCategory');
      return normalizeDiscountCategoryResponse(response);
    } catch (error) {
      console.error('Discount Category API error:', error);
      throw new Error(error.message || 'Failed to fetch discount categories');
    }
  },

  async getById(id) {
    try {
      const response = await apiService.get(`/FeesDiscountCategory/${id}`);
      return normalizeDiscountCategoryItem(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch discount category');
    }
  },

  async create(discountCategoryData) {
    try {
      const response = await apiService.post('/FeesDiscountCategory', discountCategoryData);
      return normalizeDiscountCategoryItem(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to create discount category');
    }
  },

  async update(id, discountCategoryData) {
    try {
      const response = await apiService.put(
        `/FeesDiscountCategory/${id}`,
        discountCategoryData
      );
      return normalizeDiscountCategoryItem(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to update discount category');
    }
  },

  async delete(id) {
    try {
      await apiService.delete(`/FeesDiscountCategory/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete discount category');
    }
  },
};
