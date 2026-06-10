using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface ISchoolRepository
{
    Task<School?> GetByIdAsync(Guid id);
    Task<IEnumerable<School>> GetAllAsync();
    Task<School> AddAsync(School school);
    Task<School> UpdateAsync(School school);
    Task DeleteAsync(Guid id);
}
