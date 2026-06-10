using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class LeaveTypeService : ILeaveTypeService
{
    private readonly ILeaveTypeRepository _repository;

    public LeaveTypeService(ILeaveTypeRepository repository)
    {
        _repository = repository;
    }

    public async Task<LeaveTypeResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<LeaveTypeResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<LeaveTypeResponse> CreateAsync(LeaveTypeRequest request)
    {
        var entity = new SchoolDemo.Domain.Entities.LeaveTypeMaster
        {
            Id = Guid.NewGuid(),
            Code = request.Code,
            Description = request.Description,
            ApplicableGender = request.ApplicableGender,
            IsSpecialLeave = request.IsSpecialLeave,
            IsEncashable = request.IsEncashable,
            IsCarryForward = request.IsCarryForward,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Leave type created successfully"
        };

        var CreatedEntity = await _repository.AddAsync(entity);
        return MapToResponse(CreatedEntity);
    }

    public async Task<LeaveTypeResponse?> UpdateAsync(Guid id, LeaveTypeRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.Code = request.Code ?? existingEntity.Code;
        existingEntity.Description = request.Description ?? existingEntity.Description;
        existingEntity.ApplicableGender = request.ApplicableGender ?? existingEntity.ApplicableGender;
        existingEntity.IsSpecialLeave = request.IsSpecialLeave;
        existingEntity.IsEncashable = request.IsEncashable;
        existingEntity.IsCarryForward = request.IsCarryForward;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Leave type updated successfully";

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

    private static LeaveTypeResponse MapToResponse(SchoolDemo.Domain.Entities.LeaveTypeMaster entity)
    {
        return new LeaveTypeResponse
        {
            Id = entity.Id,
            Code = entity.Code,
            Description = entity.Description,
            ApplicableGender = entity.ApplicableGender,
            IsSpecialLeave = entity.IsSpecialLeave,
            IsEncashable = entity.IsEncashable,
            IsCarryForward = entity.IsCarryForward,
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
