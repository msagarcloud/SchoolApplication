using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface ITransportSettingRepository
{
    Task<IEnumerable<TransportSetting>> GetAllAsync();
    Task<TransportSetting?> GetByIdAsync(Guid id);
    Task<TransportSetting> AddAsync(TransportSetting entity);
    Task<TransportSetting?> UpdateAsync(TransportSetting entity);
    Task<bool> DeleteAsync(Guid id);
}
