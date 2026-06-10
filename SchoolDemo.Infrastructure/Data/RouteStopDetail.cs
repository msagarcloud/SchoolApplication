using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class RouteStopDetail
{
    public Guid Id { get; set; }

    public Guid RouteDetailId { get; set; }

    public Guid RouteId { get; set; }

    public Guid LocationId { get; set; }

    public int Number { get; set; }

    public string PickupTime { get; set; } = null!;

    public string DropTime { get; set; } = null!;

    public decimal? OneWayMonthlyFee { get; set; }

    public decimal? TwoWayMonthlyFee { get; set; }

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

    public virtual LocationMaster Location { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual RouteMaster Route { get; set; } = null!;

    public virtual RouteDetail RouteDetail { get; set; } = null!;

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual ICollection<StudentMasterHistory> StudentMasterHistories { get; set; } = new List<StudentMasterHistory>();

    public virtual ICollection<StudentMaster> StudentMasters { get; set; } = new List<StudentMaster>();
}
