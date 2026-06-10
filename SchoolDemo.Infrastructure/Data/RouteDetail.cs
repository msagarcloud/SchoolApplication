using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class RouteDetail
{
    public Guid Id { get; set; }

    public Guid RouteId { get; set; }

    public Guid VehicleId { get; set; }

    public Guid DriverId { get; set; }

    public Guid CleanerId { get; set; }

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

    public virtual CleanerMaster Cleaner { get; set; } = null!;

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual DriverMaster Driver { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual RouteMaster Route { get; set; } = null!;

    public virtual ICollection<RouteStopDetail> RouteStopDetails { get; set; } = new List<RouteStopDetail>();

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual VehicleMaster Vehicle { get; set; } = null!;
}
