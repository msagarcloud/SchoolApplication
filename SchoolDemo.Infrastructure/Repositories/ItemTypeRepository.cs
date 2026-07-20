using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;
using DomainItemType = SchoolDemo.Domain.Entities.ItemTypeMaster;
using InfraItemType = SchoolDemo.Infrastructure.Data.ItemTypeMaster;

namespace SchoolDemo.Infrastructure.Repositories;

public class ItemTypeRepository : IItemTypeRepository
{
    private readonly SchoolDbContext _context;

    public ItemTypeRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<DomainItemType?> GetByIdAsync(Guid id)
    {
        var detail = await _context.ItemTypeMasters.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);
        return detail == null ? null : MapToDomain(detail);
    }

    public async Task<IEnumerable<DomainItemType>> GetAllAsync()
    {
        var list = await _context.ItemTypeMasters.Where(x => x.IsDeleted != true).ToListAsync();
        return list.Select(MapToDomain);
    }

    public async Task<DomainItemType> AddAsync(DomainItemType entity)
    {
        var infra = MapToInfra(entity);
        await _context.ItemTypeMasters.AddAsync(infra);
        await _context.SaveChangesAsync();
        return MapToDomain(infra);
    }

    public async Task<DomainItemType> UpdateAsync(DomainItemType entity)
    {
        var infra = MapToInfra(entity);

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.ItemTypeMasters.Local.FirstOrDefault(e => e.Id == infra.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.ItemTypeMasters.Update(infra);
        await _context.SaveChangesAsync();
        return MapToDomain(infra);
    }

    public async Task DeleteAsync(Guid id)
    {
        var existing = await _context.ItemTypeMasters.FirstOrDefaultAsync(x => x.Id == id);
        if (existing != null)
        {
            existing.IsDeleted = true;
            existing.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static DomainItemType MapToDomain(InfraItemType src)
    {
        return new DomainItemType
        {
            Id = src.Id,
            Name = src.Name,
            Description = src.Description,
            IsActive = src.IsActive,
            CompanyId = src.CompanyId,
            SchoolId = src.SchoolId,
            CreatedBy = src.CreatedBy,
            CreatedDate = src.CreatedDate,
            ModifiedBy = src.ModifiedBy,
            ModifiedDate = src.ModifiedDate,
            IsDeleted = src.IsDeleted,
            Status = src.Status,
            StatusMessage = src.StatusMessage
        };
    }

    private static InfraItemType MapToInfra(DomainItemType src)
    {
        return new InfraItemType
        {
            Id = src.Id == Guid.Empty ? Guid.NewGuid() : src.Id,
            Name = src.Name,
            Description = src.Description,
            IsActive = src.IsActive ?? true,
            CompanyId = src.CompanyId,
            SchoolId = src.SchoolId,
            CreatedBy = src.CreatedBy,
            CreatedDate = src.CreatedDate == default ? DateTime.UtcNow : src.CreatedDate,
            ModifiedBy = src.ModifiedBy ?? Guid.Empty,
            ModifiedDate = src.ModifiedDate ?? DateTime.UtcNow,
            IsDeleted = src.IsDeleted ?? false,
            Status = src.Status,
            StatusMessage = src.StatusMessage
        };
    }
}
