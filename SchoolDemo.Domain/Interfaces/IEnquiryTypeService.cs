namespace SchoolDemo.Domain.Interfaces;

public interface IEnquiryTypeService
{
    Task<EnquiryTypeResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<EnquiryTypeResponse>> GetAllAsync();
    Task<EnquiryTypeResponse> CreateAsync(EnquiryTypeRequest request);
    Task<EnquiryTypeResponse?> UpdateAsync(Guid id, EnquiryTypeRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public class EnquiryTypeRequest
{
    public string? EnquiryTypeName { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class EnquiryTypeResponse
{
    public Guid Id { get; set; }
    public string? EnquiryTypeName { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}
