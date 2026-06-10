using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class TransportAssignmentService : ITransportAssignmentService
{
    private readonly ITransportAssignmentRepository _repository;

    public TransportAssignmentService(ITransportAssignmentRepository repository)
    {
        _repository = repository;
    }

    public async Task<TransportAssignment?> GetByIdAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<TransportAssignment>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<TransportAssignment> CreateAsync(TransportAssignmentRequest request)
    {
        var entity = new TransportAssignment
        {
            Id = Guid.NewGuid(),
            StudentId = request.StudentId,
            VehicleId = request.VehicleId,
            DriverId = request.DriverId,
            RouteId = request.RouteId,
            AssignmentDate = request.AssignmentDate,
            EffectiveFrom = request.EffectiveFrom,
            EffectiveTo = request.EffectiveTo,
            PickupPoint = request.PickupPoint,
            DropPoint = request.DropPoint,
            PickupTime = request.PickupTime,
            DropTime = request.DropTime,
            MonthlyFee = request.MonthlyFee,
            CreatedBy = request.CreatedBy,
            CreatedDate = DateTime.UtcNow,
            IsActive = true,
            IsDeleted = false
        };

        return await _repository.AddAsync(entity);
    }

    public async Task<TransportAssignment?> UpdateAsync(Guid id, TransportAssignmentRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null)
            return null;

        existingEntity.StudentId = request.StudentId;
        existingEntity.VehicleId = request.VehicleId;
        existingEntity.DriverId = request.DriverId;
        existingEntity.RouteId = request.RouteId;
        existingEntity.AssignmentDate = request.AssignmentDate;
        existingEntity.EffectiveFrom = request.EffectiveFrom;
        existingEntity.EffectiveTo = request.EffectiveTo;
        existingEntity.PickupPoint = request.PickupPoint;
        existingEntity.DropPoint = request.DropPoint;
        existingEntity.PickupTime = request.PickupTime;
        existingEntity.DropTime = request.DropTime;
        existingEntity.MonthlyFee = request.MonthlyFee;
        existingEntity.ModifiedDate = DateTime.UtcNow;

        return await _repository.UpdateAsync(existingEntity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await _repository.DeleteAsync(id);
    }

    public async Task<IEnumerable<TransportAssignment>> GetByStudentAsync(Guid studentId)
    {
        return await _repository.GetByStudentAsync(studentId);
    }

    public async Task<IEnumerable<TransportAssignment>> GetByVehicleAsync(Guid vehicleId)
    {
        return await _repository.GetByVehicleAsync(vehicleId);
    }
}
