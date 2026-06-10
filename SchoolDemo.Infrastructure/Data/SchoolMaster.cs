using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class SchoolMaster
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Email { get; set; }

    public string? Address1 { get; set; }

    public string? Address2 { get; set; }

    public Guid? CityId { get; set; }

    public Guid? StateId { get; set; }

    public Guid? CountryId { get; set; }

    public string? ZipCode { get; set; }

    public string? Phone { get; set; }

    public string? EstablishmentYear { get; set; }

    public string? Mobile { get; set; }

    public Guid? JudistrictionCityId { get; set; }

    public Guid? JudistrictionStateId { get; set; }

    public Guid? JudistrictionCountryId { get; set; }

    public string? BankName { get; set; }

    public string? BankAddress1 { get; set; }

    public string? BankAddress2 { get; set; }

    public Guid? BankCityId { get; set; }

    public Guid? BankStateId { get; set; }

    public Guid? BankCountryId { get; set; }

    public string? BankZipCode { get; set; }

    public string? AccountNumber { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CompanyId { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? Status { get; set; }

    public string? StatusMessage { get; set; }

    public virtual ICollection<AssesmentMaster> AssesmentMasters { get; set; } = new List<AssesmentMaster>();

    public virtual ICollection<AttendanceReasonMaster> AttendanceReasonMasters { get; set; } = new List<AttendanceReasonMaster>();

    public virtual ICollection<AuditType> AuditTypes { get; set; } = new List<AuditType>();

    public virtual ICollection<Audit> Audits { get; set; } = new List<Audit>();

    public virtual ICollection<AuthorMaster> AuthorMasters { get; set; } = new List<AuthorMaster>();

    public virtual CityMaster? BankCity { get; set; }

    public virtual CountryMaster? BankCountry { get; set; }

    public virtual StateMaster? BankState { get; set; }

    public virtual ICollection<BillDetail> BillDetails { get; set; } = new List<BillDetail>();

    public virtual ICollection<BillMaster> BillMasters { get; set; } = new List<BillMaster>();

    public virtual ICollection<BookCategoryMaster> BookCategoryMasters { get; set; } = new List<BookCategoryMaster>();

    public virtual ICollection<BookMaster> BookMasters { get; set; } = new List<BookMaster>();

    public virtual ICollection<BookTransactionDetail> BookTransactionDetails { get; set; } = new List<BookTransactionDetail>();

    public virtual ICollection<BookTransactionType> BookTransactionTypes { get; set; } = new List<BookTransactionType>();

    public virtual ICollection<BookTypeMaster> BookTypeMasters { get; set; } = new List<BookTypeMaster>();

    public virtual CityMaster? City { get; set; }

    public virtual ICollection<ClassMaster> ClassMasters { get; set; } = new List<ClassMaster>();

    public virtual ICollection<ClassRoomMaster> ClassRoomMasters { get; set; } = new List<ClassRoomMaster>();

    public virtual ICollection<ClassScholasticDetailHistory> ClassScholasticDetailHistories { get; set; } = new List<ClassScholasticDetailHistory>();

    public virtual ICollection<ClassScholasticDetail> ClassScholasticDetails { get; set; } = new List<ClassScholasticDetail>();

    public virtual ICollection<ClassSectionDetail> ClassSectionDetails { get; set; } = new List<ClassSectionDetail>();

    public virtual ICollection<ClassSmstasksDetail> ClassSmstasksDetails { get; set; } = new List<ClassSmstasksDetail>();

    public virtual ICollection<ClassSubjectDetailHistory> ClassSubjectDetailHistories { get; set; } = new List<ClassSubjectDetailHistory>();

    public virtual ICollection<ClassSubjectDetail> ClassSubjectDetails { get; set; } = new List<ClassSubjectDetail>();

    public virtual CountryMaster? Country { get; set; }

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<DeptDesigDetail> DeptDesigDetails { get; set; } = new List<DeptDesigDetail>();

    public virtual ICollection<DeptMaster> DeptMasters { get; set; } = new List<DeptMaster>();

    public virtual ICollection<DesigGradeDetail> DesigGradeDetails { get; set; } = new List<DesigGradeDetail>();

    public virtual ICollection<DesigMaster> DesigMasters { get; set; } = new List<DesigMaster>();

    public virtual ICollection<DriverMaster> DriverMasters { get; set; } = new List<DriverMaster>();

    public virtual ICollection<DriverQualificationDetail> DriverQualificationDetails { get; set; } = new List<DriverQualificationDetail>();

    public virtual ICollection<EmpAttendanceDetail> EmpAttendanceDetails { get; set; } = new List<EmpAttendanceDetail>();

    public virtual ICollection<EmpAttendanceDetailsHistory> EmpAttendanceDetailsHistories { get; set; } = new List<EmpAttendanceDetailsHistory>();

    public virtual ICollection<EmpCatLeaveDetail> EmpCatLeaveDetails { get; set; } = new List<EmpCatLeaveDetail>();

    public virtual ICollection<EmpCatLeaveDetailsHistory> EmpCatLeaveDetailsHistories { get; set; } = new List<EmpCatLeaveDetailsHistory>();

    public virtual ICollection<EmpCategoryMaster> EmpCategoryMasters { get; set; } = new List<EmpCategoryMaster>();

    public virtual ICollection<EmpDocumentDetail> EmpDocumentDetails { get; set; } = new List<EmpDocumentDetail>();

    public virtual ICollection<EmpLeaveAvailDetail> EmpLeaveAvailDetails { get; set; } = new List<EmpLeaveAvailDetail>();

    public virtual ICollection<EmpLeaveDetail> EmpLeaveDetails { get; set; } = new List<EmpLeaveDetail>();

    public virtual ICollection<EmpLeaveDetailsHistory> EmpLeaveDetailsHistories { get; set; } = new List<EmpLeaveDetailsHistory>();

    public virtual ICollection<EmpMaster> EmpMasters { get; set; } = new List<EmpMaster>();

    public virtual ICollection<EmpProfQualiDetail> EmpProfQualiDetails { get; set; } = new List<EmpProfQualiDetail>();

    public virtual ICollection<EmpSalaryDetail> EmpSalaryDetails { get; set; } = new List<EmpSalaryDetail>();

    public virtual ICollection<EmpSalaryDetailsHistory> EmpSalaryDetailsHistories { get; set; } = new List<EmpSalaryDetailsHistory>();

    public virtual ICollection<EmpSalaryMasterHistory> EmpSalaryMasterHistories { get; set; } = new List<EmpSalaryMasterHistory>();

    public virtual ICollection<EmpSalaryMaster> EmpSalaryMasters { get; set; } = new List<EmpSalaryMaster>();

    public virtual ICollection<EmpSalaryStructureDetail> EmpSalaryStructureDetails { get; set; } = new List<EmpSalaryStructureDetail>();

    public virtual ICollection<EmpSalaryStructureDetailsHistory> EmpSalaryStructureDetailsHistories { get; set; } = new List<EmpSalaryStructureDetailsHistory>();

    public virtual ICollection<EmpTypeMaster> EmpTypeMasters { get; set; } = new List<EmpTypeMaster>();

    public virtual ICollection<EnquiryMaster> EnquiryMasters { get; set; } = new List<EnquiryMaster>();

    public virtual ICollection<ErrorDetail> ErrorDetails { get; set; } = new List<ErrorDetail>();

    public virtual ICollection<ErrorType> ErrorTypes { get; set; } = new List<ErrorType>();

    public virtual ICollection<Error> Errors { get; set; } = new List<Error>();

    public virtual ICollection<ExamCategoryMaster> ExamCategoryMasters { get; set; } = new List<ExamCategoryMaster>();

    public virtual ICollection<ExamUnitMaster> ExamUnitMasters { get; set; } = new List<ExamUnitMaster>();

    public virtual ICollection<ExpenseCategoryMaster> ExpenseCategoryMasters { get; set; } = new List<ExpenseCategoryMaster>();

    public virtual ICollection<FeesDiscountCategoryMaster> FeesDiscountCategoryMasters { get; set; } = new List<FeesDiscountCategoryMaster>();

    public virtual ICollection<GradeMaster> GradeMasters { get; set; } = new List<GradeMaster>();

    public virtual ICollection<HolidayClassDetail> HolidayClassDetails { get; set; } = new List<HolidayClassDetail>();

    public virtual ICollection<HolidayDeptDetail> HolidayDeptDetails { get; set; } = new List<HolidayDeptDetail>();

    public virtual ICollection<HolidayMaster> HolidayMasters { get; set; } = new List<HolidayMaster>();

    public virtual ICollection<HolidayTypeMaster> HolidayTypeMasters { get; set; } = new List<HolidayTypeMaster>();

    public virtual ICollection<HouseMaster> HouseMasters { get; set; } = new List<HouseMaster>();

    public virtual ICollection<InventoryMaster> InventoryMasters { get; set; } = new List<InventoryMaster>();

    public virtual ICollection<ItemLocationMaster> ItemLocationMasters { get; set; } = new List<ItemLocationMaster>();

    public virtual ICollection<ItemMaster> ItemMasters { get; set; } = new List<ItemMaster>();

    public virtual ICollection<ItemTypeMaster> ItemTypeMasters { get; set; } = new List<ItemTypeMaster>();

    public virtual CityMaster? JudistrictionCity { get; set; }

    public virtual CountryMaster? JudistrictionCountry { get; set; }

    public virtual StateMaster? JudistrictionState { get; set; }

    public virtual ICollection<LeaveStatusMaster> LeaveStatusMasters { get; set; } = new List<LeaveStatusMaster>();

    public virtual ICollection<LeaveTypeMaster> LeaveTypeMasters { get; set; } = new List<LeaveTypeMaster>();

    public virtual ICollection<LocationMaster> LocationMasters { get; set; } = new List<LocationMaster>();

    public virtual ICollection<MaritalStatus> MaritalStatuses { get; set; } = new List<MaritalStatus>();

    public virtual ICollection<MarksGradeMaster> MarksGradeMasters { get; set; } = new List<MarksGradeMaster>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual ICollection<NonTeachingMaster> NonTeachingMasters { get; set; } = new List<NonTeachingMaster>();

    public virtual ICollection<NotificationReceiverMaster> NotificationReceiverMasters { get; set; } = new List<NotificationReceiverMaster>();

    public virtual ICollection<ParentMaster> ParentMasters { get; set; } = new List<ParentMaster>();

    public virtual ICollection<PaymentModeMaster> PaymentModeMasters { get; set; } = new List<PaymentModeMaster>();

    public virtual ICollection<PhoneCallMaster> PhoneCallMasters { get; set; } = new List<PhoneCallMaster>();

    public virtual ICollection<ProfessionMaster> ProfessionMasters { get; set; } = new List<ProfessionMaster>();

    public virtual ICollection<PublisherMaster> PublisherMasters { get; set; } = new List<PublisherMaster>();

    public virtual ICollection<RegistrationMaster> RegistrationMasters { get; set; } = new List<RegistrationMaster>();

    public virtual ICollection<RoleMaster> RoleMasters { get; set; } = new List<RoleMaster>();

    public virtual ICollection<RouteDetail> RouteDetails { get; set; } = new List<RouteDetail>();

    public virtual ICollection<RouteLocationMaster> RouteLocationMasters { get; set; } = new List<RouteLocationMaster>();

    public virtual ICollection<RouteMaster> RouteMasters { get; set; } = new List<RouteMaster>();

    public virtual ICollection<RouteStopDetail> RouteStopDetails { get; set; } = new List<RouteStopDetail>();

    public virtual ICollection<SalaryCode> SalaryCodes { get; set; } = new List<SalaryCode>();

    public virtual ICollection<SalaryDesigGradeDetail> SalaryDesigGradeDetails { get; set; } = new List<SalaryDesigGradeDetail>();

    public virtual ICollection<SalaryDesigGradeDetailsHistory> SalaryDesigGradeDetailsHistories { get; set; } = new List<SalaryDesigGradeDetailsHistory>();

    public virtual ICollection<SalaryHeadMaster> SalaryHeadMasters { get; set; } = new List<SalaryHeadMaster>();

    public virtual ICollection<SalaryTypeMaster> SalaryTypeMasters { get; set; } = new List<SalaryTypeMaster>();

    public virtual ICollection<SalaryType> SalaryTypes { get; set; } = new List<SalaryType>();

    public virtual ICollection<ScholasticMaster> ScholasticMasters { get; set; } = new List<ScholasticMaster>();

    public virtual ICollection<ScholasticUnitDetail> ScholasticUnitDetails { get; set; } = new List<ScholasticUnitDetail>();

    public virtual ICollection<SchoolContactMaster> SchoolContactMasters { get; set; } = new List<SchoolContactMaster>();

    public virtual ICollection<SectionMaster> SectionMasters { get; set; } = new List<SectionMaster>();

    public virtual ICollection<SessionMaster> SessionMasters { get; set; } = new List<SessionMaster>();

    public virtual ICollection<Smstask> Smstasks { get; set; } = new List<Smstask>();

    public virtual StateMaster? State { get; set; }

    public virtual ICollection<StudentCommentDetailsHistory> StudentCommentDetailsHistories { get; set; } = new List<StudentCommentDetailsHistory>();

    public virtual ICollection<StudentFeeDetail> StudentFeeDetails { get; set; } = new List<StudentFeeDetail>();

    public virtual ICollection<StudentFeeDetailsHistory> StudentFeeDetailsHistories { get; set; } = new List<StudentFeeDetailsHistory>();

    public virtual ICollection<StudentGradeDetail> StudentGradeDetails { get; set; } = new List<StudentGradeDetail>();

    public virtual ICollection<StudentGradeDetailsHistory> StudentGradeDetailsHistories { get; set; } = new List<StudentGradeDetailsHistory>();

    public virtual ICollection<StudentMarksDetail> StudentMarksDetails { get; set; } = new List<StudentMarksDetail>();

    public virtual ICollection<StudentMarksDetailsHistory> StudentMarksDetailsHistories { get; set; } = new List<StudentMarksDetailsHistory>();

    public virtual ICollection<StudentMasterHistory> StudentMasterHistories { get; set; } = new List<StudentMasterHistory>();

    public virtual ICollection<StudentMaster> StudentMasters { get; set; } = new List<StudentMaster>();

    public virtual ICollection<StudentReportCardDetail> StudentReportCardDetails { get; set; } = new List<StudentReportCardDetail>();

    public virtual ICollection<StudentReportCardDetailsHistory> StudentReportCardDetailsHistories { get; set; } = new List<StudentReportCardDetailsHistory>();

    public virtual ICollection<StudentReportCardMasterHistory> StudentReportCardMasterHistories { get; set; } = new List<StudentReportCardMasterHistory>();

    public virtual ICollection<StudentReportCardMaster> StudentReportCardMasters { get; set; } = new List<StudentReportCardMaster>();

    public virtual ICollection<SubjectCategoryDetail> SubjectCategoryDetails { get; set; } = new List<SubjectCategoryDetail>();

    public virtual ICollection<SubjectCategoryDetailsHistory> SubjectCategoryDetailsHistories { get; set; } = new List<SubjectCategoryDetailsHistory>();

    public virtual ICollection<SubjectMaster> SubjectMasters { get; set; } = new List<SubjectMaster>();

    public virtual ICollection<SupplierMaster> SupplierMasters { get; set; } = new List<SupplierMaster>();

    public virtual ICollection<SystemParameter> SystemParameters { get; set; } = new List<SystemParameter>();

    public virtual ICollection<TeacherClassDetail> TeacherClassDetails { get; set; } = new List<TeacherClassDetail>();

    public virtual ICollection<TeacherDocumentDetail> TeacherDocumentDetails { get; set; } = new List<TeacherDocumentDetail>();

    public virtual ICollection<TeacherMaster> TeacherMasters { get; set; } = new List<TeacherMaster>();

    public virtual ICollection<TeacherQualificationDetail> TeacherQualificationDetails { get; set; } = new List<TeacherQualificationDetail>();

    public virtual ICollection<TeacherSectionDetail> TeacherSectionDetails { get; set; } = new List<TeacherSectionDetail>();

    public virtual ICollection<TeacherSubjectDetail> TeacherSubjectDetails { get; set; } = new List<TeacherSubjectDetail>();

    public virtual ICollection<TimeTableClassPeriodDetail> TimeTableClassPeriodDetails { get; set; } = new List<TimeTableClassPeriodDetail>();

    public virtual ICollection<TimeTableClassPeriodDetailsHistory> TimeTableClassPeriodDetailsHistories { get; set; } = new List<TimeTableClassPeriodDetailsHistory>();

    public virtual ICollection<TimeTableDetailsHistory> TimeTableDetailsHistories { get; set; } = new List<TimeTableDetailsHistory>();

    public virtual ICollection<TimeTablePeriodMaster> TimeTablePeriodMasters { get; set; } = new List<TimeTablePeriodMaster>();

    public virtual ICollection<TimeTableSession> TimeTableSessions { get; set; } = new List<TimeTableSession>();

    public virtual ICollection<TimeTableSetupDetail> TimeTableSetupDetails { get; set; } = new List<TimeTableSetupDetail>();

    public virtual ICollection<TimeTableSetupDetailsHistory> TimeTableSetupDetailsHistories { get; set; } = new List<TimeTableSetupDetailsHistory>();

    public virtual ICollection<TimeTableSubstitutionDetail> TimeTableSubstitutionDetails { get; set; } = new List<TimeTableSubstitutionDetail>();

    public virtual ICollection<TimeTableSubstitutionDetailsHistory> TimeTableSubstitutionDetailsHistories { get; set; } = new List<TimeTableSubstitutionDetailsHistory>();

    public virtual ICollection<UserDetail> UserDetails { get; set; } = new List<UserDetail>();

    public virtual ICollection<VehicleExpenseDetail> VehicleExpenseDetails { get; set; } = new List<VehicleExpenseDetail>();

    public virtual ICollection<VehicleMaster> VehicleMasters { get; set; } = new List<VehicleMaster>();

    public virtual ICollection<VehicleTypeMaster> VehicleTypeMasters { get; set; } = new List<VehicleTypeMaster>();

    public virtual ICollection<VendorMaster> VendorMasters { get; set; } = new List<VendorMaster>();

    public virtual ICollection<VisitorMaster> VisitorMasters { get; set; } = new List<VisitorMaster>();

    public virtual ICollection<VoucherMaster> VoucherMasters { get; set; } = new List<VoucherMaster>();
}
