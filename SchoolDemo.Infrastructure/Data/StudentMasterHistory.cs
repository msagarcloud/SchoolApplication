using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class StudentMasterHistory
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

    public virtual CityMaster BirthCity { get; set; } = null!;

    public virtual CountryMaster BirthCountry { get; set; } = null!;

    public virtual StateMaster BirthState { get; set; } = null!;

    public virtual BloodGroupMaster BloodGroup { get; set; } = null!;

    public virtual CategoryMaster Category { get; set; } = null!;

    public virtual CityMaster City { get; set; } = null!;

    public virtual ClassMaster Class { get; set; } = null!;

    public virtual TeacherMaster? ClassTeacher { get; set; }

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual CountryMaster Country { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual FeesDiscountCategoryMaster? FeesDiscountCategoryMaster { get; set; }

    public virtual GenderMaster? GenderNavigation { get; set; }

    public virtual HouseMaster? HouseAllottedNavigation { get; set; }

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual CountryMaster NationalityNavigation { get; set; } = null!;

    public virtual SchoolBoard PreviousSchoolBoard { get; set; } = null!;

    public virtual ClassMaster? PreviousSchoolClass { get; set; }

    public virtual ReligionMaster Religion { get; set; } = null!;

    public virtual RouteMaster? Route { get; set; }

    public virtual RouteStopDetail? RouteStopDetails { get; set; }

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual SectionMaster Section { get; set; } = null!;

    public virtual SessionMaster? Session { get; set; }

    public virtual ClassMaster? SiblingClass { get; set; }

    public virtual StateMaster State { get; set; } = null!;
}
