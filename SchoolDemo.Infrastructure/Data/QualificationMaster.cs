using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class QualificationMaster
{
    public Guid Id { get; set; }

    public string? QualificationName { get; set; }

    public bool IsTeachingQualification { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? Status { get; set; }

    public string? StatusMessage { get; set; }

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<DriverMaster> DriverMasters { get; set; } = new List<DriverMaster>();

    public virtual ICollection<DriverQualificationDetail> DriverQualificationDetails { get; set; } = new List<DriverQualificationDetail>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual ICollection<ParentMaster> ParentMasters { get; set; } = new List<ParentMaster>();

    public virtual ICollection<TeacherQualificationDetail> TeacherQualificationDetails { get; set; } = new List<TeacherQualificationDetail>();
}
