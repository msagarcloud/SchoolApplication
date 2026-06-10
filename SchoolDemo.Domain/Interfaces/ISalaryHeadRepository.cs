namespace SchoolDemo.Domain.Interfaces;

public interface ISalaryHeadRepository
{
    Task<SchoolDemo.Domain.Entities.SalaryHeadMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.SalaryHeadMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.SalaryHeadMaster> AddAsync(SchoolDemo.Domain.Entities.SalaryHeadMaster entity);
    Task<SchoolDemo.Domain.Entities.SalaryHeadMaster> UpdateAsync(SchoolDemo.Domain.Entities.SalaryHeadMaster entity);
    Task DeleteAsync(Guid id);
}
