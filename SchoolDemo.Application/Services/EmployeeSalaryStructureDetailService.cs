using SchoolDemo.Domain.DTOs;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class EmployeeSalaryStructureDetailService : IEmployeeSalaryStructureDetailService
{
    private readonly IEmployeeSalaryStructureDetailRepository _repository;

    public EmployeeSalaryStructureDetailService(IEmployeeSalaryStructureDetailRepository repository)
    {
        _repository = repository;
    }

    public async Task<EmployeeSalaryStructureDetailResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<EmployeeSalaryStructureDetailResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<IEnumerable<EmployeeSalaryStructureDetailResponse>> GetByEmployeeIdAsync(Guid employeeId)
    {
        var entities = await _repository.GetByEmployeeIdAsync(employeeId);
        return entities.Select(MapToResponse);
    }

    public async Task<EmployeeSalaryStructureDetailResponse> CreateAsync(EmployeeSalaryStructureDetailRequest request)
    {
        var entity = new EmployeeSalaryStructureDetail
        {
            Id = Guid.NewGuid(),
            EmployeeId = request.EmployeeId,
            DesignationGradeId = request.DesignationGradeId,
            Session = request.Session,
            Value = request.Value,
            SalaryTypeId = request.SalaryTypeId,
            IsDeductance = request.IsDeductance,
            SalaryCodeId = request.SalaryCodeId,
            Description = request.Description,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Employee salary structure detail created successfully"
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<EmployeeSalaryStructureDetailResponse?> UpdateAsync(Guid id, EmployeeSalaryStructureDetailRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.EmployeeId = request.EmployeeId != Guid.Empty ? request.EmployeeId : existingEntity.EmployeeId;
        existingEntity.DesignationGradeId = request.DesignationGradeId != Guid.Empty ? request.DesignationGradeId : existingEntity.DesignationGradeId;
        existingEntity.Session = request.Session != Guid.Empty ? request.Session : existingEntity.Session;
        existingEntity.Value = request.Value;
        existingEntity.SalaryTypeId = request.SalaryTypeId != Guid.Empty ? request.SalaryTypeId : existingEntity.SalaryTypeId;
        existingEntity.IsDeductance = request.IsDeductance;
        existingEntity.SalaryCodeId = request.SalaryCodeId != Guid.Empty ? request.SalaryCodeId : existingEntity.SalaryCodeId;
        existingEntity.Description = request.Description ?? existingEntity.Description;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Employee salary structure detail updated successfully";

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

    public async Task<IEnumerable<EmployeeSalaryStructureDetailResponse>> CalculateSalaryComponentsAsync(decimal basicSalary, Guid employeeId, Guid designationGradeId, Guid sessionId)
    {
        // Default salary components with their calculation rules
        var defaultComponents = new List<EmployeeSalaryStructureDetail>
        {
            new() { 
                Id = Guid.NewGuid(), 
                Name = "Basic Salary", 
                Value = basicSalary, 
                IsDeductance = false, 
                Percentage = 100, 
                IsFixed = true, 
                Type = "Earning",
                EmployeeId = employeeId,
                DesignationGradeId = designationGradeId,
                Session = sessionId,
                CompanyId = Guid.NewGuid(), // This should come from configuration
                SchoolId = Guid.NewGuid(), // This should come from configuration
                SalaryTypeId = Guid.NewGuid(), // This should come from lookup
                SalaryCodeId = Guid.NewGuid(), // This should come from lookup
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow,
                Status = "Active",
                StatusMessage = "Calculated component"
            },
            new() { 
                Id = Guid.NewGuid(), 
                Name = "HRA", 
                Value = Math.Round(basicSalary * 0.4m, 2), 
                IsDeductance = false, 
                Percentage = 40, 
                IsFixed = false, 
                Type = "Earning",
                EmployeeId = employeeId,
                DesignationGradeId = designationGradeId,
                Session = sessionId,
                CompanyId = Guid.NewGuid(),
                SchoolId = Guid.NewGuid(),
                SalaryTypeId = Guid.NewGuid(),
                SalaryCodeId = Guid.NewGuid(),
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow,
                Status = "Active",
                StatusMessage = "Calculated component"
            },
            new() { 
                Id = Guid.NewGuid(), 
                Name = "DA", 
                Value = Math.Round(basicSalary * 0.2m, 2), 
                IsDeductance = false, 
                Percentage = 20, 
                IsFixed = false, 
                Type = "Earning",
                EmployeeId = employeeId,
                DesignationGradeId = designationGradeId,
                Session = sessionId,
                CompanyId = Guid.NewGuid(),
                SchoolId = Guid.NewGuid(),
                SalaryTypeId = Guid.NewGuid(),
                SalaryCodeId = Guid.NewGuid(),
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow,
                Status = "Active",
                StatusMessage = "Calculated component"
            },
            new() { 
                Id = Guid.NewGuid(), 
                Name = "Conveyance", 
                Value = 1600, 
                IsDeductance = false, 
                Percentage = 0, 
                IsFixed = true, 
                Type = "Earning",
                EmployeeId = employeeId,
                DesignationGradeId = designationGradeId,
                Session = sessionId,
                CompanyId = Guid.NewGuid(),
                SchoolId = Guid.NewGuid(),
                SalaryTypeId = Guid.NewGuid(),
                SalaryCodeId = Guid.NewGuid(),
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow,
                Status = "Active",
                StatusMessage = "Calculated component"
            },
            new() { 
                Id = Guid.NewGuid(), 
                Name = "Medical Allowance", 
                Value = 1250, 
                IsDeductance = false, 
                Percentage = 0, 
                IsFixed = true, 
                Type = "Earning",
                EmployeeId = employeeId,
                DesignationGradeId = designationGradeId,
                Session = sessionId,
                CompanyId = Guid.NewGuid(),
                SchoolId = Guid.NewGuid(),
                SalaryTypeId = Guid.NewGuid(),
                SalaryCodeId = Guid.NewGuid(),
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow,
                Status = "Active",
                StatusMessage = "Calculated component"
            },
            new() { 
                Id = Guid.NewGuid(), 
                Name = "Special Allowance", 
                Value = Math.Round(basicSalary * 0.1m, 2), 
                IsDeductance = false, 
                Percentage = 10, 
                IsFixed = false, 
                Type = "Earning",
                EmployeeId = employeeId,
                DesignationGradeId = designationGradeId,
                Session = sessionId,
                CompanyId = Guid.NewGuid(),
                SchoolId = Guid.NewGuid(),
                SalaryTypeId = Guid.NewGuid(),
                SalaryCodeId = Guid.NewGuid(),
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow,
                Status = "Active",
                StatusMessage = "Calculated component"
            },
            new() { 
                Id = Guid.NewGuid(), 
                Name = "PF Deduction", 
                Value = Math.Round(basicSalary * 0.12m, 2), 
                IsDeductance = true, 
                Percentage = 12, 
                IsFixed = false, 
                Type = "Deduction",
                EmployeeId = employeeId,
                DesignationGradeId = designationGradeId,
                Session = sessionId,
                CompanyId = Guid.NewGuid(),
                SchoolId = Guid.NewGuid(),
                SalaryTypeId = Guid.NewGuid(),
                SalaryCodeId = Guid.NewGuid(),
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow,
                Status = "Active",
                StatusMessage = "Calculated component"
            },
            new() { 
                Id = Guid.NewGuid(), 
                Name = "ESI Deduction", 
                Value = Math.Round(basicSalary * 0.0075m, 2), 
                IsDeductance = true, 
                Percentage = 0.75m, 
                IsFixed = false, 
                Type = "Deduction",
                EmployeeId = employeeId,
                DesignationGradeId = designationGradeId,
                Session = sessionId,
                CompanyId = Guid.NewGuid(),
                SchoolId = Guid.NewGuid(),
                SalaryTypeId = Guid.NewGuid(),
                SalaryCodeId = Guid.NewGuid(),
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow,
                Status = "Active",
                StatusMessage = "Calculated component"
            },
            new() { 
                Id = Guid.NewGuid(), 
                Name = "Professional Tax", 
                Value = 200, 
                IsDeductance = true, 
                Percentage = 0, 
                IsFixed = true, 
                Type = "Deduction",
                EmployeeId = employeeId,
                DesignationGradeId = designationGradeId,
                Session = sessionId,
                CompanyId = Guid.NewGuid(),
                SchoolId = Guid.NewGuid(),
                SalaryTypeId = Guid.NewGuid(),
                SalaryCodeId = Guid.NewGuid(),
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow,
                Status = "Active",
                StatusMessage = "Calculated component"
            },
            new() { 
                Id = Guid.NewGuid(), 
                Name = "Income Tax", 
                Value = 0, 
                IsDeductance = true, 
                Percentage = 0, 
                IsFixed = false, 
                Type = "Deduction",
                EmployeeId = employeeId,
                DesignationGradeId = designationGradeId,
                Session = sessionId,
                CompanyId = Guid.NewGuid(),
                SchoolId = Guid.NewGuid(),
                SalaryTypeId = Guid.NewGuid(),
                SalaryCodeId = Guid.NewGuid(),
                IsActive = true,
                IsDeleted = false,
                CreatedBy = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow,
                Status = "Active",
                StatusMessage = "Calculated component"
            }
        };

        return defaultComponents.Select(MapToResponse);
    }

    private static EmployeeSalaryStructureDetailResponse MapToResponse(EmployeeSalaryStructureDetail entity)
    {
        return new EmployeeSalaryStructureDetailResponse
        {
            Id = entity.Id,
            EmployeeId = entity.EmployeeId,
            DesignationGradeId = entity.DesignationGradeId,
            Session = entity.Session,
            Value = entity.Value,
            SalaryTypeId = entity.SalaryTypeId,
            IsDeductance = entity.IsDeductance,
            SalaryCodeId = entity.SalaryCodeId,
            Description = entity.Description,
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
