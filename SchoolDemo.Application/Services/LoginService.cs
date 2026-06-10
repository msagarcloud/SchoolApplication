using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class LoginService : ILoginService
{
    private readonly IUserRepository _userRepository;

    public LoginService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<LoginResponse?> AuthenticateAsync(LoginRequest request)
    {
        // Early validation
        if (string.IsNullOrWhiteSpace(request.UserName) || string.IsNullOrWhiteSpace(request.Password))
        {
            return null;
        }

        var user = await _userRepository.GetByUserNameWithRelatedDataAsync(request.UserName);
        
        // Fast validation checks
        if (user == null || !user.IsActive || user.IsDeleted || user.UserPassword != request.Password)
        {
            return null;
        }

        // Optimized response creation - reuse existing objects
        return new LoginResponse
        {
            Id = user.Id,
            UserName = user.UserName,
            FirstName = user.FirstName,
            LastName = user.LastName,
            EmailAddress = user.EmailAddress,
            IsActive = user.IsActive,
            DesignationId = user.DesignationId,
            Designation = user.Designation?.Name,
            UserRoleId = user.UserRoleId,
            UserRole = user.UserRole?.Name,
            CompanyId = user.CompanyId,
            CompanyName = user.Company?.CompanyName,
            SchoolId = user.SchoolId,
            SchoolName = user.School?.Name,
            IsSuperUser = user.IsSuperUser,
            Privileges = user.UserRole?.Privileges ?? new List<string>()
        };
    }
}
