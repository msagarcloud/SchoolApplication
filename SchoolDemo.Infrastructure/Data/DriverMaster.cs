using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class DriverMaster
{
    public Guid Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string? LastName { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public string FathersName { get; set; } = null!;

    public string MothersName { get; set; } = null!;

    public Guid QualificationId { get; set; }

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

    public virtual CityMaster City { get; set; } = null!;

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual CountryMaster Country { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<DriverQualificationDetail> DriverQualificationDetails { get; set; } = new List<DriverQualificationDetail>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual QualificationMaster Qualification { get; set; } = null!;

    public virtual ICollection<RouteDetail> RouteDetails { get; set; } = new List<RouteDetail>();

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual StateMaster State { get; set; } = null!;
}
