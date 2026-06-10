using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class RoleRepository : IRoleRepository
{
    private readonly SchoolDbContext _context;

    public RoleRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.RoleMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.RoleMasters
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.RoleMaster>> GetAllAsync()
    {
        var entities = await _context.RoleMasters
            .Where(r => !r.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.RoleMaster>> GetByCompanyAndSchoolAsync(Guid companyId, Guid schoolId)
    {
        var entities = await _context.RoleMasters
            .Where(r => !r.IsDeleted && r.CompanyId == companyId && r.SchoolId == schoolId)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.RoleMaster> AddAsync(SchoolDemo.Domain.Entities.RoleMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.RoleMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.RoleMaster> UpdateAsync(SchoolDemo.Domain.Entities.RoleMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.RoleMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.RoleMasters
            .FirstOrDefaultAsync(r => r.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.RoleMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.RoleMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.RoleMaster
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            CompanyId = entity.CompanyId,
            SchoolId = entity.SchoolId,
            IsActive = entity.IsActive,
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage
        };
    }

    private static SchoolDemo.Infrastructure.Data.RoleMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.RoleMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.RoleMaster
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            CompanyId = entity.CompanyId,
            SchoolId = entity.SchoolId,
            IsActive = entity.IsActive,
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage
        };
    }
}
