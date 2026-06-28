using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.API.Controllers;

/// <summary>
/// Controller to generate period timetables for classes.
/// Provides endpoints to generate timetables for all classes for an academic year.
/// </summary>
[ApiController]
[Route("api/[controller]")]
[AllowAnonymous]
public class PeriodClassController : ControllerBase
{
	private readonly ITimeTableService _timeTableService;

	public PeriodClassController(ITimeTableService timeTableService)
	{
		_timeTableService = timeTableService;
	}

	/// <summary>
	/// Generate timetables for all active classes for the provided academic year.
	/// This will create timetables and corresponding period allocations.
	/// </summary>
	/// <param name="academicYearId">Academic year identifier</param>
	/// <returns>Summary of generated timetables</returns>
	[HttpPost("generate-all/{academicYearId}")]
	[ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
	[ProducesResponseType(StatusCodes.Status400BadRequest)]
	[ProducesResponseType(StatusCodes.Status500InternalServerError)]
	public async Task<IActionResult> GenerateForAllClasses(Guid academicYearId)
	{
		if (academicYearId == Guid.Empty)
			return BadRequest("Academic year id is required.");

		try
		{
			var createdBy = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
			if (string.IsNullOrEmpty(createdBy))
				createdBy = Guid.NewGuid().ToString();

			var timetables = await _timeTableService.GenerateTimeTablesForAllClassesAsync(
				academicYearId,
				Guid.Parse(createdBy));

			return Ok(new
			{
				Message = "Timetables generated successfully",
				Count = timetables.Count(),
				Timetables = timetables
			});
		}
		catch (Exception ex)
		{
			return StatusCode(500, $"An error occurred while generating timetables: {ex.Message}");
		}
	}
}
