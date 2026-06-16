namespace SchoolDemo.Domain.Interfaces;

public interface IInventoryMasterRepository
{
    Task<SchoolDemo.Domain.Entities.InventoryMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.InventoryMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.InventoryMaster> AddAsync(SchoolDemo.Domain.Entities.InventoryMaster entity);
    Task<SchoolDemo.Domain.Entities.InventoryMaster> UpdateAsync(SchoolDemo.Domain.Entities.InventoryMaster entity);
    Task DeleteAsync(Guid id);
}
