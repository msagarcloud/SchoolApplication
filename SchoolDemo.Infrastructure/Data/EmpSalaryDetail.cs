using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class EmpSalaryDetail
{
    public Guid Id { get; set; }

    public Guid EmployeeId { get; set; }

    public Guid SalaryHeadMasterId { get; set; }

    public Guid DesignationGradeId { get; set; }

    public decimal? Value { get; set; }

    public Guid SalaryTypeId { get; set; }

    public bool IdDeduction { get; set; }

    public Guid SalaryCodeId { get; set; }

    public string? SalaryDescription { get; set; }

    public decimal? Amount { get; set; }

    public bool IsSalaryHead { get; set; }

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

    public virtual DesignationGrade DesignationGrade { get; set; } = null!;

    public virtual EmpMaster Employee { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SalaryCode SalaryCode { get; set; } = null!;

    public virtual SalaryHeadMaster SalaryHeadMaster { get; set; } = null!;

    public virtual SalaryType SalaryType { get; set; } = null!;

    public virtual SchoolMaster School { get; set; } = null!;
}
