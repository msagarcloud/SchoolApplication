using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class SalaryHeadService : ISalaryHeadService
{
    private readonly ISalaryHeadRepository _repository;

    public SalaryHeadService(ISalaryHeadRepository repository)
    {
        _repository = repository;
    }

    public async Task<SalaryHeadResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<SalaryHeadResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<SalaryHeadResponse> CreateAsync(SalaryHeadRequest request)
    {
        var entity = new SchoolDemo.Domain.Entities.SalaryHeadMaster
        {
            Id = Guid.NewGuid(),
            Code = request.Code,
            Description = request.Description,
            IsReadOnly = request.IsReadOnly,
            SalaryTypeId = request.SalaryTypeId,
            IsDeduction = request.IsDeduction,
            SchoolId = request.SchoolId,
            CompanyId = request.CompanyId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Salary head created successfully"
        };

        var CreatedEntity = await _repository.AddAsync(entity);
        return MapToResponse(CreatedEntity);
    }

    public async Task<SalaryHeadResponse?> UpdateAsync(Guid id, SalaryHeadRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.Code = request.Code ?? existingEntity.Code;
        existingEntity.Description = request.Description ?? existingEntity.Description;
        existingEntity.IsReadOnly = request.IsReadOnly ?? existingEntity.IsReadOnly;
        existingEntity.SalaryTypeId = request.SalaryTypeId != Guid.Empty ? request.SalaryTypeId : existingEntity.SalaryTypeId;
        existingEntity.IsDeduction = request.IsDeduction;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Salary head updated successfully";

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

    private static SalaryHeadResponse MapToResponse(SchoolDemo.Domain.Entities.SalaryHeadMaster entity)
    {
        return new SalaryHeadResponse
        {
            Id = entity.Id,
            Code = entity.Code,
            Description = entity.Description,
            IsReadOnly = entity.IsReadOnly,
            SalaryTypeId = entity.SalaryTypeId,
            IsDeduction = entity.IsDeduction,
            IsActive = entity.IsActive,
            CreatedDate = entity.CreatedDate,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status!,
            StatusMessage = entity.StatusMessage,
            SchoolId = entity.SchoolId,
            CompanyId = entity.CompanyId
        };
    }
}
