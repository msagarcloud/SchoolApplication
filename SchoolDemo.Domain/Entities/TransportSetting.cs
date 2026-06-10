namespace SchoolDemo.Domain.Entities;

public class TransportSetting
{
    public Guid Id { get; set; }
    public string SettingName { get; set; } = string.Empty;
    public string? SettingDescription { get; set; }
    public string? SettingValue { get; set; }
    public string? SettingType { get; set; }
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
