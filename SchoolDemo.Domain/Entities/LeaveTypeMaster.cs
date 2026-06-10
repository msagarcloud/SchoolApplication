using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolDemo.Domain.Entities;

public class LeaveTypeMaster
{
    public Guid Id { get; set; }
    public string? Code { get; set; }
    public string? Description { get; set; }
    public Guid? ApplicableGender { get; set; }
    public bool IsSpecialLeave { get; set; }
    public bool IsEncashable { get; set; }
    public bool IsCarryForward { get; set; }
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
    public GenderMaster? ApplicableGenderEntity { get; set; }
    [NotMapped]
    public User? CreatedByNavigation { get; set; }
    [NotMapped]
    public User? ModifiedByNavigation { get; set; }
}
