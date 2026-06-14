namespace SchoolDemo.Domain.Interfaces;

public interface IStudentAttendanceService
{
    Task<StudentAttendanceResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<StudentAttendanceResponse>> GetAllAsync();
    Task<StudentAttendanceResponse> CreateAsync(StudentAttendanceRequest request);
    Task<StudentAttendanceResponse?> UpdateAsync(Guid id, StudentAttendanceRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public class StudentAttendanceRequest
{
    public Guid StudentGuid { get; set; }
    public Guid ClassId { get; set; }
    public Guid SectionId { get; set; }
    public int? Month { get; set; }
    public int? Year { get; set; }
    public DateTime AttendenceDate { get; set; }
    public bool AttendenceStatus { get; set; }
    public Guid AttendanceReasonId { get; set; }
    public string? AttendenceTime { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public Guid CreatedBy { get; set; }
    public Guid? ModifiedBy { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class StudentAttendanceResponse
{
    public Guid Id { get; set; }
    public Guid StudentGuid { get; set; }
    public Guid ClassId { get; set; }
    public Guid SectionId { get; set; }
    public int? Month { get; set; }
    public int? Year { get; set; }
    public DateTime AttendenceDate { get; set; }
    public bool AttendenceStatus { get; set; }
    public Guid AttendanceReasonId { get; set; }
    public string? AttendenceTime { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}
