using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface IUserService
{
	Task<UserResponse?> GetByIdAsync(Guid id);
	Task<IEnumerable<UserResponse>> GetAllAsync();
	Task<UserResponse> CreateAsync(UserRequest request);
	Task<UserResponse?> UpdateAsync(Guid id, UserRequest request);
	Task<bool> DeleteAsync(Guid id);
}

public class UserRequest
{
	public string? UserName { get; set; }
	public string? UserPassword { get; set; }
	public string? FirstName { get; set; }
	public string? LastName { get; set; }
	public string? EmailAddress { get; set; }
	public Guid DesignationId { get; set; }
	public Guid? UserRoleId { get; set; }
	public bool? IsSuperUser { get; set; }
	public Guid? CompanyId { get; set; }
	public Guid? SchoolId { get; set; }
	public bool IsActive { get; set; }
}

public class UserResponse
{
	public Guid Id { get; set; }
	public string? UserName { get; set; }
	public string? FirstName { get; set; }
	public string? LastName { get; set; }
	public string? EmailAddress { get; set; }
	public Guid DesignationId { get; set; }
	public Guid? UserRoleId { get; set; }
	public bool? IsSuperUser { get; set; }
	public Guid? CompanyId { get; set; }
	public Guid? SchoolId { get; set; }
	public bool IsActive { get; set; }
	public DateTime CreatedDate { get; set; }
	public DateTime? ModifiedDate { get; set; }
	public string? Status { get; set; }
	public string? StatusMessage { get; set; }
}
