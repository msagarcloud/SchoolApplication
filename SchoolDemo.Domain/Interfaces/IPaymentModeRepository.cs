namespace SchoolDemo.Domain.Interfaces;

public interface IPaymentModeRepository
{
    Task<SchoolDemo.Domain.Entities.PaymentModeMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.PaymentModeMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.PaymentModeMaster> AddAsync(SchoolDemo.Domain.Entities.PaymentModeMaster entity);
    Task<SchoolDemo.Domain.Entities.PaymentModeMaster> UpdateAsync(SchoolDemo.Domain.Entities.PaymentModeMaster entity);
    Task DeleteAsync(Guid id);
}
