using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class AssesmentMasterRepository : IAssesmentMasterRepository
{
    private readonly SchoolDbContext _context;

    public AssesmentMasterRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.AssesmentMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.AssesmentMasters
            .FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.AssesmentMaster>> GetAllAsync()
    {
        var entities = await _context.AssesmentMasters
            .Where(a => !a.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.AssesmentMaster> AddAsync(SchoolDemo.Domain.Entities.AssesmentMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        infraEntity.CreatedBy = await ResolveUserAsync(entity.CreatedBy, entity.CompanyId, entity.SchoolId);
        if (entity.ModifiedBy.HasValue && entity.ModifiedBy.Value != Guid.Empty)
        {
            infraEntity.ModifiedBy = await ResolveUserAsync(entity.ModifiedBy.Value, entity.CompanyId, entity.SchoolId);
        }
        await _context.AssesmentMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.AssesmentMaster> UpdateAsync(SchoolDemo.Domain.Entities.AssesmentMaster entity)
    {
        var existing = await _context.AssesmentMasters.FindAsync(entity.Id);
        if (existing == null)
            throw new InvalidOperationException($"AssesmentMaster with id {entity.Id} not found.");

        existing.Name = entity.Name;
        existing.Description = entity.Description;
        existing.PercentageWeightage = entity.PercentageWeightage;
        existing.FromPeriod = entity.FromPeriod;
        existing.ToPeriod = entity.ToPeriod;
        existing.CompanyId = entity.CompanyId;
        existing.SchoolId = entity.SchoolId;
        existing.IsActive = entity.IsActive;
        existing.ModifiedDate = DateTime.UtcNow;
        existing.Status = entity.Status;
        existing.StatusMessage = entity.StatusMessage;
        existing.ModifiedBy = await ResolveUserAsync(
            entity.ModifiedBy ?? entity.CreatedBy,
            entity.CompanyId,
            entity.SchoolId);

        await _context.SaveChangesAsync();
        return MapToDomainEntity(existing)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.AssesmentMasters.FirstOrDefaultAsync(a => a.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.AssesmentMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.AssesmentMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.AssesmentMaster
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            PercentageWeightage = entity.PercentageWeightage,
            FromPeriod = entity.FromPeriod,
            ToPeriod = entity.ToPeriod,
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

    private static SchoolDemo.Infrastructure.Data.AssesmentMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.AssesmentMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.AssesmentMaster
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            PercentageWeightage = entity.PercentageWeightage,
            FromPeriod = entity.FromPeriod,
            ToPeriod = entity.ToPeriod,
            CompanyId = entity.CompanyId,
            SchoolId = entity.SchoolId,
            IsActive = entity.IsActive,
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status ?? "Active",
            StatusMessage = entity.StatusMessage
        };
    }

    private async Task<Guid> ResolveUserAsync(Guid requestedUserId, Guid companyId, Guid schoolId)
    {
        if (requestedUserId != Guid.Empty)
        {
            var exists = await _context.UserDetails
                .AsNoTracking()
                .AnyAsync(u => u.Id == requestedUserId && !u.IsDeleted);
            if (exists)
                return requestedUserId;
        }

        var query = _context.UserDetails
            .AsNoTracking()
            .Where(u => u.IsActive && !u.IsDeleted);

        if (schoolId != Guid.Empty)
            query = query.Where(u => u.SchoolId == schoolId);
        if (companyId != Guid.Empty)
            query = query.Where(u => u.CompanyId == companyId);

        var resolved = await query.Select(u => u.Id).FirstOrDefaultAsync();
        if (resolved != Guid.Empty)
            return resolved;

        var fallback = await _context.UserDetails
            .AsNoTracking()
            .Where(u => u.IsActive && !u.IsDeleted)
            .Select(u => u.Id)
            .FirstOrDefaultAsync();

        if (fallback == Guid.Empty)
            throw new InvalidOperationException("No valid user found. Please log in again.");

        return fallback;
    }
}
