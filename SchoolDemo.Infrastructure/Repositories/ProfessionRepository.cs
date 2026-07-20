using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class ProfessionRepository : IProfessionRepository
{
    private readonly SchoolDbContext _context;

    public ProfessionRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.ProfessionMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.ProfessionMasters
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.ProfessionMaster>> GetAllAsync()
    {
        var entities = await _context.ProfessionMasters
            .Where(p => !p.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.ProfessionMaster> AddAsync(SchoolDemo.Domain.Entities.ProfessionMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.ProfessionMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

public async Task<SchoolDemo.Domain.Entities.ProfessionMaster> UpdateAsync(SchoolDemo.Domain.Entities.ProfessionMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.ProfessionMasters.Local.FirstOrDefault(e => e.Id == infraEntity.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.ProfessionMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.ProfessionMasters
            .FirstOrDefaultAsync(p => p.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.ProfessionMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.ProfessionMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.ProfessionMaster
        {
            Id = entity.Id,
            Name = entity.Name,
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

    private static SchoolDemo.Infrastructure.Data.ProfessionMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.ProfessionMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.ProfessionMaster
        {
            Id = entity.Id,
            Name = entity.Name,
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
