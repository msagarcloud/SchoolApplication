using SchoolDemo.Domain.DTOs;

namespace SchoolDemo.Domain.Interfaces;

public interface IEmployeeSalaryStructureDetailService
{
    Task<EmployeeSalaryStructureDetailResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<EmployeeSalaryStructureDetailResponse>> GetAllAsync();
    Task<IEnumerable<EmployeeSalaryStructureDetailResponse>> GetByEmployeeIdAsync(Guid employeeId);
    Task<EmployeeSalaryStructureDetailResponse> CreateAsync(EmployeeSalaryStructureDetailRequest request);
    Task<EmployeeSalaryStructureDetailResponse?> UpdateAsync(Guid id, EmployeeSalaryStructureDetailRequest request);
    Task<bool> DeleteAsync(Guid id);
    Task<IEnumerable<EmployeeSalaryStructureDetailResponse>> CalculateSalaryComponentsAsync(decimal basicSalary, Guid employeeId, Guid designationGradeId, Guid sessionId);
}
