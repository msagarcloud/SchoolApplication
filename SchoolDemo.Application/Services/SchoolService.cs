using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class SchoolService : ISchoolService
{
    private readonly ISchoolRepository _schoolRepository;

    public SchoolService(ISchoolRepository schoolRepository)
    {
        _schoolRepository = schoolRepository;
    }

    public async Task<SchoolResponse?> GetByIdAsync(Guid id)
    {
        var school = await _schoolRepository.GetByIdAsync(id);
        return school == null ? null : MapToResponse(school);
    }

    public async Task<IEnumerable<SchoolResponse>> GetAllAsync()
    {
        var schools = await _schoolRepository.GetAllAsync();
        return schools.Select(MapToResponse);
    }

    public async Task<SchoolResponse> CreateAsync(SchoolRequest request)
    {
        var school = new School
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            Email = request.Email,
            Address1 = request.Address1,
            Address2 = request.Address2,
            CityId = request.CityId,
            StateId = request.StateId,
            CountryId = request.CountryId,
            ZipCode = request.ZipCode,
            Phone = request.Phone,
            EstablishmentYear = request.EstablishmentYear,
            Mobile = request.Mobile,
            JudistrictionCityId = request.JudistrictionCityId,
            JudistrictionStateId = request.JudistrictionStateId,
            JudistrictionCountryId = request.JudistrictionCountryId,
            BankName = request.BankName,
            BankAddress1 = request.BankAddress1,
            BankAddress2 = request.BankAddress2,
            BankCityId = request.BankCityId,
            BankStateId = request.BankStateId,
            BankCountryId = request.BankCountryId,
            BankZipCode = request.BankZipCode,
            AccountNumber = request.AccountNumber,
            CompanyId = request.CompanyId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(), // In real app, get from current user
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "School created successfully"
        };

        var createdSchool = await _schoolRepository.AddAsync(school);
        return MapToResponse(createdSchool);
    }

    public async Task<SchoolResponse?> UpdateAsync(Guid id, SchoolRequest request)
    {
        var existingSchool = await _schoolRepository.GetByIdAsync(id);
        if (existingSchool == null || existingSchool.IsDeleted)
        {
            return null;
        }

        existingSchool.Name = request.Name ?? existingSchool.Name;
        existingSchool.Description = request.Description ?? existingSchool.Description;
        existingSchool.Email = request.Email ?? existingSchool.Email;
        existingSchool.Address1 = request.Address1 ?? existingSchool.Address1;
        existingSchool.Address2 = request.Address2 ?? existingSchool.Address2;
        existingSchool.CityId = request.CityId ?? existingSchool.CityId;
        existingSchool.StateId = request.StateId ?? existingSchool.StateId;
        existingSchool.CountryId = request.CountryId ?? existingSchool.CountryId;
        existingSchool.ZipCode = request.ZipCode ?? existingSchool.ZipCode;
        existingSchool.Phone = request.Phone ?? existingSchool.Phone;
        existingSchool.EstablishmentYear = request.EstablishmentYear ?? existingSchool.EstablishmentYear;
        existingSchool.Mobile = request.Mobile ?? existingSchool.Mobile;
        existingSchool.JudistrictionCityId = request.JudistrictionCityId ?? existingSchool.JudistrictionCityId;
        existingSchool.JudistrictionStateId = request.JudistrictionStateId ?? existingSchool.JudistrictionStateId;
        existingSchool.JudistrictionCountryId = request.JudistrictionCountryId ?? existingSchool.JudistrictionCountryId;
        existingSchool.BankName = request.BankName ?? existingSchool.BankName;
        existingSchool.BankAddress1 = request.BankAddress1 ?? existingSchool.BankAddress1;
        existingSchool.BankAddress2 = request.BankAddress2 ?? existingSchool.BankAddress2;
        existingSchool.BankCityId = request.BankCityId ?? existingSchool.BankCityId;
        existingSchool.BankStateId = request.BankStateId ?? existingSchool.BankStateId;
        existingSchool.BankCountryId = request.BankCountryId ?? existingSchool.BankCountryId;
        existingSchool.BankZipCode = request.BankZipCode ?? existingSchool.BankZipCode;
        existingSchool.AccountNumber = request.AccountNumber ?? existingSchool.AccountNumber;
        existingSchool.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingSchool.CompanyId;
        existingSchool.ModifiedBy = Guid.NewGuid(); // In real app, get from current user
        existingSchool.ModifiedDate = DateTime.UtcNow;
        existingSchool.Status = "Updated";
        existingSchool.StatusMessage = "School updated successfully";

        var updatedSchool = await _schoolRepository.UpdateAsync(existingSchool);
        return MapToResponse(updatedSchool);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var school = await _schoolRepository.GetByIdAsync(id);
        if (school == null || school.IsDeleted)
        {
            return false;
        }

        await _schoolRepository.DeleteAsync(id);
        return true;
    }

    private static SchoolResponse MapToResponse(School school)
    {
        return new SchoolResponse
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
            CreatedDate = school.CreatedDate,
            ModifiedDate = school.ModifiedDate,
            CompanyId = school.CompanyId,
            Status = school.Status,
            StatusMessage = school.StatusMessage
        };
    }
}
