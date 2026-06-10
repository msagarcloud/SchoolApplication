using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolDemo.Domain.Entities;

public class ClassSectionDetail
{
    public Guid Id { get; set; }
    public Guid ClassMasterId { get; set; }
    public Guid SectionMasterId { get; set; }
    public Guid LocationId { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid? ModifiedBy { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }

    // Navigation properties
    public Company? Company { get; set; }
    public School? School { get; set; }
    public Class? ClassMaster { get; set; }
    public Section? SectionMaster { get; set; }
    public ClassRoom? Location { get; set; }
    [NotMapped]
    public User? CreatedByNavigation { get; set; }
    [NotMapped]
    public User? ModifiedByNavigation { get; set; }
}
