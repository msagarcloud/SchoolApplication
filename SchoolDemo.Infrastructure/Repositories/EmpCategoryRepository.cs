using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class EmpCategoryRepository : IEmpCategoryRepository
{
    private readonly SchoolDbContext _context;

    public EmpCategoryRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.EmpCategoryMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.EmpCategoryMasters
            .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.EmpCategoryMaster>> GetAllAsync()
    {
        var entities = await _context.EmpCategoryMasters
            .Where(e => !e.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.EmpCategoryMaster> AddAsync(SchoolDemo.Domain.Entities.EmpCategoryMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.EmpCategoryMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.EmpCategoryMaster> UpdateAsync(SchoolDemo.Domain.Entities.EmpCategoryMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.EmpCategoryMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.EmpCategoryMasters
            .FirstOrDefaultAsync(e => e.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.EmpCategoryMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.EmpCategoryMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.EmpCategoryMaster
        {
            Id = entity.Id,
            CategoryName = entity.CategoryName,
            CategoryDescription = entity.CategoryDescription,
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

    private static SchoolDemo.Infrastructure.Data.EmpCategoryMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.EmpCategoryMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.EmpCategoryMaster
        {
            Id = entity.Id,
            CategoryName = entity.CategoryName,
            CategoryDescription = entity.CategoryDescription,
            CompanyId = entity.CompanyId,
            SchoolId = entity.SchoolId,
            IsActive = entity.IsActive,
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status!,
            StatusMessage = entity.StatusMessage!
        };
    }
}
