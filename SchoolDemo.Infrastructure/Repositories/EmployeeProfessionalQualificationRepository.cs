using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class EmployeeProfessionalQualificationRepository : IEmployeeProfessionalQualificationRepository
{
    private readonly SchoolDbContext _context;

    public EmployeeProfessionalQualificationRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<EmployeeProfessionalQualification?> GetByIdAsync(Guid id)
    {
        var entity = await _context.EmpProfQualiDetails
            .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<EmployeeProfessionalQualification>> GetAllAsync()
    {
        var entities = await _context.EmpProfQualiDetails
            .Where(e => !e.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<EmployeeProfessionalQualification> AddAsync(EmployeeProfessionalQualification employeeProfessionalQualification)
    {
        var entity = MapToInfrastructureEntity(employeeProfessionalQualification);
        await _context.EmpProfQualiDetails.AddAsync(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task<EmployeeProfessionalQualification> UpdateAsync(EmployeeProfessionalQualification employeeProfessionalQualification)
    {
        var entity = MapToInfrastructureEntity(employeeProfessionalQualification);

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.EmpProfQualiDetails.Local.FirstOrDefault(e => e.Id == entity.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.EmpProfQualiDetails.Update(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.EmpProfQualiDetails
            .FirstOrDefaultAsync(e => e.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static EmployeeProfessionalQualification? MapToDomainEntity(EmpProfQualiDetail? entity)
    {
        if (entity == null) return null;
        return new EmployeeProfessionalQualification
        {
            Id = entity.Id,
            EmployeeId = entity.EmployeeId,
            QualificationId = entity.QualificationId,
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

    private static EmpProfQualiDetail MapToInfrastructureEntity(EmployeeProfessionalQualification employeeProfessionalQualification)
    {
        return new EmpProfQualiDetail
        {
            Id = employeeProfessionalQualification.Id,
            EmployeeId = employeeProfessionalQualification.EmployeeId,
            QualificationId = employeeProfessionalQualification.QualificationId,
            CompanyId = employeeProfessionalQualification.CompanyId,
            SchoolId = employeeProfessionalQualification.SchoolId,
            IsActive = employeeProfessionalQualification.IsActive,
            IsDeleted = employeeProfessionalQualification.IsDeleted,
            CreatedBy = employeeProfessionalQualification.CreatedBy,
            CreatedDate = employeeProfessionalQualification.CreatedDate,
            ModifiedBy = employeeProfessionalQualification.ModifiedBy,
            ModifiedDate = employeeProfessionalQualification.ModifiedDate,
            Status = employeeProfessionalQualification.Status,
            StatusMessage = employeeProfessionalQualification.StatusMessage
        };
    }
}
