namespace SchoolDemo.Domain.Interfaces;

public interface ISupplierService
{
    Task<SupplierResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<SupplierResponse>> GetAllAsync();
    Task<(bool Success, SupplierResponse? Response, string Message)> CreateAsync(SupplierRequest request);
    Task<(bool Success, SupplierResponse? Response, string Message)> UpdateAsync(Guid id, SupplierRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public class SupplierRequest
{
    public string? Name { get; set; }
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
    public string? CompanyId { get; set; }
    public string? SchoolId { get; set; }
}

public class SupplierResponse
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
