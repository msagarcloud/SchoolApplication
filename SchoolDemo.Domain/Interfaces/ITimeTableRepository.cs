using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface ITimeTableRepository
{
    Task<IEnumerable<TimeTable>> GetAllAsync();
    Task<IEnumerable<TimeTable>> GetBySchoolIdAsync(Guid schoolId);
    Task<IEnumerable<TimeTable>> GetByClassIdAsync(Guid classId);
    Task<TimeTable?> GetByIdAsync(Guid id);
    Task<TimeTable> CreateAsync(TimeTable timetable);
    Task<TimeTable> UpdateAsync(TimeTable timetable);
    Task<bool> DeleteAsync(Guid id);
    Task<IEnumerable<TimeTableDetail>> GetTimeTableDetailsByTimeTableIdAsync(Guid timeTableId);
    Task<IEnumerable<TimeTableDetail>> GetTimeTableDetailsByClassIdAsync(Guid classId);
    Task<TimeTableDetail> CreateTimeTableDetailAsync(TimeTableDetail detail);
    Task<TimeTableDetail> UpdateTimeTableDetailAsync(TimeTableDetail detail);
    Task<bool> DeleteTimeTableDetailAsync(Guid id);
    Task<bool> TimeTableExistsAsync(Guid classId, Guid academicYearId);
    Task<IEnumerable<TimeTableDetail>> GetTimeTableByClassAndDayAsync(Guid classId, int dayOfWeek);
}
