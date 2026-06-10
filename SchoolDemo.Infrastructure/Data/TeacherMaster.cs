using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class TeacherMaster
{
    public Guid Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string? LastName { get; set; }

    public DateTime Dob { get; set; }

    public DateTime? Doj { get; set; }

    public DateTime? DateOfLeaving { get; set; }

    public string? Address { get; set; }

    public Guid? CityId { get; set; }

    public Guid? StateId { get; set; }

    public Guid? CountryId { get; set; }

    public string? ZipCode { get; set; }

    public Guid? Gender { get; set; }

    public Guid? MaritalStatusId { get; set; }

    public string? Image { get; set; }

    public string? Phone { get; set; }

    public string? MobilePhone { get; set; }

    public string? YearsOfExperience { get; set; }

    public string? PreviousSchool { get; set; }

    public string? Salutation { get; set; }

    public string? Email { get; set; }

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

    public virtual CityMaster? City { get; set; }

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual CountryMaster? Country { get; set; }

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual GenderMaster? GenderNavigation { get; set; }

    public virtual MaritalStatus? MaritalStatus { get; set; }

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual StateMaster? State { get; set; }

    public virtual ICollection<StudentMasterHistory> StudentMasterHistories { get; set; } = new List<StudentMasterHistory>();

    public virtual ICollection<StudentMaster> StudentMasters { get; set; } = new List<StudentMaster>();

    public virtual ICollection<TeacherDocumentDetail> TeacherDocumentDetails { get; set; } = new List<TeacherDocumentDetail>();

    public virtual ICollection<TeacherQualificationDetail> TeacherQualificationDetails { get; set; } = new List<TeacherQualificationDetail>();

    public virtual ICollection<TeacherSectionDetail> TeacherSectionDetails { get; set; } = new List<TeacherSectionDetail>();

    public virtual ICollection<TeacherSubjectDetail> TeacherSubjectDetails { get; set; } = new List<TeacherSubjectDetail>();

    public virtual ICollection<TimeTableClassPeriodDetail> TimeTableClassPeriodDetails { get; set; } = new List<TimeTableClassPeriodDetail>();

    public virtual ICollection<TimeTableDetailsHistory> TimeTableDetailsHistories { get; set; } = new List<TimeTableDetailsHistory>();

    public virtual ICollection<TimeTableSubstitutionDetail> TimeTableSubstitutionDetailTeacherNews { get; set; } = new List<TimeTableSubstitutionDetail>();

    public virtual ICollection<TimeTableSubstitutionDetail> TimeTableSubstitutionDetailTeachers { get; set; } = new List<TimeTableSubstitutionDetail>();

    public virtual ICollection<TimeTableSubstitutionDetailsHistory> TimeTableSubstitutionDetailsHistoryTeacherNews { get; set; } = new List<TimeTableSubstitutionDetailsHistory>();

    public virtual ICollection<TimeTableSubstitutionDetailsHistory> TimeTableSubstitutionDetailsHistoryTeachers { get; set; } = new List<TimeTableSubstitutionDetailsHistory>();
}
