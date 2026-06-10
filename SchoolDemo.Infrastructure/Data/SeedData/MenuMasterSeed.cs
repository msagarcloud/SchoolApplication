using Microsoft.EntityFrameworkCore;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Data.SeedData;

public static class MenuMasterSeed
{
    public static async Task SeedMenuDataAsync(SchoolDbContext context)
    {
        // Check if menu data already exists
        if (await context.MenuMasters.AnyAsync())
        {
            return; // Data already seeded
        }

        // Get roles for mapping
        var superAdminRole = await context.RoleMasters.FirstOrDefaultAsync(r => r.Name == "Super Administrator");
        var adminRole = await context.RoleMasters.FirstOrDefaultAsync(r => r.Name == "Administrator");
        var teacherRole = await context.RoleMasters.FirstOrDefaultAsync(r => r.Name == "Teachers");
        var studentRole = await context.RoleMasters.FirstOrDefaultAsync(r => r.Name == "Student");
        var parentRole = await context.RoleMasters.FirstOrDefaultAsync(r => r.Name == "Parent");

        // Create menu items
        var menuItems = new List<MenuMaster>
        {
            // Dashboard
            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "Dashboard",
                DisplayName = "Dashboard",
                Icon = "bi-speedometer2",
                Path = "/dashboard",
                SortOrder = 1,
                Category = "dashboard",
                Description = "Main dashboard",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            },

            // General
            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "Companies",
                DisplayName = "Companies",
                Icon = "bi-building-exclamation",
                Path = "/companies",
                SortOrder = 2,
                Category = "General",
                Description = "Manage companies",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            },

            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "Schools",
                DisplayName = "Schools",
                Icon = "bi-building",
                Path = "/schools",
                SortOrder = 3,
                Category = "General",
                Description = "Manage schools",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            },

            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "Users",
                DisplayName = "Users",
                Icon = "bi-people",
                Path = "/users",
                SortOrder = 4,
                Category = "General",
                Description = "Manage users",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            },

            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "Roles",
                DisplayName = "Roles",
                Icon = "bi-shield-check",
                Path = "/roles",
                SortOrder = 5,
                Category = "General",
                Description = "Manage roles",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            },

            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "SystemParameters",
                DisplayName = "System Parameters",
                Icon = "bi-gear-wide",
                Path = "/system-parameters",
                SortOrder = 6,
                Category = "General",
                Description = "System configuration",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            },

            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "TaskScheduler",
                DisplayName = "Task Scheduler",
                Icon = "bi-clock-history",
                Path = "/task-scheduler",
                SortOrder = 7,
                Category = "General",
                Description = "Scheduled tasks",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            },

            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "Holidays",
                DisplayName = "Holidays",
                Icon = "bi-calendar-event",
                Path = "/holidays",
                SortOrder = 8,
                Category = "General",
                Description = "Manage holidays",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            },

            // Academic Management
            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "StudentManagement",
                DisplayName = "Student Management",
                Icon = "bi-mortarboard",
                Path = "/students",
                SortOrder = 2,
                Category = "academic",
                Description = "Manage students",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            },

            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "ClassManagement",
                DisplayName = "Class Management",
                Icon = "bi-book",
                Path = "/classes",
                SortOrder = 3,
                Category = "academic",
                Description = "Manage classes",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            },

            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "SubjectManagement",
                DisplayName = "Subject Management",
                Icon = "bi-journal-bookmark",
                Path = "/subjects",
                SortOrder = 4,
                Category = "academic",
                Description = "Manage subjects",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            },

            // User Management
            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "UserManagement",
                DisplayName = "User Management",
                Icon = "bi-people",
                Path = "/users",
                SortOrder = 5,
                Category = "users",
                Description = "Manage users",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            },

            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "RoleManagement",
                DisplayName = "Role Management",
                Icon = "bi-shield-check",
                Path = "/roles",
                SortOrder = 6,
                Category = "system",
                Description = "Manage roles",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            },

            // Financial Management
            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "FeeManagement",
                DisplayName = "Fee Management",
                Icon = "bi-currency-dollar",
                Path = "/fees",
                SortOrder = 7,
                Category = "financial",
                Description = "Manage fees",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            },

            // Reports
            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "Reports",
                DisplayName = "Reports",
                Icon = "bi-file-text",
                Path = "/reports",
                SortOrder = 8,
                Category = "reports",
                Description = "View reports",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            },

            // Personal
            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "Profile",
                DisplayName = "My Profile",
                Icon = "bi-person",
                Path = "/profile",
                SortOrder = 9,
                Category = "personal",
                Description = "User profile",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            },

            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "Settings",
                DisplayName = "Settings",
                Icon = "bi-gear",
                Path = "/settings",
                SortOrder = 10,
                Category = "personal",
                Description = "Settings",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            },

            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "Vendors",
                DisplayName = "Vendors",
                Icon = "bi-gear",
                Path = "/vendors",
                SortOrder = 10,
                Category = "personal",
                Description = "Settings",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            },

            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "Suppliers",
                DisplayName = "Sup",
                Icon = "bi-gear",
                Path = "/suppliers",
                SortOrder = 10,
                Category = "personal",
                Description = "Settings",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            },

            new MenuMaster
            {
                Id = Guid.NewGuid(),
                Name = "Logout",
                DisplayName = "Logout",
                Icon = "bi-box-arrow-right",
                Path = "/logout",
                SortOrder = 11,
                Category = "personal",
                Description = "Logout",
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow
            }
        };

        await context.MenuMasters.AddRangeAsync(menuItems);
        await context.SaveChangesAsync();

        // Create role mappings
        var roleMappings = new List<RoleMenuMapping>();

        if (superAdminRole != null)
        {
            // Super Admin gets all menus
            foreach (var menu in menuItems)
            {
                roleMappings.Add(new RoleMenuMapping
                {
                    Id = Guid.NewGuid(),
                    MenuId = menu.Id,
                    RoleId = superAdminRole.Id,
                    IsActive = true,
                    IsDeleted = false,
                    CreatedBy = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow
                });
            }
        }

        if (adminRole != null)
        {
            // Admin gets most menus including General category, except some system settings
            var adminMenus = menuItems.Where(m => 
                m.Category != "system" || m.Name == "RoleManagement").ToList();
            
            foreach (var menu in adminMenus)
            {
                roleMappings.Add(new RoleMenuMapping
                {
                    Id = Guid.NewGuid(),
                    MenuId = menu.Id,
                    RoleId = adminRole.Id,
                    IsActive = true,
                    IsDeleted = false,
                    CreatedBy = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow
                });
            }
        }

        if (teacherRole != null)
        {
            // Teachers get limited menus plus Holidays from General category
            var teacherMenus = menuItems.Where(m => 
                m.Category == "academic" || m.Category == "personal" || m.Name == "Holidays").ToList();
            
            foreach (var menu in teacherMenus)
            {
                roleMappings.Add(new RoleMenuMapping
                {
                    Id = Guid.NewGuid(),
                    MenuId = menu.Id,
                    RoleId = teacherRole.Id,
                    IsActive = true,
                    IsDeleted = false,
                    CreatedBy = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow
                });
            }
        }

        if (studentRole != null)
        {
            // Students get very limited menus plus Holidays
            var studentMenus = menuItems.Where(m => 
                m.Category == "personal" || m.Name == "Dashboard" || m.Name == "Holidays").ToList();
            
            foreach (var menu in studentMenus)
            {
                roleMappings.Add(new RoleMenuMapping
                {
                    Id = Guid.NewGuid(),
                    MenuId = menu.Id,
                    RoleId = studentRole.Id,
                    IsActive = true,
                    IsDeleted = false,
                    CreatedBy = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow
                });
            }
        }

        if (parentRole != null)
        {
            // Parents get limited menus plus Holidays
            var parentMenus = menuItems.Where(m => 
                m.Category == "personal" || m.Name == "Dashboard" || m.Category == "financial" || m.Name == "Holidays").ToList();
            
            foreach (var menu in parentMenus)
            {
                roleMappings.Add(new RoleMenuMapping
                {
                    Id = Guid.NewGuid(),
                    MenuId = menu.Id,
                    RoleId = parentRole.Id,
                    IsActive = true,
                    IsDeleted = false,
                    CreatedBy = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow
                });
            }
        }

        await context.RoleMenuMappings.AddRangeAsync(roleMappings);
        await context.SaveChangesAsync();
    }
}
