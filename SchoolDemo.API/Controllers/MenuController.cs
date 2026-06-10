using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolDemo.Application.Services;
using SchoolDemo.Domain.Entities;

namespace SchoolDemo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MenuController : ControllerBase
{
    private readonly IMenuService _menuService;

    public MenuController(IMenuService menuService)
    {
        _menuService = menuService;
    }

    [HttpGet("role/{roleName}")]
    public async Task<ActionResult<IEnumerable<MenuMaster>>> GetMenuForRole(string roleName)
    {
        try
        {
            Console.WriteLine($"Getting menu for role: {roleName}");
            var menus = await _menuService.GetMenuForRoleAsync(roleName);
            Console.WriteLine($"Found {menus?.Count() ?? 0} menus for role: {roleName}");
            return Ok(menus);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error retrieving menu for role '{roleName}': {ex.Message}");
            Console.WriteLine($"Stack trace: {ex.StackTrace}");
            return StatusCode(500, new { message = $"Error retrieving menu for role '{roleName}'", error = ex.Message });
        }
    }

    [HttpGet("role/{roleName}/hierarchy")]
    public async Task<ActionResult<IEnumerable<MenuMaster>>> GetMenuHierarchyForRole(string roleName)
    {
        try
        {
            Console.WriteLine($"Getting menu hierarchy for role: {roleName}");
            var menus = await _menuService.GetMenuHierarchyForRoleAsync(roleName);
            Console.WriteLine($"Found {menus?.Count() ?? 0} menu hierarchy items for role: {roleName}");
            return Ok(menus);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error retrieving menu hierarchy for role '{roleName}': {ex.Message}");
            Console.WriteLine($"Stack trace: {ex.StackTrace}");
            return StatusCode(500, new { message = $"Error retrieving menu hierarchy for role '{roleName}'", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<MenuMaster>> GetMenuById(Guid id)
    {
        try
        {
            var menu = await _menuService.GetMenuByIdAsync(id);
            if (menu == null)
            {
                return NotFound(new { message = "Menu not found" });
            }
            return Ok(menu);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error retrieving menu", error = ex.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MenuMaster>>> GetAllMenus()
    {
        try
        {
            var menus = await _menuService.GetAllMenusAsync();
            return Ok(menus);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error retrieving all menus", error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult<MenuMaster>> CreateMenu([FromBody] MenuMaster menu)
    {
        try
        {
            var createdMenu = await _menuService.CreateMenuAsync(menu);
            return CreatedAtAction(nameof(GetMenuById), new { id = createdMenu.Id }, createdMenu);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error creating menu", error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<MenuMaster>> UpdateMenu(Guid id, [FromBody] MenuMaster menu)
    {
        try
        {
            if (id != menu.Id)
            {
                return BadRequest(new { message = "ID mismatch" });
            }

            var updatedMenu = await _menuService.UpdateMenuAsync(menu);
            return Ok(updatedMenu);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error updating menu", error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteMenu(Guid id)
    {
        try
        {
            var result = await _menuService.DeleteMenuAsync(id);
            if (!result)
            {
                return NotFound(new { message = "Menu not found" });
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error deleting menu", error = ex.Message });
        }
    }

    [HttpPost("{menuId}/assign-role/{roleId}")]
    public async Task<ActionResult> AssignMenuToRole(Guid menuId, Guid roleId)
    {
        try
        {
            var result = await _menuService.AssignMenuToRoleAsync(menuId, roleId);
            if (!result)
            {
                return BadRequest(new { message = "Failed to assign menu to role" });
            }
            return Ok(new { message = "Menu assigned to role successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error assigning menu to role", error = ex.Message });
        }
    }

    [HttpPost("{menuId}/remove-role/{roleId}")]
    public async Task<ActionResult> RemoveMenuFromRole(Guid menuId, Guid roleId)
    {
        try
        {
            var result = await _menuService.RemoveMenuFromRoleAsync(menuId, roleId);
            if (!result)
            {
                return BadRequest(new { message = "Failed to remove menu from role" });
            }
            return Ok(new { message = "Menu removed from role successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error removing menu from role", error = ex.Message });
        }
    }
}
