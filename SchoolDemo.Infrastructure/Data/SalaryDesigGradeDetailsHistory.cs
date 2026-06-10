using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class SalaryDesigGradeDetailsHistory
{
    public Guid Id { get; set; }

    public Guid DesignationGradeId { get; set; }

    public decimal? Value { get; set; }

    public Guid? SessionId { get; set; }

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

    public virtual DesigGradeDetail DesignationGrade { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SchoolMaster? School { get; set; }

    public virtual SessionMaster? Session { get; set; }
}
