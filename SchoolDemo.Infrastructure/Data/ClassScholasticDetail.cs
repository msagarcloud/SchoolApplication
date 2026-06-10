using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class ClassScholasticDetail
{
    public Guid Id { get; set; }

    public Guid ClassMasterId { get; set; }

    public Guid ScholasticId { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CompanyId { get; set; }

    public Guid SchoolId { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? Status { get; set; }

    public string? StatusMessage { get; set; }

    public virtual ClassMaster ClassMaster { get; set; } = null!;

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual ScholasticMaster Scholastic { get; set; } = null!;

    public virtual SchoolMaster School { get; set; } = null!;
}
