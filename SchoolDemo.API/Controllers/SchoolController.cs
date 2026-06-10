using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.Interfaces;
namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class SchoolController : ControllerBase
{
    private readonly ISchoolService _schoolService;

    public SchoolController(ISchoolService schoolService)
    {
        _schoolService = schoolService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var school = await _schoolService.GetByIdAsync(id);
        if (school == null)
        {
            return NotFound($"School with ID {id} not found.");
        }
        return Ok(school);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var schools = await _schoolService.GetAllAsync();
        return Ok(schools);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] SchoolRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var school = await _schoolService.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = school.Id }, school);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while creating the school: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] SchoolRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var school = await _schoolService.UpdateAsync(id, request);
            if (school == null)
            {
                return NotFound($"School with ID {id} not found.");
            }
            return Ok(school);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while updating the school: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            var result = await _schoolService.DeleteAsync(id);
            if (!result)
            {
                return NotFound($"School with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting the school: {ex.Message}");
        }
    }
}