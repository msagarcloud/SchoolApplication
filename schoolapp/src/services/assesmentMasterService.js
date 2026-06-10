import apiService from './api';

const normalizeAssesmentMasterItem = (item) => {
  if (!item || typeof item !== 'object') return item;

  const id = item.id ?? item.Id;
  const name = item.name ?? item.Name ?? '';
  const description = item.description ?? item.Description ?? '';
  const percentageWeightage = item.percentageWeightage ?? item.PercentageWeightage ?? null;
  const fromPeriod = item.fromPeriod ?? item.FromPeriod ?? null;
  const toPeriod = item.toPeriod ?? item.ToPeriod ?? null;
  const companyId = item.companyId ?? item.CompanyId ?? '';
  const schoolId = item.schoolId ?? item.SchoolId ?? '';
  const isActive = item.isActive ?? item.IsActive ?? true;
  const createdDate = item.createdDate ?? item.CreatedDate ?? null;
  const modifiedDate = item.modifiedDate ?? item.ModifiedDate ?? null;
  const status = item.status ?? item.Status ?? null;
  const statusMessage = item.statusMessage ?? item.StatusMessage ?? null;

  return {
    ...item,
    id,
    name,
    description,
    percentageWeightage,
    fromPeriod,
    toPeriod,
    companyId,
    schoolId,
    isActive,
    createdDate,
    modifiedDate,
    status,
    statusMessage,
  };
};

const normalizeAssesmentMasterResponse = (response) => {
  if (Array.isArray(response)) {
    return response.map(normalizeAssesmentMasterItem);
  }
  if (response?.data && Array.isArray(response.data)) {
    return response.data.map(normalizeAssesmentMasterItem);
  }
  if (response?.items && Array.isArray(response.items)) {
    return response.items.map(normalizeAssesmentMasterItem);
  }
  return normalizeAssesmentMasterItem(response);
};

export const assesmentMasterService = {
  async getAll() {
    try {
      const response = await apiService.get('/AssesmentMaster');
      return normalizeAssesmentMasterResponse(response);
    } catch (error) {
      console.error('AssesmentMaster API error:', error);
      throw new Error(error.message || 'Failed to fetch assessments');
    }
  },

  async getById(id) {
    try {
      const response = await apiService.get(`/AssesmentMaster/${id}`);
      return normalizeAssesmentMasterItem(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch assessment');
    }
  },

  async create(data) {
    try {
      const response = await apiService.post('/AssesmentMaster', data);
      return normalizeAssesmentMasterItem(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to create assessment');
    }
  },

  async update(id, data) {
    try {
      const response = await apiService.put(`/AssesmentMaster/${id}`, data);
      return normalizeAssesmentMasterItem(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to update assessment');
    }
  },

  async delete(id) {
    try {
      await apiService.delete(`/AssesmentMaster/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete assessment');
    }
  },
};
