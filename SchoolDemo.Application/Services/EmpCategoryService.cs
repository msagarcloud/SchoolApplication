using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class EmpCategoryService : IEmpCategoryService
{
    private readonly IEmpCategoryRepository _repository;

    public EmpCategoryService(IEmpCategoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<EmpCategoryResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<EmpCategoryResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<EmpCategoryResponse> CreateAsync(EmpCategoryRequest request)
    {
        var entity = new SchoolDemo.Domain.Entities.EmpCategoryMaster
        {
            Id = Guid.NewGuid(),
            CategoryName = request.CategoryName,
            CategoryDescription = request.CategoryDescription,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Employee category created successfully"
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<EmpCategoryResponse?> UpdateAsync(Guid id, EmpCategoryRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.CategoryName = request.CategoryName ?? existingEntity.CategoryName;
        existingEntity.CategoryDescription = request.CategoryDescription ?? existingEntity.CategoryDescription;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Employee category updated successfully";

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

    private static EmpCategoryResponse MapToResponse(SchoolDemo.Domain.Entities.EmpCategoryMaster entity)
    {
        return new EmpCategoryResponse
        {
            Id = entity.Id,
            CategoryName = entity.CategoryName,
            CategoryDescription = entity.CategoryDescription,
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
