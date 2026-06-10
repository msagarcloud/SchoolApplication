using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface IEmployeeRepository
{
    Task<Employee?> GetByIdAsync(Guid id);
    Task<IEnumerable<Employee>> GetAllAsync();
    Task<Employee> AddAsync(Employee employee);
    Task<Employee> UpdateAsync(Employee employee);
    Task DeleteAsync(Guid id);
}
