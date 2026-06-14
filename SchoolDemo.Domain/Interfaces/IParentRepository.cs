using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface IParentRepository
{
    Task<ParentMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<ParentMaster>> GetAllAsync();
    Task<IEnumerable<ParentMaster>> GetByStudentIdAsync(Guid studentId);
    Task<ParentMaster> AddAsync(ParentMaster entity);
    Task<ParentMaster> UpdateAsync(ParentMaster entity);
    Task DeleteAsync(Guid id);
}
