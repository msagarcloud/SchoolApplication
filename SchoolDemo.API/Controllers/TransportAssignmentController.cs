using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class TransportAssignmentController : ControllerBase
{
    private readonly ITransportAssignmentService _service;

    public TransportAssignmentController(ITransportAssignmentService service)
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
            return NotFound($"Transport assignment with ID {id} not found.");
        
        return Ok(entity);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TransportAssignmentRequest request)
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
            return StatusCode(500, $"An error occurred while creating transport assignment: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] TransportAssignmentRequest request)
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
                return NotFound($"Transport assignment with ID {id} not found.");
            }
            return Ok(entity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while updating transport assignment: {ex.Message}");
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
                return NotFound($"Transport assignment with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting transport assignment: {ex.Message}");
        }
    }

    [HttpGet("by-student/{studentId}")]
    public async Task<IActionResult> GetByStudent(Guid studentId)
    {
        try
        {
            var assignments = await _service.GetByStudentAsync(studentId);
            return Ok(assignments);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while getting assignments for student: {ex.Message}");
        }
    }

    [HttpGet("by-vehicle/{vehicleId}")]
    public async Task<IActionResult> GetByVehicle(Guid vehicleId)
    {
        try
        {
            var assignments = await _service.GetByVehicleAsync(vehicleId);
            return Ok(assignments);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while getting assignments for vehicle: {ex.Message}");
        }
    }
}
