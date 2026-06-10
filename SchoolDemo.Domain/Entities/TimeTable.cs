namespace SchoolDemo.Domain.Entities;

public class TimeTable
{
    public Guid Id { get; set; }
    
    public string? Name { get; set; }
    
    public string? Description { get; set; }
    
    public Guid ClassId { get; set; }
    public Class? Class { get; set; }
    
    public Guid AcademicYearId { get; set; }
    
    public DateTime StartDate { get; set; }
    
    public DateTime EndDate { get; set; }
    
    public int PeriodsPerDay { get; set; } = 8;
    
    public TimeSpan StartTime { get; set; } = new TimeSpan(8, 0, 0); // 8:00 AM
    
    public TimeSpan EndTime { get; set; } = new TimeSpan(15, 0, 0); // 3:00 PM
    
    public TimeSpan BreakDuration { get; set; } = new TimeSpan(0, 30, 0); // 30 minutes
    
    public int BreakAfterPeriod { get; set; } = 4; // Break after 4th period
    
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
    
    // Navigation property for timetable details
    public ICollection<TimeTableDetail> TimeTableDetails { get; set; } = new List<TimeTableDetail>();
}
