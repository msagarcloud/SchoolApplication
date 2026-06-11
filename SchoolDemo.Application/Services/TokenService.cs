using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using SchoolDemo.Domain.Interfaces;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;

namespace SchoolDemo.Application.Services
{
    public interface ITokenService
    {
        bool ValidateToken(string token);
        ClaimsPrincipal? GetPrincipalFromToken(string token);
        string? GetUserIdFromToken(string token);
        string? GetUserRoleFromToken(string token);
        string? GetUserNameFromToken(string token);
        string GenerateToken(string userId, string userName, string email, string role, int expireHours = 24);
    }

    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public bool ValidateToken(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtKey = _configuration["Jwt:Key"] ?? "YourSuperSecretKeyHere123456789012345678901234567890";
                var jwtIssuer = _configuration["Jwt:Issuer"] ?? "SchoolPortalAPI";
                var jwtAudience = _configuration["Jwt:Audience"] ?? "SchoolPortalUsers";

                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtIssuer,
                    ValidAudience = jwtAudience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
                    ClockSkew = TimeSpan.Zero
                };

                tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public ClaimsPrincipal? GetPrincipalFromToken(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtKey = _configuration["Jwt:Key"] ?? "YourSuperSecretKeyHere123456789012345678901234567890";
                var jwtIssuer = _configuration["Jwt:Issuer"] ?? "SchoolPortalAPI";
                var jwtAudience = _configuration["Jwt:Audience"] ?? "SchoolPortalUsers";

                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtIssuer,
                    ValidAudience = jwtAudience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
                    ClockSkew = TimeSpan.Zero
                };

                var principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
                return principal;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public string? GetUserIdFromToken(string token)
        {
            var principal = GetPrincipalFromToken(token);
            return principal?.FindFirst("userId")?.Value;
        }

        public string? GetUserRoleFromToken(string token)
        {
            var principal = GetPrincipalFromToken(token);
            return principal?.FindFirst("role")?.Value;
        }

        public string? GetUserNameFromToken(string token)
        {
            var principal = GetPrincipalFromToken(token);
            return principal?.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        }

        public string GenerateToken(string userId, string userName, string email, string role, int expireHours = 24)
        {
            var jwtKey = _configuration["Jwt:Key"] ?? "YourSuperSecretKeyHere123456789012345678901234567890";
            var jwtIssuer = _configuration["Jwt:Issuer"] ?? "SchoolPortalAPI";
            var jwtAudience = _configuration["Jwt:Audience"] ?? "SchoolPortalUsers";

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userName ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.Email, email ?? string.Empty),
                new Claim("role", role ?? string.Empty),
                new Claim("userId", userId ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
            };

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(expireHours),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
