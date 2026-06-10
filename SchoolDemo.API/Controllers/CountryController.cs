using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.DTOs;
using SchoolDemo.Domain.Interfaces;
namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class CountryController : ControllerBase
{
    private readonly ILocationService _locationService;

    public CountryController(ILocationService locationService)
    {
        _locationService = locationService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var entity = await _locationService.GetCountryByIdAsync(id);
        if (entity == null)
        {
            return NotFound($"Country with ID {id} not found.");
        }
        return Ok(entity);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var entities = await _locationService.GetCountriesAsync();
        return Ok(entities);
    }

    [HttpGet("{id}/name")]
    public async Task<IActionResult> GetNameById(Guid id)
    {
        var entity = await _locationService.GetCountryByIdAsync(id);
        if (entity == null)
        {
            return NotFound($"Country with ID {id} not found.");
        }
        return Ok(new { Id = entity.Id, Name = entity.CountryName });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CountryRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var entity = await _locationService.CreateCountryAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while creating country: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] CountryRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var entity = await _locationService.UpdateCountryAsync(id, request);
            if (entity == null)
            {
                return NotFound($"Country with ID {id} not found.");
            }
            return Ok(entity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while updating country: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            var result = await _locationService.DeleteCountryAsync(id);
            if (!result)
            {
                return NotFound($"Country with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting country: {ex.Message}");
        }
    }
}