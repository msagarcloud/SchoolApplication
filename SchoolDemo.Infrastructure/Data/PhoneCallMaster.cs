using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class PhoneCallMaster
{
    public Guid Id { get; set; }

    public string? CallerName { get; set; }

    public string? CallerNumber { get; set; }

    public string? CallerEmail { get; set; }

    public string? CallPurpose { get; set; }

    public string? CallDescription { get; set; }

    public string Priority { get; set; } = null!;

    public string Status { get; set; } = null!;

    public string? StatusMessage { get; set; }

    public DateTime CallDate { get; set; }

    public TimeOnly CallTime { get; set; }

    public TimeOnly? CallDuration { get; set; }

    public string? Notes { get; set; }

    public string? HandledBy { get; set; }

    public string? ActionTaken { get; set; }

    public Guid? CompanyId { get; set; }

    public Guid? SchoolId { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public virtual CompanyMaster? Company { get; set; }

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SchoolMaster? School { get; set; }
}
