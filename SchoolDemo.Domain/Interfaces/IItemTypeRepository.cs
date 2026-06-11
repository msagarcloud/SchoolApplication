using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface IItemTypeRepository
{
    Task<ItemTypeMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<ItemTypeMaster>> GetAllAsync();
    Task<ItemTypeMaster> AddAsync(ItemTypeMaster entity);
    Task<ItemTypeMaster> UpdateAsync(ItemTypeMaster entity);
    Task DeleteAsync(Guid id);
}
