namespace SchoolDemo.Domain.Interfaces;

public interface IVoucherRepository
{
    Task<SchoolDemo.Domain.Entities.VoucherMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.VoucherMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.VoucherMaster> AddAsync(SchoolDemo.Domain.Entities.VoucherMaster entity);
    Task<SchoolDemo.Domain.Entities.VoucherMaster> UpdateAsync(SchoolDemo.Domain.Entities.VoucherMaster entity);
    Task DeleteAsync(Guid id);
}
