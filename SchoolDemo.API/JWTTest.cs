using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SchoolDemo.Application.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SchoolDemo.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JWTTestController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ITokenService _tokenService;

        public JWTTestController(IConfiguration configuration, ITokenService tokenService)
        {
            _configuration = configuration;
            _tokenService = tokenService;
        }

        [HttpGet("generate-test-token")]
        public IActionResult GenerateTestToken()
        {
            var token = _tokenService.GenerateToken(
                "test-user-id",
                "testuser",
                "test@example.com",
                "Administrator"
            );

            return Ok(new { token = token });
        }

        [HttpGet("validate-token")]
        [Authorize]
        public IActionResult ValidateToken()
        {
            var userId = User.FindFirst("userId")?.Value ?? string.Empty;
            var userName = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value ?? string.Empty;
            var role = User.FindFirst("role")?.Value ?? string.Empty;

            return Ok(new 
            { 
                message = "Token is valid",
                userId = userId,
                userName = userName,
                role = role,
                isAuthenticated = User.Identity.IsAuthenticated
            });
        }

        [HttpGet("public")]
        public IActionResult PublicEndpoint()
        {
            return Ok(new { message = "This is a public endpoint - no authentication required" });
        }
    }
}
