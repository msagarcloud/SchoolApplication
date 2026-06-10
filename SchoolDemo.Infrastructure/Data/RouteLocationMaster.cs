using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class RouteLocationMaster
{
    public Guid Id { get; set; }

    public string? Code { get; set; }

    public string? Name { get; set; }

    public string LandMark { get; set; } = null!;

    public Guid CityId { get; set; }

    public Guid CompanyId { get; set; }

    public Guid SchoolId { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? Status { get; set; }

    public string? StatusMessage { get; set; }

    public virtual CityMaster City { get; set; } = null!;

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual ICollection<RouteMaster> RouteMasterEndLocations { get; set; } = new List<RouteMaster>();

    public virtual ICollection<RouteMaster> RouteMasterStartLocations { get; set; } = new List<RouteMaster>();

    public virtual SchoolMaster School { get; set; } = null!;
}
