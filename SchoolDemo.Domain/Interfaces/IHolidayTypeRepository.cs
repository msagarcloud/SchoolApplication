namespace SchoolDemo.Domain.Interfaces;

public interface IHolidayTypeRepository
{
    Task<SchoolDemo.Domain.Entities.HolidayTypeMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.HolidayTypeMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.HolidayTypeMaster> AddAsync(SchoolDemo.Domain.Entities.HolidayTypeMaster entity);
    Task<SchoolDemo.Domain.Entities.HolidayTypeMaster> UpdateAsync(SchoolDemo.Domain.Entities.HolidayTypeMaster entity);
    Task DeleteAsync(Guid id);
}
