using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class CompanyService : ICompanyService
{
    private readonly ICompanyRepository _companyRepository;

    public CompanyService(ICompanyRepository companyRepository)
    {
        _companyRepository = companyRepository;
    }

    public async Task<CompanyResponse?> GetByIdAsync(Guid id)
    {
        var company = await _companyRepository.GetByIdAsync(id);
        return company == null ? null : MapToResponse(company);
    }

    public async Task<IEnumerable<CompanyResponse>> GetAllAsync()
    {
        var companies = await _companyRepository.GetAllAsync();
        return companies.Select(MapToResponse);
    }

    public async Task<CompanyResponse> CreateAsync(CompanyRequest request)
    {
        var company = new Company
        {
            Id = Guid.NewGuid(),
            CompanyName = request.CompanyName,
            Description = request.Description,
            Address = request.Address,
            CityId = request.CityId,
            StateId = request.StateId,
            CountryId = request.CountryId,
            ZipCode = request.ZipCode,
            Email = request.Email,
            EstablishmentYear = request.EstablishmentYear,
            JudistrictionArea = request.JudistrictionArea,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(), // In real app, get from current user
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Company created successfully"
        };

        var createdCompany = await _companyRepository.AddAsync(company);
        return MapToResponse(createdCompany);
    }

    public async Task<CompanyResponse?> UpdateAsync(Guid id, CompanyRequest request)
    {
        var existingCompany = await _companyRepository.GetByIdAsync(id);
        if (existingCompany == null || existingCompany.IsDeleted)
        {
            return null;
        }

        existingCompany.CompanyName = request.CompanyName ?? existingCompany.CompanyName;
        existingCompany.Description = request.Description ?? existingCompany.Description;
        existingCompany.Address = request.Address ?? existingCompany.Address;
        existingCompany.CityId = request.CityId != Guid.Empty ? request.CityId : existingCompany.CityId;
        existingCompany.StateId = request.StateId != Guid.Empty ? request.StateId : existingCompany.StateId;
        existingCompany.CountryId = request.CountryId != Guid.Empty ? request.CountryId : existingCompany.CountryId;
        existingCompany.ZipCode = request.ZipCode ?? existingCompany.ZipCode;
        existingCompany.Email = request.Email ?? existingCompany.Email;
        existingCompany.EstablishmentYear = request.EstablishmentYear ?? existingCompany.EstablishmentYear;
        existingCompany.JudistrictionArea = request.JudistrictionArea != Guid.Empty ? request.JudistrictionArea : existingCompany.JudistrictionArea;
        existingCompany.ModifiedBy = Guid.NewGuid(); // In real app, get from current user
        existingCompany.ModifiedDate = DateTime.UtcNow;
        existingCompany.Status = "Updated";
        existingCompany.StatusMessage = "Company updated successfully";

        var updatedCompany = await _companyRepository.UpdateAsync(existingCompany);
        return MapToResponse(updatedCompany);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var company = await _companyRepository.GetByIdAsync(id);
        if (company == null || company.IsDeleted)
        {
            return false;
        }

        await _companyRepository.DeleteAsync(id);
        return true;
    }

    private static CompanyResponse MapToResponse(Company company)
    {
        return new CompanyResponse
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
            CreatedDate = company.CreatedDate,
            ModifiedDate = company.ModifiedDate,
            EstablishmentYear = company.EstablishmentYear,
            JudistrictionArea = company.JudistrictionArea,
            Status = company.Status,
            StatusMessage = company.StatusMessage
        };
    }
}
