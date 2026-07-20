using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class EmployeeDocumentRepository : IEmployeeDocumentRepository
{
    private readonly SchoolDbContext _context;

    public EmployeeDocumentRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<EmployeeDocument?> GetByIdAsync(Guid id)
    {
        var entity = await _context.EmpDocumentDetails
            .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<EmployeeDocument>> GetAllAsync()
    {
        var entities = await _context.EmpDocumentDetails
            .Where(e => !e.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<EmployeeDocument> AddAsync(EmployeeDocument employeeDocument)
    {
        var entity = MapToInfrastructureEntity(employeeDocument);
        await _context.EmpDocumentDetails.AddAsync(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task<EmployeeDocument> UpdateAsync(EmployeeDocument employeeDocument)
    {
        var entity = MapToInfrastructureEntity(employeeDocument);

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.EmpDocumentDetails.Local.FirstOrDefault(e => e.Id == entity.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.EmpDocumentDetails.Update(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.EmpDocumentDetails
            .FirstOrDefaultAsync(e => e.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static EmployeeDocument? MapToDomainEntity(EmpDocumentDetail? entity)
    {
        if (entity == null) return null;
        return new EmployeeDocument
        {
            Id = entity.Id,
            EmployeeId = entity.EmpoyeeId,
            DocumentName = entity.DocumentName,
            Description = entity.Description,
            FileName = entity.FileName,
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

    private static EmpDocumentDetail MapToInfrastructureEntity(EmployeeDocument employeeDocument)
    {
        return new EmpDocumentDetail
        {
            Id = employeeDocument.Id,
            EmpoyeeId = employeeDocument.EmployeeId,
            DocumentName = employeeDocument.DocumentName,
            Description = employeeDocument.Description,
            FileName = employeeDocument.FileName,
            CompanyId = employeeDocument.CompanyId,
            SchoolId = employeeDocument.SchoolId,
            IsActive = employeeDocument.IsActive,
            IsDeleted = employeeDocument.IsDeleted,
            CreatedBy = employeeDocument.CreatedBy,
            CreatedDate = employeeDocument.CreatedDate,
            ModifiedBy = employeeDocument.ModifiedBy,
            ModifiedDate = employeeDocument.ModifiedDate,
            Status = employeeDocument.Status,
            StatusMessage = employeeDocument.StatusMessage
        };
    }
}
