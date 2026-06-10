namespace SchoolDemo.Domain.Interfaces;

public interface IRolePrivilegeService
{
    Task<RolePrivilegeResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<RolePrivilegeResponse>> GetAllAsync();
    Task<RolePrivilegeResponse> CreateAsync(RolePrivilegeRequest request);
    Task<RolePrivilegeResponse?> UpdateAsync(Guid id, RolePrivilegeRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public class RolePrivilegeRequest
{
    public Guid RoleId { get; set; }
    public Guid PrivilegeId { get; set; }
    public Guid? CreatedBy { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsDeleted { get; set; } = false;
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class RolePrivilegeResponse
{
    public Guid Id { get; set; }
    public Guid RoleId { get; set; }
    public Guid PrivilegeId { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid? ModifiedBy { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? RoleName { get; set; }
    public string? PrivilegeName { get; set; }
}
