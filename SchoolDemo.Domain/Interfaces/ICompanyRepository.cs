using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface ICompanyRepository
{
    Task<Company?> GetByIdAsync(Guid id);
    Task<IEnumerable<Company>> GetAllAsync();
    Task<Company> AddAsync(Company company);
    Task<Company> UpdateAsync(Company company);
    Task DeleteAsync(Guid id);
}
