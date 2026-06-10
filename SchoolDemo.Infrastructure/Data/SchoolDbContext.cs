using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Infrastructure.Data;

public partial class SchoolDbContext : DbContext
{
    public SchoolDbContext()
    {
    }

    public SchoolDbContext(DbContextOptions<SchoolDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AcademicYear> AcademicYears { get; set; }

    public virtual DbSet<AssesmentMaster> AssesmentMasters { get; set; }

    public virtual DbSet<AttendanceReasonMaster> AttendanceReasonMasters { get; set; }

    public virtual DbSet<Audit> Audits { get; set; }

    public virtual DbSet<AuditType> AuditTypes { get; set; }

    public virtual DbSet<AuthorMaster> AuthorMasters { get; set; }

    public virtual DbSet<BillDetail> BillDetails { get; set; }

    public virtual DbSet<BillMaster> BillMasters { get; set; }

    public virtual DbSet<BloodGroupMaster> BloodGroupMasters { get; set; }

    public virtual DbSet<BookCategoryMaster> BookCategoryMasters { get; set; }

    public virtual DbSet<BookMaster> BookMasters { get; set; }

    public virtual DbSet<BookTransactionDetail> BookTransactionDetails { get; set; }

    public virtual DbSet<BookTransactionType> BookTransactionTypes { get; set; }

    public virtual DbSet<BookTypeMaster> BookTypeMasters { get; set; }

    public virtual DbSet<CategoryMaster> CategoryMasters { get; set; }

    public virtual DbSet<CityMaster> CityMasters { get; set; }

    public virtual DbSet<ClassMaster> ClassMasters { get; set; }

    public virtual DbSet<ClassRoomMaster> ClassRoomMasters { get; set; }

    public virtual DbSet<ClassScholasticDetail> ClassScholasticDetails { get; set; }

    public virtual DbSet<ClassScholasticDetailHistory> ClassScholasticDetailHistories { get; set; }

    public virtual DbSet<ClassSectionDetail> ClassSectionDetails { get; set; }

    public virtual DbSet<ClassSmstasksDetail> ClassSmstasksDetails { get; set; }

    public virtual DbSet<ClassSubjectDetail> ClassSubjectDetails { get; set; }

    public virtual DbSet<ClassSubjectDetailHistory> ClassSubjectDetailHistories { get; set; }

    public virtual DbSet<CleanerMaster> CleanerMasters { get; set; }

    public virtual DbSet<CompanyMaster> CompanyMasters { get; set; }

    public virtual DbSet<CountryMaster> CountryMasters { get; set; }

    public virtual DbSet<DeptDesigDetail> DeptDesigDetails { get; set; }

    public virtual DbSet<DeptMaster> DeptMasters { get; set; }

    public virtual DbSet<DesigGradeDetail> DesigGradeDetails { get; set; }

    public virtual DbSet<DesigMaster> DesigMasters { get; set; }

    public virtual DbSet<DesignationGrade> DesignationGrades { get; set; }

    public virtual DbSet<DriverMaster> DriverMasters { get; set; }

    public virtual DbSet<DriverQualificationDetail> DriverQualificationDetails { get; set; }

    public virtual DbSet<EmpAttendanceDetail> EmpAttendanceDetails { get; set; }

    public virtual DbSet<EmpAttendanceDetailsHistory> EmpAttendanceDetailsHistories { get; set; }

    public virtual DbSet<EmpCatLeaveDetail> EmpCatLeaveDetails { get; set; }

    public virtual DbSet<EmpCatLeaveDetailsHistory> EmpCatLeaveDetailsHistories { get; set; }

    public virtual DbSet<EmpCategoryMaster> EmpCategoryMasters { get; set; }

    // Domain entity DbSets
    public virtual DbSet<SchoolDemo.Domain.Entities.CleanerMaster> CleanerMasterDomain { get; set; }
    public virtual DbSet<SchoolDemo.Domain.Entities.EmpCategoryMaster> EmpCategoryMasterDomain { get; set; }
    public virtual DbSet<SchoolDemo.Domain.Entities.DeptMaster> DeptMasterDomain { get; set; }
    public virtual DbSet<SchoolDemo.Domain.Entities.DesigMaster> DesigMasterDomain { get; set; }
    public virtual DbSet<SchoolDemo.Domain.Entities.EmpTypeMaster> EmpTypeMasterDomain { get; set; }
    public virtual DbSet<SchoolDemo.Domain.Entities.TransportAssignment> TransportAssignmentDomain { get; set; }
    public virtual DbSet<SchoolDemo.Domain.Entities.TransportSetting> TransportSettingDomain { get; set; }
    public virtual DbSet<SchoolDemo.Domain.Entities.TransportHelp> TransportHelpDomain { get; set; }

    public virtual DbSet<EmpDocumentDetail> EmpDocumentDetails { get; set; }

    public virtual DbSet<EmpLeaveAvailDetail> EmpLeaveAvailDetails { get; set; }

    public virtual DbSet<EmpLeaveDetail> EmpLeaveDetails { get; set; }

    public virtual DbSet<EmpLeaveDetailsHistory> EmpLeaveDetailsHistories { get; set; }

    public virtual DbSet<EmpMaster> EmpMasters { get; set; }

    public virtual DbSet<EmpProfQualiDetail> EmpProfQualiDetails { get; set; }

    public virtual DbSet<EmpSalaryDetail> EmpSalaryDetails { get; set; }

    public virtual DbSet<EmpSalaryDetailsHistory> EmpSalaryDetailsHistories { get; set; }

    public virtual DbSet<EmpSalaryMaster> EmpSalaryMasters { get; set; }

    public virtual DbSet<EmpSalaryMasterHistory> EmpSalaryMasterHistories { get; set; }

    public virtual DbSet<EmpSalaryStructureDetail> EmpSalaryStructureDetails { get; set; }

    public virtual DbSet<EmpSalaryStructureDetailsHistory> EmpSalaryStructureDetailsHistories { get; set; }

    public virtual DbSet<EmpTypeMaster> EmpTypeMasters { get; set; }

    public virtual DbSet<EnquiryMaster> EnquiryMasters { get; set; }

    public virtual DbSet<Error> Errors { get; set; }

    public virtual DbSet<ErrorDetail> ErrorDetails { get; set; }

    public virtual DbSet<ErrorType> ErrorTypes { get; set; }

    public virtual DbSet<ExamCategoryMaster> ExamCategoryMasters { get; set; }

    public virtual DbSet<ExamUnitMaster> ExamUnitMasters { get; set; }

    public virtual DbSet<ExpenseCategoryMaster> ExpenseCategoryMasters { get; set; }

    public virtual DbSet<FeeClassDetail> FeeClassDetails { get; set; }

    public virtual DbSet<FeeClassDetailsHistory> FeeClassDetailsHistories { get; set; }

    public virtual DbSet<FeesCategoryMaster> FeesCategoryMasters { get; set; }

    public virtual DbSet<FeesDiscountCategoryMaster> FeesDiscountCategoryMasters { get; set; }

    public virtual DbSet<GenderMaster> GenderMasters { get; set; }

    public virtual DbSet<GradeMaster> GradeMasters { get; set; }

    public virtual DbSet<HolidayClassDetail> HolidayClassDetails { get; set; }

    public virtual DbSet<HolidayDeptDetail> HolidayDeptDetails { get; set; }

    public virtual DbSet<HolidayMaster> HolidayMasters { get; set; }

    public virtual DbSet<HolidayTypeMaster> HolidayTypeMasters { get; set; }

    public virtual DbSet<HouseMaster> HouseMasters { get; set; }

    public virtual DbSet<InventoryMaster> InventoryMasters { get; set; }

    public virtual DbSet<ItemLocationMaster> ItemLocationMasters { get; set; }

    public virtual DbSet<ItemMaster> ItemMasters { get; set; }

    public virtual DbSet<ItemTypeMaster> ItemTypeMasters { get; set; }

    public virtual DbSet<LeaveStatusMaster> LeaveStatusMasters { get; set; }

    public virtual DbSet<LeaveTypeMaster> LeaveTypeMasters { get; set; }

    public virtual DbSet<LocationMaster> LocationMasters { get; set; }

    public virtual DbSet<MaritalStatus> MaritalStatuses { get; set; }

    public virtual DbSet<MarksGradeMaster> MarksGradeMasters { get; set; }

    public virtual DbSet<MenuMaster> MenuMasters { get; set; }

    public virtual DbSet<RoleMenuMapping> RoleMenuMappings { get; set; }

    public virtual DbSet<NonTeachingMaster> NonTeachingMasters { get; set; }

    public virtual DbSet<NotificationReceiverMaster> NotificationReceiverMasters { get; set; }

    public virtual DbSet<ParentMaster> ParentMasters { get; set; }

    public virtual DbSet<PaymentModeMaster> PaymentModeMasters { get; set; }

    public virtual DbSet<PaymentTypeMode> PaymentTypeModes { get; set; }

    public virtual DbSet<PhoneCallMaster> PhoneCallMasters { get; set; }

    public virtual DbSet<Privilege> Privileges { get; set; }

    public virtual DbSet<ProfessionMaster> ProfessionMasters { get; set; }

    public virtual DbSet<PublisherMaster> PublisherMasters { get; set; }

    public virtual DbSet<QualificationMaster> QualificationMasters { get; set; }

    public virtual DbSet<RegistrationMaster> RegistrationMasters { get; set; }

    public virtual DbSet<RelationTypeMaster> RelationTypeMasters { get; set; }

    public virtual DbSet<ReligionMaster> ReligionMasters { get; set; }

    public virtual DbSet<RoleMaster> RoleMasters { get; set; }

    public virtual DbSet<RolePrivilege> RolePrivileges { get; set; }

    public virtual DbSet<RouteDetail> RouteDetails { get; set; }

    public virtual DbSet<RouteLocationMaster> RouteLocationMasters { get; set; }

    public virtual DbSet<RouteMaster> RouteMasters { get; set; }

    public virtual DbSet<RouteStopDetail> RouteStopDetails { get; set; }

    public virtual DbSet<SalaryCode> SalaryCodes { get; set; }

    public virtual DbSet<SalaryDesigGradeDetail> SalaryDesigGradeDetails { get; set; }

    public virtual DbSet<SalaryDesigGradeDetailsHistory> SalaryDesigGradeDetailsHistories { get; set; }

    public virtual DbSet<SalaryHeadMaster> SalaryHeadMasters { get; set; }

    public virtual DbSet<SalaryType> SalaryTypes { get; set; }

    public virtual DbSet<SalaryTypeMaster> SalaryTypeMasters { get; set; }

    public virtual DbSet<ScholasticMaster> ScholasticMasters { get; set; }

    public virtual DbSet<ScholasticUnitDetail> ScholasticUnitDetails { get; set; }

    public virtual DbSet<SchoolBoard> SchoolBoards { get; set; }

    public virtual DbSet<SchoolContactMaster> SchoolContactMasters { get; set; }

    public virtual DbSet<SchoolMaster> SchoolMasters { get; set; }

    public virtual DbSet<SectionMaster> SectionMasters { get; set; }

    public virtual DbSet<SessionMaster> SessionMasters { get; set; }

    public virtual DbSet<Smstask> Smstasks { get; set; }

    public virtual DbSet<SmstaskHistory> SmstaskHistories { get; set; }

    public virtual DbSet<SmstaskSchedule> SmstaskSchedules { get; set; }

    public virtual DbSet<SmstaskSmtpDetail> SmstaskSmtpDetails { get; set; }

    public virtual DbSet<SmstaskStatusMaster> SmstaskStatusMasters { get; set; }

    public virtual DbSet<SmtpDetail> SmtpDetails { get; set; }

    public virtual DbSet<StateMaster> StateMasters { get; set; }

    public virtual DbSet<StudentAchievement> StudentAchievements { get; set; }

    public virtual DbSet<StudentAttendanceDetail> StudentAttendanceDetails { get; set; }

    public virtual DbSet<StudentCommentDetail> StudentCommentDetails { get; set; }

    public virtual DbSet<StudentCommentDetailsHistory> StudentCommentDetailsHistories { get; set; }

    public virtual DbSet<StudentFeeDetail> StudentFeeDetails { get; set; }

    public virtual DbSet<StudentFeeDetailsHistory> StudentFeeDetailsHistories { get; set; }

    public virtual DbSet<StudentGradeDetail> StudentGradeDetails { get; set; }

    public virtual DbSet<StudentGradeDetailsHistory> StudentGradeDetailsHistories { get; set; }

    public virtual DbSet<StudentMarksDetail> StudentMarksDetails { get; set; }

    public virtual DbSet<StudentMarksDetailsHistory> StudentMarksDetailsHistories { get; set; }

    public virtual DbSet<StudentMaster> StudentMasters { get; set; }

    public virtual DbSet<StudentMasterHistory> StudentMasterHistories { get; set; }

    public virtual DbSet<StudentReportCardDetail> StudentReportCardDetails { get; set; }

    public virtual DbSet<StudentReportCardDetailsHistory> StudentReportCardDetailsHistories { get; set; }

    public virtual DbSet<StudentReportCardMaster> StudentReportCardMasters { get; set; }

    public virtual DbSet<StudentReportCardMasterHistory> StudentReportCardMasterHistories { get; set; }

    public virtual DbSet<SubjectCategoryDetail> SubjectCategoryDetails { get; set; }

    public virtual DbSet<SubjectCategoryDetailsHistory> SubjectCategoryDetailsHistories { get; set; }

    public virtual DbSet<SubjectMaster> SubjectMasters { get; set; }

    public virtual DbSet<SupplierMaster> SupplierMasters { get; set; }

    public virtual DbSet<SystemParameter> SystemParameters { get; set; }

    public virtual DbSet<TeacherClassDetail> TeacherClassDetails { get; set; }

    public virtual DbSet<TeacherDocumentDetail> TeacherDocumentDetails { get; set; }

    public virtual DbSet<TeacherMaster> TeacherMasters { get; set; }

    public virtual DbSet<TeacherQualificationDetail> TeacherQualificationDetails { get; set; }

    public virtual DbSet<TeacherSectionDetail> TeacherSectionDetails { get; set; }

    public virtual DbSet<TeacherSubjectDetail> TeacherSubjectDetails { get; set; }

    public virtual DbSet<TimeTableClassPeriodDetail> TimeTableClassPeriodDetails { get; set; }

    public virtual DbSet<TimeTableClassPeriodDetailsHistory> TimeTableClassPeriodDetailsHistories { get; set; }

    public virtual DbSet<TimeTableDetailsHistory> TimeTableDetailsHistories { get; set; }

    public virtual DbSet<TimeTablePeriodMaster> TimeTablePeriodMasters { get; set; }

    public virtual DbSet<TimeTableSession> TimeTableSessions { get; set; }

    public virtual DbSet<TimeTableSetupDetail> TimeTableSetupDetails { get; set; }

    public virtual DbSet<TimeTableSetupDetailsHistory> TimeTableSetupDetailsHistories { get; set; }

    public virtual DbSet<TimeTableSubstitutionDetail> TimeTableSubstitutionDetails { get; set; }

    public virtual DbSet<TimeTableSubstitutionDetailsHistory> TimeTableSubstitutionDetailsHistories { get; set; }

    public virtual DbSet<UserDetail> UserDetails { get; set; }

    public virtual DbSet<VehicleExpenseDetail> VehicleExpenseDetails { get; set; }

    public virtual DbSet<VehicleMaster> VehicleMasters { get; set; }

    public virtual DbSet<VehicleTypeMaster> VehicleTypeMasters { get; set; }

    public virtual DbSet<VendorMaster> VendorMasters { get; set; }

    public virtual DbSet<VisitorMaster> VisitorMasters { get; set; }

    public virtual DbSet<VoucherMaster> VoucherMasters { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AcademicYear>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Academic__3214EC07841ADF8F");

            entity.ToTable("AcademicYear");

            entity.HasIndex(e => e.AcademicYearName, "UQ_AcademicYear_AcademicYearName").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.AcademicYearName).HasMaxLength(100);
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<AssesmentMaster>(entity =>
        {
            entity.ToTable("AssesmentMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.FromPeriod).HasColumnType("datetime");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.PercentageWeightage).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasDefaultValue("INC")
                .IsFixedLength();
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.ToPeriod).HasColumnType("datetime");

            entity.HasOne(d => d.Company).WithMany(p => p.AssesmentMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Assesment__Compa__3BCADD1B");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.AssesmentMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Assesment__Creat__3DB3258D");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.AssesmentMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK__Assesment__Modif__3F9B6DFF");

            entity.HasOne(d => d.School).WithMany(p => p.AssesmentMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Assesment__Schoo__4183B671");
        });

        modelBuilder.Entity<AttendanceReasonMaster>(entity =>
        {
            entity.ToTable("AttendanceReasonMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Code)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasDefaultValue("INC")
                .IsFixedLength();
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.AttendanceReasonMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AttendanceReasonMaster_CompanyID");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.AttendanceReasonMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AttendanceReasonMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.AttendanceReasonMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_AttendanceReasonMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.AttendanceReasonMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AttendanceReasonMaster_SchoolID");
        });

        modelBuilder.Entity<Audit>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Audit_AuditID");

            entity.ToTable("Audit");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.AfterValue)
                .HasMaxLength(1000)
                .IsUnicode(false);
            entity.Property(e => e.BeforeValue)
                .HasMaxLength(1000)
                .IsUnicode(false);
            entity.Property(e => e.ChangeDate).HasColumnType("datetime");
            entity.Property(e => e.ChangeUserId).HasColumnName("ChangeUserID");
            entity.Property(e => e.DeviceName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FieldName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Message)
                .HasMaxLength(4000)
                .IsUnicode(false);
            entity.Property(e => e.Note)
                .HasMaxLength(4000)
                .IsUnicode(false);

            entity.HasOne(d => d.ChangeUser).WithMany(p => p.Audits)
                .HasForeignKey(d => d.ChangeUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Audit__ChangeUse__4924D839");

            entity.HasOne(d => d.Company).WithMany(p => p.Audits)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK__Audit__CompanyId__4B0D20AB");

            entity.HasOne(d => d.School).WithMany(p => p.Audits)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK__Audit__SchoolId__4CF5691D");
        });

        modelBuilder.Entity<AuditType>(entity =>
        {
            entity.ToTable("AuditType");

            entity.HasIndex(e => e.Name, "UQ_AuditType_Name").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.Category)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.AuditTypes)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK__AuditType__Compa__4EDDB18F");

