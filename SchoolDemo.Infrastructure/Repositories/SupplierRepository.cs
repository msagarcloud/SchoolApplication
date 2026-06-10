using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class SupplierRepository : ISupplierRepository
{
    private readonly SchoolDbContext _context;

    public SupplierRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<Supplier?> GetByIdAsync(Guid id)
    {
        var supplierDetail = await _context.SupplierMasters
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted);
        
        return MapToDomainEntity(supplierDetail);
    }

    public async Task<IEnumerable<Supplier>> GetAllAsync()
    {
        var supplierDetails = await _context.SupplierMasters
            .Where(s => !s.IsDeleted)
            .ToListAsync();
        
        return supplierDetails.Select(MapToDomainEntity).Where(s => s != null)!;
    }

    public async Task<Supplier> AddAsync(Supplier supplier)
    {
        var supplierDetail = MapToInfrastructureEntity(supplier);
        await _context.SupplierMasters.AddAsync(supplierDetail);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(supplierDetail)!;
    }

    public async Task<Supplier> UpdateAsync(Supplier supplier)
    {
        var supplierDetail = MapToInfrastructureEntity(supplier);
        _context.SupplierMasters.Update(supplierDetail);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(supplierDetail)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var supplierDetail = await _context.SupplierMasters
            .FirstOrDefaultAsync(s => s.Id == id);
        
        if (supplierDetail != null)
        {
            supplierDetail.IsDeleted = true;
            supplierDetail.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static Supplier? MapToDomainEntity(SupplierMaster? supplierDetail)
    {
        if (supplierDetail == null) return null;

        return new Supplier
        {
            Id = supplierDetail.Id,
            Name = supplierDetail.Name,
            Description = supplierDetail.Description,
            Address1 = supplierDetail.Address1,
            Address2 = supplierDetail.Address2,
            CityId = supplierDetail.CityId,
            StateId = supplierDetail.StateId,
            CountryId = supplierDetail.CountryId,
            ZipCode = supplierDetail.ZipCode,
            PhoneNumber = supplierDetail.PhonbeNumber, // Note: Fixing typo in original entity
            MobileNumber = supplierDetail.MobileNumber,
            EmailId = supplierDetail.EmailId,
            CompanyId = supplierDetail.CompanyId,
            SchoolId = supplierDetail.SchoolId,
            IsActive = supplierDetail.IsActive,
            IsDeleted = supplierDetail.IsDeleted,
            CreatedDate = supplierDetail.CreatedDate,
            ModifiedDate = supplierDetail.ModifiedDate,
            Status = supplierDetail.Status,
            StatusMessage = supplierDetail.StatusMessage
        };
    }

    private static SupplierMaster MapToInfrastructureEntity(Supplier supplier)
    {
        return new SupplierMaster
        {
            Id = supplier.Id,
            Name = supplier.Name,
            Description = supplier.Description,
            Address1 = supplier.Address1,
            Address2 = supplier.Address2,
            CityId = supplier.CityId,
            StateId = supplier.StateId,
            CountryId = supplier.CountryId,
            ZipCode = supplier.ZipCode,
            PhonbeNumber = supplier.PhoneNumber, // Note: Fixing typo in original entity
            MobileNumber = supplier.MobileNumber,
            EmailId = supplier.EmailId,
            CompanyId = supplier.CompanyId,
            SchoolId = supplier.SchoolId,
            IsActive = supplier.IsActive,
            IsDeleted = supplier.IsDeleted,
            CreatedDate = supplier.CreatedDate,
            ModifiedDate = supplier.ModifiedDate,
            Status = supplier.Status,
            StatusMessage = supplier.StatusMessage
        };
    }
}
