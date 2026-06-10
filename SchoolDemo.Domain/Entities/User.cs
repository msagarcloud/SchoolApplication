namespace SchoolDemo.Domain.Entities;

public class User
{
    public Guid Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string UserPassword { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string EmailAddress { get; set; } = string.Empty;
    public Guid DesignationId { get; set; }
    public Guid? UserRoleId { get; set; }
    public bool? IsSuperUser { get; set; }
    public Guid? CompanyId { get; set; }
    public Guid? SchoolId { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid? ModifiedBy { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }

    // Navigation properties
    public Designation? Designation { get; set; }
    public Role? UserRole { get; set; }
    public Company? Company { get; set; }
    public School? School { get; set; }
}
