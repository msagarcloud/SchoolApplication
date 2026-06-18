namespace SchoolDemo.Domain.Interfaces;

public interface IBookTypeMasterRepository
{
    Task<SchoolDemo.Domain.Entities.BookTypeMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.BookTypeMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.BookTypeMaster> AddAsync(SchoolDemo.Domain.Entities.BookTypeMaster entity);
    Task<SchoolDemo.Domain.Entities.BookTypeMaster> UpdateAsync(SchoolDemo.Domain.Entities.BookTypeMaster entity);
    Task DeleteAsync(Guid id);
}
