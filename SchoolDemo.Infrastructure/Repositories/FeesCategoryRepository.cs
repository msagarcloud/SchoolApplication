using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class FeesCategoryRepository : IFeesCategoryRepository
{
    private readonly SchoolDbContext _context;

    public FeesCategoryRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.FeesCategoryMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.FeesCategoryMasters
            .FirstOrDefaultAsync(f => f.Id == id && !f.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.FeesCategoryMaster>> GetAllAsync()
    {
        var entities = await _context.FeesCategoryMasters
            .Where(f => !f.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.FeesCategoryMaster> AddAsync(SchoolDemo.Domain.Entities.FeesCategoryMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.FeesCategoryMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.FeesCategoryMaster> UpdateAsync(SchoolDemo.Domain.Entities.FeesCategoryMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.FeesCategoryMasters.Local.FirstOrDefault(e => e.Id == infraEntity.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.FeesCategoryMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.FeesCategoryMasters
            .FirstOrDefaultAsync(f => f.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.FeesCategoryMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.FeesCategoryMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.FeesCategoryMaster
        {
            Id = entity.Id,
            FeesCatgoryName = entity.FeesCatgoryName,
            Description = entity.Description,
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

    private static SchoolDemo.Infrastructure.Data.FeesCategoryMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.FeesCategoryMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.FeesCategoryMaster
        {
            Id = entity.Id,
            FeesCatgoryName = entity.FeesCatgoryName,
            Description = entity.Description,
            IsActive = entity.IsActive,
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status!,
            StatusMessage = entity.StatusMessage
        };
    }
}
