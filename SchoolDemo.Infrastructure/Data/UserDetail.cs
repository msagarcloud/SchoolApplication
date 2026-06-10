using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class UserDetail
{
    public Guid Id { get; set; }

    public string UserName { get; set; } = null!;

    public string UserPassword { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string EmailAddress { get; set; } = null!;

    public Guid DesignationId { get; set; }

    public Guid? UserRoleId { get; set; }

    public bool? IsSuperUser { get; set; }

    public Guid? CompanyId { get; set; }

    public Guid? SchoolId { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? Status { get; set; }

    public string? StatusMessage { get; set; }

    public virtual ICollection<AssesmentMaster> AssesmentMasterCreatedByNavigations { get; set; } = new List<AssesmentMaster>();

    public virtual ICollection<AssesmentMaster> AssesmentMasterModifiedByNavigations { get; set; } = new List<AssesmentMaster>();

    public virtual ICollection<AttendanceReasonMaster> AttendanceReasonMasterCreatedByNavigations { get; set; } = new List<AttendanceReasonMaster>();

    public virtual ICollection<AttendanceReasonMaster> AttendanceReasonMasterModifiedByNavigations { get; set; } = new List<AttendanceReasonMaster>();

    public virtual ICollection<Audit> Audits { get; set; } = new List<Audit>();

    public virtual ICollection<AuthorMaster> AuthorMasterCreatedByNavigations { get; set; } = new List<AuthorMaster>();

    public virtual ICollection<AuthorMaster> AuthorMasterModifiedByNavigations { get; set; } = new List<AuthorMaster>();

    public virtual ICollection<BillDetail> BillDetailCreatedByNavigations { get; set; } = new List<BillDetail>();

    public virtual ICollection<BillDetail> BillDetailModifiedByNavigations { get; set; } = new List<BillDetail>();

    public virtual ICollection<BillMaster> BillMasterCreatedByNavigations { get; set; } = new List<BillMaster>();

    public virtual ICollection<BillMaster> BillMasterModifiedByNavigations { get; set; } = new List<BillMaster>();

    public virtual ICollection<BloodGroupMaster> BloodGroupMasterCreatedByNavigations { get; set; } = new List<BloodGroupMaster>();

    public virtual ICollection<BloodGroupMaster> BloodGroupMasterModifiedByNavigations { get; set; } = new List<BloodGroupMaster>();

    public virtual ICollection<BookCategoryMaster> BookCategoryMasterCreatedByNavigations { get; set; } = new List<BookCategoryMaster>();

    public virtual ICollection<BookCategoryMaster> BookCategoryMasterModifiedByNavigations { get; set; } = new List<BookCategoryMaster>();

    public virtual ICollection<BookMaster> BookMasterCreatedByNavigations { get; set; } = new List<BookMaster>();

    public virtual ICollection<BookMaster> BookMasterModifiedByNavigations { get; set; } = new List<BookMaster>();

    public virtual ICollection<BookTransactionDetail> BookTransactionDetailCreatedByNavigations { get; set; } = new List<BookTransactionDetail>();

    public virtual ICollection<BookTransactionDetail> BookTransactionDetailModifiedByNavigations { get; set; } = new List<BookTransactionDetail>();

    public virtual ICollection<BookTransactionType> BookTransactionTypeCreatedByNavigations { get; set; } = new List<BookTransactionType>();

    public virtual ICollection<BookTransactionType> BookTransactionTypeModifiedByNavigations { get; set; } = new List<BookTransactionType>();

    public virtual ICollection<BookTypeMaster> BookTypeMasterCreatedByNavigations { get; set; } = new List<BookTypeMaster>();

    public virtual ICollection<BookTypeMaster> BookTypeMasterModifiedByNavigations { get; set; } = new List<BookTypeMaster>();

    public virtual ICollection<CategoryMaster> CategoryMasterCreatedByNavigations { get; set; } = new List<CategoryMaster>();

    public virtual ICollection<CategoryMaster> CategoryMasterModifiedByNavigations { get; set; } = new List<CategoryMaster>();

    public virtual ICollection<CityMaster> CityMasterCreatedByNavigations { get; set; } = new List<CityMaster>();

    public virtual ICollection<CityMaster> CityMasterModifiedByNavigations { get; set; } = new List<CityMaster>();

    public virtual ICollection<ClassMaster> ClassMasterCreatedByNavigations { get; set; } = new List<ClassMaster>();

    public virtual ICollection<ClassMaster> ClassMasterModifiedByNavigations { get; set; } = new List<ClassMaster>();

    public virtual ICollection<ClassRoomMaster> ClassRoomMasterCreatedByNavigations { get; set; } = new List<ClassRoomMaster>();

    public virtual ICollection<ClassRoomMaster> ClassRoomMasterModifiedByNavigations { get; set; } = new List<ClassRoomMaster>();

    public virtual ICollection<ClassScholasticDetail> ClassScholasticDetailCreatedByNavigations { get; set; } = new List<ClassScholasticDetail>();

    public virtual ICollection<ClassScholasticDetailHistory> ClassScholasticDetailHistoryCreatedByNavigations { get; set; } = new List<ClassScholasticDetailHistory>();

    public virtual ICollection<ClassScholasticDetailHistory> ClassScholasticDetailHistoryModifiedByNavigations { get; set; } = new List<ClassScholasticDetailHistory>();

    public virtual ICollection<ClassScholasticDetail> ClassScholasticDetailModifiedByNavigations { get; set; } = new List<ClassScholasticDetail>();

    public virtual ICollection<ClassSectionDetail> ClassSectionDetailCreatedByNavigations { get; set; } = new List<ClassSectionDetail>();

    public virtual ICollection<ClassSectionDetail> ClassSectionDetailModifiedByNavigations { get; set; } = new List<ClassSectionDetail>();

    public virtual ICollection<ClassSmstasksDetail> ClassSmstasksDetailCreatedByNavigations { get; set; } = new List<ClassSmstasksDetail>();

    public virtual ICollection<ClassSmstasksDetail> ClassSmstasksDetailModifiedByNavigations { get; set; } = new List<ClassSmstasksDetail>();

    public virtual ICollection<ClassSubjectDetail> ClassSubjectDetailCreatedByNavigations { get; set; } = new List<ClassSubjectDetail>();

    public virtual ICollection<ClassSubjectDetailHistory> ClassSubjectDetailHistoryCreatedByNavigations { get; set; } = new List<ClassSubjectDetailHistory>();

    public virtual ICollection<ClassSubjectDetailHistory> ClassSubjectDetailHistoryModifiedByNavigations { get; set; } = new List<ClassSubjectDetailHistory>();

    public virtual ICollection<ClassSubjectDetail> ClassSubjectDetailModifiedByNavigations { get; set; } = new List<ClassSubjectDetail>();

    public virtual CompanyMaster? Company { get; set; }

    public virtual ICollection<CompanyMaster> CompanyMasterCreatedByNavigations { get; set; } = new List<CompanyMaster>();

    public virtual ICollection<CompanyMaster> CompanyMasterModifiedByNavigations { get; set; } = new List<CompanyMaster>();

    public virtual ICollection<CountryMaster> CountryMasterCreatedByNavigations { get; set; } = new List<CountryMaster>();

    public virtual ICollection<CountryMaster> CountryMasterModifiedByNavigations { get; set; } = new List<CountryMaster>();

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<DeptDesigDetail> DeptDesigDetailCreatedByNavigations { get; set; } = new List<DeptDesigDetail>();

    public virtual ICollection<DeptDesigDetail> DeptDesigDetailModifiedByNavigations { get; set; } = new List<DeptDesigDetail>();

    public virtual ICollection<DeptMaster> DeptMasterCreatedByNavigations { get; set; } = new List<DeptMaster>();

    public virtual ICollection<DeptMaster> DeptMasterModifiedByNavigations { get; set; } = new List<DeptMaster>();

    public virtual ICollection<DesigGradeDetail> DesigGradeDetailCreatedByNavigations { get; set; } = new List<DesigGradeDetail>();

    public virtual ICollection<DesigGradeDetail> DesigGradeDetailModifiedByNavigations { get; set; } = new List<DesigGradeDetail>();

    public virtual ICollection<DesigMaster> DesigMasterCreatedByNavigations { get; set; } = new List<DesigMaster>();

    public virtual ICollection<DesigMaster> DesigMasterModifiedByNavigations { get; set; } = new List<DesigMaster>();

    public virtual DesigMaster Designation { get; set; } = null!;

    public virtual ICollection<DesignationGrade> DesignationGradeCreatedByNavigations { get; set; } = new List<DesignationGrade>();

    public virtual ICollection<DesignationGrade> DesignationGradeModifiedByNavigations { get; set; } = new List<DesignationGrade>();

    public virtual ICollection<DriverMaster> DriverMasterCreatedByNavigations { get; set; } = new List<DriverMaster>();

    public virtual ICollection<DriverMaster> DriverMasterModifiedByNavigations { get; set; } = new List<DriverMaster>();

    public virtual ICollection<DriverQualificationDetail> DriverQualificationDetailCreatedByNavigations { get; set; } = new List<DriverQualificationDetail>();

    public virtual ICollection<DriverQualificationDetail> DriverQualificationDetailModifiedByNavigations { get; set; } = new List<DriverQualificationDetail>();

    public virtual ICollection<EmpAttendanceDetail> EmpAttendanceDetailCreatedByNavigations { get; set; } = new List<EmpAttendanceDetail>();

    public virtual ICollection<EmpAttendanceDetail> EmpAttendanceDetailModifiedByNavigations { get; set; } = new List<EmpAttendanceDetail>();

    public virtual ICollection<EmpAttendanceDetailsHistory> EmpAttendanceDetailsHistoryCreatedByNavigations { get; set; } = new List<EmpAttendanceDetailsHistory>();

    public virtual ICollection<EmpAttendanceDetailsHistory> EmpAttendanceDetailsHistoryModifiedByNavigations { get; set; } = new List<EmpAttendanceDetailsHistory>();

    public virtual ICollection<EmpCatLeaveDetail> EmpCatLeaveDetailCreatedByNavigations { get; set; } = new List<EmpCatLeaveDetail>();

    public virtual ICollection<EmpCatLeaveDetail> EmpCatLeaveDetailModifiedByNavigations { get; set; } = new List<EmpCatLeaveDetail>();

    public virtual ICollection<EmpCatLeaveDetailsHistory> EmpCatLeaveDetailsHistoryCreatedByNavigations { get; set; } = new List<EmpCatLeaveDetailsHistory>();

    public virtual ICollection<EmpCatLeaveDetailsHistory> EmpCatLeaveDetailsHistoryModifiedByNavigations { get; set; } = new List<EmpCatLeaveDetailsHistory>();

    public virtual ICollection<EmpCategoryMaster> EmpCategoryMasterCreatedByNavigations { get; set; } = new List<EmpCategoryMaster>();

    public virtual ICollection<EmpCategoryMaster> EmpCategoryMasterModifiedByNavigations { get; set; } = new List<EmpCategoryMaster>();

    public virtual ICollection<EmpDocumentDetail> EmpDocumentDetailCreatedByNavigations { get; set; } = new List<EmpDocumentDetail>();

    public virtual ICollection<EmpDocumentDetail> EmpDocumentDetailModifiedByNavigations { get; set; } = new List<EmpDocumentDetail>();

    public virtual ICollection<EmpLeaveAvailDetail> EmpLeaveAvailDetailCreatedByNavigations { get; set; } = new List<EmpLeaveAvailDetail>();

    public virtual ICollection<EmpLeaveAvailDetail> EmpLeaveAvailDetailModifiedByNavigations { get; set; } = new List<EmpLeaveAvailDetail>();

    public virtual ICollection<EmpLeaveDetail> EmpLeaveDetailCreatedByNavigations { get; set; } = new List<EmpLeaveDetail>();

    public virtual ICollection<EmpLeaveDetail> EmpLeaveDetailModifiedByNavigations { get; set; } = new List<EmpLeaveDetail>();

    public virtual ICollection<EmpLeaveDetailsHistory> EmpLeaveDetailsHistoryCreatedByNavigations { get; set; } = new List<EmpLeaveDetailsHistory>();

    public virtual ICollection<EmpLeaveDetailsHistory> EmpLeaveDetailsHistoryModifiedByNavigations { get; set; } = new List<EmpLeaveDetailsHistory>();

    public virtual ICollection<EmpMaster> EmpMasterCreatedByNavigations { get; set; } = new List<EmpMaster>();

    public virtual ICollection<EmpMaster> EmpMasterModifiedByNavigations { get; set; } = new List<EmpMaster>();

    public virtual ICollection<EmpProfQualiDetail> EmpProfQualiDetailCreatedByNavigations { get; set; } = new List<EmpProfQualiDetail>();

    public virtual ICollection<EmpProfQualiDetail> EmpProfQualiDetailModifiedByNavigations { get; set; } = new List<EmpProfQualiDetail>();

    public virtual ICollection<EmpSalaryDetail> EmpSalaryDetailCreatedByNavigations { get; set; } = new List<EmpSalaryDetail>();

    public virtual ICollection<EmpSalaryDetail> EmpSalaryDetailModifiedByNavigations { get; set; } = new List<EmpSalaryDetail>();

    public virtual ICollection<EmpSalaryDetailsHistory> EmpSalaryDetailsHistoryCreatedByNavigations { get; set; } = new List<EmpSalaryDetailsHistory>();

    public virtual ICollection<EmpSalaryDetailsHistory> EmpSalaryDetailsHistoryModifiedByNavigations { get; set; } = new List<EmpSalaryDetailsHistory>();

    public virtual ICollection<EmpSalaryMaster> EmpSalaryMasterCreatedByNavigations { get; set; } = new List<EmpSalaryMaster>();

    public virtual ICollection<EmpSalaryMasterHistory> EmpSalaryMasterHistoryCreatedByNavigations { get; set; } = new List<EmpSalaryMasterHistory>();

    public virtual ICollection<EmpSalaryMasterHistory> EmpSalaryMasterHistoryModifiedByNavigations { get; set; } = new List<EmpSalaryMasterHistory>();

    public virtual ICollection<EmpSalaryMaster> EmpSalaryMasterModifiedByNavigations { get; set; } = new List<EmpSalaryMaster>();

    public virtual ICollection<EmpSalaryStructureDetail> EmpSalaryStructureDetailCreatedByNavigations { get; set; } = new List<EmpSalaryStructureDetail>();

    public virtual ICollection<EmpSalaryStructureDetail> EmpSalaryStructureDetailModifiedByNavigations { get; set; } = new List<EmpSalaryStructureDetail>();

    public virtual ICollection<EmpSalaryStructureDetailsHistory> EmpSalaryStructureDetailsHistoryCreatedByNavigations { get; set; } = new List<EmpSalaryStructureDetailsHistory>();

    public virtual ICollection<EmpSalaryStructureDetailsHistory> EmpSalaryStructureDetailsHistoryModifiedByNavigations { get; set; } = new List<EmpSalaryStructureDetailsHistory>();

    public virtual ICollection<EmpTypeMaster> EmpTypeMasterCreatedByNavigations { get; set; } = new List<EmpTypeMaster>();

    public virtual ICollection<EmpTypeMaster> EmpTypeMasterModifiedByNavigations { get; set; } = new List<EmpTypeMaster>();

    public virtual ICollection<Error> Errors { get; set; } = new List<Error>();

    public virtual ICollection<ExamCategoryMaster> ExamCategoryMasterCreatedByNavigations { get; set; } = new List<ExamCategoryMaster>();

    public virtual ICollection<ExamCategoryMaster> ExamCategoryMasterModifiedByNavigations { get; set; } = new List<ExamCategoryMaster>();

    public virtual ICollection<ExamUnitMaster> ExamUnitMasterCreatedByNavigations { get; set; } = new List<ExamUnitMaster>();

    public virtual ICollection<ExamUnitMaster> ExamUnitMasterModifiedByNavigations { get; set; } = new List<ExamUnitMaster>();

    public virtual ICollection<ExpenseCategoryMaster> ExpenseCategoryMasterCreatedByNavigations { get; set; } = new List<ExpenseCategoryMaster>();

    public virtual ICollection<ExpenseCategoryMaster> ExpenseCategoryMasterModifiedByNavigations { get; set; } = new List<ExpenseCategoryMaster>();

    public virtual ICollection<FeeClassDetail> FeeClassDetailCreatedByNavigations { get; set; } = new List<FeeClassDetail>();

    public virtual ICollection<FeeClassDetail> FeeClassDetailModifiedByNavigations { get; set; } = new List<FeeClassDetail>();

    public virtual ICollection<FeeClassDetailsHistory> FeeClassDetailsHistoryCreatedByNavigations { get; set; } = new List<FeeClassDetailsHistory>();

    public virtual ICollection<FeeClassDetailsHistory> FeeClassDetailsHistoryModifiedByNavigations { get; set; } = new List<FeeClassDetailsHistory>();

    public virtual ICollection<FeesCategoryMaster> FeesCategoryMasterCreatedByNavigations { get; set; } = new List<FeesCategoryMaster>();

    public virtual ICollection<FeesCategoryMaster> FeesCategoryMasterModifiedByNavigations { get; set; } = new List<FeesCategoryMaster>();

    public virtual ICollection<FeesDiscountCategoryMaster> FeesDiscountCategoryMasterCreatedByNavigations { get; set; } = new List<FeesDiscountCategoryMaster>();

    public virtual ICollection<FeesDiscountCategoryMaster> FeesDiscountCategoryMasterModifiedByNavigations { get; set; } = new List<FeesDiscountCategoryMaster>();

    public virtual ICollection<GenderMaster> GenderMasterCreatedByNavigations { get; set; } = new List<GenderMaster>();

    public virtual ICollection<GenderMaster> GenderMasterModifiedByNavigations { get; set; } = new List<GenderMaster>();

    public virtual ICollection<GradeMaster> GradeMasterCreatedByNavigations { get; set; } = new List<GradeMaster>();

    public virtual ICollection<GradeMaster> GradeMasterModifiedByNavigations { get; set; } = new List<GradeMaster>();

    public virtual ICollection<HolidayClassDetail> HolidayClassDetailCreatedByNavigations { get; set; } = new List<HolidayClassDetail>();

    public virtual ICollection<HolidayClassDetail> HolidayClassDetailModifiedByNavigations { get; set; } = new List<HolidayClassDetail>();

    public virtual ICollection<HolidayDeptDetail> HolidayDeptDetailCreatedByNavigations { get; set; } = new List<HolidayDeptDetail>();

    public virtual ICollection<HolidayDeptDetail> HolidayDeptDetailModifiedByNavigations { get; set; } = new List<HolidayDeptDetail>();

    public virtual ICollection<HolidayMaster> HolidayMasterCreatedByNavigations { get; set; } = new List<HolidayMaster>();

    public virtual ICollection<HolidayMaster> HolidayMasterModifiedByNavigations { get; set; } = new List<HolidayMaster>();

    public virtual ICollection<HolidayTypeMaster> HolidayTypeMasterCreatedByNavigations { get; set; } = new List<HolidayTypeMaster>();

    public virtual ICollection<HolidayTypeMaster> HolidayTypeMasterModifiedByNavigations { get; set; } = new List<HolidayTypeMaster>();

    public virtual ICollection<InventoryMaster> InventoryMasterCreatedByNavigations { get; set; } = new List<InventoryMaster>();

    public virtual ICollection<InventoryMaster> InventoryMasterModifiedByNavigations { get; set; } = new List<InventoryMaster>();

    public virtual ICollection<UserDetail> InverseCreatedByNavigation { get; set; } = new List<UserDetail>();

    public virtual ICollection<UserDetail> InverseModifiedByNavigation { get; set; } = new List<UserDetail>();

    public virtual ICollection<ItemLocationMaster> ItemLocationMasterCreatedByNavigations { get; set; } = new List<ItemLocationMaster>();

    public virtual ICollection<ItemLocationMaster> ItemLocationMasterModifiedByNavigations { get; set; } = new List<ItemLocationMaster>();

    public virtual ICollection<ItemMaster> ItemMasterCreatedByNavigations { get; set; } = new List<ItemMaster>();

    public virtual ICollection<ItemMaster> ItemMasterModifiedByNavigations { get; set; } = new List<ItemMaster>();

    public virtual ICollection<ItemTypeMaster> ItemTypeMasterCreatedByNavigations { get; set; } = new List<ItemTypeMaster>();

    public virtual ICollection<ItemTypeMaster> ItemTypeMasterModifiedByNavigations { get; set; } = new List<ItemTypeMaster>();

    public virtual ICollection<LeaveStatusMaster> LeaveStatusMasterCreatedByNavigations { get; set; } = new List<LeaveStatusMaster>();

    public virtual ICollection<LeaveStatusMaster> LeaveStatusMasterModifiedByNavigations { get; set; } = new List<LeaveStatusMaster>();

    public virtual ICollection<LeaveTypeMaster> LeaveTypeMasterCreatedByNavigations { get; set; } = new List<LeaveTypeMaster>();

    public virtual ICollection<LeaveTypeMaster> LeaveTypeMasterModifiedByNavigations { get; set; } = new List<LeaveTypeMaster>();

    public virtual ICollection<LocationMaster> LocationMasterCreatedByNavigations { get; set; } = new List<LocationMaster>();

    public virtual ICollection<LocationMaster> LocationMasterModifiedByNavigations { get; set; } = new List<LocationMaster>();

    public virtual ICollection<MaritalStatus> MaritalStatusCreatedByNavigations { get; set; } = new List<MaritalStatus>();

    public virtual ICollection<MaritalStatus> MaritalStatusModifiedByNavigations { get; set; } = new List<MaritalStatus>();

    public virtual ICollection<MarksGradeMaster> MarksGradeMasterCreatedByNavigations { get; set; } = new List<MarksGradeMaster>();

    public virtual ICollection<MarksGradeMaster> MarksGradeMasterModifiedByNavigations { get; set; } = new List<MarksGradeMaster>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual ICollection<NonTeachingMaster> NonTeachingMasterCreatedByNavigations { get; set; } = new List<NonTeachingMaster>();

    public virtual ICollection<NonTeachingMaster> NonTeachingMasterDeletedByNavigations { get; set; } = new List<NonTeachingMaster>();

    public virtual ICollection<NonTeachingMaster> NonTeachingMasterModifiedByNavigations { get; set; } = new List<NonTeachingMaster>();

    public virtual ICollection<NotificationReceiverMaster> NotificationReceiverMasterCreatedByNavigations { get; set; } = new List<NotificationReceiverMaster>();

    public virtual ICollection<NotificationReceiverMaster> NotificationReceiverMasterModifiedByNavigations { get; set; } = new List<NotificationReceiverMaster>();

    public virtual ICollection<ParentMaster> ParentMasterCreatedByNavigations { get; set; } = new List<ParentMaster>();

    public virtual ICollection<ParentMaster> ParentMasterModifiedByNavigations { get; set; } = new List<ParentMaster>();

    public virtual ICollection<PaymentModeMaster> PaymentModeMasterCreatedByNavigations { get; set; } = new List<PaymentModeMaster>();

    public virtual ICollection<PaymentModeMaster> PaymentModeMasterModifiedByNavigations { get; set; } = new List<PaymentModeMaster>();

    public virtual ICollection<PaymentTypeMode> PaymentTypeModeCreatedByNavigations { get; set; } = new List<PaymentTypeMode>();

    public virtual ICollection<PaymentTypeMode> PaymentTypeModeModifiedByNavigations { get; set; } = new List<PaymentTypeMode>();

    public virtual ICollection<PhoneCallMaster> PhoneCallMasterCreatedByNavigations { get; set; } = new List<PhoneCallMaster>();

    public virtual ICollection<PhoneCallMaster> PhoneCallMasterModifiedByNavigations { get; set; } = new List<PhoneCallMaster>();

    public virtual ICollection<Privilege> PrivilegeCreatedByNavigations { get; set; } = new List<Privilege>();

    public virtual ICollection<Privilege> PrivilegeModifiedByNavigations { get; set; } = new List<Privilege>();

    public virtual ICollection<ProfessionMaster> ProfessionMasterCreatedByNavigations { get; set; } = new List<ProfessionMaster>();

    public virtual ICollection<ProfessionMaster> ProfessionMasterModifiedByNavigations { get; set; } = new List<ProfessionMaster>();

    public virtual ICollection<PublisherMaster> PublisherMasterCreatedByNavigations { get; set; } = new List<PublisherMaster>();

    public virtual ICollection<PublisherMaster> PublisherMasterModifiedByNavigations { get; set; } = new List<PublisherMaster>();

    public virtual ICollection<QualificationMaster> QualificationMasterCreatedByNavigations { get; set; } = new List<QualificationMaster>();

    public virtual ICollection<QualificationMaster> QualificationMasterModifiedByNavigations { get; set; } = new List<QualificationMaster>();

    public virtual ICollection<RegistrationMaster> RegistrationMasterCreatedByNavigations { get; set; } = new List<RegistrationMaster>();

    public virtual ICollection<RegistrationMaster> RegistrationMasterModifiedByNavigations { get; set; } = new List<RegistrationMaster>();

    public virtual ICollection<RelationTypeMaster> RelationTypeMasterCreatedByNavigations { get; set; } = new List<RelationTypeMaster>();

    public virtual ICollection<RelationTypeMaster> RelationTypeMasterModifiedByNavigations { get; set; } = new List<RelationTypeMaster>();

    public virtual ICollection<ReligionMaster> ReligionMasterCreatedByNavigations { get; set; } = new List<ReligionMaster>();

    public virtual ICollection<ReligionMaster> ReligionMasterModifiedByNavigations { get; set; } = new List<ReligionMaster>();

    public virtual ICollection<RoleMaster> RoleMasterCreatedByNavigations { get; set; } = new List<RoleMaster>();

    public virtual ICollection<RoleMaster> RoleMasterModifiedByNavigations { get; set; } = new List<RoleMaster>();

    public virtual ICollection<RolePrivilege> RolePrivilegeCreatedByNavigations { get; set; } = new List<RolePrivilege>();

    public virtual ICollection<RolePrivilege> RolePrivilegeModifiedByNavigations { get; set; } = new List<RolePrivilege>();

    public virtual ICollection<RouteDetail> RouteDetailCreatedByNavigations { get; set; } = new List<RouteDetail>();

    public virtual ICollection<RouteDetail> RouteDetailModifiedByNavigations { get; set; } = new List<RouteDetail>();

    public virtual ICollection<RouteLocationMaster> RouteLocationMasterCreatedByNavigations { get; set; } = new List<RouteLocationMaster>();

    public virtual ICollection<RouteLocationMaster> RouteLocationMasterModifiedByNavigations { get; set; } = new List<RouteLocationMaster>();

    public virtual ICollection<RouteMaster> RouteMasterCreatedByNavigations { get; set; } = new List<RouteMaster>();

    public virtual ICollection<RouteMaster> RouteMasterModifiedByNavigations { get; set; } = new List<RouteMaster>();

    public virtual ICollection<RouteStopDetail> RouteStopDetailCreatedByNavigations { get; set; } = new List<RouteStopDetail>();

    public virtual ICollection<RouteStopDetail> RouteStopDetailModifiedByNavigations { get; set; } = new List<RouteStopDetail>();

    public virtual ICollection<SalaryCode> SalaryCodeCreatedByNavigations { get; set; } = new List<SalaryCode>();

    public virtual ICollection<SalaryCode> SalaryCodeModifiedByNavigations { get; set; } = new List<SalaryCode>();

    public virtual ICollection<SalaryDesigGradeDetail> SalaryDesigGradeDetailCreatedByNavigations { get; set; } = new List<SalaryDesigGradeDetail>();

    public virtual ICollection<SalaryDesigGradeDetail> SalaryDesigGradeDetailModifiedByNavigations { get; set; } = new List<SalaryDesigGradeDetail>();

    public virtual ICollection<SalaryDesigGradeDetailsHistory> SalaryDesigGradeDetailsHistoryCreatedByNavigations { get; set; } = new List<SalaryDesigGradeDetailsHistory>();

    public virtual ICollection<SalaryDesigGradeDetailsHistory> SalaryDesigGradeDetailsHistoryModifiedByNavigations { get; set; } = new List<SalaryDesigGradeDetailsHistory>();

    public virtual ICollection<SalaryHeadMaster> SalaryHeadMasterCreatedByNavigations { get; set; } = new List<SalaryHeadMaster>();

    public virtual ICollection<SalaryHeadMaster> SalaryHeadMasterModifiedByNavigations { get; set; } = new List<SalaryHeadMaster>();

    public virtual ICollection<SalaryType> SalaryTypeCreatedByNavigations { get; set; } = new List<SalaryType>();

    public virtual ICollection<SalaryTypeMaster> SalaryTypeMasterCreatedByNavigations { get; set; } = new List<SalaryTypeMaster>();

    public virtual ICollection<SalaryTypeMaster> SalaryTypeMasterModifiedByNavigations { get; set; } = new List<SalaryTypeMaster>();

    public virtual ICollection<SalaryType> SalaryTypeModifiedByNavigations { get; set; } = new List<SalaryType>();

    public virtual ICollection<ScholasticMaster> ScholasticMasterCreatedByNavigations { get; set; } = new List<ScholasticMaster>();

    public virtual ICollection<ScholasticMaster> ScholasticMasterModifiedByNavigations { get; set; } = new List<ScholasticMaster>();

    public virtual ICollection<ScholasticUnitDetail> ScholasticUnitDetailCreatedByNavigations { get; set; } = new List<ScholasticUnitDetail>();

    public virtual ICollection<ScholasticUnitDetail> ScholasticUnitDetailModifiedByNavigations { get; set; } = new List<ScholasticUnitDetail>();

    public virtual SchoolMaster? School { get; set; }

    public virtual ICollection<SchoolContactMaster> SchoolContactMasterCreatedByNavigations { get; set; } = new List<SchoolContactMaster>();

    public virtual ICollection<SchoolContactMaster> SchoolContactMasterModifiedByNavigations { get; set; } = new List<SchoolContactMaster>();

    public virtual ICollection<SchoolMaster> SchoolMasterCreatedByNavigations { get; set; } = new List<SchoolMaster>();

    public virtual ICollection<SchoolMaster> SchoolMasterModifiedByNavigations { get; set; } = new List<SchoolMaster>();

    public virtual ICollection<SectionMaster> SectionMasterCreatedByNavigations { get; set; } = new List<SectionMaster>();

    public virtual ICollection<SectionMaster> SectionMasterModifiedByNavigations { get; set; } = new List<SectionMaster>();

    public virtual ICollection<SessionMaster> SessionMasterCreatedByNavigations { get; set; } = new List<SessionMaster>();

    public virtual ICollection<SessionMaster> SessionMasterModifiedByNavigations { get; set; } = new List<SessionMaster>();

    public virtual ICollection<Smstask> SmstaskCreatedByNavigations { get; set; } = new List<Smstask>();

    public virtual ICollection<SmstaskHistory> SmstaskHistoryCreatedByNavigations { get; set; } = new List<SmstaskHistory>();

    public virtual ICollection<SmstaskHistory> SmstaskHistoryModifiedByNavigations { get; set; } = new List<SmstaskHistory>();

    public virtual ICollection<Smstask> SmstaskModifiedByNavigations { get; set; } = new List<Smstask>();

    public virtual ICollection<SmstaskSchedule> SmstaskScheduleCreatedByNavigations { get; set; } = new List<SmstaskSchedule>();

    public virtual ICollection<SmstaskSchedule> SmstaskScheduleModifiedByNavigations { get; set; } = new List<SmstaskSchedule>();

    public virtual ICollection<SmstaskSmtpDetail> SmstaskSmtpDetailCreatedByNavigations { get; set; } = new List<SmstaskSmtpDetail>();

    public virtual ICollection<SmstaskSmtpDetail> SmstaskSmtpDetailModifiedByNavigations { get; set; } = new List<SmstaskSmtpDetail>();

    public virtual ICollection<SmstaskStatusMaster> SmstaskStatusMasterCreatedByNavigations { get; set; } = new List<SmstaskStatusMaster>();

    public virtual ICollection<SmstaskStatusMaster> SmstaskStatusMasterModifiedByNavigations { get; set; } = new List<SmstaskStatusMaster>();

    public virtual ICollection<SmtpDetail> SmtpDetailCreatedByNavigations { get; set; } = new List<SmtpDetail>();

    public virtual ICollection<SmtpDetail> SmtpDetailModifiedByNavigations { get; set; } = new List<SmtpDetail>();

    public virtual ICollection<StateMaster> StateMasterCreatedByNavigations { get; set; } = new List<StateMaster>();

    public virtual ICollection<StateMaster> StateMasterModifiedByNavigations { get; set; } = new List<StateMaster>();

    public virtual ICollection<StudentAchievement> StudentAchievementCreatedByNavigations { get; set; } = new List<StudentAchievement>();

    public virtual ICollection<StudentAchievement> StudentAchievementModifiedByNavigations { get; set; } = new List<StudentAchievement>();

    public virtual ICollection<StudentAttendanceDetail> StudentAttendanceDetailCreatedByNavigations { get; set; } = new List<StudentAttendanceDetail>();

    public virtual ICollection<StudentAttendanceDetail> StudentAttendanceDetailModifiedByNavigations { get; set; } = new List<StudentAttendanceDetail>();

    public virtual ICollection<StudentCommentDetail> StudentCommentDetailCreatedByNavigations { get; set; } = new List<StudentCommentDetail>();

    public virtual ICollection<StudentCommentDetail> StudentCommentDetailModifiedByNavigations { get; set; } = new List<StudentCommentDetail>();

    public virtual ICollection<StudentCommentDetailsHistory> StudentCommentDetailsHistoryCreatedByNavigations { get; set; } = new List<StudentCommentDetailsHistory>();

    public virtual ICollection<StudentCommentDetailsHistory> StudentCommentDetailsHistoryModifiedByNavigations { get; set; } = new List<StudentCommentDetailsHistory>();

    public virtual ICollection<StudentFeeDetail> StudentFeeDetailCreatedByNavigations { get; set; } = new List<StudentFeeDetail>();

    public virtual ICollection<StudentFeeDetail> StudentFeeDetailModifiedByNavigations { get; set; } = new List<StudentFeeDetail>();

    public virtual ICollection<StudentFeeDetailsHistory> StudentFeeDetailsHistoryCreatedByNavigations { get; set; } = new List<StudentFeeDetailsHistory>();

    public virtual ICollection<StudentFeeDetailsHistory> StudentFeeDetailsHistoryModifiedByNavigations { get; set; } = new List<StudentFeeDetailsHistory>();

    public virtual ICollection<StudentGradeDetail> StudentGradeDetailCreatedByNavigations { get; set; } = new List<StudentGradeDetail>();

    public virtual ICollection<StudentGradeDetail> StudentGradeDetailModifiedByNavigations { get; set; } = new List<StudentGradeDetail>();

    public virtual ICollection<StudentGradeDetailsHistory> StudentGradeDetailsHistoryCreatedByNavigations { get; set; } = new List<StudentGradeDetailsHistory>();

    public virtual ICollection<StudentGradeDetailsHistory> StudentGradeDetailsHistoryModifiedByNavigations { get; set; } = new List<StudentGradeDetailsHistory>();

    public virtual ICollection<StudentMarksDetail> StudentMarksDetailCreatedByNavigations { get; set; } = new List<StudentMarksDetail>();

    public virtual ICollection<StudentMarksDetail> StudentMarksDetailModifiedByNavigations { get; set; } = new List<StudentMarksDetail>();

    public virtual ICollection<StudentMarksDetailsHistory> StudentMarksDetailsHistoryCreatedByNavigations { get; set; } = new List<StudentMarksDetailsHistory>();

    public virtual ICollection<StudentMarksDetailsHistory> StudentMarksDetailsHistoryModifiedByNavigations { get; set; } = new List<StudentMarksDetailsHistory>();

    public virtual ICollection<StudentMaster> StudentMasterCreatedByNavigations { get; set; } = new List<StudentMaster>();

    public virtual ICollection<StudentMasterHistory> StudentMasterHistoryCreatedByNavigations { get; set; } = new List<StudentMasterHistory>();

    public virtual ICollection<StudentMasterHistory> StudentMasterHistoryModifiedByNavigations { get; set; } = new List<StudentMasterHistory>();

    public virtual ICollection<StudentMaster> StudentMasterModifiedByNavigations { get; set; } = new List<StudentMaster>();

    public virtual ICollection<StudentReportCardDetail> StudentReportCardDetailCreatedByNavigations { get; set; } = new List<StudentReportCardDetail>();

    public virtual ICollection<StudentReportCardDetail> StudentReportCardDetailModifiedByNavigations { get; set; } = new List<StudentReportCardDetail>();

    public virtual ICollection<StudentReportCardDetailsHistory> StudentReportCardDetailsHistoryCreatedByNavigations { get; set; } = new List<StudentReportCardDetailsHistory>();

    public virtual ICollection<StudentReportCardDetailsHistory> StudentReportCardDetailsHistoryModifiedByNavigations { get; set; } = new List<StudentReportCardDetailsHistory>();

    public virtual ICollection<StudentReportCardMaster> StudentReportCardMasterCreatedByNavigations { get; set; } = new List<StudentReportCardMaster>();

    public virtual ICollection<StudentReportCardMasterHistory> StudentReportCardMasterHistoryCreatedByNavigations { get; set; } = new List<StudentReportCardMasterHistory>();

    public virtual ICollection<StudentReportCardMasterHistory> StudentReportCardMasterHistoryModifiedByNavigations { get; set; } = new List<StudentReportCardMasterHistory>();

    public virtual ICollection<StudentReportCardMaster> StudentReportCardMasterModifiedByNavigations { get; set; } = new List<StudentReportCardMaster>();

    public virtual ICollection<SubjectCategoryDetail> SubjectCategoryDetailCreatedByNavigations { get; set; } = new List<SubjectCategoryDetail>();

    public virtual ICollection<SubjectCategoryDetail> SubjectCategoryDetailModifiedByNavigations { get; set; } = new List<SubjectCategoryDetail>();

    public virtual ICollection<SubjectCategoryDetailsHistory> SubjectCategoryDetailsHistoryCreatedByNavigations { get; set; } = new List<SubjectCategoryDetailsHistory>();

    public virtual ICollection<SubjectCategoryDetailsHistory> SubjectCategoryDetailsHistoryModifiedByNavigations { get; set; } = new List<SubjectCategoryDetailsHistory>();

    public virtual ICollection<SubjectMaster> SubjectMasterCreatedByNavigations { get; set; } = new List<SubjectMaster>();

    public virtual ICollection<SubjectMaster> SubjectMasterModifiedByNavigations { get; set; } = new List<SubjectMaster>();

    public virtual ICollection<SupplierMaster> SupplierMasterCreatedByNavigations { get; set; } = new List<SupplierMaster>();

    public virtual ICollection<SupplierMaster> SupplierMasterModifiedByNavigations { get; set; } = new List<SupplierMaster>();

    public virtual ICollection<SystemParameter> SystemParameterCreatedByNavigations { get; set; } = new List<SystemParameter>();

    public virtual ICollection<SystemParameter> SystemParameterModifiedByNavigations { get; set; } = new List<SystemParameter>();

    public virtual ICollection<TeacherClassDetail> TeacherClassDetailCreatedByNavigations { get; set; } = new List<TeacherClassDetail>();

    public virtual ICollection<TeacherClassDetail> TeacherClassDetailModifiedByNavigations { get; set; } = new List<TeacherClassDetail>();

    public virtual ICollection<TeacherDocumentDetail> TeacherDocumentDetailCreatedByNavigations { get; set; } = new List<TeacherDocumentDetail>();

    public virtual ICollection<TeacherDocumentDetail> TeacherDocumentDetailModifiedByNavigations { get; set; } = new List<TeacherDocumentDetail>();

    public virtual ICollection<TeacherMaster> TeacherMasterCreatedByNavigations { get; set; } = new List<TeacherMaster>();

    public virtual ICollection<TeacherMaster> TeacherMasterModifiedByNavigations { get; set; } = new List<TeacherMaster>();

    public virtual ICollection<TeacherQualificationDetail> TeacherQualificationDetailCreatedByNavigations { get; set; } = new List<TeacherQualificationDetail>();

    public virtual ICollection<TeacherQualificationDetail> TeacherQualificationDetailModifiedByNavigations { get; set; } = new List<TeacherQualificationDetail>();

    public virtual ICollection<TeacherSectionDetail> TeacherSectionDetailCreatedByNavigations { get; set; } = new List<TeacherSectionDetail>();

    public virtual ICollection<TeacherSectionDetail> TeacherSectionDetailModifiedByNavigations { get; set; } = new List<TeacherSectionDetail>();

    public virtual ICollection<TeacherSubjectDetail> TeacherSubjectDetailCreatedByNavigations { get; set; } = new List<TeacherSubjectDetail>();

    public virtual ICollection<TeacherSubjectDetail> TeacherSubjectDetailModifiedByNavigations { get; set; } = new List<TeacherSubjectDetail>();

    public virtual ICollection<TimeTableClassPeriodDetail> TimeTableClassPeriodDetailCreatedByNavigations { get; set; } = new List<TimeTableClassPeriodDetail>();

    public virtual ICollection<TimeTableClassPeriodDetail> TimeTableClassPeriodDetailModifiedByNavigations { get; set; } = new List<TimeTableClassPeriodDetail>();

    public virtual ICollection<TimeTableClassPeriodDetailsHistory> TimeTableClassPeriodDetailsHistoryCreatedByNavigations { get; set; } = new List<TimeTableClassPeriodDetailsHistory>();

    public virtual ICollection<TimeTableClassPeriodDetailsHistory> TimeTableClassPeriodDetailsHistoryModifiedByNavigations { get; set; } = new List<TimeTableClassPeriodDetailsHistory>();

    public virtual ICollection<TimeTableDetailsHistory> TimeTableDetailsHistoryCreatedByNavigations { get; set; } = new List<TimeTableDetailsHistory>();

    public virtual ICollection<TimeTableDetailsHistory> TimeTableDetailsHistoryModifiedByNavigations { get; set; } = new List<TimeTableDetailsHistory>();

    public virtual ICollection<TimeTablePeriodMaster> TimeTablePeriodMasterCreatedByNavigations { get; set; } = new List<TimeTablePeriodMaster>();

    public virtual ICollection<TimeTablePeriodMaster> TimeTablePeriodMasterModifiedByNavigations { get; set; } = new List<TimeTablePeriodMaster>();

    public virtual ICollection<TimeTableSession> TimeTableSessionCreatedByNavigations { get; set; } = new List<TimeTableSession>();

    public virtual ICollection<TimeTableSession> TimeTableSessionModifiedByNavigations { get; set; } = new List<TimeTableSession>();

    public virtual ICollection<TimeTableSetupDetail> TimeTableSetupDetailCreatedByNavigations { get; set; } = new List<TimeTableSetupDetail>();

    public virtual ICollection<TimeTableSetupDetail> TimeTableSetupDetailModifiedByNavigations { get; set; } = new List<TimeTableSetupDetail>();

    public virtual ICollection<TimeTableSetupDetailsHistory> TimeTableSetupDetailsHistoryCreatedByNavigations { get; set; } = new List<TimeTableSetupDetailsHistory>();

    public virtual ICollection<TimeTableSetupDetailsHistory> TimeTableSetupDetailsHistoryModifiedByNavigations { get; set; } = new List<TimeTableSetupDetailsHistory>();

    public virtual ICollection<TimeTableSubstitutionDetail> TimeTableSubstitutionDetailCreatedByNavigations { get; set; } = new List<TimeTableSubstitutionDetail>();

    public virtual ICollection<TimeTableSubstitutionDetail> TimeTableSubstitutionDetailModifiedByNavigations { get; set; } = new List<TimeTableSubstitutionDetail>();

    public virtual ICollection<TimeTableSubstitutionDetailsHistory> TimeTableSubstitutionDetailsHistoryCreatedByNavigations { get; set; } = new List<TimeTableSubstitutionDetailsHistory>();

    public virtual ICollection<TimeTableSubstitutionDetailsHistory> TimeTableSubstitutionDetailsHistoryModifiedByNavigations { get; set; } = new List<TimeTableSubstitutionDetailsHistory>();

    public virtual RoleMaster? UserRole { get; set; }

    public virtual ICollection<VehicleExpenseDetail> VehicleExpenseDetailCreatedByNavigations { get; set; } = new List<VehicleExpenseDetail>();

    public virtual ICollection<VehicleExpenseDetail> VehicleExpenseDetailModifiedByNavigations { get; set; } = new List<VehicleExpenseDetail>();

    public virtual ICollection<VehicleMaster> VehicleMasterCreatedByNavigations { get; set; } = new List<VehicleMaster>();

    public virtual ICollection<VehicleMaster> VehicleMasterModifiedByNavigations { get; set; } = new List<VehicleMaster>();

    public virtual ICollection<VehicleTypeMaster> VehicleTypeMasterCreatedByNavigations { get; set; } = new List<VehicleTypeMaster>();

    public virtual ICollection<VehicleTypeMaster> VehicleTypeMasterModifiedByNavigations { get; set; } = new List<VehicleTypeMaster>();

    public virtual ICollection<VendorMaster> VendorMasterCreatedByNavigations { get; set; } = new List<VendorMaster>();

    public virtual ICollection<VendorMaster> VendorMasterModifiedByNavigations { get; set; } = new List<VendorMaster>();

    public virtual ICollection<VisitorMaster> VisitorMasterCreatedByNavigations { get; set; } = new List<VisitorMaster>();

    public virtual ICollection<VisitorMaster> VisitorMasterModifiedByNavigations { get; set; } = new List<VisitorMaster>();

    public virtual ICollection<VoucherMaster> VoucherMasterCreatedByNavigations { get; set; } = new List<VoucherMaster>();

    public virtual ICollection<VoucherMaster> VoucherMasterModifiedByNavigations { get; set; } = new List<VoucherMaster>();
}
