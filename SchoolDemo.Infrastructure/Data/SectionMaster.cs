using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class SectionMaster
{
    public Guid Id { get; set; }

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

    public virtual ICollection<BookTransactionDetail> BookTransactionDetails { get; set; } = new List<BookTransactionDetail>();

    public virtual ICollection<ClassSectionDetail> ClassSectionDetails { get; set; } = new List<ClassSectionDetail>();

    public virtual ICollection<ClassSmstasksDetail> ClassSmstasksDetails { get; set; } = new List<ClassSmstasksDetail>();

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<HolidayClassDetail> HolidayClassDetails { get; set; } = new List<HolidayClassDetail>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual ICollection<StudentAttendanceDetail> StudentAttendanceDetails { get; set; } = new List<StudentAttendanceDetail>();

    public virtual ICollection<StudentCommentDetail> StudentCommentDetails { get; set; } = new List<StudentCommentDetail>();

    public virtual ICollection<StudentCommentDetailsHistory> StudentCommentDetailsHistories { get; set; } = new List<StudentCommentDetailsHistory>();

    public virtual ICollection<StudentFeeDetail> StudentFeeDetails { get; set; } = new List<StudentFeeDetail>();

    public virtual ICollection<StudentFeeDetailsHistory> StudentFeeDetailsHistories { get; set; } = new List<StudentFeeDetailsHistory>();

    public virtual ICollection<StudentGradeDetail> StudentGradeDetails { get; set; } = new List<StudentGradeDetail>();

    public virtual ICollection<StudentGradeDetailsHistory> StudentGradeDetailsHistories { get; set; } = new List<StudentGradeDetailsHistory>();

    public virtual ICollection<StudentMarksDetail> StudentMarksDetails { get; set; } = new List<StudentMarksDetail>();

    public virtual ICollection<StudentMarksDetailsHistory> StudentMarksDetailsHistories { get; set; } = new List<StudentMarksDetailsHistory>();

    public virtual ICollection<StudentMasterHistory> StudentMasterHistories { get; set; } = new List<StudentMasterHistory>();

    public virtual ICollection<StudentMaster> StudentMasters { get; set; } = new List<StudentMaster>();

    public virtual ICollection<StudentReportCardMasterHistory> StudentReportCardMasterHistories { get; set; } = new List<StudentReportCardMasterHistory>();

    public virtual ICollection<StudentReportCardMaster> StudentReportCardMasters { get; set; } = new List<StudentReportCardMaster>();

    public virtual ICollection<TeacherClassDetail> TeacherClassDetails { get; set; } = new List<TeacherClassDetail>();

    public virtual ICollection<TeacherSectionDetail> TeacherSectionDetails { get; set; } = new List<TeacherSectionDetail>();

    public virtual ICollection<TimeTableClassPeriodDetail> TimeTableClassPeriodDetails { get; set; } = new List<TimeTableClassPeriodDetail>();

    public virtual ICollection<TimeTableClassPeriodDetailsHistory> TimeTableClassPeriodDetailsHistories { get; set; } = new List<TimeTableClassPeriodDetailsHistory>();

    public virtual ICollection<TimeTableDetailsHistory> TimeTableDetailsHistories { get; set; } = new List<TimeTableDetailsHistory>();

    public virtual ICollection<TimeTableSubstitutionDetail> TimeTableSubstitutionDetails { get; set; } = new List<TimeTableSubstitutionDetail>();

    public virtual ICollection<TimeTableSubstitutionDetailsHistory> TimeTableSubstitutionDetailsHistories { get; set; } = new List<TimeTableSubstitutionDetailsHistory>();
}
