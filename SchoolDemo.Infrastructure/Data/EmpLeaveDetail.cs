using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class EmpLeaveDetail
{
    public Guid Id { get; set; }

    public Guid EmployeeId { get; set; }

    public Guid CategoryId { get; set; }

    public Guid LeaveTypeId { get; set; }

    public decimal? TotalLeaves { get; set; }

    public decimal? PreviousYearBalance { get; set; }

    public decimal? CurrentBalance { get; set; }

    public Guid SessionId { get; set; }

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

    public virtual EmpCategoryMaster Category { get; set; } = null!;

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual EmpMaster Employee { get; set; } = null!;

    public virtual LeaveTypeMaster LeaveType { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual SessionMaster Session { get; set; } = null!;
}
