using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class ItemLocationService : IItemLocationService
{
    private readonly IItemLocationRepository _repository;

    public ItemLocationService(IItemLocationRepository repository)
    {
        _repository = repository;
    }

    public async Task<ItemLocationResponse?> GetByIdAsync(Guid id)
    {
        var itemLocation = await _repository.GetByIdAsync(id);
        return itemLocation == null ? null : MapToResponse(itemLocation);
    }

    public async Task<IEnumerable<ItemLocationResponse>> GetAllAsync()
    {
        var itemLocations = await _repository.GetAllAsync();
        return itemLocations.Select(MapToResponse);
    }

    public async Task<ItemLocationResponse> CreateAsync(ItemLocationRequest request)
    {
        var itemLocation = new ItemLocation
        {
            Id = Guid.NewGuid(),
            LocationName = request.LocationName,
            Description = request.Description,
            Building = request.Building,
            LocationFloor = request.LocationFloor,
            LocationNumber = request.LocationNumber,
            Capacity = request.Capacity,
            IsActive = request.IsActive ?? true,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsDeleted = false,
            CreatedBy = Guid.Empty, // Resolved in repository
            CreatedDate = DateTime.UtcNow,
            ModifiedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Item location created successfully"
        };

        var created = await _repository.AddAsync(itemLocation);
        return MapToResponse(created);
    }

    public async Task<ItemLocationResponse?> UpdateAsync(Guid id, ItemLocationRequest request)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null || existing.IsDeleted == true)
        {
            return null;
        }

        existing.LocationName = request.LocationName ?? existing.LocationName;
        existing.Description = request.Description ?? existing.Description;
        existing.Building = request.Building ?? existing.Building;
        existing.LocationFloor = request.LocationFloor ?? existing.LocationFloor;
        existing.LocationNumber = request.LocationNumber ?? existing.LocationNumber;
        existing.Capacity = request.Capacity ?? existing.Capacity;
        existing.IsActive = request.IsActive ?? existing.IsActive;
        existing.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existing.CompanyId;
        existing.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existing.SchoolId;
        existing.ModifiedDate = DateTime.UtcNow;
        existing.Status = "Updated";
        existing.StatusMessage = "Item location updated successfully";

        var updated = await _repository.UpdateAsync(existing);
        return MapToResponse(updated);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null || existing.IsDeleted == true)
        {
            return false;
        }

        await _repository.DeleteAsync(id);
        return true;
    }

    private static ItemLocationResponse MapToResponse(ItemLocation itemLocation)
    {
        return new ItemLocationResponse
        {
            Id = itemLocation.Id,
            LocationName = itemLocation.LocationName,
            Description = itemLocation.Description,
            Building = itemLocation.Building,
            LocationFloor = itemLocation.LocationFloor,
            LocationNumber = itemLocation.LocationNumber,
            Capacity = itemLocation.Capacity,
            IsActive = itemLocation.IsActive,
            CompanyId = itemLocation.CompanyId,
            SchoolId = itemLocation.SchoolId,
            CreatedBy = itemLocation.CreatedBy,
            CreatedDate = itemLocation.CreatedDate,
            ModifiedBy = itemLocation.ModifiedBy,
            ModifiedDate = itemLocation.ModifiedDate,
            IsDeleted = itemLocation.IsDeleted,
            Status = itemLocation.Status,
            StatusMessage = itemLocation.StatusMessage
        };
    }
}
