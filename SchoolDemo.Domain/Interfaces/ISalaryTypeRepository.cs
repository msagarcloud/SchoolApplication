namespace SchoolDemo.Domain.Interfaces;

public interface ISalaryTypeRepository
{
    Task<SchoolDemo.Domain.Entities.SalaryTypeMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.SalaryTypeMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.SalaryTypeMaster> AddAsync(SchoolDemo.Domain.Entities.SalaryTypeMaster entity);
    Task<SchoolDemo.Domain.Entities.SalaryTypeMaster> UpdateAsync(SchoolDemo.Domain.Entities.SalaryTypeMaster entity);
    Task DeleteAsync(Guid id);
}
