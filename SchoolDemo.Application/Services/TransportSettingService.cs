using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class TransportSettingService : ITransportSettingService
{
    private readonly ITransportSettingRepository _repository;

    public TransportSettingService(ITransportSettingRepository repository)
    {
        _repository = repository;
    }

    public async Task<TransportSetting?> GetByIdAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<TransportSetting>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<TransportSetting> CreateAsync(TransportSettingRequest request)
    {
        var entity = new TransportSetting
        {
            Id = Guid.NewGuid(),
            SettingName = request.SettingName,
            SettingDescription = request.SettingDescription,
            SettingValue = request.SettingValue,
            SettingType = request.SettingType,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            CreatedBy = request.CreatedBy,
            CreatedDate = DateTime.UtcNow,
            IsActive = true,
            IsDeleted = false
        };

        return await _repository.AddAsync(entity);
    }

    public async Task<TransportSetting?> UpdateAsync(Guid id, TransportSettingRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null)
            return null;

        existingEntity.SettingName = request.SettingName;
        existingEntity.SettingDescription = request.SettingDescription;
        existingEntity.SettingValue = request.SettingValue;
        existingEntity.SettingType = request.SettingType;
        existingEntity.ModifiedDate = DateTime.UtcNow;

        return await _repository.UpdateAsync(existingEntity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await _repository.DeleteAsync(id);
    }
}
