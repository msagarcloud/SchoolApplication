using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class HolidayTypeService : IHolidayTypeService
{
    private readonly IHolidayTypeRepository _repository;

    public HolidayTypeService(IHolidayTypeRepository repository)
    {
        _repository = repository;
    }

    public async Task<HolidayTypeResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<HolidayTypeResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

        public async Task<HolidayTypeResponse> CreateAsync(HolidayTypeRequest request)
    {
        var entity = new SchoolDemo.Domain.Entities.HolidayTypeMaster
        {
            Id = Guid.NewGuid(),
            HolidayTypeName = request.HolidayTypeName,
            HolidayTypeDescription = request.HolidayTypeDescription,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
                // Use CreatedBy from request (set by controller from session) when available
                CreatedBy = request.CreatedBy ?? Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Holiday type created successfully"
        };

        var CreatedEntity = await _repository.AddAsync(entity);
        return MapToResponse(CreatedEntity);
    }

    public async Task<HolidayTypeResponse?> UpdateAsync(Guid id, HolidayTypeRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.HolidayTypeName = request.HolidayTypeName ?? existingEntity.HolidayTypeName;
        existingEntity.HolidayTypeDescription = request.HolidayTypeDescription ?? existingEntity.HolidayTypeDescription;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        // Use ModifiedBy from request (set by controller from session) when available
        existingEntity.ModifiedBy = request.ModifiedBy ?? Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Holiday type updated successfully";

        var updatedEntity = await _repository.UpdateAsync(existingEntity);
        return MapToResponse(updatedEntity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity == null || entity.IsDeleted)
        {
            return false;
        }

        await _repository.DeleteAsync(id);
        return true;
    }

    private static HolidayTypeResponse MapToResponse(SchoolDemo.Domain.Entities.HolidayTypeMaster entity)
    {
        return new HolidayTypeResponse
        {
            Id = entity.Id,
            HolidayTypeName = entity.HolidayTypeName,
            HolidayTypeDescription = entity.HolidayTypeDescription,
            CompanyId = entity.CompanyId,
            SchoolId = entity.SchoolId,
            IsActive = entity.IsActive,
            CreatedDate = entity.CreatedDate,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage
        };
    }
}
