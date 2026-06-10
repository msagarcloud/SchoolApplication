using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class ScholasticMaster
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public Guid? ParentId { get; set; }

    public Guid? SubjectId { get; set; }

    public Guid? CompanyId { get; set; }

    public Guid? SchoolId { get; set; }

    public Guid? SessionId { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid ModifiedBy { get; set; }

    public DateTime ModifiedDate { get; set; }

    public bool? IsActive { get; set; }

    public bool? IsDeleted { get; set; }

    public string Status { get; set; } = null!;

    public string? StatusMessage { get; set; }

    public virtual ICollection<ClassScholasticDetailHistory> ClassScholasticDetailHistories { get; set; } = new List<ClassScholasticDetailHistory>();

    public virtual ICollection<ClassScholasticDetail> ClassScholasticDetails { get; set; } = new List<ClassScholasticDetail>();

    public virtual CompanyMaster? Company { get; set; }

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual UserDetail ModifiedByNavigation { get; set; } = null!;

    public virtual ParentMaster? Parent { get; set; }

    public virtual SchoolMaster? School { get; set; }

    public virtual SessionMaster? Session { get; set; }

    public virtual ICollection<StudentGradeDetailsHistory> StudentGradeDetailsHistories { get; set; } = new List<StudentGradeDetailsHistory>();

    public virtual SubjectMaster? Subject { get; set; }
}
