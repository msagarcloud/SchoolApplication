using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class SmstaskStatusMaster
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public bool? IsActive { get; set; }

    public bool? IsDeleted { get; set; }

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

    public virtual ICollection<SmstaskStatusMaster> InverseSchool { get; set; } = new List<SmstaskStatusMaster>();

    public virtual UserDetail ModifiedByNavigation { get; set; } = null!;

    public virtual SmstaskStatusMaster School { get; set; } = null!;
}
