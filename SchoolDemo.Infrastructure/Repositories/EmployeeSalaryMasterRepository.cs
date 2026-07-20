using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class EmployeeSalaryMasterRepository : IEmployeeSalaryMasterRepository
{
    private readonly SchoolDbContext _context;

    public EmployeeSalaryMasterRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<EmployeeSalaryMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.EmpSalaryMasters
            .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<EmployeeSalaryMaster>> GetAllAsync()
    {
        var entities = await _context.EmpSalaryMasters
            .Where(e => !e.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<EmployeeSalaryMaster> AddAsync(EmployeeSalaryMaster employeeSalaryMaster)
    {
        var entity = MapToInfrastructureEntity(employeeSalaryMaster);
        await _context.EmpSalaryMasters.AddAsync(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

public async Task<EmployeeSalaryMaster> UpdateAsync(EmployeeSalaryMaster employeeSalaryMaster)
    {
        var entity = MapToInfrastructureEntity(employeeSalaryMaster);

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.EmpSalaryMasters.Local.FirstOrDefault(e => e.Id == entity.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.EmpSalaryMasters.Update(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.EmpSalaryMasters
            .FirstOrDefaultAsync(e => e.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static EmployeeSalaryMaster? MapToDomainEntity(EmpSalaryMaster? entity)
    {
        if (entity == null) return null;
        return new EmployeeSalaryMaster
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
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage
        };
    }

    private static EmpSalaryMaster MapToInfrastructureEntity(EmployeeSalaryMaster employeeSalaryMaster)
    {
        return new EmpSalaryMaster
        {
            Id = employeeSalaryMaster.Id,
            EmployeeId = employeeSalaryMaster.EmployeeId,
            Month = employeeSalaryMaster.Month,
            Year = employeeSalaryMaster.Year,
            SessionId = employeeSalaryMaster.SessionId,
            BatchPrintDate = employeeSalaryMaster.BatchPrintDate,
            BasicSalary = employeeSalaryMaster.BasicSalary,
            Allowance = employeeSalaryMaster.Allowance,
            Deductions = employeeSalaryMaster.Deductions,
            NetSalary = employeeSalaryMaster.NetSalary,
            TotalWorkingDays = employeeSalaryMaster.TotalWorkingDays,
            PresentDays = employeeSalaryMaster.PresentDays,
            AbsentDays = employeeSalaryMaster.AbsentDays,
            LeaveDays = employeeSalaryMaster.LeaveDays,
            LeaveDescription = employeeSalaryMaster.LeaveDescription,
            LeaveBalanceDescription = employeeSalaryMaster.LeaveBalanceDescription,
            SalaryPerDay = employeeSalaryMaster.SalaryPerDay,
            DepartmentId = employeeSalaryMaster.DepartmentId,
            DesignationId = employeeSalaryMaster.DesignationId,
            GradeId = employeeSalaryMaster.GradeId,
            CompanyId = employeeSalaryMaster.CompanyId,
            SchoolId = employeeSalaryMaster.SchoolId,
            IsActive = employeeSalaryMaster.IsActive,
            IsDeleted = employeeSalaryMaster.IsDeleted,
            CreatedBy = employeeSalaryMaster.CreatedBy,
            CreatedDate = employeeSalaryMaster.CreatedDate,
            ModifiedBy = employeeSalaryMaster.ModifiedBy,
            ModifiedDate = employeeSalaryMaster.ModifiedDate,
            Status = employeeSalaryMaster.Status,
            StatusMessage = employeeSalaryMaster.StatusMessage
        };
    }
}
