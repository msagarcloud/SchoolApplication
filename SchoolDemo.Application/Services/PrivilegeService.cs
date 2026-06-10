using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class PrivilegeService : IPrivilegeService
{
    private readonly IPrivilegeRepository _privilegeRepository;

    public PrivilegeService(IPrivilegeRepository privilegeRepository)
    {
        _privilegeRepository = privilegeRepository;
    }

    public async Task<PrivilegeResponse?> GetByIdAsync(Guid id)
    {
        var privilege = await _privilegeRepository.GetByIdAsync(id);
        return privilege == null ? null : MapToResponse(privilege);
    }

    public async Task<IEnumerable<PrivilegeResponse>> GetAllAsync()
    {
        var privileges = await _privilegeRepository.GetAllAsync();
        return privileges.Select(MapToResponse);
    }

    public async Task<PrivilegeResponse> CreateAsync(PrivilegeRequest request)
    {
        var privilege = new Privilege
        {
            Id = Guid.NewGuid(),
            PrivilegeName = request.PrivilegeName,
            IsActive = request.IsActive,
            IsDeleted = request.IsDeleted,
            Status = request.Status ?? "Active",
            StatusMessage = request.StatusMessage ?? "Privilege created successfully",
            PrivilegeParentId = request.PrivilegeParentId,
            CreatedBy = Guid.NewGuid(), // In real app, get from current user
            CreatedDate = DateTime.UtcNow
        };

        var createdPrivilege = await _privilegeRepository.AddAsync(privilege);
        return MapToResponse(createdPrivilege);
    }

    public async Task<PrivilegeResponse?> UpdateAsync(Guid id, PrivilegeRequest request)
    {
        var existingPrivilege = await _privilegeRepository.GetByIdAsync(id);
        if (existingPrivilege == null || existingPrivilege.IsDeleted)
        {
            return null;
        }

        existingPrivilege.PrivilegeName = request.PrivilegeName ?? existingPrivilege.PrivilegeName;
        existingPrivilege.IsActive = request.IsActive;
        existingPrivilege.IsDeleted = request.IsDeleted;
        existingPrivilege.Status = request.Status ?? existingPrivilege.Status;
        existingPrivilege.StatusMessage = request.StatusMessage ?? existingPrivilege.StatusMessage;
        existingPrivilege.PrivilegeParentId = request.PrivilegeParentId ?? existingPrivilege.PrivilegeParentId;
        existingPrivilege.ModifiedBy = Guid.NewGuid(); // In real app, get from current user
        existingPrivilege.ModifiedDate = DateTime.UtcNow;

        var updatedPrivilege = await _privilegeRepository.UpdateAsync(existingPrivilege);
        return MapToResponse(updatedPrivilege);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var privilege = await _privilegeRepository.GetByIdAsync(id);
        if (privilege == null || privilege.IsDeleted)
        {
            return false;
        }

        await _privilegeRepository.DeleteAsync(id);
        return true;
    }

    private static PrivilegeResponse MapToResponse(Privilege privilege)
    {
        return new PrivilegeResponse
        {
            Id = privilege.Id,
            PrivilegeName = privilege.PrivilegeName,
            IsActive = privilege.IsActive,
            IsDeleted = privilege.IsDeleted,
            Status = privilege.Status,
            StatusMessage = privilege.StatusMessage,
            PrivilegeParentId = privilege.PrivilegeParentId,
            CreatedBy = privilege.CreatedBy,
            CreatedDate = privilege.CreatedDate,
            ModifiedBy = privilege.ModifiedBy,
            ModifiedDate = privilege.ModifiedDate
        };
    }
}
