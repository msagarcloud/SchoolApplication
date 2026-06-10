using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class VehicleTypeRepository : IVehicleTypeRepository
{
    private readonly SchoolDbContext _context;

    public VehicleTypeRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.VehicleTypeMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.VehicleTypeMasters
            .FirstOrDefaultAsync(v => v.Id == id && !v.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.VehicleTypeMaster>> GetAllAsync()
    {
        var entities = await _context.VehicleTypeMasters
            .Where(v => !v.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.VehicleTypeMaster> AddAsync(SchoolDemo.Domain.Entities.VehicleTypeMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.VehicleTypeMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.VehicleTypeMaster> UpdateAsync(SchoolDemo.Domain.Entities.VehicleTypeMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.VehicleTypeMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.VehicleTypeMasters
            .FirstOrDefaultAsync(v => v.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.VehicleTypeMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.VehicleTypeMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.VehicleTypeMaster
        {
            Id = entity.Id,
            VehicleType = entity.VehicleType,
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

    private static SchoolDemo.Infrastructure.Data.VehicleTypeMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.VehicleTypeMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.VehicleTypeMaster
        {
            Id = entity.Id,
            VehicleType = entity.VehicleType,
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
