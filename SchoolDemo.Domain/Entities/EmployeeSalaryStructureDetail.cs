using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolDemo.Domain.Entities;

public class EmployeeSalaryStructureDetail
{
    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public Guid DesignationGradeId { get; set; }
    public Guid Session { get; set; }
    public decimal Value { get; set; }
    public Guid SalaryTypeId { get; set; }
    public bool IsDeductance { get; set; }
    public Guid SalaryCodeId { get; set; }
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
    
    // Additional properties for salary calculation
    public string? Name { get; set; }
    public decimal Percentage { get; set; }
    public bool IsFixed { get; set; }
    public string? Type { get; set; } // "Earning" or "Deduction"

    // Navigation properties
    public Company? Company { get; set; }
    public School? School { get; set; }
    public Employee? Employee { get; set; }
    public SalaryTypeMaster? SalaryType { get; set; }
    [NotMapped]
    public User? CreatedByNavigation { get; set; }
    [NotMapped]
    public User? ModifiedByNavigation { get; set; }
}
