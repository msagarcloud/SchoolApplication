using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class Audit
{
    public Guid Id { get; set; }

    public string? FieldName { get; set; }

    public string? BeforeValue { get; set; }

    public string? AfterValue { get; set; }

    public string? Message { get; set; }

    public Guid ChangeUserId { get; set; }

    public DateTime ChangeDate { get; set; }

    public string? Note { get; set; }

    public string? DeviceName { get; set; }

    public Guid? SchoolId { get; set; }

    public Guid? CompanyId { get; set; }

    public virtual UserDetail ChangeUser { get; set; } = null!;

    public virtual CompanyMaster? Company { get; set; }

    public virtual SchoolMaster? School { get; set; }
}
