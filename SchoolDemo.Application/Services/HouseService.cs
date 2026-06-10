using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class HouseService : IHouseService
{
    private readonly IHouseRepository _repository;

    public HouseService(IHouseRepository repository)
    {
        _repository = repository;
    }

    public async Task<HouseResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<HouseResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<HouseResponse> CreateAsync(HouseRequest request)
    {
        var entity = new SchoolDemo.Domain.Entities.HouseMaster
        {
            Id = Guid.NewGuid(),
            House = request.House,
            SchoolId = request.SchoolId,
            CompanyId = request.CompanyId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "House created successfully"
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<HouseResponse?> UpdateAsync(Guid id, HouseRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.House = request.House ?? existingEntity.House;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "House updated successfully";

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

    private static HouseResponse MapToResponse(SchoolDemo.Domain.Entities.HouseMaster entity)
    {
        return new HouseResponse
        {
            Id = entity.Id,
            House = entity.House,
            IsActive = entity.IsActive,
            CreatedDate = entity.CreatedDate,
            ModifiedDate = entity.ModifiedDate,
            SchoolId = entity.SchoolId,
            CompanyId = entity.CompanyId,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage
        };
    }
}
