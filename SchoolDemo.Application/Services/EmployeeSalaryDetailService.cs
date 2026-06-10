using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class EmployeeSalaryDetailService : IEmployeeSalaryDetailService
{
    private readonly IEmployeeSalaryDetailRepository _repository;

    public EmployeeSalaryDetailService(IEmployeeSalaryDetailRepository repository)
    {
        _repository = repository;
    }

    public async Task<EmployeeSalaryDetailResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<EmployeeSalaryDetailResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<EmployeeSalaryDetailResponse> CreateAsync(EmployeeSalaryDetailRequest request)
    {
        var entity = new EmployeeSalaryDetail
        {
            Id = Guid.NewGuid(),
            EmployeeId = request.EmployeeId,
            SalaryHeadMasterId = request.SalaryHeadMasterId,
            DesignationGradeId = request.DesignationGradeId,
            Value = request.Value,
            SalaryTypeId = request.SalaryTypeId,
            IdDeduction = request.IdDeduction,
            SalaryCodeId = request.SalaryCodeId,
            SalaryDescription = request.SalaryDescription,
            Amount = request.Amount,
            IsSalaryHead = request.IsSalaryHead,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Employee salary detail created successfully"
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<EmployeeSalaryDetailResponse?> UpdateAsync(Guid id, EmployeeSalaryDetailRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.EmployeeId = request.EmployeeId != Guid.Empty ? request.EmployeeId : existingEntity.EmployeeId;
        existingEntity.SalaryHeadMasterId = request.SalaryHeadMasterId != Guid.Empty ? request.SalaryHeadMasterId : existingEntity.SalaryHeadMasterId;
        existingEntity.DesignationGradeId = request.DesignationGradeId != Guid.Empty ? request.DesignationGradeId : existingEntity.DesignationGradeId;
        existingEntity.Value = request.Value ?? existingEntity.Value;
        existingEntity.SalaryTypeId = request.SalaryTypeId != Guid.Empty ? request.SalaryTypeId : existingEntity.SalaryTypeId;
        existingEntity.IdDeduction = request.IdDeduction;
        existingEntity.SalaryCodeId = request.SalaryCodeId != Guid.Empty ? request.SalaryCodeId : existingEntity.SalaryCodeId;
        existingEntity.SalaryDescription = request.SalaryDescription ?? existingEntity.SalaryDescription;
        existingEntity.Amount = request.Amount ?? existingEntity.Amount;
        existingEntity.IsSalaryHead = request.IsSalaryHead;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Employee salary detail updated successfully";

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

    private static EmployeeSalaryDetailResponse MapToResponse(EmployeeSalaryDetail entity)
    {
        return new EmployeeSalaryDetailResponse
        {
            Id = entity.Id,
            EmployeeId = entity.EmployeeId,
            SalaryHeadMasterId = entity.SalaryHeadMasterId,
            DesignationGradeId = entity.DesignationGradeId,
            Value = entity.Value,
            SalaryTypeId = entity.SalaryTypeId,
            IdDeduction = entity.IdDeduction,
            SalaryCodeId = entity.SalaryCodeId,
            SalaryDescription = entity.SalaryDescription,
            Amount = entity.Amount,
            IsSalaryHead = entity.IsSalaryHead,
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
