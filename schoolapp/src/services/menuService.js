import api from './api';

/**
 * Database-driven menu service
 * Handles fetching menu items from the backend API
 */

class MenuService {
  constructor() {
    // Track recent fetch errors per-role for UI feedback
    this.lastFetchErrors = new Map();
  }
  /**
   * Get menu items for a specific role
   * @param {string} roleName - The role name
   * @returns {Promise<Array>} - Array of menu items
   */
  async getMenuForRole(roleName) {
    const normalizedRoleName = typeof roleName === 'string' ? roleName.trim() : String(roleName).trim();
    try {
      const endpoint = `/menu/role/${encodeURIComponent(normalizedRoleName)}`;
      const data = await this._fetchWithRetry(endpoint, normalizedRoleName);
      return data;
    } catch (error) {
      console.debug('Recoverable menu fetch failure for role:', normalizedRoleName, error);
      // Ensure error recorded for UI
      this.lastFetchErrors.set(normalizedRoleName, error?.message || String(error));
      // Fallback to empty array on error
      return [];
    }
  }

  /**
   * Get hierarchical menu items for a specific role
   * @param {string} roleName - The role name
   * @returns {Promise<Array>} - Array of hierarchical menu items
   */
  async getMenuHierarchyForRole(roleName) {
    const normalizedRoleName = typeof roleName === 'string' ? roleName.trim() : String(roleName).trim();
    try {
      const endpoint = `/menu/role/${encodeURIComponent(normalizedRoleName)}/hierarchy`;
      const data = await this._fetchWithRetry(endpoint, normalizedRoleName);
      return data;
    } catch (error) {
      console.debug('Recoverable hierarchical menu fetch failure for role:', normalizedRoleName, error);
      this.lastFetchErrors.set(normalizedRoleName, error?.message || String(error));
      // Fallback to flat menu on error
      return this.getMenuForRole(roleName);
    }
  }

  // Internal helper: fetch with a small retry for transient 5xx errors
  async _fetchWithRetry(endpoint, roleName, retries = 2, delayMs = 400) {
    let attempt = 0;
    while (attempt <= retries) {
      try {
        const response = await api.get(endpoint);
        // clear any previous error on success
        this.lastFetchErrors.delete(roleName);
        return response.data;
      } catch (err) {
        attempt += 1;
        const status = err?.response?.status;
        const isServerError = !status || status >= 500;
        if (attempt > retries || !isServerError) {
          // record final error and rethrow
          this.lastFetchErrors.set(roleName, err?.message || String(err));
          throw err;
        }
        // wait and retry
        await new Promise(res => setTimeout(res, delayMs * attempt));
      }
    }
  }

  getLastFetchError(roleName) {
    const normalized = typeof roleName === 'string' ? roleName.trim() : String(roleName).trim();
    return this.lastFetchErrors.get(normalized) || null;
  }

  /**
   * Get all menu items
   * @returns {Promise<Array>} - Array of all menu items
   */
  async getAllMenus() {
    try {
      const response = await api.get('/menu');
      return response.data;
    } catch (error) {
      console.error('Error fetching all menus:', error);
      return [];
    }
  }

  /**
   * Get menu item by ID
   * @param {string} id - The menu ID
   * @returns {Promise<Object>} - Menu item object
   */
  async getMenuById(id) {
    try {
      const response = await api.get(`/menu/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching menu by ID:', error);
      return null;
    }
  }

  /**
   * Create a new menu item
   * @param {Object} menuData - Menu item data
   * @returns {Promise<Object>} - Created menu item
   */
  async createMenu(menuData) {
    try {
      const response = await api.post('/menu', menuData);
      return response.data;
    } catch (error) {
      console.error('Error creating menu:', error);
      throw error;
    }
  }

  /**
   * Update an existing menu item
   * @param {string} id - The menu ID
   * @param {Object} menuData - Updated menu data
   * @returns {Promise<Object>} - Updated menu item
   */
  async updateMenu(id, menuData) {
    try {
      const response = await api.put(`/menu/${id}`, menuData);
      return response.data;
    } catch (error) {
      console.error('Error updating menu:', error);
      throw error;
    }
  }

  /**
   * Delete a menu item
   * @param {string} id - The menu ID
   * @returns {Promise<boolean>} - Success status
   */
  async deleteMenu(id) {
    try {
      await api.delete(`/menu/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting menu:', error);
      throw error;
    }
  }

  /**
   * Assign menu to role
   * @param {string} menuId - The menu ID
   * @param {string} roleId - The role ID
   * @returns {Promise<boolean>} - Success status
   */
  async assignMenuToRole(menuId, roleId) {
    try {
      await api.post(`/menu/${menuId}/assign-role/${roleId}`);
      return true;
    } catch (error) {
      console.error('Error assigning menu to role:', error);
      throw error;
    }
  }

  /**
   * Remove menu from role
   * @param {string} menuId - The menu ID
   * @param {string} roleId - The role ID
   * @returns {Promise<boolean>} - Success status
   */
  async removeMenuFromRole(menuId, roleId) {
    try {
      await api.post(`/menu/${menuId}/remove-role/${roleId}`);
      return true;
    } catch (error) {
      console.error('Error removing menu from role:', error);
      throw error;
    }
  }
}

// Create singleton instance
const menuService = new MenuService();

export default menuService;
