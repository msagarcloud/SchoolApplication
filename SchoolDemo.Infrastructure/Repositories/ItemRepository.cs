using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;
using DomainItem = SchoolDemo.Domain.Entities.ItemMaster;
using InfraItem = SchoolDemo.Infrastructure.Data.ItemMaster;

namespace SchoolDemo.Infrastructure.Repositories;

public class ItemRepository : IItemRepository
{
    private readonly SchoolDbContext _context;

    public ItemRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<DomainItem?> GetByIdAsync(Guid id)
    {
        var detail = await _context.ItemMasters.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);
        return detail == null ? null : MapToDomain(detail);
    }

    public async Task<IEnumerable<DomainItem>> GetAllAsync()
    {
        var list = await _context.ItemMasters.Where(x => x.IsDeleted != true).ToListAsync();
        return list.Select(MapToDomain);
    }

    public async Task<DomainItem> AddAsync(DomainItem entity)
    {
        var infra = MapToInfra(entity);
        await _context.ItemMasters.AddAsync(infra);
        await _context.SaveChangesAsync();
        return MapToDomain(infra);
    }

    public async Task<DomainItem> UpdateAsync(DomainItem entity)
    {
        var existing = await _context.ItemMasters.FirstOrDefaultAsync(x => x.Id == entity.Id && x.IsDeleted != true);
        if (existing == null)
        {
            throw new InvalidOperationException($"Item with ID {entity.Id} not found.");
        }

        if (!string.IsNullOrWhiteSpace(entity.ItemName))
            existing.ItemName = entity.ItemName;

        existing.Description = entity.Description;

        if (entity.ItemTypeMasterId != Guid.Empty)
            existing.ItemTypeMasterId = entity.ItemTypeMasterId;

        existing.IsActive = entity.IsActive ?? existing.IsActive;

        if (entity.CompanyId != Guid.Empty)
            existing.CompanyId = entity.CompanyId;

        if (entity.SchoolId != Guid.Empty)
            existing.SchoolId = entity.SchoolId;

        if (!string.IsNullOrWhiteSpace(entity.Status))
            existing.Status = entity.Status;

        if (!string.IsNullOrWhiteSpace(entity.StatusMessage))
            existing.StatusMessage = entity.StatusMessage;

        existing.ModifiedBy = entity.ModifiedBy ?? existing.ModifiedBy;
        existing.ModifiedDate = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return MapToDomain(existing);
    }

    public async Task DeleteAsync(Guid id)
    {
        var existing = await _context.ItemMasters.FirstOrDefaultAsync(x => x.Id == id);
        if (existing != null)
        {
            existing.IsDeleted = true;
            existing.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static DomainItem MapToDomain(InfraItem src)
    {
        return new DomainItem
        {
            Id = src.Id,
            ItemName = src.ItemName,
            Description = src.Description,
            ItemTypeMasterId = src.ItemTypeMasterId,
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

    private static InfraItem MapToInfra(DomainItem src)
    {
        return new InfraItem
        {
            Id = src.Id == Guid.Empty ? Guid.NewGuid() : src.Id,
            ItemName = src.ItemName,
            Description = src.Description,
            ItemTypeMasterId = src.ItemTypeMasterId,
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
