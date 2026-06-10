using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class PublisherMaster
{
    public Guid Id { get; set; }

    public string? PublisherName { get; set; }

    public string? Description { get; set; }

    public string? Address1 { get; set; }

    public string? Address2 { get; set; }

    public Guid? CityId { get; set; }

    public Guid? StateId { get; set; }

    public Guid? CountryId { get; set; }

    public string? ZipCode { get; set; }

    public string? PhoneNumber { get; set; }

    public string? MobileNumber { get; set; }

    public string? EmailId { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CompanyId { get; set; }

    public Guid SchoolId { get; set; }

    public Guid CreatedBy { get; set; }

    public DateOnly CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? Status { get; set; }

    public string? StatusMessage { get; set; }

    public virtual ICollection<BookMaster> BookMasters { get; set; } = new List<BookMaster>();

    public virtual CityMaster? City { get; set; }

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual CountryMaster? Country { get; set; }

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual StateMaster? State { get; set; }
}
