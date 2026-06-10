namespace SchoolDemo.Domain.Interfaces;

public interface IPrivilegeService
{
    Task<PrivilegeResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<PrivilegeResponse>> GetAllAsync();
    Task<PrivilegeResponse> CreateAsync(PrivilegeRequest request);
    Task<PrivilegeResponse?> UpdateAsync(Guid id, PrivilegeRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public class PrivilegeRequest
{
    public string? PrivilegeName { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsDeleted { get; set; } = false;
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
    public Guid? PrivilegeParentId { get; set; }
}

public class PrivilegeResponse
{
    public Guid Id { get; set; }
    public string? PrivilegeName { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
    public Guid? PrivilegeParentId { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid? ModifiedBy { get; set; }
    public DateTime? ModifiedDate { get; set; }
}
