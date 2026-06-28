using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Caching.Memory;
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
    private readonly IMemoryCache _cache;

    public LoginController(ILoginService loginService, ITokenService tokenService, IMemoryCache cache)
    {
        _loginService = loginService;
        _tokenService = tokenService;
        _cache = cache;
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        // Rate limiting check
        var clientIp = HttpContext.Connection.RemoteIpAddress?.ToString();
        var rateLimitKey = $"login_attempts_{clientIp}_{DateTime.UtcNow:yyyyMMddHHmm}";
        
        var attemptCount = _cache.GetOrCreate(rateLimitKey, entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(1);
            return 0;
        });
        
        if (attemptCount >= 5)
        {
            return StatusCode(429, "Too many login attempts. Please try again later.");
        }
        
        _cache.Set(rateLimitKey, attemptCount + 1);

        var result = await _loginService.AuthenticateAsync(request);

        if (result == null)
        {
            return Unauthorized("Invalid username or password.");
        }

        // Clear rate limit on successful login
        _cache.Remove(rateLimitKey);

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
            user = result,
            expiresIn = 86400 // 24 hours in seconds
        };

        return Ok(response);
    }
}