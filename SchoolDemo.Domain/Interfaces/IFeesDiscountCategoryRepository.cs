namespace SchoolDemo.Domain.Interfaces;

public interface IFeesDiscountCategoryRepository
{
    Task<SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster> AddAsync(SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster entity);
    Task<SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster> UpdateAsync(SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster entity);
    Task DeleteAsync(Guid id);
}
