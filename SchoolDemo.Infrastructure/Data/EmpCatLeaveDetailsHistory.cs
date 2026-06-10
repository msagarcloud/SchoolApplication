using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class EmpCatLeaveDetailsHistory
{
    public Guid Id { get; set; }

    public Guid EmpCatLeaveCategoryId { get; set; }

    public Guid LeaveTypeId { get; set; }

    public decimal? TotalLeaves { get; set; }

    public Guid Session { get; set; }

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

    public virtual LeaveTypeMaster EmpCatLeaveCategory { get; set; } = null!;

    public virtual LeaveTypeMaster LeaveType { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual SessionMaster SessionNavigation { get; set; } = null!;
}
