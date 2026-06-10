using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class VisitorService : IVisitorService
{
    private readonly IVisitorRepository _repository;

    public VisitorService(IVisitorRepository repository)
    {
        _repository = repository;
    }

    public async Task<VisitorResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<VisitorResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<VisitorResponse> CreateAsync(VisitorRequest request)
    {
        var entity = new SchoolDemo.Domain.Entities.VisitorMaster
        {
            Id = Guid.NewGuid(),
            VehicleNumber = request.VehicleNumber,
            VehicleName = request.VehicleName,
            DateOfEntry = request.DateOfEntry,
            ArrivalTime = request.ArrivalTime,
            ExitTime = request.ExitTime,
            Purpose = request.Purpose,
            ContactPerson = request.ContactPerson,
            Address1 = request.Address1,
            Address2 = request.Address2,
            CityId = request.CityId,
            StateId = request.StateId,
            CountryId = request.CountryId,
            ZipCode = request.ZipCode,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Visitor created successfully"
        };

        var CreatedEntity = await _repository.AddAsync(entity);
        return MapToResponse(CreatedEntity);
    }

    public async Task<VisitorResponse?> UpdateAsync(Guid id, VisitorRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.VehicleNumber = request.VehicleNumber ?? existingEntity.VehicleNumber;
        existingEntity.VehicleName = request.VehicleName ?? existingEntity.VehicleName;
        existingEntity.DateOfEntry = request.DateOfEntry != default ? request.DateOfEntry : existingEntity.DateOfEntry;
        existingEntity.ArrivalTime = request.ArrivalTime != default ? request.ArrivalTime : existingEntity.ArrivalTime;
        existingEntity.ExitTime = request.ExitTime != default ? request.ExitTime : existingEntity.ExitTime;
        existingEntity.Purpose = request.Purpose ?? existingEntity.Purpose;
        existingEntity.ContactPerson = request.ContactPerson ?? existingEntity.ContactPerson;
        existingEntity.Address1 = request.Address1 ?? existingEntity.Address1;
        existingEntity.Address2 = request.Address2 ?? existingEntity.Address2;
        existingEntity.CityId = request.CityId != Guid.Empty ? request.CityId : existingEntity.CityId;
        existingEntity.StateId = request.StateId != Guid.Empty ? request.StateId : existingEntity.StateId;
        existingEntity.CountryId = request.CountryId != Guid.Empty ? request.CountryId : existingEntity.CountryId;
        existingEntity.ZipCode = request.ZipCode ?? existingEntity.ZipCode;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Visitor updated successfully";

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

    private static VisitorResponse MapToResponse(SchoolDemo.Domain.Entities.VisitorMaster entity)
    {
        return new VisitorResponse
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
            CreatedDate = entity.CreatedDate,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage
        };
    }
}
