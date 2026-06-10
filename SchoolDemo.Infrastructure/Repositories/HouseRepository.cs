using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class HouseRepository : IHouseRepository
{
    private readonly SchoolDbContext _context;

    public HouseRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.HouseMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.HouseMasters
            .FirstOrDefaultAsync(h => h.Id == id && !(h.IsDeleted ?? false));
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.HouseMaster>> GetAllAsync()
    {
        var entities = await _context.HouseMasters
            .Where(h => !(h.IsDeleted ?? false))
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.HouseMaster> AddAsync(SchoolDemo.Domain.Entities.HouseMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.HouseMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.HouseMaster> UpdateAsync(SchoolDemo.Domain.Entities.HouseMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.HouseMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.HouseMasters
            .FirstOrDefaultAsync(h => h.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.HouseMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.HouseMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.HouseMaster
        {
            Id = entity.Id,
            House = entity.House,
            IsActive = entity.IsActive ?? false,
            IsDeleted = entity.IsDeleted ?? false,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate ?? DateTime.UtcNow,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            SchoolId = entity.SchoolId,
            CompanyId = entity.CompanyId,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage
        };
    }

    private static SchoolDemo.Infrastructure.Data.HouseMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.HouseMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.HouseMaster
        {
            Id = entity.Id,
            House = entity.House,
            IsActive = entity.IsActive,
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            SchoolId = entity.SchoolId,
            CompanyId = entity.CompanyId,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage
        };
    }
}
