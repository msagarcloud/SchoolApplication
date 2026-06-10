using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class SalaryTypeRepository : ISalaryTypeRepository
{
    private readonly SchoolDbContext _context;

    public SalaryTypeRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.SalaryTypeMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.SalaryTypeMasters
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.SalaryTypeMaster>> GetAllAsync()
    {
        var entities = await _context.SalaryTypeMasters
            .Where(s => !s.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.SalaryTypeMaster> AddAsync(SchoolDemo.Domain.Entities.SalaryTypeMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.SalaryTypeMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.SalaryTypeMaster> UpdateAsync(SchoolDemo.Domain.Entities.SalaryTypeMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.SalaryTypeMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.SalaryTypeMasters
            .FirstOrDefaultAsync(s => s.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.SalaryTypeMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.SalaryTypeMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.SalaryTypeMaster
        {
            Id = entity.Id,
            Name = entity.Name,
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

    private static SchoolDemo.Infrastructure.Data.SalaryTypeMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.SalaryTypeMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.SalaryTypeMaster
        {
            Id = entity.Id,
            Name = entity.Name,
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
}
