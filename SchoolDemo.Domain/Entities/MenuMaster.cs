using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolDemo.Domain.Entities;

public class MenuMaster
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public string Path { get; set; } = string.Empty;
    public Guid? ParentId { get; set; }
    public int SortOrder { get; set; }
    public string Category { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid? ModifiedBy { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }

    // Navigation properties
    public MenuMaster? Parent { get; set; }
    public List<MenuMaster> Children { get; set; } = new();
    public List<RoleMenuMapping> RoleMappings { get; set; } = new();
}
