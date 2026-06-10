using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class SessionMaster
{
    public Guid Id { get; set; }

    public string? Value { get; set; }

    public string? Description { get; set; }

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

    public virtual ICollection<ClassScholasticDetailHistory> ClassScholasticDetailHistories { get; set; } = new List<ClassScholasticDetailHistory>();

    public virtual ICollection<ClassSubjectDetailHistory> ClassSubjectDetailHistories { get; set; } = new List<ClassSubjectDetailHistory>();

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<EmpCatLeaveDetail> EmpCatLeaveDetails { get; set; } = new List<EmpCatLeaveDetail>();

    public virtual ICollection<EmpCatLeaveDetailsHistory> EmpCatLeaveDetailsHistories { get; set; } = new List<EmpCatLeaveDetailsHistory>();

    public virtual ICollection<EmpLeaveAvailDetail> EmpLeaveAvailDetails { get; set; } = new List<EmpLeaveAvailDetail>();

    public virtual ICollection<EmpLeaveDetail> EmpLeaveDetails { get; set; } = new List<EmpLeaveDetail>();

    public virtual ICollection<EmpLeaveDetailsHistory> EmpLeaveDetailsHistories { get; set; } = new List<EmpLeaveDetailsHistory>();

    public virtual ICollection<EmpSalaryMasterHistory> EmpSalaryMasterHistories { get; set; } = new List<EmpSalaryMasterHistory>();

    public virtual ICollection<EmpSalaryMaster> EmpSalaryMasters { get; set; } = new List<EmpSalaryMaster>();

    public virtual ICollection<EmpSalaryStructureDetail> EmpSalaryStructureDetails { get; set; } = new List<EmpSalaryStructureDetail>();

    public virtual ICollection<EmpSalaryStructureDetailsHistory> EmpSalaryStructureDetailsHistories { get; set; } = new List<EmpSalaryStructureDetailsHistory>();

    public virtual ICollection<HolidayMaster> HolidayMasters { get; set; } = new List<HolidayMaster>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual ICollection<RegistrationMaster> RegistrationMasters { get; set; } = new List<RegistrationMaster>();

    public virtual ICollection<RouteMaster> RouteMasters { get; set; } = new List<RouteMaster>();

    public virtual ICollection<SalaryDesigGradeDetail> SalaryDesigGradeDetails { get; set; } = new List<SalaryDesigGradeDetail>();

    public virtual ICollection<SalaryDesigGradeDetailsHistory> SalaryDesigGradeDetailsHistories { get; set; } = new List<SalaryDesigGradeDetailsHistory>();

    public virtual ICollection<ScholasticMaster> ScholasticMasters { get; set; } = new List<ScholasticMaster>();

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual ICollection<StudentCommentDetail> StudentCommentDetails { get; set; } = new List<StudentCommentDetail>();

    public virtual ICollection<StudentGradeDetail> StudentGradeDetails { get; set; } = new List<StudentGradeDetail>();

    public virtual ICollection<StudentGradeDetailsHistory> StudentGradeDetailsHistories { get; set; } = new List<StudentGradeDetailsHistory>();

    public virtual ICollection<StudentMasterHistory> StudentMasterHistories { get; set; } = new List<StudentMasterHistory>();

    public virtual ICollection<StudentMaster> StudentMasters { get; set; } = new List<StudentMaster>();

    public virtual ICollection<StudentReportCardMasterHistory> StudentReportCardMasterHistories { get; set; } = new List<StudentReportCardMasterHistory>();

    public virtual ICollection<StudentReportCardMaster> StudentReportCardMasters { get; set; } = new List<StudentReportCardMaster>();

    public virtual ICollection<SubjectCategoryDetail> SubjectCategoryDetails { get; set; } = new List<SubjectCategoryDetail>();

    public virtual ICollection<SubjectCategoryDetailsHistory> SubjectCategoryDetailsHistories { get; set; } = new List<SubjectCategoryDetailsHistory>();

    public virtual ICollection<TimeTableClassPeriodDetail> TimeTableClassPeriodDetails { get; set; } = new List<TimeTableClassPeriodDetail>();

    public virtual ICollection<TimeTableClassPeriodDetailsHistory> TimeTableClassPeriodDetailsHistories { get; set; } = new List<TimeTableClassPeriodDetailsHistory>();

    public virtual ICollection<TimeTableDetailsHistory> TimeTableDetailsHistories { get; set; } = new List<TimeTableDetailsHistory>();

    public virtual ICollection<TimeTablePeriodMaster> TimeTablePeriodMasters { get; set; } = new List<TimeTablePeriodMaster>();

    public virtual ICollection<TimeTableSetupDetail> TimeTableSetupDetails { get; set; } = new List<TimeTableSetupDetail>();

    public virtual ICollection<TimeTableSetupDetailsHistory> TimeTableSetupDetailsHistories { get; set; } = new List<TimeTableSetupDetailsHistory>();

    public virtual ICollection<TimeTableSubstitutionDetail> TimeTableSubstitutionDetails { get; set; } = new List<TimeTableSubstitutionDetail>();

    public virtual ICollection<TimeTableSubstitutionDetailsHistory> TimeTableSubstitutionDetailsHistories { get; set; } = new List<TimeTableSubstitutionDetailsHistory>();
}
