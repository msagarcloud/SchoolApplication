using System.Collections.Generic;
using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Infrastructure.Data;

public partial class StudentMaster : SchoolDemo.Domain.Entities.StudentMaster
{
    // Navigation properties
    public virtual CityMaster BirthCity { get; set; } = null!;
    public virtual CountryMaster BirthCountry { get; set; } = null!;
    public virtual StateMaster BirthState { get; set; } = null!;
    public virtual BloodGroupMaster BloodGroup { get; set; } = null!;
    public virtual CategoryMaster Category { get; set; } = null!;
    public virtual CityMaster City { get; set; } = null!;
    public virtual ClassMaster Class { get; set; } = null!;
    public virtual TeacherMaster? ClassTeacher { get; set; }
    public virtual CompanyMaster Company { get; set; } = null!;
    public virtual CountryMaster Country { get; set; } = null!;
    public virtual UserDetail CreatedByNavigation { get; set; } = null!;
    public virtual FeesDiscountCategoryMaster? FeesDiscountCategoryMaster { get; set; }
    public virtual GenderMaster? GenderNavigation { get; set; }
    public virtual HouseMaster? HouseAllottedNavigation { get; set; }
    public virtual UserDetail? ModifiedByNavigation { get; set; }
    public virtual CountryMaster NationalityNavigation { get; set; } = null!;
    public virtual SchoolBoard PreviousSchoolBoard { get; set; } = null!;
    public virtual ClassMaster? PreviousSchoolClass { get; set; }
    public virtual ReligionMaster Religion { get; set; } = null!;
    public virtual RouteMaster? Route { get; set; }
    public virtual RouteStopDetail? RouteStopDetails { get; set; }
    public virtual SchoolMaster School { get; set; } = null!;
    public virtual SectionMaster Section { get; set; } = null!;
    public virtual SessionMaster? Session { get; set; }
    public virtual ClassMaster? SiblingClass { get; set; }
    public virtual StateMaster State { get; set; } = null!;
    public virtual ICollection<StudentAttendanceDetail> StudentAttendanceDetails { get; set; } = new List<StudentAttendanceDetail>();
    public virtual ICollection<StudentCommentDetail> StudentCommentDetails { get; set; } = new List<StudentCommentDetail>();
    public virtual ICollection<StudentCommentDetailsHistory> StudentCommentDetailsHistories { get; set; } = new List<StudentCommentDetailsHistory>();
    public virtual ICollection<StudentFeeDetail> StudentFeeDetails { get; set; } = new List<StudentFeeDetail>();
    public virtual ICollection<StudentFeeDetailsHistory> StudentFeeDetailsHistories { get; set; } = new List<StudentFeeDetailsHistory>();
    public virtual ICollection<StudentGradeDetail> StudentGradeDetails { get; set; } = new List<StudentGradeDetail>();
    public virtual ICollection<StudentGradeDetailsHistory> StudentGradeDetailsHistories { get; set; } = new List<StudentGradeDetailsHistory>();
    public virtual ICollection<StudentMarksDetail> StudentMarksDetails { get; set; } = new List<StudentMarksDetail>();
    public virtual ICollection<StudentMarksDetailsHistory> StudentMarksDetailsHistories { get; set; } = new List<StudentMarksDetailsHistory>();
}
