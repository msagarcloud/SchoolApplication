namespace SchoolDemo.Domain.Interfaces;

public interface IVendorRepository
{
    Task<SchoolDemo.Domain.Entities.VendorMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.VendorMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.VendorMaster> AddAsync(SchoolDemo.Domain.Entities.VendorMaster entity);
    Task<SchoolDemo.Domain.Entities.VendorMaster> UpdateAsync(SchoolDemo.Domain.Entities.VendorMaster entity);
    Task DeleteAsync(Guid id);
}
