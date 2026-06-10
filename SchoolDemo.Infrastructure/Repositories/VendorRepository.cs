using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class VendorRepository : IVendorRepository
{
    private readonly SchoolDbContext _context;

    public VendorRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.VendorMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.VendorMasters
            .FirstOrDefaultAsync(v => v.Id == id && !v.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.VendorMaster>> GetAllAsync()
    {
        var entities = await _context.VendorMasters
            .Where(v => !v.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.VendorMaster> AddAsync(SchoolDemo.Domain.Entities.VendorMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.VendorMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.VendorMaster> UpdateAsync(SchoolDemo.Domain.Entities.VendorMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.VendorMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.VendorMasters
            .FirstOrDefaultAsync(v => v.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.VendorMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.VendorMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.VendorMaster
        {
            Id = entity.Id,
            VendorName = entity.VendorName,
            Description = entity.Description,
            Address1 = entity.Address1,
            Address2 = entity.Address2,
            CityId = entity.CityId,
            StateId = entity.StateId,
            CountryId = entity.CountryId,
            ZipCode = entity.ZipCode,
            ContactNumber = entity.ContactNumber,
            MobileNumber = entity.MobileNumber,
            EmailId = entity.EmailId,
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

    private static SchoolDemo.Infrastructure.Data.VendorMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.VendorMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.VendorMaster
        {
            Id = entity.Id,
            VendorName = entity.VendorName,
            Description = entity.Description,
            Address1 = entity.Address1,
            Address2 = entity.Address2,
            CityId = entity.CityId,
            StateId = entity.StateId,
            CountryId = entity.CountryId,
            ZipCode = entity.ZipCode,
            ContactNumber = entity.ContactNumber,
            MobileNumber = entity.MobileNumber,
            EmailId = entity.EmailId,
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
