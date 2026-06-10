using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class ClassService : IClassService
{
    private readonly IClassRepository _repository;

    public ClassService(IClassRepository repository)
    {
        _repository = repository;
    }

    public async Task<ClassResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<ClassResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<IEnumerable<ClassResponse>> GetBySchoolIdAsync(Guid schoolId)
    {
        var entities = await _repository.GetBySchoolIdAsync(schoolId);
        return entities.Select(MapToResponse);
    }

    public async Task<ClassResponse> CreateAsync(ClassRequest request)
    {
        var entity = new Class
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            ExamAssessment = request.ExamAssessment,
            IsGradePointApplicable = request.IsGradePointApplicable,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Class created successfully"
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<ClassResponse?> UpdateAsync(Guid id, ClassRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.Name = request.Name ?? existingEntity.Name;
        existingEntity.ExamAssessment = request.ExamAssessment ?? existingEntity.ExamAssessment;
        existingEntity.IsGradePointApplicable = request.IsGradePointApplicable ?? existingEntity.IsGradePointApplicable;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Class updated successfully";

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

    private static ClassResponse MapToResponse(Class entity)
    {
        return new ClassResponse
        {
            Id = entity.Id,
            Name = entity.Name,
            ExamAssessment = entity.ExamAssessment,
            IsGradePointApplicable = entity.IsGradePointApplicable,
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
