using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface IStudentAttendanceRepository
{
    Task<StudentAttendanceDetail?> GetByIdAsync(Guid id);
    Task<IEnumerable<StudentAttendanceDetail>> GetAllAsync();
    Task<StudentAttendanceDetail> AddAsync(StudentAttendanceDetail entity);
    Task<StudentAttendanceDetail> UpdateAsync(StudentAttendanceDetail entity);
    Task DeleteAsync(Guid id);
}
