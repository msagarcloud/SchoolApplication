using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class AcademicYear
{
    public Guid Id { get; set; }

    public string AcademicYearName { get; set; } = null!;

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public bool IsCurrent { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }
}
