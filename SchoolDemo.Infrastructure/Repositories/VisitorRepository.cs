using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class VisitorRepository : IVisitorRepository
{
    private readonly SchoolDbContext _context;

    public VisitorRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.VisitorMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.VisitorMasters
            .FirstOrDefaultAsync(v => v.Id == id && !v.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.VisitorMaster>> GetAllAsync()
    {
        var entities = await _context.VisitorMasters
            .Where(v => !v.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.VisitorMaster> AddAsync(SchoolDemo.Domain.Entities.VisitorMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.VisitorMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.VisitorMaster> UpdateAsync(SchoolDemo.Domain.Entities.VisitorMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.VisitorMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.VisitorMasters
            .FirstOrDefaultAsync(v => v.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.VisitorMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.VisitorMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.VisitorMaster
        {
            Id = entity.Id,
            VehicleNumber = entity.VehicleNumber,
            VehicleName = entity.VehicleName,
            DateOfEntry = entity.DateOfEntry,
            ArrivalTime = entity.ArrivalTime,
            ExitTime = entity.ExitTime,
            Purpose = entity.Purpose,
            ContactPerson = entity.ContactPerson,
            Address1 = entity.Address1,
            Address2 = entity.Address2,
            CityId = entity.CityId,
            StateId = entity.StateId,
            CountryId = entity.CountryId,
            ZipCode = entity.ZipCode,
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

    private static SchoolDemo.Infrastructure.Data.VisitorMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.VisitorMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.VisitorMaster
        {
            Id = entity.Id,
            VehicleNumber = entity.VehicleNumber,
            VehicleName = entity.VehicleName,
            DateOfEntry = entity.DateOfEntry,
            ArrivalTime = entity.ArrivalTime,
            ExitTime = entity.ExitTime,
            Purpose = entity.Purpose,
            ContactPerson = entity.ContactPerson,
            Address1 = entity.Address1,
            Address2 = entity.Address2,
            CityId = entity.CityId,
            StateId = entity.StateId,
            CountryId = entity.CountryId,
            ZipCode = entity.ZipCode,
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
