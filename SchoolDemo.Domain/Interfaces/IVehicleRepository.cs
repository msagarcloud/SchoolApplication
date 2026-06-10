namespace SchoolDemo.Domain.Interfaces;

public interface IVehicleRepository
{
    Task<SchoolDemo.Domain.Entities.VehicleMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.VehicleMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.VehicleMaster> AddAsync(SchoolDemo.Domain.Entities.VehicleMaster entity);
    Task<SchoolDemo.Domain.Entities.VehicleMaster> UpdateAsync(SchoolDemo.Domain.Entities.VehicleMaster entity);
    Task DeleteAsync(Guid id);
}
