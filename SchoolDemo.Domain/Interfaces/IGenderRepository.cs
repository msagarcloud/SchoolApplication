namespace SchoolDemo.Domain.Interfaces;

public interface IGenderRepository
{
    Task<SchoolDemo.Domain.Entities.GenderMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.GenderMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.GenderMaster> AddAsync(SchoolDemo.Domain.Entities.GenderMaster entity);
    Task<SchoolDemo.Domain.Entities.GenderMaster> UpdateAsync(SchoolDemo.Domain.Entities.GenderMaster entity);
    Task DeleteAsync(Guid id);
}
