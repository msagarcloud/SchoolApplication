namespace SchoolDemo.Domain.Interfaces;

public interface ISessionRepository
{
    Task<SchoolDemo.Domain.Entities.SessionMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.SessionMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.SessionMaster> AddAsync(SchoolDemo.Domain.Entities.SessionMaster entity);
    Task<SchoolDemo.Domain.Entities.SessionMaster> UpdateAsync(SchoolDemo.Domain.Entities.SessionMaster entity);
    Task DeleteAsync(Guid id);
}
