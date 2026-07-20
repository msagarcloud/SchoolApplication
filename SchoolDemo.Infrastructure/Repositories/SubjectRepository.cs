using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class SubjectRepository : ISubjectRepository
{
    private readonly SchoolDbContext _context;

    public SubjectRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<Subject?> GetByIdAsync(Guid id)
    {
        var entity = await _context.SubjectMasters
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<Subject>> GetAllAsync()
    {
        var entities = await _context.SubjectMasters
            .Where(s => !s.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<Subject> AddAsync(Subject subject)
    {
        var entity = MapToInfrastructureEntity(subject);
        await _context.SubjectMasters.AddAsync(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

public async Task<Subject> UpdateAsync(Subject subject)
    {
        var entity = MapToInfrastructureEntity(subject);

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.SubjectMasters.Local.FirstOrDefault(e => e.Id == entity.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.SubjectMasters.Update(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.SubjectMasters
            .FirstOrDefaultAsync(s => s.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static Subject? MapToDomainEntity(SubjectMaster? entity)
    {
        if (entity == null) return null;
        return new Subject
        {
            Id = entity.Id,
            SubjectName = entity.SubjectName,
            CompanyId = entity.CompanyId,
            SchoolId = entity.SchoolId,
            IsScholastic = entity.IsScholastic,
            IsActive = entity.IsActive,
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage,
            PeriodsPerWeek = entity.PeriodsPerWeek
        };
    }

    private static SubjectMaster MapToInfrastructureEntity(Subject subject)
    {
        return new SubjectMaster
        {
            Id = subject.Id,
            SubjectName = subject.SubjectName,
            CompanyId = subject.CompanyId,
            SchoolId = subject.SchoolId,
            IsScholastic = subject.IsScholastic,
            IsActive = subject.IsActive,
            IsDeleted = subject.IsDeleted,
            CreatedBy = subject.CreatedBy,
            CreatedDate = subject.CreatedDate,
            ModifiedBy = subject.ModifiedBy,
            ModifiedDate = subject.ModifiedDate,
            Status = subject.Status ?? "INC",
            StatusMessage = subject.StatusMessage,
            PeriodsPerWeek = subject.PeriodsPerWeek
        };
    }
}
