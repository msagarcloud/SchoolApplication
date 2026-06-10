namespace SchoolDemo.Domain.Interfaces;

public interface IRoleRepository
{
    Task<SchoolDemo.Domain.Entities.RoleMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.RoleMaster>> GetAllAsync();
    Task<IEnumerable<SchoolDemo.Domain.Entities.RoleMaster>> GetByCompanyAndSchoolAsync(Guid companyId, Guid schoolId);
    Task<SchoolDemo.Domain.Entities.RoleMaster> AddAsync(SchoolDemo.Domain.Entities.RoleMaster entity);
    Task<SchoolDemo.Domain.Entities.RoleMaster> UpdateAsync(SchoolDemo.Domain.Entities.RoleMaster entity);
    Task DeleteAsync(Guid id);
}
