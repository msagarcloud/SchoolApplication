using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class EmployeeSalaryDetailRepository : IEmployeeSalaryDetailRepository
{
    private readonly SchoolDbContext _context;

    public EmployeeSalaryDetailRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<EmployeeSalaryDetail?> GetByIdAsync(Guid id)
    {
        var entity = await _context.EmpSalaryDetails
            .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<EmployeeSalaryDetail>> GetAllAsync()
    {
        var entities = await _context.EmpSalaryDetails
            .Where(e => !e.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<EmployeeSalaryDetail> AddAsync(EmployeeSalaryDetail employeeSalaryDetail)
    {
        var entity = MapToInfrastructureEntity(employeeSalaryDetail);
        await _context.EmpSalaryDetails.AddAsync(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task<EmployeeSalaryDetail> UpdateAsync(EmployeeSalaryDetail employeeSalaryDetail)
    {
        var entity = MapToInfrastructureEntity(employeeSalaryDetail);
        _context.EmpSalaryDetails.Update(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.EmpSalaryDetails
            .FirstOrDefaultAsync(e => e.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static EmployeeSalaryDetail? MapToDomainEntity(EmpSalaryDetail? entity)
    {
        if (entity == null) return null;
        return new EmployeeSalaryDetail
        {
            Id = entity.Id,
            EmployeeId = entity.EmployeeId,
            SalaryHeadMasterId = entity.SalaryHeadMasterId,
            DesignationGradeId = entity.DesignationGradeId,
            Value = entity.Value,
            SalaryTypeId = entity.SalaryTypeId,
            IdDeduction = entity.IdDeduction,
            SalaryCodeId = entity.SalaryCodeId,
            SalaryDescription = entity.SalaryDescription,
            Amount = entity.Amount,
            IsSalaryHead = entity.IsSalaryHead,
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

    private static EmpSalaryDetail MapToInfrastructureEntity(EmployeeSalaryDetail employeeSalaryDetail)
    {
        return new EmpSalaryDetail
        {
            Id = employeeSalaryDetail.Id,
            EmployeeId = employeeSalaryDetail.EmployeeId,
            SalaryHeadMasterId = employeeSalaryDetail.SalaryHeadMasterId,
            DesignationGradeId = employeeSalaryDetail.DesignationGradeId,
            Value = employeeSalaryDetail.Value,
            SalaryTypeId = employeeSalaryDetail.SalaryTypeId,
            IdDeduction = employeeSalaryDetail.IdDeduction,
            SalaryCodeId = employeeSalaryDetail.SalaryCodeId,
            SalaryDescription = employeeSalaryDetail.SalaryDescription,
            Amount = employeeSalaryDetail.Amount,
            IsSalaryHead = employeeSalaryDetail.IsSalaryHead,
            CompanyId = employeeSalaryDetail.CompanyId,
            SchoolId = employeeSalaryDetail.SchoolId,
            IsActive = employeeSalaryDetail.IsActive,
            IsDeleted = employeeSalaryDetail.IsDeleted,
            CreatedBy = employeeSalaryDetail.CreatedBy,
            CreatedDate = employeeSalaryDetail.CreatedDate,
            ModifiedBy = employeeSalaryDetail.ModifiedBy,
            ModifiedDate = employeeSalaryDetail.ModifiedDate,
            Status = employeeSalaryDetail.Status,
            StatusMessage = employeeSalaryDetail.StatusMessage
        };
    }
}
