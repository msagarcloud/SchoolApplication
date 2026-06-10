using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class SubjectMaster
{
    public Guid Id { get; set; }

    public string? SubjectName { get; set; }

    public Guid CompanyId { get; set; }

    public Guid SchoolId { get; set; }

    public bool? IsScholastic { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string Status { get; set; } = null!;

    public string? StatusMessage { get; set; }

    public Guid? ClassId { get; set; }

    public int? PeriodsPerWeek { get; set; }

    public virtual ClassMaster? Class { get; set; }

    public virtual ICollection<ClassSubjectDetailHistory> ClassSubjectDetailHistories { get; set; } = new List<ClassSubjectDetailHistory>();

    public virtual ICollection<ClassSubjectDetail> ClassSubjectDetails { get; set; } = new List<ClassSubjectDetail>();

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual ICollection<ScholasticMaster> ScholasticMasters { get; set; } = new List<ScholasticMaster>();

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual ICollection<StudentMarksDetail> StudentMarksDetails { get; set; } = new List<StudentMarksDetail>();

    public virtual ICollection<StudentMarksDetailsHistory> StudentMarksDetailsHistories { get; set; } = new List<StudentMarksDetailsHistory>();

    public virtual ICollection<StudentReportCardDetail> StudentReportCardDetails { get; set; } = new List<StudentReportCardDetail>();

    public virtual ICollection<StudentReportCardDetailsHistory> StudentReportCardDetailsHistories { get; set; } = new List<StudentReportCardDetailsHistory>();

    public virtual ICollection<TeacherClassDetail> TeacherClassDetails { get; set; } = new List<TeacherClassDetail>();

    public virtual ICollection<TeacherSectionDetail> TeacherSectionDetails { get; set; } = new List<TeacherSectionDetail>();

    public virtual ICollection<TeacherSubjectDetail> TeacherSubjectDetails { get; set; } = new List<TeacherSubjectDetail>();

    public virtual ICollection<TimeTableClassPeriodDetail> TimeTableClassPeriodDetails { get; set; } = new List<TimeTableClassPeriodDetail>();

    public virtual ICollection<TimeTableClassPeriodDetailsHistory> TimeTableClassPeriodDetailsHistories { get; set; } = new List<TimeTableClassPeriodDetailsHistory>();

    public virtual ICollection<TimeTableDetailsHistory> TimeTableDetailsHistories { get; set; } = new List<TimeTableDetailsHistory>();

    public virtual ICollection<TimeTableSubstitutionDetail> TimeTableSubstitutionDetails { get; set; } = new List<TimeTableSubstitutionDetail>();

    public virtual ICollection<TimeTableSubstitutionDetailsHistory> TimeTableSubstitutionDetailsHistories { get; set; } = new List<TimeTableSubstitutionDetailsHistory>();
}
