using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class EmployeeSalaryStructureDetailRepository : IEmployeeSalaryStructureDetailRepository
{
    private readonly SchoolDbContext _context;

    public EmployeeSalaryStructureDetailRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<EmployeeSalaryStructureDetail?> GetByIdAsync(Guid id)
    {
        var entity = await _context.EmpSalaryStructureDetails
            .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<EmployeeSalaryStructureDetail>> GetAllAsync()
    {
        var entities = await _context.EmpSalaryStructureDetails
            .Where(e => !e.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<IEnumerable<EmployeeSalaryStructureDetail>> GetByEmployeeIdAsync(Guid employeeId)
    {
        var entities = await _context.EmpSalaryStructureDetails
            .Where(e => e.EmployeeId == employeeId && !e.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<EmployeeSalaryStructureDetail> AddAsync(EmployeeSalaryStructureDetail employeeSalaryStructureDetail)
    {
        var entity = MapToInfrastructureEntity(employeeSalaryStructureDetail);
        await _context.EmpSalaryStructureDetails.AddAsync(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

public async Task<EmployeeSalaryStructureDetail> UpdateAsync(EmployeeSalaryStructureDetail employeeSalaryStructureDetail)
    {
        var entity = MapToInfrastructureEntity(employeeSalaryStructureDetail);

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.EmpSalaryStructureDetails.Local.FirstOrDefault(e => e.Id == entity.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.EmpSalaryStructureDetails.Update(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.EmpSalaryStructureDetails
            .FirstOrDefaultAsync(e => e.Id == id);
        
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static EmployeeSalaryStructureDetail? MapToDomainEntity(EmpSalaryStructureDetail? entity)
    {
        if (entity == null) return null;

        return new EmployeeSalaryStructureDetail
        {
            Id = entity.Id,
            EmployeeId = entity.EmployeeId,
            DesignationGradeId = entity.DesignationGradeId,
            Session = entity.Session,
            Value = entity.Value,
            SalaryTypeId = entity.SalaryTypeId,
            IsDeductance = entity.IsDeductance,
            SalaryCodeId = entity.SalaryCodeId,
            Description = entity.Description,
            CompanyId = entity.CompanyId,
            SchoolId = entity.SchoolId,
            IsActive = entity.IsActive,
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage,
            // Additional properties for salary calculation
            Name = null, // These are not stored in database but calculated
            Percentage = 0,
            IsFixed = false,
            Type = null
        };
    }

    private static EmpSalaryStructureDetail MapToInfrastructureEntity(EmployeeSalaryStructureDetail domainEntity)
    {
        return new EmpSalaryStructureDetail
        {
            Id = domainEntity.Id,
            EmployeeId = domainEntity.EmployeeId,
            DesignationGradeId = domainEntity.DesignationGradeId,
            Session = domainEntity.Session,
            Value = domainEntity.Value,
            SalaryTypeId = domainEntity.SalaryTypeId,
            IsDeductance = domainEntity.IsDeductance,
            SalaryCodeId = domainEntity.SalaryCodeId,
            Description = domainEntity.Description,
            CompanyId = domainEntity.CompanyId,
            SchoolId = domainEntity.SchoolId,
            IsActive = domainEntity.IsActive,
            IsDeleted = domainEntity.IsDeleted,
            CreatedBy = domainEntity.CreatedBy,
            CreatedDate = domainEntity.CreatedDate,
            ModifiedBy = domainEntity.ModifiedBy,
            ModifiedDate = domainEntity.ModifiedDate,
            Status = domainEntity.Status,
            StatusMessage = domainEntity.StatusMessage
            // Note: Name, Percentage, IsFixed, Type are not stored in database
            // They are used for calculation purposes only in the domain layer
        };
    }
}
