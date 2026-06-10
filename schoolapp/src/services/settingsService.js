import apiService from './api';

class SettingsService {
  // Get all settings
  async getSettings() {
    return apiService.get('/settings');
  }

  // Get settings by category
  async getSettingsByCategory(category) {
    return apiService.get(`/settings/${category}`);
  }

  // Update settings
  async updateSettings(settingsData) {
    return apiService.put('/settings', settingsData);
  }

  // Update settings by category
  async updateSettingsByCategory(category, settingsData) {
    return apiService.put(`/settings/${category}`, settingsData);
  }

  // Reset settings to default
  async resetSettings() {
    return apiService.post('/settings/reset');
  }

  // Test email configuration
  async testEmailConfiguration(emailConfig) {
    return apiService.post('/settings/test-email', emailConfig);
  }

  // Backup settings
  async backupSettings() {
    return apiService.post('/settings/backup');
  }

  // Restore settings
  async restoreSettings(backupData) {
    return apiService.post('/settings/restore', backupData);
  }

  // Export settings
  async exportSettings() {
    return apiService.download('/settings/export', 'settings-backup.json');
  }

  // Import settings
  async importSettings(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);
    
    return apiService.upload('/settings/import', formData, onProgress);
  }

  // Get system information
  async getSystemInfo() {
    return apiService.get('/settings/system-info');
  }

  // Clear cache
  async clearCache() {
    return apiService.post('/settings/clear-cache');
  }

  // Restart system
  async restartSystem() {
    return apiService.post('/settings/restart');
  }

  // Get maintenance status
  async getMaintenanceStatus() {
    return apiService.get('/settings/maintenance');
  }

  // Toggle maintenance mode
  async toggleMaintenanceMode(enabled) {
    return apiService.post('/settings/maintenance', { enabled });
  }

  // Get database statistics
  async getDatabaseStatistics() {
    return apiService.get('/settings/database-stats');
  }

  // Optimize database
  async optimizeDatabase() {
    return apiService.post('/settings/optimize-database');
  }
}

export default new SettingsService();
