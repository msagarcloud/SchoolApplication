using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolDemo.Domain.Entities;

public class Company
{
    public Guid Id { get; set; }
    public string? CompanyName { get; set; }
    public string? Description { get; set; }
    public string? Address { get; set; }
    public Guid CityId { get; set; }
    public Guid StateId { get; set; }
    public Guid CountryId { get; set; }
    public string? ZipCode { get; set; }
    public string? Email { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid? ModifiedBy { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? EstablishmentYear { get; set; }
    public Guid JudistrictionArea { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }

    // Navigation properties
    public City? City { get; set; }
    public State? State { get; set; }
    public Country? Country { get; set; }
    [NotMapped]
    public User? CreatedByNavigation { get; set; }
    [NotMapped]
    public User? ModifiedByNavigation { get; set; }
}
