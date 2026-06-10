using Microsoft.EntityFrameworkCore;
using DomainRolePrivilege = SchoolDemo.Domain.Entities.RolePrivilege;
using DomainRoleMaster = SchoolDemo.Domain.Entities.RoleMaster;
using DomainPrivilege = SchoolDemo.Domain.Entities.Privilege;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;
using RolePrivilegeEntity = SchoolDemo.Infrastructure.Data.RolePrivilege;
using RoleMasterEntity = SchoolDemo.Infrastructure.Data.RoleMaster;
using PrivilegeEntity = SchoolDemo.Infrastructure.Data.Privilege;

namespace SchoolDemo.Infrastructure.Repositories;

public class RolePrivilegeRepository : IRolePrivilegeRepository
{
    private readonly SchoolDbContext _context;

    public RolePrivilegeRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<DomainRolePrivilege?> GetByIdAsync(Guid id)
    {
        var rolePrivilegeDetail = await _context.RolePrivileges
            .Include(rp => rp.Role)
            .Include(rp => rp.Privilege)
            .FirstOrDefaultAsync(rp => rp.Id == id && !rp.IsDeleted);
        
        return MapToDomainEntity(rolePrivilegeDetail);
    }

    public async Task<IEnumerable<DomainRolePrivilege>> GetAllAsync()
    {
        var rolePrivilegeDetails = await _context.RolePrivileges
            .Include(rp => rp.Role)
            .Include(rp => rp.Privilege)
            .Where(rp => !rp.IsDeleted)
            .ToListAsync();
        
        return rolePrivilegeDetails.Select(MapToDomainEntity).Where(rp => rp != null)!;
    }

    public async Task<DomainRolePrivilege> AddAsync(DomainRolePrivilege rolePrivilege)
    {
        var rolePrivilegeDetail = MapToInfrastructureEntity(rolePrivilege);
        await _context.RolePrivileges.AddAsync(rolePrivilegeDetail);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(rolePrivilegeDetail)!;
    }

    public async Task<DomainRolePrivilege> UpdateAsync(DomainRolePrivilege rolePrivilege)
    {
        var rolePrivilegeDetail = MapToInfrastructureEntity(rolePrivilege);
        _context.RolePrivileges.Update(rolePrivilegeDetail);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(rolePrivilegeDetail)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var rolePrivilegeDetail = await _context.RolePrivileges
            .FirstOrDefaultAsync(rp => rp.Id == id);
        
        if (rolePrivilegeDetail != null)
        {
            rolePrivilegeDetail.IsDeleted = true;
            rolePrivilegeDetail.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static DomainRolePrivilege? MapToDomainEntity(RolePrivilegeEntity? rolePrivilegeDetail)
    {
        if (rolePrivilegeDetail == null) return null;

        return new DomainRolePrivilege
        {
            Id = rolePrivilegeDetail.Id,
            RoleId = rolePrivilegeDetail.RoleId,
            PrivilegeId = rolePrivilegeDetail.PrivilegeId,
            IsActive = rolePrivilegeDetail.IsActive,
            IsDeleted = rolePrivilegeDetail.IsDeleted,
            Status = rolePrivilegeDetail.Status,
            StatusMessage = rolePrivilegeDetail.StatusMessage,
            CreatedBy = rolePrivilegeDetail.CreatedBy,
            CreatedDate = rolePrivilegeDetail.CreatedDate,
            ModifiedBy = rolePrivilegeDetail.ModifiedBy,
            ModifiedDate = rolePrivilegeDetail.ModifiedDate,
            Role = rolePrivilegeDetail.Role != null ? new DomainRoleMaster 
            {
                Id = rolePrivilegeDetail.Role.Id,
                Name = rolePrivilegeDetail.Role.Name,
                Description = rolePrivilegeDetail.Role.Description,
                CompanyId = rolePrivilegeDetail.Role.CompanyId,
                SchoolId = rolePrivilegeDetail.Role.SchoolId,
                IsActive = rolePrivilegeDetail.Role.IsActive,
                IsDeleted = rolePrivilegeDetail.Role.IsDeleted,
                CreatedBy = rolePrivilegeDetail.Role.CreatedBy,
                CreatedDate = rolePrivilegeDetail.Role.CreatedDate,
                ModifiedBy = rolePrivilegeDetail.Role.ModifiedBy,
                ModifiedDate = rolePrivilegeDetail.Role.ModifiedDate
            } : null,
            Privilege = rolePrivilegeDetail.Privilege != null ? new DomainPrivilege 
            {
                Id = rolePrivilegeDetail.Privilege.Id,
                PrivilegeName = rolePrivilegeDetail.Privilege.PrivilegeName,
                IsActive = rolePrivilegeDetail.Privilege.IsActive,
                IsDeleted = rolePrivilegeDetail.Privilege.IsDeleted,
                Status = rolePrivilegeDetail.Privilege.Status,
                StatusMessage = rolePrivilegeDetail.Privilege.StatusMessage,
                PrivilegeParentId = rolePrivilegeDetail.Privilege.PrivilegeParentId,
                CreatedBy = rolePrivilegeDetail.Privilege.CreatedBy,
                CreatedDate = rolePrivilegeDetail.Privilege.CreatedDate,
                ModifiedBy = rolePrivilegeDetail.Privilege.ModifiedBy,
                ModifiedDate = rolePrivilegeDetail.Privilege.ModifiedDate
            } : null
        };
    }

    private static RolePrivilegeEntity MapToInfrastructureEntity(DomainRolePrivilege rolePrivilege)
    {
        return new RolePrivilegeEntity
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
            ModifiedDate = rolePrivilege.ModifiedDate
        };
    }
}
