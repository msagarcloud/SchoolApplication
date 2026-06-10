namespace SchoolDemo.Domain.Interfaces;

public interface IEmpCategoryRepository
{
    Task<SchoolDemo.Domain.Entities.EmpCategoryMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.EmpCategoryMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.EmpCategoryMaster> AddAsync(SchoolDemo.Domain.Entities.EmpCategoryMaster entity);
    Task<SchoolDemo.Domain.Entities.EmpCategoryMaster> UpdateAsync(SchoolDemo.Domain.Entities.EmpCategoryMaster entity);
    Task DeleteAsync(Guid id);
}
