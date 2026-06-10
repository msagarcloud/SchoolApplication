using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using TeacherSubjectDetail = SchoolDemo.Domain.Entities.TeacherSubjectDetail;

namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeacherSubjectController : ControllerBase
{
    private readonly ITeacherSubjectDetailService _service;

    public TeacherSubjectController(ITeacherSubjectDetailService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var entities = await _service.GetAllAsync();
        return Ok(entities);
    }

    [HttpGet("school/{schoolId}")]
    public async Task<IActionResult> GetBySchoolId(Guid schoolId)
    {
        var entities = await _service.GetBySchoolIdAsync(schoolId);
        return Ok(entities);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var entity = await _service.GetByIdAsync(id);
        if (entity == null)
            return NotFound();
        
        return Ok(entity);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TeacherSubjectDetail entity)
    {
        if (entity == null)
            return BadRequest("Teacher subject data is required.");

        var createdEntity = await _service.CreateAsync(entity);
        return CreatedAtAction(nameof(GetById), new { id = createdEntity.Id }, createdEntity);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] TeacherSubjectDetail entity)
    {
        if (entity == null || id != entity.Id)
            return BadRequest("Invalid teacher subject data.");

        var existingEntity = await _service.GetByIdAsync(id);
        if (existingEntity == null)
            return NotFound();

        await _service.UpdateAsync(entity);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var entity = await _service.GetByIdAsync(id);
        if (entity == null)
            return NotFound();

        await _service.DeleteAsync(id);
        return NoContent();
    }
}
