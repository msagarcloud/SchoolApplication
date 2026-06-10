namespace SchoolDemo.Domain.Interfaces;

public interface IProfessionRepository
{
    Task<SchoolDemo.Domain.Entities.ProfessionMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.ProfessionMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.ProfessionMaster> AddAsync(SchoolDemo.Domain.Entities.ProfessionMaster entity);
    Task<SchoolDemo.Domain.Entities.ProfessionMaster> UpdateAsync(SchoolDemo.Domain.Entities.ProfessionMaster entity);
    Task DeleteAsync(Guid id);
}
