using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class StudentAchievement
{
    public Guid Id { get; set; }

    public Guid StudentGuid { get; set; }

    public string? SchoolName { get; set; }

    public Guid? Session { get; set; }

    public string? Description { get; set; }

    public bool? IsActive { get; set; }

    public bool? IsDeleted { get; set; }

    public Guid CompanyId { get; set; }

    public Guid SchoolId { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid ModifiedBy { get; set; }

    public DateTime ModifiedDate { get; set; }

    public string Status { get; set; } = null!;

    public string? StatusMessage { get; set; }

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<StudentAchievement> InverseSchool { get; set; } = new List<StudentAchievement>();

    public virtual ICollection<StudentAchievement> InverseSessionNavigation { get; set; } = new List<StudentAchievement>();

    public virtual UserDetail ModifiedByNavigation { get; set; } = null!;

    public virtual StudentAchievement School { get; set; } = null!;

    public virtual StudentAchievement? SessionNavigation { get; set; }
}
