using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class RelationTypeRepository : IRelationTypeRepository
{
    private readonly SchoolDbContext _context;

    public RelationTypeRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.RelationTypeMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.RelationTypeMasters
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.RelationTypeMaster>> GetAllAsync()
    {
        var entities = await _context.RelationTypeMasters
            .Where(r => !r.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.RelationTypeMaster> AddAsync(SchoolDemo.Domain.Entities.RelationTypeMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.RelationTypeMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.RelationTypeMaster> UpdateAsync(SchoolDemo.Domain.Entities.RelationTypeMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.RelationTypeMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.RelationTypeMasters
            .FirstOrDefaultAsync(r => r.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.RelationTypeMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.RelationTypeMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.RelationTypeMaster
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

    private static SchoolDemo.Infrastructure.Data.RelationTypeMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.RelationTypeMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.RelationTypeMaster
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