            entity.HasOne(d => d.School).WithMany(p => p.AuditTypes)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK__AuditType__Schoo__50C5FA01");
        });

        modelBuilder.Entity<AuthorMaster>(entity =>
        {
            entity.ToTable("AuthorMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Address1)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Address2)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Mobile)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.ZipCode)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.City).WithMany(p => p.AuthorMasters)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AuthorMaster_CityId");

            entity.HasOne(d => d.Company).WithMany(p => p.AuthorMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AuthorMaster_CompanyID");

            entity.HasOne(d => d.Country).WithMany(p => p.AuthorMasters)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AuthorMaster_CountryId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.AuthorMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AuthorMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.AuthorMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_AuthorMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.AuthorMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AuthorMaster_SchoolID");

            entity.HasOne(d => d.State).WithMany(p => p.AuthorMasters)
                .HasForeignKey(d => d.StateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AuthorMaster_StateId");
        });

        modelBuilder.Entity<BillDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Bill).WithMany(p => p.BillDetails)
                .HasForeignKey(d => d.BillId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BillDetails_BillMaster");

            entity.HasOne(d => d.Company).WithMany(p => p.BillDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BillDetails_CompanyID");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.BillDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BillDetails_CreatedBy");

            entity.HasOne(d => d.ExpenseCategory).WithMany(p => p.BillDetails)
                .HasForeignKey(d => d.ExpenseCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BillDetails_ExpenseCategoryId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.BillDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_BillDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.BillDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BillDetails_SchoolID");
        });

        modelBuilder.Entity<BillMaster>(entity =>
        {
            entity.ToTable("BillMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.BillAmount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.BillDate).HasColumnType("datetime");
            entity.Property(e => e.BillDueDate).HasColumnType("datetime");
            entity.Property(e => e.BillNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.TaxAmount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.TotalBillAmount).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Company).WithMany(p => p.BillMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BillMaster_CompanyID");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.BillMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BillMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.BillMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_BillMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.BillMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BillMaster_SchoolID");

            entity.HasOne(d => d.Vehicle).WithMany(p => p.BillMasters)
                .HasForeignKey(d => d.VehicleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BillMaster_VehicleId");

            entity.HasOne(d => d.Vendor).WithMany(p => p.BillMasters)
                .HasForeignKey(d => d.VendorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BillMaster_VendorId");
        });

        modelBuilder.Entity<BloodGroupMaster>(entity =>
        {
            entity.ToTable("BloodGroupMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.BloodGroupMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BloodGroupMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.BloodGroupMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_BloodGroupMaster_ModifiedBy");
        });

        modelBuilder.Entity<BookCategoryMaster>(entity =>
        {
            entity.ToTable("BookCategoryMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Description)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.BookCategoryMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_BookCategoryMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.BookCategoryMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookCategoryMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.BookCategoryMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_BookCategoryMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.BookCategoryMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookCategoryMaster_SchoolID");
        });

        modelBuilder.Entity<BookMaster>(entity =>
        {
            entity.ToTable("BookMaster");

            entity.HasIndex(e => e.Isbnnumber, "UQ_BookMaster_ISBNNumber").IsUnique();

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.AccessionNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CallNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Code)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Edition)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Image)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Isbnnumber)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("ISBNNumber");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.PublishingDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.Title)
                .HasMaxLength(150)
                .IsUnicode(false);

            entity.HasOne(d => d.Author).WithMany(p => p.BookMasters)
                .HasForeignKey(d => d.AuthorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookMaster_AuthorMaster");

            entity.HasOne(d => d.Category).WithMany(p => p.BookMasters)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookMaster_BookCategoryMaster");

            entity.HasOne(d => d.Company).WithMany(p => p.BookMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookMaster_CompanyID");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.BookMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.BookMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_BookMaster_ModifiedBy");

            entity.HasOne(d => d.Publisher).WithMany(p => p.BookMasters)
                .HasForeignKey(d => d.PublisherId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookMaster_PublisherId");

            entity.HasOne(d => d.School).WithMany(p => p.BookMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookMaster_SchoolID");

            entity.HasOne(d => d.Supplier).WithMany(p => p.BookMasters)
                .HasForeignKey(d => d.SupplierId)
                .HasConstraintName("FK_BookMaster_SupplierId");

            entity.HasOne(d => d.Type).WithMany(p => p.BookMasters)
                .HasForeignKey(d => d.TypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookMaster_BookTypeMaster");
        });

        modelBuilder.Entity<BookTransactionDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.ActualReturnDate).HasColumnType("datetime");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.FinePerDay).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.IssueDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.ReturnDueDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Book).WithMany(p => p.BookTransactionDetails)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookTransactionDetails_BookMaster");

            entity.HasOne(d => d.BookTransactionType).WithMany(p => p.BookTransactionDetails)
                .HasForeignKey(d => d.BookTransactionTypeId)
                .HasConstraintName("FK_BookTransactionDetails_BookTransactionType");

            entity.HasOne(d => d.ClassMaster).WithMany(p => p.BookTransactionDetails)
                .HasForeignKey(d => d.ClassMasterId)
                .HasConstraintName("FK_BookTransactionDeatils_ClassMasterID");

            entity.HasOne(d => d.Company).WithMany(p => p.BookTransactionDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookTransactionDeatils_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.BookTransactionDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookTransactionDeatils_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.BookTransactionDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_BookTransactionDeatils_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.BookTransactionDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookTransactionDeatils_SchoolId");

            entity.HasOne(d => d.SectionMaster).WithMany(p => p.BookTransactionDetails)
                .HasForeignKey(d => d.SectionMasterId)
                .HasConstraintName("FK_BookTransactionDeatils_SectionMasterID");
        });

        modelBuilder.Entity<BookTransactionType>(entity =>
        {
            entity.ToTable("BookTransactionType");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.TransactionType)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.BookTransactionTypes)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_BookTransactionType_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.BookTransactionTypeCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookTransactionType_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.BookTransactionTypeModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_BookTransactionType_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.BookTransactionTypes)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookTransactionType_SchoolId");
        });

        modelBuilder.Entity<BookTypeMaster>(entity =>
        {
            entity.ToTable("BookTypeMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Description)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.BookTypeMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookTypeMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.BookTypeMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookTypeMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.BookTypeMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_BookTypeMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.BookTypeMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookTypeMaster_SchoolId");
        });

        modelBuilder.Entity<CategoryMaster>(entity =>
        {
            entity.ToTable("CategoryMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.CategoryMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CategoryMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.CategoryMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_CategoryMaster_ModifiedBy");
        });

        modelBuilder.Entity<CityMaster>(entity =>
        {
            entity.ToTable("CityMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CityName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(250)
                .IsUnicode(false);

            entity.HasOne(d => d.CityState).WithMany(p => p.CityMasters)
                .HasForeignKey(d => d.CityStateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CityMaster_CityStateID");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.CityMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CityMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.CityMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_CityMaster_ModifiedBy");
        });

        modelBuilder.Entity<ClassMaster>(entity =>
        {
            entity.ToTable("ClassMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ExamAssessment)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.ClassMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_ClassMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ClassMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ClassMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_ClassMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.ClassMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassMaster_SchoolId");
        });

        modelBuilder.Entity<ClassRoomMaster>(entity =>
        {
            entity.ToTable("ClassRoomMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.ClassRoomMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassRoomMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ClassRoomMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassRoomMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ClassRoomMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_ClassRoomMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.ClassRoomMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassRoomMaster_SchoolId");
        });

        modelBuilder.Entity<ClassScholasticDetail>(entity =>
        {
            entity.ToTable("ClassScholasticDetail");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.ClassMaster).WithMany(p => p.ClassScholasticDetails)
                .HasForeignKey(d => d.ClassMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassScholasticDetail_ClassMaster");

            entity.HasOne(d => d.Company).WithMany(p => p.ClassScholasticDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassScholasticDetail_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ClassScholasticDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassScholasticDetail_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ClassScholasticDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_ClassScholasticDetail_ModifiedBy");

            entity.HasOne(d => d.Scholastic).WithMany(p => p.ClassScholasticDetails)
                .HasForeignKey(d => d.ScholasticId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassScholasticDetail_ScholasticId");

            entity.HasOne(d => d.School).WithMany(p => p.ClassScholasticDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassScholasticDetail_SchoolId");
        });

        modelBuilder.Entity<ClassScholasticDetailHistory>(entity =>
        {
            entity.ToTable("ClassScholasticDetailHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.ClassMaster).WithMany(p => p.ClassScholasticDetailHistories)
                .HasForeignKey(d => d.ClassMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassScholasticDetailHistory_ClassMasterId");

            entity.HasOne(d => d.Company).WithMany(p => p.ClassScholasticDetailHistories)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassScholasticDetailHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ClassScholasticDetailHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassScholasticDetailHistory_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ClassScholasticDetailHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_ClassScholasticDetailHistory_ModifiedBy");

            entity.HasOne(d => d.Scholastics).WithMany(p => p.ClassScholasticDetailHistories)
                .HasForeignKey(d => d.ScholasticsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassScholasticDetailHistory_ScholasticsId");

            entity.HasOne(d => d.School).WithMany(p => p.ClassScholasticDetailHistories)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassScholasticDetailHistory_SchoolId");

            entity.HasOne(d => d.Session).WithMany(p => p.ClassScholasticDetailHistories)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassScholasticDetailHistory_SessionId");
        });

        modelBuilder.Entity<ClassSectionDetail>(entity =>
        {
            entity.ToTable("ClassSectionDetail");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.ClassMaster).WithMany(p => p.ClassSectionDetails)
                .HasForeignKey(d => d.ClassMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSectionDetail_ClassMaster");

            entity.HasOne(d => d.Company).WithMany(p => p.ClassSectionDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSectionDetail_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ClassSectionDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSectionDetail_CreatedBy");

            entity.HasOne(d => d.Location).WithMany(p => p.ClassSectionDetails)
                .HasForeignKey(d => d.LocationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSectionDetail_LocationId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ClassSectionDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_ClassSectionDetail_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.ClassSectionDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSectionDetail_SchoolId");

            entity.HasOne(d => d.SectionMaster).WithMany(p => p.ClassSectionDetails)
                .HasForeignKey(d => d.SectionMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSectionDetail_SectionMaster");
        });

        modelBuilder.Entity<ClassSmstasksDetail>(entity =>
        {
            entity.ToTable("ClassSMSTasksDetails");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.ClassMaster).WithMany(p => p.ClassSmstasksDetails)
                .HasForeignKey(d => d.ClassMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSMSTasksDetails_ClassMasterId");

            entity.HasOne(d => d.Company).WithMany(p => p.ClassSmstasksDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSMSTasksDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ClassSmstasksDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSMSTasksDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ClassSmstasksDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_ClassSMSTasksDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.ClassSmstasksDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSMSTasksDetails_SchoolId");

            entity.HasOne(d => d.SectionMaster).WithMany(p => p.ClassSmstasksDetails)
                .HasForeignKey(d => d.SectionMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSMSTasksDetails_SectionMasterId");

            entity.HasOne(d => d.Task).WithMany(p => p.ClassSmstasksDetails)
                .HasForeignKey(d => d.TaskId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSMSTasksDetails_TaskId");
        });

        modelBuilder.Entity<ClassSubjectDetail>(entity =>
        {
            entity.ToTable("ClassSubjectDetail");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.ClassMaster).WithMany(p => p.ClassSubjectDetails)
                .HasForeignKey(d => d.ClassMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSubjectDetail_ClassMaster");

            entity.HasOne(d => d.Company).WithMany(p => p.ClassSubjectDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSubjectDetail_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ClassSubjectDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSubjectDetail_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ClassSubjectDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_ClassSubjectDetail_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.ClassSubjectDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSubjectDetail_SchoolId");

            entity.HasOne(d => d.Subject).WithMany(p => p.ClassSubjectDetails)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSubjectDetail_SubjectMaster");
        });

        modelBuilder.Entity<ClassSubjectDetailHistory>(entity =>
        {
            entity.ToTable("ClassSubjectDetailHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.ClassMaster).WithMany(p => p.ClassSubjectDetailHistories)
                .HasForeignKey(d => d.ClassMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSubjectDetailHistory_ClassMasterId");

            entity.HasOne(d => d.Company).WithMany(p => p.ClassSubjectDetailHistories)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSubjectDetailHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ClassSubjectDetailHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSubjectDetailHistory_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ClassSubjectDetailHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_ClassSubjectDetailHistory_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.ClassSubjectDetailHistories)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSubjectDetailHistory_SchoolId");

            entity.HasOne(d => d.Session).WithMany(p => p.ClassSubjectDetailHistories)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSubjectDetailHistory_SessionId");

            entity.HasOne(d => d.Subject).WithMany(p => p.ClassSubjectDetailHistories)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassSubjectDetailHistory_SubjectId");
        });

        modelBuilder.Entity<CleanerMaster>(entity =>
        {
            entity.ToTable("CleanerMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.FatherName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Image)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
        });

        modelBuilder.Entity<CompanyMaster>(entity =>
        {
            entity.ToTable("CompanyMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Address)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.CompanyName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.EstablishmentYear)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ZipCode)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.City).WithMany(p => p.CompanyMasterCities)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CompanyMaster_CityID");

            entity.HasOne(d => d.Country).WithMany(p => p.CompanyMasters)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CompanyMaster_CountryID");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.CompanyMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CompanyMaster_CreatedBy");

            entity.HasOne(d => d.JudistrictionAreaNavigation).WithMany(p => p.CompanyMasterJudistrictionAreaNavigations)
                .HasForeignKey(d => d.JudistrictionArea)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CompanyMaster_JudistrictionArea");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.CompanyMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_CompanyMaster_ModifiedBy");

            entity.HasOne(d => d.State).WithMany(p => p.CompanyMasters)
                .HasForeignKey(d => d.StateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CompanyMaster_StateID");
        });

        modelBuilder.Entity<CountryMaster>(entity =>
        {
            entity.ToTable("CountryMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CountryName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(250)
                .IsUnicode(false);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.CountryMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CountryMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.CountryMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_CountryMaster_ModifiedBy");
        });

        modelBuilder.Entity<DeptDesigDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.DeptDesigDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DeptDesigDetails_CompanyID");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.DeptDesigDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DeptDesigDetails_CreatedID");

            entity.HasOne(d => d.Department).WithMany(p => p.DeptDesigDetails)
                .HasForeignKey(d => d.DepartmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DeptDesigDetails_DepartmentId");

            entity.HasOne(d => d.Designation).WithMany(p => p.DeptDesigDetails)
                .HasForeignKey(d => d.DesignationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DeptDesigDetails_DesigMaster");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.DeptDesigDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_DeptDesigDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.DeptDesigDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DeptDesigDetails_SchoolID");
        });

        modelBuilder.Entity<DeptMaster>(entity =>
        {
            entity.ToTable("DeptMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.DeptCode)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.DeptName)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.DeptMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DeptMaster_CompanyID");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.DeptMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DeptMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.DeptMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_DeptMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.DeptMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DeptMaster_SchoolID");
        });

        modelBuilder.Entity<DesigGradeDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.DesigGradeDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DesigGradeDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.DesigGradeDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DesigGradeDetails_CreatedBy");

            entity.HasOne(d => d.Designation).WithMany(p => p.DesigGradeDetails)
                .HasForeignKey(d => d.DesignationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DesigGradeDetails_DesigMaster");

            entity.HasOne(d => d.Grade).WithMany(p => p.DesigGradeDetails)
                .HasForeignKey(d => d.GradeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DesigGradeDetails_GradeMaster");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.DesigGradeDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_DesigGradeDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.DesigGradeDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DesigGradeDetails_SchoolId");
        });

        modelBuilder.Entity<DesigMaster>(entity =>
        {
            entity.ToTable("DesigMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Code)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.DesigMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_DesigMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.DesigMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DesigMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.DesigMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_DesigMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.DesigMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DesigMaster_SchoolID");
        });

        modelBuilder.Entity<DesignationGrade>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Designat__3214EC074F8624B6");

            entity.ToTable("DesignationGrade");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Details)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Grade)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.DesignationGradeCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Designati__Creat__5B0E7E4A");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.DesignationGradeModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK__Designati__Modif__5CF6C6BC");
        });

        modelBuilder.Entity<DriverMaster>(entity =>
        {
            entity.ToTable("DriverMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FathersName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MothersName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.DateOfBirth).HasColumnType("datetime");
            entity.Property(e => e.LicenceIssueDate).HasColumnType("datetime");
            entity.Property(e => e.LicenceValidUptoDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.City).WithMany(p => p.DriverMasters)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DriverMaster_CityId");

            entity.HasOne(d => d.Company).WithMany(p => p.DriverMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DriverMaster_CompanyId");

            entity.HasOne(d => d.Country).WithMany(p => p.DriverMasters)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DriverMaster_CountryId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.DriverMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DriverMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.DriverMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_DriverMaster_ModifiedBy");

            entity.HasOne(d => d.Qualification).WithMany(p => p.DriverMasters)
                .HasForeignKey(d => d.QualificationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DriverMaster_QualificationId");

            entity.HasOne(d => d.School).WithMany(p => p.DriverMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DriverMaster_SchoolId");

            entity.HasOne(d => d.State).WithMany(p => p.DriverMasters)
                .HasForeignKey(d => d.StateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DriverMaster_StateId");
        });

        modelBuilder.Entity<DriverQualificationDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.DriverQualificationDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DriverQualificationDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.DriverQualificationDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DriverQualificationDetails_CreatedBy");

            entity.HasOne(d => d.Driver).WithMany(p => p.DriverQualificationDetails)
                .HasForeignKey(d => d.DriverId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DriverQualificationDetails_DriverId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.DriverQualificationDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_DriverQualificationDetails_ModifiedBy");

            entity.HasOne(d => d.Qualification).WithMany(p => p.DriverQualificationDetails)
                .HasForeignKey(d => d.QualificationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DriverQualificationDetails_QualificationId");

            entity.HasOne(d => d.School).WithMany(p => p.DriverQualificationDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DriverQualificationDetails_SchoolId");
        });

        modelBuilder.Entity<EmpAttendanceDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_EMPAttendanceDetails");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.AttendenceDate).HasColumnType("datetime");
            entity.Property(e => e.AttendenceTime)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.AttendenceLeaveType).WithMany(p => p.EmpAttendanceDetails)
                .HasForeignKey(d => d.AttendenceLeaveTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpAttendanceDetails_AttendenceLeaveTypeId");

            entity.HasOne(d => d.Company).WithMany(p => p.InverseCompany)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpAttendanceDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.EmpAttendanceDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpAttendanceDetails_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmpAttendanceDetails)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpAttendanceDetails_EmployeeId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.EmpAttendanceDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_EmpAttendanceDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.EmpAttendanceDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpAttendanceDetails_SchoolId");
        });

        modelBuilder.Entity<EmpAttendanceDetailsHistory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_EMPAttendanceDetailsHistory");

            entity.ToTable("EmpAttendanceDetailsHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.AttendenceDate).HasColumnType("datetime");
            entity.Property(e => e.AttendenceTime)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.AttendenceLeaveType).WithMany(p => p.EmpAttendanceDetailsHistories)
                .HasForeignKey(d => d.AttendenceLeaveTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpAttendanceDetailsHistory_AttendenceLeaveTypeId");

            entity.HasOne(d => d.Company).WithMany(p => p.InverseCompany)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpAttendanceDetailsHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.EmpAttendanceDetailsHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpAttendanceDetailsHistory_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmpAttendanceDetailsHistories)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpAttendanceDetailsHistory_EmployeeId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.EmpAttendanceDetailsHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_EmpAttendanceDetailsHistory_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.EmpAttendanceDetailsHistories)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpAttendanceDetailsHistory_SchoolId");
        });

        modelBuilder.Entity<EmpCatLeaveDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.TotalLeaves).HasColumnType("decimal(18, 1)");

            entity.HasOne(d => d.Company).WithMany(p => p.EmpCatLeaveDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpCatLeaveDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.EmpCatLeaveDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpCatLeaveDetails_CreatedBy");

            entity.HasOne(d => d.EmpCatLeaveCategory).WithMany(p => p.EmpCatLeaveDetailEmpCatLeaveCategories)
                .HasForeignKey(d => d.EmpCatLeaveCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpCatLeaveDetails_EmpCatLeaveCategoryId");

            entity.HasOne(d => d.LeaveType).WithMany(p => p.EmpCatLeaveDetailLeaveTypes)
                .HasForeignKey(d => d.LeaveTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpCatLeaveDetails_LeaveTypeId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.EmpCatLeaveDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_EmpCatLeaveDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.EmpCatLeaveDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpCatLeaveDetails_SchoolId");

            entity.HasOne(d => d.SessionNavigation).WithMany(p => p.EmpCatLeaveDetails)
                .HasForeignKey(d => d.Session)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_EmpCatLeaveDetails_SessionId");
        });

        modelBuilder.Entity<EmpCatLeaveDetailsHistory>(entity =>
        {
            entity.ToTable("EmpCatLeaveDetailsHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.TotalLeaves).HasColumnType("decimal(18, 1)");

            entity.HasOne(d => d.Company).WithMany(p => p.EmpCatLeaveDetailsHistories)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpCatLeaveDetailsHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.EmpCatLeaveDetailsHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpCatLeaveDetailsHistory_CreatedBy");

            entity.HasOne(d => d.EmpCatLeaveCategory).WithMany(p => p.EmpCatLeaveDetailsHistoryEmpCatLeaveCategories)
                .HasForeignKey(d => d.EmpCatLeaveCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpCatLeaveDetailsHistory_EmpCatLeaveCategoryId");

            entity.HasOne(d => d.LeaveType).WithMany(p => p.EmpCatLeaveDetailsHistoryLeaveTypes)
                .HasForeignKey(d => d.LeaveTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpCatLeaveDetailsHistory_LeaveTypeId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.EmpCatLeaveDetailsHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_EmpCatLeaveDetailsHistory_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.EmpCatLeaveDetailsHistories)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpCatLeaveDetailsHistory_SchoolId");

            entity.HasOne(d => d.SessionNavigation).WithMany(p => p.EmpCatLeaveDetailsHistories)
                .HasForeignKey(d => d.Session)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_EmpCatLeaveDetailsHistory_SessionId");
        });

        modelBuilder.Entity<EmpCategoryMaster>(entity =>
        {
            entity.ToTable("EmpCategoryMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CategoryDescription)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.CategoryName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.EmpCategoryMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpCategoryMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.EmpCategoryMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpCategoryMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.EmpCategoryMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_EmpCategoryMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.EmpCategoryMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpCategoryMaster_SchoolId");
        });

        modelBuilder.Entity<EmpDocumentDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.DocumentName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FileName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.EmpDocumentDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpDocumentDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.EmpDocumentDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpDocumentDetails_CreatedBy");

            entity.HasOne(d => d.Empoyee).WithMany(p => p.EmpDocumentDetails)
                .HasForeignKey(d => d.EmpoyeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpDocumentDetails_EmpMaster");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.EmpDocumentDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_EmpDocumentDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.EmpDocumentDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpDocumentDetails_SchoolId");
        });

        modelBuilder.Entity<EmpLeaveAvailDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Address1)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Address2)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ApplyDate).HasColumnType("datetime");
            entity.Property(e => e.ContactNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.EndDate).HasColumnType("datetime");
            entity.Property(e => e.LeaveReason)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.StartDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.TotalDays).HasColumnType("decimal(18, 1)");
            entity.Property(e => e.ZipCode)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.City).WithMany(p => p.EmpLeaveAvailDetails)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveAvailDetails_CityMaster");

            entity.HasOne(d => d.Company).WithMany(p => p.EmpLeaveAvailDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveAvailDetails_CompanyId");

            entity.HasOne(d => d.Country).WithMany(p => p.EmpLeaveAvailDetails)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveAvailDetails_CountryMaster");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.EmpLeaveAvailDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveAvailDetails_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmpLeaveAvailDetails)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_EmpLeaveAvailDetails_EmployeeId");

            entity.HasOne(d => d.LeaveType).WithMany(p => p.EmpLeaveAvailDetails)
                .HasForeignKey(d => d.LeaveTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveAvailDetails_LeaveTypeMaster");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.EmpLeaveAvailDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_EmpLeaveAvailDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.EmpLeaveAvailDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveAvailDetails_SchoolId");

            entity.HasOne(d => d.SessionNavigation).WithMany(p => p.EmpLeaveAvailDetails)
                .HasForeignKey(d => d.Session)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveAvailDetails_SessionId");

            entity.HasOne(d => d.State).WithMany(p => p.EmpLeaveAvailDetails)
                .HasForeignKey(d => d.StateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveAvailDetails_StateMaster");
        });

        modelBuilder.Entity<EmpLeaveDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.CurrentBalance).HasColumnType("decimal(18, 1)");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.PreviousYearBalance).HasColumnType("decimal(18, 1)");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.TotalLeaves).HasColumnType("decimal(18, 1)");

            entity.HasOne(d => d.Category).WithMany(p => p.EmpLeaveDetails)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveDetails_EmpCategoryMaster");

            entity.HasOne(d => d.Company).WithMany(p => p.EmpLeaveDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.EmpLeaveDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveDetails_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmpLeaveDetails)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveDetails_EmpMaster");

            entity.HasOne(d => d.LeaveType).WithMany(p => p.EmpLeaveDetails)
                .HasForeignKey(d => d.LeaveTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_EmpLeaveDetails_LeaveTypeId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.EmpLeaveDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_EmpLeaveDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.EmpLeaveDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveDetails_SchoolId");

            entity.HasOne(d => d.Session).WithMany(p => p.EmpLeaveDetails)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveDetails_SessionId");
        });

        modelBuilder.Entity<EmpLeaveDetailsHistory>(entity =>
        {
            entity.ToTable("EmpLeaveDetailsHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.CurrentBalance).HasColumnType("decimal(18, 1)");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.PreviousYearBalance).HasColumnType("decimal(18, 1)");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.TotalLeaves).HasColumnType("decimal(18, 1)");

            entity.HasOne(d => d.Category).WithMany(p => p.EmpLeaveDetailsHistories)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveDetailsHistory_CategoryId");

            entity.HasOne(d => d.Company).WithMany(p => p.EmpLeaveDetailsHistories)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveDetailsHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.EmpLeaveDetailsHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveDetailsHistory_CreatedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmpLeaveDetailsHistories)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveDetailsHistory_EmployeeId");

            entity.HasOne(d => d.LeaveType).WithMany(p => p.EmpLeaveDetailsHistories)
                .HasForeignKey(d => d.LeaveTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveDetailsHistory_LeaveTypeId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.EmpLeaveDetailsHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_EmpLeaveDetailsHistory_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.EmpLeaveDetailsHistories)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveDetailsHistory_SchoolId");

            entity.HasOne(d => d.Session).WithMany(p => p.EmpLeaveDetailsHistories)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpLeaveDetailsHistory_SessionId");
        });

        modelBuilder.Entity<EmpMaster>(entity =>
        {
            entity.ToTable("EmpMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.AadhaarNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.BankAccountNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.BankName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ConfirmationDate).HasColumnType("datetime");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.CurrentAddress1)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.CurrentAddress2)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.CurrentZipCode)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.DateOfLeaving).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Dob)
                .HasColumnType("datetime")
                .HasColumnName("DOB");
            entity.Property(e => e.Doj)
                .HasColumnType("datetime")
                .HasColumnName("DOJ");
            entity.Property(e => e.EmailId)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Esicnumber)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("ESICNumber");
            entity.Property(e => e.FathersName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Image)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LicenceDescription)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.LicenceImage)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.LicenceIssueDate).HasColumnType("datetime");
            entity.Property(e => e.LicenceNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LicenceType)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LicenceValidUpto).HasColumnType("datetime");
            entity.Property(e => e.MaritalStatus)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.MobileNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.MothersName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Pannumber)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("PANNumber");
            entity.Property(e => e.PermanentAddress1)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.PermanentAddress2)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.PermanentZipCode)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Pfnumeber)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("PFNumeber");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PrevioudSchoolCompany)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ProbationStartDate).HasColumnType("datetime");
            entity.Property(e => e.Salutation)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.SstuptoClass).HasColumnName("SSTUptoClass");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.YearsOfExperience)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.BloodGroup).WithMany(p => p.EmpMasters)
                .HasForeignKey(d => d.BloodGroupId)
                .HasConstraintName("FK_EmpMaster_BloodGroupId");

            entity.HasOne(d => d.Category).WithMany(p => p.EmpMasterCategories)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK_EmpMaster_CategoryId");

            entity.HasOne(d => d.Company).WithMany(p => p.EmpMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.EmpMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpMaster_CreatedBy");

            entity.HasOne(d => d.CurrentCity).WithMany(p => p.EmpMasterCurrentCities)
                .HasForeignKey(d => d.CurrentCityId)
                .HasConstraintName("FK_EmpMaster_CurrentCityId");

            entity.HasOne(d => d.CurrentCountry).WithMany(p => p.EmpMasterCurrentCountries)
                .HasForeignKey(d => d.CurrentCountryId)
                .HasConstraintName("FK_EmpMaster_CurrentCountryId");

            entity.HasOne(d => d.CurrentState).WithMany(p => p.EmpMasterCurrentStates)
                .HasForeignKey(d => d.CurrentStateId)
                .HasConstraintName("FK_EmpMaster_CurrentStateId");

            entity.HasOne(d => d.Department).WithMany(p => p.EmpMasters)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK_EmpMaster_DeptMaster");

            entity.HasOne(d => d.Designation).WithMany(p => p.EmpMasters)
                .HasForeignKey(d => d.DesignationId)
                .HasConstraintName("FK_EmpMaster_DesigMaster");

            entity.HasOne(d => d.EmployeeCategory).WithMany(p => p.EmpMasterEmployeeCategories)
                .HasForeignKey(d => d.EmployeeCategoryId)
                .HasConstraintName("FK_EmpMaster_EmployeeCategoryId");

            entity.HasOne(d => d.EmployeeType).WithMany(p => p.EmpMasters)
                .HasForeignKey(d => d.EmployeeTypeId)
                .HasConstraintName("FK_EmpMaster_EmployeeTypeId");

            entity.HasOne(d => d.Gender).WithMany(p => p.EmpMasters)
                .HasForeignKey(d => d.GenderId)
                .HasConstraintName("FK_EmpMaster_GenderId");

            entity.HasOne(d => d.Grade).WithMany(p => p.EmpMasters)
                .HasForeignKey(d => d.GradeId)
                .HasConstraintName("FK_EmpMaster_GradeId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.EmpMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_EmpMaster_ModifiedBy");

            entity.HasOne(d => d.PaymentMode).WithMany(p => p.EmpMasters)
                .HasForeignKey(d => d.PaymentModeId)
                .HasConstraintName("fk_EmpMaster_PaymentModeId");

            entity.HasOne(d => d.PermanentCity).WithMany(p => p.EmpMasterPermanentCities)
                .HasForeignKey(d => d.PermanentCityId)
                .HasConstraintName("FK_EmpMaster_PermanentCityId");

            entity.HasOne(d => d.PermanentCountry).WithMany(p => p.EmpMasterPermanentCountries)
                .HasForeignKey(d => d.PermanentCountryId)
                .HasConstraintName("FK_EmpMaster_PermanentCountryId");

            entity.HasOne(d => d.PermanentState).WithMany(p => p.EmpMasterPermanentStates)
                .HasForeignKey(d => d.PermanentStateId)
                .HasConstraintName("FK_EmpMaster_PermanentStateId");

            entity.HasOne(d => d.School).WithMany(p => p.EmpMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpMaster_SchoolId");
        });

        modelBuilder.Entity<EmpProfQualiDetail>(entity =>
        {
            entity.HasKey(e => new { e.EmployeeId, e.QualificationId });

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.EmpProfQualiDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpProfQualiDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.EmpProfQualiDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpProfQualiDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.EmpProfQualiDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_EmpProfQualiDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.EmpProfQualiDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpProfQualiDetails_SchoolId");
        });

        modelBuilder.Entity<EmpSalaryDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.SalaryDescription)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.Value).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Company).WithMany(p => p.EmpSalaryDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.EmpSalaryDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryDetails_CreatedBy");

            entity.HasOne(d => d.DesignationGrade).WithMany(p => p.EmpSalaryDetails)
                .HasForeignKey(d => d.DesignationGradeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_EmpSalaryDetails_DesignationGradeId");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmpSalaryDetails)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryDetails_EmployeeId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.EmpSalaryDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_EmpSalaryDetails_ModifiedBy");

            entity.HasOne(d => d.SalaryCode).WithMany(p => p.EmpSalaryDetails)
                .HasForeignKey(d => d.SalaryCodeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_EmpSalaryDetails_SalaryCodeId");

            entity.HasOne(d => d.SalaryHeadMaster).WithMany(p => p.EmpSalaryDetails)
                .HasForeignKey(d => d.SalaryHeadMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryDetails_SalaryHeadMasterId");

            entity.HasOne(d => d.SalaryType).WithMany(p => p.EmpSalaryDetails)
                .HasForeignKey(d => d.SalaryTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_EmpSalaryDetails_SalaryTypeId");

            entity.HasOne(d => d.School).WithMany(p => p.EmpSalaryDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryDetails_SchoolId");
        });

        modelBuilder.Entity<EmpSalaryDetailsHistory>(entity =>
        {
            entity.ToTable("EmpSalaryDetailsHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.SalaryDescription)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.Value).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Company).WithMany(p => p.EmpSalaryDetailsHistories)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryDetailsHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.EmpSalaryDetailsHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryDetailsHistory_CreatedBy");

            entity.HasOne(d => d.DesignationGrade).WithMany(p => p.EmpSalaryDetailsHistories)
                .HasForeignKey(d => d.DesignationGradeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_EmpSalaryDetailsHistory_DesignationGradeId");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmpSalaryDetailsHistories)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryDetailsHistory_EmployeeId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.EmpSalaryDetailsHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_EmpSalaryDetailsHistory_ModifiedBy");

            entity.HasOne(d => d.SalaryCode).WithMany(p => p.EmpSalaryDetailsHistories)
                .HasForeignKey(d => d.SalaryCodeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_EmpSalaryDetailsHistory_SalaryCodeId");

            entity.HasOne(d => d.SalaryHeadMaster).WithMany(p => p.EmpSalaryDetailsHistories)
                .HasForeignKey(d => d.SalaryHeadMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryDetailsHistory_SalaryHeadMasterId");

            entity.HasOne(d => d.SalaryType).WithMany(p => p.EmpSalaryDetailsHistories)
                .HasForeignKey(d => d.SalaryTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_EmpSalaryDetailsHistory_SalaryTypeId");

            entity.HasOne(d => d.School).WithMany(p => p.EmpSalaryDetailsHistories)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryDetailsHistory_SchoolId");
        });

        modelBuilder.Entity<EmpSalaryMaster>(entity =>
        {
            entity.ToTable("EmpSalaryMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.AbsentDays).HasColumnType("decimal(18, 1)");
            entity.Property(e => e.Allowance).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.BasicSalary).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.BatchPrintDate).HasColumnType("datetime");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Deductions).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.LeaveBalanceDescription)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.LeaveDays).HasColumnType("decimal(18, 1)");
            entity.Property(e => e.LeaveDescription)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.NetSalary).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.PresentDays).HasColumnType("decimal(18, 1)");
            entity.Property(e => e.SalaryPerDay).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.EmpSalaryMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.EmpSalaryMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryMaster_CreatedBy");

            entity.HasOne(d => d.Department).WithMany(p => p.EmpSalaryMasters)
                .HasForeignKey(d => d.DepartmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryMaster_DepartmentId");

            entity.HasOne(d => d.Designation).WithMany(p => p.EmpSalaryMasters)
                .HasForeignKey(d => d.DesignationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryMaster_DesignationId");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmpSalaryMasters)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryMaster_EmployeeId");

            entity.HasOne(d => d.Grade).WithMany(p => p.EmpSalaryMasters)
                .HasForeignKey(d => d.GradeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryMaster_GradeId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.EmpSalaryMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_EmpSalaryMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.EmpSalaryMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryMaster_SchoolId");

            entity.HasOne(d => d.Session).WithMany(p => p.EmpSalaryMasters)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryMaster_SessionId");
        });

        modelBuilder.Entity<EmpSalaryMasterHistory>(entity =>
        {
            entity.ToTable("EmpSalaryMasterHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.AbsentDays).HasColumnType("decimal(18, 1)");
            entity.Property(e => e.Allowance).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.BasicSalary).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.BatchPrintDate).HasColumnType("datetime");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Deductions).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.LeaveBalanceDescription)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.LeaveDays).HasColumnType("decimal(18, 1)");
            entity.Property(e => e.LeaveDescription)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.NetSalary).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.PresentDays).HasColumnType("decimal(18, 1)");
            entity.Property(e => e.SalaryPerDay).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.EmpSalaryMasterHistories)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryMasterHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.EmpSalaryMasterHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryMasterHistory_CreatedBy");

            entity.HasOne(d => d.Department).WithMany(p => p.EmpSalaryMasterHistories)
                .HasForeignKey(d => d.DepartmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryMasterHistory_DepartmentId");

            entity.HasOne(d => d.Designation).WithMany(p => p.EmpSalaryMasterHistories)
                .HasForeignKey(d => d.DesignationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryMasterHistory_DesignationId");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmpSalaryMasterHistories)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryMasterHistory_EmployeeId");

            entity.HasOne(d => d.Grade).WithMany(p => p.EmpSalaryMasterHistories)
                .HasForeignKey(d => d.GradeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryMasterHistory_GradeId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.EmpSalaryMasterHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_EmpSalaryMasterHistory_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.EmpSalaryMasterHistories)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryMasterHistory_SchoolId");

            entity.HasOne(d => d.Session).WithMany(p => p.EmpSalaryMasterHistories)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryMasterHistory_SessionId");
        });

        modelBuilder.Entity<EmpSalaryStructureDetail>(entity =>
        {
            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.Value).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Company).WithMany(p => p.EmpSalaryStructureDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryStructureDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.EmpSalaryStructureDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryStructureDetails_CreatedBy");

            entity.HasOne(d => d.DesignationGrade).WithMany(p => p.EmpSalaryStructureDetails)
                .HasForeignKey(d => d.DesignationGradeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryStructureDetails_DesigGradeDetails");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmpSalaryStructureDetails)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryStructureDetails_EmpMaster");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.EmpSalaryStructureDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_EmpSalaryStructureDetails_ModifiedBy");

            entity.HasOne(d => d.SalaryCode).WithMany(p => p.EmpSalaryStructureDetails)
                .HasForeignKey(d => d.SalaryCodeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryStructureDetails_SalaryCodeId");

            entity.HasOne(d => d.SalaryType).WithMany(p => p.EmpSalaryStructureDetails)
                .HasForeignKey(d => d.SalaryTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryStructureDetails_SalaryTypeId");

            entity.HasOne(d => d.School).WithMany(p => p.EmpSalaryStructureDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryStructureDetails_SchoolId");

            entity.HasOne(d => d.SessionNavigation).WithMany(p => p.EmpSalaryStructureDetails)
                .HasForeignKey(d => d.Session)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryStructureDetails_SessionId");
        });

        modelBuilder.Entity<EmpSalaryStructureDetailsHistory>(entity =>
        {
            entity.ToTable("EmpSalaryStructureDetailsHistory");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.Value).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Company).WithMany(p => p.EmpSalaryStructureDetailsHistories)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryStructureDetailsHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.EmpSalaryStructureDetailsHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryStructureDetailsHistory_CreatedBy");

            entity.HasOne(d => d.DesignationGrade).WithMany(p => p.EmpSalaryStructureDetailsHistories)
                .HasForeignKey(d => d.DesignationGradeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryStructureDetailsHistory_DesigGradeDetails");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmpSalaryStructureDetailsHistories)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryStructureDetailsHistory_EmpMaster");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.EmpSalaryStructureDetailsHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_EmpSalaryStructureDetailsHistory_ModifiedBy");

            entity.HasOne(d => d.SalaryCode).WithMany(p => p.EmpSalaryStructureDetailsHistories)
                .HasForeignKey(d => d.SalaryCodeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryStructureDetailsHistory_SalaryCodeId");

            entity.HasOne(d => d.SalaryType).WithMany(p => p.EmpSalaryStructureDetailsHistories)
                .HasForeignKey(d => d.SalaryTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryStructureDetailsHistory_SalaryTypeId");

            entity.HasOne(d => d.School).WithMany(p => p.EmpSalaryStructureDetailsHistories)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryStructureDetailsHistory_SchoolId");

            entity.HasOne(d => d.SessionNavigation).WithMany(p => p.EmpSalaryStructureDetailsHistories)
                .HasForeignKey(d => d.Session)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpSalaryStructureDetailsHistory_SessionId");
        });

        modelBuilder.Entity<EmpTypeMaster>(entity =>
        {
            entity.ToTable("EmpTypeMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.TypeName)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.EmpTypeMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpTypeMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.EmpTypeMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpTypeMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.EmpTypeMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_EmpTypeMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.EmpTypeMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmpTypeMaster_SchoolId");
        });

        modelBuilder.Entity<EnquiryMaster>(entity =>
        {
            entity.ToTable("EnquiryMaster");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.ContactNumber).HasMaxLength(20);
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.EmailAddress).HasMaxLength(100);
            entity.Property(e => e.EnquirerName).HasMaxLength(150);
            entity.Property(e => e.EnquiryDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.EnquiryType).HasMaxLength(50);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.Message).HasMaxLength(1000);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Priority)
                .HasMaxLength(20)
                .HasDefaultValue("medium");
            entity.Property(e => e.ResponseDate).HasColumnType("datetime");
            entity.Property(e => e.ResponseMessage).HasMaxLength(1000);
            entity.Property(e => e.ResponseType).HasMaxLength(50);
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasDefaultValue("pending");
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.Subject).HasMaxLength(200);

            entity.HasOne(d => d.Company).WithMany(p => p.EnquiryMasters)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_EnquiryMaster_CompanyId");

            entity.HasOne(d => d.School).WithMany(p => p.EnquiryMasters)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK_EnquiryMaster_SchoolId");
        });

        modelBuilder.Entity<Error>(entity =>
        {
            entity.ToTable("Error");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.ActiveForm)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ErrorTypeId).HasColumnName("ErrorTypeID");
            entity.Property(e => e.Message)
                .HasMaxLength(1000)
                .IsUnicode(false);
            entity.Property(e => e.ServerTimeStamp).HasColumnType("datetime");
            entity.Property(e => e.Timestamp).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Company).WithMany(p => p.Errors)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Error__CompanyId__758D6A5C");

            entity.HasOne(d => d.ErrorType).WithMany(p => p.Errors)
                .HasForeignKey(d => d.ErrorTypeId)
                .HasConstraintName("FK__Error__ErrorType__7775B2CE");

            entity.HasOne(d => d.School).WithMany(p => p.Errors)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Error__SchoolId__795DFB40");

            entity.HasOne(d => d.User).WithMany(p => p.Errors)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Error__UserID__7B4643B2");
        });

        modelBuilder.Entity<ErrorDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasFillFactor(100);

            entity.ToTable("ErrorDetail");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Details).HasColumnType("text");
            entity.Property(e => e.ErrorId).HasColumnName("ErrorID");

            entity.HasOne(d => d.Company).WithMany(p => p.ErrorDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ErrorDeta__Compa__7D2E8C24");

            entity.HasOne(d => d.Error).WithMany(p => p.ErrorDetails)
                .HasForeignKey(d => d.ErrorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ErrorDeta__Error__000AF8CF");

            entity.HasOne(d => d.School).WithMany(p => p.ErrorDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ErrorDeta__Schoo__00FF1D08");
        });

        modelBuilder.Entity<ErrorType>(entity =>
        {
            entity.ToTable("ErrorType");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.Description)
                .HasMaxLength(1000)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.School).WithMany(p => p.ErrorTypes)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ErrorType__Schoo__02E7657A");
        });

        modelBuilder.Entity<ExamCategoryMaster>(entity =>
        {
            entity.ToTable("ExamCategoryMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ExamCategoryName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.ExamCategoryMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ExamCategoryMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ExamCategoryMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ExamCategoryMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ExamCategoryMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_ExamCategoryMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.ExamCategoryMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ExamCategoryMaster_SchoolId");
        });

        modelBuilder.Entity<ExamUnitMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ExamUnitMaster_1");

            entity.ToTable("ExamUnitMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ExamUnitName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.ExamUnitMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ExamUnitMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ExamUnitMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ExamUnitMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ExamUnitMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_ExamUnitMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.ExamUnitMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ExamUnitMaster_SchoolId");
        });

        modelBuilder.Entity<ExpenseCategoryMaster>(entity =>
        {
            entity.ToTable("ExpenseCategoryMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ExpenseCategoryName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.ExpenseCategoryMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ExpenseCategoryMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ExpenseCategoryMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ExpenseCategoryMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ExpenseCategoryMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_ExpenseCategoryMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.ExpenseCategoryMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ExpenseCategoryMaster_SchoolId");
        });

        modelBuilder.Entity<FeeClassDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_FeesMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.FromDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ToDate).HasColumnType("datetime");

            entity.HasOne(d => d.ClassMaster).WithMany(p => p.FeeClassDetails)
                .HasForeignKey(d => d.ClassMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FeeClassDetails_ClassMasterId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.FeeClassDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FeeClassDetails_CreatedBy");

            entity.HasOne(d => d.FeesCategory).WithMany(p => p.FeeClassDetails)
                .HasForeignKey(d => d.FeesCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FeeClassDetails_FeesCategoryId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.FeeClassDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_FeeClassDetails_ModifiedBy");
        });

        modelBuilder.Entity<FeeClassDetailsHistory>(entity =>
        {
            entity.ToTable("FeeClassDetailsHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.FromDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ToDate).HasColumnType("datetime");

            entity.HasOne(d => d.ClassMaster).WithMany(p => p.FeeClassDetailsHistories)
                .HasForeignKey(d => d.ClassMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FeeClassDetailsHistory_ClassMasterId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.FeeClassDetailsHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FeeClassDetailsHistory_CreatedBy");

            entity.HasOne(d => d.FeesCategory).WithMany(p => p.FeeClassDetailsHistories)
                .HasForeignKey(d => d.FeesCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FeeClassDetailsHistory_FeesCategoryId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.FeeClassDetailsHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_FeeClassDetailsHistory_ModifiedBy");
        });

        modelBuilder.Entity<FeesCategoryMaster>(entity =>
        {
            entity.ToTable("FeesCategoryMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.FeesCatgoryName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(250)
                .IsUnicode(false);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.FeesCategoryMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FeesCategoryMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.FeesCategoryMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_FeesCategoryMaster_ModifiedBy");
        });

        modelBuilder.Entity<FeesDiscountCategoryMaster>(entity =>
        {
            entity.ToTable("FeesDiscountCategoryMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IsActive);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(250)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.FeesDiscountCategoryMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FeesDiscountCategoryMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.FeesDiscountCategoryMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FeesDiscountCategoryMaster_CreatedBy");

            entity.HasOne(d => d.FeeCategory).WithMany(p => p.FeesDiscountCategoryMasters)
                .HasForeignKey(d => d.FeeCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FeesDiscountCategoryMaster_FeeCategoryId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.FeesDiscountCategoryMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_FeesDiscountCategoryMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.FeesDiscountCategoryMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FeesDiscountCategoryMaster_SchoolId");
        });

        modelBuilder.Entity<GenderMaster>(entity =>
        {
            entity.ToTable("GenderMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Gender)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.GenderMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GenderMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.GenderMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_GenderMaster_ModifiedBy");
        });

        modelBuilder.Entity<GradeMaster>(entity =>
        {
            entity.ToTable("GradeMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.GradeName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.GradeMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GradeMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.GradeMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GradeMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.GradeMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_GradeMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.GradeMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GradeMaster_SchoolId");
        });

        modelBuilder.Entity<HolidayClassDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.ClassMaster).WithMany(p => p.HolidayClassDetails)
                .HasForeignKey(d => d.ClassMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HolidayClassDetails_ClassMasterId");

            entity.HasOne(d => d.Company).WithMany(p => p.HolidayClassDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HolidayClassDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.HolidayClassDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HolidayClassDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.HolidayClassDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_HolidayClassDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.HolidayClassDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HolidayClassDetails_SchoolId");

            entity.HasOne(d => d.SectionMaster).WithMany(p => p.HolidayClassDetails)
                .HasForeignKey(d => d.SectionMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HolidayClassDetails_SectionMasterId");
        });

        modelBuilder.Entity<HolidayDeptDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.HolidayDeptDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HolidayDeptDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.HolidayDeptDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HolidayDeptDetails_CreatedBy");

            entity.HasOne(d => d.Department).WithMany(p => p.HolidayDeptDetails)
                .HasForeignKey(d => d.DepartmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HolidayDeptDetails_DepartmentId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.HolidayDeptDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_HolidayDeptDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.HolidayDeptDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HolidayDeptDetails_SchoolId");
        });

        modelBuilder.Entity<HolidayMaster>(entity =>
        {
            entity.ToTable("HolidayMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.FromDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.ToDate).HasColumnType("datetime");

            entity.HasOne(d => d.Company).WithMany(p => p.HolidayMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HolidayMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.HolidayMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HolidayMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.HolidayMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_HolidayMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.HolidayMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HolidayMaster_SchoolId");

            entity.HasOne(d => d.Session).WithMany(p => p.HolidayMasters)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HolidayMaster_SessionId");

            entity.HasOne(d => d.Type).WithMany(p => p.HolidayMasters)
                .HasForeignKey(d => d.TypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HolidayMaster_TypeId");
        });

        modelBuilder.Entity<HolidayTypeMaster>(entity =>
        {
            entity.ToTable("HolidayTypeMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.HolidayTypeDescription)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.HolidayTypeName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.HolidayTypeMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HolidayTypeMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.HolidayTypeMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HolidayTypeMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.HolidayTypeMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_HolidayTypeMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.HolidayTypeMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HolidayTypeMaster_SchoolId");
        });

        modelBuilder.Entity<HouseMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__HouseMas__3214EC07CC3F9E06");

            entity.ToTable("HouseMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.House)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.HouseMasters)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK__HouseMast__Compa__384F51F2");

            entity.HasOne(d => d.School).WithMany(p => p.HouseMasters)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK__HouseMast__Schoo__3A379A64");
        });

        modelBuilder.Entity<InventoryMaster>(entity =>
        {
            entity.ToTable("InventoryMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CostPerItem).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.InventoryMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InventoryMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.InventoryMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InventoryMaster_CreatedBy");

            entity.HasOne(d => d.Item).WithMany(p => p.InventoryMasters)
                .HasForeignKey(d => d.ItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InventoryMaster_ItemId");

            entity.HasOne(d => d.Location).WithMany(p => p.InventoryMasters)
                .HasForeignKey(d => d.LocationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InventoryMaster_LocationId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.InventoryMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InventoryMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.InventoryMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InventoryMaster_SchoolId");
        });

        modelBuilder.Entity<ItemLocationMaster>(entity =>
        {
            entity.ToTable("ItemLocationMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Building)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.LocationFloor)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LocationName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.ItemLocationMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ItemLocationMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ItemLocationMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ItemLocationMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ItemLocationMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ItemLocationMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.ItemLocationMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ItemLocationMaster_SchoolId");
        });

        modelBuilder.Entity<ItemMaster>(entity =>
        {
            entity.ToTable("ItemMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ItemName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.ItemMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ItemMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ItemMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ItemMaster_CreatedBy");

            entity.HasOne(d => d.ItemTypeMaster).WithMany(p => p.ItemMasters)
                .HasForeignKey(d => d.ItemTypeMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ItemMaster_ItemTypeMasterId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ItemMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ItemMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.ItemMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ItemMaster_SchoolId");
        });

        modelBuilder.Entity<ItemTypeMaster>(entity =>
        {
            entity.ToTable("ItemTypeMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.ItemTypeMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ItemTypeMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ItemTypeMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ItemTypeMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ItemTypeMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ItemTypeMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.ItemTypeMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ItemTypeMaster_SchoolId");
        });

        modelBuilder.Entity<LeaveStatusMaster>(entity =>
        {
            entity.ToTable("LeaveStatusMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.LeaveStatusMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LeaveStatusMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.LeaveStatusMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LeaveStatusMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.LeaveStatusMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LeaveStatusMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.LeaveStatusMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LeaveStatusMaster_SchoolId");
        });

        modelBuilder.Entity<LeaveTypeMaster>(entity =>
        {
            entity.ToTable("LeaveTypeMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Code)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.LeaveTypeMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LeaveTypeMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.LeaveTypeMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LeaveTypeMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.LeaveTypeMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_LeaveTypeMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.LeaveTypeMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LeaveTypeMaster_SchoolId");
        });

        modelBuilder.Entity<LocationMaster>(entity =>
        {
            entity.ToTable("LocationMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Code)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.City).WithMany(p => p.LocationMasters)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LocationMaster_CityId");

            entity.HasOne(d => d.Company).WithMany(p => p.LocationMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LocationMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.LocationMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LocationMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.LocationMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_LocationMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.LocationMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LocationMaster_SchoolId");
        });

        modelBuilder.Entity<MaritalStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MaritalS__3214EC070C8BE53C");

            entity.ToTable("MaritalStatus");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.Value)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.MaritalStatuses)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MaritalSt__Compa__5AA469F6");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.MaritalStatusCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MaritalSt__Creat__5C8CB268");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.MaritalStatusModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK__MaritalSt__Modif__5E74FADA");

            entity.HasOne(d => d.School).WithMany(p => p.MaritalStatuses)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MaritalSt__Schoo__605D434C");
        });

        modelBuilder.Entity<MarksGradeMaster>(entity =>
        {
            entity.ToTable("MarksGradeMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Code)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Point).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Class).WithMany(p => p.MarksGradeMasters)
                .HasForeignKey(d => d.ClassId)
                .HasConstraintName("FK_MarksGradeMaster_ClassMasterId");

            entity.HasOne(d => d.Company).WithMany(p => p.MarksGradeMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MarksGradeMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.MarksGradeMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MarksGradeMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.MarksGradeMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_MarksGradeMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.MarksGradeMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MarksGradeMaster_SchoolId");
        });

        modelBuilder.Entity<MenuMaster>(entity =>
        {
            entity.ToTable("MenuMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Category).HasMaxLength(50);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.DisplayName).HasMaxLength(100);
            entity.Property(e => e.Icon).HasMaxLength(50);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name).HasMaxLength(100);
            // ParentId is a Guid/uniqueidentifier; do not use HasMaxLength
            entity.Property(e => e.ParentId).HasColumnType("uniqueidentifier");
            entity.Property(e => e.Path).HasMaxLength(255);
            entity.Property(e => e.Status).HasMaxLength(20);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasMany(d => d.Children)
                .WithOne(p => p.Parent)
                .HasForeignKey(d => d.ParentId)
                .HasConstraintName("FK_MenuMaster_MenuMaster_ParentId");

            entity.HasMany(d => d.RoleMappings)
                .WithOne(p => p.Menu)
                .HasForeignKey(d => d.MenuId)
                .HasConstraintName("FK_RoleMenuMapping_MenuMaster_MenuId");
        });

        modelBuilder.Entity<RoleMenuMapping>(entity =>
        {
            entity.ToTable("RoleMenuMapping");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status).HasMaxLength(20);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Menu)
                .WithMany(p => p.RoleMappings)
                .HasForeignKey(d => d.MenuId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RoleMenuMapping_MenuMaster_MenuId");

            entity.HasOne(d => d.Role)
                .WithMany()
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RoleMenuMapping_RoleMaster_RoleId");
        });

        modelBuilder.Entity<NonTeachingMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NonTeach__3214EC0751DCF421");

            entity.ToTable("NonTeachingMaster");

            entity.HasIndex(e => e.AadharNumber, "UQ_NonTeachingMaster_AadharNumber").IsUnique();

            entity.HasIndex(e => e.Email, "UQ_NonTeachingMaster_Email").IsUnique();

            entity.HasIndex(e => e.EmployeeCode, "UQ_NonTeachingMaster_EmployeeCode").IsUnique();

            entity.HasIndex(e => e.Pan, "UQ_NonTeachingMaster_PAN").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.AadharNumber).HasMaxLength(20);
            entity.Property(e => e.Address).HasMaxLength(500);
            entity.Property(e => e.BankAccountNumber).HasMaxLength(50);
            entity.Property(e => e.BankName).HasMaxLength(100);
            entity.Property(e => e.CreatedOn).HasDefaultValueSql("(getutcdate())");
            entity.Property(e => e.Department).HasMaxLength(100);
            entity.Property(e => e.Designation).HasMaxLength(100);
            entity.Property(e => e.Dob).HasColumnName("DOB");
            entity.Property(e => e.Doj).HasColumnName("DOJ");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.EmergencyContactName).HasMaxLength(200);
            entity.Property(e => e.EmergencyContactNumber).HasMaxLength(20);
            entity.Property(e => e.EmergencyContactRelation).HasMaxLength(100);
            entity.Property(e => e.EmployeeCode).HasMaxLength(50);
            entity.Property(e => e.FirstName).HasMaxLength(100);
            entity.Property(e => e.Gender).HasMaxLength(10);
            entity.Property(e => e.Ifsccode)
                .HasMaxLength(20)
                .HasColumnName("IFSCCode");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.LastName).HasMaxLength(100);
            entity.Property(e => e.MiddleName).HasMaxLength(100);
            entity.Property(e => e.MobilePhone).HasMaxLength(20);
            entity.Property(e => e.Pan)
                .HasMaxLength(20)
                .HasColumnName("PAN");
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.Property(e => e.Qualification).HasMaxLength(200);
            entity.Property(e => e.Salary).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.ZipCode).HasMaxLength(20);

            entity.HasOne(d => d.City).WithMany(p => p.NonTeachingMasters)
                .HasForeignKey(d => d.CityId)
                .HasConstraintName("FK_NonTeachingMaster_City");

            entity.HasOne(d => d.Company).WithMany(p => p.NonTeachingMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_NonTeachingMaster_Company");

            entity.HasOne(d => d.Country).WithMany(p => p.NonTeachingMasters)
                .HasForeignKey(d => d.CountryId)
                .HasConstraintName("FK_NonTeachingMaster_Country");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.NonTeachingMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_NonTeachingMaster_User_CreatedBy");

            entity.HasOne(d => d.DeletedByNavigation).WithMany(p => p.NonTeachingMasterDeletedByNavigations)
                .HasForeignKey(d => d.DeletedBy)
                .HasConstraintName("FK_NonTeachingMaster_User_DeletedBy");

            entity.HasOne(d => d.MaritalStatus).WithMany(p => p.NonTeachingMasters)
                .HasForeignKey(d => d.MaritalStatusId)
                .HasConstraintName("FK_NonTeachingMaster_MaritalStatus");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.NonTeachingMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_NonTeachingMaster_User_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.NonTeachingMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_NonTeachingMaster_School");

            entity.HasOne(d => d.State).WithMany(p => p.NonTeachingMasters)
                .HasForeignKey(d => d.StateId)
                .HasConstraintName("FK_NonTeachingMaster_State");
        });

        modelBuilder.Entity<NotificationReceiverMaster>(entity =>
        {
            entity.ToTable("NotificationReceiverMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.NotificationReceiverMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_NotificationReceiverMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.NotificationReceiverMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_NotificationReceiverMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.NotificationReceiverMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_NotificationReceiverMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.NotificationReceiverMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_NotificationReceiverMaster_SchoolId");
        });

        modelBuilder.Entity<ParentMaster>(entity =>
        {
            entity.ToTable("ParentMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Address1)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Address2)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.AnnualIncome).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Image)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Mobile)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Occupation)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.OfficeAddress1)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.OfficeAddress2)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.OfficePhone)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.OfficeZipCode)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ParentDob)
                .HasColumnType("datetime")
                .HasColumnName("ParentDOB");
            entity.Property(e => e.ParentFirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ParentLastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.StudentGuid).HasColumnName("StudentGUID");
            entity.Property(e => e.ZipCode)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.City).WithMany(p => p.ParentMasterCities)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ParentMaster_CityId");

            entity.HasOne(d => d.Company).WithMany(p => p.ParentMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ParentMaster_CompanyId");

            entity.HasOne(d => d.Country).WithMany(p => p.ParentMasterCountries)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ParentMaster_CountryId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ParentMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ParentMaster_CreatedBy");

            entity.HasOne(d => d.Designation).WithMany(p => p.ParentMasters)
                .HasForeignKey(d => d.DesignationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ParentMaster_DesignationId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ParentMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_ParentMaster_ModifiedBy");

            entity.HasOne(d => d.OfficeCity).WithMany(p => p.ParentMasterOfficeCities)
                .HasForeignKey(d => d.OfficeCityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ParentMaster_OfficeCityId");

            entity.HasOne(d => d.OfficeCountry).WithMany(p => p.ParentMasterOfficeCountries)
                .HasForeignKey(d => d.OfficeCountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ParentMaster_OfficeCountryId");

            entity.HasOne(d => d.OfficeState).WithMany(p => p.ParentMasterOfficeStates)
                .HasForeignKey(d => d.OfficeStateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ParentMaster_OfficeStateId");

            entity.HasOne(d => d.Qualification).WithMany(p => p.ParentMasters)
                .HasForeignKey(d => d.QualificationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ParentMaster_QualificationId");

            entity.HasOne(d => d.RelationType).WithMany(p => p.ParentMasters)
                .HasForeignKey(d => d.RelationTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ParentMaster_RelationTypeId");

            entity.HasOne(d => d.School).WithMany(p => p.ParentMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ParentMaster_SchoolId");

            entity.HasOne(d => d.State).WithMany(p => p.ParentMasterStates)
                .HasForeignKey(d => d.StateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ParentMaster_StateId");
        });

        modelBuilder.Entity<PaymentModeMaster>(entity =>
        {
            entity.ToTable("PaymentModeMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.PaymentModeMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PaymentModeMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.PaymentModeMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PaymentModeMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.PaymentModeMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_PaymentModeMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.PaymentModeMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PaymentModeMaster_SchoolId");
        });

        modelBuilder.Entity<PaymentTypeMode>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__PaymentT__3214EC07F1C0A15C");

            entity.ToTable("PaymentTypeMode");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.PaymentMode)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.PaymentTypeModeCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PaymentTy__Creat__03A67F89");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.PaymentTypeModeModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK__PaymentTy__Modif__058EC7FB");
        });

        modelBuilder.Entity<PhoneCallMaster>(entity =>
        {
            entity.ToTable("PhoneCallMaster");

            entity.HasIndex(e => e.CallDate, "IX_PhoneCallMaster_CallDate");

            entity.HasIndex(e => e.CallPurpose, "IX_PhoneCallMaster_CallPurpose");

            entity.HasIndex(e => e.CallTime, "IX_PhoneCallMaster_CallTime");

            entity.HasIndex(e => e.CallerName, "IX_PhoneCallMaster_CallerName");

            entity.HasIndex(e => e.CallerNumber, "IX_PhoneCallMaster_CallerNumber");

            entity.HasIndex(e => e.CompanyId, "IX_PhoneCallMaster_CompanyId");

            entity.HasIndex(e => e.CreatedBy, "IX_PhoneCallMaster_CreatedBy");

            entity.HasIndex(e => e.Priority, "IX_PhoneCallMaster_Priority");

            entity.HasIndex(e => e.SchoolId, "IX_PhoneCallMaster_SchoolId");

            entity.HasIndex(e => new { e.SchoolId, e.CallDate, e.CallTime }, "IX_PhoneCallMaster_School_Date_Time").IsDescending(false, true, true);

            entity.HasIndex(e => e.Status, "IX_PhoneCallMaster_Status");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.ActionTaken).HasMaxLength(500);
            entity.Property(e => e.CallDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.CallDescription).HasMaxLength(500);
            entity.Property(e => e.CallDuration).HasPrecision(0);
            entity.Property(e => e.CallPurpose).HasMaxLength(50);
            entity.Property(e => e.CallTime)
                .HasPrecision(0)
                .HasDefaultValueSql("(CONVERT([time],getdate()))");
            entity.Property(e => e.CallerEmail).HasMaxLength(100);
            entity.Property(e => e.CallerName).HasMaxLength(150);
            entity.Property(e => e.CallerNumber).HasMaxLength(20);
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.HandledBy).HasMaxLength(150);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Notes).HasMaxLength(1000);
            entity.Property(e => e.Priority)
                .HasMaxLength(20)
                .HasDefaultValue("medium");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasDefaultValue("pending");
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.PhoneCallMasters)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_PhoneCallMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.PhoneCallMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PhoneCallMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.PhoneCallMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_PhoneCallMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.PhoneCallMasters)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK_PhoneCallMaster_SchoolId");
        });

        modelBuilder.Entity<Privilege>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.PrivilegeName).HasMaxLength(100);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.PrivilegeCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Privileges_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.PrivilegeModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_Privileges_ModifiedBy");
        });

        modelBuilder.Entity<ProfessionMaster>(entity =>
        {
            entity.ToTable("ProfessionMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.ProfessionMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProfessionMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ProfessionMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProfessionMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ProfessionMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_ProfessionMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.ProfessionMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProfessionMaster_SchoolId");
        });

        modelBuilder.Entity<PublisherMaster>(entity =>
        {
            entity.ToTable("PublisherMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Address1)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Address2)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.EmailId)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MobileNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PublisherName)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.ZipCode)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.City).WithMany(p => p.PublisherMasters)
                .HasForeignKey(d => d.CityId)
                .HasConstraintName("FK_PublisherMaster_CityId");

            entity.HasOne(d => d.Company).WithMany(p => p.PublisherMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PublisherMaster_CompanyId");

            entity.HasOne(d => d.Country).WithMany(p => p.PublisherMasters)
                .HasForeignKey(d => d.CountryId)
                .HasConstraintName("FK_PublisherMaster_CountryId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.PublisherMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PublisherMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.PublisherMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_PublisherMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.PublisherMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PublisherMaster_SchoolId");

            entity.HasOne(d => d.State).WithMany(p => p.PublisherMasters)
                .HasForeignKey(d => d.StateId)
                .HasConstraintName("FK_PublisherMaster_StateId");
        });

        modelBuilder.Entity<QualificationMaster>(entity =>
        {
            entity.ToTable("QualificationMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.QualificationName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.QualificationMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QualificationMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.QualificationMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_QualificationMaster_ModifiedBy");
        });

        modelBuilder.Entity<RegistrationMaster>(entity =>
        {
            entity.ToTable("RegistrationMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Address1)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Address2)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Age).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.BirthCertificate)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ContactNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.Dob)
                .HasColumnType("datetime")
                .HasColumnName("DOB");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FathersAnnualIncome).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.FathersDob)
                .HasColumnType("datetime")
                .HasColumnName("FathersDOB");
            entity.Property(e => e.FathersFirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FathersLastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FathersOccupation)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.MothersAnnualIncome).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.MothersDob)
                .HasColumnType("datetime")
                .HasColumnName("MothersDOB");
            entity.Property(e => e.MothersFirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.MothersLastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.MothersOccupation)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.OtherCertificateName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.OtherDescription)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.RegistrationFees).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.RegistrationNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ReportCardLastClass)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.SiblingsIfAny)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.TransferCertificate)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ZipCode)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.BloodGroup).WithMany(p => p.RegistrationMasters)
                .HasForeignKey(d => d.BloodGroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RegistrationMaster_BloodGroupId");

            entity.HasOne(d => d.Category).WithMany(p => p.RegistrationMasters)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RegistrationMaster_CategoryId");

            entity.HasOne(d => d.City).WithMany(p => p.RegistrationMasters)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RegistrationMaster_CityId");

            entity.HasOne(d => d.Class).WithMany(p => p.RegistrationMasterClasses)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RegistrationMaster_ClassMasterId");

            entity.HasOne(d => d.Company).WithMany(p => p.RegistrationMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RegistrationMaster_CompanyId");

            entity.HasOne(d => d.Country).WithMany(p => p.RegistrationMasters)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RegistrationMaster_CountryId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.RegistrationMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RegistrationMaster_CreatedBy");

            entity.HasOne(d => d.FathersDesignation).WithMany(p => p.RegistrationMasterFathersDesignations)
                .HasForeignKey(d => d.FathersDesignationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RegistrationMaster_FathersDesignationId");

            entity.HasOne(d => d.FathersQualification).WithMany(p => p.InverseFathersQualification)
                .HasForeignKey(d => d.FathersQualificationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RegistrationMaster_FathersQualificationId");

            entity.HasOne(d => d.GenderNavigation).WithMany(p => p.RegistrationMasters)
                .HasForeignKey(d => d.Gender)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RegistrationMaster_Gender");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.RegistrationMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_RegistrationMaster_ModifiedBy");

            entity.HasOne(d => d.MothersDesignation).WithMany(p => p.RegistrationMasterMothersDesignations)
                .HasForeignKey(d => d.MothersDesignationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RegistrationMaster_MothersDesignationId");

            entity.HasOne(d => d.MothersQualification).WithMany(p => p.InverseMothersQualification)
                .HasForeignKey(d => d.MothersQualificationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RegistrationMaster_MothersQualificationId");

            entity.HasOne(d => d.Religion).WithMany(p => p.RegistrationMasters)
                .HasForeignKey(d => d.ReligionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RegistrationMaster_ReligionId");

            entity.HasOne(d => d.School).WithMany(p => p.RegistrationMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RegistrationMaster_SchoolId");

            entity.HasOne(d => d.Session).WithMany(p => p.RegistrationMasters)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RegistrationMaster_SessionId");

            entity.HasOne(d => d.SiblingClassMaster).WithMany(p => p.RegistrationMasterSiblingClassMasters)
                .HasForeignKey(d => d.SiblingClassMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RegistrationMaster_SiblingClassMasterId");

            entity.HasOne(d => d.State).WithMany(p => p.RegistrationMasters)
                .HasForeignKey(d => d.StateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RegistrationMaster_StateId");
        });

        modelBuilder.Entity<RelationTypeMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_RelationTypeId");

            entity.ToTable("RelationTypeMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.RelationTypeMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RelationTypeMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.RelationTypeMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_RelationTypeMaster_ModifiedBy");
        });

        modelBuilder.Entity<ReligionMaster>(entity =>
        {
            entity.ToTable("ReligionMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.ReligionName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ReligionMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ReligionMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ReligionMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_ReligionMaster_ModifiedBy");
        });

        modelBuilder.Entity<RoleMaster>(entity =>
        {
            entity.ToTable("RoleMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.RoleMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RoleMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.RoleMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RoleMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.RoleMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_RoleMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.RoleMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RoleMaster_SchoolId");
        });

        modelBuilder.Entity<RolePrivilege>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.RolePrivilegeCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RolePrivileges_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.RolePrivilegeModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_RolePrivileges_ModifiedBy");

            entity.HasOne(d => d.Privilege).WithMany(p => p.RolePrivileges)
                .HasForeignKey(d => d.PrivilegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__RolePrivi__Privi__32616E72");

            entity.HasOne(d => d.Role).WithMany(p => p.RolePrivileges)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RolePrivileges_RoleId");
        });

        modelBuilder.Entity<RouteDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasDefaultValue("INC");
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(250)
                .IsUnicode(false);

            entity.HasOne(d => d.Cleaner).WithMany(p => p.RouteDetails)
                .HasForeignKey(d => d.CleanerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteDetails_CleanerId");

            entity.HasOne(d => d.Company).WithMany(p => p.RouteDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.RouteDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteDetails_CreatedBy");

            entity.HasOne(d => d.Driver).WithMany(p => p.RouteDetails)
                .HasForeignKey(d => d.DriverId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteDetails_DriverId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.RouteDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_RouteDetails_ModifiedBy");

            entity.HasOne(d => d.Route).WithMany(p => p.RouteDetails)
                .HasForeignKey(d => d.RouteId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteDetails_RouteId");

            entity.HasOne(d => d.School).WithMany(p => p.RouteDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteDetails_SchoolId");

            entity.HasOne(d => d.Vehicle).WithMany(p => p.RouteDetails)
                .HasForeignKey(d => d.VehicleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteDetails_VehicleId");
        });

        modelBuilder.Entity<RouteLocationMaster>(entity =>
        {
            entity.ToTable("RouteLocationMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Code)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.LandMark)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.City).WithMany(p => p.RouteLocationMasters)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteLocationMaster_CityId");

            entity.HasOne(d => d.Company).WithMany(p => p.RouteLocationMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteLocationMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.RouteLocationMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteLocationMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.RouteLocationMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_RouteLocationMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.RouteLocationMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteLocationMaster_SchoolId");
        });

        modelBuilder.Entity<RouteMaster>(entity =>
        {
            entity.ToTable("RouteMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Code)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.IsActive).IsRequired();
            entity.Property(e => e.IsDeleted).IsRequired();
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasDefaultValue("INC");
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(250)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.RouteMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.RouteMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteMaster_CreatedBy");

            entity.HasOne(d => d.EndLocation).WithMany(p => p.RouteMasterEndLocations)
                .HasForeignKey(d => d.EndLocationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_RouteMaster_EndLocationId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.RouteMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_RouteMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.RouteMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteMaster_SchoolId");

            entity.HasOne(d => d.Session).WithMany(p => p.RouteMasters)
                .HasForeignKey(d => d.SessionId)
                .HasConstraintName("FK_RouteMaster_SessionId");

            entity.HasOne(d => d.StartLocation).WithMany(p => p.RouteMasterStartLocations)
                .HasForeignKey(d => d.StartLocationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_RouteMaster_StartLocationId");
        });

        modelBuilder.Entity<RouteStopDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DropTime)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.OneWayMonthlyFee).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.PickupTime)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasDefaultValue("INC");
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.TwoWayMonthlyFee).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Company).WithMany(p => p.RouteStopDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteStopDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.RouteStopDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteStopDetails_CreatedBy");

            entity.HasOne(d => d.Location).WithMany(p => p.RouteStopDetails)
                .HasForeignKey(d => d.LocationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteStopDetails_LocationId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.RouteStopDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_RouteStopDetails_ModifiedBy");

            entity.HasOne(d => d.RouteDetail).WithMany(p => p.RouteStopDetails)
                .HasForeignKey(d => d.RouteDetailId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteStopDetails_RouteDetailId");

            entity.HasOne(d => d.Route).WithMany(p => p.RouteStopDetails)
                .HasForeignKey(d => d.RouteId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteStopDetails_RouteId");

            entity.HasOne(d => d.School).WithMany(p => p.RouteStopDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RouteStopDetails_SchoolId");
        });

        modelBuilder.Entity<SalaryCode>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__SalaryCo__3214EC070BDAFBDA");

            entity.ToTable("SalaryCode");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Code)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.SalaryCodes)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK__SalaryCod__Compa__51DA19CB");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SalaryCodeCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__SalaryCod__Creat__53C2623D");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SalaryCodeModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK__SalaryCod__Modif__55AAAAAF");

            entity.HasOne(d => d.School).WithMany(p => p.SalaryCodes)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK__SalaryCod__Schoo__5792F321");
        });

        modelBuilder.Entity<SalaryDesigGradeDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Value).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Company).WithMany(p => p.SalaryDesigGradeDetails)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK__SalaryDes__Compa__597B3B93");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SalaryDesigGradeDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalaryDesigGradeDetails_CreatedBy");

            entity.HasOne(d => d.DesignationGrade).WithMany(p => p.SalaryDesigGradeDetails)
                .HasForeignKey(d => d.DesignationGradeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalaryDesigGradeDetails_DesignationGradeId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SalaryDesigGradeDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_SalaryDesigGradeDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.SalaryDesigGradeDetails)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK__SalaryDes__Schoo__5B638405");

            entity.HasOne(d => d.Session).WithMany(p => p.SalaryDesigGradeDetails)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalaryDesigGradeDetails_SessionId");
        });

        modelBuilder.Entity<SalaryDesigGradeDetailsHistory>(entity =>
        {
            entity.ToTable("SalaryDesigGradeDetailsHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Value).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Company).WithMany(p => p.SalaryDesigGradeDetailsHistories)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK__SalaryDes__Compa__611C5D5B");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SalaryDesigGradeDetailsHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalaryDesigGradeDetailsHistory_CreatedBy");

            entity.HasOne(d => d.DesignationGrade).WithMany(p => p.SalaryDesigGradeDetailsHistories)
                .HasForeignKey(d => d.DesignationGradeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalaryDesigGradeDetailsHistory_DesignationGradeId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SalaryDesigGradeDetailsHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_SalaryDesigGradeDetailsHistory_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.SalaryDesigGradeDetailsHistories)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK__SalaryDes__Schoo__6304A5CD");

            entity.HasOne(d => d.Session).WithMany(p => p.SalaryDesigGradeDetailsHistories)
                .HasForeignKey(d => d.SessionId)
                .HasConstraintName("FK_SalaryDesigGradeDetailsHistory_SessionId");
        });

        modelBuilder.Entity<SalaryHeadMaster>(entity =>
        {
            entity.ToTable("SalaryHeadMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Code)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(250)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.SalaryHeadMasters)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK__SalaryHea__Compa__68BD7F23");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SalaryHeadMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalaryHeadMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SalaryHeadMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_SalaryHeadMaster_ModifiedBy");

            entity.HasOne(d => d.SalaryType).WithMany(p => p.SalaryHeadMasters)
                .HasForeignKey(d => d.SalaryTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalaryHeadMaster_SalaryTypeId");

            entity.HasOne(d => d.School).WithMany(p => p.SalaryHeadMasters)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK__SalaryHea__Schoo__6AA5C795");
        });

        modelBuilder.Entity<SalaryType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__SalaryTy__3214EC07AAEFCC92");

            entity.ToTable("SalaryType");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Value)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.SalaryTypes)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK__SalaryTyp__Compa__6F6A7CB2");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SalaryTypeCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__SalaryTyp__Creat__7152C524");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SalaryTypeModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK__SalaryTyp__Modif__733B0D96");

            entity.HasOne(d => d.School).WithMany(p => p.SalaryTypes)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK__SalaryTyp__Schoo__75235608");
        });

        modelBuilder.Entity<SalaryTypeMaster>(entity =>
        {
            entity.ToTable("SalaryTypeMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.SalaryTypeMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalaryTypeMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SalaryTypeMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalaryTypeMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SalaryTypeMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_SalaryTypeMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.SalaryTypeMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SalaryTypeMaster_SchoolId");
        });

        modelBuilder.Entity<ScholasticMaster>(entity =>
        {
            entity.ToTable("ScholasticMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.ScholasticMasters)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_ScholasticMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ScholasticMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ScholasticMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ScholasticMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ScholasticMaster_ModifiedBy");

            entity.HasOne(d => d.Parent).WithMany(p => p.ScholasticMasters)
                .HasForeignKey(d => d.ParentId)
                .HasConstraintName("FK_ScholasticMaster_ParentId");

            entity.HasOne(d => d.School).WithMany(p => p.ScholasticMasters)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK_ScholasticMaster_SchoolId");

            entity.HasOne(d => d.Session).WithMany(p => p.ScholasticMasters)
                .HasForeignKey(d => d.SessionId)
                .HasConstraintName("fk_ScholasticMaster_SessionId");

            entity.HasOne(d => d.Subject).WithMany(p => p.ScholasticMasters)
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK_ScholasticMaster_SubjectId");
        });

        modelBuilder.Entity<ScholasticUnitDetail>(entity =>
        {
            entity.HasKey(e => new { e.Id, e.UnitId });

            entity.ToTable("ScholasticUnitDetail");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.ScholasticUnitDetails)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK__Scholasti__Compa__01892CED");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ScholasticUnitDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ScholasticUnitDetail_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.ScholasticUnitDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ScholasticUnitDetail_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.ScholasticUnitDetails)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK__Scholasti__Schoo__0371755F");
        });

        modelBuilder.Entity<SchoolBoard>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__SchoolBo__3214EC07FCD8712D");

            entity.ToTable("SchoolBoard");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.BoardName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<SchoolContactMaster>(entity =>
        {
            entity.ToTable("SchoolContactMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.AddressLine1)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.AddressLine2)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.MobilePhone)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Phone)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.City).WithMany(p => p.SchoolContactMasters)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SchoolContactMaster_CityId");

            entity.HasOne(d => d.Country).WithMany(p => p.SchoolContactMasters)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SchoolContactMaster_CountryId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SchoolContactMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SchoolContactMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SchoolContactMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_SchoolContactMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.SchoolContactMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SchoolContactMaster_SchoolId");

            entity.HasOne(d => d.State).WithMany(p => p.SchoolContactMasters)
                .HasForeignKey(d => d.StateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SchoolContactMaster_StateId");
        });

        modelBuilder.Entity<SchoolMaster>(entity =>
        {
            entity.ToTable("SchoolMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.AccountNumber)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Address1)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Address2)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.BankAddress1)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.BankAddress2)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.BankName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.BankZipCode)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.EstablishmentYear)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Mobile)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ZipCode)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.BankCity).WithMany(p => p.SchoolMasterBankCities)
                .HasForeignKey(d => d.BankCityId)
                .HasConstraintName("FK_SchoolMaster_BankCityId");

            entity.HasOne(d => d.BankCountry).WithMany(p => p.SchoolMasterBankCountries)
                .HasForeignKey(d => d.BankCountryId)
                .HasConstraintName("FK_SchoolMaster_BankCountryId");

            entity.HasOne(d => d.BankState).WithMany(p => p.SchoolMasterBankStates)
                .HasForeignKey(d => d.BankStateId)
                .HasConstraintName("FK_SchoolMaster_BankStateId");

            entity.HasOne(d => d.City).WithMany(p => p.SchoolMasterCities)
                .HasForeignKey(d => d.CityId)
                .HasConstraintName("FK_SchoolMaster_CityId");

            entity.HasOne(d => d.Country).WithMany(p => p.SchoolMasterCountries)
                .HasForeignKey(d => d.CountryId)
                .HasConstraintName("FK_SchoolMaster_CountryId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SchoolMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SchoolMaster_CreatedBy");

            entity.HasOne(d => d.JudistrictionCity).WithMany(p => p.SchoolMasterJudistrictionCities)
                .HasForeignKey(d => d.JudistrictionCityId)
                .HasConstraintName("FK_SchoolMaster_JudistrictionCityId");

            entity.HasOne(d => d.JudistrictionCountry).WithMany(p => p.SchoolMasterJudistrictionCountries)
                .HasForeignKey(d => d.JudistrictionCountryId)
                .HasConstraintName("FK_SchoolMaster_JudistrictionCountryId");

            entity.HasOne(d => d.JudistrictionState).WithMany(p => p.SchoolMasterJudistrictionStates)
                .HasForeignKey(d => d.JudistrictionStateId)
                .HasConstraintName("FK_SchoolMaster_JudistrictionStateId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SchoolMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_SchoolMaster_ModifiedBy");

            entity.HasOne(d => d.State).WithMany(p => p.SchoolMasterStates)
                .HasForeignKey(d => d.StateId)
                .HasConstraintName("FK_SchoolMaster_StateId");
        });

        modelBuilder.Entity<SectionMaster>(entity =>
        {
            entity.ToTable("SectionMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.SectionMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SectionMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SectionMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SectionMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SectionMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_SectionMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.SectionMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SectionMaster_SchoolId");
        });

        modelBuilder.Entity<SessionMaster>(entity =>
        {
            entity.ToTable("SessionMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.Value)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.SessionMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SessionMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SessionMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SessionMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SessionMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_SessionMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.SessionMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SessionMaster_SchoolId");
        });

        modelBuilder.Entity<Smstask>(entity =>
        {
            entity.ToTable("SMSTask");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Desctiption)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.LastRunDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.RepeatSchedule)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.SendSms).HasColumnName("SendSMS");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.Smstasks)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTask_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SmstaskCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTask_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SmstaskModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTask_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.Smstasks)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTask_SchoolId");
        });

        modelBuilder.Entity<SmstaskHistory>(entity =>
        {
            entity.ToTable("SMSTaskHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.EmailId)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.NotificationReceiver)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.SendType)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.SentDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.SmstaskHistories)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTaskHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SmstaskHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTaskHistory_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SmstaskHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTaskHistory_ModifiedBy");

            entity.HasOne(d => d.Parent).WithMany(p => p.SmstaskHistoryParents)
                .HasForeignKey(d => d.ParentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTaskHistory_ParentId");

            entity.HasOne(d => d.Receiver).WithMany(p => p.SmstaskHistoryReceivers)
                .HasForeignKey(d => d.ReceiverId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTaskHistory_ReceiverId");

            entity.HasOne(d => d.School).WithMany(p => p.InverseSchool)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTaskHistory_SchoolId");

            entity.HasOne(d => d.Task).WithMany(p => p.SmstaskHistories)
                .HasForeignKey(d => d.TaskId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTaskHistory_TaskId");
        });

        modelBuilder.Entity<SmstaskSchedule>(entity =>
        {
            entity.HasKey(e => e.TaskId);

            entity.ToTable("SMSTaskSchedule");

            entity.Property(e => e.TaskId).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.StartTime).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.SmstaskSchedules)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTaskSchedule_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SmstaskScheduleCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTaskSchedule_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SmstaskScheduleModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTaskSchedule_ModifiedBy");
        });

        modelBuilder.Entity<SmstaskSmtpDetail>(entity =>
        {
            entity.ToTable("SMSTaskSmtpDetails");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.BodyText)
                .HasMaxLength(6000)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.FromAddress)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.GatewayName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MessageBody)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.MessageSubject)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Subject)
                .HasMaxLength(6000)
                .IsUnicode(false);
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.SmstaskSmtpDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTaskSmtpDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SmstaskSmtpDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTaskSmtpDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SmstaskSmtpDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTaskSmtpDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.InverseSchool)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTaskSmtpDetails_SchoolId");

            entity.HasOne(d => d.Task).WithMany(p => p.SmstaskSmtpDetails)
                .HasForeignKey(d => d.TaskId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTaskSmtpDetails_TaskId");
        });

        modelBuilder.Entity<SmstaskStatusMaster>(entity =>
        {
            entity.ToTable("SMSTaskStatusMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.SmstaskStatusMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTaskStatusMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SmstaskStatusMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTaskStatusMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SmstaskStatusMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTaskStatusMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.InverseSchool)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTaskStatusMaster_SchoolId");
        });

        modelBuilder.Entity<SmtpDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.BodyText)
                .HasMaxLength(6000)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.EmailType)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FromAddress)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.GatewayName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Subject)
                .HasMaxLength(6000)
                .IsUnicode(false);
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.SmtpDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SmtpDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SmtpDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SmtpDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SmtpDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SmtpDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.InverseSchool)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SmtpDetails_SchoolId");
        });

        modelBuilder.Entity<StateMaster>(entity =>
        {
            entity.ToTable("StateMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.StateName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(250)
                .IsUnicode(false);

            entity.HasOne(d => d.Country).WithMany(p => p.StateMasters)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StateMaster_CountryID");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.StateMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StateMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.StateMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_StateMaster_ModifiedBy");
        });

        modelBuilder.Entity<StudentAchievement>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.SchoolName)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.StudentAchievements)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentAchievements_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.StudentAchievementCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentAchievements_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.StudentAchievementModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentAchievements_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.InverseSchool)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentAchievements_SchoolId");

            entity.HasOne(d => d.SessionNavigation).WithMany(p => p.InverseSessionNavigation)
                .HasForeignKey(d => d.Session)
                .HasConstraintName("FK_StudentAchievements_SessionId");
        });

        modelBuilder.Entity<StudentAttendanceDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.AttendenceDate).HasColumnType("datetime");
            entity.Property(e => e.AttendenceTime)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.StudentGuid).HasColumnName("StudentGUID");

            entity.HasOne(d => d.AttendanceReason).WithMany(p => p.StudentAttendanceDetails)
                .HasForeignKey(d => d.AttendanceReasonId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentAttendanceDetails_AttendanceReasonId");

            entity.HasOne(d => d.Class).WithMany(p => p.StudentAttendanceDetails)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentAttendanceDetails_ClassId");

            entity.HasOne(d => d.Company).WithMany(p => p.StudentAttendanceDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentAttendanceDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.StudentAttendanceDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentAttendanceDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.StudentAttendanceDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_StudentAttendanceDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.InverseSchool)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentAttendanceDetails_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.StudentAttendanceDetails)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentAttendanceDetails_SectionId");

            entity.HasOne(d => d.Student).WithMany(p => p.StudentAttendanceDetails)
                .HasForeignKey(d => d.StudentGuid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentAttendanceDetails_StudentGUID");
        });

        modelBuilder.Entity<StudentCommentDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.DescriptionFinal)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.DescriptionQtr1)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.DescriptionQtr2)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.DescriptionQtr3)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.DescriptionSa1)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("DescriptionSA1");
            entity.Property(e => e.DescriptionSa2)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("DescriptionSA2");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.StudentGuid).HasColumnName("StudentGUID");

            entity.HasOne(d => d.Class).WithMany(p => p.StudentCommentDetails)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentCommentDetails_ClassId");

            entity.HasOne(d => d.Company).WithMany(p => p.StudentCommentDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentCommentDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.StudentCommentDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentCommentDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.StudentCommentDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_StudentCommentDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.InverseSchool)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentCommentDetails_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.StudentCommentDetails)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentCommentDetails_SectionId");

            entity.HasOne(d => d.Session).WithMany(p => p.StudentCommentDetails)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentCommentDetails_SessionId");

            entity.HasOne(d => d.Student).WithMany(p => p.StudentCommentDetails)
                .HasForeignKey(d => d.StudentGuid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentCommentDetails_StudentGUID");
        });

        modelBuilder.Entity<StudentCommentDetailsHistory>(entity =>
        {
            entity.ToTable("StudentCommentDetailsHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.FinalDesc)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Q1desc)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("Q1Desc");
            entity.Property(e => e.Q2desc)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("Q2Desc");
            entity.Property(e => e.Q3desc)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("Q3Desc");
            entity.Property(e => e.Sa1desc)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("SA1Desc");
            entity.Property(e => e.Sa2desc)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("SA2Desc");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Class).WithMany(p => p.StudentCommentDetailsHistories)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentCommentDetailsHistory_ClassId");

            entity.HasOne(d => d.Company).WithMany(p => p.StudentCommentDetailsHistories)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentCommentDetailsHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.StudentCommentDetailsHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentCommentDetailsHistory_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.StudentCommentDetailsHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_StudentCommentDetailsHistory_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.StudentCommentDetailsHistories)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentCommentDetailsHistory_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.StudentCommentDetailsHistories)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentCommentDetailsHistory_SectionId");

            entity.HasOne(d => d.StudentComment).WithMany(p => p.StudentCommentDetailsHistories)
                .HasForeignKey(d => d.StudentCommentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentCommentDetailsHistory_StudentCommentId");

            entity.HasOne(d => d.Student).WithMany(p => p.StudentCommentDetailsHistories)
                .HasForeignKey(d => d.StudentGuid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentCommentDetailsHistory_StudentGUID");
        });

        modelBuilder.Entity<StudentFeeDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.DueDate).HasColumnType("datetime");
            entity.Property(e => e.FeeReceiptNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LateFeeAmount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.PaidDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.StudentGuid).HasColumnName("StudentGUID");
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Class).WithMany(p => p.StudentFeeDetails)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentFeeDetails_ClassId");

            entity.HasOne(d => d.Company).WithMany(p => p.StudentFeeDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentFeeDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.StudentFeeDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentFeeDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.StudentFeeDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_StudentFeeDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.StudentFeeDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentFeeDetails_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.StudentFeeDetails)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentFeeDetails_SectionId");

            entity.HasOne(d => d.Student).WithMany(p => p.StudentFeeDetails)
                .HasForeignKey(d => d.StudentGuid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentFeeDetails_StudentGUID");
        });

        modelBuilder.Entity<StudentFeeDetailsHistory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_StudentFeesDetailHistory");

            entity.ToTable("StudentFeeDetailsHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.DueDate).HasColumnType("datetime");
            entity.Property(e => e.LateFeesAmount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.PaidDate).HasColumnType("datetime");
            entity.Property(e => e.ReceiptNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Class).WithMany(p => p.StudentFeeDetailsHistories)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentFeeDetailsHistory_ClassId");

            entity.HasOne(d => d.Company).WithMany(p => p.StudentFeeDetailsHistories)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentFeeDetailsHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.StudentFeeDetailsHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentFeeDetailsHistory_CreatedBy");

            entity.HasOne(d => d.FeesCategory).WithMany(p => p.StudentFeeDetailsHistories)
                .HasForeignKey(d => d.FeesCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentFeeDetailsHistory_FeesCategoryId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.StudentFeeDetailsHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_StudentFeeDetailsHistory_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.StudentFeeDetailsHistories)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentFeeDetailsHistory_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.StudentFeeDetailsHistories)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentFeeDetailsHistory_SectionId");

            entity.HasOne(d => d.Student).WithMany(p => p.StudentFeeDetailsHistories)
                .HasForeignKey(d => d.StudentGuid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentFeeDetailsHistory_StudentGUID");
        });

        modelBuilder.Entity<StudentGradeDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.GradeFa1)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("GradeFA1");
            entity.Property(e => e.GradeFa2)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("GradeFA2");
            entity.Property(e => e.GradeFa3)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("GradeFA3");
            entity.Property(e => e.GradeFa4)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("GradeFA4");
            entity.Property(e => e.GradeQ1)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.GradeQ2)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.GradeQ3)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.GradeSa1)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("GradeSA1");
            entity.Property(e => e.GradeSa2)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("GradeSA2");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.StudentGuid).HasColumnName("StudentGUID");

            entity.HasOne(d => d.Category).WithMany(p => p.StudentGradeDetails)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentGradeDetails_CategoryId");

            entity.HasOne(d => d.Class).WithMany(p => p.StudentGradeDetails)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentGradeDetails_ClassId");

            entity.HasOne(d => d.Company).WithMany(p => p.StudentGradeDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentGradeDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.StudentGradeDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentGradeDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.StudentGradeDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_StudentGradeDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.StudentGradeDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentGradeDetails_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.StudentGradeDetails)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentGradeDetails_SectionId");

            entity.HasOne(d => d.Session).WithMany(p => p.StudentGradeDetails)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentGradeDetails_SessionIds");

            entity.HasOne(d => d.Student).WithMany(p => p.StudentGradeDetails)
                .HasForeignKey(d => d.StudentGuid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentGradeDetails_StudentGUID");
        });

        modelBuilder.Entity<StudentGradeDetailsHistory>(entity =>
        {
            entity.ToTable("StudentGradeDetailsHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.GradeFa1)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("GradeFA1");
            entity.Property(e => e.GradeFa2)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("GradeFA2");
            entity.Property(e => e.GradeFa3)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("GradeFA3");
            entity.Property(e => e.GradeFa4)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("GradeFA4");
            entity.Property(e => e.GradeQ1).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.GradeQ2).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.GradeQ3).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.GradeSa1)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("GradeSA1");
            entity.Property(e => e.GradeSa2)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("GradeSA2");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.StudentGuid).HasColumnName("StudentGUID");

            entity.HasOne(d => d.Category).WithMany(p => p.StudentGradeDetailsHistories)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentGradeDetailsHistory_CategoryId");

            entity.HasOne(d => d.Class).WithMany(p => p.StudentGradeDetailsHistories)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentGradeDetailsHistory_ClassId");

            entity.HasOne(d => d.Company).WithMany(p => p.StudentGradeDetailsHistories)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentGradeDetailsHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.StudentGradeDetailsHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentGradeDetailsHistory_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.StudentGradeDetailsHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_StudentGradeDetailsHistory_ModifiedBy");

            entity.HasOne(d => d.ScholisticCategory).WithMany(p => p.StudentGradeDetailsHistories)
                .HasForeignKey(d => d.ScholisticCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentGradeDetailsHistory_ScholisticCategoryId");

            entity.HasOne(d => d.School).WithMany(p => p.StudentGradeDetailsHistories)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentGradeDetailsHistory_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.StudentGradeDetailsHistories)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentGradeDetailsHistory_SectionId");

            entity.HasOne(d => d.Session).WithMany(p => p.StudentGradeDetailsHistories)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentGradeDetails_SessionId");

            entity.HasOne(d => d.StudentGrade).WithMany(p => p.StudentGradeDetailsHistories)
                .HasForeignKey(d => d.StudentGradeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentGradeDetailsHistory_StudentGradeId");

            entity.HasOne(d => d.Student).WithMany(p => p.StudentGradeDetailsHistories)
                .HasForeignKey(d => d.StudentGuid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentGradeDetailsHistory_StudentGUID");
        });

        modelBuilder.Entity<StudentMarksDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.GradeFa1)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("GradeFA1");
            entity.Property(e => e.GradeFa2)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("GradeFA2");
            entity.Property(e => e.GradeFa3)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("GradeFA3");
            entity.Property(e => e.GradeFa4)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("GradeFA4");
            entity.Property(e => e.GradeQ1).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.GradeQ2).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.GradeQ3).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.GradeSa1)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("GradeSA1");
            entity.Property(e => e.GradeSa2)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("GradeSA2");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.StudentGuid).HasColumnName("StudentGUID");

            entity.HasOne(d => d.Class).WithMany(p => p.StudentMarksDetails)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMarksDetails_ClassId");

            entity.HasOne(d => d.Company).WithMany(p => p.StudentMarksDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMarksDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.StudentMarksDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMarksDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.StudentMarksDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_StudentMarksDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.StudentMarksDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMarksDetails_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.StudentMarksDetails)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMarksDetails_SectionId");

            entity.HasOne(d => d.Student).WithMany(p => p.StudentMarksDetails)
                .HasForeignKey(d => d.StudentGuid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMarksDetails_StudentGUID");

            entity.HasOne(d => d.Subject).WithMany(p => p.StudentMarksDetails)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMarksDetails_SubjectId");
        });

        modelBuilder.Entity<StudentMarksDetailsHistory>(entity =>
        {
            entity.ToTable("StudentMarksDetailsHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.GradeFa1)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("GradeFA1");
            entity.Property(e => e.GradeFa2)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("GradeFA2");
            entity.Property(e => e.GradeFa3)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("GradeFA3");
            entity.Property(e => e.GradeFa4)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("GradeFA4");
            entity.Property(e => e.GradeQ1).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.GradeQ2).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.GradeQ3).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.GradeSa1)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("GradeSA1");
            entity.Property(e => e.GradeSa2)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("GradeSA2");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.StudentGuid).HasColumnName("StudentGUID");

            entity.HasOne(d => d.Class).WithMany(p => p.StudentMarksDetailsHistories)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMarksDetailsHistory_ClassId");

            entity.HasOne(d => d.Company).WithMany(p => p.StudentMarksDetailsHistories)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMarksDetailsHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.StudentMarksDetailsHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMarksDetailsHistory_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.StudentMarksDetailsHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_StudentMarksDetailsHistory_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.StudentMarksDetailsHistories)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMarksDetailsHistory_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.StudentMarksDetailsHistories)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMarksDetailsHistory_SectionId");

            entity.HasOne(d => d.Student).WithMany(p => p.StudentMarksDetailsHistories)
                .HasForeignKey(d => d.StudentGuid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMarksDetailsHistory_StudentGUID");

            entity.HasOne(d => d.StudentMarksDetails).WithMany(p => p.StudentMarksDetailsHistories)
                .HasForeignKey(d => d.StudentMarksDetailsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMarksDetailsHistory_StudentMarksDetailsId");

            entity.HasOne(d => d.Subject).WithMany(p => p.StudentMarksDetailsHistories)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMarksDetailsHistory_SubjectId");
        });

        modelBuilder.Entity<StudentMaster>(entity =>
        {
            entity.ToTable("StudentMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.AdditionalNotes)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Address)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.AnnualFees).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.ContactNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.DisabilityAny)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Dob)
                .HasColumnType("datetime")
                .HasColumnName("DOB");
            entity.Property(e => e.Doj)
                .HasColumnType("datetime")
                .HasColumnName("DOJ");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.EmergencyContactNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Hobbies)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Image)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MedicalAlleryAny)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Phone)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PreviousSchoolAttended)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.PreviousSchoolFromDate).HasColumnType("datetime");
            entity.Property(e => e.PreviousSchoolPercentage).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.PreviousSchoolRank)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PreviousSchoolToDate).HasColumnType("datetime");
            entity.Property(e => e.RegistrationNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.TransportFees).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.TutionFees).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.WithdrawnDate).HasColumnType("datetime");
            entity.Property(e => e.WithdrawnReason)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ZipCode)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.BirthCity).WithMany(p => p.StudentMasterBirthCities)
                .HasForeignKey(d => d.BirthCityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMaster_BithCityId");

            entity.HasOne(d => d.BirthCountry).WithMany(p => p.StudentMasterBirthCountries)
                .HasForeignKey(d => d.BirthCountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMaster_BirthCountryId");

            entity.HasOne(d => d.BirthState).WithMany(p => p.StudentMasterBirthStates)
                .HasForeignKey(d => d.BirthStateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMaster_BithStateId");

            entity.HasOne(d => d.BloodGroup).WithMany(p => p.StudentMasters)
                .HasForeignKey(d => d.BloodGroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMaster_BloodGroupId");

            entity.HasOne(d => d.Category).WithMany(p => p.StudentMasters)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMaster_CategoryId");

            entity.HasOne(d => d.City).WithMany(p => p.StudentMasterCities)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMaster");

            entity.HasOne(d => d.Class).WithMany(p => p.StudentMasterClasses)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMaster_ClassId");

            entity.HasOne(d => d.ClassTeacher).WithMany(p => p.StudentMasters)
                .HasForeignKey(d => d.ClassTeacherId)
                .HasConstraintName("FK__StudentMa__Class__08F5448B");

            entity.HasOne(d => d.Company).WithMany(p => p.StudentMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMaster_CompanyId");

            entity.HasOne(d => d.Country).WithMany(p => p.StudentMasterCountries)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMaster_CountryId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.StudentMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMaster_CreatedBy");

            entity.HasOne(d => d.FeesDiscountCategoryMaster).WithMany(p => p.StudentMasters)
                .HasForeignKey(d => d.FeesDiscountCategoryMasterId)
                .HasConstraintName("FK__StudentMa__FeesD__0ADD8CFD");

            entity.HasOne(d => d.GenderNavigation).WithMany(p => p.StudentMasters)
                .HasForeignKey(d => d.Gender)
                .HasConstraintName("FK__StudentMa__Gende__0CC5D56F");

            entity.HasOne(d => d.HouseAllottedNavigation).WithMany(p => p.StudentMasters)
                .HasForeignKey(d => d.HouseAllotted)
                .HasConstraintName("FK_StudentMaster_HouseAllotted");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.StudentMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_StudentMaster_ModifiedBy");

            entity.HasOne(d => d.NationalityNavigation).WithMany(p => p.StudentMasterNationalityNavigations)
                .HasForeignKey(d => d.Nationality)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__StudentMa__Natio__0EAE1DE1");

            entity.HasOne(d => d.PreviousSchoolBoard).WithMany(p => p.StudentMasters)
                .HasForeignKey(d => d.PreviousSchoolBoardId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMaster_PreviousSchoolBoardId");

            entity.HasOne(d => d.PreviousSchoolClass).WithMany(p => p.StudentMasterPreviousSchoolClasses)
                .HasForeignKey(d => d.PreviousSchoolClassId)
                .HasConstraintName("FK_StudentMaster_PreviousSchoolClassId");

            entity.HasOne(d => d.Religion).WithMany(p => p.StudentMasters)
                .HasForeignKey(d => d.ReligionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__StudentMa__Relig__10966653");

            entity.HasOne(d => d.Route).WithMany(p => p.StudentMasters)
                .HasForeignKey(d => d.RouteId)
                .HasConstraintName("FK__StudentMa__Route__1372D2FE");

            entity.HasOne(d => d.RouteStopDetails).WithMany(p => p.StudentMasters)
                .HasForeignKey(d => d.RouteStopDetailsId)
                .HasConstraintName("FK__StudentMa__Route__127EAEC5");

            entity.HasOne(d => d.School).WithMany(p => p.StudentMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMaster_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.StudentMasters)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMaster_SectionId");

            entity.HasOne(d => d.Session).WithMany(p => p.StudentMasters)
                .HasForeignKey(d => d.SessionId)
                .HasConstraintName("FK__StudentMa__Sessi__164F3FA9");

            entity.HasOne(d => d.SiblingClass).WithMany(p => p.StudentMasterSiblingClasses)
                .HasForeignKey(d => d.SiblingClassId)
                .HasConstraintName("FK__StudentMa__Sibli__1837881B");

            entity.HasOne(d => d.State).WithMany(p => p.StudentMasterStates)
                .HasForeignKey(d => d.StateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMaster_StateId");
        });

        modelBuilder.Entity<StudentMasterHistory>(entity =>
        {
            entity.ToTable("StudentMasterHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Address)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.AnnualFees).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.ContactNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.DisabilityAny)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Dob)
                .HasColumnType("datetime")
                .HasColumnName("DOB");
            entity.Property(e => e.Doj)
                .HasColumnType("datetime")
                .HasColumnName("DOJ");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.EmergencyContactNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Hobbies)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Image)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MedicalAlleryAny)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Phone)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PreviousSchoolAttended)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.PreviousSchoolFromDate).HasColumnType("datetime");
            entity.Property(e => e.PreviousSchoolPercentage).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.PreviousSchoolRank)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PreviousSchoolToDate).HasColumnType("datetime");
            entity.Property(e => e.RegistrationNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.TransportFees).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.TutionFees).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.WithdrawnDate).HasColumnType("datetime");
            entity.Property(e => e.WithdrawnReason)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ZipCode)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.BirthCity).WithMany(p => p.StudentMasterHistoryBirthCities)
                .HasForeignKey(d => d.BirthCityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMasterHistory_BithCityId");

            entity.HasOne(d => d.BirthCountry).WithMany(p => p.StudentMasterHistoryBirthCountries)
                .HasForeignKey(d => d.BirthCountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMasterHistory_BirthCountryId");

            entity.HasOne(d => d.BirthState).WithMany(p => p.StudentMasterHistoryBirthStates)
                .HasForeignKey(d => d.BirthStateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMasterHistory_BithStateId");

            entity.HasOne(d => d.BloodGroup).WithMany(p => p.StudentMasterHistories)
                .HasForeignKey(d => d.BloodGroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMasterHistory_BloodGroupId");

            entity.HasOne(d => d.Category).WithMany(p => p.StudentMasterHistories)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMasterHistory_CategoryId");

            entity.HasOne(d => d.City).WithMany(p => p.StudentMasterHistoryCities)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMasterHistory");

            entity.HasOne(d => d.Class).WithMany(p => p.StudentMasterHistoryClasses)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMasterHistory_ClassId");

            entity.HasOne(d => d.ClassTeacher).WithMany(p => p.StudentMasterHistories)
                .HasForeignKey(d => d.ClassTeacherId)
                .HasConstraintName("FK__StudentMa__Class__2A563856");

            entity.HasOne(d => d.Company).WithMany(p => p.StudentMasterHistories)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMasterHistory_CompanyId");

            entity.HasOne(d => d.Country).WithMany(p => p.StudentMasterHistoryCountries)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMasterHistory_CountryId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.StudentMasterHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMasterHistory_CreatedBy");

            entity.HasOne(d => d.FeesDiscountCategoryMaster).WithMany(p => p.StudentMasterHistories)
                .HasForeignKey(d => d.FeesDiscountCategoryMasterId)
                .HasConstraintName("FK__StudentMa__FeesD__2C3E80C8");

            entity.HasOne(d => d.GenderNavigation).WithMany(p => p.StudentMasterHistories)
                .HasForeignKey(d => d.Gender)
                .HasConstraintName("FK__StudentMa__Gende__2E26C93A");

            entity.HasOne(d => d.HouseAllottedNavigation).WithMany(p => p.StudentMasterHistories)
                .HasForeignKey(d => d.HouseAllotted)
                .HasConstraintName("FK_StudentMasterHistory_HouseAllotted");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.StudentMasterHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_StudentMasterHistory_ModifiedBy");

            entity.HasOne(d => d.NationalityNavigation).WithMany(p => p.StudentMasterHistoryNationalityNavigations)
                .HasForeignKey(d => d.Nationality)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__StudentMa__Natio__300F11AC");

            entity.HasOne(d => d.PreviousSchoolBoard).WithMany(p => p.StudentMasterHistories)
                .HasForeignKey(d => d.PreviousSchoolBoardId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMasterHistory_PreviousSchoolBoardId");

            entity.HasOne(d => d.PreviousSchoolClass).WithMany(p => p.StudentMasterHistoryPreviousSchoolClasses)
                .HasForeignKey(d => d.PreviousSchoolClassId)
                .HasConstraintName("FK_StudentMasterHistory_PreviousSchoolClassId");

            entity.HasOne(d => d.Religion).WithMany(p => p.StudentMasterHistories)
                .HasForeignKey(d => d.ReligionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__StudentMa__Relig__31F75A1E");

            entity.HasOne(d => d.Route).WithMany(p => p.StudentMasterHistories)
                .HasForeignKey(d => d.RouteId)
                .HasConstraintName("FK__StudentMa__Route__33DFA290");

            entity.HasOne(d => d.RouteStopDetails).WithMany(p => p.StudentMasterHistories)
                .HasForeignKey(d => d.RouteStopDetailsId)
                .HasConstraintName("FK__StudentMa__Route__34D3C6C9");

            entity.HasOne(d => d.School).WithMany(p => p.StudentMasterHistories)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMasterHistory_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.StudentMasterHistories)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMasterHistory_SectionId");

            entity.HasOne(d => d.Session).WithMany(p => p.StudentMasterHistories)
                .HasForeignKey(d => d.SessionId)
                .HasConstraintName("FK__StudentMa__Sessi__37B03374");

            entity.HasOne(d => d.SiblingClass).WithMany(p => p.StudentMasterHistorySiblingClasses)
                .HasForeignKey(d => d.SiblingClassId)
                .HasConstraintName("FK__StudentMa__Sibli__39987BE6");

            entity.HasOne(d => d.State).WithMany(p => p.StudentMasterHistoryStates)
                .HasForeignKey(d => d.StateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentMasterHistory_StateId");
        });

        modelBuilder.Entity<StudentReportCardDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Fa1grade)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("FA1Grade");
            entity.Property(e => e.Fa1marks)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("FA1Marks");
            entity.Property(e => e.Fa2grade)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("FA2Grade");
            entity.Property(e => e.Fa2marks)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("FA2Marks");
            entity.Property(e => e.Grade)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("GRADE");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.QuarterMarks).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Sagrade)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("SAGrade");
            entity.Property(e => e.Samarks)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("SAMarks");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.TotalGrade)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.TotalMarks).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.TotalMarksFa1)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("TotalMarksFA1");
            entity.Property(e => e.TotalMarksFa2)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("TotalMarksFA2");
            entity.Property(e => e.TotalMarksFinal)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("TotalMarks_Final");
            entity.Property(e => e.TotalMarksQuarter).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.TotalMarksSa)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("TotalMarksSA");

            entity.HasOne(d => d.Company).WithMany(p => p.StudentReportCardDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentReportCardDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.StudentReportCardDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentReportCardDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.StudentReportCardDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_StudentReportCardDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.StudentReportCardDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentReportCardDetails_SchoolId");

            entity.HasOne(d => d.Subject).WithMany(p => p.StudentReportCardDetails)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__StudentRe__Subje__4BB72C21");
        });

        modelBuilder.Entity<StudentReportCardDetailsHistory>(entity =>
        {
            entity.ToTable("StudentReportCardDetailsHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Fa1grade)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("FA1Grade");
            entity.Property(e => e.Fa1marks)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("FA1Marks");
            entity.Property(e => e.Fa2grade)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("FA2Grade");
            entity.Property(e => e.Fa2marks)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("FA2Marks");
            entity.Property(e => e.Grade)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.QuarterMarks).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Sagrade)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("SAGrade");
            entity.Property(e => e.Samarks)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("SAMarks");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.TotalGrade)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.TotalMarks).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.TotalMarksFa1)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("TotalMarksFA1");
            entity.Property(e => e.TotalMarksFa2)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("TotalMarksFA2");
            entity.Property(e => e.TotalMarksFinal)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("TotalMarks_Final");
            entity.Property(e => e.TotalMarksQuarter).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.TotalMarksSa)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("TotalMarksSA");

            entity.HasOne(d => d.Company).WithMany(p => p.StudentReportCardDetailsHistories)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentReportCardDetailsHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.StudentReportCardDetailsHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentReportCardDetailsHistory_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.StudentReportCardDetailsHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_StudentReportCardDetailsHistory_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.StudentReportCardDetailsHistories)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentReportCardDetailsHistory_SchoolId");

            entity.HasOne(d => d.Subject).WithMany(p => p.StudentReportCardDetailsHistories)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__StudentRe__Subje__51700577");
        });

        modelBuilder.Entity<StudentReportCardMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_StudentReportCardMaster_1");

            entity.ToTable("StudentReportCardMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Period)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ReportCardValue)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Class).WithMany(p => p.StudentReportCardMasters)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__StudentRe__Class__5728DECD");

            entity.HasOne(d => d.Company).WithMany(p => p.StudentReportCardMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentReportCardMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.StudentReportCardMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentReportCardMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.StudentReportCardMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_StudentReportCardMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.StudentReportCardMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentReportCardMaster_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.StudentReportCardMasters)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__StudentRe__Secti__5911273F");

            entity.HasOne(d => d.Session).WithMany(p => p.StudentReportCardMasters)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__StudentRe__Sessi__5AF96FB1");
        });

        modelBuilder.Entity<StudentReportCardMasterHistory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_StudentReportCardMasterHistory_1");

            entity.ToTable("StudentReportCardMasterHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Period)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ReportCardValue)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Class).WithMany(p => p.StudentReportCardMasterHistories)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__StudentRe__Class__60B24907");

            entity.HasOne(d => d.Company).WithMany(p => p.StudentReportCardMasterHistories)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentReportCardMasterHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.StudentReportCardMasterHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentReportCardMasterHistory_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.StudentReportCardMasterHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_StudentReportCardMasterHistory_ModifiedBy");

            entity.HasOne(d => d.ReportCard).WithMany(p => p.StudentReportCardMasterHistories)
                .HasForeignKey(d => d.ReportCardId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__StudentRe__Repor__629A9179");

            entity.HasOne(d => d.School).WithMany(p => p.StudentReportCardMasterHistories)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentReportCardMasterHistory_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.StudentReportCardMasterHistories)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__StudentRe__Secti__6482D9EB");

            entity.HasOne(d => d.Session).WithMany(p => p.StudentReportCardMasterHistories)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__StudentRe__Sessi__666B225D");
        });

        modelBuilder.Entity<SubjectCategoryDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.SubjectCategoryDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubjectCategoryDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SubjectCategoryDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubjectCategoryDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SubjectCategoryDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_SubjectCategoryDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.SubjectCategoryDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubjectCategoryDetails_SchoolId");

            entity.HasOne(d => d.Session).WithMany(p => p.SubjectCategoryDetails)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubjectCategoryDetailss_SessionId");

            entity.HasOne(d => d.Subject).WithMany(p => p.InverseSubject)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubjectCategoryDetails_SubjectId");
        });

        modelBuilder.Entity<SubjectCategoryDetailsHistory>(entity =>
        {
            entity.ToTable("SubjectCategoryDetailsHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.SubjectCategoryDetailsHistories)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubjectCategoryDetailsHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SubjectCategoryDetailsHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubjectCategoryDetailsHistory_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SubjectCategoryDetailsHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_SubjectCategoryDetailsHistory_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.SubjectCategoryDetailsHistories)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubjectCategoryDetailsHistory_SchoolId");

            entity.HasOne(d => d.Session).WithMany(p => p.SubjectCategoryDetailsHistories)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubjectCategoryDetailsHistorys_SessionId");

            entity.HasOne(d => d.SubjectCategory).WithMany(p => p.SubjectCategoryDetailsHistories)
                .HasForeignKey(d => d.SubjectCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubjectCategoryDetailsHistory_SubjectCategoryId");

            entity.HasOne(d => d.Subject).WithMany(p => p.InverseSubject)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubjectCategoryDetailsHistory_SubjectId");
        });

        modelBuilder.Entity<SubjectMaster>(entity =>
        {
            entity.ToTable("SubjectMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.SubjectName)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.Class).WithMany(p => p.SubjectMasters)
                .HasForeignKey(d => d.ClassId)
                .HasConstraintName("fk_SubjectMaster_ClassId");

            entity.HasOne(d => d.Company).WithMany(p => p.SubjectMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubjectMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SubjectMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubjectMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SubjectMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_SubjectMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.SubjectMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubjectMaster_SchoolId");
        });

        modelBuilder.Entity<SupplierMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_SUPPLIERMaster");

            entity.ToTable("SupplierMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Address1)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Address2)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.EmailId)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MobileNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.PhonbeNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.ZipCode)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.City).WithMany(p => p.SupplierMasters)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SupplierMaster_CityId");

            entity.HasOne(d => d.Company).WithMany(p => p.SupplierMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SupplierMaster_CompanyId");

            entity.HasOne(d => d.Country).WithMany(p => p.SupplierMasters)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SupplierMaster_CountryId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SupplierMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SupplierMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SupplierMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_SupplierMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.SupplierMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SupplierMaster_SchoolId");

            entity.HasOne(d => d.State).WithMany(p => p.InverseState)
                .HasForeignKey(d => d.StateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SupplierMaster_StateId");
        });

        modelBuilder.Entity<SystemParameter>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.ParameterName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ParameterValue)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.SystemParameters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SystemParameters_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SystemParameterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SystemParameters_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.SystemParameterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_SystemParameters_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.SystemParameters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SystemParameters_SchoolId");
        });

        modelBuilder.Entity<TeacherClassDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Class).WithMany(p => p.TeacherClassDetails)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherClassDetails_ClassId");

            entity.HasOne(d => d.Company).WithMany(p => p.TeacherClassDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherClassDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TeacherClassDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherClassDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.TeacherClassDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_TeacherClassDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.TeacherClassDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherClassDetails_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.TeacherClassDetails)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherClassDetails_SectionId");

            entity.HasOne(d => d.Subject).WithMany(p => p.TeacherClassDetails)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherClassDetails_SubjectId");
        });

        modelBuilder.Entity<TeacherDocumentDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.FileName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.TeacherDocumentDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherDocumentDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TeacherDocumentDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherDocumentDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.TeacherDocumentDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_TeacherDocumentDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.TeacherDocumentDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherDocumentDetails_SchoolId");

            entity.HasOne(d => d.Teacher).WithMany(p => p.TeacherDocumentDetails)
                .HasForeignKey(d => d.TeacherId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherDocumentDetails_TeacherId");
        });

        modelBuilder.Entity<TeacherMaster>(entity =>
        {
            entity.ToTable("TeacherMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Address)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.DateOfLeaving).HasColumnType("datetime");
            entity.Property(e => e.Dob)
                .HasColumnType("datetime")
                .HasColumnName("DOB");
            entity.Property(e => e.Doj)
                .HasColumnType("datetime")
                .HasColumnName("DOJ");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Image)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.MobilePhone)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Phone)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PreviousSchool)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Salutation)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.YearsOfExperience)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ZipCode)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.City).WithMany(p => p.TeacherMasters)
                .HasForeignKey(d => d.CityId)
                .HasConstraintName("FK_TeacherMaster_CityId");

            entity.HasOne(d => d.Company).WithMany(p => p.TeacherMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherMaster_CompanyId");

            entity.HasOne(d => d.Country).WithMany(p => p.TeacherMasters)
                .HasForeignKey(d => d.CountryId)
                .HasConstraintName("FK_TeacherMaster_CountryId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TeacherMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherMaster_CreatedBy");

            entity.HasOne(d => d.GenderNavigation).WithMany(p => p.TeacherMasters)
                .HasForeignKey(d => d.Gender)
                .HasConstraintName("FK_TeacherMaster_Gender");

            entity.HasOne(d => d.MaritalStatus).WithMany(p => p.TeacherMasters)
                .HasForeignKey(d => d.MaritalStatusId)
                .HasConstraintName("FK__TeacherMa__Marit__133DC8D4");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.TeacherMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_TeacherMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.TeacherMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherMaster_SchoolId");

            entity.HasOne(d => d.State).WithMany(p => p.TeacherMasters)
                .HasForeignKey(d => d.StateId)
                .HasConstraintName("FK_TeacherMaster_StateId");
        });

        modelBuilder.Entity<TeacherQualificationDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.TeacherQualificationDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherQualificationDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TeacherQualificationDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherQualificationDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.TeacherQualificationDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_TeacherQualificationDetails_ModifiedBy");

            entity.HasOne(d => d.Qualification).WithMany(p => p.TeacherQualificationDetails)
                .HasForeignKey(d => d.QualificationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherQualificationDetails_QualificationId");

            entity.HasOne(d => d.School).WithMany(p => p.TeacherQualificationDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherQualificationDetails_SchoolId");

            entity.HasOne(d => d.Teacher).WithMany(p => p.TeacherQualificationDetails)
                .HasForeignKey(d => d.TeacherId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherQualificationDetails_TeacherId");
        });

        modelBuilder.Entity<TeacherSectionDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Class).WithMany(p => p.TeacherSectionDetails)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherSectionDetails_ClassId");

            entity.HasOne(d => d.Company).WithMany(p => p.TeacherSectionDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherSectionDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TeacherSectionDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherSectionDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.TeacherSectionDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_TeacherSectionDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.TeacherSectionDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherSectionDetails_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.TeacherSectionDetails)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherSectionDetails_SectionId");

            entity.HasOne(d => d.Subject).WithMany(p => p.TeacherSectionDetails)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherSectionDetails_SubjectId");

            entity.HasOne(d => d.Teacher).WithMany(p => p.TeacherSectionDetails)
                .HasForeignKey(d => d.TeacherId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherSectionDetails_TeacherId");
        });

        modelBuilder.Entity<TeacherSubjectDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Class).WithMany(p => p.TeacherSubjectDetails)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherSubjectDetails_ClassId");

            entity.HasOne(d => d.Company).WithMany(p => p.TeacherSubjectDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherSubjectDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TeacherSubjectDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherSubjectDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.TeacherSubjectDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_TeacherSubjectDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.TeacherSubjectDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherSubjectDetails_SchoolId");

            entity.HasOne(d => d.Subject).WithMany(p => p.TeacherSubjectDetails)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherSubjectDetails_SubjectId");

            entity.HasOne(d => d.Teacher).WithMany(p => p.TeacherSubjectDetails)
                .HasForeignKey(d => d.TeacherId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeacherSubjectDetails_TeacherId");
        });

        modelBuilder.Entity<TimeTableClassPeriodDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Class).WithMany(p => p.TimeTableClassPeriodDetails)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableClassPeriodDetails_ClassId");

            entity.HasOne(d => d.Company).WithMany(p => p.TimeTableClassPeriodDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableClassPeriodDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TimeTableClassPeriodDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableClassPeriodDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.TimeTableClassPeriodDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_TimeTableClassPeriodDetails_ModifiedBy");

            entity.HasOne(d => d.Period).WithMany(p => p.TimeTableClassPeriodDetails)
                .HasForeignKey(d => d.PeriodId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableClassPeriodDetails_PeriodId");

            entity.HasOne(d => d.School).WithMany(p => p.TimeTableClassPeriodDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableClassPeriodDetails_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.TimeTableClassPeriodDetails)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableClassPeriodDetails_SectionId");

            entity.HasOne(d => d.Session).WithMany(p => p.TimeTableClassPeriodDetails)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableClassPeriodDetailss_SessionId");

            entity.HasOne(d => d.Subject).WithMany(p => p.TimeTableClassPeriodDetails)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableClassPeriodDetails_SubjectId");

            entity.HasOne(d => d.Teacher).WithMany(p => p.TimeTableClassPeriodDetails)
                .HasForeignKey(d => d.TeacherId)
                .HasConstraintName("FK_TimeTableClassPeriodDetails_TeacherID");
        });

        modelBuilder.Entity<TimeTableClassPeriodDetailsHistory>(entity =>
        {
            entity.ToTable("TimeTableClassPeriodDetailsHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Class).WithMany(p => p.TimeTableClassPeriodDetailsHistories)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableClassPeriodDetailsHistory_ClassId");

            entity.HasOne(d => d.Company).WithMany(p => p.TimeTableClassPeriodDetailsHistories)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableClassPeriodDetailsHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TimeTableClassPeriodDetailsHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableClassPeriodDetailsHistory_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.TimeTableClassPeriodDetailsHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_TimeTableClassPeriodDetailsHistory_ModifiedBy");

            entity.HasOne(d => d.Period).WithMany(p => p.TimeTableClassPeriodDetailsHistories)
                .HasForeignKey(d => d.PeriodId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableClassPeriodDetailsHistory_PeriodId");

            entity.HasOne(d => d.School).WithMany(p => p.TimeTableClassPeriodDetailsHistories)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableClassPeriodDetailsHistory_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.TimeTableClassPeriodDetailsHistories)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableClassPeriodDetailsHistory_SectionId");

            entity.HasOne(d => d.Session).WithMany(p => p.TimeTableClassPeriodDetailsHistories)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableClassPeriodDetailsHistorys_SessionId");

            entity.HasOne(d => d.Subject).WithMany(p => p.TimeTableClassPeriodDetailsHistories)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableClassPeriodDetailsHistory_SubjectId");
        });

        modelBuilder.Entity<TimeTableDetailsHistory>(entity =>
        {
            entity.ToTable("TimeTableDetailsHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Class).WithMany(p => p.TimeTableDetailsHistories)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableDetailsHistory_ClassId");

            entity.HasOne(d => d.Company).WithMany(p => p.TimeTableDetailsHistories)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableDetailsHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TimeTableDetailsHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableDetailsHistory_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.TimeTableDetailsHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_TimeTableDetailsHistory_ModifiedBy");

            entity.HasOne(d => d.Period).WithMany(p => p.TimeTableDetailsHistories)
                .HasForeignKey(d => d.PeriodId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableDetailsHistory_PeriodId");

            entity.HasOne(d => d.School).WithMany(p => p.TimeTableDetailsHistories)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableDetailsHistory_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.TimeTableDetailsHistories)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableDetailsHistory_SectionId");

            entity.HasOne(d => d.Session).WithMany(p => p.TimeTableDetailsHistories)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableDetailsHistorys_SessionId");

            entity.HasOne(d => d.Subject).WithMany(p => p.TimeTableDetailsHistories)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableDetailsHistory_SubjectId");

            entity.HasOne(d => d.Teacher).WithMany(p => p.TimeTableDetailsHistories)
                .HasForeignKey(d => d.TeacherId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableDetailsHistory_TeacherId");
        });

        modelBuilder.Entity<TimeTablePeriodMaster>(entity =>
        {
            entity.ToTable("TimeTablePeriodMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.PeriodNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.TimeTablePeriodMasters)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTablePeriodMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TimeTablePeriodMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTablePeriodMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.TimeTablePeriodMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_TimeTablePeriodMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.TimeTablePeriodMasters)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTablePeriodMaster_SchoolId");

            entity.HasOne(d => d.Session).WithMany(p => p.TimeTablePeriodMasters)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTablePeriodMasters_SessionId");
        });

        modelBuilder.Entity<TimeTableSession>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasDefaultValue("INC");
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.TimeTableSessionDescription)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.TimeTableSessionName)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.TimeTableSessions)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSessions_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TimeTableSessionCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSessions_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.TimeTableSessionModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_TimeTableSessions_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.TimeTableSessions)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSessions_SchoolId");
        });

        modelBuilder.Entity<TimeTableSetupDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.PeriodStartTime).HasPrecision(0);
            entity.Property(e => e.SchoolEndTime).HasPrecision(0);
            entity.Property(e => e.SchoolStartTime).HasPrecision(0);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasDefaultValue("INC");
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.TimeTableSetupDetails)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSetupDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TimeTableSetupDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSetupDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.TimeTableSetupDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_TimeTableSetupDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.TimeTableSetupDetails)
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSetupDetails_SchoolId");

            entity.HasOne(d => d.Session).WithMany(p => p.TimeTableSetupDetails)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSetupDetailss_SessionId");
        });

        modelBuilder.Entity<TimeTableSetupDetailsHistory>(entity =>
        {
            entity.ToTable("TimeTableSetupDetailsHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.PeriodStartTime).HasPrecision(0);
            entity.Property(e => e.SchoolEndTime).HasPrecision(0);
            entity.Property(e => e.SchoolStartTime).HasPrecision(0);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.TimeTableSetupDetailsHistories)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_TimeTableSetupDetailsHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TimeTableSetupDetailsHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSetupDetailsHistory_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.TimeTableSetupDetailsHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_TimeTableSetupDetailsHistory_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.TimeTableSetupDetailsHistories)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK_TimeTableSetupDetailsHistory_SchoolId");

            entity.HasOne(d => d.Session).WithMany(p => p.TimeTableSetupDetailsHistories)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSetupDetailsHistorys_SessionId");
        });

        modelBuilder.Entity<TimeTableSubstitutionDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.SubstitutionDate).HasColumnType("datetime");

            entity.HasOne(d => d.Class).WithMany(p => p.TimeTableSubstitutionDetails)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSubstitutionDetails_ClassId");

            entity.HasOne(d => d.Company).WithMany(p => p.TimeTableSubstitutionDetails)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_TimeTableSubstitutionDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TimeTableSubstitutionDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSubstitutionDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.TimeTableSubstitutionDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_TimeTableSubstitutionDetails_ModifiedBy");

            entity.HasOne(d => d.Period).WithMany(p => p.TimeTableSubstitutionDetails)
                .HasForeignKey(d => d.PeriodId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSubstitutionDetails_PeriodId");

            entity.HasOne(d => d.School).WithMany(p => p.TimeTableSubstitutionDetails)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK_TimeTableSubstitutionDetails_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.TimeTableSubstitutionDetails)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSubstitutionDetails_SectionId");

            entity.HasOne(d => d.Session).WithMany(p => p.TimeTableSubstitutionDetails)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSubstitutionDetails_SessionId");

            entity.HasOne(d => d.Subject).WithMany(p => p.TimeTableSubstitutionDetails)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSubstitutionDetails_SubjectId");

            entity.HasOne(d => d.Teacher).WithMany(p => p.TimeTableSubstitutionDetailTeachers)
                .HasForeignKey(d => d.TeacherId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSubstitutionDetails_TeacherId");

            entity.HasOne(d => d.TeacherNew).WithMany(p => p.TimeTableSubstitutionDetailTeacherNews)
                .HasForeignKey(d => d.TeacherNewId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSubstitutionDetails_TeacherNewId");
        });

        modelBuilder.Entity<TimeTableSubstitutionDetailsHistory>(entity =>
        {
            entity.ToTable("TimeTableSubstitutionDetailsHistory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.SubstitutionDate).HasColumnType("datetime");

            entity.HasOne(d => d.Class).WithMany(p => p.TimeTableSubstitutionDetailsHistories)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSubstitutionDetailsHistory_ClassId");

            entity.HasOne(d => d.Company).WithMany(p => p.TimeTableSubstitutionDetailsHistories)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_TimeTableSubstitutionDetailsHistory_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TimeTableSubstitutionDetailsHistoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSubstitutionDetailsHistory_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.TimeTableSubstitutionDetailsHistoryModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_TimeTableSubstitutionDetailsHistory_ModifiedBy");

            entity.HasOne(d => d.Period).WithMany(p => p.TimeTableSubstitutionDetailsHistories)
                .HasForeignKey(d => d.PeriodId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSubstitutionDetailsHistory_PeriodId");

            entity.HasOne(d => d.School).WithMany(p => p.TimeTableSubstitutionDetailsHistories)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK_TimeTableSubstitutionDetailsHistory_SchoolId");

            entity.HasOne(d => d.Section).WithMany(p => p.TimeTableSubstitutionDetailsHistories)
                .HasForeignKey(d => d.SectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSubstitutionDetailsHistory_SectionId");

            entity.HasOne(d => d.Session).WithMany(p => p.TimeTableSubstitutionDetailsHistories)
                .HasForeignKey(d => d.SessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSubstitutionDetailsHistory_SessionId");

            entity.HasOne(d => d.Subject).WithMany(p => p.TimeTableSubstitutionDetailsHistories)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSubstitutionDetailsHistory_SubjectId");

            entity.HasOne(d => d.Teacher).WithMany(p => p.TimeTableSubstitutionDetailsHistoryTeachers)
                .HasForeignKey(d => d.TeacherId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSubstitutionDetailsHistory_TeacherId");

            entity.HasOne(d => d.TeacherNew).WithMany(p => p.TimeTableSubstitutionDetailsHistoryTeacherNews)
                .HasForeignKey(d => d.TeacherNewId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TimeTableSubstitutionDetailsHistory_TeacherNewId");
        });

        modelBuilder.Entity<UserDetail>(entity =>
        {
            entity.HasIndex(e => e.UserName, "UK_UserDetails_UserName").IsUnique();

            entity.HasIndex(e => e.EmailAddress, "UQ_UserDetails_EmailAddress").IsUnique();

            entity.HasIndex(e => e.UserName, "UQ_UserDetails_UserName").IsUnique();

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.EmailAddress)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasDefaultValue("INC");
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.UserName)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.UserPassword).HasMaxLength(256);

            entity.HasOne(d => d.Company).WithMany(p => p.UserDetails)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_UserDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.InverseCreatedByNavigation)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FL_UserDetails_CreatedBy");

            entity.HasOne(d => d.Designation).WithMany(p => p.UserDetails)
                .HasForeignKey(d => d.DesignationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserDetails_DesignationID");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.InverseModifiedByNavigation)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_UserDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.UserDetails)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK_UserDetails_SchoolID");

            entity.HasOne(d => d.UserRole).WithMany(p => p.UserDetails)
                .HasForeignKey(d => d.UserRoleId)
                .HasConstraintName("FL_UserDetails_UserRoleId");
        });

        modelBuilder.Entity<VehicleExpenseDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ExpenseAmount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.ExpenseDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);

            entity.HasOne(d => d.Company).WithMany(p => p.VehicleExpenseDetails)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_VehicleExpenseDetails_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.VehicleExpenseDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VehicleExpenseDetails_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.VehicleExpenseDetailModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_VehicleExpenseDetails_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.VehicleExpenseDetails)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK_VehicleExpenseDetails_SchoolId");

            entity.HasOne(d => d.Vehicle).WithMany(p => p.VehicleExpenseDetails)
                .HasForeignKey(d => d.VehicleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VehicleExpenseDetails_VehicleId");

            entity.HasOne(d => d.VehicleType).WithMany(p => p.VehicleExpenseDetails)
                .HasForeignKey(d => d.VehicleTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VehicleExpenseDetails_VehicleTypeId");
        });

        modelBuilder.Entity<VehicleMaster>(entity =>
        {
            entity.ToTable("VehicleMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.InsuranceCompany)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.InsurancePremium).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.RegistrationNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.VehicleMake)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.VehicleModel)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.VehicleNumber)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.VehicleMasters)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_VehicleMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.VehicleMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VehicleMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.VehicleMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_VehicleMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.VehicleMasters)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK_VehicleMaster_SchoolId");

            entity.HasOne(d => d.VehicleType).WithMany(p => p.VehicleMasters)
                .HasForeignKey(d => d.VehicleTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VehicleMaster_VehicleTypeId");
        });

        modelBuilder.Entity<VehicleTypeMaster>(entity =>
        {
            entity.ToTable("VehicleTypeMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.VehicleType)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.VehicleTypeMasters)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_VehicleTypeMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.VehicleTypeMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VehicleTypeMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.VehicleTypeMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_VehicleTypeMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.VehicleTypeMasters)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK_VehicleTypeMaster_SchoolId");
        });

        modelBuilder.Entity<VendorMaster>(entity =>
        {
            entity.ToTable("VendorMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Address1)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Address2)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ContactNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.EmailId)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MobileNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.VendorName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ZipCode)
                .HasMaxLength(150)
                .IsUnicode(false);

            entity.HasOne(d => d.City).WithMany(p => p.VendorMasters)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VendorMaster_CityMaster");

            entity.HasOne(d => d.Company).WithMany(p => p.VendorMasters)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_VendorMaster_CompanyId");

            entity.HasOne(d => d.Country).WithMany(p => p.VendorMasters)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VendorMaster_CountryMaster");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.VendorMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VendorMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.VendorMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_VendorMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.VendorMasters)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK_VendorMaster_SchoolId");

            entity.HasOne(d => d.State).WithMany(p => p.VendorMasters)
                .HasForeignKey(d => d.StateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VendorMaster_StateMaster");
        });

        modelBuilder.Entity<VisitorMaster>(entity =>
        {
            entity.ToTable("VisitorMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Address1)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Address2)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.ArrivalTime).HasPrecision(0);
            entity.Property(e => e.ContactPerson)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.DateOfEntry).HasColumnType("datetime");
            entity.Property(e => e.ExitTime).HasPrecision(0);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Purpose)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.VehicleName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.VehicleNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ZipCode)
                .HasMaxLength(150)
                .IsUnicode(false);

            entity.HasOne(d => d.City).WithMany(p => p.VisitorMasters)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VisitorMaster_CityId");

            entity.HasOne(d => d.Company).WithMany(p => p.VisitorMasters)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_VisitorMaster_CompanyId");

            entity.HasOne(d => d.Country).WithMany(p => p.VisitorMasters)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VisitorMaster_CountryId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.VisitorMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VisitorMaster_CreatedBy");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.VisitorMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_VisitorMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.VisitorMasters)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK_VisitorMaster_SchoolId");

            entity.HasOne(d => d.State).WithMany(p => p.VisitorMasters)
                .HasForeignKey(d => d.StateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VisitorMaster_StateId");
        });

        modelBuilder.Entity<VoucherMaster>(entity =>
        {
            entity.ToTable("VoucherMaster");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IssueDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StatusMessage).HasMaxLength(255);
            entity.Property(e => e.VoucherName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.VoucherNumber)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Company).WithMany(p => p.VoucherMasters)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_VoucherMaster_CompanyId");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.VoucherMasterCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VoucherMaster_CreatedBy");

            entity.HasOne(d => d.ExpenseCategory).WithMany(p => p.VoucherMasters)
                .HasForeignKey(d => d.ExpenseCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VoucherMaster_ExpenseCategoryId");

            entity.HasOne(d => d.ModifiedByNavigation).WithMany(p => p.VoucherMasterModifiedByNavigations)
                .HasForeignKey(d => d.ModifiedBy)
                .HasConstraintName("FK_VoucherMaster_ModifiedBy");

            entity.HasOne(d => d.School).WithMany(p => p.VoucherMasters)
                .HasForeignKey(d => d.SchoolId)
                .HasConstraintName("FK_VoucherMaster_SchoolId");
        });

        modelBuilder.Entity<TransportAssignment>(entity =>
        {
            entity.ToTable("TransportAssignment");
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.PickupPoint).HasMaxLength(500);
            entity.Property(e => e.DropPoint).HasMaxLength(500);
            entity.Property(e => e.MonthlyFee).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.IsDeleted).HasDefaultValue(false);

            entity.HasOne(d => d.Student).WithMany()
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TransportAssignment_StudentId");

            entity.HasOne(d => d.Vehicle).WithMany()
                .HasForeignKey(d => d.VehicleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TransportAssignment_VehicleId");

            entity.HasOne(d => d.Driver).WithMany()
                .HasForeignKey(d => d.DriverId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TransportAssignment_DriverId");

            entity.HasOne(d => d.Route).WithMany(p => p.TransportAssignments)
                .HasForeignKey(d => d.RouteId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TransportAssignment_RouteId");
        });

        modelBuilder.Entity<TransportSetting>(entity =>
        {
            entity.ToTable("TransportSetting");
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.SettingName).IsRequired().HasMaxLength(200);
            entity.Property(e => e.SettingDescription).HasMaxLength(500);
            entity.Property(e => e.SettingValue).HasMaxLength(1000);
            entity.Property(e => e.SettingType).HasMaxLength(50);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.IsDeleted).HasDefaultValue(false);

            entity.HasOne(d => d.Company).WithMany()
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TransportSetting_CompanyId");

            entity.HasOne(d => d.School).WithMany()
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TransportSetting_SchoolId");
        });

        modelBuilder.Entity<TransportHelp>(entity =>
        {
            entity.ToTable("TransportHelp");
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.HelpTitle).IsRequired().HasMaxLength(200);
            entity.Property(e => e.HelpDescription).IsRequired();
            entity.Property(e => e.HelpCategory).HasMaxLength(100);
            entity.Property(e => e.HelpSolution).HasMaxLength(2000);
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.IsDeleted).HasDefaultValue(false);

            entity.HasOne(d => d.Company).WithMany()
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TransportHelp_CompanyId");

            entity.HasOne(d => d.School).WithMany()
                .HasForeignKey(d => d.SchoolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TransportHelp_SchoolId");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
