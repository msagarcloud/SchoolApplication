using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class RoleService : IRoleService
{
    private readonly IRoleRepository _repository;

    public RoleService(IRoleRepository repository)
    {
        _repository = repository;
    }

    public async Task<RoleResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<RoleResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<IEnumerable<RoleResponse>> GetByCompanyAndSchoolAsync(Guid companyId, Guid schoolId)
    {
        var entities = await _repository.GetByCompanyAndSchoolAsync(companyId, schoolId);
        return entities.Select(MapToResponse);
    }

    public async Task<RoleResponse> CreateAsync(RoleRequest request)
    {
        var entity = new SchoolDemo.Domain.Entities.RoleMaster
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = request.CreatedBy ?? Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Role created successfully"
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<RoleResponse?> UpdateAsync(Guid id, RoleRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.Name = request.Name ?? existingEntity.Name;
        existingEntity.Description = request.Description ?? existingEntity.Description;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.ModifiedBy = request.ModifiedBy;
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Role updated successfully";

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

    private static RoleResponse MapToResponse(SchoolDemo.Domain.Entities.RoleMaster entity)
    {
        return new RoleResponse
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
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
