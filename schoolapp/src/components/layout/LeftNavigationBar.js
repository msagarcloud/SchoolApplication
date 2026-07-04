import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMenuItemsForRoleFromConfig } from '../../utils/menuUtils';


// Stable empty object reference to prevent unnecessary re-renders
const EMPTY_PERMISSIONS = {};

const LeftNavigationBar = ({
  userRole,
  userPermissions,
  onItemClick,
  customMenuItems,
  showSearch = false,
  enableFiltering = false
}) => {
  // Use stable reference for default permissions
  const stablePermissions = userPermissions || EMPTY_PERMISSIONS;
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentMenuItems, setCurrentMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleExpanded = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const isMenuItemActive = (item) => {
    if (!item) return false;
    if (item.path && location.pathname === item.path) {
      return true;
    }
    return Array.isArray(item.children) && item.children.some(isMenuItemActive);
  };

  const renderMenuItem = (item, level = 0) => {
    const hasChildren = Array.isArray(item.children) && item.children.length > 0;
    const itemKey = item.id || item.path;
    const isActiveItem = isMenuItemActive(item);
    const expanded = Boolean(expandedItems[itemKey]);

    return (
      <li className="nav-item" key={itemKey || level}>
        <div
          className={`d-flex align-items-center justify-content-between ${isActiveItem ? 'bg-primary' : ''}`}
          style={{ paddingLeft: collapsed ? '0' : `${level * 0.75}rem` }}
        >
          <button
            className={`nav-link text-white w-100 text-start d-flex align-items-center ${isActiveItem ? 'active' : ''}`}
            onClick={() => {
              if (item.path) {
                handleNavigation(item.path, item);
              } else if (hasChildren) {
                toggleExpanded(itemKey);
              }
            }}
            title={collapsed ? item.label : ''}
            disabled={item.disabled}
            type="button"
          >
            <i className={`bi ${item.icon || 'bi-circle'} me-3`}></i>
            {!collapsed && (
              <span className="flex-grow-1">{item.label}</span>
            )}
            {!collapsed && item.badge && (
              <span className={`badge bg-${item.badge.color || 'primary'} ms-auto`}>
                {item.badge.text}
              </span>
            )}
          </button>

          {!collapsed && hasChildren && (
            <button
              className="btn btn-sm btn-outline-light ms-2"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(itemKey);
              }}
              type="button"
              aria-label={expanded ? 'Collapse submenu' : 'Expand submenu'}
            >
              <i className={`bi ${expanded ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
            </button>
          )}
        </div>

        {hasChildren && expanded && !collapsed && (
          <ul className="nav flex-column ms-3">
            {item.children.map((child) => renderMenuItem(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  const filterMenuTree = (items, query) => {
    if (!query || query.trim() === '') {
      return items;
    }

    const lowerQuery = query.toLowerCase().trim();

    return items
      .map((item) => {
        const itemMatches =
          item.label.toLowerCase().includes(lowerQuery) ||
          (item.path && item.path.toLowerCase().includes(lowerQuery)) ||
          (item.keywords && item.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery)));

        const filteredChildren = item.children ? filterMenuTree(item.children, query) : [];

        if (itemMatches || filteredChildren.length > 0) {
          return {
            ...item,
            children: filteredChildren,
          };
        }

        return null;
      })
      .filter(Boolean);
  };

  // Load menu items from database
  useEffect(() => {
    const loadMenuItems = async () => {
      if (customMenuItems) {
        setCurrentMenuItems(customMenuItems);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const items = getMenuItemsForRoleFromConfig(userRole, stablePermissions);
        setCurrentMenuItems(items || []);

      } catch (error) {
        console.error('Error loading menu items:', error);
        setCurrentMenuItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadMenuItems();
  }, [userRole, stablePermissions, customMenuItems]);

  // Filter menu items if search is enabled
  const filteredMenuItems = useMemo(() => {
    if (!showSearch || !searchQuery.trim()) {
      return currentMenuItems;
    }

    return filterMenuTree(currentMenuItems, searchQuery);
  }, [currentMenuItems, searchQuery, showSearch]);

  const handleNavigation = (path, item) => {
    if (onItemClick) {
      onItemClick(item);
    }
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`sidebar bg-dark text-white d-flex flex-column ${collapsed ? 'collapsed' : ''}`} style={{ height: '100%', minHeight: 0 }}>
      <div className="sidebar-header p-3 border-bottom border-secondary">
        <div className="d-flex align-items-center justify-content-between">
          {!collapsed && (
            <h5 className="mb-0">
              <i className="bi bi-list-ul me-2"></i>
              Menu
            </h5>
          )}
          <button 
            className="btn btn-sm btn-outline-light" 
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <i className={`bi ${collapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
          </button>
        </div>
        
        {/* Search functionality */}
        {showSearch && !collapsed && (
          <div className="mt-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setSearchQuery('')}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="sidebar-body">
        {loading ? (
          <div className="text-center text-white-50 p-4">
            <div className="spinner-border spinner-border-sm mb-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="small">Loading menu...</div>
          </div>
        ) : filteredMenuItems.length === 0 ? (
          <div className="text-center text-white-50 p-4">
            <i className="bi bi-exclamation-triangle fs-4 mb-2 d-block"></i>
            <div className="small">No menus assigned</div>
            <div className="small">to role: {userRole}</div>
          </div>
        ) : (
        <>
          <ul className="nav flex-column p-2">
            {filteredMenuItems.map((item) => renderMenuItem(item))}
          </ul>
          
          {/* Show no results message when search yields no results */}
          {showSearch && searchQuery && filteredMenuItems.length === 0 && (
            <div className="text-center text-white-50 p-3">
              <i className="bi bi-search mb-2"></i>
              <div>No menu items found</div>
            </div>
          )}
        </>
        )}
      </div>

      <div className="sidebar-footer p-3 border-top border-secondary mt-auto">
        {!collapsed && (
          <div className="small text-white-50">
            <div>Role: {userRole}</div>
            <div>Items: {filteredMenuItems.length}/{currentMenuItems.length}</div>
            <div className="mt-1">
              <i className="bi bi-info-circle me-1"></i>
              v2.0.0
            </div>
          </div>
        )}
        {collapsed && (
          <div className="text-center">
            <i className="bi bi-info-circle text-white-50" title={`Role: ${userRole} | Items: ${filteredMenuItems.length}`}></i>
          </div>
        )}
      </div>

      <style>{`
        .sidebar {
          display: flex;
          flex-direction: column;
          width: ${collapsed ? '80px' : '250px'};
          transition: width 0.3s ease;
          position: sticky;
          top: 0;
          z-index: 1000;
          height: 100%;
          min-height: 0;
        }
        .sidebar.collapsed {
          width: 80px;
        }
        .sidebar-body {
          flex: 1 1 auto;
          min-height: 0;
          overflow-y: auto;
        }
        .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .nav-link.active {
          background-color: #e5e7eb !important;
          color: #111827 !important;
        }
        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            position: relative;
            min-height: 0;
          }
          .sidebar.collapsed {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default LeftNavigationBar;
