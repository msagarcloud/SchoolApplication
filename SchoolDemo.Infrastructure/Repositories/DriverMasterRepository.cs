using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;
using InfraDriverMaster = SchoolDemo.Infrastructure.Data.DriverMaster;

namespace SchoolDemo.Infrastructure.Repositories;

public class DriverMasterRepository : IDriverMasterRepository
{
    private readonly SchoolDbContext _context;

    public DriverMasterRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.DriverMaster?> GetByIdAsync(Guid id)
    {
        var infraDriverMaster = await _context.DriverMasters
            .AsNoTracking()
            .FirstOrDefaultAsync(d => d.Id == id && !d.IsDeleted);
        if (infraDriverMaster == null) return null;
        
        return new SchoolDemo.Domain.Entities.DriverMaster
        {
            Id = infraDriverMaster.Id,
            FirstName = infraDriverMaster.FirstName,
            LastName = infraDriverMaster.LastName,
            DateOfBirth = infraDriverMaster.DateOfBirth,
            FathersName = infraDriverMaster.FathersName,
            MothersName = infraDriverMaster.MothersName,
            Address1 = infraDriverMaster.Address1,
            Address2 = infraDriverMaster.Address2,
            CityId = infraDriverMaster.CityId,
            StateId = infraDriverMaster.StateId,
            CountryId = infraDriverMaster.CountryId,
            ZipCode = infraDriverMaster.ZipCode,
            MobileNumber = infraDriverMaster.MobileNumber,
            PhoneNumber = infraDriverMaster.PhoneNumber,
            DriverImage = infraDriverMaster.DriverImage,
            LicenceNumber = infraDriverMaster.LicenceNumber,
            LicenceIssueDate = infraDriverMaster.LicenceIssueDate,
            LicenceValidUptoDate = infraDriverMaster.LicenceValidUptoDate,
            LicenceDescription = infraDriverMaster.LicenceDescription,
            LicenceImage = infraDriverMaster.LicenceImage,
            LicenceType = infraDriverMaster.LicenceType,
            CompanyId = infraDriverMaster.CompanyId,
            SchoolId = infraDriverMaster.SchoolId,
            IsActive = infraDriverMaster.IsActive,
            IsDeleted = infraDriverMaster.IsDeleted,
            CreatedBy = infraDriverMaster.CreatedBy,
            CreatedDate = infraDriverMaster.CreatedDate,
            ModifiedBy = infraDriverMaster.ModifiedBy,
            ModifiedDate = infraDriverMaster.ModifiedDate,
            Status = infraDriverMaster.Status,
            StatusMessage = infraDriverMaster.StatusMessage,
            QualificationId = infraDriverMaster.QualificationId
        };
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.DriverMaster>> GetAllAsync()
    {
        var infraDriverMasters = await _context.DriverMasters
            .AsNoTracking()
            .Where(d => !d.IsDeleted)
            .ToListAsync();
        return infraDriverMasters.Select(infra => new SchoolDemo.Domain.Entities.DriverMaster
        {
            Id = infra.Id,
            FirstName = infra.FirstName,
            LastName = infra.LastName,
            DateOfBirth = infra.DateOfBirth,
            FathersName = infra.FathersName,
            MothersName = infra.MothersName,
            Address1 = infra.Address1,
            Address2 = infra.Address2,
            CityId = infra.CityId,
            StateId = infra.StateId,
            CountryId = infra.CountryId,
            ZipCode = infra.ZipCode,
            MobileNumber = infra.MobileNumber,
            PhoneNumber = infra.PhoneNumber,
            DriverImage = infra.DriverImage,
            LicenceNumber = infra.LicenceNumber,
            LicenceIssueDate = infra.LicenceIssueDate,
            LicenceValidUptoDate = infra.LicenceValidUptoDate,
            LicenceDescription = infra.LicenceDescription,
            LicenceImage = infra.LicenceImage,
            LicenceType = infra.LicenceType,
            CompanyId = infra.CompanyId,
            SchoolId = infra.SchoolId,
            IsActive = infra.IsActive,
            IsDeleted = infra.IsDeleted,
            CreatedBy = infra.CreatedBy,
            CreatedDate = infra.CreatedDate,
            ModifiedBy = infra.ModifiedBy,
            ModifiedDate = infra.ModifiedDate,
            Status = infra.Status,
            StatusMessage = infra.StatusMessage,
            QualificationId = infra.QualificationId
        });
    }

    public async Task<SchoolDemo.Domain.Entities.DriverMaster> AddAsync(SchoolDemo.Domain.Entities.DriverMaster driverMaster)
    {
        // Map domain entity to infrastructure entity and save
        var infraDriverMaster = new InfraDriverMaster
        {
            Id = driverMaster.Id,
            FirstName = driverMaster.FirstName,
            LastName = driverMaster.LastName,
            DateOfBirth = driverMaster.DateOfBirth,
            FathersName = driverMaster.FathersName,
            MothersName = driverMaster.MothersName,
            Address1 = driverMaster.Address1,
            Address2 = driverMaster.Address2,
            CityId = driverMaster.CityId,
            StateId = driverMaster.StateId,
            CountryId = driverMaster.CountryId,
            ZipCode = driverMaster.ZipCode,
            MobileNumber = driverMaster.MobileNumber,
            PhoneNumber = driverMaster.PhoneNumber,
            DriverImage = driverMaster.DriverImage,
            LicenceNumber = driverMaster.LicenceNumber,
            LicenceIssueDate = driverMaster.LicenceIssueDate,
            LicenceValidUptoDate = driverMaster.LicenceValidUptoDate,
            LicenceDescription = driverMaster.LicenceDescription,
            LicenceImage = driverMaster.LicenceImage,
            LicenceType = driverMaster.LicenceType,
            CompanyId = driverMaster.CompanyId,
            SchoolId = driverMaster.SchoolId,
            IsActive = driverMaster.IsActive,
            IsDeleted = driverMaster.IsDeleted,
            CreatedBy = driverMaster.CreatedBy,
            CreatedDate = driverMaster.CreatedDate,
            ModifiedBy = driverMaster.ModifiedBy,
            ModifiedDate = driverMaster.ModifiedDate,
            Status = driverMaster.Status,
            StatusMessage = driverMaster.StatusMessage,
            QualificationId = driverMaster.QualificationId
        };
        
        await _context.DriverMasters.AddAsync(infraDriverMaster);
        await _context.SaveChangesAsync();
        return driverMaster;
    }

    public async Task<SchoolDemo.Domain.Entities.DriverMaster> UpdateAsync(SchoolDemo.Domain.Entities.DriverMaster driverMaster)
    {
        // Find existing infrastructure entity
        var infraDriverMaster = await _context.DriverMasters.FindAsync(driverMaster.Id);
        if (infraDriverMaster != null)
        {
            // Update properties
            infraDriverMaster.FirstName = driverMaster.FirstName;
            infraDriverMaster.LastName = driverMaster.LastName;
            infraDriverMaster.DateOfBirth = driverMaster.DateOfBirth;
            infraDriverMaster.FathersName = driverMaster.FathersName;
            infraDriverMaster.MothersName = driverMaster.MothersName;
            infraDriverMaster.Address1 = driverMaster.Address1;
            infraDriverMaster.Address2 = driverMaster.Address2;
            infraDriverMaster.CityId = driverMaster.CityId;
            infraDriverMaster.StateId = driverMaster.StateId;
            infraDriverMaster.CountryId = driverMaster.CountryId;
            infraDriverMaster.ZipCode = driverMaster.ZipCode;
            infraDriverMaster.MobileNumber = driverMaster.MobileNumber;
            infraDriverMaster.PhoneNumber = driverMaster.PhoneNumber;
            infraDriverMaster.DriverImage = driverMaster.DriverImage;
            infraDriverMaster.LicenceNumber = driverMaster.LicenceNumber;
            infraDriverMaster.LicenceIssueDate = driverMaster.LicenceIssueDate;
            infraDriverMaster.LicenceValidUptoDate = driverMaster.LicenceValidUptoDate;
            infraDriverMaster.LicenceDescription = driverMaster.LicenceDescription;
            infraDriverMaster.LicenceImage = driverMaster.LicenceImage;
            infraDriverMaster.LicenceType = driverMaster.LicenceType;
            infraDriverMaster.CompanyId = driverMaster.CompanyId;
            infraDriverMaster.SchoolId = driverMaster.SchoolId;
            infraDriverMaster.IsActive = driverMaster.IsActive;
            infraDriverMaster.IsDeleted = driverMaster.IsDeleted;
            infraDriverMaster.CreatedBy = driverMaster.CreatedBy;
            infraDriverMaster.CreatedDate = driverMaster.CreatedDate;
            infraDriverMaster.ModifiedBy = driverMaster.ModifiedBy;
            infraDriverMaster.ModifiedDate = driverMaster.ModifiedDate;
            infraDriverMaster.Status = driverMaster.Status;
            infraDriverMaster.StatusMessage = driverMaster.StatusMessage;
            infraDriverMaster.QualificationId = driverMaster.QualificationId;
            
            _context.DriverMasters.Update(infraDriverMaster);
            await _context.SaveChangesAsync();
        }
        return driverMaster;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var infraDriverMaster = await _context.DriverMasters.FindAsync(id);
        if (infraDriverMaster != null)
        {
            _context.DriverMasters.Remove(infraDriverMaster);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }
}
