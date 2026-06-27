import { menuConfig, roleMapping, menuCategories } from '../config/menuConfig';
import menuService from '../services/menuService';

const XML_MENU_CACHE = {
  loaded: false,
  itemsByRole: {},
};

const convertXmlMenuItem = (node) => {
  const item = {
    id: node.getAttribute('id') || node.getAttribute('path') || node.getAttribute('label') || node.textContent.trim(),
    label: node.getAttribute('label') || node.getAttribute('name') || node.textContent.trim(),
    path: node.getAttribute('path') || '',
    icon: node.getAttribute('icon') || '',
    category: node.getAttribute('category') || 'general',
    isLogout: node.getAttribute('isLogout') === 'true',
    disabled: node.getAttribute('disabled') === 'true',
    sortOrder: Number(node.getAttribute('sortOrder') || 0),
    children: [],
  };

  const childItems = Array.from(node.children)
    .filter((child) => child.tagName.toLowerCase() === 'item')
    .map(convertXmlMenuItem);

  if (childItems.length > 0) {
    item.children = childItems;
  }

  return item;
};

const parseXmlMenuFile = (xmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'application/xml');
  const parserErrors = doc.getElementsByTagName('parsererror');

  if (parserErrors.length > 0) {
    throw new Error(parserErrors[0].textContent || 'Invalid XML menu file');
  }

  const menuRoles = [];
  const roleNodes = Array.from(doc.querySelectorAll('menus > role'));

  roleNodes.forEach((roleNode) => {
    const roleName = roleNode.getAttribute('name') || '';
    const items = Array.from(roleNode.children)
      .filter((child) => child.tagName.toLowerCase() === 'item')
      .map(convertXmlMenuItem);

    menuRoles.push({ roleName, items });
  });

  return menuRoles;
};

const fetchXmlMenuFile = async () => {
  if (XML_MENU_CACHE.loaded) {
    return XML_MENU_CACHE.itemsByRole;
  }

  try {
    const menuFileUrl = `${process.env.PUBLIC_URL || ''}/menu.xml`;
    const response = await fetch(menuFileUrl, { cache: 'no-cache' });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${menuFileUrl} (${response.status})`);
    }

    const xmlText = await response.text();
    const menuRoles = parseXmlMenuFile(xmlText);
    const itemsByRole = {};

    menuRoles.forEach(({ roleName, items }) => {
      itemsByRole[normalizeRole(roleName)] = items;
    });

    XML_MENU_CACHE.loaded = true;
    XML_MENU_CACHE.itemsByRole = itemsByRole;

    return itemsByRole;
  } catch (error) {
    console.warn('[menu] XML menu load failure:', error);
    XML_MENU_CACHE.loaded = true;
    XML_MENU_CACHE.itemsByRole = {};
    return {};
  }
};

const getMenuItemsFromXmlFile = async (role, userPermissions = {}) => {
  const normalizedRole = normalizeRole(role);
  const itemsByRole = await fetchXmlMenuFile();
  const rawItems = itemsByRole[normalizedRole] || itemsByRole['User'] || [];
  return filterMenuByPermissions(rawItems, userPermissions);
};

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
 * Resolves menu items for a given role from database
 * @param {string} role - The role name
 * @param {Object} userPermissions - Optional user permissions for filtering
 * @returns {Promise<Array>} - Array of menu items
 */
const filterMenuByPermissions = (items, userPermissions = {}) => {
  if (!userPermissions || Object.keys(userPermissions).length === 0) return items;

  return items.filter((item) => {
    if (item.requiredPermission) {
      return userPermissions[item.requiredPermission] === true;
    }
    if (item.hidden === true) return false;
    if (item.condition && typeof item.condition === 'function') {
      return item.condition(userPermissions);
    }
    return true;
  });
};

/**
 * Converts database menu items to frontend format
 * @param {Array} databaseItems - Array of database menu items
 * @returns {Array} - Array of frontend menu items
 */
const getItemId = (item) => item?.id ?? item?.Id ?? '';
const getParentItemId = (item) => item?.parentId ?? item?.ParentId ?? null;

const buildMenuTreeFromFlatList = (items) => {
  const itemMap = new Map();
  const treeRoots = [];

  items.forEach((item) => {
    const id = getItemId(item);
    if (!id) return;

    itemMap.set(id, {
      ...item,
      children: Array.isArray(item.children) ? [...item.children] : [],
    });
  });

  items.forEach((item) => {
    const id = getItemId(item);
    if (!id) return;

    const parentId = getParentItemId(item);
    const menuItem = itemMap.get(id);

    if (parentId && itemMap.has(parentId)) {
      const parentItem = itemMap.get(parentId);
      parentItem.children = parentItem.children || [];
      parentItem.children.push(menuItem);
    } else {
      treeRoots.push(menuItem);
    }
  });

  return treeRoots;
};

export const convertDatabaseMenuItems = (databaseItems) => {
  const result = [];
  const roots = Array.isArray(databaseItems) ? databaseItems : [];
  const menuRoots = roots.some(item => getParentItemId(item) != null)
    ? buildMenuTreeFromFlatList(roots)
    : roots;

  const convertItem = (item) => {
    const frontendItem = {
      id: getItemId(item),
      label: item.displayName || item.name,
      path: item.path,
      icon: item.icon,
      category: item.category || 'general',
      sortOrder: item.sortOrder,
      children: []
    };

    if (item.children && item.children.length > 0) {
      frontendItem.children = item.children
        .filter(child => child.isActive && !child.isDeleted)
        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
        .map(convertItem);
    }

    return frontendItem;
  };

  menuRoots
    .filter(item => item.isActive && !item.isDeleted)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    .forEach(item => {
      result.push(convertItem(item));
    });

  return result;
};

/**
 * Sidebar renders a linear list with no nesting; preorder-flatten navigable routes from a DB tree.
 */
export const flattenSidebarMenuItems = (items) => {
  if (!Array.isArray(items)) return [];
  const out = [];

  const walk = (nodes) => {
    for (const node of nodes) {
      const children = Array.isArray(node.children)
        ? node.children.filter(Boolean)
        : [];

      const path = typeof node.path === 'string' ? node.path.trim() : '';
      if (path) {
        const { children: _c, ...rest } = node;
        out.push(rest);
      }

      if (children.length > 0) walk(children);
    }
  };

  walk(items);
  return out;
};

/**
 * Resolves menu items for a given role including inherited items (database-first with config fallback)
 * @param {string} role - The role name
 * @param {Object} userPermissions - Optional user permissions for filtering
 * @returns {Promise<Array>} - Array of menu items
 */
export const getMenuItemsForRole = async (role, userPermissions = {}) => {
  // Simplified: menu is driven ONLY by public/menu.xml (role-based)
  const normalizedRole = normalizeRole(role);
  return getMenuItemsFromXmlFile(normalizedRole, userPermissions);
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

const mergeDbMenuItemsWithConfig = (dbItems, role, userPermissions = {}) => {
  const configItems = getMenuItemsForRoleFromConfig(role, userPermissions);
  const existingPaths = new Set(dbItems.map((item) => item.path || item.id));
  const missingItems = configItems.filter((item) => !existingPaths.has(item.path || item.id));
  return [...dbItems, ...missingItems];
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
