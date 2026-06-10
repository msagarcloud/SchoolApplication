using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

// Employee Document Repository
public interface IEmployeeDocumentRepository
{
    Task<EmployeeDocument?> GetByIdAsync(Guid id);
    Task<IEnumerable<EmployeeDocument>> GetAllAsync();
    Task<EmployeeDocument> AddAsync(EmployeeDocument employeeDocument);
    Task<EmployeeDocument> UpdateAsync(EmployeeDocument employeeDocument);
    Task DeleteAsync(Guid id);
}

// Employee Leave Repository
public interface IEmployeeLeaveRepository
{
    Task<EmployeeLeave?> GetByIdAsync(Guid id);
    Task<IEnumerable<EmployeeLeave>> GetAllAsync();
    Task<EmployeeLeave> AddAsync(EmployeeLeave employeeLeave);
    Task<EmployeeLeave> UpdateAsync(EmployeeLeave employeeLeave);
    Task DeleteAsync(Guid id);
}

// Employee Professional Qualification Repository
public interface IEmployeeProfessionalQualificationRepository
{
    Task<EmployeeProfessionalQualification?> GetByIdAsync(Guid id);
    Task<IEnumerable<EmployeeProfessionalQualification>> GetAllAsync();
    Task<EmployeeProfessionalQualification> AddAsync(EmployeeProfessionalQualification employeeProfessionalQualification);
    Task<EmployeeProfessionalQualification> UpdateAsync(EmployeeProfessionalQualification employeeProfessionalQualification);
    Task DeleteAsync(Guid id);
}

// Employee Salary Master Repository
public interface IEmployeeSalaryMasterRepository
{
    Task<EmployeeSalaryMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<EmployeeSalaryMaster>> GetAllAsync();
    Task<EmployeeSalaryMaster> AddAsync(EmployeeSalaryMaster employeeSalaryMaster);
    Task<EmployeeSalaryMaster> UpdateAsync(EmployeeSalaryMaster employeeSalaryMaster);
    Task DeleteAsync(Guid id);
}

// Employee Salary Detail Repository
public interface IEmployeeSalaryDetailRepository
{
    Task<EmployeeSalaryDetail?> GetByIdAsync(Guid id);
    Task<IEnumerable<EmployeeSalaryDetail>> GetAllAsync();
    Task<EmployeeSalaryDetail> AddAsync(EmployeeSalaryDetail employeeSalaryDetail);
    Task<EmployeeSalaryDetail> UpdateAsync(EmployeeSalaryDetail employeeSalaryDetail);
    Task DeleteAsync(Guid id);
}
