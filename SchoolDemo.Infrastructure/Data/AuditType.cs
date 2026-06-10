using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class AuditType
{
    public int Id { get; set; }

    public string Category { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string Name { get; set; } = null!;

    public Guid? SchoolId { get; set; }

    public Guid? CompanyId { get; set; }

    public virtual CompanyMaster? Company { get; set; }

    public virtual SchoolMaster? School { get; set; }
}
