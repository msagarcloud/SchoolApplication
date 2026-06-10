using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.Interfaces;
namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class HolidayController : ControllerBase
{
	private readonly IHolidayService _service;

	public HolidayController(IHolidayService service)
	{
		_service = service;
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(Guid id)
	{
		var entity = await _service.GetByIdAsync(id);
		if (entity == null)
		{
			return NotFound($"Holiday with ID {id} not found.");
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
	public async Task<IActionResult> Create([FromBody] HolidayRequest request)
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
			return StatusCode(500, $"An error occurred while creating holiday: {ex.Message}");
		}
	}

	[HttpPut("{id}")]
	public async Task<IActionResult> Update(Guid id, [FromBody] HolidayRequest request)
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
				return NotFound($"Holiday with ID {id} not found.");
			}
			return Ok(entity);
		}
		catch (Exception ex)
		{
			return StatusCode(500, $"An error occurred while updating holiday: {ex.Message}");
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
				return NotFound($"Holiday with ID {id} not found.");
			}
			return NoContent();
		}
		catch (Exception ex)
		{
			return StatusCode(500, $"An error occurred while deleting holiday: {ex.Message}");
		}
	}
}