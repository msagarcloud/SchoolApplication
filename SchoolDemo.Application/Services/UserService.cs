using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _repository;

    public UserService(IUserRepository repository)
    {
        _repository = repository;
    }

    public async Task<UserResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<UserResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<UserResponse> CreateAsync(UserRequest request)
    {
        var entity = new User
        {
            Id = Guid.NewGuid(),
            UserName = request.UserName ?? string.Empty,
            UserPassword = request.UserPassword ?? string.Empty,
            FirstName = request.FirstName ?? string.Empty,
            LastName = request.LastName ?? string.Empty,
            EmailAddress = request.EmailAddress ?? string.Empty,
            DesignationId = request.DesignationId,
            UserRoleId = request.UserRoleId,
            IsSuperUser = request.IsSuperUser,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = request.IsActive,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "User created successfully"
        };

        var created = await _repository.AddAsync(entity);
        return MapToResponse(created);
    }

    public async Task<UserResponse?> UpdateAsync(Guid id, UserRequest request)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null || existing.IsDeleted)
            return null;

        existing.UserName = request.UserName ?? existing.UserName;
        existing.UserPassword = request.UserPassword ?? existing.UserPassword;
        existing.FirstName = request.FirstName ?? existing.FirstName;
        existing.LastName = request.LastName ?? existing.LastName;
        existing.EmailAddress = request.EmailAddress ?? existing.EmailAddress;
        existing.DesignationId = request.DesignationId != Guid.Empty ? request.DesignationId : existing.DesignationId;
        existing.UserRoleId = request.UserRoleId ?? existing.UserRoleId;
        existing.IsSuperUser = request.IsSuperUser ?? existing.IsSuperUser;
        existing.CompanyId = request.CompanyId ?? existing.CompanyId;
        existing.SchoolId = request.SchoolId ?? existing.SchoolId;
        existing.IsActive = request.IsActive;
        existing.ModifiedBy = Guid.NewGuid();
        existing.ModifiedDate = DateTime.UtcNow;
        existing.Status = "Updated";
        existing.StatusMessage = "User updated successfully";

        var updated = await _repository.UpdateAsync(existing);
        return MapToResponse(updated);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity == null || entity.IsDeleted)
            return false;

        await _repository.DeleteAsync(id);
        return true;
    }

    private static UserResponse MapToResponse(User entity)
    {
        return new UserResponse
        {
            Id = entity.Id,
            UserName = entity.UserName,
            FirstName = entity.FirstName,
            LastName = entity.LastName,
            EmailAddress = entity.EmailAddress,
            DesignationId = entity.DesignationId,
            UserRoleId = entity.UserRoleId,
            IsSuperUser = entity.IsSuperUser,
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
