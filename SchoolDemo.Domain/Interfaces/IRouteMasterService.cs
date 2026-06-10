using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.DTOs;
using DomainRouteMaster = SchoolDemo.Domain.Entities.RouteMaster;

namespace SchoolDemo.Domain.Interfaces;

public interface IRouteMasterService
{
    Task<IEnumerable<DomainRouteMaster>> GetAllAsync();
    Task<DomainRouteMaster?> GetByIdAsync(Guid id);
    Task<DomainRouteMaster> CreateAsync(RouteMasterRequest request);
    Task<DomainRouteMaster?> UpdateAsync(Guid id, RouteMasterRequest request);
    Task<bool> DeleteAsync(Guid id);
}
