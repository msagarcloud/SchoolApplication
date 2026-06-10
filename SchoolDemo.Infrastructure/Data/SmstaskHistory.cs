using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class SmstaskHistory
{
    public Guid Id { get; set; }

    public Guid TaskId { get; set; }

    public DateTime SentDate { get; set; }

    public Guid ReceiverId { get; set; }

    public string? NotificationReceiver { get; set; }

    public string? SendType { get; set; }

    public string? Status { get; set; }

    public Guid? StudentGuid { get; set; }

    public Guid ParentId { get; set; }

    public Guid TeacherId { get; set; }

    public string? EmailId { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Description { get; set; }

    public Guid CompanyId { get; set; }

    public Guid SchoolId { get; set; }

    public bool? IsReadOnly { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid ModifiedBy { get; set; }

    public DateTime ModifiedDate { get; set; }

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<SmstaskHistory> InverseSchool { get; set; } = new List<SmstaskHistory>();

    public virtual UserDetail ModifiedByNavigation { get; set; } = null!;

    public virtual ParentMaster Parent { get; set; } = null!;

    public virtual ParentMaster Receiver { get; set; } = null!;

    public virtual SmstaskHistory School { get; set; } = null!;

    public virtual SmstaskSchedule Task { get; set; } = null!;
}
