using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class VendorService : IVendorService
{
    private readonly IVendorRepository _repository;

    public VendorService(IVendorRepository repository)
    {
        _repository = repository;
    }

    public async Task<VendorResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<VendorResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<VendorResponse> CreateAsync(VendorRequest request)
    {
        // Use createdBy from request, fallback to empty GUID if not provided
        var createdBy = request.CreatedBy ?? Guid.Empty;
        if (createdBy == Guid.Empty)
        {
            Console.WriteLine("Warning: CreatedBy not provided in request, using empty GUID");
        }

        var entity = new SchoolDemo.Domain.Entities.VendorMaster
        {
            Id = Guid.NewGuid(),
            VendorName = request.VendorName,
            Description = request.Description,
            Address1 = request.Address1,
            Address2 = request.Address2,
            CityId = request.CityId,
            StateId = request.StateId,
            CountryId = request.CountryId,
            ZipCode = request.ZipCode,
            ContactNumber = request.ContactNumber,
            MobileNumber = request.MobileNumber,
            EmailId = request.EmailId,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = createdBy,
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Vendor created successfully"
        };

        var CreatedEntity = await _repository.AddAsync(entity);
        return MapToResponse(CreatedEntity);
    }

    public async Task<VendorResponse?> UpdateAsync(Guid id, VendorRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        // Use modifiedBy from request, fallback to existing CreatedBy if not provided
        var modifiedBy = request.ModifiedBy ?? existingEntity.CreatedBy;
        if (modifiedBy == Guid.Empty)
        {
            Console.WriteLine("Warning: ModifiedBy not provided in request, using existing CreatedBy");
        }

        existingEntity.VendorName = request.VendorName ?? existingEntity.VendorName;
        existingEntity.Description = request.Description ?? existingEntity.Description;
        existingEntity.Address1 = request.Address1 ?? existingEntity.Address1;
        existingEntity.Address2 = request.Address2 ?? existingEntity.Address2;
        existingEntity.CityId = request.CityId != Guid.Empty ? request.CityId : existingEntity.CityId;
        existingEntity.StateId = request.StateId != Guid.Empty ? request.StateId : existingEntity.StateId;
        existingEntity.CountryId = request.CountryId != Guid.Empty ? request.CountryId : existingEntity.CountryId;
        existingEntity.ZipCode = request.ZipCode ?? existingEntity.ZipCode;
        existingEntity.ContactNumber = request.ContactNumber ?? existingEntity.ContactNumber;
        existingEntity.MobileNumber = request.MobileNumber ?? existingEntity.MobileNumber;
        existingEntity.EmailId = request.EmailId ?? existingEntity.EmailId;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.ModifiedBy = modifiedBy;
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Vendor updated successfully";

        var updatedEntity = await _repository.UpdateAsync(existingEntity);
        return MapToResponse(updatedEntity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity == null || entity.IsDeleted)
        {
            return false;
        }

        await _repository.DeleteAsync(id);
        return true;
    }

    private static VendorResponse MapToResponse(VendorMaster entity)
    {
        return new VendorResponse
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
            CreatedDate = entity.CreatedDate,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage
        };
    }
}
