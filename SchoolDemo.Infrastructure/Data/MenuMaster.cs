using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolDemo.Infrastructure.Data;

[Table("MenuMaster")]
public class MenuMaster
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string DisplayName { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string Icon { get; set; } = string.Empty;

    [Required]
    [MaxLength(200)]
    public string Path { get; set; } = string.Empty;

    public Guid? ParentId { get; set; }

    public int SortOrder { get; set; }

    [Required]
    [MaxLength(50)]
    public string Category { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Description { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    [Required]
    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    [MaxLength(20)]
    public string? Status { get; set; }

    [MaxLength(255)]
    public string? StatusMessage { get; set; }

    // Navigation properties
    public virtual MenuMaster? Parent { get; set; }
    public virtual ICollection<MenuMaster> Children { get; set; } = new List<MenuMaster>();
    public virtual ICollection<RoleMenuMapping> RoleMappings { get; set; } = new List<RoleMenuMapping>();

    [NotMapped]
    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    [NotMapped]
    public virtual UserDetail? ModifiedByNavigation { get; set; }
}
