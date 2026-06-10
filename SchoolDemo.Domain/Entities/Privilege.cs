using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolDemo.Domain.Entities;

public class Privilege
{
    public Guid Id { get; set; }
    public string? PrivilegeName { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
    public Guid? PrivilegeParentId { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid? ModifiedBy { get; set; }
    public DateTime? ModifiedDate { get; set; }

    // Navigation properties
    public Privilege? PrivilegeParent { get; set; }
    [NotMapped]
    public User? CreatedByNavigation { get; set; }
    [NotMapped]
    public User? ModifiedByNavigation { get; set; }
}
