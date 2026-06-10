using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolDemo.Domain.Entities;

public class SalaryHeadMaster
{
    public Guid Id { get; set; }
    public string? Code { get; set; }
    public string? Description { get; set; }
    public bool? IsReadOnly { get; set; }
    public Guid SalaryTypeId { get; set; }
    public bool IsDeduction { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid? ModifiedBy { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string Status { get; set; } = null!;
    public string? StatusMessage { get; set; }
    public Guid? SchoolId { get; set; }
    public Guid? CompanyId { get; set; }

    // Navigation properties
    public Company? Company { get; set; }
    public School? School { get; set; }
    public SalaryTypeMaster? SalaryType { get; set; }
    [NotMapped]
    public User? CreatedByNavigation { get; set; }
    [NotMapped]
    public User? ModifiedByNavigation { get; set; }
}
