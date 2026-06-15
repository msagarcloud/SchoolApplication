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
public class ExpenseCategoryController : ControllerBase
{
    private readonly IExpenseCategoryService _service;

    public ExpenseCategoryController(IExpenseCategoryService service)
    {
        _service = service;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var category = await _service.GetByIdAsync(id);
        if (category == null)
        {
            return NotFound($"Expense category with ID {id} not found.");
        }
        return Ok(category);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await _service.GetAllAsync();
        return Ok(categories);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ExpenseCategoryRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var category = await _service.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
        }
        catch (Exception ex)
        {
            var detailedMessage = ex.InnerException?.Message ?? ex.Message;
            return StatusCode(500, $"An error occurred while creating the expense category: {detailedMessage}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] ExpenseCategoryRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var category = await _service.UpdateAsync(id, request);
            if (category == null)
            {
                return NotFound($"Expense category with ID {id} not found.");
            }
            return Ok(category);
        }
        catch (Exception ex)
        {
            var detailedMessage = ex.InnerException?.Message ?? ex.Message;
            return StatusCode(500, $"An error occurred while updating the expense category: {detailedMessage}");
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
                return NotFound($"Expense category with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            var detailedMessage = ex.InnerException?.Message ?? ex.Message;
            return StatusCode(500, $"An error occurred while deleting the expense category: {detailedMessage}");
        }
    }
}
