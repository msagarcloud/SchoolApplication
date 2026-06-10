using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class NonTeachingMaster
{
    public Guid Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string? MiddleName { get; set; }

    public string LastName { get; set; } = null!;

    public DateOnly Dob { get; set; }

    public DateOnly Doj { get; set; }

    public DateOnly? DateOfLeaving { get; set; }

    public string? Address { get; set; }

    public Guid? CityId { get; set; }

    public Guid? StateId { get; set; }

    public Guid? CountryId { get; set; }

    public string? ZipCode { get; set; }

    public string? Gender { get; set; }

    public Guid? MaritalStatusId { get; set; }

    public byte[]? Image { get; set; }

    public string? Phone { get; set; }

    public string? MobilePhone { get; set; }

    public string? Email { get; set; }

    public string? EmployeeCode { get; set; }

    public string? Designation { get; set; }

    public string? Department { get; set; }

    public string? Qualification { get; set; }

    public decimal? Salary { get; set; }

    public string? BankAccountNumber { get; set; }

    public string? BankName { get; set; }

    public string? Ifsccode { get; set; }

    public string? Pan { get; set; }

    public string? AadharNumber { get; set; }

    public string? EmergencyContactName { get; set; }

    public string? EmergencyContactNumber { get; set; }

    public string? EmergencyContactRelation { get; set; }

    public Guid CompanyId { get; set; }

    public Guid SchoolId { get; set; }

    public bool IsActive { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedOn { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedOn { get; set; }

    public Guid? DeletedBy { get; set; }

    public DateTime? DeletedOn { get; set; }

    public bool IsDeleted { get; set; }

    public virtual CityMaster? City { get; set; }

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual CountryMaster? Country { get; set; }

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual UserDetail? DeletedByNavigation { get; set; }

    public virtual MaritalStatus? MaritalStatus { get; set; }

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual StateMaster? State { get; set; }
}
