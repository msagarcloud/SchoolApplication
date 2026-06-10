using SchoolDemo.Domain.Entities;
using DomainRouteMaster = SchoolDemo.Domain.Entities.RouteMaster;

namespace SchoolDemo.Domain.Interfaces;

public interface IRouteMasterRepository
{
    Task<IEnumerable<DomainRouteMaster>> GetAllAsync();
    Task<DomainRouteMaster?> GetByIdAsync(Guid id);
    Task<DomainRouteMaster> AddAsync(DomainRouteMaster entity);
    Task<DomainRouteMaster?> UpdateAsync(DomainRouteMaster entity);
    Task<bool> DeleteAsync(Guid id);
}
