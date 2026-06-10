using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class QualificationService : IQualificationService
{
    private readonly IQualificationRepository _repository;

    public QualificationService(IQualificationRepository repository)
    {
        _repository = repository;
    }

    public async Task<QualificationResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<QualificationResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<QualificationResponse> CreateAsync(QualificationRequest request)
    {
        var entity = new SchoolDemo.Domain.Entities.QualificationMaster
        {
            Id = Guid.NewGuid(),
            QualificationName = request.QualificationName,
            IsTeachingQualification = request.IsTeachingQualification,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Qualification created successfully"
        };

        var CreatedEntity = await _repository.AddAsync(entity);
        return MapToResponse(CreatedEntity);
    }

    public async Task<QualificationResponse?> UpdateAsync(Guid id, QualificationRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.QualificationName = request.QualificationName ?? existingEntity.QualificationName;
        existingEntity.IsTeachingQualification = request.IsTeachingQualification;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Qualification updated successfully";

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

    private static QualificationResponse MapToResponse(SchoolDemo.Domain.Entities.QualificationMaster entity)
    {
        return new QualificationResponse
        {
            Id = entity.Id,
            QualificationName = entity.QualificationName,
            IsTeachingQualification = entity.IsTeachingQualification,
            IsActive = entity.IsActive,
            CreatedDate = entity.CreatedDate,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage
        };
    }
}
