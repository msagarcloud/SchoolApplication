namespace SchoolDemo.Domain.Interfaces;

public interface ILoginService
{
    Task<LoginResponse?> AuthenticateAsync(LoginRequest request);
}

public class LoginRequest
{
    public string UserName { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class LoginResponse
{
    public Guid Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string EmailAddress { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public Guid DesignationId { get; set; }
    public string? Designation { get; set; }
    public Guid? UserRoleId { get; set; }
    public string? UserRole { get; set; }
    public Guid? CompanyId { get; set; }
    public string? CompanyName { get; set; }
    public Guid? SchoolId { get; set; }
    public string? SchoolName { get; set; }
    public bool? IsSuperUser { get; set; }
    public List<string> Privileges { get; set; } = new();
}
