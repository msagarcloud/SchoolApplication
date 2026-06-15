using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ItemLocationController : ControllerBase
{
    private readonly IItemLocationService _service;

    public ItemLocationController(IItemLocationService service)
    {
        _service = service;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var itemLocation = await _service.GetByIdAsync(id);
        if (itemLocation == null)
        {
            return NotFound($"Item location with ID {id} not found.");
        }
        return Ok(itemLocation);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var itemLocations = await _service.GetAllAsync();
        return Ok(itemLocations);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ItemLocationRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var itemLocation = await _service.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = itemLocation.Id }, itemLocation);
        }
        catch (Exception ex)
        {
            var detailedMessage = ex.InnerException?.Message ?? ex.Message;
            return StatusCode(500, $"An error occurred while creating the item location: {detailedMessage}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] ItemLocationRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var itemLocation = await _service.UpdateAsync(id, request);
            if (itemLocation == null)
            {
                return NotFound($"Item location with ID {id} not found.");
            }
            return Ok(itemLocation);
        }
        catch (Exception ex)
        {
            var detailedMessage = ex.InnerException?.Message ?? ex.Message;
            return StatusCode(500, $"An error occurred while updating the item location: {detailedMessage}");
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
                return NotFound($"Item location with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            var detailedMessage = ex.InnerException?.Message ?? ex.Message;
            return StatusCode(500, $"An error occurred while deleting the item location: {detailedMessage}");
        }
    }
}
