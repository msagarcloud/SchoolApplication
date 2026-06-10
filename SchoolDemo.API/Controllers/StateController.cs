using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.DTOs;
using SchoolDemo.Domain.Interfaces;
namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class StateController : ControllerBase
{
    private readonly ILocationService _locationService;

    public StateController(ILocationService locationService)
    {
        _locationService = locationService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var entity = await _locationService.GetStateByIdAsync(id);
        if (entity == null)
        {
            return NotFound($"State with ID {id} not found.");
        }
        return Ok(entity);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var entities = await _locationService.GetStatesAsync();
        return Ok(entities);
    }

    [HttpGet("by-country/{countryId}")]
    public async Task<IActionResult> GetByCountryId(Guid countryId)
    {
        var entities = await _locationService.GetStatesByCountryIdAsync(countryId);
        return Ok(entities);
    }

    [HttpGet("{id}/name")]
    public async Task<IActionResult> GetNameById(Guid id)
    {
        var entity = await _locationService.GetStateByIdAsync(id);
        if (entity == null)
        {
            return NotFound($"State with ID {id} not found.");
        }
        return Ok(new { Id = entity.Id, Name = entity.StateName });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] StateRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var entity = await _locationService.CreateStateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while creating state: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] StateRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var entity = await _locationService.UpdateStateAsync(id, request);
            if (entity == null)
            {
                return NotFound($"State with ID {id} not found.");
            }
            return Ok(entity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while updating state: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            var result = await _locationService.DeleteStateAsync(id);
            if (!result)
            {
                return NotFound($"State with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting state: {ex.Message}");
        }
    }
}