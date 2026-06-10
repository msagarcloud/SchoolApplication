using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface IDriverMasterService
{
    Task<IEnumerable<DriverMaster>> GetAllAsync();
    Task<DriverMaster?> GetByIdAsync(Guid id);
    Task<DriverMaster> CreateAsync(DriverMasterRequest request);
    Task<DriverMaster?> UpdateAsync(Guid id, DriverMasterRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public class DriverMasterRequest
{
    public string FirstName { get; set; } = string.Empty;
    public string? LastName { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string FathersName { get; set; } = string.Empty;
    public string MothersName { get; set; } = string.Empty;
    public string? Address1 { get; set; }
    public string? Address2 { get; set; }
    public Guid CityId { get; set; }
    public Guid StateId { get; set; }
    public Guid CountryId { get; set; }
    public string? ZipCode { get; set; }
    public string? MobileNumber { get; set; }
    public string? PhoneNumber { get; set; }
    public string? DriverImage { get; set; }
    public string? LicenceNumber { get; set; }
    public DateTime? LicenceIssueDate { get; set; }
    public DateTime? LicenceValidUptoDate { get; set; }
    public string? LicenceDescription { get; set; }
    public string? LicenceImage { get; set; }
    public string? LicenceType { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public Guid CreatedBy { get; set; }
    public Guid QualificationId { get; set; }
}
