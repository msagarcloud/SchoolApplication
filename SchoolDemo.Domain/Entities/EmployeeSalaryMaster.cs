using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolDemo.Domain.Entities;

public class EmployeeSalaryMaster
{
    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public int Month { get; set; }
    public int Year { get; set; }
    public Guid SessionId { get; set; }
    public DateTime BatchPrintDate { get; set; }
    public decimal? BasicSalary { get; set; }
    public decimal? Allowance { get; set; }
    public decimal? Deductions { get; set; }
    public decimal? NetSalary { get; set; }
    public int TotalWorkingDays { get; set; }
    public decimal? PresentDays { get; set; }
    public decimal? AbsentDays { get; set; }
    public decimal? LeaveDays { get; set; }
    public string? LeaveDescription { get; set; }
    public string? LeaveBalanceDescription { get; set; }
    public decimal? SalaryPerDay { get; set; }
    public Guid DepartmentId { get; set; }
    public Guid DesignationId { get; set; }
    public Guid GradeId { get; set; }
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

    // Navigation properties
    public Company? Company { get; set; }
    public School? School { get; set; }
    public Employee? Employee { get; set; }
    public SessionMaster? Session { get; set; }
    public DeptMaster? Department { get; set; }
    public DesigMaster? Designation { get; set; }
    public GradeMaster? Grade { get; set; }
    [NotMapped]
    public User? CreatedByNavigation { get; set; }
    [NotMapped]
    public User? ModifiedByNavigation { get; set; }
}
