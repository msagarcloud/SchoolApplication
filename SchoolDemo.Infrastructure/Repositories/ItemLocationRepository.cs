using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class ItemLocationRepository : IItemLocationRepository
{
    private readonly SchoolDbContext _context;

    public ItemLocationRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<ItemLocation?> GetByIdAsync(Guid id)
    {
        var itemLocationDetail = await _context.ItemLocationMasters
            .FirstOrDefaultAsync(l => l.Id == id && l.IsDeleted != true);

        return MapToDomainEntity(itemLocationDetail);
    }

    public async Task<IEnumerable<ItemLocation>> GetAllAsync()
    {
        var itemLocationDetails = await _context.ItemLocationMasters
            .Where(l => l.IsDeleted != true)
            .ToListAsync();

        return itemLocationDetails.Select(MapToDomainEntity).Where(l => l != null)!;
    }

    public async Task<ItemLocation> AddAsync(ItemLocation entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        
        infraEntity.CreatedBy = await ResolveUserAsync(entity.CreatedBy, entity.CompanyId, entity.SchoolId);
        infraEntity.ModifiedBy = infraEntity.CreatedBy;
        infraEntity.CreatedDate = DateTime.UtcNow;
        infraEntity.ModifiedDate = DateTime.UtcNow;

        await _context.ItemLocationMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();

        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<ItemLocation> UpdateAsync(ItemLocation entity)
    {
        var existing = await _context.ItemLocationMasters.FindAsync(entity.Id);
        if (existing == null)
        {
            throw new InvalidOperationException($"ItemLocationMaster with id {entity.Id} not found.");
        }

        existing.LocationName = entity.LocationName;
        existing.Description = entity.Description;
        existing.Building = entity.Building;
        existing.LocationFloor = entity.LocationFloor;
        existing.LocationNumber = entity.LocationNumber;
        existing.Capacity = entity.Capacity;
        existing.IsActive = entity.IsActive;
        existing.CompanyId = entity.CompanyId;
        existing.SchoolId = entity.SchoolId;
        existing.ModifiedDate = DateTime.UtcNow;
        existing.Status = entity.Status ?? "Updated";
        existing.StatusMessage = entity.StatusMessage;

        existing.ModifiedBy = await ResolveUserAsync(
            entity.ModifiedBy != Guid.Empty ? entity.ModifiedBy : entity.CreatedBy,
            entity.CompanyId,
            entity.SchoolId);

        await _context.SaveChangesAsync();
        return MapToDomainEntity(existing)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var itemLocationDetail = await _context.ItemLocationMasters
            .FirstOrDefaultAsync(l => l.Id == id);

        if (itemLocationDetail != null)
        {
            itemLocationDetail.IsDeleted = true;
            itemLocationDetail.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static ItemLocation? MapToDomainEntity(ItemLocationMaster? infra)
    {
        if (infra == null) return null;

        return new ItemLocation
        {
            Id = infra.Id,
            LocationName = infra.LocationName,
            Description = infra.Description,
            Building = infra.Building,
            LocationFloor = infra.LocationFloor,
            LocationNumber = infra.LocationNumber,
            Capacity = infra.Capacity,
            IsActive = infra.IsActive,
            CompanyId = infra.CompanyId,
            SchoolId = infra.SchoolId,
            CreatedBy = infra.CreatedBy,
            CreatedDate = infra.CreatedDate,
            ModifiedBy = infra.ModifiedBy,
            ModifiedDate = infra.ModifiedDate,
            IsDeleted = infra.IsDeleted,
            Status = infra.Status,
            StatusMessage = infra.StatusMessage
        };
    }

    private static ItemLocationMaster MapToInfrastructureEntity(ItemLocation domain)
    {
        return new ItemLocationMaster
        {
            Id = domain.Id,
            LocationName = domain.LocationName,
            Description = domain.Description,
            Building = domain.Building,
            LocationFloor = domain.LocationFloor,
            LocationNumber = domain.LocationNumber,
            Capacity = domain.Capacity,
            IsActive = domain.IsActive,
            CompanyId = domain.CompanyId,
            SchoolId = domain.SchoolId,
            CreatedBy = domain.CreatedBy,
            CreatedDate = domain.CreatedDate,
            ModifiedBy = domain.ModifiedBy,
            ModifiedDate = domain.ModifiedDate,
            IsDeleted = domain.IsDeleted,
            Status = domain.Status ?? "Active",
            StatusMessage = domain.StatusMessage
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
