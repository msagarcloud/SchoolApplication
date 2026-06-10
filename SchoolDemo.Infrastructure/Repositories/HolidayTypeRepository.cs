using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class HolidayTypeRepository : IHolidayTypeRepository
{
    private readonly SchoolDbContext _context;

    public HolidayTypeRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.HolidayTypeMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.HolidayTypeMasters
            .FirstOrDefaultAsync(h => h.Id == id && !h.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.HolidayTypeMaster>> GetAllAsync()
    {
        var entities = await _context.HolidayTypeMasters
            .Where(h => !h.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.HolidayTypeMaster> AddAsync(SchoolDemo.Domain.Entities.HolidayTypeMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.HolidayTypeMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.HolidayTypeMaster> UpdateAsync(SchoolDemo.Domain.Entities.HolidayTypeMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.HolidayTypeMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.HolidayTypeMasters
            .FirstOrDefaultAsync(h => h.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.HolidayTypeMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.HolidayTypeMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.HolidayTypeMaster
        {
            Id = entity.Id,
            HolidayTypeName = entity.HolidayTypeName,
            HolidayTypeDescription = entity.HolidayTypeDescription,
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

    private static SchoolDemo.Infrastructure.Data.HolidayTypeMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.HolidayTypeMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.HolidayTypeMaster
        {
            Id = entity.Id,
            HolidayTypeName = entity.HolidayTypeName,
            HolidayTypeDescription = entity.HolidayTypeDescription,
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
