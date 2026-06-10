using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class MenuService : IMenuService
{
    private readonly IMenuMasterRepository _menuRepository;

    public MenuService(IMenuMasterRepository menuRepository)
    {
        _menuRepository = menuRepository;
    }

    public async Task<IEnumerable<MenuMaster>> GetMenuForRoleAsync(string roleName)
    {
        return await _menuRepository.GetByRoleNameAsync(roleName);
    }

    public async Task<IEnumerable<MenuMaster>> GetMenuHierarchyForRoleAsync(string roleName)
    {
        var menuData = await _menuRepository.GetByRoleNameAsync(roleName);
        var allMenus = menuData.ToList();
        // Repo returns EF-shaped rows plus nested Children; BuildMenuHierarchy reparents flat rows.
        // Clear duplicates and stale trees so children are not aggregated twice into huge/cyclic payloads.
        var distinct = allMenus.GroupBy(m => m.Id).Select(g => g.First()).ToList();
        foreach (var m in distinct)
        {
            m.Children.Clear();
        }
        return BuildMenuHierarchy(distinct);
    }

    public async Task<MenuMaster?> GetMenuByIdAsync(Guid id)
    {
        return await _menuRepository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<MenuMaster>> GetAllMenusAsync()
    {
        return await _menuRepository.GetAllAsync();
    }

    public async Task<MenuMaster> CreateMenuAsync(MenuMaster menu)
    {
        menu.Id = Guid.NewGuid();
        menu.CreatedDate = DateTime.UtcNow;
        menu.IsActive = true;
        menu.IsDeleted = false;

        if (menu.RoleMappings is { Count: > 0 })
        {
            var now = DateTime.UtcNow;
            foreach (var mapping in menu.RoleMappings)
            {
                if (mapping.RoleId == Guid.Empty)
                    continue;
                mapping.Id = mapping.Id == Guid.Empty ? Guid.NewGuid() : mapping.Id;
                mapping.MenuId = menu.Id;
                mapping.IsActive = true;
                mapping.IsDeleted = false;
                mapping.CreatedDate = now;
                if (mapping.CreatedBy == Guid.Empty)
                    mapping.CreatedBy = menu.CreatedBy;
            }
            menu.RoleMappings.RemoveAll(m => m.RoleId == Guid.Empty);
        }

        menu.Children.Clear();
        return await _menuRepository.AddAsync(menu);
    }

    public async Task<MenuMaster> UpdateMenuAsync(MenuMaster menu)
    {
        menu.ModifiedDate = DateTime.UtcNow;

        return await _menuRepository.UpdateAsync(menu);
    }

    public async Task<bool> DeleteMenuAsync(Guid id)
    {
        return await _menuRepository.DeleteAsync(id);
    }

    public async Task<bool> AssignMenuToRoleAsync(Guid menuId, Guid roleId)
    {
        var menu = await _menuRepository.GetByIdAsync(menuId);
        if (menu == null) return false;

        var mapping = new RoleMenuMapping
        {
            Id = Guid.NewGuid(),
            MenuId = menuId,
            RoleId = roleId,
            IsActive = true,
            IsDeleted = false,
            CreatedDate = DateTime.UtcNow,
            CreatedBy = Guid.Empty // Should be set by authentication context
        };

        menu.RoleMappings.Add(mapping);
        await _menuRepository.UpdateAsync(menu);

        return true;
    }

    public async Task<bool> RemoveMenuFromRoleAsync(Guid menuId, Guid roleId)
    {
        var menu = await _menuRepository.GetByIdAsync(menuId);
        if (menu == null) return false;

        var mapping = menu.RoleMappings.FirstOrDefault(rm => rm.MenuId == menuId && rm.RoleId == roleId);
        if (mapping != null)
        {
            mapping.IsDeleted = true;
            mapping.ModifiedDate = DateTime.UtcNow;
            await _menuRepository.UpdateAsync(menu);
        }

        return true;
    }

    private static IEnumerable<MenuMaster> BuildMenuHierarchy(IEnumerable<MenuMaster> menus)
    {
        var menuList = menus.ToList();
        var parentMenus = menuList.Where(m => m.ParentId == null).OrderBy(m => m.SortOrder);
        var result = new List<MenuMaster>();

        foreach (var parent in parentMenus)
        {
            var menuWithChildren = BuildMenuWithChildren(parent, menuList);
            result.Add(menuWithChildren);
        }

        return result;
    }

    private static MenuMaster BuildMenuWithChildren(MenuMaster parent, List<MenuMaster> allMenus)
    {
        var children = allMenus.Where(m => m.ParentId == parent.Id).OrderBy(m => m.SortOrder).ToList();
        
        foreach (var child in children)
        {
            var childWithChildren = BuildMenuWithChildren(child, allMenus);
            parent.Children.Add(childWithChildren);
        }

        return parent;
    }
}
