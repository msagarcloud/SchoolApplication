using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class EmployeeLeaveRepository : IEmployeeLeaveRepository
{
    private readonly SchoolDbContext _context;

    public EmployeeLeaveRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<EmployeeLeave?> GetByIdAsync(Guid id)
    {
        var entity = await _context.EmpLeaveDetails
            .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<EmployeeLeave>> GetAllAsync()
    {
        var entities = await _context.EmpLeaveDetails
            .Where(e => !e.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<EmployeeLeave> AddAsync(EmployeeLeave employeeLeave)
    {
        var entity = MapToInfrastructureEntity(employeeLeave);
        await _context.EmpLeaveDetails.AddAsync(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task<EmployeeLeave> UpdateAsync(EmployeeLeave employeeLeave)
    {
        var entity = MapToInfrastructureEntity(employeeLeave);

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.EmpLeaveDetails.Local.FirstOrDefault(e => e.Id == entity.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.EmpLeaveDetails.Update(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.EmpLeaveDetails
            .FirstOrDefaultAsync(e => e.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static EmployeeLeave? MapToDomainEntity(EmpLeaveDetail? entity)
    {
        if (entity == null) return null;
        return new EmployeeLeave
        {
            Id = entity.Id,
            EmployeeId = entity.EmployeeId,
            CategoryId = entity.CategoryId,
            LeaveTypeId = entity.LeaveTypeId,
            TotalLeaves = entity.TotalLeaves,
            PreviousYearBalance = entity.PreviousYearBalance,
            CurrentBalance = entity.CurrentBalance,
            SessionId = entity.SessionId,
            CompanyId = entity.CompanyId,
            SchoolId = entity.SchoolId,
            IsActive = entity.IsActive,
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage
        };
    }

    private static EmpLeaveDetail MapToInfrastructureEntity(EmployeeLeave employeeLeave)
    {
        return new EmpLeaveDetail
        {
            Id = employeeLeave.Id,
            EmployeeId = employeeLeave.EmployeeId,
            CategoryId = employeeLeave.CategoryId,
            LeaveTypeId = employeeLeave.LeaveTypeId,
            TotalLeaves = employeeLeave.TotalLeaves,
            PreviousYearBalance = employeeLeave.PreviousYearBalance,
            CurrentBalance = employeeLeave.CurrentBalance,
            SessionId = employeeLeave.SessionId,
            CompanyId = employeeLeave.CompanyId,
            SchoolId = employeeLeave.SchoolId,
            IsActive = employeeLeave.IsActive,
            IsDeleted = employeeLeave.IsDeleted,
            CreatedBy = employeeLeave.CreatedBy,
            CreatedDate = employeeLeave.CreatedDate,
            ModifiedBy = employeeLeave.ModifiedBy,
            ModifiedDate = employeeLeave.ModifiedDate,
            Status = employeeLeave.Status,
            StatusMessage = employeeLeave.StatusMessage
        };
    }
}
