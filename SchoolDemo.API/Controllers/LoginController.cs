using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SchoolDemo.Application.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Domain.Entities;
namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    private readonly ILoginService _loginService;
    private readonly ITokenService _tokenService;

    public LoginController(ILoginService loginService, ITokenService tokenService)
    {
        _loginService = loginService;
        _tokenService = tokenService;
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _loginService.AuthenticateAsync(request);

        if (result == null)
        {
            return Unauthorized("Invalid username or password.");
        }

        // Generate JWT token
        var token = _tokenService.GenerateToken(
            result.Id.ToString(),
            result.UserName ?? string.Empty,
            result.EmailAddress ?? string.Empty,
            result.UserRole ?? string.Empty
        );
        
        var response = new
        {
            token = token,
            user = result
        };

        return Ok(response);
    }
}