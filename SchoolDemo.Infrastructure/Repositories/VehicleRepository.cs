using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class VehicleRepository : IVehicleRepository
{
    private readonly SchoolDbContext _context;

    public VehicleRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.VehicleMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.VehicleMasters
            .FirstOrDefaultAsync(v => v.Id == id && !v.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.VehicleMaster>> GetAllAsync()
    {
        var entities = await _context.VehicleMasters
            .Where(v => !v.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.VehicleMaster> AddAsync(SchoolDemo.Domain.Entities.VehicleMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.VehicleMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

public async Task<SchoolDemo.Domain.Entities.VehicleMaster> UpdateAsync(SchoolDemo.Domain.Entities.VehicleMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.VehicleMasters.Local.FirstOrDefault(e => e.Id == infraEntity.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.VehicleMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.VehicleMasters
            .FirstOrDefaultAsync(v => v.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.VehicleMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.VehicleMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.VehicleMaster
        {
            Id = entity.Id,
            VehicleNumber = entity.VehicleNumber,
            VehicleModel = entity.VehicleModel,
            VehicleMake = entity.VehicleMake,
            VehicleTypeId = entity.VehicleTypeId,
            RegistrationNumber = entity.RegistrationNumber,
            InsuranceCompany = entity.InsuranceCompany,
            InsurancePremium = entity.InsurancePremium,
            SeatingCapacity = entity.SeatingCapacity,
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

    private static SchoolDemo.Infrastructure.Data.VehicleMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.VehicleMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.VehicleMaster
        {
            Id = entity.Id,
            VehicleNumber = entity.VehicleNumber,
            VehicleModel = entity.VehicleModel,
            VehicleMake = entity.VehicleMake,
            VehicleTypeId = entity.VehicleTypeId,
            RegistrationNumber = entity.RegistrationNumber,
            InsuranceCompany = entity.InsuranceCompany,
            InsurancePremium = entity.InsurancePremium,
            SeatingCapacity = entity.SeatingCapacity,
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
