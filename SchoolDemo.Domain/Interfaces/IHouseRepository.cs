namespace SchoolDemo.Domain.Interfaces;

public interface IHouseRepository
{
    Task<SchoolDemo.Domain.Entities.HouseMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.HouseMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.HouseMaster> AddAsync(SchoolDemo.Domain.Entities.HouseMaster entity);
    Task<SchoolDemo.Domain.Entities.HouseMaster> UpdateAsync(SchoolDemo.Domain.Entities.HouseMaster entity);
    Task DeleteAsync(Guid id);
}
