using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class Error
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public DateTime Timestamp { get; set; }

    public Guid? ErrorTypeId { get; set; }

    public string? ActiveForm { get; set; }

    public string? Message { get; set; }

    public Guid CompanyId { get; set; }

    public Guid SchoolId { get; set; }

    public DateTime ServerTimeStamp { get; set; }

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual ICollection<ErrorDetail> ErrorDetails { get; set; } = new List<ErrorDetail>();

    public virtual ErrorType? ErrorType { get; set; }

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual UserDetail User { get; set; } = null!;
}
