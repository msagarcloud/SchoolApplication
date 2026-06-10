using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolDemo.Infrastructure.Data;

[Table("RoleMenuMapping")]
public class RoleMenuMapping
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public Guid MenuId { get; set; }

    [Required]
    public Guid RoleId { get; set; }

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
    public virtual MenuMaster Menu { get; set; } = null!;
    public virtual RoleMaster Role { get; set; } = null!;

    [NotMapped]
    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    [NotMapped]
    public virtual UserDetail? ModifiedByNavigation { get; set; }
}
