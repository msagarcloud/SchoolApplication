namespace SchoolDemo.Domain.Entities;

public class TimeTableDetail
{
    public Guid Id { get; set; }
    
    public Guid TimeTableId { get; set; }
    public TimeTable? TimeTable { get; set; }
    
    public Guid ClassId { get; set; }
    public Class? Class { get; set; }
    
    public Guid SubjectId { get; set; }
    public Subject? Subject { get; set; }
    
    public Guid TeacherId { get; set; }
    
    public int DayOfWeek { get; set; } // 1-7 (Monday to Sunday)
    
    public int PeriodNumber { get; set; } // 1-8 (Period 1 to Period 8)
    
    public string? RoomNumber { get; set; }
    
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
}
