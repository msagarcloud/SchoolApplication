namespace SchoolDemo.Domain.Interfaces;

public interface IRelationTypeRepository
{
    Task<SchoolDemo.Domain.Entities.RelationTypeMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.RelationTypeMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.RelationTypeMaster> AddAsync(SchoolDemo.Domain.Entities.RelationTypeMaster entity);
    Task<SchoolDemo.Domain.Entities.RelationTypeMaster> UpdateAsync(SchoolDemo.Domain.Entities.RelationTypeMaster entity);
    Task DeleteAsync(Guid id);
}
