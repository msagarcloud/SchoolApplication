namespace SchoolDemo.Domain.Interfaces;

public interface IResponseTypeService
{
    Task<ResponseTypeResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<ResponseTypeResponse>> GetAllAsync();
    Task<ResponseTypeResponse> CreateAsync(ResponseTypeRequest request);
    Task<ResponseTypeResponse?> UpdateAsync(Guid id, ResponseTypeRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public class ResponseTypeRequest
{
    public string? ResponseTypeName { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class ResponseTypeResponse
{
    public Guid Id { get; set; }
    public string? ResponseTypeName { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}
