using SchoolDemo.Domain.DTOs;

namespace SchoolDemo.Domain.Interfaces;

public interface IVoucherService
{
    Task<VoucherResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<VoucherResponse>> GetAllAsync();
    Task<VoucherResponse> CreateAsync(VoucherRequest request);
    Task<VoucherResponse?> UpdateAsync(Guid id, VoucherRequest request);
    Task<bool> DeleteAsync(Guid id);
}
