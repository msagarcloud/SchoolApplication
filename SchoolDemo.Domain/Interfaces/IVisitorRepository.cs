namespace SchoolDemo.Domain.Interfaces;

public interface IVisitorRepository
{
    Task<SchoolDemo.Domain.Entities.VisitorMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.VisitorMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.VisitorMaster> AddAsync(SchoolDemo.Domain.Entities.VisitorMaster entity);
    Task<SchoolDemo.Domain.Entities.VisitorMaster> UpdateAsync(SchoolDemo.Domain.Entities.VisitorMaster entity);
    Task DeleteAsync(Guid id);
}
