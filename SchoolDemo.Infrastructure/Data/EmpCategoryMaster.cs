using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class EmpCategoryMaster
{
    public Guid Id { get; set; }

    public string? CategoryName { get; set; }

    public string? CategoryDescription { get; set; }

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

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<EmpLeaveDetail> EmpLeaveDetails { get; set; } = new List<EmpLeaveDetail>();

    public virtual ICollection<EmpLeaveDetailsHistory> EmpLeaveDetailsHistories { get; set; } = new List<EmpLeaveDetailsHistory>();

    public virtual ICollection<EmpMaster> EmpMasterCategories { get; set; } = new List<EmpMaster>();

    public virtual ICollection<EmpMaster> EmpMasterEmployeeCategories { get; set; } = new List<EmpMaster>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SchoolMaster School { get; set; } = null!;
}
