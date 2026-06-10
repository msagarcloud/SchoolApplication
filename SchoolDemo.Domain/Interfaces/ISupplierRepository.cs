using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface ISupplierRepository
{
    Task<Supplier?> GetByIdAsync(Guid id);
    Task<IEnumerable<Supplier>> GetAllAsync();
    Task<Supplier> AddAsync(Supplier supplier);
    Task<Supplier> UpdateAsync(Supplier supplier);
    Task DeleteAsync(Guid id);
}
