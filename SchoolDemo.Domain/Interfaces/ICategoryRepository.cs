namespace SchoolDemo.Domain.Interfaces;

public interface ICategoryRepository
{
    Task<SchoolDemo.Domain.Entities.CategoryMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.CategoryMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.CategoryMaster> AddAsync(SchoolDemo.Domain.Entities.CategoryMaster entity);
    Task<SchoolDemo.Domain.Entities.CategoryMaster> UpdateAsync(SchoolDemo.Domain.Entities.CategoryMaster entity);
    Task DeleteAsync(Guid id);
}
