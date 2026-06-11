using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[AllowAnonymous]
public class AssesmentMasterController : ControllerBase
{
    private readonly IAssesmentMasterService _service;

    public AssesmentMasterController(IAssesmentMasterService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var entities = await _service.GetAllAsync();
        return Ok(entities);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var entity = await _service.GetByIdAsync(id);
        if (entity == null)
            return NotFound($"Assessment with ID {id} not found.");
        return Ok(entity);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AssesmentMasterRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var entity = await _service.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
        }
        catch (Exception ex)
        {
            var detailedMessage = ex.InnerException?.Message ?? ex.Message;
            return StatusCode(500, $"An error occurred while creating assessment: {detailedMessage}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] AssesmentMasterRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var entity = await _service.UpdateAsync(id, request);
            if (entity == null)
                return NotFound($"Assessment with ID {id} not found.");
            return Ok(entity);
        }
        catch (Exception ex)
        {
            var detailedMessage = ex.InnerException?.Message ?? ex.Message;
            return StatusCode(500, $"An error occurred while updating assessment: {detailedMessage}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            var result = await _service.DeleteAsync(id);
            if (!result)
                return NotFound($"Assessment with ID {id} not found.");
            return NoContent();
        }
        catch (Exception ex)
        {
            var detailedMessage = ex.InnerException?.Message ?? ex.Message;
            return StatusCode(500, $"An error occurred while deleting assessment: {detailedMessage}");
        }
    }
}
