using DomainPrivilege = SchoolDemo.Domain.Entities.Privilege;

namespace SchoolDemo.Domain.Interfaces;

public interface IPrivilegeRepository
{
    Task<DomainPrivilege?> GetByIdAsync(Guid id);
    Task<IEnumerable<DomainPrivilege>> GetAllAsync();
    Task<DomainPrivilege> AddAsync(DomainPrivilege privilege);
    Task<DomainPrivilege> UpdateAsync(DomainPrivilege privilege);
    Task DeleteAsync(Guid id);
}
