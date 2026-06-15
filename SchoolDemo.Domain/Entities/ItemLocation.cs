using System;

namespace SchoolDemo.Domain.Entities;

public class ItemLocation
{
    public Guid Id { get; set; }
    public string? LocationName { get; set; }
    public string? Description { get; set; }
    public string? Building { get; set; }
    public string? LocationFloor { get; set; }
    public int? LocationNumber { get; set; }
    public int? Capacity { get; set; }
    public bool? IsActive { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid ModifiedBy { get; set; }
    public DateTime ModifiedDate { get; set; }
    public bool? IsDeleted { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }

    // Navigation properties for Domain if needed
    public Company? Company { get; set; }
    public School? School { get; set; }
}
