using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class ExpenseCategoryService : IExpenseCategoryService
{
    private readonly IExpenseCategoryRepository _repository;

    public ExpenseCategoryService(IExpenseCategoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<ExpenseCategoryResponse?> GetByIdAsync(Guid id)
    {
        var category = await _repository.GetByIdAsync(id);
        return category == null ? null : MapToResponse(category);
    }

    public async Task<IEnumerable<ExpenseCategoryResponse>> GetAllAsync()
    {
        var categories = await _repository.GetAllAsync();
        return categories.Select(MapToResponse);
    }

    public async Task<ExpenseCategoryResponse> CreateAsync(ExpenseCategoryRequest request)
    {
        var category = new ExpenseCategory
        {
            Id = Guid.NewGuid(),
            ExpenseCategoryName = request.ExpenseCategoryName,
            Description = request.Description,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.Empty, // Resolved in repository
            CreatedDate = DateTime.UtcNow,
            ModifiedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Expense category created successfully"
        };

        var created = await _repository.AddAsync(category);
        return MapToResponse(created);
    }

    public async Task<ExpenseCategoryResponse?> UpdateAsync(Guid id, ExpenseCategoryRequest request)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null || existing.IsDeleted)
        {
            return null;
        }

        existing.ExpenseCategoryName = request.ExpenseCategoryName ?? existing.ExpenseCategoryName;
        existing.Description = request.Description ?? existing.Description;
        existing.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existing.CompanyId;
        existing.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existing.SchoolId;
        existing.ModifiedDate = DateTime.UtcNow;
        existing.Status = "Updated";
        existing.StatusMessage = "Expense category updated successfully";

        var updated = await _repository.UpdateAsync(existing);
        return MapToResponse(updated);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null || existing.IsDeleted)
        {
            return false;
        }

        await _repository.DeleteAsync(id);
        return true;
    }

    private static ExpenseCategoryResponse MapToResponse(ExpenseCategory category)
    {
        return new ExpenseCategoryResponse
        {
            Id = category.Id,
            ExpenseCategoryName = category.ExpenseCategoryName,
            Description = category.Description,
            CompanyId = category.CompanyId,
            SchoolId = category.SchoolId,
            IsActive = category.IsActive,
            CreatedDate = category.CreatedDate,
            ModifiedDate = category.ModifiedDate,
            Status = category.Status,
            StatusMessage = category.StatusMessage
        };
    }
}
