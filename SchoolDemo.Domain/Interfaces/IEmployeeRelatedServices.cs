namespace SchoolDemo.Domain.Interfaces;

// Employee Document Service
public interface IEmployeeDocumentService
{
    Task<EmployeeDocumentResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<EmployeeDocumentResponse>> GetAllAsync();
    Task<EmployeeDocumentResponse> CreateAsync(EmployeeDocumentRequest request);
    Task<EmployeeDocumentResponse?> UpdateAsync(Guid id, EmployeeDocumentRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Employee Leave Service
public interface IEmployeeLeaveService
{
    Task<EmployeeLeaveResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<EmployeeLeaveResponse>> GetAllAsync();
    Task<EmployeeLeaveResponse> CreateAsync(EmployeeLeaveRequest request);
    Task<EmployeeLeaveResponse?> UpdateAsync(Guid id, EmployeeLeaveRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Employee Professional Qualification Service
public interface IEmployeeProfessionalQualificationService
{
    Task<EmployeeProfessionalQualificationResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<EmployeeProfessionalQualificationResponse>> GetAllAsync();
    Task<EmployeeProfessionalQualificationResponse> CreateAsync(EmployeeProfessionalQualificationRequest request);
    Task<EmployeeProfessionalQualificationResponse?> UpdateAsync(Guid id, EmployeeProfessionalQualificationRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Employee Salary Master Service
public interface IEmployeeSalaryMasterService
{
    Task<EmployeeSalaryMasterResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<EmployeeSalaryMasterResponse>> GetAllAsync();
    Task<EmployeeSalaryMasterResponse?> GetByEmployeeIdAsync(Guid employeeId);
    Task<EmployeeSalaryMasterResponse> CreateAsync(EmployeeSalaryMasterRequest request);
    Task<EmployeeSalaryMasterResponse?> UpdateAsync(Guid id, EmployeeSalaryMasterRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Employee Salary Detail Service
public interface IEmployeeSalaryDetailService
{
    Task<EmployeeSalaryDetailResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<EmployeeSalaryDetailResponse>> GetAllAsync();
    Task<EmployeeSalaryDetailResponse> CreateAsync(EmployeeSalaryDetailRequest request);
    Task<EmployeeSalaryDetailResponse?> UpdateAsync(Guid id, EmployeeSalaryDetailRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Request DTOs
public class EmployeeDocumentRequest
{
    public Guid EmployeeId { get; set; }
    public string? DocumentName { get; set; }
    public string? Description { get; set; }
    public string? FileName { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class EmployeeLeaveRequest
{
    public Guid EmployeeId { get; set; }
    public Guid CategoryId { get; set; }
    public Guid LeaveTypeId { get; set; }
    public decimal? TotalLeaves { get; set; }
    public decimal? PreviousYearBalance { get; set; }
    public decimal? CurrentBalance { get; set; }
    public Guid SessionId { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class EmployeeProfessionalQualificationRequest
{
    public Guid EmployeeId { get; set; }
    public Guid QualificationId { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class EmployeeSalaryMasterRequest
{
    public Guid EmployeeId { get; set; }
    public int Month { get; set; }
    public int Year { get; set; }
    public Guid SessionId { get; set; }
    public DateTime BatchPrintDate { get; set; }
    public decimal? BasicSalary { get; set; }
    public decimal? Allowance { get; set; }
    public decimal? Deductions { get; set; }
    public decimal? NetSalary { get; set; }
    public int TotalWorkingDays { get; set; }
    public decimal? PresentDays { get; set; }
    public decimal? AbsentDays { get; set; }
    public decimal? LeaveDays { get; set; }
    public string? LeaveDescription { get; set; }
    public string? LeaveBalanceDescription { get; set; }
    public decimal? SalaryPerDay { get; set; }
    public Guid DepartmentId { get; set; }
    public Guid DesignationId { get; set; }
    public Guid GradeId { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class EmployeeSalaryDetailRequest
{
    public Guid EmployeeId { get; set; }
    public Guid SalaryHeadMasterId { get; set; }
    public Guid DesignationGradeId { get; set; }
    public decimal? Value { get; set; }
    public Guid SalaryTypeId { get; set; }
    public bool IdDeduction { get; set; }
    public Guid SalaryCodeId { get; set; }
    public string? SalaryDescription { get; set; }
    public decimal? Amount { get; set; }
    public bool IsSalaryHead { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

// Response DTOs
public class EmployeeDocumentResponse
{
    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public string? DocumentName { get; set; }
    public string? Description { get; set; }
    public string? FileName { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class EmployeeLeaveResponse
{
    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public Guid CategoryId { get; set; }
    public Guid LeaveTypeId { get; set; }
    public decimal? TotalLeaves { get; set; }
    public decimal? PreviousYearBalance { get; set; }
    public decimal? CurrentBalance { get; set; }
    public Guid SessionId { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class EmployeeProfessionalQualificationResponse
{
    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public Guid QualificationId { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class EmployeeSalaryMasterResponse
{
    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public int Month { get; set; }
    public int Year { get; set; }
    public Guid SessionId { get; set; }
    public DateTime BatchPrintDate { get; set; }
    public decimal? BasicSalary { get; set; }
    public decimal? Allowance { get; set; }
    public decimal? Deductions { get; set; }
    public decimal? NetSalary { get; set; }
    public int TotalWorkingDays { get; set; }
    public decimal? PresentDays { get; set; }
    public decimal? AbsentDays { get; set; }
    public decimal? LeaveDays { get; set; }
    public string? LeaveDescription { get; set; }
    public string? LeaveBalanceDescription { get; set; }
    public decimal? SalaryPerDay { get; set; }
    public Guid DepartmentId { get; set; }
    public Guid DesignationId { get; set; }
    public Guid GradeId { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class EmployeeSalaryDetailResponse
{
    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public Guid SalaryHeadMasterId { get; set; }
    public Guid DesignationGradeId { get; set; }
    public decimal? Value { get; set; }
    public Guid SalaryTypeId { get; set; }
    public bool IdDeduction { get; set; }
    public Guid SalaryCodeId { get; set; }
    public string? SalaryDescription { get; set; }
    public decimal? Amount { get; set; }
    public bool IsSalaryHead { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}
