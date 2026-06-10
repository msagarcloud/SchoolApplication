using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class SalaryHeadMaster
{
    public Guid Id { get; set; }

    public string? Code { get; set; }

    public string? Description { get; set; }

    public bool? IsReadOnly { get; set; }

    public Guid SalaryTypeId { get; set; }

    public bool IsDeduction { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string Status { get; set; } = null!;

    public string? StatusMessage { get; set; }

    public Guid? SchoolId { get; set; }

    public Guid? CompanyId { get; set; }

    public virtual CompanyMaster? Company { get; set; }

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<EmpSalaryDetail> EmpSalaryDetails { get; set; } = new List<EmpSalaryDetail>();

    public virtual ICollection<EmpSalaryDetailsHistory> EmpSalaryDetailsHistories { get; set; } = new List<EmpSalaryDetailsHistory>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SalaryTypeMaster SalaryType { get; set; } = null!;

    public virtual SchoolMaster? School { get; set; }
}
