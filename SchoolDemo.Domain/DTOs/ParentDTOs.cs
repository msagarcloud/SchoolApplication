namespace SchoolDemo.Domain.DTOs;

public class ParentRequest
{
    public Guid Id { get; set; }
    public Guid StudentGuid { get; set; }
    public string ParentFirstName { get; set; } = string.Empty;
    public string ParentLastName { get; set; } = string.Empty;
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
    public bool IsActive { get; set; } = true;
    public Guid CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid? ModifiedBy { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class ParentResponse
{
    public Guid Id { get; set; }
    public Guid StudentGuid { get; set; }
    public string ParentFirstName { get; set; } = string.Empty;
    public string ParentLastName { get; set; } = string.Empty;
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
    public string? RelationTypeName { get; set; }
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
}
