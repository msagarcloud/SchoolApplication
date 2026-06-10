using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class HolidayService : IHolidayService
{
    private readonly IHolidayRepository _repository;

    public HolidayService(IHolidayRepository repository)
    {
        _repository = repository;
    }

    public async Task<HolidayResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<HolidayResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<HolidayResponse> CreateAsync(HolidayRequest request)
    {
        var entity = new SchoolDemo.Domain.Entities.HolidayMaster
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            TypeId = request.TypeId,
            FromDate = request.FromDate,
            ToDate = request.ToDate,
            Year = request.Year,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsStaffApplicable = request.IsStaffApplicable,
            SessionId = request.SessionId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Holiday created successfully"
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<HolidayResponse?> UpdateAsync(Guid id, HolidayRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.Name = request.Name ?? existingEntity.Name;
        existingEntity.Description = request.Description ?? existingEntity.Description;
        existingEntity.TypeId = request.TypeId != Guid.Empty ? request.TypeId : existingEntity.TypeId;
        existingEntity.FromDate = request.FromDate != default ? request.FromDate : existingEntity.FromDate;
        existingEntity.ToDate = request.ToDate != default ? request.ToDate : existingEntity.ToDate;
        existingEntity.Year = request.Year != Guid.Empty ? request.Year : existingEntity.Year;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.IsStaffApplicable = request.IsStaffApplicable ?? existingEntity.IsStaffApplicable;
        existingEntity.SessionId = request.SessionId != Guid.Empty ? request.SessionId : existingEntity.SessionId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Holiday updated successfully";

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

    private static HolidayResponse MapToResponse(SchoolDemo.Domain.Entities.HolidayMaster entity)
    {
        return new HolidayResponse
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            TypeId = entity.TypeId,
            FromDate = entity.FromDate,
            ToDate = entity.ToDate,
            Year = entity.Year,
            CompanyId = entity.CompanyId,
            SchoolId = entity.SchoolId,
            IsStaffApplicable = entity.IsStaffApplicable,
            SessionId = entity.SessionId,
            IsActive = entity.IsActive,
            CreatedDate = entity.CreatedDate,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage
        };
    }
}
