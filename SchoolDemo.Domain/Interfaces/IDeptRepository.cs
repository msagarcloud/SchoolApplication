namespace SchoolDemo.Domain.Interfaces;

public interface IDeptRepository
{
    Task<SchoolDemo.Domain.Entities.DeptMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.DeptMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.DeptMaster> AddAsync(SchoolDemo.Domain.Entities.DeptMaster entity);
    Task<SchoolDemo.Domain.Entities.DeptMaster> UpdateAsync(SchoolDemo.Domain.Entities.DeptMaster entity);
    Task DeleteAsync(Guid id);
}
