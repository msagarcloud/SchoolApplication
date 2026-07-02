// Menu configuration for different user roles
// This file centralizes all menu items and their properties

// Category definitions for horizontal navigation
export const menuCategories = {
  dashboard: { label: 'Dashboard', icon: 'bi-speedometer2', order: 1 },
  general: { label: 'General', icon: 'bi-speedometer2', order: 2 },
  masters: { label: 'Masters', icon: 'bi-speedometer2', order: 3 },
  students: { label: 'Students', icon: 'bi-speedometer2', order: 4 },
  teachers: { label: 'Teachers', icon: 'bi-speedometer2', order: 5 },
  examination: { label: 'Examination', icon: 'bi-mortarboard', order: 6 },
  users: { label: 'Users', icon: 'bi-people', order: 7 },
  timeTable: { label: 'Time Table', icon: 'bi-gear', order: 8 },
  financial: { label: 'Financial', icon: 'bi-currency-dollar', order: 9 },
  fees: { label: 'Fees', icon: 'bi-file-text', order: 10 },
  transport: { label: 'Transport', icon: 'bi-truck', order: 11 },
  inventory: { label: 'Inventory', icon: 'bi-person', order: 12 },
  library: { label: 'Library', icon: 'bi-book', order: 13 },
  payroll: { label: 'Payroll', icon: 'bi-cash-stack', order: 14 },
  employee: { label: 'Employee', icon: 'bi-people', order: 15 },
  communication: { label: 'Communication', icon: 'bi-chat-dots', order: 16 },
  events: { label: 'Events', icon: 'bi-calendar-event', order: 17 },
  systemParameters: { label: 'System Parameters', icon: 'bi-sliders', order: 18 }
};

