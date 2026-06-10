import apiService from './api';

class StudyMaterialService {
  // Get all study materials
  async getStudyMaterials() {
    return apiService.get('/materials');
  }

  // Get material by ID
  async getMaterialById(id) {
    return apiService.get(`/materials/${id}`);
  }

  // Create new study material
  async createMaterial(materialData, onProgress) {
    const formData = new FormData();
    
    // Add form fields
    Object.keys(materialData).forEach(key => {
      if (key !== 'file' && key !== 'tags') {
        formData.append(key, materialData[key]);
      }
    });

    // Add tags as JSON string
    if (materialData.tags) {
      formData.append('tags', JSON.stringify(materialData.tags));
    }

    // Add file if present
    if (materialData.file) {
      formData.append('file', materialData.file);
    }

    return apiService.upload('/materials', formData, onProgress);
  }

  // Update study material
  async updateMaterial(id, materialData) {
    return apiService.put(`/materials/${id}`, materialData);
  }

  // Delete study material
  async deleteMaterial(id) {
    return apiService.delete(`/materials/${id}`);
  }

  // Download material
  async downloadMaterial(id, filename) {
    return apiService.download(`/materials/${id}/download`, filename);
  }

  // Get classes for material selection
  async getClasses() {
    return apiService.get('/classes');
  }

  // Get subjects for material selection
  async getSubjects() {
    return apiService.get('/subjects');
  }

  // Get teachers for material selection
  async getTeachers() {
    return apiService.get('/teachers');
  }

  // Get material download history
  async getDownloadHistory(materialId) {
    return apiService.get(`/materials/${materialId}/downloads`);
  }

  // Get related materials
  async getRelatedMaterials(materialId) {
    return apiService.get(`/materials/${materialId}/related`);
  }

  // Share material with students
  async shareMaterial(materialId, shareData) {
    return apiService.post(`/materials/${materialId}/share`, shareData);
  }

  // Get material statistics
  async getMaterialStatistics(materialId) {
    return apiService.get(`/materials/${materialId}/statistics`);
  }

  // Search materials
  async searchMaterials(searchQuery) {
    return apiService.get(`/materials/search?q=${encodeURIComponent(searchQuery)}`);
  }

  // Get materials by class and subject
  async getMaterialsByClassAndSubject(className, subject) {
    return apiService.get(`/materials/class/${className}/subject/${subject}`);
  }

  // Get public materials
  async getPublicMaterials() {
    return apiService.get('/materials/public');
  }

  // Upload multiple files (for batch upload)
  async uploadMultipleFiles(files, materialData, onProgress) {
    const formData = new FormData();
    
    // Add form fields
    Object.keys(materialData).forEach(key => {
      if (key !== 'files' && key !== 'tags') {
        formData.append(key, materialData[key]);
      }
    });

    // Add tags as JSON string
    if (materialData.tags) {
      formData.append('tags', JSON.stringify(materialData.tags));
    }

    // Add multiple files
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });

    return apiService.upload('/materials/batch', formData, onProgress);
  }
}

export default new StudyMaterialService();
