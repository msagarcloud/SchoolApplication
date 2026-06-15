using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SchoolDemo.Domain.Interfaces;

public interface IExpenseCategoryService
{
    Task<ExpenseCategoryResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<ExpenseCategoryResponse>> GetAllAsync();
    Task<ExpenseCategoryResponse> CreateAsync(ExpenseCategoryRequest request);
    Task<ExpenseCategoryResponse?> UpdateAsync(Guid id, ExpenseCategoryRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public class ExpenseCategoryRequest
{
    public string? ExpenseCategoryName { get; set; }
    public string? Description { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class ExpenseCategoryResponse
{
    public Guid Id { get; set; }
    public string? ExpenseCategoryName { get; set; }
    public string? Description { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}
