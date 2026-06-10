using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class StudentMarksDetailsHistory
{
    public Guid Id { get; set; }

    public Guid StudentMarksDetailsId { get; set; }

    public Guid StudentGuid { get; set; }

    public Guid SubjectId { get; set; }

    public decimal? GradeQ1 { get; set; }

    public decimal? GradeQ2 { get; set; }

    public decimal? GradeQ3 { get; set; }

    public decimal? GradeFa1 { get; set; }

    public decimal? GradeFa2 { get; set; }

    public decimal? GradeFa3 { get; set; }

    public decimal? GradeFa4 { get; set; }

    public decimal? GradeSa1 { get; set; }

    public decimal? GradeSa2 { get; set; }

    public Guid ClassId { get; set; }

    public Guid SectionId { get; set; }

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

    public virtual StudentMarksDetail StudentMarksDetails { get; set; } = null!;

    public virtual SubjectMaster Subject { get; set; } = null!;
}
