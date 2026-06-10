using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolDemo.Domain.Entities;

public class ParentMaster
{
    public Guid Id { get; set; }
    public Guid StudentGuid { get; set; }
    public string ParentFirstName { get; set; } = null!;
    public string ParentLastName { get; set; } = null!;
    public DateTime? ParentDob { get; set; }
    public Guid QualificationId { get; set; }
    public string? Occupation { get; set; }
    public decimal? AnnualIncome { get; set; }
    public Guid DesignationId { get; set; }
    public string? Phone { get; set; }
    public string? Mobile { get; set; }
    public string? Email { get; set; }
    public string? Address1 { get; set; }
    public string? Address2 { get; set; }
    public Guid CityId { get; set; }
    public Guid StateId { get; set; }
    public Guid CountryId { get; set; }
    public string? ZipCode { get; set; }
    public string? OfficeAddress1 { get; set; }
    public string? OfficeAddress2 { get; set; }
    public Guid OfficeCityId { get; set; }
    public Guid OfficeStateId { get; set; }
    public Guid OfficeCountryId { get; set; }
    public string? OfficeZipCode { get; set; }
    public string? OfficePhone { get; set; }
    public string? Image { get; set; }
    public Guid RelationTypeId { get; set; }
    public Guid SchoolId { get; set; }
    public Guid CompanyId { get; set; }
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
    public QualificationMaster? Qualification { get; set; }
    public DesigMaster? Designation { get; set; }
    public City? City { get; set; }
    public State? State { get; set; }
    public Country? Country { get; set; }
    public City? OfficeCity { get; set; }
    public State? OfficeState { get; set; }
    public Country? OfficeCountry { get; set; }
    public RelationTypeMaster? RelationType { get; set; }
    [NotMapped]
    public User? CreatedByNavigation { get; set; }
    [NotMapped]
    public User? ModifiedByNavigation { get; set; }
}
