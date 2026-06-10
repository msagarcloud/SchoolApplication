using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface ICleanerMasterRepository
{
    Task<SchoolDemo.Domain.Entities.CleanerMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.CleanerMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.CleanerMaster> AddAsync(SchoolDemo.Domain.Entities.CleanerMaster cleanerMaster);
    Task<SchoolDemo.Domain.Entities.CleanerMaster> UpdateAsync(SchoolDemo.Domain.Entities.CleanerMaster cleanerMaster);
    Task DeleteAsync(Guid id);
}
