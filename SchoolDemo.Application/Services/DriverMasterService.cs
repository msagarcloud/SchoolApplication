using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class DriverMasterService : IDriverMasterService
{
    private readonly IDriverMasterRepository _repository;

    public DriverMasterService(IDriverMasterRepository repository)
    {
        _repository = repository;
    }

    public async Task<DriverMaster?> GetByIdAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<DriverMaster>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<DriverMaster> CreateAsync(DriverMasterRequest request)
    {
        var entity = new DriverMaster
        {
            Id = Guid.NewGuid(),
            FirstName = request.FirstName,
            LastName = request.LastName,
            DateOfBirth = request.DateOfBirth,
            FathersName = request.FathersName,
            MothersName = request.MothersName,
            Address1 = request.Address1,
            Address2 = request.Address2,
            CityId = request.CityId,
            StateId = request.StateId,
            CountryId = request.CountryId,
            ZipCode = request.ZipCode,
            MobileNumber = request.MobileNumber,
            PhoneNumber = request.PhoneNumber,
            DriverImage = request.DriverImage,
            LicenceNumber = request.LicenceNumber,
            LicenceIssueDate = request.LicenceIssueDate,
            LicenceValidUptoDate = request.LicenceValidUptoDate,
            LicenceDescription = request.LicenceDescription,
            LicenceImage = request.LicenceImage,
            LicenceType = request.LicenceType,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            CreatedBy = request.CreatedBy,
            CreatedDate = DateTime.UtcNow,
            IsActive = true,
            IsDeleted = false,
            QualificationId = request.QualificationId
        };

        return await _repository.AddAsync(entity);
    }

    public async Task<DriverMaster?> UpdateAsync(Guid id, DriverMasterRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null)
            return null;

        existingEntity.FirstName = request.FirstName;
        existingEntity.LastName = request.LastName;
        existingEntity.DateOfBirth = request.DateOfBirth;
        existingEntity.FathersName = request.FathersName;
        existingEntity.MothersName = request.MothersName;
        existingEntity.Address1 = request.Address1;
        existingEntity.Address2 = request.Address2;
        existingEntity.CityId = request.CityId;
        existingEntity.StateId = request.StateId;
        existingEntity.CountryId = request.CountryId;
        existingEntity.ZipCode = request.ZipCode;
        existingEntity.MobileNumber = request.MobileNumber;
        existingEntity.PhoneNumber = request.PhoneNumber;
        existingEntity.DriverImage = request.DriverImage;
        existingEntity.LicenceNumber = request.LicenceNumber;
        existingEntity.LicenceIssueDate = request.LicenceIssueDate;
        existingEntity.LicenceValidUptoDate = request.LicenceValidUptoDate;
        existingEntity.LicenceDescription = request.LicenceDescription;
        existingEntity.LicenceImage = request.LicenceImage;
        existingEntity.LicenceType = request.LicenceType;
        existingEntity.QualificationId = request.QualificationId;
        existingEntity.ModifiedDate = DateTime.UtcNow;

        return await _repository.UpdateAsync(existingEntity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await _repository.DeleteAsync(id);
    }
}
