using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class SubjectCategoryDetail
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public Guid ParentId { get; set; }

    public Guid SubjectId { get; set; }

    public Guid SessionId { get; set; }

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

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<SubjectCategoryDetail> InverseSubject { get; set; } = new List<SubjectCategoryDetail>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual SessionMaster Session { get; set; } = null!;

    public virtual SubjectCategoryDetail Subject { get; set; } = null!;

    public virtual ICollection<SubjectCategoryDetailsHistory> SubjectCategoryDetailsHistories { get; set; } = new List<SubjectCategoryDetailsHistory>();
}
