using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class SmstaskSchedule
{
    public Guid Id { get; set; }

    public Guid TaskId { get; set; }

    public bool Sunday { get; set; }

    public bool Monday { get; set; }

    public bool Tuesday { get; set; }

    public bool Wednesday { get; set; }

    public bool Thursday { get; set; }

    public bool Friday { get; set; }

    public bool Saturday { get; set; }

    public DateTime? StartTime { get; set; }

    public Guid CompanyId { get; set; }

    public Guid SchoolId { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid ModifiedBy { get; set; }

    public DateTime ModifiedDate { get; set; }

    public string Status { get; set; } = null!;

    public string? StatusMessage { get; set; }

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual UserDetail ModifiedByNavigation { get; set; } = null!;

    public virtual ICollection<SmstaskHistory> SmstaskHistories { get; set; } = new List<SmstaskHistory>();

    public virtual ICollection<SmstaskSmtpDetail> SmstaskSmtpDetails { get; set; } = new List<SmstaskSmtpDetail>();
}
