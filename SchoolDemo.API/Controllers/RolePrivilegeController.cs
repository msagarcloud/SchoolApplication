using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.Interfaces;
namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class RolePrivilegeController : ControllerBase
{
    private readonly IRolePrivilegeService _rolePrivilegeService;

    public RolePrivilegeController(IRolePrivilegeService rolePrivilegeService)
    {
        _rolePrivilegeService = rolePrivilegeService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var rolePrivilege = await _rolePrivilegeService.GetByIdAsync(id);
        if (rolePrivilege == null)
        {
            return NotFound($"RolePrivilege with ID {id} not found.");
        }
        return Ok(rolePrivilege);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var rolePrivileges = await _rolePrivilegeService.GetAllAsync();
            return Ok(rolePrivileges);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error getting all role privileges: {ex.Message}");
            Console.WriteLine($"Stack trace: {ex.StackTrace}");
            if (ex.InnerException != null)
            {
                Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
            }
            return StatusCode(500, $"An error occurred while getting all role privileges: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] RolePrivilegeRequest request)
    {
        try
        {
            Console.WriteLine($"Received role privilege request: RoleId={request.RoleId}, PrivilegeId={request.PrivilegeId}");
            
            if (!ModelState.IsValid)
            {
                Console.WriteLine($"Model state is invalid: {string.Join(", ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage))}");
                return BadRequest(ModelState);
            }

            var rolePrivilege = await _rolePrivilegeService.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = rolePrivilege.Id }, rolePrivilege);
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"Validation error creating role privilege: {ex.Message}");
            return Conflict(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error creating role privilege: {ex.Message}");
            Console.WriteLine($"Stack trace: {ex.StackTrace}");
            if (ex.InnerException != null)
            {
                Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
            }
            return StatusCode(500, $"An error occurred while creating role privilege: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] RolePrivilegeRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var rolePrivilege = await _rolePrivilegeService.UpdateAsync(id, request);
            if (rolePrivilege == null)
            {
                return NotFound($"RolePrivilege with ID {id} not found.");
            }
            return Ok(rolePrivilege);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while updating role privilege: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            var result = await _rolePrivilegeService.DeleteAsync(id);
            if (!result)
            {
                return NotFound($"RolePrivilege with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting role privilege: {ex.Message}");
        }
    }
}