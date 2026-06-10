namespace SchoolDemo.Domain.Interfaces;

public interface ISystemParameterService
{
    Task<SystemParameterResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<SystemParameterResponse>> GetAllAsync();
    Task<SystemParameterResponse> CreateAsync(SystemParameterRequest request);
    Task<SystemParameterResponse?> UpdateAsync(Guid id, SystemParameterRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public class SystemParameterRequest
{
    public string? ParameterName { get; set; }
    public string? ParameterValue { get; set; }
    public string? Description { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
}

public class SystemParameterResponse
{
    public Guid Id { get; set; }
    public string? ParameterName { get; set; }
    public string? ParameterValue { get; set; }
    public string? Description { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}
