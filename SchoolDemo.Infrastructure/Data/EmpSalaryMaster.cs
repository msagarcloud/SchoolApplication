using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class EmpSalaryMaster
{
    public Guid Id { get; set; }

    public Guid EmployeeId { get; set; }

    public int Month { get; set; }

    public int Year { get; set; }

    public Guid SessionId { get; set; }

    public DateTime BatchPrintDate { get; set; }

    public decimal? BasicSalary { get; set; }

    public decimal? Allowance { get; set; }

    public decimal? Deductions { get; set; }

    public decimal? NetSalary { get; set; }

    public int TotalWorkingDays { get; set; }

    public decimal? PresentDays { get; set; }

    public decimal? AbsentDays { get; set; }

    public decimal? LeaveDays { get; set; }

    public string? LeaveDescription { get; set; }

    public string? LeaveBalanceDescription { get; set; }

    public decimal? SalaryPerDay { get; set; }

    public Guid DepartmentId { get; set; }

    public Guid DesignationId { get; set; }

    public Guid GradeId { get; set; }

    public Guid CompanyId { get; set; }

    public Guid SchoolId { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? Status { get; set; }

    public string? StatusMessage { get; set; }

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual DeptMaster Department { get; set; } = null!;

    public virtual DesigMaster Designation { get; set; } = null!;

    public virtual EmpMaster Employee { get; set; } = null!;

    public virtual DesigGradeDetail Grade { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual SessionMaster Session { get; set; } = null!;
}
