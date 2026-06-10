using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface ISystemParameterRepository
{
    Task<SystemParameter?> GetByIdAsync(Guid id);
    Task<IEnumerable<SystemParameter>> GetAllAsync();
    Task<SystemParameter> AddAsync(SystemParameter parameter);
    Task<SystemParameter> UpdateAsync(SystemParameter parameter);
    Task DeleteAsync(Guid id);
}
