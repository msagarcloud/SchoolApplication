using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using SchoolDemo.Domain.Interfaces;
namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class StudentController : ControllerBase
{
    private readonly IStudentService _service;

    public StudentController(IStudentService service)
    {
        _service = service;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var entity = await _service.GetByIdAsync(id);
        if (entity == null)
        {
            return NotFound($"Student with ID {id} not found.");
        }
        return Ok(entity);
    }

    [HttpGet]
    [OutputCache(Duration = 60)]
    public async Task<IActionResult> GetAll()
    {
        var entities = await _service.GetAllAsync();
        return Ok(entities);
    }

    [HttpGet("minimal")]
    [OutputCache(Duration = 180)]
    public async Task<IActionResult> GetMinimal()
    {
        var entities = await _service.GetMinimalAsync();
        return Ok(entities);
    }

    [HttpGet("paged")]
    [OutputCache(Duration = 90)]
    public async Task<IActionResult> GetPaged([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var result = await _service.GetPagedAsync(page, pageSize);
        return Ok(result);
    }

    [HttpGet("search")]
    [OutputCache(Duration = 60)]
    public async Task<IActionResult> Search([FromQuery] string query, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return BadRequest("Search query is required.");
        }

        var result = await _service.SearchAsync(query, page, pageSize);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] StudentRequest request)
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
            return StatusCode(500, $"An error occurred while creating student: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] StudentRequest request)
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
                return NotFound($"Student with ID {id} not found.");
            }
            return Ok(entity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while updating student: {ex.Message}");
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
                return NotFound($"Student with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting student: {ex.Message}");
        }
    }
}
