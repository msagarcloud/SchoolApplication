using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class ReligionRepository : IReligionRepository
{
    private readonly SchoolDbContext _context;

    public ReligionRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.ReligionMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.ReligionMasters
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.ReligionMaster>> GetAllAsync()
    {
        var entities = await _context.ReligionMasters
            .Where(r => !r.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.ReligionMaster> AddAsync(SchoolDemo.Domain.Entities.ReligionMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.ReligionMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

public async Task<SchoolDemo.Domain.Entities.ReligionMaster> UpdateAsync(SchoolDemo.Domain.Entities.ReligionMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.ReligionMasters.Local.FirstOrDefault(e => e.Id == infraEntity.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.ReligionMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.ReligionMasters
            .FirstOrDefaultAsync(r => r.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.ReligionMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.ReligionMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.ReligionMaster
        {
            Id = entity.Id,
            ReligionName = entity.ReligionName,
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

    private static SchoolDemo.Infrastructure.Data.ReligionMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.ReligionMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.ReligionMaster
        {
            Id = entity.Id,
            ReligionName = entity.ReligionName,
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
