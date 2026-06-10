using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using InfraMenuMaster = SchoolDemo.Infrastructure.Data.MenuMaster;
using InfraRoleMenuMapping = SchoolDemo.Infrastructure.Data.RoleMenuMapping;
using SchoolDbContext = SchoolDemo.Infrastructure.Data.SchoolDbContext;

namespace SchoolDemo.Infrastructure.Repositories;

public class MenuMasterRepository : IMenuMasterRepository
{
    private readonly SchoolDbContext _context;

    public MenuMasterRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<Domain.Entities.MenuMaster?> GetByIdAsync(Guid id)
    {
        var infraMenu = await _context.MenuMasters
            .Include(m => m.Children)
            .Include(m => m.RoleMappings)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (infraMenu == null) return null;

        return MapToDomainEntity(infraMenu);
    }

    public async Task<IEnumerable<Domain.Entities.MenuMaster>> GetAllAsync()
    {
        var infraMenus = await _context.MenuMasters
            .Include(m => m.Children)
            .Include(m => m.RoleMappings)
            .OrderBy(m => m.SortOrder)
            .ToListAsync();

        return infraMenus.Select(MapToDomainEntity);
    }

    public async Task<IEnumerable<Domain.Entities.MenuMaster>> GetByRoleIdAsync(Guid roleId)
    {
        var infraMenus = await _context.MenuMasters
            .Include(m => m.Children)
            .Include(m => m.RoleMappings)
            .Where(m => m.RoleMappings.Any(rm => rm.RoleId == roleId && rm.IsActive && !rm.IsDeleted))
            .Where(m => m.IsActive && !m.IsDeleted)
            .OrderBy(m => m.SortOrder)
            .ToListAsync();

        return infraMenus.Select(MapToDomainEntity);
    }

    public async Task<IEnumerable<Domain.Entities.MenuMaster>> GetByRoleNameAsync(string roleName)
    {
        var role = await _context.RoleMasters
            .FirstOrDefaultAsync(r => r.Name.ToLower() == roleName.ToLower());

        if (role == null) return new List<Domain.Entities.MenuMaster>();

        return await GetByRoleIdAsync(role.Id);
    }

    public async Task<IEnumerable<Domain.Entities.MenuMaster>> GetActiveMenusAsync()
    {
        var infraMenus = await _context.MenuMasters
            .Include(m => m.Children)
            .Include(m => m.RoleMappings)
            .Where(m => m.IsActive && !m.IsDeleted)
            .OrderBy(m => m.SortOrder)
            .ToListAsync();

        return infraMenus.Select(MapToDomainEntity);
    }

    public async Task<IEnumerable<Domain.Entities.MenuMaster>> GetMenuHierarchyAsync()
    {
        var infraMenus = await _context.MenuMasters
            .Include(m => m.Children)
            .Include(m => m.RoleMappings)
            .Where(m => m.IsActive && !m.IsDeleted && m.ParentId == null)
            .OrderBy(m => m.SortOrder)
            .ToListAsync();

        return infraMenus.Select(MapToDomainEntity);
    }

    public async Task<Domain.Entities.MenuMaster> AddAsync(Domain.Entities.MenuMaster menuMaster)
    {
        var infraMenu = new InfraMenuMaster
        {
            Id = menuMaster.Id,
            Name = menuMaster.Name,
            DisplayName = menuMaster.DisplayName,
            Icon = menuMaster.Icon,
            Path = menuMaster.Path,
            ParentId = menuMaster.ParentId,
            SortOrder = menuMaster.SortOrder,
            Category = menuMaster.Category,
            Description = menuMaster.Description,
            IsActive = menuMaster.IsActive,
            IsDeleted = menuMaster.IsDeleted,
            CreatedBy = menuMaster.CreatedBy,
            CreatedDate = menuMaster.CreatedDate,
            ModifiedBy = menuMaster.ModifiedBy,
            ModifiedDate = menuMaster.ModifiedDate,
            Status = menuMaster.Status,
            StatusMessage = menuMaster.StatusMessage
        };

        await _context.MenuMasters.AddAsync(infraMenu);

        if (menuMaster.RoleMappings is { Count: > 0 })
        {
            foreach (var rm in menuMaster.RoleMappings)
            {
                if (rm.RoleId == Guid.Empty)
                    continue;
                var infraMapping = new InfraRoleMenuMapping
                {
                    Id = rm.Id,
                    MenuId = menuMaster.Id,
                    RoleId = rm.RoleId,
                    IsActive = rm.IsActive,
                    IsDeleted = rm.IsDeleted,
                    CreatedBy = rm.CreatedBy,
                    CreatedDate = rm.CreatedDate,
                    ModifiedBy = rm.ModifiedBy,
                    ModifiedDate = rm.ModifiedDate,
                    Status = rm.Status,
                    StatusMessage = rm.StatusMessage
                };
                await _context.RoleMenuMappings.AddAsync(infraMapping);
            }
        }

        await _context.SaveChangesAsync();

        return menuMaster;
    }

