import { menuConfig, roleMapping, menuCategories } from '../config/menuConfig';

/**
 * Normalizes role name for case-insensitive matching
 * @param {string} role - The role name to normalize
 * @returns {string} - The normalized role name
 */
export const normalizeRole = (role) => {
  if (role == null || role === '') return 'User';
  const raw = typeof role === 'string' ? role.trim() : String(role).trim();
  if (!raw) return 'User';

  const key = raw.toLowerCase();
  return roleMapping[key] ?? raw;
};

/**
 * Resolves menu items for a given role from config
 * @param {string} role - The role name
 * @param {Object} userPermissions - Optional user permissions for filtering
 * @returns {Promise<Array>} - Array of menu items
 */
export const getMenuItemsForRole = async (role, userPermissions = {}) => {
  const normalizedRole = normalizeRole(role);
  return getMenuItemsForRoleFromConfig(normalizedRole, userPermissions);
};

/**
 * Resolves menu items for a given role from config (fallback)
 * @param {string} role - The role name
 * @param {Object} userPermissions - Optional user permissions for filtering
 * @returns {Array} - Array of menu items
 */
export const getMenuItemsForRoleFromConfig = (role, userPermissions = {}) => {
  const normalizedRole = normalizeRole(role);
  const roleConfig = menuConfig.roles[normalizedRole];
  
  if (!roleConfig) {
    const roleKeyLower = normalizedRole.trim().toLowerCase();
    if (roleKeyLower === 'user') {
      console.warn(`No menu configuration found for role: ${normalizedRole}`);
      return [];
    }
    console.warn(`No menu configuration found for role: ${normalizedRole}, falling back to User`);
    return getMenuItemsForRoleFromConfig('User', userPermissions);
  }

  let menuItems = [];

  // Add inherited items
  if (roleConfig.inherits && roleConfig.inherits.length > 0) {
    roleConfig.inherits.forEach(inheritPath => {
      const [category, subCategory] = inheritPath.split('.');
      const inheritedItems = category === 'base' 
        ? (subCategory ? menuConfig.base[subCategory] : [])
        : [];
      menuItems = [...menuItems, ...inheritedItems];
    });
  }

  // Add role-specific items
  if (roleConfig.items) {
    menuItems = [...menuItems, ...roleConfig.items];
  }

  // Filter items based on permissions if provided
  if (userPermissions && Object.keys(userPermissions).length > 0) {
    menuItems = menuItems.filter(item => {
      // Check if item has permission requirements
      if (item.requiredPermission) {
        return userPermissions[item.requiredPermission] === true;
      }
      // Check if item should be hidden
      if (item.hidden === true) {
        return false;
      }
      // Check conditional visibility
      if (item.condition && typeof item.condition === 'function') {
        return item.condition(userPermissions);
      }
      return true;
    });
  }

  // Remove duplicates based on path or id
  const uniqueItems = menuItems.filter((item, index, self) => {
    const identifier = item.id || item.path;
    return index === self.findIndex(t => (t.id || t.path) === identifier);
  });

  console.log(`Menu items found for role ${normalizedRole}:`, uniqueItems.length, 'items');
  return uniqueItems;
};

/**
 * Filters menu items based on search query
 * @param {Array} items - Array of menu items
 * @param {string} query - Search query
 * @returns {Array} - Filtered menu items
 */
export const filterMenuItems = (items, query) => {
  if (!query || query.trim() === '') {
    return items;
  }

  const lowerQuery = query.toLowerCase().trim();
  return items.filter(item => 
    item.label.toLowerCase().includes(lowerQuery) ||
    item.path.toLowerCase().includes(lowerQuery) ||
    (item.keywords && item.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery)))
  );
};

/**
 * Groups menu items by category for horizontal navigation
 * @param {Array} items - Array of menu items
 * @returns {Object} - Grouped menu items by category with proper ordering
 */
export const groupMenuItemsForHorizontalNav = (items) => {
  const grouped = {};
  
  // Group items by category
  items.forEach(item => {
    const category = item.category || 'general';
    if (!grouped[category]) {
      grouped[category] = {
        ...menuCategories[category],
        items: []
      };
    }
    grouped[category].items.push(item);
  });
  
  // Sort categories by order
  const sortedGroups = {};
  Object.keys(grouped)
    .sort((a, b) => {
      const orderA = grouped[a].order || 999;
      const orderB = grouped[b].order || 999;
      return orderA - orderB;
    })
    .forEach(category => {
      sortedGroups[category] = grouped[category];
    });
  
  return sortedGroups;
};

/**
 * Gets grouped menu items for horizontal navigation
 * @param {string} role - The role name
 * @param {Object} userPermissions - Optional user permissions for filtering
 * @returns {Promise<Object>} - Grouped menu items by category
 */
export const getGroupedMenuItemsForRole = async (role, userPermissions = {}) => {
  try {
    const menuItems = await getMenuItemsForRole(role, userPermissions);
    return groupMenuItemsForHorizontalNav(menuItems);
  } catch (error) {
    console.error('getGroupedMenuItemsForRole failed:', error);
    // Return empty grouped object on error
    return {};
  }
};

/**
 * Validates menu item structure
 * @param {Object} item - Menu item to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateMenuItem = (item) => {
  const requiredFields = ['label', 'path'];
  const missingFields = requiredFields.filter(field => !item[field]);
  
  if (missingFields.length > 0) {
    console.warn(`Menu item validation failed. Missing fields: ${missingFields.join(', ')}`, item);
    return false;
  }
  
  return true;
};

/**
 * Adds dynamic properties to menu items
 * @param {Array} items - Array of menu items
 * @param {Object} dynamicProps - Object with dynamic properties to add
 * @returns {Array} - Menu items with added properties
 */
export const addDynamicProperties = (items, dynamicProps) => {
  return items.map(item => ({
    ...item,
    ...dynamicProps,
    // Allow item-specific overrides
    ...(item.overrideProps || {})
  }));
};
