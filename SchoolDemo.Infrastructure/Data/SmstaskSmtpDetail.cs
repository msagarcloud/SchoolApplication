using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class SmstaskSmtpDetail
{
    public Guid Id { get; set; }

    public string? FromAddress { get; set; }

    public string? GatewayName { get; set; }

    public string? UserName { get; set; }

    public string? Password { get; set; }

    public string? Subject { get; set; }

    public string? BodyText { get; set; }

    public Guid TaskId { get; set; }

    public bool? IsActive { get; set; }

    public bool? IsDeleted { get; set; }

    public string? MessageSubject { get; set; }

    public string? MessageBody { get; set; }

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

    public virtual ICollection<SmstaskSmtpDetail> InverseSchool { get; set; } = new List<SmstaskSmtpDetail>();

    public virtual UserDetail ModifiedByNavigation { get; set; } = null!;

    public virtual SmstaskSmtpDetail School { get; set; } = null!;

    public virtual SmstaskSchedule Task { get; set; } = null!;
}
