using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface ITimeTablePeriodRepository
{
    Task<TimeTablePeriodMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<TimeTablePeriodMaster>> GetAllAsync();
    Task<TimeTablePeriodMaster> AddAsync(TimeTablePeriodMaster entity);
    Task<TimeTablePeriodMaster> UpdateAsync(TimeTablePeriodMaster entity);
    Task DeleteAsync(Guid id);
}
