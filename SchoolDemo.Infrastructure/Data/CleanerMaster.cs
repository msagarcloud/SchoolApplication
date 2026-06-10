using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class CleanerMaster
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public string? Image { get; set; }

    public string? FatherName { get; set; }

    public string? Description { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CompanyId { get; set; }

    public Guid SchoolId { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? Status { get; set; }

    public string? StatusMessage { get; set; }

    public virtual ICollection<RouteDetail> RouteDetails { get; set; } = new List<RouteDetail>();
}
