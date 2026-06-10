using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class EmployeeLeaveService : IEmployeeLeaveService
{
    private readonly IEmployeeLeaveRepository _repository;

    public EmployeeLeaveService(IEmployeeLeaveRepository repository)
    {
        _repository = repository;
    }

    public async Task<EmployeeLeaveResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<EmployeeLeaveResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<EmployeeLeaveResponse> CreateAsync(EmployeeLeaveRequest request)
    {
        var entity = new EmployeeLeave
        {
            Id = Guid.NewGuid(),
            EmployeeId = request.EmployeeId,
            CategoryId = request.CategoryId,
            LeaveTypeId = request.LeaveTypeId,
            TotalLeaves = request.TotalLeaves,
            PreviousYearBalance = request.PreviousYearBalance,
            CurrentBalance = request.CurrentBalance,
            SessionId = request.SessionId,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Employee leave created successfully"
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<EmployeeLeaveResponse?> UpdateAsync(Guid id, EmployeeLeaveRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.EmployeeId = request.EmployeeId != Guid.Empty ? request.EmployeeId : existingEntity.EmployeeId;
        existingEntity.CategoryId = request.CategoryId != Guid.Empty ? request.CategoryId : existingEntity.CategoryId;
        existingEntity.LeaveTypeId = request.LeaveTypeId != Guid.Empty ? request.LeaveTypeId : existingEntity.LeaveTypeId;
        existingEntity.TotalLeaves = request.TotalLeaves ?? existingEntity.TotalLeaves;
        existingEntity.PreviousYearBalance = request.PreviousYearBalance ?? existingEntity.PreviousYearBalance;
        existingEntity.CurrentBalance = request.CurrentBalance ?? existingEntity.CurrentBalance;
        existingEntity.SessionId = request.SessionId != Guid.Empty ? request.SessionId : existingEntity.SessionId;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Employee leave updated successfully";

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

    private static EmployeeLeaveResponse MapToResponse(EmployeeLeave entity)
    {
        return new EmployeeLeaveResponse
        {
            Id = entity.Id,
            EmployeeId = entity.EmployeeId,
            CategoryId = entity.CategoryId,
            LeaveTypeId = entity.LeaveTypeId,
            TotalLeaves = entity.TotalLeaves,
            PreviousYearBalance = entity.PreviousYearBalance,
            CurrentBalance = entity.CurrentBalance,
            SessionId = entity.SessionId,
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
