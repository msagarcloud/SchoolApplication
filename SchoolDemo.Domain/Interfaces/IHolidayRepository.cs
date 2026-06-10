namespace SchoolDemo.Domain.Interfaces;

public interface IHolidayRepository
{
    Task<SchoolDemo.Domain.Entities.HolidayMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.HolidayMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.HolidayMaster> AddAsync(SchoolDemo.Domain.Entities.HolidayMaster entity);
    Task<SchoolDemo.Domain.Entities.HolidayMaster> UpdateAsync(SchoolDemo.Domain.Entities.HolidayMaster entity);
    Task DeleteAsync(Guid id);
}
