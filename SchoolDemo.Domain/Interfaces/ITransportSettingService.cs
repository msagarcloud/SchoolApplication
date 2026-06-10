using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface ITransportSettingService
{
    Task<IEnumerable<TransportSetting>> GetAllAsync();
    Task<TransportSetting?> GetByIdAsync(Guid id);
    Task<TransportSetting> CreateAsync(TransportSettingRequest request);
    Task<TransportSetting?> UpdateAsync(Guid id, TransportSettingRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public class TransportSettingRequest
{
    public string SettingName { get; set; } = string.Empty;
    public string? SettingDescription { get; set; }
    public string? SettingValue { get; set; }
    public string? SettingType { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public Guid CreatedBy { get; set; }
}
