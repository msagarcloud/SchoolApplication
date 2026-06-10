using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class SchoolBoard
{
    public Guid Id { get; set; }

    public string? BoardName { get; set; }

    public Guid CityId { get; set; }

    public Guid StateId { get; set; }

    public Guid CountryId { get; set; }

    public bool? IsActive { get; set; }

    public bool? IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public Guid? SchoolId { get; set; }

    public Guid? CompanyId { get; set; }

    public string Status { get; set; } = null!;

    public string? StatusMessage { get; set; }

    public virtual ICollection<StudentMasterHistory> StudentMasterHistories { get; set; } = new List<StudentMasterHistory>();

    public virtual ICollection<StudentMaster> StudentMasters { get; set; } = new List<StudentMaster>();
}
