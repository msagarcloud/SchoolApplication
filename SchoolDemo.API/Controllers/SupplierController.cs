using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SupplierController : ControllerBase
{
    private readonly ISupplierService _supplierService;

    public SupplierController(ISupplierService supplierService)
    {
        _supplierService = supplierService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var supplier = await _supplierService.GetByIdAsync(id);
        if (supplier == null)
        {
            return NotFound($"Supplier with ID {id} not found.");
        }
        return Ok(supplier);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var suppliers = await _supplierService.GetAllAsync();
        return Ok(suppliers);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] SupplierRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var (success, supplier, message) = await _supplierService.CreateAsync(request);
            if (!success || supplier == null)
            {
                return StatusCode(500, message);
            }
            return CreatedAtAction(nameof(GetById), new { id = supplier.Id }, supplier);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while creating the supplier: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] SupplierRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var (success, supplier, message) = await _supplierService.UpdateAsync(id, request);
            if (!success || supplier == null)
            {
                if (message == "Supplier not found") return NotFound($"Supplier with ID {id} not found.");
                return StatusCode(500, message);
            }
            return Ok(supplier);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while updating the supplier: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            var result = await _supplierService.DeleteAsync(id);
            if (!result)
            {
                return NotFound($"Supplier with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting the supplier: {ex.Message}");
        }
    }
}
