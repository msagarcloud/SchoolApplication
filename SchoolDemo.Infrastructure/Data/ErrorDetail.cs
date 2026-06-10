using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class ErrorDetail
{
    public Guid Id { get; set; }

    public Guid ErrorId { get; set; }

    public string Details { get; set; } = null!;

    public Guid CompanyId { get; set; }

    public Guid SchoolId { get; set; }

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual Error Error { get; set; } = null!;

    public virtual SchoolMaster School { get; set; } = null!;
}
