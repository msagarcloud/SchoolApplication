namespace SchoolDemo.Domain.Interfaces;

public interface IEmployeeService
{
    Task<EmployeeResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<EmployeeResponse>> GetAllAsync();
    Task<EmployeeResponse> CreateAsync(EmployeeRequest request);
    Task<EmployeeResponse?> UpdateAsync(Guid id, EmployeeRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public class EmployeeRequest
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public DateTime Dob { get; set; }
    public DateTime Doj { get; set; }
    public DateTime? ProbationStartDate { get; set; }
    public int? ProbationPeriod { get; set; }
    public DateTime? ConfirmationDate { get; set; }
    public string? Pannumber { get; set; }
    public string? Esicnumber { get; set; }
    public string? Pfnumeber { get; set; }
    public string? CurrentAddress1 { get; set; }
    public string? CurrentAddress2 { get; set; }
    public Guid? CurrentCityId { get; set; }
    public Guid? CurrentStateId { get; set; }
    public Guid? CurrentCountryId { get; set; }
    public string? CurrentZipCode { get; set; }
    public string? PermanentAddress1 { get; set; }
    public string? PermanentAddress2 { get; set; }
    public Guid? PermanentCityId { get; set; }
    public Guid? PermanentStateId { get; set; }
    public Guid? PermanentCountryId { get; set; }
    public string? PermanentZipCode { get; set; }
    public string? PhoneNumber { get; set; }
    public string? MobileNumber { get; set; }
    public string? EmailId { get; set; }
    public Guid? DepartmentId { get; set; }
    public Guid? DesignationId { get; set; }
    public Guid? PaymentModeId { get; set; }
    public Guid? EmployeeTypeId { get; set; }
    public Guid? CategoryId { get; set; }
    public string? BankAccountNumber { get; set; }
    public string? BankName { get; set; }
    public Guid? GenderId { get; set; }
    public Guid? BloodGroupId { get; set; }
    public Guid? GradeId { get; set; }
    public string? Image { get; set; }
    public Guid? EmployeeOldId { get; set; }
    public string? EmployeeCode { get; set; }
    public string? FathersName { get; set; }
    public string? MothersName { get; set; }
    public string? Description { get; set; }
    public string? LicenceNumber { get; set; }
    public DateTime? LicenceIssueDate { get; set; }
    public DateTime? LicenceValidUpto { get; set; }
    public string? LicenceDescription { get; set; }
    public string? LicenceImage { get; set; }
    public string? LicenceType { get; set; }
    public string? Salutation { get; set; }
    public DateTime? DateOfLeaving { get; set; }
    public string? MaritalStatus { get; set; }
    public string? YearsOfExperience { get; set; }
    public string? PrevioudSchoolCompany { get; set; }
    public string? AadhaarNumber { get; set; }
    public int? MathUpToClass { get; set; }
    public int? EnglishUptoClass { get; set; }
    public int? SstuptoClass { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class EmployeeResponse
{
    public Guid Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public DateTime Dob { get; set; }
    public DateTime Doj { get; set; }
    public DateTime? ProbationStartDate { get; set; }
    public int? ProbationPeriod { get; set; }
    public DateTime? ConfirmationDate { get; set; }
    public string? Pannumber { get; set; }
    public string? Esicnumber { get; set; }
    public string? Pfnumeber { get; set; }
    public string? CurrentAddress1 { get; set; }
    public string? CurrentAddress2 { get; set; }
    public Guid? CurrentCityId { get; set; }
    public Guid? CurrentStateId { get; set; }
    public Guid? CurrentCountryId { get; set; }
    public string? CurrentZipCode { get; set; }
    public string? PermanentAddress1 { get; set; }
    public string? PermanentAddress2 { get; set; }
    public Guid? PermanentCityId { get; set; }
    public Guid? PermanentStateId { get; set; }
    public Guid? PermanentCountryId { get; set; }
    public string? PermanentZipCode { get; set; }
    public string? PhoneNumber { get; set; }
    public string? MobileNumber { get; set; }
    public string? EmailId { get; set; }
    public Guid? DepartmentId { get; set; }
    public Guid? DesignationId { get; set; }
    public Guid? PaymentModeId { get; set; }
    public Guid? EmployeeTypeId { get; set; }
    public Guid? CategoryId { get; set; }
    public string? BankAccountNumber { get; set; }
    public string? BankName { get; set; }
    public Guid? GenderId { get; set; }
    public Guid? BloodGroupId { get; set; }
    public Guid? GradeId { get; set; }
    public string? Image { get; set; }
    public Guid? EmployeeOldId { get; set; }
    public string? EmployeeCode { get; set; }
    public string? FathersName { get; set; }
    public string? MothersName { get; set; }
    public string? Description { get; set; }
    public string? LicenceNumber { get; set; }
    public DateTime? LicenceIssueDate { get; set; }
    public DateTime? LicenceValidUpto { get; set; }
    public string? LicenceDescription { get; set; }
    public string? LicenceImage { get; set; }
    public string? LicenceType { get; set; }
    public string? Salutation { get; set; }
    public DateTime? DateOfLeaving { get; set; }
    public string? MaritalStatus { get; set; }
    public string? YearsOfExperience { get; set; }
    public string? PrevioudSchoolCompany { get; set; }
    public string? AadhaarNumber { get; set; }
    public int? MathUpToClass { get; set; }
    public int? EnglishUptoClass { get; set; }
    public int? SstuptoClass { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
    public string? CategoryName { get; set; }
    public string? DesignationName { get; set; }
}
