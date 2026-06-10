using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface ITransportAssignmentRepository
{
    Task<IEnumerable<TransportAssignment>> GetAllAsync();
    Task<TransportAssignment?> GetByIdAsync(Guid id);
    Task<TransportAssignment> AddAsync(TransportAssignment entity);
    Task<TransportAssignment?> UpdateAsync(TransportAssignment entity);
    Task<bool> DeleteAsync(Guid id);
    Task<IEnumerable<TransportAssignment>> GetByStudentAsync(Guid studentId);
    Task<IEnumerable<TransportAssignment>> GetByVehicleAsync(Guid vehicleId);
}
