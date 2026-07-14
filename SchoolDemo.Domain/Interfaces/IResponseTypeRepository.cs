namespace SchoolDemo.Domain.Interfaces;

public interface IResponseTypeRepository
{
    Task<SchoolDemo.Domain.Entities.ResponseType?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.ResponseType>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.ResponseType> AddAsync(SchoolDemo.Domain.Entities.ResponseType entity);
    Task<SchoolDemo.Domain.Entities.ResponseType> UpdateAsync(SchoolDemo.Domain.Entities.ResponseType entity);
    Task DeleteAsync(Guid id);
}
