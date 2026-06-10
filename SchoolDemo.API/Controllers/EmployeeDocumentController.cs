using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.Interfaces;
namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class EmployeeDocumentController : ControllerBase
{
    private readonly IEmployeeDocumentService _service;

    public EmployeeDocumentController(IEmployeeDocumentService service)
    {
        _service = service;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var entity = await _service.GetByIdAsync(id);
        if (entity == null)
        {
            return NotFound($"Employee document with ID {id} not found.");
        }
        return Ok(entity);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var entities = await _service.GetAllAsync();
        return Ok(entities);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] EmployeeDocumentRequest request)
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
            return StatusCode(500, $"An error occurred while creating the employee document: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] EmployeeDocumentRequest request)
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
                return NotFound($"Employee document with ID {id} not found.");
            }
            return Ok(entity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while updating the employee document: {ex.Message}");
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
                return NotFound($"Employee document with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting the employee document: {ex.Message}");
        }
    }
}