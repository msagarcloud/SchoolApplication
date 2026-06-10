using Microsoft.EntityFrameworkCore;
using DomainPrivilege = SchoolDemo.Domain.Entities.Privilege;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;
using PrivilegeEntity = SchoolDemo.Infrastructure.Data.Privilege;

namespace SchoolDemo.Infrastructure.Repositories;

public class PrivilegeRepository : IPrivilegeRepository
{
    private readonly SchoolDbContext _context;

    public PrivilegeRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<DomainPrivilege?> GetByIdAsync(Guid id)
    {
        var privilegeDetail = await _context.Privileges
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);
        
        return MapToDomainEntity(privilegeDetail);
    }

    public async Task<IEnumerable<DomainPrivilege>> GetAllAsync()
    {
        var privilegeDetails = await _context.Privileges
            .Where(p => !p.IsDeleted)
            .ToListAsync();
        
        return privilegeDetails.Select(MapToDomainEntity).Where(p => p != null)!;
    }

    public async Task<DomainPrivilege> AddAsync(DomainPrivilege privilege)
    {
        var privilegeDetail = MapToInfrastructureEntity(privilege);
        await _context.Privileges.AddAsync(privilegeDetail);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(privilegeDetail)!;
    }

    public async Task<DomainPrivilege> UpdateAsync(DomainPrivilege privilege)
    {
        var privilegeDetail = MapToInfrastructureEntity(privilege);
        _context.Privileges.Update(privilegeDetail);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(privilegeDetail)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var privilegeDetail = await _context.Privileges
            .FirstOrDefaultAsync(p => p.Id == id);
        
        if (privilegeDetail != null)
        {
            privilegeDetail.IsDeleted = true;
            privilegeDetail.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static DomainPrivilege? MapToDomainEntity(PrivilegeEntity? privilegeDetail)
    {
        if (privilegeDetail == null) return null;

        return new DomainPrivilege
        {
            Id = privilegeDetail.Id,
            PrivilegeName = privilegeDetail.PrivilegeName,
            IsActive = privilegeDetail.IsActive,
            IsDeleted = privilegeDetail.IsDeleted,
            Status = privilegeDetail.Status,
            StatusMessage = privilegeDetail.StatusMessage,
            PrivilegeParentId = privilegeDetail.PrivilegeParentId,
            CreatedBy = privilegeDetail.CreatedBy,
            CreatedDate = privilegeDetail.CreatedDate,
            ModifiedBy = privilegeDetail.ModifiedBy,
            ModifiedDate = privilegeDetail.ModifiedDate
        };
    }

    private static PrivilegeEntity MapToInfrastructureEntity(DomainPrivilege privilege)
    {
        return new PrivilegeEntity
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
