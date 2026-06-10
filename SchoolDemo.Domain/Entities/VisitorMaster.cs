namespace SchoolDemo.Domain.Entities;

public class VisitorMaster
{
    public Guid Id { get; set; }
    public string? VehicleNumber { get; set; }
    public string? VehicleName { get; set; }
    public DateTime DateOfEntry { get; set; }
    public TimeOnly ArrivalTime { get; set; }
    public TimeOnly ExitTime { get; set; }
    public string? Purpose { get; set; }
    public string? ContactPerson { get; set; }
    public string? Address1 { get; set; }
    public string? Address2 { get; set; }
    public Guid CityId { get; set; }
    public Guid StateId { get; set; }
    public Guid CountryId { get; set; }
    public string? ZipCode { get; set; }
    public Guid? CompanyId { get; set; }
    public Guid? SchoolId { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid? ModifiedBy { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}
