using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[OutputCache(Duration = 60)] // Cache responses for 60 seconds
public class StudentControllerOptimized : ControllerBase
{
    private readonly IStudentService _service;

    public StudentControllerOptimized(IStudentService service)
    {
        _service = service;
    }

    [HttpGet("{id}")]
    [OutputCache(Duration = 300)] // Cache individual student for 5 minutes
    public async Task<IActionResult> GetById(Guid id)
    {
        var entity = await _service.GetByIdAsync(id);
        if (entity == null)
        {
            return NotFound($"Student with ID {id} not found.");
        }
        return Ok(entity);
    }

    [HttpGet]
    [OutputCache(Duration = 120)] // Cache list for 2 minutes
    public async Task<IActionResult> GetAll()
    {
        var entities = await _service.GetAllAsync();
        return Ok(entities);
    }

    [HttpGet("minimal")]
    [OutputCache(Duration = 180)] // Cache minimal list for 3 minutes
    public async Task<IActionResult> GetMinimal()
    {
        // This would need to be added to the service interface
        // For now, returning all data but this should use optimized query
        var entities = await _service.GetAllAsync();
        var minimal = entities.Select(s => new
        {
            s.Id,
            s.RollNumber,
            s.FirstName,
            s.LastName,
            s.Email,
            s.ContactNumber,
            s.ClassId,
            s.SectionId,
            s.IsActive
        });
        return Ok(minimal);
    }

    [HttpGet("paged")]
    [OutputCache(Duration = 90)] // Cache paged results for 90 seconds
    public async Task<IActionResult> GetPaged([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        if (page < 1) page = 1;
        if (pageSize < 1 || pageSize > 100) pageSize = 20;

        // This would need to be added to the service interface
        // For demonstration, implementing basic pagination here
        var allEntities = await _service.GetAllAsync();
        var totalCount = allEntities.Count();
        var pagedEntities = allEntities
            .Skip((page - 1) * pageSize)
            .Take(pageSize);

        var result = new
        {
            Data = pagedEntities,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize,
            TotalPages = (int)Math.Ceiling((double)totalCount / pageSize)
        };

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] StudentRequest request)
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
            return StatusCode(500, $"An error occurred while creating student: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] StudentRequest request)
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
                return NotFound($"Student with ID {id} not found.");
            }
            return Ok(entity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while updating student: {ex.Message}");
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
                return NotFound($"Student with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting student: {ex.Message}");
        }
    }

    [HttpGet("search")]
    [OutputCache(Duration = 60)]
    public async Task<IActionResult> Search([FromQuery] string query, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return BadRequest("Search query is required.");
        }

        if (page < 1) page = 1;
        if (pageSize < 1 || pageSize > 100) pageSize = 20;

        try
        {
            // This would need to be implemented in the service layer
            var allEntities = await _service.GetAllAsync();
            var filtered = allEntities.Where(s => 
                (s.FirstName?.Contains(query, StringComparison.OrdinalIgnoreCase) ?? false) ||
                (s.LastName?.Contains(query, StringComparison.OrdinalIgnoreCase) ?? false) ||
                (s.Email?.Contains(query, StringComparison.OrdinalIgnoreCase) ?? false) ||
                s.RollNumber.ToString().Contains(query, StringComparison.OrdinalIgnoreCase)
            );

            var totalCount = filtered.Count();
            var pagedResults = filtered
                .Skip((page - 1) * pageSize)
                .Take(pageSize);

            var result = new
            {
                Data = pagedResults,
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling((double)totalCount / pageSize),
                Query = query
            };

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while searching students: {ex.Message}");
        }
    }
}
