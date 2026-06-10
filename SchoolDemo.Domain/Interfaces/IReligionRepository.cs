namespace SchoolDemo.Domain.Interfaces;

public interface IReligionRepository
{
    Task<SchoolDemo.Domain.Entities.ReligionMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.ReligionMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.ReligionMaster> AddAsync(SchoolDemo.Domain.Entities.ReligionMaster entity);
    Task<SchoolDemo.Domain.Entities.ReligionMaster> UpdateAsync(SchoolDemo.Domain.Entities.ReligionMaster entity);
    Task DeleteAsync(Guid id);
}
