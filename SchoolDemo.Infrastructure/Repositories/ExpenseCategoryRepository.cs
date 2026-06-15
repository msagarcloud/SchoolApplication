using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class ExpenseCategoryRepository : IExpenseCategoryRepository
{
    private readonly SchoolDbContext _context;

    public ExpenseCategoryRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<ExpenseCategory?> GetByIdAsync(Guid id)
    {
        var categoryDetail = await _context.ExpenseCategoryMasters
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);

        return MapToDomainEntity(categoryDetail);
    }

    public async Task<IEnumerable<ExpenseCategory>> GetAllAsync()
    {
        var categoryDetails = await _context.ExpenseCategoryMasters
            .Where(c => !c.IsDeleted)
            .ToListAsync();

        return categoryDetails.Select(MapToDomainEntity).Where(c => c != null)!;
    }

    public async Task<ExpenseCategory> AddAsync(ExpenseCategory entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);

        infraEntity.CreatedBy = await ResolveUserAsync(entity.CreatedBy, entity.CompanyId, entity.SchoolId);
        infraEntity.ModifiedBy = infraEntity.CreatedBy;
        infraEntity.CreatedDate = DateTime.UtcNow;
        infraEntity.ModifiedDate = DateTime.UtcNow;

        await _context.ExpenseCategoryMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();

        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<ExpenseCategory> UpdateAsync(ExpenseCategory entity)
    {
        var existing = await _context.ExpenseCategoryMasters.FindAsync(entity.Id);
        if (existing == null)
        {
            throw new InvalidOperationException($"ExpenseCategoryMaster with id {entity.Id} not found.");
        }

        existing.ExpenseCategoryName = entity.ExpenseCategoryName;
        existing.Description = entity.Description;
        existing.CompanyId = entity.CompanyId;
        existing.SchoolId = entity.SchoolId;
        existing.IsActive = entity.IsActive;
        existing.ModifiedDate = DateTime.UtcNow;
        existing.Status = entity.Status ?? "Updated";
        existing.StatusMessage = entity.StatusMessage;

        existing.ModifiedBy = await ResolveUserAsync(
            entity.ModifiedBy ?? entity.CreatedBy,
            entity.CompanyId,
            entity.SchoolId);

        await _context.SaveChangesAsync();
        return MapToDomainEntity(existing)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var categoryDetail = await _context.ExpenseCategoryMasters
            .FirstOrDefaultAsync(c => c.Id == id);

        if (categoryDetail != null)
        {
            categoryDetail.IsDeleted = true;
            categoryDetail.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static ExpenseCategory? MapToDomainEntity(ExpenseCategoryMaster? infra)
    {
        if (infra == null) return null;

        return new ExpenseCategory
        {
            Id = infra.Id,
            ExpenseCategoryName = infra.ExpenseCategoryName,
            Description = infra.Description,
            CompanyId = infra.CompanyId,
            SchoolId = infra.SchoolId,
            IsActive = infra.IsActive,
            IsDeleted = infra.IsDeleted,
            CreatedBy = infra.CreatedBy,
            CreatedDate = infra.CreatedDate,
            ModifiedBy = infra.ModifiedBy,
            ModifiedDate = infra.ModifiedDate,
            Status = infra.Status,
            StatusMessage = infra.StatusMessage
        };
    }

    private static ExpenseCategoryMaster MapToInfrastructureEntity(ExpenseCategory domain)
    {
        return new ExpenseCategoryMaster
        {
            Id = domain.Id,
            ExpenseCategoryName = domain.ExpenseCategoryName,
            Description = domain.Description,
            CompanyId = domain.CompanyId,
            SchoolId = domain.SchoolId,
            IsActive = domain.IsActive,
            IsDeleted = domain.IsDeleted,
            CreatedBy = domain.CreatedBy,
            CreatedDate = domain.CreatedDate,
            ModifiedBy = domain.ModifiedBy,
            ModifiedDate = domain.ModifiedDate,
            Status = domain.Status ?? "Active",
            StatusMessage = domain.StatusMessage
        };
    }

    private async Task<Guid> ResolveUserAsync(Guid requestedUserId, Guid companyId, Guid schoolId)
    {
        if (requestedUserId != Guid.Empty)
        {
            var exists = await _context.UserDetails
                .AsNoTracking()
                .AnyAsync(u => u.Id == requestedUserId && !u.IsDeleted);
            if (exists)
                return requestedUserId;
        }

        var query = _context.UserDetails
            .AsNoTracking()
            .Where(u => u.IsActive && !u.IsDeleted);

        if (schoolId != Guid.Empty)
            query = query.Where(u => u.SchoolId == schoolId);
        if (companyId != Guid.Empty)
            query = query.Where(u => u.CompanyId == companyId);

        var resolved = await query.Select(u => u.Id).FirstOrDefaultAsync();
        if (resolved != Guid.Empty)
            return resolved;

        var fallback = await _context.UserDetails
            .AsNoTracking()
            .Where(u => u.IsActive && !u.IsDeleted)
            .Select(u => u.Id)
            .FirstOrDefaultAsync();

        if (fallback == Guid.Empty)
            throw new InvalidOperationException("No valid user found. Please log in again.");

        return fallback;
    }
}
