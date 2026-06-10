namespace SchoolDemo.Domain.Interfaces;

public interface IVehicleTypeRepository
{
    Task<SchoolDemo.Domain.Entities.VehicleTypeMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.VehicleTypeMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.VehicleTypeMaster> AddAsync(SchoolDemo.Domain.Entities.VehicleTypeMaster entity);
    Task<SchoolDemo.Domain.Entities.VehicleTypeMaster> UpdateAsync(SchoolDemo.Domain.Entities.VehicleTypeMaster entity);
    Task DeleteAsync(Guid id);
}
