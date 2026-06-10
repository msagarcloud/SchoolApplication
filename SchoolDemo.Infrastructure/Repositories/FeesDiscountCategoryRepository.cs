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
        await _context.FeesDiscountCategoryMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster> UpdateAsync(SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
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
}
