namespace SchoolDemo.Domain.Interfaces;

public interface IDesigRepository
{
    Task<SchoolDemo.Domain.Entities.DesigMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.DesigMaster>> GetAllAsync();
    Task<IEnumerable<SchoolDemo.Domain.Entities.DesigMaster>> GetByDepartmentIdAsync(Guid departmentId);
    Task<SchoolDemo.Domain.Entities.DesigMaster> AddAsync(SchoolDemo.Domain.Entities.DesigMaster entity);
    Task<SchoolDemo.Domain.Entities.DesigMaster> UpdateAsync(SchoolDemo.Domain.Entities.DesigMaster entity);
    Task DeleteAsync(Guid id);
}
