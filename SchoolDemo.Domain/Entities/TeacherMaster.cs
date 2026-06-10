using System;

namespace SchoolDemo.Domain.Entities;

public class TeacherMaster
{
    public Guid Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string? LastName { get; set; }

    public DateTime Dob { get; set; }

    public DateTime? Doj { get; set; }

    public DateTime? DateOfLeaving { get; set; }

    public string? Address { get; set; }

    public Guid? CityId { get; set; }

    public Guid? StateId { get; set; }

    public Guid? CountryId { get; set; }

    public string? ZipCode { get; set; }

    public Guid? Gender { get; set; }

    public Guid? MaritalStatusId { get; set; }

    public string? Image { get; set; }

    public string? Phone { get; set; }

    public string? MobilePhone { get; set; }

    public string? YearsOfExperience { get; set; }

    public string? PreviousSchool { get; set; }

    public string? Salutation { get; set; }

    public string? Email { get; set; }

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
}
