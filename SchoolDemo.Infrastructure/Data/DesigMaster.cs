using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class DesigMaster
{
    public Guid Id { get; set; }

    public string? Code { get; set; }

    public string? Name { get; set; }

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

    public virtual ICollection<DeptDesigDetail> DeptDesigDetails { get; set; } = new List<DeptDesigDetail>();

    public virtual ICollection<DesigGradeDetail> DesigGradeDetails { get; set; } = new List<DesigGradeDetail>();

    public virtual ICollection<EmpMaster> EmpMasters { get; set; } = new List<EmpMaster>();

    public virtual ICollection<EmpSalaryMasterHistory> EmpSalaryMasterHistories { get; set; } = new List<EmpSalaryMasterHistory>();

    public virtual ICollection<EmpSalaryMaster> EmpSalaryMasters { get; set; } = new List<EmpSalaryMaster>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual ICollection<ParentMaster> ParentMasters { get; set; } = new List<ParentMaster>();

    public virtual ICollection<RegistrationMaster> RegistrationMasterFathersDesignations { get; set; } = new List<RegistrationMaster>();

    public virtual ICollection<RegistrationMaster> RegistrationMasterMothersDesignations { get; set; } = new List<RegistrationMaster>();

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual ICollection<UserDetail> UserDetails { get; set; } = new List<UserDetail>();
}
