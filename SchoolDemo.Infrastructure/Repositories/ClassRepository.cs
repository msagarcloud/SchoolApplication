using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class ClassRepository : IClassRepository
{
    private readonly SchoolDbContext _context;

    public ClassRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<Class?> GetByIdAsync(Guid id)
    {
        var entity = await _context.ClassMasters
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<Class>> GetAllAsync()
    {
        var entities = await _context.ClassMasters
            .Where(c => !c.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<IEnumerable<Class>> GetBySchoolIdAsync(Guid schoolId)
    {
        var entities = await _context.ClassMasters
            .Where(c => !c.IsDeleted && c.SchoolId == schoolId)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<Class> AddAsync(Class @class)
    {
        var entity = MapToInfrastructureEntity(@class);
        await _context.ClassMasters.AddAsync(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task<Class> UpdateAsync(Class @class)
    {
        var entity = MapToInfrastructureEntity(@class);

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.ClassMasters.Local.FirstOrDefault(e => e.Id == entity.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.ClassMasters.Update(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.ClassMasters
            .FirstOrDefaultAsync(c => c.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static Class? MapToDomainEntity(ClassMaster? entity)
    {
        if (entity == null) return null;
        return new Class
        {
            Id = entity.Id,
            Name = entity.Name,
            ExamAssessment = entity.ExamAssessment,
            IsGradePointApplicable = entity.IsGradePointApplicable,
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

    private static ClassMaster MapToInfrastructureEntity(Class @class)
    {
        return new ClassMaster
        {
            Id = @class.Id,
            Name = @class.Name,
            ExamAssessment = @class.ExamAssessment,
            IsGradePointApplicable = @class.IsGradePointApplicable,
            CompanyId = @class.CompanyId,
            SchoolId = @class.SchoolId,
            IsActive = @class.IsActive,
            IsDeleted = @class.IsDeleted,
            CreatedBy = @class.CreatedBy,
            CreatedDate = @class.CreatedDate,
            ModifiedBy = @class.ModifiedBy,
            ModifiedDate = @class.ModifiedDate,
            Status = @class.Status,
            StatusMessage = @class.StatusMessage
        };
    }
}
