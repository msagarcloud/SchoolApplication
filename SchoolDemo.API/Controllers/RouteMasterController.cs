using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Domain.DTOs;

namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class RouteMasterController : ControllerBase
{
    private readonly IRouteMasterService _service;

    public RouteMasterController(IRouteMasterService service)
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
            return NotFound($"Route with ID {id} not found.");
        
        return Ok(entity);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] RouteMasterRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        ApplyUserContext(request);

        try
        {
            var entity = await _service.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while creating route: {GetDetailedError(ex)}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] RouteMasterRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        ApplyUserContext(request);

        try
        {
            var entity = await _service.UpdateAsync(id, request);
            if (entity == null)
            {
                return NotFound($"Route with ID {id} not found.");
            }
            return Ok(entity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while updating route: {GetDetailedError(ex)}");
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
                return NotFound($"Route with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting route: {GetDetailedError(ex)}");
        }
    }

    private void ApplyUserContext(RouteMasterRequest request)
    {
        if (request.CreatedBy == Guid.Empty)
        {
            var userIdValue = User.FindFirstValue("userId")
                ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (Guid.TryParse(userIdValue, out var userId))
                request.CreatedBy = userId;
        }
    }

    private static string GetDetailedError(Exception ex)
    {
        if (ex is DbUpdateException dbEx)
            return dbEx.InnerException?.Message ?? dbEx.Message;

        return ex.InnerException?.Message ?? ex.Message;
    }
}
