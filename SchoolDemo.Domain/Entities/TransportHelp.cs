namespace SchoolDemo.Domain.Entities;

public class TransportHelp
{
    public Guid Id { get; set; }
    public string HelpTitle { get; set; } = string.Empty;
    public string HelpDescription { get; set; } = string.Empty;
    public string? HelpCategory { get; set; }
    public string? HelpSolution { get; set; }
    public int? Priority { get; set; }
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
}
