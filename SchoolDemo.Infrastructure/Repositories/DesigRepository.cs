using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class DesigRepository : IDesigRepository
{
    private readonly SchoolDbContext _context;

    public DesigRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.DesigMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.DesigMasters
            .FirstOrDefaultAsync(d => d.Id == id && !d.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.DesigMaster>> GetAllAsync()
    {
        var entities = await _context.DesigMasters
            .Where(d => !d.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.DesigMaster>> GetByDepartmentIdAsync(Guid departmentId)
    {
        // Use the junction table DeptDesigDetail to get designations by department
        var entities = await _context.DeptDesigDetails
            .Where(dd => dd.DepartmentId == departmentId && !dd.IsDeleted && dd.IsActive)
            .Select(dd => dd.Designation)
            .Where(d => !d.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.DesigMaster> AddAsync(SchoolDemo.Domain.Entities.DesigMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.DesigMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.DesigMaster> UpdateAsync(SchoolDemo.Domain.Entities.DesigMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.DesigMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.DesigMasters
            .FirstOrDefaultAsync(d => d.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.DesigMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.DesigMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.DesigMaster
        {
            Id = entity.Id,
            Code = entity.Code,
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

    private static SchoolDemo.Infrastructure.Data.DesigMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.DesigMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.DesigMaster
        {
            Id = entity.Id,
            Code = entity.Code,
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
