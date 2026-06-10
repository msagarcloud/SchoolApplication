using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface IEmployeeSalaryStructureDetailRepository
{
    Task<EmployeeSalaryStructureDetail?> GetByIdAsync(Guid id);
    Task<IEnumerable<EmployeeSalaryStructureDetail>> GetAllAsync();
    Task<IEnumerable<EmployeeSalaryStructureDetail>> GetByEmployeeIdAsync(Guid employeeId);
    Task<EmployeeSalaryStructureDetail> AddAsync(EmployeeSalaryStructureDetail employeeSalaryStructureDetail);
    Task<EmployeeSalaryStructureDetail> UpdateAsync(EmployeeSalaryStructureDetail employeeSalaryStructureDetail);
    Task DeleteAsync(Guid id);
}
