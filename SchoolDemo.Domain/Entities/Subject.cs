namespace SchoolDemo.Domain.Entities;

public class Subject
{
    public Guid Id { get; set; }
    public string? SubjectName { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool? IsScholastic { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid? ModifiedBy { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
    public int? PeriodsPerWeek { get; set; }
}
