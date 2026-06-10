using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolDemo.Domain.Entities;

public class School
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? Email { get; set; }
    public string? Address1 { get; set; }
    public string? Address2 { get; set; }
    public Guid? CityId { get; set; }
    public Guid? StateId { get; set; }
    public Guid? CountryId { get; set; }
    public string? ZipCode { get; set; }
    public string? Phone { get; set; }
    public string? EstablishmentYear { get; set; }
    public string? Mobile { get; set; }
    public Guid? JudistrictionCityId { get; set; }
    public Guid? JudistrictionStateId { get; set; }
    public Guid? JudistrictionCountryId { get; set; }
    public string? BankName { get; set; }
    public string? BankAddress1 { get; set; }
    public string? BankAddress2 { get; set; }
    public Guid? BankCityId { get; set; }
    public Guid? BankStateId { get; set; }
    public Guid? BankCountryId { get; set; }
    public string? BankZipCode { get; set; }
    public string? AccountNumber { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public Guid CompanyId { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid? ModifiedBy { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }

    // Navigation properties
    public Company? Company { get; set; }
    public City? City { get; set; }
    public State? State { get; set; }
    public Country? Country { get; set; }
    public City? JudistrictionCity { get; set; }
    public State? JudistrictionState { get; set; }
    public Country? JudistrictionCountry { get; set; }
    public City? BankCity { get; set; }
    public State? BankState { get; set; }
    public Country? BankCountry { get; set; }
    [NotMapped]
    public User? CreatedByNavigation { get; set; }
    [NotMapped]
    public User? ModifiedByNavigation { get; set; }
}
