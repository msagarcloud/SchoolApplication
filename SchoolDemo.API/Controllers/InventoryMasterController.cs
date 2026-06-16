using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class InventoryMasterController : ControllerBase
{
    private readonly IInventoryMasterRepository _repository;

    public InventoryMasterController(IInventoryMasterRepository repository)
    {
        _repository = repository;
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity == null)
            return NotFound($"Item with ID {id} not found.");
        return Ok(entity);
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        var entities = await _repository.GetAllAsync();
        return Ok(entities);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] SchoolDemo.Domain.Entities.InventoryMaster request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var created = await _repository.AddAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] SchoolDemo.Domain.Entities.InventoryMaster request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (id != request.Id)
            return BadRequest("Id mismatch");

        var updated = await _repository.UpdateAsync(request);
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _repository.DeleteAsync(id);
        return NoContent();
    }
}
