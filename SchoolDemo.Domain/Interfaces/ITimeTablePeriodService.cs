using SchoolDemo.Domain.DTOs;

namespace SchoolDemo.Domain.Interfaces;

public interface ITimeTablePeriodService
{
    Task<TimeTablePeriodResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<TimeTablePeriodResponse>> GetAllAsync();
    Task<TimeTablePeriodResponse> CreateAsync(TimeTablePeriodRequest request);
    Task<TimeTablePeriodResponse> UpdateAsync(Guid id, TimeTablePeriodRequest request);
    Task<bool> DeleteAsync(Guid id);
}
