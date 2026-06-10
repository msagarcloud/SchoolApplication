using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class DesigService : IDesigService
{
    private readonly IDesigRepository _repository;

    public DesigService(IDesigRepository repository)
    {
        _repository = repository;
    }

    public async Task<DesigResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<DesigResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<IEnumerable<DesigResponse>> GetByDepartmentIdAsync(Guid departmentId)
    {
        var entities = await _repository.GetByDepartmentIdAsync(departmentId);
        return entities.Select(MapToResponse);
    }

    public async Task<DesigResponse> CreateAsync(DesigRequest request)
    {
        var entity = new SchoolDemo.Domain.Entities.DesigMaster
        {
            Id = Guid.NewGuid(),
            Code = request.Code,
            Name = request.Name,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Designation created successfully"
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<DesigResponse?> UpdateAsync(Guid id, DesigRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.Code = request.Code ?? existingEntity.Code;
        existingEntity.Name = request.Name ?? existingEntity.Name;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Designation updated successfully";

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

    private static DesigResponse MapToResponse(SchoolDemo.Domain.Entities.DesigMaster entity)
    {
        return new DesigResponse
        {
            Id = entity.Id,
            Code = entity.Code,
            Name = entity.Name,
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
