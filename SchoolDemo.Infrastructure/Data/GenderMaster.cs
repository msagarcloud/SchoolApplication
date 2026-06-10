using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class GenderMaster
{
    public Guid Id { get; set; }

    public string? Gender { get; set; }

    public bool IsActive { get; set; }

    public bool? IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? Status { get; set; }

    public string? StatusMessage { get; set; }

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<EmpMaster> EmpMasters { get; set; } = new List<EmpMaster>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual ICollection<RegistrationMaster> RegistrationMasters { get; set; } = new List<RegistrationMaster>();

    public virtual ICollection<StudentMasterHistory> StudentMasterHistories { get; set; } = new List<StudentMasterHistory>();

    public virtual ICollection<StudentMaster> StudentMasters { get; set; } = new List<StudentMaster>();

    public virtual ICollection<TeacherMaster> TeacherMasters { get; set; } = new List<TeacherMaster>();
}
