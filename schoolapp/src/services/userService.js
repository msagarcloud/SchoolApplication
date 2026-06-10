import apiService from './api';

class UserService {
  // Get all users
  async getUsers() {
    const raw = await apiService.get('/User');
    let list = [];
    if (Array.isArray(raw)) list = raw;
    else if (raw && Array.isArray(raw.data)) list = raw.data;
    else if (raw && Array.isArray(raw.items)) list = raw.items;

    const mapped = list.map(u => ({
      id: u.id,
      fullName: [u.firstName, u.lastName].filter(Boolean).join(' ').trim() || u.userName || u.UserName || '',
      userName: u.userName || u.UserName || '',
      email: u.emailAddress || u.EmailAddress || u.email || '',
      role: u.UserRole?.RoleName || u.userRoleName || u.role || u.roleName || (typeof u.userRole === 'string' ? u.userRole : null) || (typeof u.UserRole === 'string' ? u.UserRole : null) || null,
      department: u.designation?.name || u.designation?.Name || u.designation?.designationName || u.designation?.DesignationName || u.Designation?.name || u.Designation?.Name || u.Designation?.designationName || u.Designation?.DesignationName || u.designationName || u.DesignationName || u.department || u.Department || (typeof u.designation === 'string' ? u.designation : null) || null,
      lastLogin: u.lastLogin || u.LastLogin || null,
      createdDate: u.createdDate || u.CreatedDate || null,
      status: (typeof u.isActive === 'boolean') ? (u.isActive ? 'Active' : 'Inactive') : (u.status || u.Status || null)
    }));

    return mapped;
  }

  // Get user by ID
  async getUserById(id) {
    return apiService.get(`/User/${id}`);
  }

  // Create new user
  async createUser(userData) {
    return apiService.post('/User', userData);
  }

  // Update user
  async updateUser(id, userData) {
    return apiService.put(`/User/${id}`, userData);
  }

  // Delete user
  async deleteUser(id) {
    return apiService.delete(`/User/${id}`);
  }

  // Toggle user status (activate/deactivate)
  async toggleUserStatus(id) {
    return apiService.post(`/User/${id}/toggle-status`);
  }

  // Reset user password
  async resetUserPassword(id) {
    return apiService.post(`/User/${id}/reset-password`);
  }

  // Get user login history
  async getUserLoginHistory(userId) {
    return apiService.get(`/User/${userId}/login-history`);
  }

  // Get user activity log
  async getUserActivityLog(userId) {
    return apiService.get(`/User/${userId}/activity-log`);
  }

  // Get user permissions
  async getUserPermissions(userId) {
    return apiService.get(`/User/${userId}/permissions`);
  }

  // Update user permissions
  async updateUserPermissions(userId, permissions) {
    return apiService.put(`/User/${userId}/permissions`, { permissions });
  }

  // Get available roles
  async getAvailableRoles() {
    return apiService.get('/Role');
  }

  // Get user statistics
  async getUserStatistics() {
    return apiService.get('/users/statistics');
  }
}

export default new UserService();
