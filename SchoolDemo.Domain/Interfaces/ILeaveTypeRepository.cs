namespace SchoolDemo.Domain.Interfaces;

public interface ILeaveTypeRepository
{
    Task<SchoolDemo.Domain.Entities.LeaveTypeMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.LeaveTypeMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.LeaveTypeMaster> AddAsync(SchoolDemo.Domain.Entities.LeaveTypeMaster entity);
    Task<SchoolDemo.Domain.Entities.LeaveTypeMaster> UpdateAsync(SchoolDemo.Domain.Entities.LeaveTypeMaster entity);
    Task DeleteAsync(Guid id);
}
