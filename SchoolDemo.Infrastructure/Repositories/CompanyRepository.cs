using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class CompanyRepository : ICompanyRepository
{
    private readonly SchoolDbContext _context;

    public CompanyRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<Company?> GetByIdAsync(Guid id)
    {
        var companyDetail = await _context.CompanyMasters
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);
        
        return MapToDomainEntity(companyDetail);
    }

    public async Task<IEnumerable<Company>> GetAllAsync()
    {
        var companyDetails = await _context.CompanyMasters
            .Where(c => !c.IsDeleted)
            .ToListAsync();
        
        return companyDetails.Select(MapToDomainEntity).Where(c => c != null)!;
    }

    public async Task<Company> AddAsync(Company company)
    {
        var companyDetail = MapToInfrastructureEntity(company);
        await _context.CompanyMasters.AddAsync(companyDetail);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(companyDetail)!;
    }

    public async Task<Company> UpdateAsync(Company company)
    {
        var companyDetail = MapToInfrastructureEntity(company);
        _context.CompanyMasters.Update(companyDetail);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(companyDetail)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var companyDetail = await _context.CompanyMasters
            .FirstOrDefaultAsync(c => c.Id == id);
        
        if (companyDetail != null)
        {
            companyDetail.IsDeleted = true;
            companyDetail.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static Company? MapToDomainEntity(CompanyMaster? companyDetail)
    {
        if (companyDetail == null) return null;

        return new Company
        {
            Id = companyDetail.Id,
            CompanyName = companyDetail.CompanyName,
            Description = companyDetail.Description,
            Address = companyDetail.Address,
            CityId = companyDetail.CityId,
            StateId = companyDetail.StateId,
            CountryId = companyDetail.CountryId,
            ZipCode = companyDetail.ZipCode,
            Email = companyDetail.Email,
            IsActive = companyDetail.IsActive,
            IsDeleted = companyDetail.IsDeleted,
            CreatedBy = companyDetail.CreatedBy,
            CreatedDate = companyDetail.CreatedDate,
            ModifiedBy = companyDetail.ModifiedBy,
            ModifiedDate = companyDetail.ModifiedDate,
            EstablishmentYear = companyDetail.EstablishmentYear,
            JudistrictionArea = companyDetail.JudistrictionArea,
            Status = companyDetail.Status,
            StatusMessage = companyDetail.StatusMessage
        };
    }

    private static CompanyMaster MapToInfrastructureEntity(Company company)
    {
        return new CompanyMaster
        {
            Id = company.Id,
            CompanyName = company.CompanyName,
            Description = company.Description,
            Address = company.Address,
            CityId = company.CityId,
            StateId = company.StateId,
            CountryId = company.CountryId,
            ZipCode = company.ZipCode,
            Email = company.Email,
            IsActive = company.IsActive,
            IsDeleted = company.IsDeleted,
            CreatedBy = company.CreatedBy,
            CreatedDate = company.CreatedDate,
            ModifiedBy = company.ModifiedBy,
            ModifiedDate = company.ModifiedDate,
            EstablishmentYear = company.EstablishmentYear,
            JudistrictionArea = company.JudistrictionArea,
            Status = company.Status,
            StatusMessage = company.StatusMessage
        };
    }
}
