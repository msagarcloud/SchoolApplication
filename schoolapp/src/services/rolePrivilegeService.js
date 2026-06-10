import api from './authService';

const toError = (error, fallbackMessage) => {
  const data = error.response?.data;
  if (typeof data === 'string' && data.trim()) {
    return new Error(data);
  }
  if (data?.message) {
    return new Error(data.message);
  }
  return new Error(error.message || fallbackMessage);
};

export const rolePrivilegeService = {
  async getAll() {
    try {
      const response = await api.get('/roleprivilege');
      return response.data;
    } catch (error) {
      throw toError(error, 'Failed to fetch role privileges');
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/roleprivilege/${id}`);
      return response.data;
    } catch (error) {
      throw toError(error, 'Failed to fetch role privilege');
    }
  },

  async getByRoleId(roleId) {
    try {
      const rolePrivileges = await this.getAll();
      const normalizedRoleId = String(roleId || '').toLowerCase();

      return (Array.isArray(rolePrivileges) ? rolePrivileges : []).filter((item) => {
        const itemRoleId = String(item.roleId || item.RoleId || '').toLowerCase();
        const isDeleted = item.isDeleted ?? item.IsDeleted ?? false;
        return itemRoleId === normalizedRoleId && !isDeleted;
      });
    } catch (error) {
      throw toError(error, 'Failed to fetch role privileges for selected role');
    }
  },

  async create(rolePrivilegeData) {
    try {
      console.log('Creating role privilege with data:', rolePrivilegeData);
      
      // Handle multiple privileges
      if (rolePrivilegeData.privilegeIds && Array.isArray(rolePrivilegeData.privilegeIds)) {
        const results = [];
        const skipped = [];
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        
        // Get existing privileges for this role
        const existingPrivileges = await this.getByRoleId(rolePrivilegeData.roleId);
        const existingPrivilegeIds = new Set(
          existingPrivileges.map(ep => String(ep.privilegeId || ep.PrivilegeId).toLowerCase())
        );
        
        for (const privilegeId of rolePrivilegeData.privilegeIds) {
          const normalizedPrivilegeId = String(privilegeId).toLowerCase();
          
          // Skip if privilege is already assigned
          if (existingPrivilegeIds.has(normalizedPrivilegeId)) {
            console.log(`Privilege ${privilegeId} already assigned to role ${rolePrivilegeData.roleId}, skipping`);
            skipped.push(privilegeId);
            continue;
          }
          
          const singlePrivilegeData = {
            roleId: rolePrivilegeData.roleId,
            privilegeId: privilegeId,
            createdBy: currentUser.id || currentUser.userId || null,
            isActive: rolePrivilegeData.isActive,
            isDeleted: rolePrivilegeData.isDeleted,
            status: 'CMP',
            statusMessage: 'Role privilege assigned successfully'
          };
          console.log('Sending single privilege data:', singlePrivilegeData);
          const response = await api.post('/roleprivilege', singlePrivilegeData);
          results.push(response.data);
        }
        
        // Return results with information about skipped privileges
        return {
          created: results,
          skipped: skipped,
          message: skipped.length > 0 
            ? `Created ${results.length} privileges. ${skipped.length} privileges were already assigned and were skipped.`
            : `Created ${results.length} privileges successfully.`
        };
      } else {
        // Handle single privilege (backward compatibility)
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        
        // Check if single privilege already exists
        const existingPrivileges = await this.getByRoleId(rolePrivilegeData.roleId);
        const existingPrivilegeIds = new Set(
          existingPrivileges.map(ep => String(ep.privilegeId || ep.PrivilegeId).toLowerCase())
        );
        
        const normalizedPrivilegeId = String(rolePrivilegeData.privilegeId).toLowerCase();
        if (existingPrivilegeIds.has(normalizedPrivilegeId)) {
          throw new Error('This privilege is already assigned to the selected role.');
        }
        
        const payload = {
          ...rolePrivilegeData,
          createdBy: currentUser.id || currentUser.userId || rolePrivilegeData.createdBy || null,
          status: 'CMP',
          statusMessage: 'Role privilege assigned successfully'
        };
        console.log('Sending single privilege data:', payload);
        const response = await api.post('/roleprivilege', payload);
        return response.data;
      }
    } catch (error) {
      console.error('Error creating role privilege:', error);
      throw toError(error, 'Failed to create role privilege');
    }
  },

  async update(id, rolePrivilegeData) {
    try {
      const payload = {
        ...rolePrivilegeData,
        status: 'CMP',
        statusMessage: 'Role privilege updated successfully'
      };
      const response = await api.put(`/roleprivilege/${id}`, payload);
      return response.data;
    } catch (error) {
      throw toError(error, 'Failed to update role privilege');
    }
  },

  async delete(id) {
    try {
      await api.delete(`/roleprivilege/${id}`);
      return true;
    } catch (error) {
      throw toError(error, 'Failed to delete role privilege');
    }
  }
};
