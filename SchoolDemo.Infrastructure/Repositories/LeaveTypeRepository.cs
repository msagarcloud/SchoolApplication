using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class LeaveTypeRepository : ILeaveTypeRepository
{
    private readonly SchoolDbContext _context;

    public LeaveTypeRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.LeaveTypeMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.LeaveTypeMasters
            .FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.LeaveTypeMaster>> GetAllAsync()
    {
        var entities = await _context.LeaveTypeMasters
            .Where(l => !l.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.LeaveTypeMaster> AddAsync(SchoolDemo.Domain.Entities.LeaveTypeMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.LeaveTypeMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.LeaveTypeMaster> UpdateAsync(SchoolDemo.Domain.Entities.LeaveTypeMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.LeaveTypeMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.LeaveTypeMasters
            .FirstOrDefaultAsync(l => l.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.LeaveTypeMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.LeaveTypeMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.LeaveTypeMaster
        {
            Id = entity.Id,
            Code = entity.Code,
            Description = entity.Description,
            ApplicableGender = entity.ApplicableGender,
            IsSpecialLeave = entity.IsSpecialLeave,
            IsEncashable = entity.IsEncashable,
            IsCarryForward = entity.IsCarryForward,
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

    private static SchoolDemo.Infrastructure.Data.LeaveTypeMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.LeaveTypeMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.LeaveTypeMaster
        {
            Id = entity.Id,
            Code = entity.Code,
            Description = entity.Description,
            ApplicableGender = entity.ApplicableGender,
            IsSpecialLeave = entity.IsSpecialLeave,
            IsEncashable = entity.IsEncashable,
            IsCarryForward = entity.IsCarryForward,
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
