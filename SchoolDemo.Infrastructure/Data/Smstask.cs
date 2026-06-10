using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class Smstask
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public string? Desctiption { get; set; }

    public bool SendEmail { get; set; }

    public bool SendSms { get; set; }

    public Guid ReceiverId { get; set; }

    public string RepeatSchedule { get; set; } = null!;

    public bool StatusId { get; set; }

    public bool IsActive { get; set; }

    public Guid CompanyId { get; set; }

    public Guid SchoolId { get; set; }

    public bool? IsReadOnly { get; set; }

    public bool? LastRunStatusId { get; set; }

    public DateTime? LastRunDate { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid ModifiedBy { get; set; }

    public DateTime ModifiedDate { get; set; }

    public string Status { get; set; } = null!;

    public string? StatusMessage { get; set; }

    public virtual ICollection<ClassSmstasksDetail> ClassSmstasksDetails { get; set; } = new List<ClassSmstasksDetail>();

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual UserDetail ModifiedByNavigation { get; set; } = null!;

    public virtual SchoolMaster School { get; set; } = null!;
}
