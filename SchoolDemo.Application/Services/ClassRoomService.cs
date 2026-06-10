using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class ClassRoomService : IClassRoomService
{
    private readonly IClassRoomRepository _repository;

    public ClassRoomService(IClassRoomRepository repository)
    {
        _repository = repository;
    }

    public async Task<ClassRoomResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<ClassRoomResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<ClassRoomResponse> CreateAsync(ClassRoomRequest request)
    {
        var entity = new ClassRoom
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            SchoolId = request.SchoolId,
            CompanyId = request.CompanyId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Class room created successfully"
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<ClassRoomResponse?> UpdateAsync(Guid id, ClassRoomRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.Name = request.Name ?? existingEntity.Name;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Class room updated successfully";

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

    private static ClassRoomResponse MapToResponse(ClassRoom entity)
    {
        return new ClassRoomResponse
        {
            Id = entity.Id,
            Name = entity.Name,
            SchoolId = entity.SchoolId,
            CompanyId = entity.CompanyId,
            IsActive = entity.IsActive,
            CreatedDate = entity.CreatedDate,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage
        };
    }
}