    public async Task<Domain.Entities.MenuMaster> UpdateAsync(Domain.Entities.MenuMaster menuMaster)
    {
        var infraMenu = await _context.MenuMasters.FindAsync(menuMaster.Id);
        if (infraMenu != null)
        {
            infraMenu.Name = menuMaster.Name;
            infraMenu.DisplayName = menuMaster.DisplayName;
            infraMenu.Icon = menuMaster.Icon;
            infraMenu.Path = menuMaster.Path;
            infraMenu.ParentId = menuMaster.ParentId;
            infraMenu.SortOrder = menuMaster.SortOrder;
            infraMenu.Category = menuMaster.Category;
            infraMenu.Description = menuMaster.Description;
            infraMenu.IsActive = menuMaster.IsActive;
            infraMenu.IsDeleted = menuMaster.IsDeleted;
            infraMenu.CreatedBy = menuMaster.CreatedBy;
            infraMenu.CreatedDate = menuMaster.CreatedDate;
            infraMenu.ModifiedBy = menuMaster.ModifiedBy;
            infraMenu.ModifiedDate = menuMaster.ModifiedDate;
            infraMenu.Status = menuMaster.Status;
            infraMenu.StatusMessage = menuMaster.StatusMessage;

            _context.MenuMasters.Update(infraMenu);
            await _context.SaveChangesAsync();
        }

        return menuMaster;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var infraMenu = await _context.MenuMasters.FindAsync(id);
        if (infraMenu != null)
        {
            _context.MenuMasters.Remove(infraMenu);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }

    private static Domain.Entities.MenuMaster MapToDomainEntity(InfraMenuMaster infraMenu)
    {
        return new Domain.Entities.MenuMaster
        {
            Id = infraMenu.Id,
            Name = infraMenu.Name,
            DisplayName = infraMenu.DisplayName,
            Icon = infraMenu.Icon,
            Path = infraMenu.Path,
            ParentId = infraMenu.ParentId,
            SortOrder = infraMenu.SortOrder,
            Category = infraMenu.Category,
            Description = infraMenu.Description,
            IsActive = infraMenu.IsActive,
            IsDeleted = infraMenu.IsDeleted,
            CreatedBy = infraMenu.CreatedBy,
            CreatedDate = infraMenu.CreatedDate,
            ModifiedBy = infraMenu.ModifiedBy,
            ModifiedDate = infraMenu.ModifiedDate,
            Status = infraMenu.Status,
            StatusMessage = infraMenu.StatusMessage,
            Children = infraMenu.Children.Select(MapToDomainEntity).ToList(),
            RoleMappings = infraMenu.RoleMappings.Select(rm => new RoleMenuMapping
            {
                Id = rm.Id,
                MenuId = rm.MenuId,
                RoleId = rm.RoleId,
                IsActive = rm.IsActive,
                IsDeleted = rm.IsDeleted,
                CreatedBy = rm.CreatedBy,
                CreatedDate = rm.CreatedDate,
                ModifiedBy = rm.ModifiedBy,
                ModifiedDate = rm.ModifiedDate,
                Status = rm.Status,
                StatusMessage = rm.StatusMessage
            }).ToList()
        };
    }
}
