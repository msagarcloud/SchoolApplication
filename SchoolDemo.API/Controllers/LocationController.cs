using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.Interfaces;
namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class LocationController : ControllerBase
{
    private readonly ILocationService _locationService;

    public LocationController(ILocationService locationService)
    {
        _locationService = locationService;
    }

    // Country endpoints
    [HttpGet("countries")]
    public async Task<IActionResult> GetCountries()
    {
        var countries = await _locationService.GetCountriesAsync();
        return Ok(countries);
    }

    [HttpGet("countries/{id}")]
    public async Task<IActionResult> GetCountryById(Guid id)
    {
        var country = await _locationService.GetCountryByIdAsync(id);
        if (country == null)
        {
            return NotFound($"Country with ID {id} not found.");
        }
        return Ok(country);
    }

    // State endpoints
    [HttpGet("states")]
    public async Task<IActionResult> GetStates()
    {
        var states = await _locationService.GetStatesAsync();
        return Ok(states);
    }

    [HttpGet("states/by-country/{countryId}")]
    public async Task<IActionResult> GetStatesByCountryId(Guid countryId)
    {
        var states = await _locationService.GetStatesByCountryIdAsync(countryId);
        return Ok(states);
    }

    [HttpGet("states/{id}")]
    public async Task<IActionResult> GetStateById(Guid id)
    {
        var state = await _locationService.GetStateByIdAsync(id);
        if (state == null)
        {
            return NotFound($"State with ID {id} not found.");
        }
        return Ok(state);
    }

    // City endpoints
    [HttpGet("cities")]
    public async Task<IActionResult> GetCities()
    {
        var cities = await _locationService.GetCitiesAsync();
        return Ok(cities);
    }

    [HttpGet("cities/by-state/{stateId}")]
    public async Task<IActionResult> GetCitiesByStateId(Guid stateId)
    {
        var cities = await _locationService.GetCitiesByStateIdAsync(stateId);
        return Ok(cities);
    }

    [HttpGet("cities/{id}")]
    public async Task<IActionResult> GetCityById(Guid id)
    {
        var city = await _locationService.GetCityByIdAsync(id);
        if (city == null)
        {
            return NotFound($"City with ID {id} not found.");
        }
        return Ok(city);
    }

    // Cascaded dropdown endpoint - Get all data in one call
    [HttpGet("cascaded")]
    public async Task<IActionResult> GetCascadedLocationData()
    {
        try
        {
            var result = await _locationService.GetCascadedLocationDataAsync();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while retrieving location data: {ex.Message}");
        }
    }
}