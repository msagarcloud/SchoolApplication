using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.Interfaces;
namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class CompanyController : ControllerBase
{
    private readonly ICompanyService _companyService;

    public CompanyController(ICompanyService companyService)
    {
        _companyService = companyService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var company = await _companyService.GetByIdAsync(id);
        if (company == null)
        {
            return NotFound($"Company with ID {id} not found.");
        }
        return Ok(company);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var companies = await _companyService.GetAllAsync();
        return Ok(companies);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CompanyRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var company = await _companyService.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = company.Id }, company);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while creating the company: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] CompanyRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var company = await _companyService.UpdateAsync(id, request);
            if (company == null)
            {
                return NotFound($"Company with ID {id} not found.");
            }
            return Ok(company);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while updating the company: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            var result = await _companyService.DeleteAsync(id);
            if (!result)
            {
                return NotFound($"Company with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting the company: {ex.Message}");
        }
    }
}