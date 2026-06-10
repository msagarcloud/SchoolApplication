using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface IDriverMasterRepository
{
    Task<SchoolDemo.Domain.Entities.DriverMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.DriverMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.DriverMaster> AddAsync(SchoolDemo.Domain.Entities.DriverMaster driverMaster);
    Task<SchoolDemo.Domain.Entities.DriverMaster> UpdateAsync(SchoolDemo.Domain.Entities.DriverMaster driverMaster);
    Task<bool> DeleteAsync(Guid id);
}
