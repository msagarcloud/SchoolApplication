using DomainRolePrivilege = SchoolDemo.Domain.Entities.RolePrivilege;
using SchoolDemo.Domain.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace SchoolDemo.Application.Services;

public class RolePrivilegeService : IRolePrivilegeService
{
    private readonly IRolePrivilegeRepository _rolePrivilegeRepository;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public RolePrivilegeService(IRolePrivilegeRepository rolePrivilegeRepository, IHttpContextAccessor httpContextAccessor)
    {
        _rolePrivilegeRepository = rolePrivilegeRepository;
        _httpContextAccessor = httpContextAccessor;
    }

    private Guid? GetCurrentUserId()
    {
        var user = _httpContextAccessor.HttpContext?.User;
        if (user == null)
        {
            return null;
        }

        // Token currently includes "userId" claim; keep standard NameIdentifier fallback.
        var userId =
            user.FindFirst("userId")?.Value ??
            user.FindFirst(ClaimTypes.NameIdentifier)?.Value ??
            user.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

        return Guid.TryParse(userId, out var guid) ? guid : null;
    }

    public async Task<RolePrivilegeResponse?> GetByIdAsync(Guid id)
    {
        var rolePrivilege = await _rolePrivilegeRepository.GetByIdAsync(id);
        return rolePrivilege == null ? null : MapToResponse(rolePrivilege);
    }

    public async Task<IEnumerable<RolePrivilegeResponse>> GetAllAsync()
    {
        var rolePrivileges = await _rolePrivilegeRepository.GetAllAsync();
        return rolePrivileges.Select(MapToResponse);
    }

    public async Task<RolePrivilegeResponse> CreateAsync(RolePrivilegeRequest request)
    {
        if (request.RoleId == Guid.Empty || request.PrivilegeId == Guid.Empty)
        {
            throw new InvalidOperationException("Role and privilege are required.");
        }

        var existingMappings = await _rolePrivilegeRepository.GetAllAsync();
        var isDuplicate = existingMappings.Any(rp =>
            !rp.IsDeleted &&
            rp.RoleId == request.RoleId &&
            rp.PrivilegeId == request.PrivilegeId);

        if (isDuplicate)
        {
            throw new InvalidOperationException("This privilege is already assigned to the selected role.");
        }

        var currentUserId = GetCurrentUserId() ?? request.CreatedBy;
        if (!currentUserId.HasValue || currentUserId.Value == Guid.Empty)
        {
            throw new InvalidOperationException("Unable to identify the current user for audit fields.");
        }
        
        var rolePrivilege = new DomainRolePrivilege
        {
            Id = Guid.NewGuid(),
            RoleId = request.RoleId,
            PrivilegeId = request.PrivilegeId,
            IsActive = request.IsActive,
            IsDeleted = request.IsDeleted,
            Status = request.Status ?? "Active",
            StatusMessage = request.StatusMessage ?? "Role privilege created successfully",
            CreatedBy = currentUserId.Value,
            CreatedDate = DateTime.UtcNow
        };

        var createdRolePrivilege = await _rolePrivilegeRepository.AddAsync(rolePrivilege);
        return MapToResponse(createdRolePrivilege);
    }

    public async Task<RolePrivilegeResponse?> UpdateAsync(Guid id, RolePrivilegeRequest request)
    {
        var existingRolePrivilege = await _rolePrivilegeRepository.GetByIdAsync(id);
        if (existingRolePrivilege == null || existingRolePrivilege.IsDeleted)
        {
            return null;
        }

        var currentUserId = GetCurrentUserId();

        existingRolePrivilege.RoleId = request.RoleId != Guid.Empty ? request.RoleId : existingRolePrivilege.RoleId;
        existingRolePrivilege.PrivilegeId = request.PrivilegeId != Guid.Empty ? request.PrivilegeId : existingRolePrivilege.PrivilegeId;
        existingRolePrivilege.IsActive = request.IsActive;
        existingRolePrivilege.IsDeleted = request.IsDeleted;
        existingRolePrivilege.Status = request.Status ?? existingRolePrivilege.Status;
        existingRolePrivilege.StatusMessage = request.StatusMessage ?? existingRolePrivilege.StatusMessage;
        existingRolePrivilege.ModifiedBy = currentUserId; // Can be null if no current user
        existingRolePrivilege.ModifiedDate = DateTime.UtcNow;

        var updatedRolePrivilege = await _rolePrivilegeRepository.UpdateAsync(existingRolePrivilege);
        return MapToResponse(updatedRolePrivilege);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var rolePrivilege = await _rolePrivilegeRepository.GetByIdAsync(id);
        if (rolePrivilege == null || rolePrivilege.IsDeleted)
        {
            return false;
        }

        await _rolePrivilegeRepository.DeleteAsync(id);
        return true;
    }

    private static RolePrivilegeResponse MapToResponse(DomainRolePrivilege rolePrivilege)
    {
        return new RolePrivilegeResponse
        {
            Id = rolePrivilege.Id,
            RoleId = rolePrivilege.RoleId,
            PrivilegeId = rolePrivilege.PrivilegeId,
            IsActive = rolePrivilege.IsActive,
            IsDeleted = rolePrivilege.IsDeleted,
            Status = rolePrivilege.Status,
            StatusMessage = rolePrivilege.StatusMessage,
            CreatedBy = rolePrivilege.CreatedBy,
            CreatedDate = rolePrivilege.CreatedDate,
            ModifiedBy = rolePrivilege.ModifiedBy,
            ModifiedDate = rolePrivilege.ModifiedDate,
            RoleName = rolePrivilege.Role?.Name,
            PrivilegeName = rolePrivilege.Privilege?.PrivilegeName
        };
    }
}
