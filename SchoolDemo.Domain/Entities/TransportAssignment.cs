namespace SchoolDemo.Domain.Entities;

public class TransportAssignment
{
    public Guid Id { get; set; }
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
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid? ModifiedBy { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }

    // Navigation properties
    public StudentMaster Student { get; set; } = null!;
    public VehicleMaster Vehicle { get; set; } = null!;
    public DriverMaster Driver { get; set; } = null!;
    public RouteMaster Route { get; set; } = null!;
}
