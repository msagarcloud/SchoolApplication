import apiService from './api';

const normalizeCategoryItem = (item) => {
  if (!item || typeof item !== 'object') return item;

  const id = item.id ?? item.Id ?? item.categoryId ?? item.CategoryId ?? item.ID ?? item.ID;
  const name = item.name ?? item.Name ?? item.categoryName ?? item.CategoryName ?? item.Name ?? item.DisplayName ?? item.displayName ?? '';
  const isActive = item.isActive ?? item.IsActive ?? (typeof item.status === 'string' ? item.status.toLowerCase() === 'active' : undefined) ?? (typeof item.Status === 'string' ? item.Status.toLowerCase() === 'active' : undefined);
  const createdDate = item.createdDate ?? item.CreatedDate ?? item.createdAt ?? item.CreatedAt ?? item.dateCreated ?? item.DateCreated ?? null;

  return {
    ...item,
    id,
    name,
    isActive,
    createdDate,
  };
};

const normalizeCategoryResponse = (response) => {
  if (Array.isArray(response)) {
    return response.map(normalizeCategoryItem);
  }

  if (response?.data && Array.isArray(response.data)) {
    return response.data.map(normalizeCategoryItem);
  }

  if (response?.items && Array.isArray(response.items)) {
    return response.items.map(normalizeCategoryItem);
  }

  return normalizeCategoryItem(response);
};

export const categoryService = {
  async getAll() {
    try {
      const response = await apiService.get('/Category');
      return normalizeCategoryResponse(response);
    } catch (error) {
      console.error('Category API error:', error);
      throw new Error(error.message || 'Failed to fetch categories');
    }
  },

  async getById(id) {
    try {
      const response = await apiService.get(`/Category/${id}`);
      return normalizeCategoryItem(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch category');
    }
  },

  async create(categoryData) {
    try {
      const response = await apiService.post('/Category', categoryData);
      return normalizeCategoryItem(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to create category');
    }
  },

  async update(id, categoryData) {
    try {
      const response = await apiService.put(`/Category/${id}`, categoryData);
      return normalizeCategoryItem(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to update category');
    }
  },

  async delete(id) {
    try {
      await apiService.delete(`/Category/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete category');
    }
  }
};
