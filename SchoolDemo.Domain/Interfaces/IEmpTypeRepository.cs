namespace SchoolDemo.Domain.Interfaces;

public interface IEmpTypeRepository
{
    Task<SchoolDemo.Domain.Entities.EmpTypeMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.EmpTypeMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.EmpTypeMaster> AddAsync(SchoolDemo.Domain.Entities.EmpTypeMaster entity);
    Task<SchoolDemo.Domain.Entities.EmpTypeMaster> UpdateAsync(SchoolDemo.Domain.Entities.EmpTypeMaster entity);
    Task DeleteAsync(Guid id);
}
