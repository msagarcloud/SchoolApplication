using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Caching.Memory;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Domain.Entities;
using Microsoft.AspNetCore.Authorization;

namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginControllerOptimized : ControllerBase
{
    private readonly ILoginService _loginService;
    private readonly IConfiguration _configuration;
    private readonly IMemoryCache _cache;

    public LoginControllerOptimized(ILoginService loginService, IConfiguration configuration, IMemoryCache cache)
    {
        _loginService = loginService;
        _configuration = configuration;
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
        var token = GenerateJwtToken(result);
        
        var response = new
        {
            token = token,
            user = result,
            expiresIn = 86400 // 24 hours in seconds
        };

        return Ok(response);
    }

    private string GenerateJwtToken(dynamic user)
    {
        var jwtKey = _configuration["Jwt:Key"] ?? "YourSuperSecretKeyHere123456789012345678901234567890";
        var jwtIssuer = _configuration["Jwt:Issuer"] ?? "SchoolPortalAPI";
        var jwtAudience = _configuration["Jwt:Audience"] ?? "SchoolPortalUsers";

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName ?? string.Empty),
            new Claim(JwtRegisteredClaimNames.Email, user.EmailAddress ?? string.Empty),
            new Claim("role", user.UserRole ?? string.Empty),
            new Claim("userId", user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
        };

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(24),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
