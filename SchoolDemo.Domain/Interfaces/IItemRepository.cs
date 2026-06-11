using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface IItemRepository
{
    Task<ItemMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<ItemMaster>> GetAllAsync();
    Task<ItemMaster> AddAsync(ItemMaster entity);
    Task<ItemMaster> UpdateAsync(ItemMaster entity);
    Task DeleteAsync(Guid id);
}
