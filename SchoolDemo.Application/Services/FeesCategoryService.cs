using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class FeesCategoryService : IFeesCategoryService
{
    private readonly IFeesCategoryRepository _repository;

    public FeesCategoryService(IFeesCategoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<FeesCategoryResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<FeesCategoryResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<FeesCategoryResponse> CreateAsync(FeesCategoryRequest request)
    {
        var entity = new SchoolDemo.Domain.Entities.FeesCategoryMaster
        {
            Id = Guid.NewGuid(),
            FeesCatgoryName = request.FeesCatgoryName,
            Description = request.Description,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Fees category created successfully"
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<FeesCategoryResponse?> UpdateAsync(Guid id, FeesCategoryRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.FeesCatgoryName = request.FeesCatgoryName ?? existingEntity.FeesCatgoryName;
        existingEntity.Description = request.Description ?? existingEntity.Description;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Fees category updated successfully";

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

    private static FeesCategoryResponse MapToResponse(SchoolDemo.Domain.Entities.FeesCategoryMaster entity)
    {
        return new FeesCategoryResponse
        {
            Id = entity.Id,
            FeesCatgoryName = entity.FeesCatgoryName,
            Description = entity.Description,
            IsActive = entity.IsActive,
            CreatedDate = entity.CreatedDate,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage
        };
    }
}
