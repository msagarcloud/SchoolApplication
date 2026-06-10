using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SchoolDemo.Domain.Entities;

public class DriverMaster
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string? LastName { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string FathersName { get; set; } = string.Empty;
    public string MothersName { get; set; } = string.Empty;
    public string? Address1 { get; set; }
    public string? Address2 { get; set; }
    public Guid CityId { get; set; }
    public Guid StateId { get; set; }
    public Guid CountryId { get; set; }
    public string? ZipCode { get; set; }
    public string? MobileNumber { get; set; }
    public string? PhoneNumber { get; set; }
    public string? DriverImage { get; set; }
    public string? LicenceNumber { get; set; }
    public DateTime? LicenceIssueDate { get; set; }
    public DateTime? LicenceValidUptoDate { get; set; }
    public string? LicenceDescription { get; set; }
    public string? LicenceImage { get; set; }
    public string? LicenceType { get; set; }
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
    public Guid QualificationId { get; set; }

    // Navigation properties (ignored during API serialization)
    [JsonIgnore]
    public City? City { get; set; }
    [JsonIgnore]
    public Company? Company { get; set; }
    [JsonIgnore]
    public Country? Country { get; set; }
    [JsonIgnore]
    public School? School { get; set; }
    [JsonIgnore]
    public State? State { get; set; }
    [JsonIgnore]
    public QualificationMaster? Qualification { get; set; }
    [NotMapped]
    [JsonIgnore]
    public User? CreatedByNavigation { get; set; }
    [NotMapped]
    [JsonIgnore]
    public User? ModifiedByNavigation { get; set; }
}
