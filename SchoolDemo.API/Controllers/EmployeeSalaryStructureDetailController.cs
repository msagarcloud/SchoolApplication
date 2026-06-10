using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.DTOs;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class EmployeeSalaryStructureDetailController : ControllerBase
{
    private readonly IEmployeeSalaryStructureDetailService _service;

    public EmployeeSalaryStructureDetailController(IEmployeeSalaryStructureDetailService service)
    {
        _service = service;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var entity = await _service.GetByIdAsync(id);
        if (entity == null)
        {
            return NotFound($"Employee salary structure detail with ID {id} not found.");
        }
        return Ok(entity);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var entities = await _service.GetAllAsync();
        return Ok(entities);
    }

    [HttpGet("employee/{employeeId}")]
    public async Task<IActionResult> GetByEmployeeId(Guid employeeId)
    {
        var entities = await _service.GetByEmployeeIdAsync(employeeId);
        return Ok(entities);
    }

    [HttpPost("calculate")]
    public async Task<IActionResult> CalculateSalaryComponents([FromBody] SalaryCalculationRequest request)
    {
        try
        {
            var components = await _service.CalculateSalaryComponentsAsync(
                request.BasicSalary, 
                request.EmployeeId, 
                request.DesignationGradeId, 
                request.SessionId
            );
            return Ok(components);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while calculating salary components: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] EmployeeSalaryStructureDetailRequest request)
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
            return StatusCode(500, $"An error occurred while creating the employee salary structure detail: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] EmployeeSalaryStructureDetailRequest request)
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
                return NotFound($"Employee salary structure detail with ID {id} not found.");
            }
            return Ok(entity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while updating the employee salary structure detail: {ex.Message}");
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
                return NotFound($"Employee salary structure detail with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting the employee salary structure detail: {ex.Message}");
        }
    }
}

public class SalaryCalculationRequest
{
    public decimal BasicSalary { get; set; }
    public Guid EmployeeId { get; set; }
    public Guid DesignationGradeId { get; set; }
    public Guid SessionId { get; set; }
}
