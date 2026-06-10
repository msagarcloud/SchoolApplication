using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class BillMaster
{
    public Guid Id { get; set; }

    public string BillNumber { get; set; } = null!;

    public DateTime BillDate { get; set; }

    public DateTime? BillDueDate { get; set; }

    public string? Description { get; set; }

    public Guid VendorId { get; set; }

    public decimal? BillAmount { get; set; }

    public decimal? TaxAmount { get; set; }

    public decimal? TotalBillAmount { get; set; }

    public Guid VehicleId { get; set; }

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

    public virtual ICollection<BillDetail> BillDetails { get; set; } = new List<BillDetail>();

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual VehicleMaster Vehicle { get; set; } = null!;

    public virtual VendorMaster Vendor { get; set; } = null!;
}
