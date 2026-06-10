using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TimeTableController : ControllerBase
{
    private readonly ITimeTableService _timeTableService;

    public TimeTableController(ITimeTableService timeTableService)
    {
        _timeTableService = timeTableService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var timetables = await _timeTableService.GetAllAsync();
        return Ok(timetables);
    }

    [HttpGet("school/{schoolId}")]
    public async Task<IActionResult> GetBySchoolId(Guid schoolId)
    {
        var timetables = await _timeTableService.GetBySchoolIdAsync(schoolId);
        return Ok(timetables);
    }

    [HttpGet("class/{classId}")]
    public async Task<IActionResult> GetByClassId(Guid classId)
    {
        var timetables = await _timeTableService.GetByClassIdAsync(classId);
        return Ok(timetables);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var timetable = await _timeTableService.GetByIdAsync(id);
        if (timetable == null)
            return NotFound();
        
        return Ok(timetable);
    }

    [HttpGet("{id}/details")]
    public async Task<IActionResult> GetTimeTableDetails(Guid id)
    {
        var details = await _timeTableService.GetTimeTableDetailsAsync(id);
        return Ok(details);
    }

    [HttpGet("class/{classId}/details")]
    public async Task<IActionResult> GetTimeTableByClass(Guid classId)
    {
        var details = await _timeTableService.GetTimeTableByClassAsync(classId);
        return Ok(details);
    }

    [HttpGet("class/{classId}/day/{dayOfWeek}")]
    public async Task<IActionResult> GetTimeTableByClassAndDay(Guid classId, int dayOfWeek)
    {
        if (dayOfWeek < 1 || dayOfWeek > 7)
            return BadRequest("Day of week must be between 1 (Monday) and 7 (Sunday)");

        var details = await _timeTableService.GetTimeTableByClassAndDayAsync(classId, dayOfWeek);
        return Ok(details);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TimeTable timetable)
    {
        if (timetable == null)
            return BadRequest("Timetable data is required.");

        try
        {
            var createdTimetable = await _timeTableService.CreateAsync(timetable);
            return CreatedAtAction(nameof(GetById), new { id = createdTimetable.Id }, createdTimetable);
        }
        catch (Exception)
        {
            return BadRequest("An error occurred while processing the request");
        }
    }

    [HttpPost("generate/{classId}/{academicYearId}")]
    public async Task<IActionResult> GenerateTimeTable(Guid classId, Guid academicYearId)
    {
        try
        {
            // Get created user ID from claims or use a default
            var createdBy = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(createdBy))
                createdBy = Guid.NewGuid().ToString();

            var timetable = await _timeTableService.GenerateTimeTableAsync(
                classId, 
                academicYearId, 
                Guid.Parse(createdBy));

            return CreatedAtAction(nameof(GetById), new { id = timetable.Id }, timetable);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500, "An error occurred while generating the timetable");
        }
    }

    [HttpPost("generate-all/{academicYearId}")]
    public async Task<IActionResult> GenerateTimeTablesForAllClasses(Guid academicYearId)
    {
        try
        {
            // Get created user ID from claims or use a default
            var createdBy = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(createdBy))
                createdBy = Guid.NewGuid().ToString();

            var timetables = await _timeTableService.GenerateTimeTablesForAllClassesAsync(
                academicYearId, 
                Guid.Parse(createdBy));

            return Ok(new { 
                Message = "Timetables generated successfully", 
                Count = timetables.Count(),
                Timetables = timetables
            });
        }
        catch (Exception)
        {
            return StatusCode(500, "An error occurred while generating timetables");
        }
    }

    [HttpPost("details")]
    public async Task<IActionResult> AddTimeTableDetail([FromBody] TimeTableDetail detail)
    {
        if (detail == null)
            return BadRequest("Timetable detail data is required.");

        try
        {
            var createdDetail = await _timeTableService.AddTimeTableDetailAsync(detail);
            return CreatedAtAction(nameof(GetTimeTableDetails), new { id = createdDetail.TimeTableId }, createdDetail);
        }
        catch (Exception)
        {
            return BadRequest("An error occurred while processing the request");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] TimeTable timetable)
    {
        if (timetable == null || id != timetable.Id)
            return BadRequest("Invalid timetable data.");

        try
        {
            var existingTimetable = await _timeTableService.GetByIdAsync(id);
            if (existingTimetable == null)
                return NotFound();

            await _timeTableService.UpdateAsync(timetable);
            return NoContent();
        }
        catch (Exception)
        {
            return BadRequest("An error occurred while processing the request");
        }
    }

    [HttpPut("details/{id}")]
    public async Task<IActionResult> UpdateTimeTableDetail(Guid id, [FromBody] TimeTableDetail detail)
    {
        if (detail == null || id != detail.Id)
            return BadRequest("Invalid timetable detail data.");

        try
        {
            await _timeTableService.UpdateTimeTableDetailAsync(detail);
            return NoContent();
        }
        catch (Exception)
        {
            return BadRequest("An error occurred while processing the request");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            var timetable = await _timeTableService.GetByIdAsync(id);
            if (timetable == null)
                return NotFound();

            await _timeTableService.DeleteAsync(id);
            return NoContent();
        }
        catch (Exception)
        {
            return BadRequest("An error occurred while processing the request");
        }
    }

    [HttpDelete("details/{id}")]
    public async Task<IActionResult> DeleteTimeTableDetail(Guid id)
    {
        try
        {
            var result = await _timeTableService.DeleteTimeTableDetailAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
        catch (Exception)
        {
            return BadRequest("An error occurred while processing the request");
        }
    }

    [HttpGet("validate/{classId}/{academicYearId}")]
    public async Task<IActionResult> ValidateTimeTable(Guid classId, Guid academicYearId)
    {
        try
        {
            var isValid = await _timeTableService.ValidateTimeTableAsync(classId, academicYearId);
            return Ok(new { IsValid = isValid, ClassId = classId, AcademicYearId = academicYearId });
        }
        catch (Exception)
        {
            return BadRequest("An error occurred while processing the request");
        }
    }

    [HttpGet("teacher/{teacherId}/availability")]
    public async Task<IActionResult> CheckTeacherAvailability(
        Guid teacherId, 
        [FromQuery] int dayOfWeek, 
        [FromQuery] int periodNumber,
        [FromQuery] Guid? excludeDetailId = null)
    {
        if (dayOfWeek < 1 || dayOfWeek > 7)
            return BadRequest("Day of week must be between 1 (Monday) and 7 (Sunday)");

        if (periodNumber < 1 || periodNumber > 8)
            return BadRequest("Period number must be between 1 and 8");

        try
        {
            var isAvailable = await _timeTableService.IsTeacherAvailableAsync(teacherId, dayOfWeek, periodNumber, excludeDetailId);
            return Ok(new { 
                TeacherId = teacherId, 
                DayOfWeek = dayOfWeek, 
                PeriodNumber = periodNumber,
                IsAvailable = isAvailable 
            });
        }
        catch (Exception)
        {
            return BadRequest("An error occurred while processing the request");
        }
    }

    [HttpGet("class/{classId}/availability")]
    public async Task<IActionResult> CheckClassAvailability(
        Guid classId, 
        [FromQuery] int dayOfWeek, 
        [FromQuery] int periodNumber,
        [FromQuery] Guid? excludeDetailId = null)
    {
        if (dayOfWeek < 1 || dayOfWeek > 7)
            return BadRequest("Day of week must be between 1 (Monday) and 7 (Sunday)");

        if (periodNumber < 1 || periodNumber > 8)
            return BadRequest("Period number must be between 1 and 8");

        try
        {
            var isAvailable = await _timeTableService.IsClassAvailableAsync(classId, dayOfWeek, periodNumber, excludeDetailId);
            return Ok(new { 
                ClassId = classId, 
                DayOfWeek = dayOfWeek, 
                PeriodNumber = periodNumber,
                IsAvailable = isAvailable 
            });
        }
        catch (Exception)
        {
            return BadRequest("An error occurred while processing the request");
        }
    }
}
