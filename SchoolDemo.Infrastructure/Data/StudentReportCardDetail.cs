using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class StudentReportCardDetail
{
    public Guid Id { get; set; }

    public Guid ReportCardId { get; set; }

    public Guid SubjectId { get; set; }

    public decimal? QuarterMarks { get; set; }

    public decimal? Fa1marks { get; set; }

    public decimal? Fa2marks { get; set; }

    public decimal? Samarks { get; set; }

    public string? Grade { get; set; }

    public string? Fa1grade { get; set; }

    public string? Fa2grade { get; set; }

    public string? Sagrade { get; set; }

    public decimal? TotalMarks { get; set; }

    public string? TotalGrade { get; set; }

    public Guid CompanyId { get; set; }

    public Guid SchoolId { get; set; }

    public decimal? TotalMarksQuarter { get; set; }

    public decimal? TotalMarksFa1 { get; set; }

    public decimal? TotalMarksFa2 { get; set; }

    public decimal? TotalMarksSa { get; set; }

    public decimal? TotalMarksFinal { get; set; }

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

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual SubjectMaster Subject { get; set; } = null!;
}
