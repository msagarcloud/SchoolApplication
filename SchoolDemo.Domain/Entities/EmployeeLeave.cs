using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolDemo.Domain.Entities;

public class EmployeeLeave
{
    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public Guid CategoryId { get; set; }
    public Guid LeaveTypeId { get; set; }
    public decimal? TotalLeaves { get; set; }
    public decimal? PreviousYearBalance { get; set; }
    public decimal? CurrentBalance { get; set; }
    public Guid SessionId { get; set; }
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
    public EmpCategoryMaster? Category { get; set; }
    public LeaveTypeMaster? LeaveType { get; set; }
    public SessionMaster? Session { get; set; }
    [NotMapped]
    public User? CreatedByNavigation { get; set; }
    [NotMapped]
    public User? ModifiedByNavigation { get; set; }
}
