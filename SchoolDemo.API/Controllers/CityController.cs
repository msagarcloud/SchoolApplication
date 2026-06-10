using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.DTOs;
using SchoolDemo.Domain.Interfaces;
namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class CityController : ControllerBase
{
    private readonly ILocationService _locationService;

    public CityController(ILocationService locationService)
    {
        _locationService = locationService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var entity = await _locationService.GetCityByIdAsync(id);
        if (entity == null)
        {
            return NotFound($"City with ID {id} not found.");
        }
        return Ok(entity);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var entities = await _locationService.GetCitiesAsync();
        return Ok(entities);
    }

    [HttpGet("by-state/{stateId}")]
    public async Task<IActionResult> GetByStateId(Guid stateId)
    {
        var entities = await _locationService.GetCitiesByStateIdAsync(stateId);
        return Ok(entities);
    }

    [HttpGet("{id}/name")]
    public async Task<IActionResult> GetNameById(Guid id)
    {
        var entity = await _locationService.GetCityByIdAsync(id);
        if (entity == null)
        {
            return NotFound($"City with ID {id} not found.");
        }
        return Ok(new { Id = entity.Id, Name = entity.CityName });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CityRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var entity = await _locationService.CreateCityAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while creating city: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] CityRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var entity = await _locationService.UpdateCityAsync(id, request);
            if (entity == null)
            {
                return NotFound($"City with ID {id} not found.");
            }
            return Ok(entity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while updating city: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            var result = await _locationService.DeleteCityAsync(id);
            if (!result)
            {
                return NotFound($"City with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting city: {ex.Message}");
        }
    }
}