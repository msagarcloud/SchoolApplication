import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getGroupedMenuItemsForRole, groupMenuItemsForHorizontalNav, normalizeRole } from '../../utils/menuUtils';
import { authService } from '../../services/authService';
import menuService from '../../services/menuService';

// Stable empty object reference to prevent infinite re-renders
const EMPTY_PERMISSIONS = {};

const TopNavigationMenu = ({
  userRole,
  userPermissions,
  onItemClick,
  customMenuItems,
  showSearch = false,
  variant = 'primary', // 'primary', 'light', 'dark'
  useGrouping = true // New prop to enable/disable grouping
}) => {
  // Use stable reference for default permissions
  const stablePermissions = userPermissions || EMPTY_PERMISSIONS;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [loading, setLoading] = useState(true);
  const [groupedMenuItems, setGroupedMenuItems] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  // Load menu items from database
  useEffect(() => {
    const loadMenuItems = async () => {
      setLoading(true);
      try {
        let items;
        if (customMenuItems) {
          items = groupMenuItemsForHorizontalNav(customMenuItems);
        } else {
          items = await getGroupedMenuItemsForRole(userRole, stablePermissions);
        }
        setGroupedMenuItems(items);
      } catch (error) {
        console.error('Error loading menu items:', error);
        // Set empty menu on error
        setGroupedMenuItems({});
      } finally {
        setLoading(false);
      }
    };

    loadMenuItems();
  }, [userRole, stablePermissions, customMenuItems]);

  // Filter menu items if search is enabled
  const filteredGroupedItems = useMemo(() => {
    if (!showSearch || !searchQuery.trim()) {
      return groupedMenuItems;
    }
    
    const lowerQuery = searchQuery.toLowerCase().trim();
    const filtered = {};
    
    Object.entries(groupedMenuItems).forEach(([categoryKey, category]) => {
      const filteredItems = category.items.filter(item => 
        item.label.toLowerCase().includes(lowerQuery) ||
        item.path.toLowerCase().includes(lowerQuery) ||
        (item.keywords && item.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery)))
      );
      
      if (filteredItems.length > 0) {
        filtered[categoryKey] = {
          ...category,
          items: filteredItems
        };
      }
    });
    
    return filtered;
  }, [groupedMenuItems, searchQuery, showSearch]);

  const handleNavigation = async (path, item) => {
    if (onItemClick) {
      onItemClick(item);
    }
    
    // Handle logout specially
    if (item.isLogout) {
      try {
        await authService.logout();
        navigate('/login');
      } catch (error) {
        console.error('Logout error:', error);
        navigate('/login');
      }
    } else {
      navigate(path);
    }
    
    setActiveDropdown(null);
  };

  const toggleDropdown = (categoryKey) => {
    setActiveDropdown(activeDropdown === categoryKey ? null : categoryKey);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const hasActiveItem = (items) => {
    return items.some(item => {
      if (isActive(item.path)) return true;
      return item.children && item.children.length > 0 && hasActiveItem(item.children);
    });
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'light':
        return 'navbar-light bg-light border-bottom';
      case 'dark':
        return 'navbar-dark bg-dark';
      default:
        return 'navbar-dark bg-primary';
    }
  };

  // Render single menu item (for categories with single item)
  const renderSingleItem = (item) => (
    <li className="nav-item" key={item.id || item.path}>
      <button
        className={`nav-link ${
          isActive(item.path) ? 'active' : ''
        } ${item.isLogout ? 'text-danger' : ''}`}
        onClick={() => handleNavigation(item.path, item)}
        disabled={item.disabled}
      >
        <i className={`bi ${item.icon} me-1`}></i>
        {item.label}
        {item.badge && (
          <span className={`badge bg-${item.badge.color || 'secondary'} ms-1`}>
            {item.badge.text}
          </span>
        )}
      </button>
    </li>
  );

  // Render dropdown menu for categories with multiple items
  const renderDropdown = (categoryKey, category) => {
    const isDropdownActive = activeDropdown === categoryKey;
    const hasActiveChild = hasActiveItem(category.items);
    
    return (
      <li className="nav-item dropdown" key={categoryKey}>
        <button
          className={`nav-link dropdown-toggle ${
            hasActiveChild ? 'active' : ''
          } ${isDropdownActive ? 'show' : ''}`}
          onClick={() => toggleDropdown(categoryKey)}
          aria-expanded={isDropdownActive ? "true" : "false"}
        >
          <i className={`bi ${category.icon} me-1`}></i>
          {category.label}
        </button>
        {isDropdownActive && (
          <ul className="dropdown-menu show">
            {category.items.map((item, index) => (
              <li key={item.id || item.path || index}>
                <button
                  className={`dropdown-item ${
                    isActive(item.path) ? 'active' : ''
                  } ${item.isLogout ? 'text-danger' : ''}`}
                  onClick={() => handleNavigation(item.path, item)}
                  disabled={item.disabled}
                >
                  <i className={`bi ${item.icon} me-2`}></i>
                  {item.label}
                  {item.badge && (
                    <span className={`badge bg-${item.badge.color || 'secondary'} ms-2`}>
                      {item.badge.text}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  // Render hierarchical menu items (for database-driven menus)
  const renderHierarchicalMenu = (items, level = 0) => {
    return items.map((item, index) => {
      const itemKey = item.id || item.path || `${item.label}-${index}`;
      const hasChildren = item.children && item.children.length > 0;
      const activeItem = isActive(item.path) || (hasChildren && hasActiveItem(item.children));

      if (hasChildren) {
        return (
          <li className="nav-item dropdown" key={itemKey}>
            <button
              className={`nav-link dropdown-toggle ${activeItem ? 'active' : ''}`}
              onClick={() => toggleDropdown(itemKey)}
              aria-expanded={activeDropdown === itemKey ? 'true' : 'false'}
              type="button"
            >
              <i className={`bi ${item.icon} me-1`}></i>
              {item.label}
            </button>
            {activeDropdown === itemKey && (
              <ul className={`dropdown-menu show ${level > 0 ? 'ps-2' : ''}`}>
                {renderHierarchicalMenu(item.children, level + 1)}
              </ul>
            )}
          </li>
        );
      }

      return (
        <li className="nav-item" key={itemKey}>
          <button
            className={`dropdown-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => handleNavigation(item.path, item)}
            disabled={item.disabled}
            type="button"
          >
            <i className={`bi ${item.icon} me-2`}></i>
            {item.label}
            {item.badge && (
              <span className={`badge bg-${item.badge.color || 'secondary'} ms-2`}>
                {item.badge.text}
              </span>
            )}
          </button>
        </li>
      );
    });
  };

  return (
    <nav className={`navbar navbar-expand-lg ${getVariantClasses()} shadow-sm`}>
      <div className="container-fluid">
        {/* Brand */}
        <a className="navbar-brand fw-bold" href="/dashboard">
          <i className="bi bi-mortarboard-fill me-2"></i>
          School Demo
        </a>
        
        {/* Mobile toggle */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#topNavbarNav"
          aria-controls="topNavbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="topNavbarNav">
          {/* Search functionality */}
          {showSearch && (
            <div className="navbar-nav me-auto">
              <div className="nav-item">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search menu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ minWidth: '200px' }}
                  />
                  {searchQuery && (
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => setSearchQuery('')}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Main navigation items with grouping */}
          <ul className="navbar-nav me-auto">
            {loading ? (
              <li className="nav-item">
                <span className="navbar-text">
                  <i className="bi bi-hourglass-split me-2"></i>
                  Loading menu...
                </span>
              </li>
            ) : Object.keys(filteredGroupedItems).length === 0 ? (
                <li className="nav-item">
                  {(() => {
                    const fetchError = menuService.getLastFetchError(normalizeRole(userRole || ''));
                    if (fetchError) {
                      return (
                        <span className="navbar-text text-warning">
                          <i className="bi bi-exclamation-triangle me-2"></i>
                          Failed to load menu from server for role: {userRole} — using fallback configuration
                        </span>
                      );
                    }

                    return (
                      <span className="navbar-text text-warning">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        No menus assigned to role: {userRole}
                      </span>
                    );
                  })()}
                </li>
              ) : (
              Object.entries(filteredGroupedItems).map(([categoryKey, category]) => {
                // Check if this is a hierarchical menu structure from database
                const hasHierarchicalItems = category.items.some(item => item.children && item.children.length > 0);
                
                if (hasHierarchicalItems) {
                  // Render hierarchical menu for database-driven structure
                  return renderHierarchicalMenu(category.items);
                } else if (!useGrouping && category.items.length === 1) {
                  // Render as single item if category has only one item and useGrouping is false
                  return renderSingleItem(category.items[0]);
                } else {
                  // Render as dropdown if category has multiple items or grouping is enabled
                  return renderDropdown(categoryKey, category);
                }
              })
            )}
          </ul>

          {/* User info display */}
          <div className="navbar-nav ms-auto">
            <div className="nav-item">
              <span className="navbar-text">
                <i className="bi bi-person-badge me-1"></i>
                Role: {userRole}
                {Object.values(filteredGroupedItems).reduce((total, category) => total + category.items.length, 0) !== 
                 Object.values(groupedMenuItems).reduce((total, category) => total + category.items.length, 0) && (
                  <span className="text-muted ms-2">
                    ({Object.values(filteredGroupedItems).reduce((total, category) => total + category.items.length, 0)}/
                    {Object.values(groupedMenuItems).reduce((total, category) => total + category.items.length, 0)})
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* No results message */}
      {showSearch && searchQuery && Object.keys(filteredGroupedItems).length === 0 && (
        <div className="alert alert-info m-2 mb-0">
          <i className="bi bi-info-circle me-2"></i>
          No menu items found for "{searchQuery}"
        </div>
      )}

      <style>{`
        .navbar-nav .nav-link {
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .navbar-nav .nav-link:hover {
          opacity: 0.8;
        }
        .navbar-nav .nav-link.active {
          font-weight: 600;
        }
        .dropdown-menu.show {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 1000;
          min-width: 200px;
        }
        .dropdown-item.active {
          background-color: #0d6efd;
          color: white;
        }
        @media (max-width: 768px) {
          .navbar-nav {
            flex-direction: column;
            width: 100%;
          }
          .navbar-nav .nav-item {
            width: 100%;
          }
          .dropdown-menu.show {
            position: static;
            width: 100%;
            box-shadow: none;
            border: none;
            background-color: rgba(0,0,0,0.05);
          }
        }
      `}</style>
    </nav>
  );
};

export default TopNavigationMenu;
