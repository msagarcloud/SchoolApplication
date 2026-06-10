using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.Interfaces;
namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class EmployeeController : ControllerBase
{
    private readonly IEmployeeService _employeeService;

    public EmployeeController(IEmployeeService employeeService)
    {
        _employeeService = employeeService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var employee = await _employeeService.GetByIdAsync(id);
        if (employee == null)
        {
            return NotFound($"Employee with ID {id} not found.");
        }
        return Ok(employee);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var employees = await _employeeService.GetAllAsync();
        return Ok(employees);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] EmployeeRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var employee = await _employeeService.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = employee.Id }, employee);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while creating the employee: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] EmployeeRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Console.WriteLine($"Updating employee with ID: {id}");
            var employee = await _employeeService.UpdateAsync(id, request);
            if (employee == null)
            {
                return NotFound($"Employee with ID {id} not found.");
            }
            Console.WriteLine($"Employee {id} updated successfully");
            return Ok(employee);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error updating employee {id}: {ex.Message}");
            Console.WriteLine($"Inner exception: {ex.InnerException?.Message}");
            Console.WriteLine($"Stack trace: {ex.StackTrace}");
            return StatusCode(500, $"An error occurred while updating the employee: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            var result = await _employeeService.DeleteAsync(id);
            if (!result)
            {
                return NotFound($"Employee with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting the employee: {ex.Message}");
        }
    }
}