using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class InventoryMasterRepository : IInventoryMasterRepository
{
	private readonly SchoolDbContext _context;

	public InventoryMasterRepository(SchoolDbContext context)
	{
		_context = context;
	}

	public async Task<SchoolDemo.Domain.Entities.InventoryMaster?> GetByIdAsync(Guid id)
	{
		var entity = await _context.InventoryMasters
			.FirstOrDefaultAsync(d => d.Id == id && !d.IsDeleted);
		return MapToDomainEntity(entity);
	}

	public async Task<IEnumerable<SchoolDemo.Domain.Entities.InventoryMaster>> GetAllAsync()
	{
		var entities = await _context.InventoryMasters
			.Where(d => !d.IsDeleted)
			.ToListAsync();
		return entities.Select(MapToDomainEntity).Where(e => e != null)!;
	}

	public async Task<SchoolDemo.Domain.Entities.InventoryMaster> AddAsync(SchoolDemo.Domain.Entities.InventoryMaster entity)
	{
		var infraEntity = MapToInfrastructureEntity(entity);
		await _context.InventoryMasters.AddAsync(infraEntity);
		await _context.SaveChangesAsync();
		return MapToDomainEntity(infraEntity)!;
	}

	public async Task<SchoolDemo.Domain.Entities.InventoryMaster> UpdateAsync(SchoolDemo.Domain.Entities.InventoryMaster entity)
	{
		var infraEntity = MapToInfrastructureEntity(entity);
		_context.InventoryMasters.Update(infraEntity);
		await _context.SaveChangesAsync();
		return MapToDomainEntity(infraEntity)!;
	}

	public async Task DeleteAsync(Guid id)
	{
		var entity = await _context.InventoryMasters
			.FirstOrDefaultAsync(d => d.Id == id);
		if (entity != null)
		{
			entity.IsDeleted = true;
			entity.ModifiedDate = DateTime.UtcNow;
			await _context.SaveChangesAsync();
		}
	}

	private static SchoolDemo.Domain.Entities.InventoryMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.InventoryMaster? entity)
	{
		if (entity == null) return null;
		return new SchoolDemo.Domain.Entities.InventoryMaster
		{
			Id = entity.Id,
			Name = entity.Name,
			ItemId = entity.ItemId,
			LocationId = entity.LocationId,
			Quantity = (int)entity.Quantity,
			CostPerItem = (decimal)entity.CostPerItem,
			CompanyId = entity.CompanyId,
			SchoolId = entity.SchoolId,
			IsActive = entity.IsActive,
			IsDeleted = (bool)entity.IsDeleted,
			CreatedBy = entity.CreatedBy,
			CreatedDate = entity.CreatedDate,
			ModifiedBy = entity.ModifiedBy,
			ModifiedDate = entity.ModifiedDate,
			Status = entity.Status,
			StatusMessage = entity.StatusMessage
		};
	}

	private static SchoolDemo.Infrastructure.Data.InventoryMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.InventoryMaster entity)
	{
		return new SchoolDemo.Infrastructure.Data.InventoryMaster
		{
			Id = entity.Id,
			Name = entity.Name,
			ItemId = entity.ItemId,
			LocationId = entity.LocationId,
			Quantity = entity.Quantity,
			CostPerItem = entity.CostPerItem,
			CompanyId = entity.CompanyId,
			SchoolId = entity.SchoolId,
			IsActive = entity.IsActive,
			IsDeleted = entity.IsDeleted,
			CreatedBy = entity.CreatedBy,
			CreatedDate = entity.CreatedDate,
			ModifiedBy = (Guid)entity.ModifiedBy,
			ModifiedDate = (DateTime)entity.ModifiedDate,
			Status = entity.Status!,
			StatusMessage = entity.StatusMessage!
		};
	}
}
