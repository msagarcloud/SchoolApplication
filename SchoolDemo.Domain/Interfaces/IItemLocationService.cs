using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SchoolDemo.Domain.Interfaces;

public interface IItemLocationService
{
    Task<ItemLocationResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<ItemLocationResponse>> GetAllAsync();
    Task<ItemLocationResponse> CreateAsync(ItemLocationRequest request);
    Task<ItemLocationResponse?> UpdateAsync(Guid id, ItemLocationRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public class ItemLocationRequest
{
    public string? LocationName { get; set; }
    public string? Description { get; set; }
    public string? Building { get; set; }
    public string? LocationFloor { get; set; }
    public int? LocationNumber { get; set; }
    public int? Capacity { get; set; }
    public bool? IsActive { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class ItemLocationResponse
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
}
