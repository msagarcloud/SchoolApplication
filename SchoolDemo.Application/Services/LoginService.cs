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
        if (string.IsNullOrWhiteSpace(request.UserName) || string.IsNullOrWhiteSpace(request.Password))
        {
            return null;
        }

        // Step 1: Quick authentication check (minimal data)
        var user = await _userRepository.GetByUserNameAsync(request.UserName);
        
        if (user == null || !user.IsActive || user.IsDeleted)
        {
            return null;
        }

        // Step 2: Password verification
        if (user.UserPassword != request.Password)
        {
            return null;
        }

        // Step 3: Load full user data only after successful authentication
        var fullUser = await _userRepository.GetByUserNameWithRelatedDataAsync(request.UserName);
        if (fullUser == null)
        {
            return null;
        }

        return new LoginResponse
        {
            Id = fullUser.Id,
            UserName = fullUser.UserName,
            FirstName = fullUser.FirstName,
            LastName = fullUser.LastName,
            EmailAddress = fullUser.EmailAddress,
            IsActive = fullUser.IsActive,
            DesignationId = fullUser.DesignationId,
            Designation = fullUser.Designation?.Name,
            UserRoleId = fullUser.UserRoleId,
            UserRole = fullUser.UserRole?.Name,
            CompanyId = fullUser.CompanyId,
            CompanyName = fullUser.Company?.CompanyName,
            SchoolId = fullUser.SchoolId,
            SchoolName = fullUser.School?.Name,
            IsSuperUser = fullUser.IsSuperUser,
            Privileges = fullUser.UserRole?.Privileges ?? new List<string>()
        };
    }
}
