using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class SalaryHeadRepository : ISalaryHeadRepository
{
    private readonly SchoolDbContext _context;

    public SalaryHeadRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.SalaryHeadMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.SalaryHeadMasters
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.SalaryHeadMaster>> GetAllAsync()
    {
        var entities = await _context.SalaryHeadMasters
            .Where(s => !s.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.SalaryHeadMaster> AddAsync(SchoolDemo.Domain.Entities.SalaryHeadMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.SalaryHeadMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

public async Task<SchoolDemo.Domain.Entities.SalaryHeadMaster> UpdateAsync(SchoolDemo.Domain.Entities.SalaryHeadMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.SalaryHeadMasters.Local.FirstOrDefault(e => e.Id == infraEntity.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.SalaryHeadMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.SalaryHeadMasters
            .FirstOrDefaultAsync(s => s.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.SalaryHeadMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.SalaryHeadMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.SalaryHeadMaster
        {
            Id = entity.Id,
            Code = entity.Code,
            Description = entity.Description,
            IsReadOnly = entity.IsReadOnly,
            SalaryTypeId = entity.SalaryTypeId,
            IsDeduction = entity.IsDeduction,
            IsActive = entity.IsActive,
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage,
            SchoolId = entity.SchoolId,
            CompanyId = entity.CompanyId
        };
    }

    private static SchoolDemo.Infrastructure.Data.SalaryHeadMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.SalaryHeadMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.SalaryHeadMaster
        {
            Id = entity.Id,
            Code = entity.Code,
            Description = entity.Description,
            IsReadOnly = entity.IsReadOnly,
            SalaryTypeId = entity.SalaryTypeId,
            IsDeduction = entity.IsDeduction,
            IsActive = entity.IsActive,
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status!,
            StatusMessage = entity.StatusMessage,
            SchoolId = entity.SchoolId,
            CompanyId = entity.CompanyId
        };
    }
}
