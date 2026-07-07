// Menu configuration for different user roles
// This file centralizes all menu items and their properties

// Category definitions for horizontal navigation
export const menuCategories = {
  dashboard: { label: 'Dashboard', icon: 'bi-speedometer2', order: 1 },
  general: { label: 'General', icon: 'bi-building', order: 2 },
  masters: { label: 'Masters', icon: 'bi-journal-bookmark', order: 3 },
  classes: { label: 'Classes', icon: 'bi-mortarboard', order: 4 },
  students: { label: 'Students', icon: 'bi-people', order: 5 },
  teachers: { label: 'Teachers', icon: 'bi-person-badge', order: 6 },
  exam: { label: 'Exam', icon: 'bi-mortarboard', order: 7 },
  timeTable: { label: 'Time Table', icon: 'bi-calendar3', order: 8 },
  bills: { label: 'Bills', icon: 'bi-receipt', order: 9 },
  fees: { label: 'Fees', icon: 'bi-cash-stack', order: 10 },
  transport: { label: 'Transport', icon: 'bi-truck', order: 11 },
  inventory: { label: 'Inventory', icon: 'bi-box-seam', order: 12 },
  library: { label: 'Library', icon: 'bi-book', order: 13 },
  payroll: { label: 'Payroll', icon: 'bi-cash-coin', order: 14 },
  reception: { label: 'Reception', icon: 'bi-envelope-open', order: 15 },
  reports: { label: 'Reports', icon: 'bi-bar-chart', order: 16 },
  examination: { label: 'Examination', icon: 'bi-mortarboard', order: 17 },
  users: { label: 'Users', icon: 'bi-people', order: 18 },
  financial: { label: 'Financial', icon: 'bi-currency-dollar', order: 19 },
  employee: { label: 'Employee', icon: 'bi-people', order: 20 },
  communication: { label: 'Communication', icon: 'bi-chat-dots', order: 21 },
  events: { label: 'Events', icon: 'bi-calendar-event', order: 22 },
  systemParameters: { label: 'System Parameters', icon: 'bi-sliders', order: 23 }
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
        {
          icon: 'bi-building',
          label: 'General',
          id: 'super-general',
          category: 'general',
          children: [
            { icon: 'bi-building', label: 'Companies', id: 'super-companies', category: 'general', path: '/companies' },
            { icon: 'bi-mortarboard', label: 'Schools', id: 'super-schools', category: 'general', path: '/schools' },
            { icon: 'bi-people', label: 'Users', id: 'super-users', category: 'general', path: '/users' },
            { icon: 'bi-shield-check', label: 'Roles', id: 'super-roles', category: 'general', path: '/roles' },
            { icon: 'bi-shield-check', label: 'Privileges', id: 'super-privileges', category: 'general', path: '/privileges' },
            { icon: 'bi-shield-check', label: 'Role Privileges', id: 'super-role-privileges', category: 'general', path: '/roleprivileges' },
            { icon: 'bi-sliders', label: 'System Parameters', id: 'super-system-parameters', category: 'general', path: '/system-parameters' },
            { icon: 'bi-calendar3', label: 'Task Schedules', id: 'super-task-schedules', category: 'general', path: '/settings' },
            { icon: 'bi-calendar-event', label: 'Holidays', id: 'super-holidays', category: 'general', path: '/holidays' }
          ]
        },
        {
          icon: 'bi-journal-bookmark',
          label: 'Masters',
          id: 'super-masters',
          category: 'masters',
          children: [
            { icon: 'bi-tags', label: 'Student Categories', id: 'super-student-categories', category: 'masters', path: '/categories' },
            { icon: 'bi-book', label: 'Classes', id: 'super-master-classes', category: 'masters', path: '/classes' },
            { icon: 'bi-grid-3x3-gap', label: 'Sections', id: 'super-sections', category: 'masters', path: '/sections' },
            { icon: 'bi-journal-bookmark', label: 'Subjects', id: 'super-subjects', category: 'masters', path: '/subjects' },
            { icon: 'bi-diagram-3', label: 'Class Allocation', id: 'super-subject-subcategories', category: 'masters', path: '/classsections' },
            { icon: 'bi-person-workspace', label: 'Designation', id: 'super-professions', category: 'masters', path: '/designations' },
            { icon: 'bi-award', label: 'Qualifications', id: 'super-qualifications', category: 'masters', path: '/employee-professional-qualifications' },
            { icon: 'bi-cash-stack', label: 'Fee Categories', id: 'super-fee-categories', category: 'masters', path: '/feecategory' },
            { icon: 'bi-percent', label: 'Discount Categories', id: 'super-discount-categories', category: 'masters', path: '/discountCategory' },
            { icon: 'bi-pencil-square', label: 'Assesment Types', id: 'super-assesment-types', category: 'masters', path: '/assessments' },
            { icon: 'bi-calendar2-check', label: 'Attendence Reasons', id: 'super-attendance-reasons', category: 'masters', path: '/student-attendance' }
          ]
        },
        {
          icon: 'bi-mortarboard',
          label: 'Classes',
          id: 'super-classes',
          category: 'classes',
          children: [
            { icon: 'bi-people', label: 'Students List', id: 'super-class-students', category: 'classes', children: [
              { label: 'View List', path: '/students', id: 'super-class-students-list' },
              { label: 'Add New', path: '/students/create', id: 'super-class-students-add' },
              { label: 'Edit Student Details', path: '/students', id: 'super-class-students-edit' },
              { label: 'Delete Student Details', path: '/students', id: 'super-class-students-delete' },
              { label: 'View Student Achievements', path: '/students', id: 'super-class-students-achievements' },
              { label: 'View Student Dossier', path: '/students', id: 'super-class-students-dossier' },
              { label: 'Student Marks Entry', path: '/assessments', id: 'super-class-students-marks' }
            ] },
            { icon: 'bi-cash-stack', label: 'Fee Payment Details', id: 'super-fee-payment-details', category: 'classes' },
            { icon: 'bi-person-badge', label: 'Teacher Class Section Details', id: 'super-teacher-class-section', category: 'classes' }
          ]
        },
        {
          icon: 'bi-people',
          label: 'Students',
          id: 'super-students',
          category: 'students',
          children: [
            { icon: 'bi-list-ul', label: 'Students List', id: 'super-students-list', category: 'students', children: [
              { label: 'View List', path: '/students', id: 'super-student-list-view' },
              { label: 'Add New Student', path: '/students/create', id: 'super-student-list-add' },
              { label: 'Edit Student Details', path: '/students', id: 'super-student-list-edit' },
              { label: 'Delete Student Details', path: '/students', id: 'super-student-list-delete' },
              { label: 'View Student Achievements', path: '/students', id: 'super-student-list-achievements' },
              { label: 'View Student Dossier', path: '/students', id: 'super-student-list-dossier' },
              { label: 'Student Marks Entry', path: '/assessments', id: 'super-student-list-marks' }
            ] },
            { icon: 'bi-person-plus', label: 'Create New', id: 'super-students-create', category: 'students', children: [
              { label: 'Basic Details', path: '/students/create', id: 'super-student-create-basic' },
              { label: 'Student Details', path: '/students/create', id: 'super-student-create-details' },
              { label: 'Previous School details', path: '/students/create', id: 'super-student-create-prev-school' },
              { label: 'Student Photographs', path: '/students/create', id: 'super-student-create-photo' },
              { label: 'Father Details', path: '/students/create', id: 'super-student-create-father' },
              { label: 'Mother details', path: '/students/create', id: 'super-student-create-mother' },
              { label: 'Guardian Details', path: '/students/create', id: 'super-student-create-guardian' }
            ] },
            { icon: 'bi-people-fill', label: 'Parents', id: 'super-parents', category: 'students', children: [
              { label: 'List Parent Details', path: '/parent', id: 'super-parents-list' },
              { label: 'Edit Parent Details', path: '/parent', id: 'super-parents-edit' }
            ] },
            { icon: 'bi-calendar2-check', label: 'Attendence Details', id: 'super-attendance-details', category: 'students', children: [
              { label: 'List Attendence of Class', path: '/student-attendance', id: 'super-attendance-class-list' },
              { label: 'Edit Attendence of Class', path: '/student-attendance', id: 'super-attendance-class-edit' }
            ] },
            { icon: 'bi-trash', label: 'Delete Attendence Data', id: 'super-delete-attendance', category: 'students' },
            { icon: 'bi-cloud-arrow-up', label: 'Commit Attendence Data', id: 'super-commit-attendance', category: 'students' },
            { icon: 'bi-clock-history', label: 'View Attendence History', id: 'super-view-attendance-history', category: 'students' },
            { icon: 'bi-bell', label: 'Absent Notification', id: 'super-absent-notification', category: 'students', children: [
              { label: 'List Students', path: '/students', id: 'super-absent-list' },
              { label: 'Send SMS', path: '/students', id: 'super-absent-sms' },
              { label: 'Send Email', path: '/students', id: 'super-absent-email' }
            ] },
            { icon: 'bi-clock', label: 'View History', id: 'super-students-history', category: 'students', children: [
              { label: 'List History', path: '/students', id: 'super-students-history-list' }
            ] }
          ]
        },
        {
          icon: 'bi-person-badge',
          label: 'Teachers',
          id: 'super-teachers',
          category: 'teachers',
          children: [
            { icon: 'bi-list-ul', label: 'View List', id: 'super-teachers-view', category: 'teachers', children: [
              { label: 'List Teachers', path: '/teachers', id: 'super-teachers-list' },
              { label: 'Add New Teacher', path: '/teachers/create', id: 'super-teachers-add' }
            ] },
            { icon: 'bi-person-plus', label: 'Add New Teacher', id: 'super-teacher-create', category: 'teachers', children: [
              { label: 'Basic Details', path: '/teachers/create', id: 'super-teacher-create-basic' },
              { label: 'Employee Details', path: '/teachers/create', id: 'super-teacher-create-employee' },
              { label: 'Employee Photo', path: '/teachers/create', id: 'super-teacher-create-photo' },
              { label: 'Licence Details', path: '/teachers/create', id: 'super-teacher-create-license' }
            ] },
            { icon: 'bi-journal-bookmark', label: 'Teacher Class Subject Details', id: 'super-teacher-class-subject', category: 'teachers', children: [
              { label: 'List Details', path: '/teacher-subjects', id: 'super-teacher-class-subject-list' }
            ] }
          ]
        },
        {
          icon: 'bi-mortarboard',
          label: 'Exam',
          id: 'super-exam',
          category: 'exam',
          children: [
            { icon: 'bi-pencil-square', label: 'Data Entry Marks', id: 'super-exam-data-entry', category: 'exam', children: [
              { label: 'Assesment Details', path: '/assessments', id: 'super-exam-assessment' },
              { label: 'Edit Details', path: '/assessments', id: 'super-exam-edit' }
            ] },
            { icon: 'bi-file-earmark-text', label: 'Report Cards', id: 'super-exam-report-cards', category: 'exam', children: [
              { label: 'Generate Report Cards', path: '/assessments', id: 'super-exam-generate' },
              { label: 'Preview Report Cards', path: '/assessments', id: 'super-exam-preview' }
            ] },
            { icon: 'bi-file-earmark-bar-graph', label: 'View Report Cards', id: 'super-exam-view-report-cards', category: 'exam', children: [
              { label: 'Generate Report Cards', path: '/assessments', id: 'super-exam-view-generate' },
              { label: 'Preview Report Cards', path: '/assessments', id: 'super-exam-view-preview' }
            ] },
            { icon: 'bi-clock-history', label: 'View History', id: 'super-exam-history', category: 'exam', children: [
              { label: 'List Commited Report Cards', path: '/assessments', id: 'super-exam-history-list' },
              { label: 'Review Commited R. Cards', path: '/assessments', id: 'super-exam-history-review' }
            ] }
          ]
        },
        {
          icon: 'bi-calendar3',
          label: 'Time Table',
          id: 'super-time-table',
          category: 'timeTable',
          children: [
            { icon: 'bi-gear', label: 'Global Settings', id: 'super-time-table-settings', category: 'timeTable', children: [
              { label: 'List Settings', path: '/timetableperiods', id: 'super-time-table-settings-list' },
              { label: 'Edit Settings', path: '/timetableperiods', id: 'super-time-table-settings-edit' }
            ] },
            { icon: 'bi-list-ul', label: 'View Periods', id: 'super-time-table-periods', category: 'timeTable', children: [
              { label: 'List Periods', path: '/timetableperiods', id: 'super-time-table-periods-list' },
              { label: 'Edit Periods', path: '/timetableperiods', id: 'super-time-table-periods-edit' }
            ] },
            { icon: 'bi-calendar2-week', label: 'Setup Class Periods', id: 'super-time-table-class-periods', category: 'timeTable', children: [
              { label: 'List Class Periods', path: '/timetableperiods', id: 'super-time-table-class-periods-list' }
            ] },
            { icon: 'bi-table', label: 'Generate Class Time Table', id: 'super-time-table-generate', category: 'timeTable', children: [
              { label: 'List Class Table', path: '/timetableperiods', id: 'super-time-table-generate-list' }
            ] },
            { icon: 'bi-eye', label: 'View By Class', id: 'super-time-table-class-view', category: 'timeTable', children: [
              { label: 'List Time Table By Class', path: '/timetableperiods', id: 'super-time-table-class-view-list' }
            ] },
            { icon: 'bi-person-badge', label: 'View By Teacher', id: 'super-time-table-teacher-view', category: 'timeTable', children: [
              { label: 'List Time Table by Teacher', path: '/timetableperiods', id: 'super-time-table-teacher-view-list' }
            ] },
            { icon: 'bi-arrow-left-right', label: 'Substitution', id: 'super-time-table-substitution', category: 'timeTable', children: [
              { label: 'Teacher Subsitution', path: '/timetableperiods', id: 'super-time-table-substitution-item' }
            ] },
            { icon: 'bi-file-earmark-text', label: 'Substitution Report', id: 'super-time-table-substitution-report', category: 'timeTable', children: [
              { label: 'List Substitution Report', path: '/timetableperiods', id: 'super-time-table-substitution-report-list' }
            ] },
            { icon: 'bi-clock-history', label: 'View History By Class', id: 'super-time-table-history-class', category: 'timeTable', children: [
              { label: 'List Sustitution Reportby Class', path: '/timetableperiods', id: 'super-time-table-history-class-list' }
            ] },
            { icon: 'bi-clock-history', label: 'View History By Teacher', id: 'super-time-table-history-teacher', category: 'timeTable', children: [
              { label: 'List Substitution Report by Teacher', path: '/timetableperiods', id: 'super-time-table-history-teacher-list' }
            ] }
          ]
        },
        {
          icon: 'bi-receipt',
          label: 'Bills',
          id: 'super-bills',
          category: 'bills',
          children: [
            { icon: 'bi-tags', label: 'Expense Category', id: 'super-bills-expense', category: 'bills', children: [
              { label: 'List Categories', path: '/categories', id: 'super-bills-expense-list' },
              { label: 'Add New category', path: '/categories/create', id: 'super-bills-expense-create' },
              { label: 'Edit Category', path: '/categories', id: 'super-bills-expense-edit' },
              { label: 'Delete Category', path: '/categories', id: 'super-bills-expense-delete' }
            ] },
            { icon: 'bi-people', label: 'Vendors', id: 'super-bills-vendors', category: 'bills', children: [
              { label: 'List Vendors', path: '/vendors', id: 'super-bills-vendors-list' },
              { label: 'Edit Vendors', path: '/vendors', id: 'super-bills-vendors-edit' },
              { label: 'Delete Vendors', path: '/vendors', id: 'super-bills-vendors-delete' }
            ] },
            { icon: 'bi-file-earmark-text', label: 'View Bills', id: 'super-bills-view', category: 'bills', children: [
              { label: 'List Bills', path: '/vendors', id: 'super-bills-view-list' },
              { label: 'Add New Bill', path: '/vendors', id: 'super-bills-view-add' },
              { label: 'Edit Bills', path: '/vendors', id: 'super-bills-view-edit' },
              { label: 'Delete Bills', path: '/vendors', id: 'super-bills-view-delete' }
            ] },
            { icon: 'bi-file-earmark-plus', label: 'Create New', id: 'super-bills-create', category: 'bills', children: [
              { label: 'Create New Bill', path: '/vendors', id: 'super-bills-create-item' }
            ] },
            { icon: 'bi-receipt-cutoff', label: 'View Vouchers', id: 'super-bills-vouchers', category: 'bills', children: [
              { label: 'List Vouchers', path: '/vendors', id: 'super-bills-vouchers-list' },
              { label: 'Add New Voucher', path: '/vendors', id: 'super-bills-vouchers-add' },
              { label: 'Edit Vouchers', path: '/vendors', id: 'super-bills-vouchers-edit' },
              { label: 'Delete Vouchers', path: '/vendors', id: 'super-bills-vouchers-delete' }
            ] },
            { icon: 'bi-plus-circle', label: 'Create New Voucher', id: 'super-bills-voucher-create', category: 'bills', children: [
              { label: 'Add New Voucher', path: '/vendors', id: 'super-bills-voucher-create-item' }
            ] }
          ]
        },
        {
          icon: 'bi-cash-stack',
          label: 'Fees',
          id: 'super-fees',
          category: 'fees',
          children: [
            { icon: 'bi-list-ul', label: 'Fees Applicable by Class', id: 'super-fees-applicable', category: 'fees', children: [
              { label: 'List All Heads of Fees', path: '/feecategory', id: 'super-fees-applicable-list' },
              { label: 'Add New Fees Head', path: '/feecategory/create', id: 'super-fees-applicable-add' },
              { label: 'Edit Fee Heads', path: '/feecategory', id: 'super-fees-applicable-edit' },
              { label: 'Delete Fee Heads', path: '/feecategory', id: 'super-fees-applicable-delete' }
            ] },
            { icon: 'bi-calendar2-range', label: 'Generate Student Fee Dates', id: 'super-fees-dates', category: 'fees', children: [
              { label: 'Add Fee of Student', path: '/feecategory', id: 'super-fees-dates-add' },
              { label: 'Edit Fee Details', path: '/feecategory', id: 'super-fees-dates-edit' },
              { label: 'Delete Fee Details', path: '/feecategory', id: 'super-fees-dates-delete' }
            ] },
            { icon: 'bi-cash-coin', label: 'Fee Payment', id: 'super-fee-payment', category: 'fees', children: [
              { label: 'Display Fee Details', path: '/feecategory', id: 'super-fee-payment-display' },
              { label: 'Apply Fee Payment', path: '/feecategory', id: 'super-fee-payment-apply' }
            ] },
            { icon: 'bi-pencil-square', label: 'Edit Fees', id: 'super-fees-edit', category: 'fees', children: [
              { label: 'Edit Fee Heads', path: '/feecategory', id: 'super-fees-edit-heads' }
            ] },
            { icon: 'bi-people', label: 'Assign Fee Category To Student', id: 'super-fees-assign', category: 'fees', children: [
              { label: 'List Students', path: '/students', id: 'super-fees-assign-students' }
            ] },
            { icon: 'bi-cloud-arrow-up', label: 'Commit Fee Data', id: 'super-fees-commit', category: 'fees', children: [
              { label: 'Commit Data To History', path: '/feecategory', id: 'super-fees-commit-history' }
            ] },
            { icon: 'bi-clock-history', label: 'View Fee History Data', id: 'super-fees-history', category: 'fees', children: [
              { label: 'List History Data of Class', path: '/feecategory', id: 'super-fees-history-list' }
            ] },
            { icon: 'bi-collection', label: 'View Fee Collection', id: 'super-fees-collection', category: 'fees', children: [
              { label: 'Fee Collection by Date', path: '/feecategory', id: 'super-fees-collection-date' }
            ] },
            { icon: 'bi-receipt', label: 'View Fee Receipts', id: 'super-fees-receipts', category: 'fees', children: [
              { label: 'Display Fee Receipts', path: '/feecategory', id: 'super-fees-receipts-display' }
            ] }
          ]
        },
        {
          icon: 'bi-truck',
          label: 'Transport',
          id: 'super-transport',
          category: 'transport',
          children: [
            { icon: 'bi-geo-alt', label: 'Locations', id: 'super-transport-locations', category: 'transport', children: [
              { label: 'List Locations', path: '/routes', id: 'super-transport-locations-list' },
              { label: 'Add New Location', path: '/routes', id: 'super-transport-locations-add' },
              { label: 'Edit Location', path: '/routes', id: 'super-transport-locations-edit' },
              { label: 'Delete Location', path: '/routes', id: 'super-transport-locations-delete' }
            ] },
            { icon: 'bi-truck', label: 'Vehicle', id: 'super-transport-vehicle', category: 'transport', children: [
              { label: 'List Vehicle', path: '/vehicles', id: 'super-transport-vehicle-list' },
              { label: 'Add New Vehicle', path: '/vehicles/create', id: 'super-transport-vehicle-add' },
              { label: 'Edit Vehicle', path: '/vehicles', id: 'super-transport-vehicle-edit' },
              { label: 'Delete Vehicle', path: '/vehicles', id: 'super-transport-vehicle-delete' }
            ] },
            { icon: 'bi-person', label: 'Drivers', id: 'super-transport-drivers', category: 'transport', children: [
              { label: 'List Drivers', path: '/drivers', id: 'super-transport-drivers-list' },
              { label: 'Add Drivers', path: '/drivers/create', id: 'super-transport-drivers-add' },
              { label: 'Edit Drivers', path: '/drivers', id: 'super-transport-drivers-edit' },
              { label: 'Delete Drivers', path: '/drivers', id: 'super-transport-drivers-delete' }
            ] },
            { icon: 'bi-person-badge', label: 'Cleaners', id: 'super-transport-cleaners', category: 'transport', children: [
              { label: 'List Cleaners', path: '/drivers', id: 'super-transport-cleaners-list' },
              { label: 'Add Cleaners', path: '/drivers/create', id: 'super-transport-cleaners-add' },
              { label: 'Edit Cleaner', path: '/drivers', id: 'super-transport-cleaners-edit' },
              { label: 'Delete Cleaner', path: '/drivers', id: 'super-transport-cleaners-delete' }
            ] },
            { icon: 'bi-map', label: 'Routes', id: 'super-transport-routes', category: 'transport', children: [
              { label: 'List Routes', path: '/routes', id: 'super-transport-routes-list' },
              { label: 'Add New Route', path: '/routes/create', id: 'super-transport-routes-add' },
              { label: 'Edit Route', path: '/routes', id: 'super-transport-routes-edit' },
              { label: 'Delete Route', path: '/routes', id: 'super-transport-routes-delete' }
            ] }
          ]
        },
        {
          icon: 'bi-box-seam',
          label: 'Inventory',
          id: 'super-inventory',
          category: 'inventory',
          children: [
            { icon: 'bi-boxes', label: 'Item Types', id: 'super-inventory-item-types', category: 'inventory', children: [
              { label: 'List Item Types', path: '/itemtypes', id: 'super-inventory-item-types-list' },
              { label: 'Add Item Types', path: '/itemtypes/create', id: 'super-inventory-item-types-add' },
              { label: 'Edit Item Types', path: '/itemtypes', id: 'super-inventory-item-types-edit' },
              { label: 'Delete Item Types', path: '/itemtypes', id: 'super-inventory-item-types-delete' }
            ] },
            { icon: 'bi-geo-alt', label: 'Locations', id: 'super-inventory-locations', category: 'inventory', children: [
              { label: 'List Locations', path: '/itemlocations', id: 'super-inventory-locations-list' },
              { label: 'Add Location', path: '/itemlocations/create', id: 'super-inventory-locations-add' },
              { label: 'Edit Location', path: '/itemlocations', id: 'super-inventory-locations-edit' },
              { label: 'Delete Location', path: '/itemlocations', id: 'super-inventory-locations-delete' }
            ] },
            { icon: 'bi-box', label: 'Items', id: 'super-inventory-items', category: 'inventory', children: [
              { label: 'List Items', path: '/inventoryitems', id: 'super-inventory-items-list' },
              { label: 'Add New Item', path: '/inventoryitems/create', id: 'super-inventory-items-add' },
              { label: 'Edit Item', path: '/inventoryitems', id: 'super-inventory-items-edit' },
              { label: 'Delete Items', path: '/inventoryitems', id: 'super-inventory-items-delete' }
            ] },
            { icon: 'bi-boxes', label: 'Inventory', id: 'super-inventory-master', category: 'inventory', children: [
              { label: 'List Inventory', path: '/inventory-masters', id: 'super-inventory-master-list' },
              { label: 'Add New Inventory Item', path: '/inventory-masters/create', id: 'super-inventory-master-add' },
              { label: 'Edit Inventory Item', path: '/inventory-masters', id: 'super-inventory-master-edit' },
              { label: 'Delete Inventory Item', path: '/inventory-masters', id: 'super-inventory-master-delete' }
            ] }
          ]
        },
        { icon: 'bi-book', label: 'Library', id: 'super-library', category: 'library' },
        {
          icon: 'bi-cash-coin',
          label: 'Payroll',
          id: 'super-payroll',
          category: 'payroll',
          children: [
            { icon: 'bi-diagram-3', label: 'Masters', id: 'super-payroll-masters', category: 'payroll', children: [
              { label: 'Department', path: '/departments', id: 'super-payroll-department' },
              { label: 'Designation', path: '/designations', id: 'super-payroll-designation' },
              { label: 'Payment Modes', path: '/settings', id: 'super-payroll-payment-modes' },
              { label: 'Grades', path: '/grades', id: 'super-payroll-grades' },
              { label: 'Employee Types', path: '/employees', id: 'super-payroll-employee-types' },
              { label: 'Employee Categories', path: '/employees', id: 'super-payroll-employee-categories' }
            ] },
            { icon: 'bi-people', label: 'Employees', id: 'super-payroll-employees', category: 'payroll', children: [
              { label: 'List Employee By Category', path: '/employees', id: 'super-payroll-employees-list' }
            ] },
            { icon: 'bi-calendar2-check', label: 'Attendence', id: 'super-payroll-attendance', category: 'payroll', children: [
              { label: 'View Attendence', path: '/employees', id: 'super-payroll-attendance-view' },
              { label: 'Delete Attendence Details', path: '/employees', id: 'super-payroll-attendance-delete' },
              { label: 'Commit To History', path: '/employees', id: 'super-payroll-attendance-commit' },
              { label: 'View History', path: '/employees', id: 'super-payroll-attendance-history' },
              { label: 'Report', path: '/employees', id: 'super-payroll-attendance-report' }
            ] },
            { icon: 'bi-brightness-high', label: 'Leaves', id: 'super-payroll-leaves', category: 'payroll', children: [
              { label: 'Leave Types', path: '/employees', id: 'super-payroll-leaves-types' },
              { label: 'Assign Leave Types', path: '/employees', id: 'super-payroll-leaves-assign' },
              { label: 'Generate Employee Leaves', path: '/employees', id: 'super-payroll-leaves-generate' }
            ] },
            { icon: 'bi-cash-stack', label: 'Salary', id: 'super-payroll-salary', category: 'payroll', children: [
              { label: 'Salary Heads', path: '/employees', id: 'super-payroll-salary-heads' },
              { label: 'Assign Salary Heads', path: '/employees', id: 'super-payroll-salary-assign' },
              { label: 'Generate Salary Structure', path: '/employees', id: 'super-payroll-salary-structure' },
              { label: 'Generate Salary Slips', path: '/employees', id: 'super-payroll-salary-slips' },
              { label: 'View Salary Slips', path: '/employees', id: 'super-payroll-salary-view' },
              { label: 'Commit To History', path: '/employees', id: 'super-payroll-salary-commit' },
              { label: 'View History', path: '/employees', id: 'super-payroll-salary-history' }
            ] }
          ]
        },
        {
          icon: 'bi-envelope-open',
          label: 'Reception',
          id: 'super-reception',
          category: 'reception',
          children: [
            { icon: 'bi-people', label: 'Visitors List', id: 'super-reception-visitors', category: 'reception', children: [
              { label: 'List All Visitors', path: '/visitors', id: 'super-reception-visitors-list' },
              { label: 'Add New Visitor', path: '/visitors/create', id: 'super-reception-visitors-add' },
              { label: 'Edit Visitor', path: '/visitors', id: 'super-reception-visitors-edit' },
              { label: 'Delete Visitor', path: '/visitors', id: 'super-reception-visitors-delete' }
            ] },
            { icon: 'bi-person-plus', label: 'Registration', id: 'super-reception-registration', category: 'reception', children: [
              { label: 'List Registration', path: '/visitors', id: 'super-reception-registration-list' },
              { label: 'Edit Registration', path: '/visitors', id: 'super-reception-registration-edit' },
              { label: 'Delete Registration', path: '/visitors', id: 'super-reception-registration-delete' },
              { label: 'Confirm Student Admission', path: '/visitors', id: 'super-reception-registration-confirm' }
            ] },
            { icon: 'bi-bar-chart', label: 'Registration Status Report', id: 'super-reception-registration-report', category: 'reception' }
          ]
        },
        {
          icon: 'bi-bar-chart',
          label: 'Reports',
          id: 'super-reports',
          category: 'reports',
          children: [
            { icon: 'bi-person-x', label: 'Fees Defaulters', id: 'super-reports-fee-defaulters', category: 'reports' },
            { icon: 'bi-credit-card-2-front', label: 'Student I-Card Generation', id: 'super-reports-student-id', category: 'reports' },
            { icon: 'bi-card-list', label: 'I Card Generation Different Classes', id: 'super-reports-id-classes', category: 'reports' },
            { icon: 'bi-truck', label: 'Transport Route Wise Student Details', id: 'super-reports-transport-route', category: 'reports' },
            { icon: 'bi-gender-ambiguous', label: 'Gender Report', id: 'super-reports-gender', category: 'reports' },
            { icon: 'bi-calendar2-week', label: 'Student Attendence Report', id: 'super-reports-attendance', category: 'reports' },
            { icon: 'bi-clipboard-data', label: 'Student Attendence Summary Report', id: 'super-reports-attendance-summary', category: 'reports' },
            { icon: 'bi-bar-chart', label: 'Age Grade Report', id: 'super-reports-age-grade', category: 'reports' },
            { icon: 'bi-file-earmark-bar-graph', label: 'Enrollment Summary Report', id: 'super-reports-enrollment', category: 'reports' },
            { icon: 'bi-calendar3', label: 'Time Table - By Class', id: 'super-reports-time-table-class', category: 'reports' },
            { icon: 'bi-person-badge', label: 'Time Table - By Teacher', id: 'super-reports-time-table-teacher', category: 'reports' },
            { icon: 'bi-people', label: 'Time Table - By All Teachers', id: 'super-reports-time-table-all-teachers', category: 'reports' },
            { icon: 'bi-building', label: 'Time Table - By School', id: 'super-reports-time-table-school', category: 'reports' },
            { icon: 'bi-person-lines-fill', label: 'View Teacher details', id: 'super-reports-teacher-details', category: 'reports' }
          ]
        }
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
