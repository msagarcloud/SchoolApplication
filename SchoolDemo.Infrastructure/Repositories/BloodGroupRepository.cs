using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class BloodGroupRepository : IBloodGroupRepository
{
    private readonly SchoolDbContext _context;

    public BloodGroupRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.BloodGroupMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.BloodGroupMasters
            .FirstOrDefaultAsync(b => b.Id == id && !b.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.BloodGroupMaster>> GetAllAsync()
    {
        var entities = await _context.BloodGroupMasters
            .Where(b => !b.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.BloodGroupMaster> AddAsync(SchoolDemo.Domain.Entities.BloodGroupMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.BloodGroupMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.BloodGroupMaster> UpdateAsync(SchoolDemo.Domain.Entities.BloodGroupMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.BloodGroupMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.BloodGroupMasters
            .FirstOrDefaultAsync(b => b.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.BloodGroupMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.BloodGroupMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.BloodGroupMaster
        {
            Id = entity.Id,
            Name = entity.Name,
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

    private static SchoolDemo.Infrastructure.Data.BloodGroupMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.BloodGroupMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.BloodGroupMaster
        {
            Id = entity.Id,
            Name = entity.Name,
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
