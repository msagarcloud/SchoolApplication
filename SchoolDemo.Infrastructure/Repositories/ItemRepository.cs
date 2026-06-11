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
        var infra = MapToInfra(entity);
        _context.ItemMasters.Update(infra);
        await _context.SaveChangesAsync();
        return MapToDomain(infra);
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
