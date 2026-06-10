using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class SubjectService : ISubjectService
{
    private readonly ISubjectRepository _repository;

    public SubjectService(ISubjectRepository repository)
    {
        _repository = repository;
    }

    public async Task<SubjectResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<SubjectResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<SubjectResponse> CreateAsync(SubjectRequest request)
    {
        var entity = new Subject
        {
            Id = Guid.NewGuid(),
            SubjectName = request.SubjectName,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsScholastic = request.IsScholastic,
            PeriodsPerWeek = request.PeriodsPerWeek,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Subject created successfully"
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<SubjectResponse?> UpdateAsync(Guid id, SubjectRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.SubjectName = request.SubjectName ?? existingEntity.SubjectName;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.IsScholastic = request.IsScholastic ?? existingEntity.IsScholastic;
        existingEntity.PeriodsPerWeek = request.PeriodsPerWeek ?? existingEntity.PeriodsPerWeek;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Subject updated successfully";

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

    private static SubjectResponse MapToResponse(Subject entity)
    {
        return new SubjectResponse
        {
            Id = entity.Id,
            SubjectName = entity.SubjectName,
            CompanyId = entity.CompanyId,
            SchoolId = entity.SchoolId,
            IsScholastic = entity.IsScholastic,
            IsActive = entity.IsActive,
            CreatedDate = entity.CreatedDate,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage,
            PeriodsPerWeek = entity.PeriodsPerWeek
        };
    }
}
