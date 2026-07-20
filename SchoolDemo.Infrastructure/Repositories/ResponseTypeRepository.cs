using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class ResponseTypeRepository : IResponseTypeRepository
{
    private readonly SchoolDbContext _context;

    public ResponseTypeRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.ResponseType?> GetByIdAsync(Guid id)
    {
        var entity = await _context.ResponseTypes
            .Include(e => e.Company)
            .Include(e => e.School)
            .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.ResponseType>> GetAllAsync()
    {
        var entities = await _context.ResponseTypes
            .Include(e => e.Company)
            .Include(e => e.School)
            .Where(e => !e.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.ResponseType> AddAsync(SchoolDemo.Domain.Entities.ResponseType entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.ResponseTypes.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

public async Task<SchoolDemo.Domain.Entities.ResponseType> UpdateAsync(SchoolDemo.Domain.Entities.ResponseType entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.ResponseTypes.Local.FirstOrDefault(e => e.Id == infraEntity.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.ResponseTypes.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.ResponseTypes
            .FirstOrDefaultAsync(e => e.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.ResponseType? MapToDomainEntity(SchoolDemo.Infrastructure.Data.ResponseType? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.ResponseType
        {
            Id = entity.Id,
            ResponseTypeName = entity.ResponseTypeName,
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

    private static SchoolDemo.Infrastructure.Data.ResponseType MapToInfrastructureEntity(SchoolDemo.Domain.Entities.ResponseType entity)
    {
        return new SchoolDemo.Infrastructure.Data.ResponseType
        {
            Id = entity.Id,
            ResponseTypeName = entity.ResponseTypeName,
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
