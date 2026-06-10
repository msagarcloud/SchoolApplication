using SchoolDemo.Domain.DTOs;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using System;

namespace SchoolDemo.Application.Services;

public class TimeTablePeriodService : ITimeTablePeriodService
{
    private readonly ITimeTablePeriodRepository _repository;

    public TimeTablePeriodService(ITimeTablePeriodRepository repository)
    {
        _repository = repository;
    }

    public async Task<TimeTablePeriodResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<TimeTablePeriodResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<TimeTablePeriodResponse> CreateAsync(TimeTablePeriodRequest request)
    {
        var entity = new TimeTablePeriodMaster
        {
            Id = Guid.NewGuid(),
            Description = request.Description,
            StartTime = request.StartTime,
            EndTime = request.EndTime,
            SessionId = request.SessionId,
            CompanyId = Guid.NewGuid(), // This will be set from session in real implementation
            SchoolId = Guid.NewGuid(), // This will be set from session in real implementation
            PeriodNumber = request.PeriodNumber,
            IsActive = request.IsActive,
            IsDeleted = false,
            CreatedBy = request.CreatedBy,
            CreatedDate = DateTime.UtcNow,
            ModifiedBy = null,
            ModifiedDate = null,
            Status = "Created",
            StatusMessage = "TimeTablePeriod created successfully"
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<TimeTablePeriodResponse> UpdateAsync(Guid id, TimeTablePeriodRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            throw new Exception($"TimeTablePeriod with ID {id} not found.");
        }

        // Update properties
        existingEntity.Description = request.Description;
        existingEntity.StartTime = request.StartTime;
        existingEntity.EndTime = request.EndTime;
        existingEntity.SessionId = request.SessionId;
        existingEntity.PeriodNumber = request.PeriodNumber;
        existingEntity.IsActive = request.IsActive;
        existingEntity.ModifiedBy = request.ModifiedBy;
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "TimeTablePeriod updated successfully";

        var updatedEntity = await _repository.UpdateAsync(existingEntity);
        return MapToResponse(updatedEntity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        try
        {
            await _repository.DeleteAsync(id);
            return true;
        }
        catch
        {
            return false;
        }
    }

    private static TimeTablePeriodResponse MapToResponse(TimeTablePeriodMaster entity)
    {
        return new TimeTablePeriodResponse
        {
            Id = entity.Id,
            Description = entity.Description,
            StartTime = entity.StartTime,
            EndTime = entity.EndTime,
            SessionId = entity.SessionId,
            CompanyId = entity.CompanyId,
            SchoolId = entity.SchoolId,
            IsActive = entity.IsActive,
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage,
            PeriodNumber = entity.PeriodNumber
        };
    }
}
