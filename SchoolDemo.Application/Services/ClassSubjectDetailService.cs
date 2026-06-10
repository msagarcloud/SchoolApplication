using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class ClassSubjectDetailService : IClassSubjectDetailService
{
    private readonly IClassSubjectDetailRepository _repository;

    public ClassSubjectDetailService(IClassSubjectDetailRepository repository)
    {
        _repository = repository;
    }

    public async Task<ClassSubjectDetailResponse?> GetByIdAsync(Guid id, Guid schoolId)
    {
        var entity = await _repository.GetByIdAsync(id, schoolId);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<ClassSubjectDetailResponse>> GetAllAsync(Guid schoolId)
    {
        var entities = await _repository.GetAllAsync(schoolId);
        return entities.Select(MapToResponse);
    }

    public async Task<ClassSubjectDetailResponse> CreateAsync(ClassSubjectDetailRequest request)
    {
        var entity = new ClassSubjectDetail
        {
            Id = Guid.NewGuid(),
            ClassMasterId = request.ClassMasterId,
            SubjectId = request.SubjectId,
            PeriodsPerWeek = request.PeriodsPerWeek,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = request.CreatedBy ?? Guid.Empty, // Use provided CreatedBy or empty
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Class subject detail created successfully"
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<ClassSubjectDetailResponse?> UpdateAsync(Guid id, ClassSubjectDetailRequest request, Guid schoolId)
    {
        var existingEntity = await _repository.GetByIdAsync(id, schoolId);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.ClassMasterId = request.ClassMasterId != Guid.Empty ? request.ClassMasterId : existingEntity.ClassMasterId;
        existingEntity.SubjectId = request.SubjectId != Guid.Empty ? request.SubjectId : existingEntity.SubjectId;
        existingEntity.PeriodsPerWeek = request.PeriodsPerWeek;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.ModifiedBy = request.ModifiedBy;
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Class subject detail updated successfully";

        var updatedEntity = await _repository.UpdateAsync(existingEntity);
        return MapToResponse(updatedEntity);
    }

    public async Task<bool> DeleteAsync(Guid id, Guid schoolId)
    {
        var entity = await _repository.GetByIdAsync(id, schoolId);
        if (entity == null || entity.IsDeleted)
        {
            return false;
        }

        await _repository.DeleteAsync(id);
        return true;
    }

    private static ClassSubjectDetailResponse MapToResponse(ClassSubjectDetail entity)
    {
        return new ClassSubjectDetailResponse
        {
            Id = entity.Id,
            ClassMasterId = entity.ClassMasterId,
            SubjectId = entity.SubjectId,
            PeriodsPerWeek = entity.PeriodsPerWeek,
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
