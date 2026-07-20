using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class GradeRepository : IGradeRepository
{
    private readonly SchoolDbContext _context;

    public GradeRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.GradeMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.GradeMasters
            .FirstOrDefaultAsync(g => g.Id == id && !g.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.GradeMaster>> GetAllAsync()
    {
        var entities = await _context.GradeMasters
            .Where(g => !g.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.GradeMaster> AddAsync(SchoolDemo.Domain.Entities.GradeMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.GradeMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.GradeMaster> UpdateAsync(SchoolDemo.Domain.Entities.GradeMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.GradeMasters.Local.FirstOrDefault(e => e.Id == infraEntity.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.GradeMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.GradeMasters
            .FirstOrDefaultAsync(g => g.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.GradeMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.GradeMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.GradeMaster
        {
            Id = entity.Id,
            GradeName = entity.GradeName,
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
            StatusMessage = entity.StatusMessage
        };
    }

    private static SchoolDemo.Infrastructure.Data.GradeMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.GradeMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.GradeMaster
        {
            Id = entity.Id,
            GradeName = entity.GradeName,
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
            StatusMessage = entity.StatusMessage
        };
    }
}
