using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface ITimeTableService
{
    Task<IEnumerable<TimeTable>> GetAllAsync();
    Task<IEnumerable<TimeTable>> GetBySchoolIdAsync(Guid schoolId);
    Task<IEnumerable<TimeTable>> GetByClassIdAsync(Guid classId);
    Task<TimeTable?> GetByIdAsync(Guid id);
    Task<TimeTable> CreateAsync(TimeTable timetable);
    Task<TimeTable> UpdateAsync(TimeTable timetable);
    Task<bool> DeleteAsync(Guid id);
    
    // Timetable generation methods
    Task<TimeTable?> GenerateTimeTableAsync(Guid classId, Guid academicYearId, Guid createdBy);
    Task<IEnumerable<TimeTable>> GenerateTimeTablesForAllClassesAsync(Guid academicYearId, Guid createdBy);
    Task<bool> ValidateTimeTableAsync(Guid classId, Guid academicYearId);
    
    // Timetable detail methods
    Task<IEnumerable<TimeTableDetail>> GetTimeTableDetailsAsync(Guid timeTableId);
    Task<IEnumerable<TimeTableDetail>> GetTimeTableByClassAsync(Guid classId);
    Task<TimeTableDetail> AddTimeTableDetailAsync(TimeTableDetail detail);
    Task<TimeTableDetail> UpdateTimeTableDetailAsync(TimeTableDetail detail);
    Task<bool> DeleteTimeTableDetailAsync(Guid id);
    
    // Utility methods
    Task<IEnumerable<TimeTableDetail>> GetTimeTableByClassAndDayAsync(Guid classId, int dayOfWeek);
    Task<bool> IsTeacherAvailableAsync(Guid teacherId, int dayOfWeek, int periodNumber, Guid? excludeDetailId = null);
    Task<bool> IsClassAvailableAsync(Guid classId, int dayOfWeek, int periodNumber, Guid? excludeDetailId = null);
}
