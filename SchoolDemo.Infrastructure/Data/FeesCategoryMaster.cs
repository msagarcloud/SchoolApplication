using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class FeesCategoryMaster
{
    public Guid Id { get; set; }

    public string? FeesCatgoryName { get; set; }

    public string? Description { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string Status { get; set; } = null!;

    public string? StatusMessage { get; set; }

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<FeeClassDetail> FeeClassDetails { get; set; } = new List<FeeClassDetail>();

    public virtual ICollection<FeeClassDetailsHistory> FeeClassDetailsHistories { get; set; } = new List<FeeClassDetailsHistory>();

    public virtual ICollection<FeesDiscountCategoryMaster> FeesDiscountCategoryMasters { get; set; } = new List<FeesDiscountCategoryMaster>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual ICollection<StudentFeeDetailsHistory> StudentFeeDetailsHistories { get; set; } = new List<StudentFeeDetailsHistory>();
}
