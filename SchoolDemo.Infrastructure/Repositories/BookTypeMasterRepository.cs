using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class BookTypeMasterRepository : IBookTypeMasterRepository
{
    private readonly SchoolDbContext _context;

    public BookTypeMasterRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.BookTypeMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.BookTypeMasters
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.BookTypeMaster>> GetAllAsync()
    {
        var entities = await _context.BookTypeMasters
            .Where(c => !c.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.BookTypeMaster> AddAsync(SchoolDemo.Domain.Entities.BookTypeMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.BookTypeMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.BookTypeMaster> UpdateAsync(SchoolDemo.Domain.Entities.BookTypeMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.BookTypeMasters.Local.FirstOrDefault(e => e.Id == infraEntity.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.BookTypeMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.BookTypeMasters
            .FirstOrDefaultAsync(c => c.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.BookTypeMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.BookTypeMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.BookTypeMaster
        {
            Id = entity.Id,
            Name = entity.Name,
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

    private static SchoolDemo.Infrastructure.Data.BookTypeMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.BookTypeMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.BookTypeMaster
        {
            Id = entity.Id,
            Name = entity.Name,
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
}
