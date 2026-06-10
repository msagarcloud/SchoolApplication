namespace SchoolDemo.Domain.Interfaces;

public interface IFeesCategoryRepository
{
    Task<SchoolDemo.Domain.Entities.FeesCategoryMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.FeesCategoryMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.FeesCategoryMaster> AddAsync(SchoolDemo.Domain.Entities.FeesCategoryMaster entity);
    Task<SchoolDemo.Domain.Entities.FeesCategoryMaster> UpdateAsync(SchoolDemo.Domain.Entities.FeesCategoryMaster entity);
    Task DeleteAsync(Guid id);
}
