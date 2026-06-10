using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class SalaryType
{
    public Guid Id { get; set; }

    public string? Value { get; set; }

    public bool? IsActive { get; set; }

    public bool? IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public Guid? SchoolId { get; set; }

    public Guid? CompanyId { get; set; }

    public string Status { get; set; } = null!;

    public string? StatusMessage { get; set; }

    public virtual CompanyMaster? Company { get; set; }

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<EmpSalaryDetail> EmpSalaryDetails { get; set; } = new List<EmpSalaryDetail>();

    public virtual ICollection<EmpSalaryDetailsHistory> EmpSalaryDetailsHistories { get; set; } = new List<EmpSalaryDetailsHistory>();

    public virtual ICollection<EmpSalaryStructureDetail> EmpSalaryStructureDetails { get; set; } = new List<EmpSalaryStructureDetail>();

    public virtual ICollection<EmpSalaryStructureDetailsHistory> EmpSalaryStructureDetailsHistories { get; set; } = new List<EmpSalaryStructureDetailsHistory>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SchoolMaster? School { get; set; }
}