export const menuConfig = {
  // Base menu items that can be inherited by other roles
  base: {
    common: [
      { icon: 'bi-dashboard', label: 'Dashboard', path: '/dashboard', id: 'dashboard', category: 'dashboard' }
    ],
    userManagement: [
      { icon: 'bi-person', label: 'My Profile', path: '/profile', id: 'profile', category: 'personal' },
      { icon: 'bi-gear', label: 'Settings', path: '/settings', id: 'settings', category: 'personal' },
      { icon: 'bi-bell', label: 'Notifications', path: '/notifications', id: 'notifications', category: 'personal' },
      { icon: 'bi-question-circle', label: 'Help & Support', path: '/help', id: 'help', category: 'personal' },
      { icon: 'bi-box-arrow-right', label: 'Logout', path: '/logout', id: 'logout', category: 'personal', isLogout: true }
    ]
  },

  // Role-specific menu configurations
  roles: {
    Accounts: {
      inherits: ['base.common', 'base.userManagement'],
      items: [
        { icon: 'bi-people', label: 'Employee Management', path: '/employees', id: 'employees', category: 'users' },
        { icon: 'bi-currency-dollar', label: 'Salary Management', path: '/salary', id: 'salary', category: 'financial' },
        { icon: 'bi-file-text', label: 'Financial Reports', path: '/reports', id: 'reports', category: 'reports' },
        { icon: 'bi-graph-up', label: 'Budget Planning', path: '/budget', id: 'budget', category: 'financial' }
      ]
    },

    'Super Administrator': {
      inherits: ['base.common', 'base.userManagement'],
      items: [
        { icon: 'bi-people', label: 'Employee Management', path: '/employees', id: 'employees', category: 'users' },
        { icon: 'bi-mortarboard', label: 'Student Management', path: '/students', id: 'students', category: 'academic' },
        { icon: 'bi-people-fill', label: 'Parent Management', path: '/parent', id: 'parent', category: 'users' },
        { icon: 'bi-person-badge', label: 'Designations', path: '/designations', id: 'designations', category: 'employee' },
        { icon: 'bi-clock', label: 'Time Table Periods', path: '/timetableperiods', id: 'timetableperiods', category: 'academic' },
        { icon: 'bi-building', label: 'Company Management', path: '/companies', id: 'companies', category: 'administrative' },
        { icon: 'bi-calendar-event', label: 'Holiday Management', path: '/holidays', id: 'holidays', category: 'events' },
        { icon: 'bi-mortarboard', label: 'School Management', path: '/schools', id: 'schools', category: 'administrative' },
        { icon: 'bi-droplet', label: 'Blood Groups', path: '/bloodgroups', id: 'bloodgroups', category: 'administrative' },
        { icon: 'bi-tags', label: 'Categories', path: '/categories', id: 'categories', category: 'administrative' },
        { icon: 'bi-box-seam', label: 'Item Types', path: '/itemtypes', id: 'itemtypes', category: 'inventory' },
        { icon: 'bi-box', label: 'Inventory Items', path: '/inventoryitems', id: 'inventoryitems', category: 'inventory' },
        { icon: 'bi-box', label: 'Inventory Master', path: '/inventory-masters', id: 'inventorymaster', category: 'inventory' },
        { icon: 'bi-geo-alt', label: 'Item Locations', path: '/itemlocations', id: 'itemlocations', category: 'inventory' },
        { icon: 'bi-globe', label: 'Countries', path: '/countries', id: 'countries', category: 'administrative' },
        { icon: 'bi-geo-alt', label: 'States', path: '/states', id: 'states', category: 'administrative' },
        { icon: 'bi-building', label: 'Cities', path: '/cities', id: 'cities', category: 'administrative' },
        { icon: 'bi-book', label: 'Classes', path: '/classes', id: 'classes', category: 'academic' },
        { icon: 'bi-door-open', label: 'Classrooms', path: '/classrooms', id: 'classrooms', category: 'academic' },
        { icon: 'bi-grid-3x3-gap', label: 'Sections', path: '/sections', id: 'sections', category: 'academic' },
        { icon: 'bi-link', label: 'Class Sections', path: '/classsections', id: 'classsections', category: 'academic' },
        { icon: 'bi-journal-bookmark', label: 'Subjects', path: '/subjects', id: 'subjects', category: 'academic' },
        { icon: 'bi-journal-bookmark', label: 'Class Subjects', path: '/classsubjects', id: 'classsubjects', category: 'academic' },
        { icon: 'bi-people', label: 'User Management', path: '/users', id: 'users', category: 'system' },
        { icon: 'bi-sliders', label: 'System Parameters', path: '/system-parameters', id: 'systemparameters', category: 'systemParameters' },
        { icon: 'bi-shield-check', label: 'Role Management', path: '/roles', id: 'roles', category: 'system' },
        { icon: 'bi-shield', label: 'Privilege Management', path: '/privileges', id: 'privileges', category: 'system' },
        { icon: 'bi-link-45deg', label: 'Role Privilege Management', path: '/roleprivileges', id: 'roleprivileges', category: 'system' },
        { icon: 'bi-activity', label: 'System Logs', path: '/logs', id: 'logs', category: 'system' },
        { icon: 'bi-database', label: 'Backup & Restore', path: '/backup', id: 'backup', category: 'system' }
      ]
    },

    'Admission Coordinator': {
      inherits: ['base.common', 'base.userManagement'],
      items: [
        { icon: 'bi-person-plus', label: 'New Admissions', path: '/admissions', id: 'admissions', category: 'academic' },
        { icon: 'bi-mortarboard', label: 'Student Management', path: '/students', id: 'students', category: 'academic' },
        { icon: 'bi-people-fill', label: 'Parent Management', path: '/parents', id: 'parents', category: 'users' },
        { icon: 'bi-building', label: 'Class Management', path: '/classes', id: 'classes', category: 'academic' },
        { icon: 'bi-calendar-check', label: 'Admission Schedule', path: '/schedule', id: 'schedule', category: 'events' },
        { icon: 'bi-file-earmark-text', label: 'Application Forms', path: '/forms', id: 'forms', category: 'administrative' }
      ]
    },

    Librarian: {
      inherits: ['base.common', 'base.userManagement'],
      items: [
        { icon: 'bi-book', label: 'Book Management', path: '/books', id: 'books', category: 'library' },
        { icon: 'bi-people', label: 'Member Management', path: '/members', id: 'members', category: 'library' },
        { icon: 'bi-arrow-left-right', label: 'Issue/Return', path: '/circulation', id: 'circulation', category: 'library' },
        { icon: 'bi-clock-history', label: 'Fine Management', path: '/fines', id: 'fines', category: 'library' },
        { icon: 'bi-graph-up', label: 'Library Reports', path: '/reports', id: 'reports', category: 'reports' }
      ]
    },

    Management: {
      inherits: ['base.common', 'base.userManagement'],
      items: [
        { icon: 'bi-graph-up', label: 'Analytics', path: '/analytics', id: 'analytics', category: 'reports' },
        { icon: 'bi-people', label: 'Staff Management', path: '/staff', id: 'staff', category: 'users' },
        { icon: 'bi-mortarboard', label: 'Student Management', path: '/students', id: 'students', category: 'academic' },
        { icon: 'bi-people-fill', label: 'Parent Management', path: '/parents', id: 'parents', category: 'users' },
        { icon: 'bi-mortarboard', label: 'Academic Performance', path: '/performance', id: 'performance', category: 'academic' },
        { icon: 'bi-currency-dollar', label: 'Financial Overview', path: '/finance', id: 'finance', category: 'financial' },
        { icon: 'bi-calendar-event', label: 'Events & Calendar', path: '/events', id: 'events', category: 'events' }
      ]
    },

    Parent: {
      inherits: ['base.common', 'base.userManagement'],
      items: [
        { icon: 'bi-person', label: 'My Children', path: '/children', id: 'children', category: 'personal' },
        { icon: 'bi-journal-text', label: 'Academic Progress', path: '/progress', id: 'progress', category: 'academic' },
        { icon: 'bi-calendar-check', label: 'Attendance', path: '/attendance', id: 'attendance', category: 'academic' },
        { icon: 'bi-cash-stack', label: 'Fee Payment', path: '/fees', id: 'fees', category: 'financial' },
        { icon: 'bi-chat-dots', label: 'Communication', path: '/messages', id: 'messages', category: 'communication' }
      ]
    },

    Reception: {
      inherits: ['base.common', 'base.userManagement'],
      items: [
        { icon: 'bi-person-check', label: 'Visitor Management', path: '/visitors', id: 'visitors', category: 'administrative' },
        { icon: 'bi-telephone', label: 'Phone Calls', path: '/calls', id: 'calls', category: 'communication' },
        { icon: 'bi-envelope', label: 'Mail Management', path: '/mail', id: 'mail', category: 'communication' },
        { icon: 'bi-calendar-event', label: 'Appointments', path: '/appointments', id: 'appointments', category: 'events' },
        { icon: 'bi-info-circle', label: 'General Inquiries', path: '/inquiries', id: 'inquiries', category: 'communication' }
      ]
    },

    Student: {
      inherits: ['base.common', 'base.userManagement'],
      items: [
        { icon: 'bi-journal-text', label: 'My Grades', path: '/grades', id: 'grades', category: 'academic' },
        { icon: 'bi-calendar-check', label: 'Attendance', path: '/attendance', id: 'attendance', category: 'academic' },
        { icon: 'bi-book', label: 'Library', path: '/library', id: 'library', category: 'library' },
        { icon: 'bi-calendar-event', label: 'Timetable', path: '/timetable', id: 'timetable', category: 'academic' },
        { icon: 'bi-assignment', label: 'Assignments', path: '/assignments', id: 'assignments', category: 'academic' }
      ]
    },

    Administrator: {
      inherits: ['base.common', 'base.userManagement'],
      items: [
        { icon: 'bi-mortarboard', label: 'Student Management', path: '/students', id: 'students', category: 'academic' },
        { icon: 'bi-people-fill', label: 'Parent Management', path: '/parents', id: 'parents', category: 'users' },
        { icon: 'bi-person-badge', label: 'Designations', path: '/designations', id: 'designations', category: 'employee' },
        { icon: 'bi-shield-check', label: 'Role Management', path: '/roles', id: 'roles', category: 'system' },
        { icon: 'bi-sliders', label: 'System Parameters', path: '/system-parameters', id: 'systemparameters', category: 'systemParameters' },
        { icon: 'bi-shield', label: 'Privilege Management', path: '/privileges', id: 'privileges', category: 'system' },
        { icon: 'bi-link-45deg', label: 'Role Privilege Management', path: '/roleprivileges', id: 'roleprivileges', category: 'system' },
        { icon: 'bi-clock', label: 'Time Table Periods', path: '/timetableperiods', id: 'timetableperiods', category: 'academic' },
        { icon: 'bi-people', label: 'Teacher Section Details', path: '/teacher-section-details', id: 'teacher-section-details', category: 'academic' },
        { icon: 'bi-book', label: 'Teacher Subject Assignments', path: '/teacher-subjects', id: 'teacher-subjects', category: 'academic' }
      ]
    },

    Teachers: {
      inherits: ['base.common', 'base.userManagement'],
      items: [
        { icon: 'bi-people', label: 'My Students', path: '/students', id: 'students', category: 'academic' },
        { icon: 'bi-journal-text', label: 'Grade Management', path: '/grades', id: 'grades', category: 'academic' },
        { icon: 'bi-calendar-event', label: 'Class Schedule', path: '/schedule', id: 'schedule', category: 'academic' },
        { icon: 'bi-assignment', label: 'Assignments', path: '/assignments', id: 'assignments', category: 'academic' },
        { icon: 'bi-chat-dots', label: 'Parent Communication', path: '/communication', id: 'communication', category: 'communication' },
        { icon: 'bi-book', label: 'Study Materials', path: '/materials', id: 'materials', category: 'academic' }
      ]
    },

    User: {
      inherits: ['base.common', 'base.userManagement'],
      items: []
    },

    'Academic Incharge': {
      inherits: ['base.common', 'base.userManagement'],
      items: [
        { icon: 'bi-people', label: 'Teacher Management', path: '/teachers', id: 'teachers', category: 'users' },
        { icon: 'bi-mortarboard', label: 'Student Management', path: '/students', id: 'students', category: 'academic' },
        { icon: 'bi-people-fill', label: 'Parent Management', path: '/parents', id: 'parents', category: 'users' },
        { icon: 'bi-journal-bookmark', label: 'Class Subjects', path: '/classsubjects', id: 'classsubjects', category: 'academic' },
        { icon: 'bi-clock', label: 'Time Table Periods', path: '/timetableperiods', id: 'timetableperiods', category: 'academic' },
        { icon: 'bi-gear', label: 'Settings', path: '/settings', id: 'settings', category: 'system' },
        { icon: 'bi-question-circle', label: 'Help & Support', path: '/help', id: 'help', category: 'personal' }
      ]
    },

    'Transport Manager': {
      inherits: ['base.common', 'base.userManagement'],
      items: [
        { icon: 'bi-people', label: 'Driver Management', path: '/drivers', id: 'drivers', category: 'transport' },
        { icon: 'bi-truck', label: 'Vehicle Management', path: '/vehicles', id: 'vehicles', category: 'transport' },
        { icon: 'bi-map', label: 'Route Management', path: '/routes', id: 'routes', category: 'transport' },
        { icon: 'bi-people', label: 'Transport Assignments', path: '/transport-assignments', id: 'transport-assignments', category: 'transport' },
        { icon: 'bi-file-text', label: 'Transport Reports', path: '/transport-reports', id: 'transport-reports', category: 'reports' },
        { icon: 'bi-gear', label: 'Transport Settings', path: '/transport-settings', id: 'transport-settings', category: 'system' },
        { icon: 'bi-question-circle', label: 'Transport Help & Support', path: '/transport-help', id: 'transport-help', category: 'personal' }
      ]
    }
  }
};

// Role mapping for normalization
export const roleMapping = {
  'super administator': 'Super Administrator',
  'super administrator': 'Super Administrator',
  'superadmin': 'Super Administrator',
  'super-admin': 'Super Administrator',
  'super admin': 'Super Administrator',
  'admin': 'Administrator',
  'Super Administator': 'Super Administrator',
  'administrator': 'Administrator',
  'teacher': 'Teachers',
  'student': 'Student',
  'parent': 'Parent',
  'librarian': 'Librarian',
  'management': 'Management',
  'reception': 'Reception',
  'admission coordinator': 'Admission Coordinator',
  'accounts': 'Accounts',
  'academic incharge': 'Academic Incharge',
  'transport manager': 'Transport Manager'
};