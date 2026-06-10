using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface IRolePrivilegeRepository
{
    Task<RolePrivilege?> GetByIdAsync(Guid id);
    Task<IEnumerable<RolePrivilege>> GetAllAsync();
    Task<RolePrivilege> AddAsync(RolePrivilege rolePrivilege);
    Task<RolePrivilege> UpdateAsync(RolePrivilege rolePrivilege);
    Task DeleteAsync(Guid id);
}
