using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class GenderRepository : IGenderRepository
{
    private readonly SchoolDbContext _context;

    public GenderRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.GenderMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.GenderMasters
            .FirstOrDefaultAsync(g => g.Id == id && !(g.IsDeleted ?? false));
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.GenderMaster>> GetAllAsync()
    {
        var entities = await _context.GenderMasters
            .Where(g => !(g.IsDeleted ?? false))
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.GenderMaster> AddAsync(SchoolDemo.Domain.Entities.GenderMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.GenderMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.GenderMaster> UpdateAsync(SchoolDemo.Domain.Entities.GenderMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.GenderMasters.Local.FirstOrDefault(e => e.Id == infraEntity.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.GenderMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.GenderMasters
            .FirstOrDefaultAsync(g => g.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.GenderMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.GenderMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.GenderMaster
        {
            Id = entity.Id,
            Gender = entity.Gender,
            IsActive = entity.IsActive,
            IsDeleted = entity.IsDeleted ?? false,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate ?? DateTime.UtcNow,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage
        };
    }

    private static SchoolDemo.Infrastructure.Data.GenderMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.GenderMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.GenderMaster
        {
            Id = entity.Id,
            Gender = entity.Gender,
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
