using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class EmployeeSalaryMasterService : IEmployeeSalaryMasterService
{
    private readonly IEmployeeSalaryMasterRepository _repository;

    public EmployeeSalaryMasterService(IEmployeeSalaryMasterRepository repository)
    {
        _repository = repository;
    }

    public async Task<EmployeeSalaryMasterResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<EmployeeSalaryMasterResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<EmployeeSalaryMasterResponse?> GetByEmployeeIdAsync(Guid employeeId)
    {
        var entities = await _repository.GetAllAsync();
        var entity = entities.FirstOrDefault(e => e.EmployeeId == employeeId && !e.IsDeleted);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<EmployeeSalaryMasterResponse> CreateAsync(EmployeeSalaryMasterRequest request)
    {
        var entity = new EmployeeSalaryMaster
        {
            Id = Guid.NewGuid(),
            EmployeeId = request.EmployeeId,
            Month = request.Month,
            Year = request.Year,
            SessionId = request.SessionId,
            BatchPrintDate = request.BatchPrintDate,
            BasicSalary = request.BasicSalary,
            Allowance = request.Allowance,
            Deductions = request.Deductions,
            NetSalary = request.NetSalary,
            TotalWorkingDays = request.TotalWorkingDays,
            PresentDays = request.PresentDays,
            AbsentDays = request.AbsentDays,
            LeaveDays = request.LeaveDays,
            LeaveDescription = request.LeaveDescription,
            LeaveBalanceDescription = request.LeaveBalanceDescription,
            SalaryPerDay = request.SalaryPerDay,
            DepartmentId = request.DepartmentId,
            DesignationId = request.DesignationId,
            GradeId = request.GradeId,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Employee salary master created successfully"
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<EmployeeSalaryMasterResponse?> UpdateAsync(Guid id, EmployeeSalaryMasterRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.EmployeeId = request.EmployeeId != Guid.Empty ? request.EmployeeId : existingEntity.EmployeeId;
        existingEntity.Month = request.Month != 0 ? request.Month : existingEntity.Month;
        existingEntity.Year = request.Year != 0 ? request.Year : existingEntity.Year;
        existingEntity.SessionId = request.SessionId != Guid.Empty ? request.SessionId : existingEntity.SessionId;
        existingEntity.BatchPrintDate = request.BatchPrintDate != default ? request.BatchPrintDate : existingEntity.BatchPrintDate;
        existingEntity.BasicSalary = request.BasicSalary ?? existingEntity.BasicSalary;
        existingEntity.Allowance = request.Allowance ?? existingEntity.Allowance;
        existingEntity.Deductions = request.Deductions ?? existingEntity.Deductions;
        existingEntity.NetSalary = request.NetSalary ?? existingEntity.NetSalary;
        existingEntity.TotalWorkingDays = request.TotalWorkingDays != 0 ? request.TotalWorkingDays : existingEntity.TotalWorkingDays;
        existingEntity.PresentDays = request.PresentDays ?? existingEntity.PresentDays;
        existingEntity.AbsentDays = request.AbsentDays ?? existingEntity.AbsentDays;
        existingEntity.LeaveDays = request.LeaveDays ?? existingEntity.LeaveDays;
        existingEntity.LeaveDescription = request.LeaveDescription ?? existingEntity.LeaveDescription;
        existingEntity.LeaveBalanceDescription = request.LeaveBalanceDescription ?? existingEntity.LeaveBalanceDescription;
        existingEntity.SalaryPerDay = request.SalaryPerDay ?? existingEntity.SalaryPerDay;
        existingEntity.DepartmentId = request.DepartmentId != Guid.Empty ? request.DepartmentId : existingEntity.DepartmentId;
        existingEntity.DesignationId = request.DesignationId != Guid.Empty ? request.DesignationId : existingEntity.DesignationId;
        existingEntity.GradeId = request.GradeId != Guid.Empty ? request.GradeId : existingEntity.GradeId;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Employee salary master updated successfully";

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

    private static EmployeeSalaryMasterResponse MapToResponse(EmployeeSalaryMaster entity)
    {
        return new EmployeeSalaryMasterResponse
        {
            Id = entity.Id,
            EmployeeId = entity.EmployeeId,
            Month = entity.Month,
            Year = entity.Year,
            SessionId = entity.SessionId,
            BatchPrintDate = entity.BatchPrintDate,
            BasicSalary = entity.BasicSalary,
            Allowance = entity.Allowance,
            Deductions = entity.Deductions,
            NetSalary = entity.NetSalary,
            TotalWorkingDays = entity.TotalWorkingDays,
            PresentDays = entity.PresentDays,
            AbsentDays = entity.AbsentDays,
            LeaveDays = entity.LeaveDays,
            LeaveDescription = entity.LeaveDescription,
            LeaveBalanceDescription = entity.LeaveBalanceDescription,
            SalaryPerDay = entity.SalaryPerDay,
            DepartmentId = entity.DepartmentId,
            DesignationId = entity.DesignationId,
            GradeId = entity.GradeId,
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
