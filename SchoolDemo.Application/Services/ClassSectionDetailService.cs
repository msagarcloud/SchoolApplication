using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class ClassSectionDetailService : IClassSectionDetailService
{
    private readonly IClassSectionDetailRepository _repository;

    public ClassSectionDetailService(IClassSectionDetailRepository repository)
    {
        _repository = repository;
    }

    public async Task<ClassSectionDetailResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<ClassSectionDetailResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<IEnumerable<ClassSectionDetailResponse>> GetBySchoolIdAsync(Guid schoolId)
    {
        var entities = await _repository.GetBySchoolIdAsync(schoolId);
        return entities.Select(MapToResponse);
    }

    public async Task<ClassSectionDetailResponse> CreateAsync(ClassSectionDetailRequest request)
    {
        var entity = new ClassSectionDetail
        {
            Id = Guid.NewGuid(),
            ClassMasterId = request.ClassMasterId,
            SectionMasterId = request.SectionMasterId,
            LocationId = request.LocationId,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Class section detail created successfully"
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<ClassSectionDetailResponse?> UpdateAsync(Guid id, ClassSectionDetailRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.ClassMasterId = request.ClassMasterId != Guid.Empty ? request.ClassMasterId : existingEntity.ClassMasterId;
        existingEntity.SectionMasterId = request.SectionMasterId != Guid.Empty ? request.SectionMasterId : existingEntity.SectionMasterId;
        existingEntity.LocationId = request.LocationId != Guid.Empty ? request.LocationId : existingEntity.LocationId;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Class section detail updated successfully";

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

    private static ClassSectionDetailResponse MapToResponse(ClassSectionDetail entity)
    {
        return new ClassSectionDetailResponse
        {
            Id = entity.Id,
            ClassMasterId = entity.ClassMasterId,
            SectionMasterId = entity.SectionMasterId,
            LocationId = entity.LocationId,
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
