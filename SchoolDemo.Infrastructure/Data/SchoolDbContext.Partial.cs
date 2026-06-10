using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Infrastructure.Data;

public partial class SchoolDbContext
{
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
    {
        // Exclude the domain entities from model since we have infrastructure versions
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.MenuMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.RoleMenuMapping>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.StudentMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.VehicleMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.BloodGroupMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.CategoryMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.CleanerMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.DeptMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.DesigMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.DriverMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.EmpCategoryMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.EmpTypeMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.EnquiryMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.FeesCategoryMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.FeesDiscountCategoryMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.GenderMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.GradeMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.HolidayMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.HolidayTypeMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.HouseMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.LeaveTypeMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.ParentMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.PaymentModeMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.ProfessionMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.QualificationMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.RelationTypeMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.ReligionMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.RoleMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.RouteMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.SalaryHeadMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.SalaryTypeMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.SessionMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.TeacherMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.TimeTablePeriodMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.VehicleTypeMaster>();
        modelBuilder.Ignore<SchoolDemo.Domain.Entities.VisitorMaster>();
    }
}
