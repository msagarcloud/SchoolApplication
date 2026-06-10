using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class StudentCommentDetailsHistory
{
    public Guid Id { get; set; }

    public Guid StudentCommentId { get; set; }

    public Guid StudentGuid { get; set; }

    public Guid ClassId { get; set; }

    public Guid SectionId { get; set; }

    public Guid? Session { get; set; }

    public string? Q1desc { get; set; }

    public string? Q2desc { get; set; }

    public string? Q3desc { get; set; }

    public string? Sa1desc { get; set; }

    public string? Sa2desc { get; set; }

    public string? FinalDesc { get; set; }

    public Guid CompanyId { get; set; }

    public Guid SchoolId { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? Status { get; set; }

    public string? StatusMessage { get; set; }

    public virtual ClassMaster Class { get; set; } = null!;

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual SectionMaster Section { get; set; } = null!;

    public virtual StudentMaster Student { get; set; } = null!;

    public virtual StudentCommentDetail StudentComment { get; set; } = null!;
}
