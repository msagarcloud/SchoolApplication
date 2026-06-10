namespace SchoolDemo.Domain.Interfaces;

public interface ICompanyService
{
    Task<CompanyResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<CompanyResponse>> GetAllAsync();
    Task<CompanyResponse> CreateAsync(CompanyRequest request);
    Task<CompanyResponse?> UpdateAsync(Guid id, CompanyRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public class CompanyRequest
{
    public string? CompanyName { get; set; }
    public string? Description { get; set; }
    public string? Address { get; set; }
    public Guid CityId { get; set; }
    public Guid StateId { get; set; }
    public Guid CountryId { get; set; }
    public string? ZipCode { get; set; }
    public string? Email { get; set; }
    public string? EstablishmentYear { get; set; }
    public Guid JudistrictionArea { get; set; }
}

public class CompanyResponse
{
    public Guid Id { get; set; }
    public string? CompanyName { get; set; }
    public string? Description { get; set; }
    public string? Address { get; set; }
    public Guid CityId { get; set; }
    public Guid StateId { get; set; }
    public Guid CountryId { get; set; }
    public string? ZipCode { get; set; }
    public string? Email { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? EstablishmentYear { get; set; }
    public Guid JudistrictionArea { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}
