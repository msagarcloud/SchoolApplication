using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.Interfaces;
namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[AllowAnonymous]

public class HolidayTypeController : ControllerBase
{
	private readonly IHolidayTypeService _service;

	public HolidayTypeController(IHolidayTypeService service)
	{
		_service = service;
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(Guid id)
	{
		var entity = await _service.GetByIdAsync(id);
		if (entity == null)
		{
			return NotFound($"Holiday type with ID {id} not found.");
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
	public async Task<IActionResult> Create([FromBody] HolidayTypeRequest request)
	{
		if (!ModelState.IsValid)
		{
			return BadRequest(ModelState);
		}

		var entity = await _service.CreateAsync(request);
		return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
	}

	[HttpPut("{id}")]
	public async Task<IActionResult> Update(Guid id, [FromBody] HolidayTypeRequest request)
	{
		if (!ModelState.IsValid)
		{
			return BadRequest(ModelState);
		}

		var entity = await _service.UpdateAsync(id, request);
		if (entity == null)
		{
			return NotFound($"Holiday type with ID {id} not found.");
		}
		return Ok(entity);
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(Guid id)
	{
		try
		{
			var result = await _service.DeleteAsync(id);
			if (!result)
			{
				return NotFound($"Holiday type with ID {id} not found.");
			}
			return NoContent();
		}
		catch (Exception ex)
		{
			return StatusCode(500, $"An error occurred while deleting holiday type: {ex.Message}");
		}
	}
}