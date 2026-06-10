using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class VehicleService : IVehicleService
{
    private readonly IVehicleRepository _repository;

    public VehicleService(IVehicleRepository repository)
    {
        _repository = repository;
    }

    public async Task<VehicleResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<VehicleResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<VehicleResponse> CreateAsync(VehicleRequest request)
    {
        var entity = new SchoolDemo.Domain.Entities.VehicleMaster
        {
            Id = Guid.NewGuid(),
            VehicleNumber = request.VehicleNumber,
            VehicleModel = request.VehicleModel,
            VehicleMake = request.VehicleMake,
            VehicleTypeId = request.VehicleTypeId,
            RegistrationNumber = request.RegistrationNumber,
            InsuranceCompany = request.InsuranceCompany,
            InsurancePremium = request.InsurancePremium,
            SeatingCapacity = request.SeatingCapacity,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Vehicle created successfully"
        };

        var CreatedEntity = await _repository.AddAsync(entity);
        return MapToResponse(CreatedEntity);
    }

    public async Task<VehicleResponse?> UpdateAsync(Guid id, VehicleRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.VehicleNumber = request.VehicleNumber ?? existingEntity.VehicleNumber;
        existingEntity.VehicleModel = request.VehicleModel ?? existingEntity.VehicleModel;
        existingEntity.VehicleMake = request.VehicleMake ?? existingEntity.VehicleMake;
        existingEntity.VehicleTypeId = request.VehicleTypeId != Guid.Empty ? request.VehicleTypeId : existingEntity.VehicleTypeId;
        existingEntity.RegistrationNumber = request.RegistrationNumber ?? existingEntity.RegistrationNumber;
        existingEntity.InsuranceCompany = request.InsuranceCompany ?? existingEntity.InsuranceCompany;
        existingEntity.InsurancePremium = request.InsurancePremium ?? existingEntity.InsurancePremium;
        existingEntity.SeatingCapacity = request.SeatingCapacity ?? existingEntity.SeatingCapacity;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Vehicle updated successfully";

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

    private static VehicleResponse MapToResponse(SchoolDemo.Domain.Entities.VehicleMaster entity)
    {
        return new VehicleResponse
        {
            Id = entity.Id,
            VehicleNumber = entity.VehicleNumber,
            VehicleModel = entity.VehicleModel,
            VehicleMake = entity.VehicleMake,
            VehicleTypeId = entity.VehicleTypeId,
            RegistrationNumber = entity.RegistrationNumber,
            InsuranceCompany = entity.InsuranceCompany,
            InsurancePremium = entity.InsurancePremium,
            SeatingCapacity = entity.SeatingCapacity,
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
