using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface IExpenseCategoryRepository
{
    Task<ExpenseCategory?> GetByIdAsync(Guid id);
    Task<IEnumerable<ExpenseCategory>> GetAllAsync();
    Task<ExpenseCategory> AddAsync(ExpenseCategory entity);
    Task<ExpenseCategory> UpdateAsync(ExpenseCategory entity);
    Task DeleteAsync(Guid id);
}
