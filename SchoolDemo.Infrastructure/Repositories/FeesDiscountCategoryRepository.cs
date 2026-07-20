using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class FeesDiscountCategoryRepository : IFeesDiscountCategoryRepository
{
    private readonly SchoolDbContext _context;

    public FeesDiscountCategoryRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.FeesDiscountCategoryMasters
            .FirstOrDefaultAsync(f => f.Id == id && !f.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster>> GetAllAsync()
    {
        var entities = await _context.FeesDiscountCategoryMasters
            .Where(f => !f.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster> AddAsync(SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        infraEntity.CreatedBy = await ResolveUserAsync(entity.CreatedBy, entity.CompanyId, entity.SchoolId);
        if (entity.ModifiedBy.HasValue && entity.ModifiedBy.Value != Guid.Empty)
        {
            infraEntity.ModifiedBy = await ResolveUserAsync(entity.ModifiedBy.Value, entity.CompanyId, entity.SchoolId);
        }
        await _context.FeesDiscountCategoryMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

public async Task<SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster> UpdateAsync(SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        infraEntity.CreatedBy = await ResolveUserAsync(entity.CreatedBy, entity.CompanyId, entity.SchoolId);
        if (entity.ModifiedBy.HasValue && entity.ModifiedBy.Value != Guid.Empty)
        {
            infraEntity.ModifiedBy = await ResolveUserAsync(entity.ModifiedBy.Value, entity.CompanyId, entity.SchoolId);
        }

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.FeesDiscountCategoryMasters.Local.FirstOrDefault(e => e.Id == infraEntity.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.FeesDiscountCategoryMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.FeesDiscountCategoryMasters
            .FirstOrDefaultAsync(f => f.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.FeesDiscountCategoryMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            FeeCategoryId = entity.FeeCategoryId,
            IsPercentAge = entity.IsPercentAge,
            Amount = entity.Amount,
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

    private static SchoolDemo.Infrastructure.Data.FeesDiscountCategoryMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.FeesDiscountCategoryMaster
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            FeeCategoryId = entity.FeeCategoryId,
            IsPercentAge = entity.IsPercentAge,
            Amount = entity.Amount,
            CompanyId = entity.CompanyId,
            SchoolId = entity.SchoolId,
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

    private async Task<Guid> ResolveUserAsync(Guid requestedUserId, Guid companyId, Guid schoolId)
    {
        if (requestedUserId != Guid.Empty)
        {
            var exists = await _context.UserDetails
                .AsNoTracking()
                .AnyAsync(u => u.Id == requestedUserId && !u.IsDeleted);
            if (exists)
                return requestedUserId;
        }

        var query = _context.UserDetails
            .AsNoTracking()
            .Where(u => u.IsActive && !u.IsDeleted);

        if (schoolId != Guid.Empty)
            query = query.Where(u => u.SchoolId == schoolId);
        if (companyId != Guid.Empty)
            query = query.Where(u => u.CompanyId == companyId);

        var resolved = await query.Select(u => u.Id).FirstOrDefaultAsync();
        if (resolved != Guid.Empty)
            return resolved;

        var fallback = await _context.UserDetails
            .AsNoTracking()
            .Where(u => u.IsActive && !u.IsDeleted)
            .Select(u => u.Id)
            .FirstOrDefaultAsync();

        if (fallback == Guid.Empty)
            throw new InvalidOperationException("No valid user found. Please log in again.");

        return fallback;
    }
}
