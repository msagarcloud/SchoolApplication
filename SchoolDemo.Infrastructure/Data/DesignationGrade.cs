using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class DesignationGrade
{
    public Guid Id { get; set; }

    public string? Grade { get; set; }

    public string? Details { get; set; }

    public bool? IsActive { get; set; }

    public bool? IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<EmpSalaryDetail> EmpSalaryDetails { get; set; } = new List<EmpSalaryDetail>();

    public virtual ICollection<EmpSalaryDetailsHistory> EmpSalaryDetailsHistories { get; set; } = new List<EmpSalaryDetailsHistory>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }
}
