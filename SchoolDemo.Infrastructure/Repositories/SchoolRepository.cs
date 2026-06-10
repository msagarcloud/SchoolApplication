using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class SchoolRepository : ISchoolRepository
{
    private readonly SchoolDbContext _context;

    public SchoolRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<School?> GetByIdAsync(Guid id)
    {
        var schoolDetail = await _context.SchoolMasters
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted);
        
        return MapToDomainEntity(schoolDetail);
    }

    public async Task<IEnumerable<School>> GetAllAsync()
    {
        var schoolDetails = await _context.SchoolMasters
            .Where(s => !s.IsDeleted)
            .ToListAsync();
        
        return schoolDetails.Select(MapToDomainEntity).Where(s => s != null)!;
    }

    public async Task<School> AddAsync(School school)
    {
        var schoolDetail = MapToInfrastructureEntity(school);
        await _context.SchoolMasters.AddAsync(schoolDetail);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(schoolDetail)!;
    }

    public async Task<School> UpdateAsync(School school)
    {
        var schoolDetail = MapToInfrastructureEntity(school);
        _context.SchoolMasters.Update(schoolDetail);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(schoolDetail)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var schoolDetail = await _context.SchoolMasters
            .FirstOrDefaultAsync(s => s.Id == id);
        
        if (schoolDetail != null)
        {
            schoolDetail.IsDeleted = true;
            schoolDetail.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static School? MapToDomainEntity(SchoolMaster? schoolDetail)
    {
        if (schoolDetail == null) return null;

        return new School
        {
            Id = schoolDetail.Id,
            Name = schoolDetail.Name,
            Description = schoolDetail.Description,
            Email = schoolDetail.Email,
            Address1 = schoolDetail.Address1,
            Address2 = schoolDetail.Address2,
            CityId = schoolDetail.CityId,
            StateId = schoolDetail.StateId,
            CountryId = schoolDetail.CountryId,
            ZipCode = schoolDetail.ZipCode,
            Phone = schoolDetail.Phone,
            EstablishmentYear = schoolDetail.EstablishmentYear,
            Mobile = schoolDetail.Mobile,
            JudistrictionCityId = schoolDetail.JudistrictionCityId,
            JudistrictionStateId = schoolDetail.JudistrictionStateId,
            JudistrictionCountryId = schoolDetail.JudistrictionCountryId,
            BankName = schoolDetail.BankName,
            BankAddress1 = schoolDetail.BankAddress1,
            BankAddress2 = schoolDetail.BankAddress2,
            BankCityId = schoolDetail.BankCityId,
            BankStateId = schoolDetail.BankStateId,
            BankCountryId = schoolDetail.BankCountryId,
            BankZipCode = schoolDetail.BankZipCode,
            AccountNumber = schoolDetail.AccountNumber,
            IsActive = schoolDetail.IsActive,
            IsDeleted = schoolDetail.IsDeleted,
            CompanyId = schoolDetail.CompanyId,
            CreatedBy = schoolDetail.CreatedBy,
            CreatedDate = schoolDetail.CreatedDate,
            ModifiedBy = schoolDetail.ModifiedBy,
            ModifiedDate = schoolDetail.ModifiedDate,
            Status = schoolDetail.Status,
            StatusMessage = schoolDetail.StatusMessage
        };
    }

    private static SchoolMaster MapToInfrastructureEntity(School school)
    {
        return new SchoolMaster
        {
            Id = school.Id,
            Name = school.Name,
            Description = school.Description,
            Email = school.Email,
            Address1 = school.Address1,
            Address2 = school.Address2,
            CityId = school.CityId,
            StateId = school.StateId,
            CountryId = school.CountryId,
            ZipCode = school.ZipCode,
            Phone = school.Phone,
            EstablishmentYear = school.EstablishmentYear,
            Mobile = school.Mobile,
            JudistrictionCityId = school.JudistrictionCityId,
            JudistrictionStateId = school.JudistrictionStateId,
            JudistrictionCountryId = school.JudistrictionCountryId,
            BankName = school.BankName,
            BankAddress1 = school.BankAddress1,
            BankAddress2 = school.BankAddress2,
            BankCityId = school.BankCityId,
            BankStateId = school.BankStateId,
            BankCountryId = school.BankCountryId,
            BankZipCode = school.BankZipCode,
            AccountNumber = school.AccountNumber,
            IsActive = school.IsActive,
            IsDeleted = school.IsDeleted,
            CompanyId = school.CompanyId,
            CreatedBy = school.CreatedBy,
            CreatedDate = school.CreatedDate,
            ModifiedBy = school.ModifiedBy,
            ModifiedDate = school.ModifiedDate,
            Status = school.Status,
            StatusMessage = school.StatusMessage
        };
    }
}
