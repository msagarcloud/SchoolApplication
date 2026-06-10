using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class RolePrivilege
{
    public Guid Id { get; set; }

    public Guid RoleId { get; set; }

    public Guid PrivilegeId { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? Status { get; set; }

    public string? StatusMessage { get; set; }

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual Privilege Privilege { get; set; } = null!;

    public virtual RoleMaster Role { get; set; } = null!;
}
