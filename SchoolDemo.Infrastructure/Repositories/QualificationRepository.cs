using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class QualificationRepository : IQualificationRepository
{
    private readonly SchoolDbContext _context;

    public QualificationRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.QualificationMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.QualificationMasters
            .FirstOrDefaultAsync(q => q.Id == id && !q.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.QualificationMaster>> GetAllAsync()
    {
        var entities = await _context.QualificationMasters
            .Where(q => !q.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.QualificationMaster> AddAsync(SchoolDemo.Domain.Entities.QualificationMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.QualificationMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.QualificationMaster> UpdateAsync(SchoolDemo.Domain.Entities.QualificationMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.QualificationMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.QualificationMasters
            .FirstOrDefaultAsync(q => q.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.QualificationMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.QualificationMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.QualificationMaster
        {
            Id = entity.Id,
            QualificationName = entity.QualificationName,
            IsTeachingQualification = entity.IsTeachingQualification,
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

    private static SchoolDemo.Infrastructure.Data.QualificationMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.QualificationMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.QualificationMaster
        {
            Id = entity.Id,
            QualificationName = entity.QualificationName,
            IsTeachingQualification = entity.IsTeachingQualification,
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
}
