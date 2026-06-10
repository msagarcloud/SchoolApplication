using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface IMenuMasterRepository
{
    Task<MenuMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<MenuMaster>> GetAllAsync();
    Task<IEnumerable<MenuMaster>> GetByRoleIdAsync(Guid roleId);
    Task<IEnumerable<MenuMaster>> GetByRoleNameAsync(string roleName);
    Task<IEnumerable<MenuMaster>> GetActiveMenusAsync();
    Task<IEnumerable<MenuMaster>> GetMenuHierarchyAsync();
    Task<MenuMaster> AddAsync(MenuMaster menuMaster);
    Task<MenuMaster> UpdateAsync(MenuMaster menuMaster);
    Task<bool> DeleteAsync(Guid id);
}
