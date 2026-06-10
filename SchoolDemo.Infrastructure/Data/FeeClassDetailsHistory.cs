using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class FeeClassDetailsHistory
{
    public Guid Id { get; set; }

    public Guid ClassMasterId { get; set; }

    public Guid FeesCategoryId { get; set; }

    public DateTime FromDate { get; set; }

    public DateTime ToDate { get; set; }

    public decimal? Amount { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string Status { get; set; } = null!;

    public string? StatusMessage { get; set; }

    public virtual ClassMaster ClassMaster { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual FeesCategoryMaster FeesCategory { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }
}
