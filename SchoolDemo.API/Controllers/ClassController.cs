using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.Interfaces;
namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class ClassController : ControllerBase
{
    private readonly IClassService _service;

    public ClassController(IClassService service)
    {
        _service = service;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var entity = await _service.GetByIdAsync(id);
        if (entity == null)
        {
            return NotFound($"Class with ID {id} not found.");
        }
        return Ok(entity);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var entities = await _service.GetAllAsync();
        return Ok(entities);
    }

    [HttpGet("school/{schoolId}")]
    public async Task<IActionResult> GetBySchoolId(Guid schoolId)
    {
        var entities = await _service.GetBySchoolIdAsync(schoolId);
        return Ok(entities);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ClassRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var entity = await _service.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while creating class: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] ClassRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var entity = await _service.UpdateAsync(id, request);
            if (entity == null)
            {
                return NotFound($"Class with ID {id} not found.");
            }
            return Ok(entity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while updating class: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            var result = await _service.DeleteAsync(id);
            if (!result)
            {
                return NotFound($"Class with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting class: {ex.Message}");
        }
    }
}