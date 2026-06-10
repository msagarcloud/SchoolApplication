using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolDemo.Domain.Entities;

public class EmployeeSalaryDetail
{
    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public Guid SalaryHeadMasterId { get; set; }
    public Guid DesignationGradeId { get; set; }
    public decimal? Value { get; set; }
    public Guid SalaryTypeId { get; set; }
    public bool IdDeduction { get; set; }
    public Guid SalaryCodeId { get; set; }
    public string? SalaryDescription { get; set; }
    public decimal? Amount { get; set; }
    public bool IsSalaryHead { get; set; }
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
    public SalaryHeadMaster? SalaryHeadMaster { get; set; }
    public SalaryTypeMaster? SalaryType { get; set; }
    [NotMapped]
    public User? CreatedByNavigation { get; set; }
    [NotMapped]
    public User? ModifiedByNavigation { get; set; }
}
