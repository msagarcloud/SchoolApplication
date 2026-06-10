using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class DriverQualificationDetail
{
    public Guid Id { get; set; }

    public Guid DriverId { get; set; }

    public Guid QualificationId { get; set; }

    public Guid SchoolId { get; set; }

    public Guid CompanyId { get; set; }

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

    public virtual DriverMaster Driver { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual QualificationMaster Qualification { get; set; } = null!;

    public virtual SchoolMaster School { get; set; } = null!;
}
