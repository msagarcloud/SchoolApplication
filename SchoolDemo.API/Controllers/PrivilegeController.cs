using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.Interfaces;
namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class PrivilegeController : ControllerBase
{
    private readonly IPrivilegeService _privilegeService;

    public PrivilegeController(IPrivilegeService privilegeService)
    {
        _privilegeService = privilegeService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var privilege = await _privilegeService.GetByIdAsync(id);
        if (privilege == null)
        {
            return NotFound($"Privilege with ID {id} not found.");
        }
        return Ok(privilege);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var privileges = await _privilegeService.GetAllAsync();
        return Ok(privileges);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PrivilegeRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var privilege = await _privilegeService.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = privilege.Id }, privilege);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while creating the privilege: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] PrivilegeRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var privilege = await _privilegeService.UpdateAsync(id, request);
            if (privilege == null)
            {
                return NotFound($"Privilege with ID {id} not found.");
            }
            return Ok(privilege);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while updating the privilege: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            var result = await _privilegeService.DeleteAsync(id);
            if (!result)
            {
                return NotFound($"Privilege with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting the privilege: {ex.Message}");
        }
    }
}