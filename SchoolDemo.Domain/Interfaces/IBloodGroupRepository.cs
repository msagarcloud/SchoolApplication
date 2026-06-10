namespace SchoolDemo.Domain.Interfaces;

public interface IBloodGroupRepository
{
    Task<SchoolDemo.Domain.Entities.BloodGroupMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.BloodGroupMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.BloodGroupMaster> AddAsync(SchoolDemo.Domain.Entities.BloodGroupMaster entity);
    Task<SchoolDemo.Domain.Entities.BloodGroupMaster> UpdateAsync(SchoolDemo.Domain.Entities.BloodGroupMaster entity);
    Task DeleteAsync(Guid id);
}
