using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class DeptMaster
{
    public Guid Id { get; set; }

    public string? DeptCode { get; set; }

    public string? DeptName { get; set; }

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

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<DeptDesigDetail> DeptDesigDetails { get; set; } = new List<DeptDesigDetail>();

    public virtual ICollection<EmpMaster> EmpMasters { get; set; } = new List<EmpMaster>();

    public virtual ICollection<EmpSalaryMasterHistory> EmpSalaryMasterHistories { get; set; } = new List<EmpSalaryMasterHistory>();

    public virtual ICollection<EmpSalaryMaster> EmpSalaryMasters { get; set; } = new List<EmpSalaryMaster>();

    public virtual ICollection<HolidayDeptDetail> HolidayDeptDetails { get; set; } = new List<HolidayDeptDetail>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SchoolMaster School { get; set; } = null!;
}
