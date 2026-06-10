# LeftNavigationBar Component

A generalized, configurable navigation sidebar component for React applications.

## Features

- **Role-based menu configuration** - Different menus for different user roles
- **Inheritance system** - Roles can inherit common menu items
- **Dynamic filtering** - Filter menu items based on permissions and conditions
- **Search functionality** - Optional search to find menu items quickly
- **Responsive design** - Collapsible sidebar with smooth transitions
- **Badge support** - Display badges on menu items
- **Custom callbacks** - Handle menu item clicks with custom logic
- **Accessibility** - Proper ARIA labels and keyboard navigation

## Basic Usage

```jsx
import LeftNavigationBar from './components/layout/LeftNavigationBar';

function App() {
  return (
    <LeftNavigationBar 
      userRole="Administrator"
    />
  );
}
```

## Advanced Usage

### With Permissions and Search

```jsx
import LeftNavigationBar from './components/layout/LeftNavigationBar';

function App() {
  const userPermissions = {
    canManageUsers: true,
    canViewReports: false,
    canAccessSettings: true
  };

  const handleMenuClick = (item) => {
    console.log('Menu item clicked:', item);
    // Custom logic for menu item clicks
  };

  return (
    <LeftNavigationBar 
      userRole="Administrator"
      userPermissions={userPermissions}
      showSearch={true}
      onItemClick={handleMenuClick}
    />
  );
}
```

### With Custom Menu Items

```jsx
import LeftNavigationBar from './components/layout/LeftNavigationBar';

function App() {
  const customMenu = [
    {
      id: 'dashboard',
      icon: 'bi-dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      badge: { text: 'New', color: 'success' }
    },
    {
      id: 'analytics',
      icon: 'bi-graph-up',
      label: 'Analytics',
      path: '/analytics',
      keywords: ['reports', 'stats', 'data']
    }
  ];

  return (
    <LeftNavigationBar 
      userRole="Custom"
      customMenuItems={customMenu}
      showSearch={true}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `userRole` | string | 'User' | The role of the current user |
| `userPermissions` | object | {} | User permissions for filtering menu items |
| `onItemClick` | function | undefined | Callback when menu item is clicked |
| `customMenuItems` | array | undefined | Custom menu items to override role-based menu |
| `showSearch` | boolean | false | Enable search functionality |
| `enableFiltering` | boolean | false | Enable advanced filtering options |

## Menu Item Structure

Each menu item can have the following properties:

```javascript
{
  id: 'unique-id',              // Required: Unique identifier
  icon: 'bi-icon-name',         // Required: Bootstrap icon class
  label: 'Menu Item Label',     // Required: Display text
  path: '/route-path',          // Required: Navigation path
  badge: {                      // Optional: Badge display
    text: 'Badge Text',
    color: 'primary'            // Bootstrap color
  },
  keywords: ['search', 'terms'], // Optional: Search keywords
  disabled: false,              // Optional: Disable item
  hidden: false,                // Optional: Hide item
  requiredPermission: 'perm',   // Optional: Required permission
  condition: (permissions) => {  // Optional: Conditional visibility
    return permissions.someCondition;
  },
  category: 'general'           // Optional: Category for grouping
}
```

## Configuration

### Menu Configuration (`src/config/menuConfig.js`)

The menu configuration is separated into:

- **Base items**: Common menu items that can be inherited
- **Role items**: Role-specific menu configurations
- **Role mapping**: Normalization of role names

### Adding New Roles

1. Add role configuration to `menuConfig.roles`:

```javascript
'NewRole': {
  inherits: ['base.common'],
  items: [
    {
      icon: 'bi-star',
      label: 'Custom Feature',
      path: '/custom',
      id: 'custom-feature'
    }
  ]
}
```

2. Add role mapping if needed:

```javascript
export const roleMapping = {
  'newrole': 'NewRole',
  'new-role': 'NewRole'
};
```

### Permission-based Filtering

Menu items can be filtered based on user permissions:

```javascript
{
  icon: 'bi-shield',
  label: 'Admin Panel',
  path: '/admin',
  id: 'admin-panel',
  requiredPermission: 'canAccessAdmin'
}
```

## Utility Functions

### `getMenuItemsForRole(role, permissions)`

Resolves menu items for a role with permission filtering.

### `normalizeRole(role)`

Normalizes role names for consistent matching.

### `filterMenuItems(items, query)`

Filters menu items based on search query.

### `groupMenuItemsByCategory(items)`

Groups menu items by category.

## Styling

The component uses Bootstrap classes and includes custom CSS for:

- Smooth width transitions
- Hover states
- Active states
- Responsive behavior
- Mobile optimization

## Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- High contrast support

## Examples

### Conditional Menu Items

```javascript
{
  icon: 'bi-bell',
  label: 'Notifications',
  path: '/notifications',
  id: 'notifications',
  condition: (permissions) => permissions.hasNotifications
}
```

### Menu Items with Badges

```javascript
{
  icon: 'bi-envelope',
  label: 'Messages',
  path: '/messages',
  id: 'messages',
  badge: { 
    text: '5', 
    color: 'danger' 
  }
}
```

### Disabled Menu Items

```javascript
{
  icon: 'bi-lock',
  label: 'Restricted Feature',
  path: '/restricted',
  id: 'restricted',
  disabled: true,
  requiredPermission: 'premiumFeature'
}
```

## Migration from v1.0

The generalized version maintains backward compatibility while adding new features:

1. **Configuration moved**: Menu items are now in `src/config/menuConfig.js`
2. **New props added**: `userPermissions`, `onItemClick`, `customMenuItems`, `showSearch`
3. **Enhanced filtering**: Permission-based and search filtering
4. **Better structure**: Inheritance system for reusable menu items

To migrate existing code:

```jsx
// Before (v1.0)
<LeftNavigationBar userRole="Administrator" />

// After (v2.0) - same basic usage
<LeftNavigationBar userRole="Administrator" />

// After (v2.0) - with new features
<LeftNavigationBar 
  userRole="Administrator"
  userPermissions={userPermissions}
  showSearch={true}
  onItemClick={handleMenuClick}
/>
```
