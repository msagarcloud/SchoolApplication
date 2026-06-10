using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface ITransportAssignmentService
{
    Task<IEnumerable<TransportAssignment>> GetAllAsync();
    Task<TransportAssignment?> GetByIdAsync(Guid id);
    Task<TransportAssignment> CreateAsync(TransportAssignmentRequest request);
    Task<TransportAssignment?> UpdateAsync(Guid id, TransportAssignmentRequest request);
    Task<bool> DeleteAsync(Guid id);
    Task<IEnumerable<TransportAssignment>> GetByStudentAsync(Guid studentId);
    Task<IEnumerable<TransportAssignment>> GetByVehicleAsync(Guid vehicleId);
}

public class TransportAssignmentRequest
{
    public Guid StudentId { get; set; }
    public Guid VehicleId { get; set; }
    public Guid DriverId { get; set; }
    public Guid RouteId { get; set; }
    public DateTime? AssignmentDate { get; set; }
    public DateTime? EffectiveFrom { get; set; }
    public DateTime? EffectiveTo { get; set; }
    public string? PickupPoint { get; set; }
    public string? DropPoint { get; set; }
    public TimeSpan? PickupTime { get; set; }
    public TimeSpan? DropTime { get; set; }
    public decimal? MonthlyFee { get; set; }
    public Guid CreatedBy { get; set; }
}
