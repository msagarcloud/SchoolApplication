using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.Interfaces;
namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class ClassSubjectDetailController : ControllerBase
{
    private readonly IClassSubjectDetailService _service;

    public ClassSubjectDetailController(IClassSubjectDetailService service)
    {
        _service = service;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id, [FromQuery] Guid schoolId)
    {
        var entity = await _service.GetByIdAsync(id, schoolId);
        if (entity == null)
        {
            return NotFound($"Class subject detail with ID {id} not found.");
        }
        return Ok(entity);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] Guid schoolId)
    {
        var entities = await _service.GetAllAsync(schoolId);
        return Ok(entities);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ClassSubjectDetailRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var entity = await _service.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = entity.Id, schoolId = request.SchoolId }, entity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while creating class subject detail: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] ClassSubjectDetailRequest request, [FromQuery] Guid schoolId)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var entity = await _service.UpdateAsync(id, request, schoolId);
            if (entity == null)
            {
                return NotFound($"Class subject detail with ID {id} not found.");
            }
            return Ok(entity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while updating class subject detail: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id, [FromQuery] Guid schoolId)
    {
        try
        {
            var result = await _service.DeleteAsync(id, schoolId);
            if (!result)
            {
                return NotFound($"Class subject detail with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting class subject detail: {ex.Message}");
        }
    }
}