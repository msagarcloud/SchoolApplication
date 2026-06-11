using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolDemo.Domain.Entities;

[NotMapped]
public class StudentMaster
{
    public Guid Id { get; set; }
    public Guid RollNumber { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Address { get; set; }
    public Guid CityId { get; set; }
    public Guid StateId { get; set; }
    public Guid CountryId { get; set; }
    public string? ZipCode { get; set; }
    public string? ContactNumber { get; set; }
    public string? EmergencyContactNumber { get; set; }
    public DateTime Dob { get; set; }
    public DateTime Doj { get; set; }
    public string RegistrationNumber { get; set; } = null!;
    public Guid ClassId { get; set; }
    public Guid SectionId { get; set; }
    public bool? AvailTransport { get; set; }
    public string? Image { get; set; }
    public string? Email { get; set; }
    public Guid CategoryId { get; set; }
    public bool? SiblingsIfAny { get; set; }
    public Guid? SiblingClassId { get; set; }
    public Guid? Gender { get; set; }
    public string? DisabilityAny { get; set; }
    public string? MedicalAlleryAny { get; set; }
    public Guid BirthCityId { get; set; }
    public Guid BirthStateId { get; set; }
    public Guid BirthCountryId { get; set; }
    public string? PreviousSchoolAttended { get; set; }
    public Guid? PreviousSchoolClassId { get; set; }
    public decimal? PreviousSchoolPercentage { get; set; }
    public string? PreviousSchoolRank { get; set; }
    public Guid PreviousSchoolBoardId { get; set; }
    public DateTime? PreviousSchoolFromDate { get; set; }
    public DateTime? PreviousSchoolToDate { get; set; }
    public DateTime? WithdrawnDate { get; set; }
    public string? WithdrawnReason { get; set; }
    public Guid BloodGroupId { get; set; }
    public Guid Nationality { get; set; }
    public string? Hobbies { get; set; }
    public Guid ReligionId { get; set; }
    public string? Phone { get; set; }
    public Guid? RouteId { get; set; }
    public Guid? RouteStopDetailsId { get; set; }
    public Guid? ClassTeacherId { get; set; }
    public bool? RoutePickAndDrop { get; set; }
    public Guid? FeesDiscountCategoryMasterId { get; set; }
    public decimal? TutionFees { get; set; }
    public decimal? AnnualFees { get; set; }
    public decimal? TransportFees { get; set; }
    public bool? UseTransportFees { get; set; }
    public Guid? SessionId { get; set; }
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
    public Guid? HouseAllotted { get; set; }
    public string? AdditionalNotes { get; set; }
    [NotMapped]
    public string? FathersName { get; set; }
}
