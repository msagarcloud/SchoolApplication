using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class RouteMaster
{
    public Guid Id { get; set; }

    public string? Code { get; set; }

    public string? Name { get; set; }

    public Guid? SessionId { get; set; }

    public Guid StartLocationId { get; set; }

    public Guid EndLocationId { get; set; }

    public Guid ApplicableClasses { get; set; }

    public Guid CompanyId { get; set; }

    public Guid SchoolId { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string Status { get; set; } = null!;

    public string? StatusMessage { get; set; }

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual RouteLocationMaster EndLocation { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual ICollection<RouteDetail> RouteDetails { get; set; } = new List<RouteDetail>();

    public virtual ICollection<RouteStopDetail> RouteStopDetails { get; set; } = new List<RouteStopDetail>();

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual SessionMaster? Session { get; set; }

    public virtual RouteLocationMaster StartLocation { get; set; } = null!;

    public virtual ICollection<StudentMasterHistory> StudentMasterHistories { get; set; } = new List<StudentMasterHistory>();

    public virtual ICollection<StudentMaster> StudentMasters { get; set; } = new List<StudentMaster>();
}
