using System;

namespace SchoolDemo.Domain.Entities;

public class Supplier
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Address1 { get; set; }

    public string? Address2 { get; set; }

    public Guid CityId { get; set; }

    public Guid StateId { get; set; }

    public Guid CountryId { get; set; }

    public string? ZipCode { get; set; }

    public string? PhoneNumber { get; set; }

    public string? MobileNumber { get; set; }

    public string? EmailId { get; set; }

    public Guid CompanyId { get; set; }

    public Guid SchoolId { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? Status { get; set; }

    public string? StatusMessage { get; set; }
}
