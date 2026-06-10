using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class StudentAttendanceDetail
{
    public Guid Id { get; set; }

    public Guid StudentGuid { get; set; }

    public Guid ClassId { get; set; }

    public Guid SectionId { get; set; }

    public int? Month { get; set; }

    public int? Year { get; set; }

    public DateTime AttendenceDate { get; set; }

    public bool AttendenceStatus { get; set; }

    public Guid AttendanceReasonId { get; set; }

    public string? AttendenceTime { get; set; }

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

    public virtual AttendanceReasonMaster AttendanceReason { get; set; } = null!;

    public virtual ClassMaster Class { get; set; } = null!;

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<StudentAttendanceDetail> InverseSchool { get; set; } = new List<StudentAttendanceDetail>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual StudentAttendanceDetail School { get; set; } = null!;

    public virtual SectionMaster Section { get; set; } = null!;

    public virtual StudentMaster Student { get; set; } = null!;
}
