using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class FeesDiscountCategoryService : IFeesDiscountCategoryService
{
    private readonly IFeesDiscountCategoryRepository _repository;

    public FeesDiscountCategoryService(IFeesDiscountCategoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<FeesDiscountCategoryResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<FeesDiscountCategoryResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<FeesDiscountCategoryResponse> CreateAsync(FeesDiscountCategoryRequest request)
    {
        var entity = new SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            FeeCategoryId = request.FeeCategoryId,
            IsPercentAge = request.IsPercentAge,
            Amount = request.Amount,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Fees discount category created successfully"
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<FeesDiscountCategoryResponse?> UpdateAsync(Guid id, FeesDiscountCategoryRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.Name = request.Name ?? existingEntity.Name;
        existingEntity.Description = request.Description ?? existingEntity.Description;
        existingEntity.FeeCategoryId = request.FeeCategoryId != Guid.Empty ? request.FeeCategoryId : existingEntity.FeeCategoryId;
        existingEntity.IsPercentAge = request.IsPercentAge ?? existingEntity.IsPercentAge;
        existingEntity.Amount = request.Amount ?? existingEntity.Amount;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Fees discount category updated successfully";

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

    private static FeesDiscountCategoryResponse MapToResponse(SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster entity)
    {
        return new FeesDiscountCategoryResponse
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            FeeCategoryId = entity.FeeCategoryId,
            IsPercentAge = entity.IsPercentAge,
            Amount = entity.Amount,
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
