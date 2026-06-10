using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly SchoolDbContext _context;

    public CategoryRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.CategoryMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.CategoryMasters
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.CategoryMaster>> GetAllAsync()
    {
        var entities = await _context.CategoryMasters
            .Where(c => !c.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.CategoryMaster> AddAsync(SchoolDemo.Domain.Entities.CategoryMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.CategoryMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.CategoryMaster> UpdateAsync(SchoolDemo.Domain.Entities.CategoryMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.CategoryMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.CategoryMasters
            .FirstOrDefaultAsync(c => c.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.CategoryMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.CategoryMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.CategoryMaster
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

    private static SchoolDemo.Infrastructure.Data.CategoryMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.CategoryMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.CategoryMaster
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
