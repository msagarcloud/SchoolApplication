using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class SessionService : ISessionService
{
    private readonly ISessionRepository _repository;

    public SessionService(ISessionRepository repository)
    {
        _repository = repository;
    }

    public async Task<SessionResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<SessionResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<SessionResponse> CreateAsync(SessionRequest request)
    {
        var entity = new SchoolDemo.Domain.Entities.SessionMaster
        {
            Id = Guid.NewGuid(),
            Value = request.Value,
            Description = request.Description,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Session created successfully"
        };

        var CreatedEntity = await _repository.AddAsync(entity);
        return MapToResponse(CreatedEntity);
    }

    public async Task<SessionResponse?> UpdateAsync(Guid id, SessionRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.Value = request.Value ?? existingEntity.Value;
        existingEntity.Description = request.Description ?? existingEntity.Description;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Session updated successfully";

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

    private static SessionResponse MapToResponse(SchoolDemo.Domain.Entities.SessionMaster entity)
    {
        return new SessionResponse
        {
            Id = entity.Id,
            Value = entity.Value,
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
