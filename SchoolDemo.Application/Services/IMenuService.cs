using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Application.Services;

public interface IMenuService
{
    Task<IEnumerable<MenuMaster>> GetMenuForRoleAsync(string roleName);
    Task<IEnumerable<MenuMaster>> GetMenuHierarchyForRoleAsync(string roleName);
    Task<MenuMaster?> GetMenuByIdAsync(Guid id);
    Task<IEnumerable<MenuMaster>> GetAllMenusAsync();
    Task<MenuMaster> CreateMenuAsync(MenuMaster menu);
    Task<MenuMaster> UpdateMenuAsync(MenuMaster menu);
    Task<bool> DeleteMenuAsync(Guid id);
    Task<bool> AssignMenuToRoleAsync(Guid menuId, Guid roleId);
    Task<bool> RemoveMenuFromRoleAsync(Guid menuId, Guid roleId);
}
